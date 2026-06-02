import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';

// Fungsi helper untuk menghapus semua spasi dan karakter non-alfabetik agar pencocokan 100% kebal typo spasi
const normalisasiTeks = (teks) => {
  return String(teks || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
};

export default function DashboardZonasiTerpadu() {
  const [dataSekolah, setDataSekolah] = useState([]);
  const [formData, setFormData] = useState({ kecamatan: '', kelurahan: '', rt: '', rw: '' });
  const [hasilPencarian, setHasilPencarian] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        console.error("Terjadi kesalahan:", error);
        setIsLoading(false);
      }
    };

    loadAllExcelFiles();
  }, []);

  const handleChange = (e) => {
    // Teks yang ditampilkan di input form biarkan utuh dengan spasinya agar rapi dibaca user
    setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() });
  };

  const cariZonasi = (e) => {
    e.preventDefault();
    const result = [];
    
    // Normalisasi input sebelum melakukan filter
    const searchKec = normalisasiTeks(formData.kecamatan);
    const searchKel = normalisasiTeks(formData.kelurahan);
    const inputRT = String(formData.rt).padStart(3, '0');
    const inputRW = String(formData.rw).padStart(3, '0');

    dataSekolah.forEach(sekolah => {
      const isPrio1 = sekolah.prioritas_1.some(p => 
        p.kecamatan === searchKec && p.kelurahan === searchKel && p.rt === inputRT && p.rw === inputRW
      );
      if (isPrio1) {
        result.push({ ...sekolah, status: 'Prioritas 1', badge: 'bg-success' });
        return; 
      }

      const isPrio2 = sekolah.prioritas_2.some(p => 
        p.kecamatan === searchKec && p.kelurahan === searchKel && (p.rt ? p.rt === inputRT : true) && (p.rw ? p.rw === inputRW : true)
      );
      if (isPrio2) {
        result.push({ ...sekolah, status: 'Prioritas 2', badge: 'bg-primary' });
        return;
      }

      const isPrio3 = sekolah.prioritas_3.some(p => 
        p.kecamatan === searchKec && (p.kelurahan ? p.kelurahan === searchKel : true)
      );
      if (isPrio3) {
        result.push({ ...sekolah, status: 'Prioritas 3', badge: 'bg-secondary' });
      }
    });

    result.sort((a, b) => {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      
      const order = { 'SD': 1, 'SMP': 2, 'SMA': 3 };
      return order[a.jenjang] - order[b.jenjang];
    });

    setHasilPencarian(result);
  };

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-dark fw-bold mb-0">Portal Manajemen Zonasi Pendidikan</h4>
            {isLoading ? (
              <span className="badge bg-warning text-dark py-2 px-3 border rounded-0">
                Memuat Database Tahap 1...
              </span>
            ) : (
              <span className="badge bg-white text-success py-2 px-3 border border-success rounded-0">
                ✅ Database Siap ({dataSekolah.length} Sekolah)
              </span>
            )}
          </div>
          
          <div className="card shadow-sm border-0 mb-4 rounded-0">
            <div className="card-header bg-dark text-white rounded-0">
              <h6 className="mb-0 py-1 fw-normal">Parameter Pencarian Wilayah Domisili</h6>
            </div>
            <div className="card-body bg-white">
              <form onSubmit={cariZonasi}>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label text-secondary small fw-bold">KECAMATAN</label>
                    <input type="text" className="form-control rounded-0" name="kecamatan" value={formData.kecamatan} onChange={handleChange} placeholder="Contoh: KRAMAT JATI" required disabled={isLoading} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label text-secondary small fw-bold">KELURAHAN</label>
                    <input type="text" className="form-control rounded-0" name="kelurahan" value={formData.kelurahan} onChange={handleChange} placeholder="Contoh: CAWANG" required disabled={isLoading} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label text-secondary small fw-bold">RT</label>
                    <input type="number" className="form-control rounded-0" name="rt" value={formData.rt} onChange={handleChange} placeholder="3" required disabled={isLoading} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label text-secondary small fw-bold">RW</label>
                    <input type="number" className="form-control rounded-0" name="rw" value={formData.rw} onChange={handleChange} placeholder="4" required disabled={isLoading} />
                  </div>
                </div>
                <div className="mt-4 border-top pt-3">
                  <button type="submit" className="btn btn-primary rounded-0 px-4" disabled={isLoading}>
                    Tampilkan Rekomendasi
                  </button>
                </div>
              </form>
            </div>
          </div>

          {hasilPencarian && (
            <>
              {/* SUMMARY CARDS */}
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm rounded-0 bg-info bg-opacity-25 border-start border-info border-4">
                    <div className="card-body py-3">
                      <div className="text-muted small fw-bold mb-1">TOTAL SD TERSEDIA</div>
                      <h3 className="mb-0 fw-bold text-dark">
                        {hasilPencarian.filter(s => s.jenjang === 'SD').length} <span className="fs-6 fw-normal text-muted">Sekolah</span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm rounded-0 bg-primary bg-opacity-10 border-start border-primary border-4">
                    <div className="card-body py-3">
                      <div className="text-muted small fw-bold mb-1">TOTAL SMP TERSEDIA</div>
                      <h3 className="mb-0 fw-bold text-dark">
                        {hasilPencarian.filter(s => s.jenjang === 'SMP').length} <span className="fs-6 fw-normal text-muted">Sekolah</span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm rounded-0 bg-dark bg-opacity-10 border-start border-dark border-4">
                    <div className="card-body py-3">
                      <div className="text-muted small fw-bold mb-1">TOTAL SMA TERSEDIA</div>
                      <h3 className="mb-0 fw-bold text-dark">
                        {hasilPencarian.filter(s => s.jenjang === 'SMA').length} <span className="fs-6 fw-normal text-muted">Sekolah</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* TABEL HASIL PENCARIAN */}
              <div className="card shadow-sm border-0 rounded-0">
                <div className="card-header bg-white border-bottom rounded-0 d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 text-dark py-1 fw-bold">
                    Rincian Pemetaan Wilayah
                  </h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle border-bottom">
                      <thead className="table-light">
                        <tr>
                          <th className="px-4 py-3 text-secondary small" style={{width: '10%'}}>JENJANG</th>
                          <th className="py-3 text-secondary small" style={{width: '60%'}}>NAMA SATUAN PENDIDIKAN</th>
                          <th className="py-3 text-secondary small" style={{width: '30%'}}>KETERANGAN ZONASI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hasilPencarian.length > 0 ? (
                          hasilPencarian.map((sekolah, index) => (
                            <tr key={index}>
                              <td className="px-4 fw-bold text-secondary align-top pt-3">
                                <span className={`badge ${sekolah.jenjang === 'SD' ? 'bg-info text-dark' : sekolah.jenjang === 'SMP' ? 'bg-primary' : 'bg-dark'} px-2 py-1`}>
                                  {sekolah.jenjang}
                                </span>
                              </td>
                              <td className="pt-3 pb-2">
                                <div className="fw-semibold text-dark mb-1">{sekolah.nama}</div>
                                {sekolah.alamat && (
                                  <div className="text-muted small fw-normal">
                                    📍 {sekolah.alamat}
                                  </div>
                                )}
                              </td>
                              <td className="align-top pt-3">
                                <span className={`badge ${sekolah.badge} px-3 py-2 rounded-0`}>
                                  {sekolah.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center py-5 text-muted">
                              Tidak ditemukan sekolah pada radius zonasi ini.
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
        </div>
      </div>
    </div>
  );
}