import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Antrean from './Antrean';
import BukuSaku from './BukuSaku'; // <--- IMPORT FILE BUKU SAKU YANG BARU DIBUAT

// Fungsi helper untuk normalisasi teks pencocokan (anti-typo)
const normalisasiTeks = (teks) => {
  return String(teks || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
};

// Fungsi helper untuk merapikan nama Kelurahan di Dropdown
const bersihkanNamaKelurahan = (teks) => {
  let clean = String(teks || '').toUpperCase().trim();
  clean = clean.replace(/^KELURAHAN\s+/i, '').replace(/^KEL\.\s+/i, '').trim();
  return clean;
};

export default function DashboardZonasiTerpadu() {
  // State Management Utama
  const [dataSekolah, setDataSekolah] = useState([]);
  const [listKelurahan, setListKelurahan] = useState([]); // State baru untuk Dropdown
  const [formData, setFormData] = useState({ kelurahan: '', rt: '', rw: '' });
  const [hasilPencarian, setHasilPencarian] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); 
  // State khusus untuk fitur Autocomplete Kelurahan
  const [filteredKelurahan, setFilteredKelurahan] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // State untuk mengontrol Accordion FAQ secara mandiri
  const [openFaqs, setOpenFaqs] = useState({});
  const toggleFaq = (id) => {
    setOpenFaqs(prev => ({ ...prev, [id]: !prev[id] }));
  };
// Handler khusus untuk Autocomplete Kelurahan (Muncul setelah 3 huruf)
  const handleKelurahanChange = (e) => {
    const val = e.target.value.toUpperCase();
    setFormData({ ...formData, kelurahan: val });
    
    if (val.length >= 3) {
      const filtered = listKelurahan.filter(k => k.includes(val));
      setFilteredKelurahan(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectKelurahan = (kel) => {
    setFormData({ ...formData, kelurahan: kel });
    setShowSuggestions(false); // Tutup dropdown setelah dipilih
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
          const localKelurahanMap = new Map(); // Menggunakan Map untuk mencegah duplikat spasi
          let currentSchool = null;

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
            }

            if (currentSchool) {
              // Fungsi pintar untuk menyaring kelurahan ke Dropdown
              const tambahKelurahan = (teks) => {
                if (!teks) return;
                const clean = bersihkanNamaKelurahan(teks);
                const key = normalisasiTeks(clean); // Cth: "BIDARACINA" (tanpa spasi)
                
                if (!localKelurahanMap.has(key)) {
                  localKelurahanMap.set(key, clean);
                } else {
                  // Jika yang tersimpan sebelumnya gak ada spasi (BIDARACINA), 
                  // timpa dengan versi yang ada spasinya (BIDARA CINA) agar dropdown rapi.
                  if (clean.includes(' ') && !localKelurahanMap.get(key).includes(' ')) {
                    localKelurahanMap.set(key, clean);
                  }
                }
              };

              if (row[5]) tambahKelurahan(row[5]);
              if (row[7]) tambahKelurahan(row[7]);
              if (row[9]) tambahKelurahan(row[9]);
              if (row[11]) tambahKelurahan(row[11]);

              // Mapping Prioritas 1
              if (row[5]) { 
                currentSchool.prioritas_1.push({
                  rt: String(row[3] || '').trim().padStart(3, '0'),
                  rw: String(row[4] || '').trim().padStart(3, '0'),
                  kelurahan: normalisasiTeks(row[5])
                });
              }

              if (file.jenjang === 'SD') {
                // Mapping Prioritas 2 SD
                if (row[7]) {
                  currentSchool.prioritas_2.push({
                    kelurahan: normalisasiTeks(row[7])
                  });
                }
              } else {
                // Mapping Prioritas 2 SMP/SMA
                if (row[9]) {
                  currentSchool.prioritas_2.push({
                    rt: String(row[7] || '').trim().padStart(3, '0'),
                    rw: String(row[8] || '').trim().padStart(3, '0'),
                    kelurahan: normalisasiTeks(row[9])
                  });
                }
                // Mapping Prioritas 3 SMP/SMA
                if (row[11]) {
                  currentSchool.prioritas_3.push({
                    kelurahan: normalisasiTeks(row[11])
                  });
                }
              }
            }
          }
          return { parsedSchools, localKelurahanMap };
        });

        const results = await Promise.all(fetchPromises);
        
        // Gabungkan semua sekolah
        const mergedSchools = results.flatMap(r => r.parsedSchools);
        
        // Gabungkan semua kelurahan dari berbagai file excel
        const finalKelurahanMap = new Map();
        results.forEach(r => {
          r.localKelurahanMap.forEach((cleanName, key) => {
            if (!finalKelurahanMap.has(key)) {
              finalKelurahanMap.set(key, cleanName);
            } else if (cleanName.includes(' ') && !finalKelurahanMap.get(key).includes(' ')) {
              finalKelurahanMap.set(key, cleanName);
            }
          });
        });

        // Jadikan array dan urutkan sesuai abjad (A-Z)
        const sortedKelurahan = Array.from(finalKelurahanMap.values()).sort();

        setDataSekolah(mergedSchools);
        setListKelurahan(sortedKelurahan);
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

  // Algoritma Pencarian & Skor Kedekatan (Versi Baru Tanpa Kecamatan)
  const cariZonasi = (e) => {
    e.preventDefault();
    const result = [];
    
    const searchKel = normalisasiTeks(formData.kelurahan);
    const inputRT = String(formData.rt).padStart(3, '0');
    const inputRW = String(formData.rw).padStart(3, '0');

    dataSekolah.forEach(sekolah => {
      let skorKedekatan = 0;
      const alamatNormal = normalisasiTeks(sekolah.alamat);
      
      // Jika kelurahan sekolah sama persis dengan domisili pencari
      if (alamatNormal.includes(searchKel)) {
        skorKedekatan = 2; 
      }

      const isPrio1 = sekolah.prioritas_1.some(p => p.kelurahan === searchKel && p.rt === inputRT && p.rw === inputRW);
      if (isPrio1) {
        result.push({ ...sekolah, status: 'Prioritas 1', badge: 'bg-success', skorKedekatan });
        return; 
      }

      const isPrio2 = sekolah.prioritas_2.some(p => p.kelurahan === searchKel && (p.rt ? p.rt === inputRT : true) && (p.rw ? p.rw === inputRW : true));
      if (isPrio2) {
        result.push({ ...sekolah, status: 'Prioritas 2', badge: 'bg-primary', skorKedekatan });
        return;
      }

      const isPrio3 = sekolah.prioritas_3.some(p => p.kelurahan === searchKel);
      if (isPrio3) {
        result.push({ ...sekolah, status: 'Prioritas 3', badge: 'bg-secondary', skorKedekatan });
      }
    });

    // Urutkan: Prio (1,2,3) -> Skor Jarak (2,0) -> Jenjang (SD, SMP, SMA)
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
          
          {/* HEADER RESPONSIF */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4 text-center text-md-start">
            <h4 className="text-dark fw-bold mb-0 fs-5 fs-md-4 lh-base">
              Portal Manajemen Zonasi Pendidikan
            </h4>
            {isLoading ? (
              <span className="badge bg-warning text-dark py-2 px-3 border rounded-0 w-100 w-md-auto text-wrap">
                Memuat Database PMB...
              </span>
            ) : (
              <span className="badge bg-white text-success py-2 px-3 border border-success rounded-0 shadow-sm w-100 w-md-auto text-wrap">
                ✅ Data Siap ({dataSekolah.length} Sekolah Terindeks)
              </span>
            )}
          </div>

          {/* NAVIGASI TAB RESPONSIF, */}
          <ul className="nav nav-pills flex-column flex-sm-row mb-4 gap-2 border-bottom pb-3">
            <li className="nav-item flex-sm-fill">
              <button 
                className={`nav-link text-dark fw-semibold rounded-2 px-3 py-2 w-100 ${activeTab === 'dashboard' ? 'active bg-white border shadow-sm' : 'bg-light text-muted border'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                🔍 Pencarian Zonasi Wilayah
              </button>
            </li>
            <li className="nav-item flex-sm-fill">
              <button 
                className={`nav-link text-dark fw-semibold rounded-2 px-3 py-2 w-100 ${activeTab === 'antrian' ? 'active bg-white border shadow-sm' : 'bg-light text-muted border'}`}
                onClick={() => setActiveTab('antrian')}
              >
                🎫 Layar Antrean Posko
              </button>
            </li>
            <li className="nav-item flex-sm-fill">
              <button 
                className={`nav-link text-dark fw-semibold rounded-2 px-3 py-2 w-100 ${activeTab === 'panduan' ? 'active bg-white border shadow-sm' : 'bg-light text-muted border'}`}
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
                    <div className="row g-4 justify-content-center">
                     <div className="col-md-4 position-relative">
                        <label className="form-label text-secondary small fw-bold">KELURAHAN</label>
                        <input 
                          type="text" 
                          className="form-control rounded-0 p-2 border-secondary" 
                          name="kelurahan" 
                          value={formData.kelurahan} 
                          onChange={handleKelurahanChange} 
                          placeholder="Ketik min. 3 huruf (Cth: CAW)..." 
                          required 
                          disabled={isLoading} 
                          autoComplete="off"
                        />
                        {/* Dropdown Autocomplete Muncul di Sini */}
                        {showSuggestions && filteredKelurahan.length > 0 && (
                          <ul className="list-group position-absolute w-100 shadow-lg" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                            {filteredKelurahan.map((kel, idx) => (
                              <li 
                                key={idx} 
                                className="list-group-item list-group-item-action small py-2" 
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSelectKelurahan(kel)}
                              >
                                {kel}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-secondary small fw-bold">RUKUN TETANGGA (RT)</label>
                        <input type="number" className="form-control rounded-0 p-2 border-secondary" name="rt" value={formData.rt} onChange={handleChange} placeholder="Contoh: 3" required disabled={isLoading} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-secondary small fw-bold">RUKUN WARGA (RW)</label>
                        <input type="number" className="form-control rounded-0 p-2 border-secondary" name="rw" value={formData.rw} onChange={handleChange} placeholder="Contoh: 4" required disabled={isLoading} />
                      </div>
                    </div>
                    <div className="mt-4 border-top pt-4 text-end">
                      <button type="submit" className="btn btn-primary rounded-0 px-5 py-2 fw-bold w-100 w-md-auto" disabled={isLoading}>
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

       {/* ==================================================================================== */}
          {/* TAB 2: BUKU SAKU PETUGAS POSKO (VERSI MEGA-KOMPREHENSIF)                               */}
          {/* MENCAKUP JUKNIS, ALUR, DAYA TAMPUNG, SPMB BERSAMA, SSG, DAN FAQ RESOLUSI MASALAH       */}
          {/* ==================================================================================== */}
   {activeTab === 'panduan' && (
  <BukuSaku /> 
)}
          {/* ==================================================================================== */}
          {/* AKHIR TAB 2: BUKU SAKU PETUGAS POSKO                                                   */}
          {/* ==================================================================================== */}
          {activeTab === 'antrian' && (
             <Antrean />
          )}
          
        </div>
      </div>
    </div>
  );
}