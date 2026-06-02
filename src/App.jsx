import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';

// Fungsi helper untuk normalisasi teks (anti-typo spasi dan karakter khusus)
const normalisasiTeks = (teks) => {
  return String(teks || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
};

export default function DashboardZonasiTerpadu() {
  // State Management Utama
  const [dataSekolah, setDataSekolah] = useState([]);
  const [formData, setFormData] = useState({ kecamatan: '', kelurahan: '', rt: '', rw: '' });
  const [hasilPencarian, setHasilPencarian] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); 
  
  // State untuk mengontrol Accordion FAQ secara mandiri (bisa buka lebih dari satu)
  const [openFaqs, setOpenFaqs] = useState({});
  const toggleFaq = (id) => {
    setOpenFaqs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Proses Load & Parse Data Excel
  useEffect(() => {
    const loadAllExcelFiles = async () => {
      const fileConfigs = [
        { jenjang: 'SD', url: '/WILAYAH_SD_T1.xlsx' },
        { jenjang: 'SMP', url: '/WILAYAH_SMP.xlsx' },
        { jenjang: 'SMA', url: '/WILAYAH_SMA.xlsx' }
      ];

      try {
        const fetchPromises = fileConfigs.map(async (file) => {
          const response = await fetch(file.url);
          if (!response.ok) throw new Error(`Gagal memuat ${file.url}`);
          
          const arrayBuffer = await response.arrayBuffer();
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const parsedSchools = [];
          let currentSchool = null;
          
          let lastKecPrio1 = '';
          let lastKecPrio2 = '';
          let lastKecPrio3 = '';

          for (let i = 0; i < rawRows.length; i++) {
            const row = rawRows[i];
            if (!row || row.length === 0) continue;

            const namaKolomB = String(row[1] || '').trim();
            const isNewSchool = namaKolomB.includes('SDN') || namaKolomB.includes('SMP') || namaKolomB.includes('SMA');

            if (isNewSchool) {
              currentSchool = {
                nama: namaKolomB,
                alamat: String(row[2] || '').trim(), 
                jenjang: file.jenjang,
                prioritas_1: [],
                prioritas_2: [],
                prioritas_3: []
              };
              parsedSchools.push(currentSchool);
              
              lastKecPrio1 = '';
              lastKecPrio2 = '';
              lastKecPrio3 = '';
            }

            if (currentSchool) {
              // --- PRIORITAS 1 ---
              if (row[5]) { 
                if (row[6]) lastKecPrio1 = normalisasiTeks(row[6]);
                currentSchool.prioritas_1.push({
                  rt: String(row[3] || '').trim().padStart(3, '0'),
                  rw: String(row[4] || '').trim().padStart(3, '0'),
                  kelurahan: normalisasiTeks(row[5]),
                  kecamatan: lastKecPrio1 
                });
              }

              if (file.jenjang === 'SD') {
                // --- PRIORITAS 2 SD ---
                if (row[7]) {
                  if (row[8]) lastKecPrio2 = normalisasiTeks(row[8]);
                  currentSchool.prioritas_2.push({
                    kelurahan: normalisasiTeks(row[7]),
                    kecamatan: lastKecPrio2
                  });
                }
              } else {
                // --- PRIORITAS 2 SMP/SMA ---
                if (row[9]) {
                  if (row[10]) lastKecPrio2 = normalisasiTeks(row[10]);
                  currentSchool.prioritas_2.push({
                    rt: String(row[7] || '').trim().padStart(3, '0'),
                    rw: String(row[8] || '').trim().padStart(3, '0'),
                    kelurahan: normalisasiTeks(row[9]),
                    kecamatan: lastKecPrio2
                  });
                }
                // --- PRIORITAS 3 SMP/SMA ---
                if (row[11]) {
                  if (row[12]) lastKecPrio3 = normalisasiTeks(row[12]);
                  currentSchool.prioritas_3.push({
                    kelurahan: normalisasiTeks(row[11]),
                    kecamatan: lastKecPrio3
                  });
                }
              }
            }
          }
          return parsedSchools;
        });

        const results = await Promise.all(fetchPromises);
        setDataSekolah(results.flat());
        setIsLoading(false);

      } catch (error) {
        console.error("Terjadi kesalahan sinkronisasi data:", error);
        setIsLoading(false);
      }
    };

    loadAllExcelFiles();
  }, []);

  // Handler Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() });
  };

  // Algoritma Pencarian & Skor Kedekatan
  const cariZonasi = (e) => {
    e.preventDefault();
    const result = [];
    
    const searchKec = normalisasiTeks(formData.kecamatan);
    const searchKel = normalisasiTeks(formData.kelurahan);
    const inputRT = String(formData.rt).padStart(3, '0');
    const inputRW = String(formData.rw).padStart(3, '0');

    dataSekolah.forEach(sekolah => {
      let skorKedekatan = 0;
      const alamatNormal = normalisasiTeks(sekolah.alamat);
      
      if (alamatNormal.includes(searchKel)) {
        skorKedekatan = 2; // Satu Kelurahan
      } else if (alamatNormal.includes(searchKec)) {
        skorKedekatan = 1; // Satu Kecamatan
      }

      const isPrio1 = sekolah.prioritas_1.some(p => 
        p.kecamatan === searchKec && p.kelurahan === searchKel && p.rt === inputRT && p.rw === inputRW
      );
      if (isPrio1) {
        result.push({ ...sekolah, status: 'Prioritas 1', badge: 'bg-success', skorKedekatan });
        return; 
      }

      const isPrio2 = sekolah.prioritas_2.some(p => 
        p.kecamatan === searchKec && p.kelurahan === searchKel && (p.rt ? p.rt === inputRT : true) && (p.rw ? p.rw === inputRW : true)
      );
      if (isPrio2) {
        result.push({ ...sekolah, status: 'Prioritas 2', badge: 'bg-primary', skorKedekatan });
        return;
      }

      const isPrio3 = sekolah.prioritas_3.some(p => 
        p.kecamatan === searchKec && (p.kelurahan ? p.kelurahan === searchKel : true)
      );
      if (isPrio3) {
        result.push({ ...sekolah, status: 'Prioritas 3', badge: 'bg-secondary', skorKedekatan });
      }
    });

    // Urutkan: Prio (1,2,3) -> Skor Jarak (2,1,0) -> Jenjang (SD, SMP, SMA)
    result.sort((a, b) => {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      if (b.skorKedekatan !== a.skorKedekatan) return b.skorKedekatan - a.skorKedekatan;
      const order = { 'SD': 1, 'SMP': 2, 'SMA': 3 };
      return order[a.jenjang] - order[b.jenjang];
    });

    setHasilPencarian(result);
  };

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-lg-11">
          
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-dark fw-bold mb-0">Portal Manajemen Zonasi Pendidikan</h4>
            {isLoading ? (
              <span className="badge bg-warning text-dark py-2 px-3 border rounded-0">
                Memuat Database PMB...
              </span>
            ) : (
              <span className="badge bg-white text-success py-2 px-3 border border-success rounded-0 shadow-sm">
                ✅ Data Siap ({dataSekolah.length} Sekolah Terindeks)
              </span>
            )}
          </div>

          {/* NAVIGASI TAB */}
          <ul className="nav nav-tabs mb-4 border-bottom-2">
            <li className="nav-item">
              <button 
                className={`nav-link text-dark fw-semibold rounded-top-2 px-4 py-3 ${activeTab === 'dashboard' ? 'active bg-white border-bottom-0 shadow-sm' : 'bg-light text-muted'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                🔍 Pencarian Zonasi Wilayah
              </button>
            </li>
            <li className="nav-item ms-2">
              <button 
                className={`nav-link text-dark fw-semibold rounded-top-2 px-4 py-3 ${activeTab === 'panduan' ? 'active bg-white border-bottom-0 shadow-sm' : 'bg-light text-muted'}`}
                onClick={() => setActiveTab('panduan')}
              >
                📖 Buku Saku
              </button>
            </li>
          </ul>

          {/* ========================================= */}
          {/* TAB 1: DASHBOARD PENCARIAN ZONASI           */}
          {/* ========================================= */}
          {activeTab === 'dashboard' && (
            <>
              <div className="card shadow-sm border-0 mb-4 rounded-0">
                <div className="card-header bg-dark text-white rounded-0 py-3">
                  <h6 className="mb-0 fw-normal">Parameter Input Alamat (Berdasarkan Kartu Keluarga Domisili)</h6>
                </div>
                <div className="card-body bg-white p-4">
                  <form onSubmit={cariZonasi}>
                    <div className="row g-4">
                      <div className="col-md-3">
                        <label className="form-label text-secondary small fw-bold">KECAMATAN</label>
                        <input type="text" className="form-control rounded-0 p-2" name="kecamatan" value={formData.kecamatan} onChange={handleChange} placeholder="Contoh: KRAMAT JATI" required disabled={isLoading} />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label text-secondary small fw-bold">KELURAHAN</label>
                        <input type="text" className="form-control rounded-0 p-2" name="kelurahan" value={formData.kelurahan} onChange={handleChange} placeholder="Contoh: CAWANG" required disabled={isLoading} />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label text-secondary small fw-bold">RT</label>
                        <input type="number" className="form-control rounded-0 p-2" name="rt" value={formData.rt} onChange={handleChange} placeholder="3" required disabled={isLoading} />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label text-secondary small fw-bold">RW</label>
                        <input type="number" className="form-control rounded-0 p-2" name="rw" value={formData.rw} onChange={handleChange} placeholder="4" required disabled={isLoading} />
                      </div>
                    </div>
                    <div className="mt-4 border-top pt-4">
                      <button type="submit" className="btn btn-primary rounded-0 px-5 py-2 fw-bold" disabled={isLoading}>
                        Proses Pengecekan Zonasi
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {hasilPencarian && (
                <>
                  {/* SUMMARY CARDS */}
                  <div className="row g-4 mb-4">
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm rounded-0 bg-info bg-opacity-10 border-start border-info border-4">
                        <div className="card-body p-4">
                          <div className="text-muted small fw-bold mb-2">TOTAL SD NEGERI TERSEDIA</div>
                          <h2 className="mb-0 fw-bold text-dark">
                            {hasilPencarian.filter(s => s.jenjang === 'SD').length} <span className="fs-6 fw-normal text-muted">Sekolah</span>
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm rounded-0 bg-primary bg-opacity-10 border-start border-primary border-4">
                        <div className="card-body p-4">
                          <div className="text-muted small fw-bold mb-2">TOTAL SMP NEGERI TERSEDIA</div>
                          <h2 className="mb-0 fw-bold text-dark">
                            {hasilPencarian.filter(s => s.jenjang === 'SMP').length} <span className="fs-6 fw-normal text-muted">Sekolah</span>
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm rounded-0 bg-dark bg-opacity-10 border-start border-dark border-4">
                        <div className="card-body p-4">
                          <div className="text-muted small fw-bold mb-2">TOTAL SMA NEGERI TERSEDIA</div>
                          <h2 className="mb-0 fw-bold text-dark">
                            {hasilPencarian.filter(s => s.jenjang === 'SMA').length} <span className="fs-6 fw-normal text-muted">Sekolah</span>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TABEL HASIL PENCARIAN */}
                  <div className="card shadow-sm border-0 rounded-0">
                    <div className="card-header bg-white border-bottom rounded-0 d-flex justify-content-between align-items-center py-3">
                      <h6 className="mb-0 text-dark fw-bold">Rincian Pemetaan Wilayah Berdasarkan Dokumen</h6>
                      <span className="badge bg-secondary rounded-0 px-3 py-2">{hasilPencarian.length} Hasil Ditemukan</span>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0 align-middle border-bottom">
                          <thead className="table-light">
                            <tr>
                              <th className="px-4 py-3 text-secondary small" style={{width: '12%'}}>JENJANG</th>
                              <th className="py-3 text-secondary small" style={{width: '58%'}}>NAMA SEKOLAH & ALAMAT RESMI</th>
                              <th className="py-3 text-secondary small" style={{width: '30%'}}>STATUS ZONASI WILAYAH</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hasilPencarian.length > 0 ? (
                              hasilPencarian.map((sekolah, index) => (
                                <tr key={index}>
                                  <td className="px-4 fw-bold text-secondary align-top pt-4">
                                    <span className={`badge ${sekolah.jenjang === 'SD' ? 'bg-info text-dark' : sekolah.jenjang === 'SMP' ? 'bg-primary' : 'bg-dark'} px-3 py-2 rounded-1`}>
                                      {sekolah.jenjang}
                                    </span>
                                  </td>
                                  <td className="pt-4 pb-3">
                                    <div className="fw-bold text-dark mb-2 d-flex align-items-center gap-2 fs-6">
                                      {sekolah.nama}
                                      {sekolah.skorKedekatan === 2 && (
                                        <span className="badge bg-success bg-opacity-10 text-success border border-success rounded-pill" style={{fontSize: '0.65rem', padding: '0.3rem 0.6rem'}}>Satu Kelurahan</span>
                                      )}
                                    </div>
                                    {sekolah.alamat && (
                                      <div className="text-muted small fw-normal d-flex align-items-start gap-1">
                                        <span>📍</span> <span>{sekolah.alamat}</span>
                                      </div>
                                    )}
                                  </td>
                                  <td className="align-top pt-4">
                                    <span className={`badge ${sekolah.badge} px-4 py-2 rounded-0 fs-6 shadow-sm`}>
                                      {sekolah.status}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3" className="text-center py-5 text-muted bg-light">
                                  <div className="fs-5 mb-2">📭</div>
                                  Tidak ada data sekolah dalam radius zonasi (Prioritas 1/2/3) untuk wilayah domisili yang diinput.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* ========================================= */}
          {/* TAB 2: BUKU SAKU PETUGAS POSKO (LENGKAP)    */}
          {/* ========================================= */}
          {activeTab === 'panduan' && (
            <div className="card shadow-sm border-0 rounded-0 bg-white p-5 mb-5">
              <div className="text-center mb-5 border-bottom pb-4">
                <h3 className="fw-bold text-dark mb-2">Buku Saku SPMB 2026</h3>
                <p className="text-muted">Panduan Lengkap, SOP Pelayanan, Mekanisme Skoring, dan Resolusi Masalah Lapangan</p>
              </div>

              {/* BAB 1: DEFINISI JALUR */}
              <div className="mb-5">
                <h5 className="fw-bold text-primary mb-4 border-start border-primary border-4 ps-3">Bagian 1. Definisi & Mekanisme Jalur Penerimaan</h5>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card bg-light border-0 h-100 rounded-0 p-4 shadow-sm">
                      <div className="fw-bold text-success mb-3 fs-5">A. Jalur Afirmasi</div>
                      <div className="small lh-lg text-dark">
                        Jalur perlindungan/pemerataan yang disediakan untuk memberikan kesempatan lebih besar bagi anak dari keluarga tidak mampu atau kondisi tertentu.
                        <ul className="mb-0 mt-3 ps-3">
                          <li className="mb-2"><strong>Prioritas 1:</strong> Anak asuh panti sosial, anak penyandang disabilitas, dan anak dari tenaga kesehatan yang gugur dalam penanganan Covid-19.</li>
                          <li><strong>Prioritas 2:</strong> Pemegang KJP Plus, KAJ (Kartu Anak Jakarta), anak pengemudi TransJakarta, penerima PIP (Program Indonesia Pintar), dan anak pekerja/buruh terdaftar.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card bg-light border-0 h-100 rounded-0 p-4 shadow-sm">
                      <div className="fw-bold text-success mb-3 fs-5">B. Jalur Domisili (Zonasi)</div>
                      <div className="small lh-lg text-dark">
                        Jalur yang memprioritaskan pendaftar berdasarkan kedekatan jarak dari alamat rumah (sesuai Kartu Keluarga) ke sekolah tujuan.
                        <ul className="mb-0 mt-3 ps-3">
                          <li className="mb-2"><strong>Prioritas 1:</strong> RT rumah SAMA PERSIS dengan RT sekolah, ATAU RT rumah berbatasan langsung (menempel) dengan RT sekolah.</li>
                          <li className="mb-2"><strong>Prioritas 2:</strong> Berada di RT sekitar sekolah yang telah dipetakan, atau Kelurahan yang sama/berdekatan (untuk jenjang SD).</li>
                          <li><strong>Prioritas 3:</strong> Kelurahan domisili sama/berdekatan dengan kelurahan sekolah (Hanya berlaku untuk SMP dan SMA).</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card bg-light border-0 h-100 rounded-0 p-4 shadow-sm">
                      <div className="fw-bold text-success mb-3 fs-5">C. Jalur Prestasi</div>
                      <div className="small lh-lg text-dark">
                        Jalur yang menyeleksi murni berdasarkan capaian nilai dan sertifikat siswa. Berlaku untuk masuk SMP, SMA, dan SMK.
                        <ul className="mb-0 mt-3 ps-3">
                          <li className="mb-2"><strong>Prestasi Akademik (Dominan Nilai):</strong> Mempertimbangkan gabungan Rerata Nilai Rapor 5 Semester, Hasil TKA, dan Sertifikat Kejuaraan Sains/Akademik.</li>
                          <li><strong>Prestasi Non-Akademik (Dominan Sertifikat):</strong> Mempertimbangkan pengalaman Kepemimpinan (OSIS/Ekskul) dan Kejuaraan Olahraga, Seni, Budaya, Pramuka/Paskibra.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card bg-light border-0 h-100 rounded-0 p-4 shadow-sm">
                      <div className="fw-bold text-success mb-3 fs-5">D. Jalur Mutasi Tugas Orang Tua & Anak Guru</div>
                      <div className="small lh-lg text-dark">
                        Diperuntukkan bagi anak yang mengikuti perpindahan domisili/tugas orang tua/wali (misal instansi TNI/Polri, ASN, BUMN, lembaga, atau perusahaan swasta) yang pindah tugas paling lama 1 (satu) tahun sebelum hari pertama pendaftaran. Berlaku juga bagi calon murid yang merupakan anak guru/tenaga kependidikan yang mendaftar persis di sekolah tempat orang tuanya bertugas/mengajar.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BAB 2: SIMULASI PENILAIAN PRESTASI */}
              <div className="mb-5 border-top pt-5">
                <h5 className="fw-bold text-primary mb-4 border-start border-primary border-4 ps-3">Bagian 2. Sistem Penilaian & Pembobotan (Khusus Jalur Prestasi)</h5>
                <p className="text-muted small mb-4">Dalam Jalur Prestasi (SMP/SMA/SMK), nilai akhir (Indeks Prestasi) calon murid dihitung mencapai skala 100% menggunakan 5 komponen penilaian yang digabung.</p>
                
                <div className="table-responsive mb-4 shadow-sm">
                  <table className="table table-bordered mb-0 align-middle text-center small">
                    <thead className="table-dark">
                      <tr>
                        <th className="text-start py-3" style={{width: '40%'}}>Indikator Penilaian & Penjelasan</th>
                        <th className="py-3">Jalur Prestasi Akademik</th>
                        <th className="py-3">Jalur Prestasi Non-Akademik</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-dark">
                      <tr>
                        <td className="text-start p-3">
                          <strong className="text-primary">1. Rerata Nilai Rapor & TKA</strong><br/>
                          Kombinasi nilai: Rapor 5 semester terakhir (Bobot 70%) ditambah Hasil Ujian TKA (Bobot 30%).
                        </td>
                        <td className="fs-6 fw-bold">40%</td>
                        <td className="fs-6 fw-bold">20%</td>
                      </tr>
                      <tr>
                        <td className="text-start p-3">
                          <strong className="text-primary">2. Persentil Nilai Rapor</strong><br/>
                          Ranking anak di sekolah asal. Jika sekolah akreditasi Baik dan anak masuk Top 15% lulusan, nilainya maksimal.
                        </td>
                        <td className="fs-6 fw-bold">20%</td>
                        <td className="fs-6 fw-bold">5%</td>
                      </tr>
                      <tr>
                        <td className="text-start p-3">
                          <strong className="text-primary">3. Sertifikat Prestasi Akademik</strong><br/>
                          Sertifikat Juara 1/2/3 dari tingkat Kota sampai Internasional (OSN, KSM, dll).
                        </td>
                        <td className="fs-6 fw-bold">25%</td>
                        <td className="fs-6 fw-bold">5%</td>
                      </tr>
                      <tr>
                        <td className="text-start p-3">
                          <strong className="text-primary">4. Sertifikat Prestasi Non-Akademik</strong><br/>
                          Juara Olahraga (O2SN), Seni (FLS2N), Budaya. (Catatan: Sertifikat Non-Kedinasan wajib lolos kurasi).
                        </td>
                        <td className="fs-6 fw-bold">5%</td>
                        <td className="fs-6 fw-bold">50%</td>
                      </tr>
                      <tr>
                        <td className="text-start p-3">
                          <strong className="text-primary">5. Pengalaman Kepemimpinan</strong><br/>
                          Ketua OSIS/MPK (Skor 100), Pengurus/Wakil (67), Ketua Ekskul (100), Anggota Pramuka Garuda/Hafiz (Sesuai level).
                        </td>
                        <td className="fs-6 fw-bold">10%</td>
                        <td className="fs-6 fw-bold">20%</td>
                      </tr>
                      <tr className="table-secondary">
                        <td className="text-end fw-bold">TOTAL PENILAIAN AKHIR :</td>
                        <td className="fw-bold fs-6">100%</td>
                        <td className="fw-bold fs-6">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* SIMULASI CONTOH KASUS PRESTASI */}
                <div className="card border-0 bg-info bg-opacity-10 rounded-0 p-4 border-start border-info border-4">
                  <h6 className="fw-bold text-dark mb-3">💡 Contoh Simulasi Perhitungan (Jalur Prestasi Akademik)</h6>
                  <div className="small lh-lg text-dark">
                    Misalkan <strong>Anak A</strong> mendaftar SMA Jalur Prestasi Akademik. Dia memiliki data berikut:
                    <ul className="mb-2">
                      <li>Rapor & TKA yang sudah dikonversi: Skor 90. (Dikalikan bobot 40% = <strong>36.00</strong>)</li>
                      <li>Persentil Rapor (Top 10% di sekolahnya): Skor 100. (Dikalikan bobot 20% = <strong>20.00</strong>)</li>
                      <li>Juara 1 OSN Tingkat Nasional: Skor 81. (Dikalikan bobot 25% = <strong>20.25</strong>)</li>
                      <li>Sertifikat Olahraga: Tidak punya. (Skor 0 x 5% = <strong>0.00</strong>)</li>
                      <li>Ketua OSIS SMP: Skor 100. (Dikalikan bobot 10% = <strong>10.00</strong>)</li>
                    </ul>
                    Maka <strong>Total Indeks Prestasi Akademik Anak A adalah = 86.25</strong>. Nilai akhir 86.25 inilah yang akan diadu dengan anak lain di seluruh Jakarta secara *real-time* di sistem.
                  </div>
                </div>
              </div>

              {/* BAB 3: TIE-BREAKER */}
              <div className="mb-5 border-top pt-5">
                <h5 className="fw-bold text-primary mb-4 border-start border-primary border-4 ps-3">Bagian 3 Jika Kuota Penuh</h5>
                <p className="text-muted small mb-4">Kondisi jika terjadi saat daya tampung sekolah tersisa sedikit (misal 1 kursi), namun ada 2 pendaftar atau lebih dengan status yang sama memperebutkannya. Berikut aturan  secara hierarkis:</p>
                
                <div className="row g-4">
                  <div className="col-md-12">
                    <div className="card border-danger border-opacity-25 rounded-0 mb-3 shadow-sm">
                      <div className="card-header bg-danger bg-opacity-10 fw-bold text-danger rounded-0 py-3">
                        🔴 KASUS 1: Jalur Domisili Jenjang SD & SMP
                      </div>
                      <div className="card-body small lh-lg p-4">
                        <div className="fw-bold mb-2">Hierarki Penyaringan:</div>
                        <div className="bg-light p-3 border mb-3 text-dark">
                          1. Zona Prioritas (Prio 1 > Prio 2 > Prio 3)<br/>
                          2. Usia Tertua ke Termuda (Sampai hitungan hari)<br/>
                          3. Urutan Pilihan Sekolah (Pilihan 1 > Pilihan 2)<br/>
                          4. Kecepatan Waktu Mendaftar
                        </div>
                        <strong>Contoh:</strong> Sisa kuota SMPN 1 adalah 1 kursi. Ada 3 pendaftar:
                        <ul className="mb-2 mt-2">
                          <li><strong>Budi:</strong> Prioritas 1, Usia 14 Tahun, 2 Bulan.</li>
                          <li><strong>Andi:</strong> Prioritas 1, Usia 14 Tahun, 8 Bulan.</li>
                          <li><strong>Citra:</strong> Prioritas 2, Usia 15 Tahun.</li>
                        </ul>
                        <strong>Hasil Sistem: <span className="text-success fw-bold fs-6">ANDI DITERIMA</span>.</strong>
                        <br/><em>Analisis:</em> Citra (meski paling tua) digugurkan duluan karena dia Prioritas 2. Tersisa Budi dan Andi (sama-sama Prio 1). Sistem mengadu usia. Andi (14 thn 8 bln) lebih tua dari Budi. Maka Andi yang mengambil kursi terakhir. Di SD & SMP Domisili, <strong>Tua Mengalahkan Muda</strong>.
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="card border-primary border-opacity-25 rounded-0 shadow-sm">
                      <div className="card-header bg-primary bg-opacity-10 fw-bold text-primary rounded-0 py-3">
                        🔵 KASUS 2: Jalur Domisili Jenjang SMA
                      </div>
                      <div className="card-body small lh-lg p-4">
                        <div className="fw-bold mb-2">Hierarki Penyaringan:</div>
                        <div className="bg-light p-3 border mb-3 text-dark">
                          1. Total Indeks Prestasi Akademik (Rapor + TKA dll)<br/>
                          2. Zona Prioritas Wilayah (Prio 1 > Prio 2 > Prio 3)<br/>
                          3. Usia Tertua ke Termuda<br/>
                          4. Urutan Pilihan Sekolah & Kecepatan Daftar
                        </div>
                        <strong>Contoh:</strong> Sisa kuota SMAN 1 adalah 1 kursi. Ada 3 pendaftar:
                        <ul className="mb-2 mt-2">
                          <li><strong>Rio:</strong> Prioritas 1, Nilai Akademik: 80, Usia: 16 Tahun.</li>
                          <li><strong>Kevin:</strong> Prioritas 1, Nilai Akademik: 85, Usia: 15.5 Tahun.</li>
                          <li><strong>Sarah:</strong> Prioritas 2, Nilai Akademik: 95, Usia: 15 Tahun.</li>
                        </ul>
                        <strong>Hasil Sistem: <span className="text-success fw-bold fs-6">KEVIN DITERIMA</span>.</strong>
                        <br/><em>Analisis :</em> Ini adalah letak perbedaan jenjang SMA! Penentu UTAMA di SMA adalah <strong>NILAI</strong>. Sarah memang nilainya paling tinggi (95), tapi dia berada di Prioritas 2, jadi dia kalah wilayah dari Rio dan Kevin. Persaingan berpindah ke Rio dan Kevin yang sama-sama Prio 1. Sistem mengadu NILAI mereka. Kevin (85) lebih tinggi dari Rio (80). Kevin diterima. Usia Rio yang lebih tua diabaikan karena nilainya lebih kecil.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BAB 4: JADWAL & ALOKASI KUOTA */}
          <div className="row g-5 mb-5 border-top pt-5">
                <div className="col-lg-6">
                  <h5 className="fw-bold text-primary mb-4 border-start border-primary border-4 ps-3">Bagian 4. Jadwal SPMB 2026</h5>
                  <div className="card border-0 bg-light p-4 rounded-0 shadow-sm small">
                    <ul className="list-unstyled mb-0 lh-lg">
                      <li className="border-bottom pb-2 mb-2">
                        <span className="fw-bold d-block text-dark">A. Prapendaftaran (Wajib utk Luar DKI/Lulusan Lama)</span>
                        <span className="text-danger fw-bold">19 Mei s.d. 10 Juni 2026</span>
                      </li>
                      <li className="border-bottom pb-2 mb-2">
                        <span className="fw-bold d-block text-dark">B. Pembuatan/Pengajuan Akun & Verif KK</span>
                        SD: Mulai 18 Mei 2026<br/>
                        SMP: Mulai 25 Mei 2026<br/>
                        SMA & SMK: Mulai 2 Juni 2026
                      </li>
                      <li className="border-bottom pb-2 mb-2">
                        <span className="fw-bold d-block text-dark">C. Pendaftaran & Pilih Sekolah (Tahap 1 / Jalur Utama)</span>
                        SD (Jalur Domisili) & SMP/SMA/SMK (Jalur Prestasi): 15, 17, dan 18 Juni 2026<br/>
                        Afirmasi Prioritas 1 (Disabilitas): 15, 17, dan 18 Juni 2026<br/>
                        Afirmasi Prioritas 2: 22 - 24 Juni 2026<br/>
                        SMP & SMA (Jalur Domisili): 29 - 30 Juni & 1 Juli 2026<br/>
                        Jalur Mutasi: 15 - 30 Juni 2026
                      </li>
                      <li className="border-bottom pb-2 mb-2">
                        <span className="fw-bold d-block text-dark">D. Pendaftaran Tahap 2 (Pengisian Sisa Kuota)</span>
                        SD: 29 - 30 Juni & 1 Juli 2026<br/>
                        SMP, SMA, SMK: 6 - 7 Juli 2026
                      </li>
                      <li className="border-bottom pb-2 mb-2">
                        <span className="fw-bold d-block text-dark">E. Pendaftaran Tahap 3 (Pengisian Sisa Kuota Terakhir)</span>
                        SD: 6 - 7 Juli 2026<br/>
                        <em>*Catatan: SMP, SMA, dan SMK tidak menyelenggarakan Tahap 3.</em>
                      </li>
                      <li className="pt-2">
                        <span className="fw-bold d-block text-danger">F. LAPOR DIRI (DAFTAR ULANG) - WAJIB</span>
                        Jalur Utama (Domisili SD / Prestasi SMP, SMA, SMK / Disabilitas): <span className="bg-warning px-2 py-1 text-dark fw-bold">20 Juni 2026</span><br/>
                        Afirmasi Prioritas 2: 25 - 26 Juni 2026<br/>
                        Domisili SMP & SMA / Jalur Mutasi: 2 - 3 Juli 2026<br/>
                        Tahap 2 SD: 2 - 3 Juli 2026<br/>
                        Tahap 2 SMP, SMA, SMK & Tahap 3 SD: 9 Juli 2026
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="col-lg-6">
                  <h5 className="fw-bold text-primary mb-4 border-start border-primary border-4 ps-3">Bagian 5. Alokasi Kuota Persentase</h5>
                  <div className="table-responsive shadow-sm">
                    <table className="table table-bordered mb-0 text-center small align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>Jenjang</th>
                          <th>Domisili</th>
                          <th>Prestasi</th>
                          <th>Afirmasi</th>
                          <th>Mutasi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="text-start fw-bold p-3">Sekolah Dasar (SD)</td>
                          <td className="text-success fw-bold">77%</td>
                          <td className="text-muted">-</td>
                          <td>20%</td>
                          <td>3%</td>
                        </tr>
                        <tr>
                          <td className="text-start fw-bold p-3">SMP</td>
                          <td className="text-success fw-bold">50%</td>
                          <td className="text-primary fw-bold">27%</td>
                          <td>20%</td>
                          <td>3%</td>
                        </tr>
                        <tr>
                          <td className="text-start fw-bold p-3">SMA</td>
                          <td className="text-success fw-bold">35%</td>
                          <td className="text-primary fw-bold">32%</td>
                          <td>30%</td>
                          <td>3%</td>
                        </tr>
                        <tr>
                          <td className="text-start fw-bold p-3">SMK</td>
                          <td className="text-muted">-</td>
                          <td className="text-primary fw-bold">60%</td>
                          <td>37%</td>
                          <td>3%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* BAB 6: SYARAT & KETENTUAN KHUSUS */}
              <div className="mb-5 border-top pt-5">
                <h5 className="fw-bold text-danger mb-4 border-start border-danger border-4 ps-3">Bagian 6. Syarat</h5>
                
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card border-danger border-opacity-50 rounded-0 h-100 shadow-sm">
                      <div className="card-header bg-danger text-white fw-bold rounded-0 py-3">
                        <h6 className="mb-0">1. Lupa Daftar Ulang</h6>
                      </div>
                      <div className="card-body small lh-lg p-4 bg-light">
                        Orang tua yang nama anaknya lulus di pengumuman <strong>WAJIB LOGIN KEMBALI</strong> dan mengeklik tombol "Lapor Diri" pada tanggal 20 Juni. 
                        Jika terlewat, anak akan otomatis <strong>DIANGGAP MENGUNDURKAN DIRI</strong>. 
                        , kemudian Akun diblokir, tidak bisa ikut seleksi jalur/tahap apapun lagi, dan kursinya dilempar ke pendaftar cadangan.
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-danger border-opacity-50 rounded-0 h-100 shadow-sm">
                      <div className="card-header bg-danger text-white fw-bold rounded-0 py-3">
                        <h6 className="mb-0">2. Kartu Keluarga (KK)</h6>
                      </div>
                      <div className="card-body small lh-lg p-4 bg-light">
                        <ul className="mb-0 ps-3">
                          <li className="mb-2">KK wajib terbitan DKI Jakarta dengan tanggal cetak <strong>paling telat 15 Juni 2025</strong>.</li>
                          <li className="mb-2"><strong>Pengecualian:</strong> KK baru (kurang dari setahun) BISA DIPAKAI asalkan domisilinya tidak pindah (misal cetak ulang karena nambah anak/hilang). Syaratnya: Warga <strong>WAJIB mengunggah KK Lama & KK Baru</strong>.</li>
                          <li>Jika numpang KK Kakek/Famili, nama orang tua di Ijazah pasti beda dengan Kepala Keluarga di KK. Warga wajib melampirkan Surat Perwalian + Surat Keterangan Kelurahan (PM1).</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-dark border-opacity-50 rounded-0 h-100 shadow-sm">
                      <div className="card-header bg-dark text-white fw-bold rounded-0 py-3">
                        <h6 className="mb-0">3. Batas Usia (Per 1 Juli 2026)</h6>
                      </div>
                      <div className="card-body small lh-lg p-4 bg-light text-dark">
                        <ul className="mb-0 ps-3">
                          <li className="mb-2"><strong>SD:</strong> Minimal 6 Tahun. (Usia 5 Tahun 6 Bulan BISA DAFTAR wajib bawa surat rekomendasi Psikolog Profesional).</li>
                          <li className="mb-2"><strong>SMP:</strong> Maksimal 15 Tahun.</li>
                          <li><strong>SMA / SMK:</strong> Maksimal 21 Tahun.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-dark border-opacity-50 rounded-0 h-100 shadow-sm">
                      <div className="card-header bg-dark text-white fw-bold rounded-0 py-3">
                        <h6 className="mb-0">4. Syarat Khusus SMK (Bebas Buta Warna)</h6>
                      </div>
                      <div className="card-body small lh-lg p-4 bg-light text-dark">
                        Bagi calon pendaftar SMK yang memilih lebih dari 40 jurusan kompetensi tertentu (contoh: Animasi, Desain Komunikasi Visual/DKV, Kuliner, Tata Kecantikan, Teknik Otomotif, Teknik Jaringan), <strong>DIWAJIBKAN</strong> melampirkan hasil tes fisik berupa Surat Keterangan Tidak Buta Warna resmi dari instansi kesehatan pemerintah (RSUD/Puskesmas).
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BAB 7: TROUBLESHOOTING GRUP WA */}
              <div className="mb-2 border-top pt-5">
                <h5 className="fw-bold text-success mb-4 border-start border-success border-4 ps-3">Bagian 7. FAQ</h5>                
                <div className="accordion rounded-0 shadow-sm" id="faqAccordion">
                  
                  {/* Item 1 */}
                  <div className="accordion-item rounded-0 border-start-0 border-end-0">
                    <h2 className="accordion-header">
                      <button 
                        className={`accordion-button fw-bold py-4 text-dark ${openFaqs[1] ? '' : 'collapsed'}`} 
                        type="button" 
                        onClick={() => toggleFaq(1)}
                        style={{backgroundColor: openFaqs[1] ? '#f8f9fa' : 'white'}}
                      >
                        🔴 "Gagal buat akun, sistem bilang NIK terpakai orang lain!"
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${openFaqs[1] ? 'show' : ''}`}>
                      <div className="accordion-body small lh-lg bg-white border-top">
                        <strong>Kondisi:</strong> Biasanya NIK anak tersebut tidak sengaja salah ketik oleh orang tua lain, atau digunakan ganda.
                        <ol className="mb-0 mt-2">
                          <li>Orang tua murid wajib mengirim foto KK asli ke petugas posko.</li>
                          <li>Petugas posko akan membuat laporan permohonan hapus akun</li>
                          <li>Setelah akun di batalkan/direset, orang tua murid dapat <strong>buat pengajuan ulang dari awal</strong>.</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="accordion-item rounded-0 border-start-0 border-end-0">
                    <h2 className="accordion-header">
                      <button 
                        className={`accordion-button fw-bold py-4 text-dark ${openFaqs[2] ? '' : 'collapsed'}`} 
                        type="button" 
                        onClick={() => toggleFaq(2)}
                        style={{backgroundColor: openFaqs[2] ? '#f8f9fa' : 'white'}}
                      >
                        🔴 "Salah input alamat KK / RT / RW / Nama Orang Tua di sistem."
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${openFaqs[2] ? 'show' : ''}`}>
                      <div className="accordion-body small lh-lg bg-white border-top">
                        <ul className="mb-0">
                          <li>Cek status akun peserta. Jika statusnya <strong>Belum Diverifikasi / Masih Direvisi / Ditolak</strong>. Orang tua bisa langsung login dan EDIT MANUAL data/dokumennya di web spmb.</li>
                          <li>Jika statusnya <strong>Sudah Disetujui (Centang Hijau)</strong>, maka akun sudah terkunci sistem. Petugas posko akan membuat laporan untuk minta "Hapus Akun". Setelah dihapus, orang tua baru bisa buat akun ulang dengan data yang benar.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="accordion-item rounded-0 border-start-0 border-end-0">
                    <h2 className="accordion-header">
                      <button 
                        className={`accordion-button fw-bold py-4 text-dark ${openFaqs[3] ? '' : 'collapsed'}`} 
                        type="button" 
                        onClick={() => toggleFaq(3)}
                        style={{backgroundColor: openFaqs[3] ? '#f8f9fa' : 'white'}}
                      >
                        🔴 "Nama SD/SMP Lulusan dari luar daerah tidak ada di pilihan dropdown sistem!"
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${openFaqs[3] ? 'show' : ''}`}>
                      <div className="accordion-body small lh-lg bg-white border-top">
                         Sistem tidak melist puluhan ribu sekolah dari luar provinsi. Orang tua murid cukup mengetik manual di kotak pencarian sekolah: <strong>"SD LUAR KOTA"</strong> atau <strong>"SMP LUAR KOTA"</strong>, lalu klik pilih opsi tersebut.
                      </div>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="accordion-item rounded-0 border-start-0 border-end-0">
                    <h2 className="accordion-header">
                      <button 
                        className={`accordion-button fw-bold py-4 text-dark ${openFaqs[4] ? '' : 'collapsed'}`} 
                        type="button" 
                        onClick={() => toggleFaq(4)}
                        style={{backgroundColor: openFaqs[4] ? '#f8f9fa' : 'white'}}
                      >
                        🔴 "Saya salah pilih tempat Sekolah Verifikasi, malah kepilih sekolah yang jauh banget dari rumah!"
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${openFaqs[4] ? 'show' : ''}`}>
                      <div className="accordion-body small lh-lg bg-white border-top">
                        Tidak jadi masalah, karena Tempat Sekolah Verifikasi <strong>HANYA</strong> diperuntukkan sebagai pembagian tugas operator sekolah yang akan mengecek berkas secara online. Pemilihan itu <strong>TIDAK MENGUNCI</strong> sekolah tujuan (Prioritas Zonasi) yang akan dipilih anak saat jadwal pendaftaran di bulan Juni nanti. 
                      </div>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="accordion-item rounded-0 border-start-0 border-end-0">
                    <h2 className="accordion-header">
                      <button 
                        className={`accordion-button fw-bold py-4 text-dark ${openFaqs[5] ? '' : 'collapsed'}`} 
                        type="button" 
                        onClick={() => toggleFaq(5)}
                        style={{backgroundColor: openFaqs[5] ? '#f8f9fa' : 'white'}}
                      >
                        🔴 "Di sistem penginputan nilai Prapendaftaran ada mapel IPAS, padahal rapot sekolah asal anak saya cuma IPA. Gimana masukinnya?"
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${openFaqs[5] ? 'show' : ''}`}>
                      <div className="accordion-body small lh-lg bg-white border-top">
                        Orang tua bisa menginput nilai mata pelajaran <strong>IPA</strong> ke dalam kolom IPAS tersebut.
                      </div>
                    </div>
                  </div>

                  {/* Item 6 */}
                  <div className="accordion-item rounded-0 border-start-0 border-end-0">
                    <h2 className="accordion-header">
                      <button 
                        className={`accordion-button fw-bold py-4 text-dark ${openFaqs[6] ? '' : 'collapsed'}`} 
                        type="button" 
                        onClick={() => toggleFaq(6)}
                        style={{backgroundColor: openFaqs[6] ? '#f8f9fa' : 'white'}}
                      >
                        🔴 "Di mana saya bisa cek Nilai TKA dan memastikan Sertifikat Prestasi anak saya terbaca sistem?"
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${openFaqs[6] ? 'show' : ''}`}>
                      <div className="accordion-body small lh-lg bg-white border-top">
                        <ul className="mb-0 mt-2">
                          <li>Cek Nilai TKA: <span className="text-primary fw-bold">sidanira.jakarta.go.id/tka</span></li>
                          <li>Simulasi Total Nilai Prestasi: <span className="text-primary fw-bold">sidanira.jakarta.go.id/simulasi259</span></li>
                          <li>Validasi Sertifikat SKH-TKA Nasional: <span className="text-primary fw-bold">shtka.kemendikdasmen.go.id/verifikasi-shtka</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}