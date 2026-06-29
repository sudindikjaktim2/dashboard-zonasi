import React, { useState } from 'react';

export default function BukuSakuTerpadu() {
  // Local state untuk mengontrol accordion secara independen
  const [openAccordion, setOpenAccordion] = useState('UMUM');
  const [openFaqs, setOpenFaqs] = useState({});

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const toggleFaq = (id) => {
    setOpenFaqs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="card shadow-lg border-0 rounded-0 bg-light p-3 p-md-5 mb-5 w-100">
      
      {/* ================================================================= */}
      {/* HEADER BUKU SAKU                                                  */}
      {/* ================================================================= */}
      <div className="text-center mb-5 border-bottom border-3 border-primary pb-4 bg-white p-4 rounded-3 shadow-sm">
        <h1 className="fw-black text-dark mb-2 text-uppercase tracking-wide">Buku Saku Terpadu SPMB 2026/2027</h1>
        <p className="text-secondary fs-5 mb-4">
          Panduan Komprehensif Operasional Posko: Rincian Syarat, Kuota, Sistem Pemeringkatan Seleksi, Jadwal Penutupan Sistem, dan Penanganan Kendala Lapangan
        </p>
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <span className="badge bg-primary px-4 py-2 fs-6 shadow-sm rounded-pill">Objektif</span>
          <span className="badge bg-success px-4 py-2 fs-6 shadow-sm rounded-pill">Transparan</span>
          <span className="badge bg-danger px-4 py-2 fs-6 shadow-sm rounded-pill">Akuntabel</span>
          <span className="badge bg-warning text-dark px-4 py-2 fs-6 shadow-sm rounded-pill">Berkeadilan</span>
          <span className="badge bg-info text-dark px-4 py-2 fs-6 shadow-sm rounded-pill">Tanpa Diskriminasi</span>
        </div>
      </div>

      <div className="accordion accordion-flush border shadow-sm rounded-4 overflow-hidden bg-white" id="bukuSakuAccordion">

        {/* ================================================================= */}
        {/* 1. KETENTUAN UMUM & JAM OPERASIONAL SISTEM                        */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 ${openAccordion === 'UMUM' ? 'bg-danger text-white' : 'bg-dark text-white collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('UMUM')}
            >
              <i className="bi bi-exclamation-triangle-fill me-3"></i> 1. KETENTUAN UMUM, KARTU KELUARGA & JAM PENUTUPAN SISTEM
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'UMUM' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-light">
              
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
                    <h5 className="fw-bold text-dark border-bottom border-danger pb-2">A. Validitas Kartu Keluarga (KK)</h5>
                    <ul className="small text-dark mb-0 lh-lg ps-3">
                      <li><strong>Batas Penerbitan:</strong> KK wajib diterbitkan oleh Dinas Kependudukan dan Pencatatan Sipil Provinsi DKI Jakarta paling singkat <strong>1 (satu) tahun</strong> sebelum pendaftaran pertama dimulai (Batas maksimal tanggal cetak: <strong>15 Juni 2025</strong>).</li>
                      <li><strong>Status Hubungan Keluarga:</strong> Apabila status anak di dalam KK tercatat sebagai "Famili Lain" atau "Cucu" (bukan anak kandung), maka <strong>diwajibkan</strong> melampirkan Surat Perwalian dari Pengadilan Negeri ATAU Surat Keterangan Kelurahan (PM1) yang membuktikan bahwa kedua orang tua kandung telah meninggal dunia, mengalami gangguan kejiwaan, atau menderita sakit keras. Tanpa dokumen pendukung ini, pendaftaran jalur domisili akan ditolak.</li>
                      <li><strong>Perubahan KK Kurang dari 1 Tahun:</strong> Apabila warga baru melakukan pencetakan KK kurang dari 1 (satu) tahun dikarenakan terdapat penambahan atau pengurangan anggota keluarga (seperti kelahiran anak atau perpindahan anggota keluarga lain) namun alamat domisili <strong>TIDAK MENGALAMI PERUBAHAN</strong>, KK tersebut tetap sah digunakan. Syarat utamanya adalah <strong>wajib mengunggah pindaian KK lama</strong> untuk proses verifikasi pengecualian secara manual oleh petugas dinas.</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
                    <h5 className="fw-bold text-dark border-bottom border-danger pb-2">B. Ketentuan Prapendaftaran (Sidanira)</h5>
                    <ul className="small text-dark mb-0 lh-lg ps-3">
                      <li><strong>Sasaran Wajib:</strong> Calon peserta didik yang berasal dari luar Provinsi DKI Jakarta, lulusan tahun-tahun sebelumnya (maksimal 2 tahun kelulusan terakhir), atau lulusan dari Satuan Pendidikan Asing/Internasional yang berencana mendaftar ke SMP, SMA, atau SMK Negeri.</li>
                      <li><strong>Linimasa Pelaksanaan:</strong> Dimulai pada tanggal 19 Mei hingga 10 Juni 2026. Layanan unggah berkas pada sistem beroperasi selama 24 jam penuh.</li>
                      <li><strong>Berkas Wajib Unggah:</strong> Pindaian Buku Rapor 5 Semester (Mata Pelajaran Pendidikan Kewarganegaraan, Bahasa Indonesia, Matematika, Ilmu Pengetahuan Alam, Ilmu Pengetahuan Sosial, Bahasa Inggris), Sertifikat Hasil Tes Kemampuan Akademik (TKA), Sertifikat Kejuaraan atau Prestasi (dibatasi tanggal penerbitan maksimal 31 Maret 2026), Surat Keterangan Akreditasi Sekolah Asal, dan Surat Keputusan Kepengurusan OSIS/Ekstrakurikuler (apabila memiliki).</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card border-danger border-opacity-50 shadow-sm p-4 bg-white mt-4 rounded-4">
                <h5 className="fw-bold text-danger border-bottom border-danger pb-2"><i className="bi bi-clock-history me-2"></i>C. Waktu Operasional & Jam Penutupan Otomatis Server Pusat</h5>
                <div className="alert alert-warning small border-0 mt-3 mb-4 text-dark rounded-3 shadow-sm">
                  <strong>Peringatan Penting Posko:</strong> Seluruh sistem SPMB terotomasi pada waktu nyata (seketika) dari peladen pusat Dinas Pendidikan. <strong>Tidak diberikan dispensasi atau perpanjangan waktu</strong> untuk alasan apapun (termasuk pemadaman listrik atau gangguan koneksi internet lokal) apabila batas jam penutupan harian telah terlewati.
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered text-center align-middle small mb-0 rounded-3 overflow-hidden">
                    <thead className="table-danger">
                      <tr>
                        <th style={{width: '30%'}}>Tahapan Sistem Daring</th>
                        <th style={{width: '35%'}}>Waktu Operasional Reguler Harian</th>
                        <th style={{width: '35%'}}>Batas Waktu Penutupan (Pada Hari Terakhir)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-dark">
                      <tr>
                        <td className="fw-bold text-start ps-3">1. Pengajuan Akun & Verifikasi KK</td>
                        <td>Beroperasi 24 Jam Penuh</td>
                        <td className="text-danger fw-bold bg-danger bg-opacity-10">Pukul 12.00 WIB (Tepat pada Siang Hari)</td>
                      </tr>
                      <tr>
                        <td className="fw-bold text-start ps-3">2. Pendaftaran Jalur & Pemilihan Sekolah</td>
                        <td>Pukul 08.00 - 23.59 WIB</td>
                        <td className="text-danger fw-bold bg-danger bg-opacity-10">Pukul 14.00 WIB (Tepat)</td>
                      </tr>
                      <tr>
                        <td className="fw-bold text-start ps-3">3. Proses Verifikasi Berkas (Oleh Operator)</td>
                        <td>Pukul 08.00 - 16.00 WIB</td>
                        <td className="text-danger fw-bold bg-danger bg-opacity-10">Pukul 14.00 WIB (Sistem Mengunci Peringkat)</td>
                      </tr>
                      <tr>
                        <td className="fw-bold text-start ps-3">4. Pengumuman Kelulusan Akhir</td>
                        <td colSpan="2" className="fw-bold text-success bg-success bg-opacity-10">Diumumkan Serentak Pukul 17.00 WIB pada hari penetapan</td>
                      </tr>
                      <tr>
                        <td className="fw-bold text-start ps-3">5. Lapor Diri / Daftar Ulang Daring</td>
                        <td>Pukul 08.00 - 23.59 WIB</td>
                        <td className="text-danger fw-bold bg-danger bg-opacity-10">Pukul 14.00 WIB (Apabila gagal melapor, otomatis didiskualifikasi)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. JENJANG PAUD                                                   */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'PAUD' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('PAUD')}
            >
              <i className="bi bi-puzzle-fill text-primary me-3"></i> 2. JENJANG PAUD (Taman Kanak-Kanak, KB, TPA, SPS)
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'PAUD' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="card h-100 border-primary border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-primary text-white fw-bold rounded-top-4 py-3">Ketentuan Batas Usia & Alokasi Kuota Khusus</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <ul className="mb-0 ps-3">
                        <li><strong>TK Kelompok A:</strong> Usia paling rendah 4 (empat) tahun dan paling tinggi 5 (lima) tahun terhitung per tanggal 1 Juli 2026.</li>
                        <li><strong>TK Kelompok B:</strong> Usia paling rendah 5 (lima) tahun dan paling tinggi 6 (enam) tahun terhitung per tanggal 1 Juli 2026.</li>
                        <li><strong>Kelompok Bermain (KB):</strong> Usia 2 sampai 6 tahun, dengan prioritas utama diberikan pada kelompok usia adaptif 3 hingga 4 tahun.</li>
                        <li><strong>TPA & SPS:</strong> Terbuka untuk usia 2 sampai 6 tahun.</li>
                        <li><strong>Alokasi Kuota Afirmasi PAUD:</strong> 
                          <ul className="mt-2">
                            <li>Kuota Anak Guru atau Tenaga Kependidikan di instansi PAUD tujuan: Maksimal <strong>5%</strong>.</li>
                            <li>Kuota Anak Asuh Panti Sosial di bawah naungan Dinas Sosial: Maksimal <strong>10%</strong>.</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-danger border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-danger text-white fw-bold rounded-top-4 py-3">Sistem Pemeringkatan Seleksi PAUD</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <p className="mb-3 text-muted border-bottom pb-2">Apabila jumlah pendaftar melebihi daya tampung institusi PAUD, sistem akan melakukan pemeringkatan otomatis berdasarkan urutan ketentuan berikut:</p>
                      <ul className="list-group list-group-flush list-group-numbered">
                        <li className="list-group-item bg-transparent border-0 py-2"><strong>Taman Kanak-Kanak (TK):</strong><br/>
                          1) Usia pendaftar (Diurutkan dari yang paling tua ke yang paling muda) ➔ 2) Waktu catatan sistem saat melakukan pendaftaran daring (Pendaftar lebih awal diprioritaskan).
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 border-top"><strong>Kelompok Bermain (KB):</strong><br/>
                          1) Prioritas utama untuk kelompok usia 3-4 tahun ➔ 2) Usia pendaftar tertua ke termuda ➔ 3) Waktu catatan sistem saat mendaftar.
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 border-top"><strong>TPA & Satuan PAUD Sejenis (SPS):</strong><br/>
                          1) Prioritas anak dari pegawai kantor/instansi/pasar tempat TPA tersebut beroperasi ➔ 2) Usia tertua ke termuda ➔ 3) Waktu catatan sistem saat mendaftar.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="fw-bold text-dark border-bottom pb-2 mt-5">Jadwal Pelaksanaan Pendaftaran PAUD</h5>
              <div className="table-responsive shadow-sm rounded-3">
                <table className="table table-striped table-bordered text-center align-middle small mb-0 text-dark">
                  <thead className="table-light">
                    <tr>
                      <th rowSpan="2" className="align-middle py-3">Tahap Pelaksanaan</th>
                      <th colSpan="2" className="py-2">Pelaksanaan Harian (Berlaku Jam Operasional)</th>
                      <th colSpan="2" className="py-2">Penyelesaian Akhir</th>
                    </tr>
                    <tr>
                      <th className="py-2">Pendaftaran & Verifikasi Berkas<br/>(08.00 - 16.00 WIB)</th>
                      <th className="py-2">Proses Pemeringkatan<br/>(08.00 - 16.00 WIB)</th>
                      <th className="py-2">Pengumuman<br/>(15.00 WIB)</th>
                      <th className="py-2">Daftar Ulang / Lapor Diri</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold text-start ps-4">Tahap Pertama</td>
                      <td>15 & 17 Juni 2026</td>
                      <td>18 Juni 2026</td>
                      <td className="fw-bold text-success fs-6">18 Juni 2026</td>
                      <td>19-20 Juni (08.00-16.00 WIB)<br/><span className="text-danger fw-bold border-top border-danger pt-1 d-block mt-2">Batas Penutupan: 22 Juni (Pukul 12.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-4">Tahap Kedua (Bila terdapat sisa kuota)</td>
                      <td>23 - 24 Juni 2026</td>
                      <td>25 Juni 2026</td>
                      <td className="fw-bold text-success fs-6">25 Juni 2026</td>
                      <td>26-27 Juni (08.00-16.00 WIB)<br/><span className="text-danger fw-bold border-top border-danger pt-1 d-block mt-2">Batas Penutupan: 29 Juni (Pukul 16.00 WIB)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. JENJANG SEKOLAH DASAR (SD)                                     */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'SD' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('SD')}
            >
              <i className="bi bi-journal-text text-success me-3"></i> 3. JENJANG SEKOLAH DASAR (SD)
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'SD' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <div className="row g-4 mb-4">
                <div className="col-md-5">
                  <div className="card h-100 border-success border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-success text-white fw-bold rounded-top-4 py-3">Persyaratan Usia & Alokasi Kuota SD</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <ul className="mb-0 ps-3">
                        <li><strong>Usia Minimal:</strong> Paling rendah 6 (enam) tahun terhitung per tanggal 1 Juli 2026.</li>
                        <li><strong>Prioritas Utama Usia 7 Tahun:</strong> Calon peserta didik yang telah mencapai usia 7 (tujuh) tahun ke atas wajib diterima dan diprioritaskan melebihi usia di bawahnya.</li>
                        <li><strong>Pengecualian Khusus Usia (5 Tahun 6 Bulan):</strong> Anak berusia 5 tahun 6 bulan <strong>DIWAJIBKAN</strong> menyertakan rekomendasi tertulis asli dari Psikolog Profesional atau Klinik Tumbuh Kembang. Apabila tidak terdapat psikolog di wilayah domisili, diperkenankan menggunakan rekomendasi dari Dewan Guru TK/PAUD asal anak.</li>
                        <li><strong>Aturan Larangan Nasional:</strong> Penerimaan peserta didik baru jenjang SD <strong>DILARANG KERAS</strong> menggunakan mekanisme tes membaca, menulis, dan berhitung (Calistung).</li>
                        <li><strong>Alokasi Persentase Kuota:</strong> 
                          <ul className="mt-2">
                            <li>Jalur Domisili/Zonasi: <strong>77%</strong></li>
                            <li>Jalur Afirmasi: <strong>20%</strong> (Terdiri atas Prioritas 1 Disabilitas maksimal 2 anak/rombongan belajar, Panti, Tenaga Kesehatan & Prioritas 2 KAJ, KJP).</li>
                            <li>Jalur Mutasi Pindah Tugas Orang Tua & Anak Guru: <strong>3%</strong></li>
                          </ul>
                        </li>
                        <li className="text-danger fw-bold mt-3 p-2 bg-danger bg-opacity-10 rounded border border-danger"><i className="bi bi-x-circle-fill me-2"></i>Jalur Prestasi TIDAK DIBERLAKUKAN untuk pendaftaran masuk jenjang Sekolah Dasar.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="card h-100 border-danger border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-danger text-white fw-bold rounded-top-4 py-3">Hierarki Pemeringkatan Seleksi SD</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <p className="mb-3 text-muted border-bottom pb-2">Pemeringkatan pada sistem peladen didasarkan pada urutan parameter berikut secara hierarkis (dari parameter pertama hingga terakhir):</p>
                      <ul className="mb-0 ps-3 list-group list-group-flush list-group-numbered">
                        <li className="list-group-item bg-transparent border-0 py-2"><strong>Jalur Domisili (Zonasi) Reguler:</strong><br/>
                          1) <strong>Zona Prioritas Kewilayahan</strong> (Prioritas 1: Rukun Tetangga (RT) Domisili Anak sama dengan RT Gedung Sekolah ➔ Prioritas 2: Kelurahan Domisili Anak sama atau berbatasan langsung dengan Kelurahan Sekolah)<br/>
                          2) <strong>Kriteria Usia</strong> (Pendaftar berusia lebih tua ditempatkan pada urutan di atas pendaftar yang lebih muda)<br/>
                          3) <strong>Urutan Pilihan Sekolah</strong> (Sekolah Pilihan Pertama didahulukan daripada Pilihan Kedua atau Ketiga)<br/>
                          4) <strong>Waktu Pendaftaran</strong> (Berdasarkan catatan waktu perekaman data di sistem pendaftaran daring).
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 mt-2 border-top"><strong>Jalur Afirmasi Prioritas 2 (Pemegang KAJ, PIP, dll):</strong><br/>
                          1) Zona Prioritas Kewilayahan ➔ 2) Urutan Pilihan Sekolah ➔ 3) Kriteria Usia (Tertua ke Termuda) ➔ 4) Waktu Pendaftaran Daring.
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 mt-2 border-top"><strong>Jalur Afirmasi Prioritas 1 (Khusus Disabilitas):</strong><br/>
                          1) Zona Prioritas Kewilayahan ➔ 2) Urutan Pilihan Sekolah ➔ 3) Kriteria Usia ➔ 4) Waktu Pendaftaran Daring.
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 mt-2 border-top"><strong>Jalur Mutasi Pindah Tugas & Anak Guru SD:</strong><br/>
                          1) Kriteria Usia (Tertua ke Termuda) ➔ 2) Urutan Pilihan Sekolah ➔ 3) Waktu Pendaftaran di Sistem Daring.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="fw-bold text-dark border-bottom pb-2 mt-5">Jadwal Linimasa Lengkap Pendaftaran SD (Dilengkapi Rincian Jam Penutupan)</h5>
              <div className="table-responsive shadow-sm rounded-3">
                <table className="table table-striped table-bordered text-center align-middle small mb-0 text-dark">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3">Jalur SPMB Daring</th>
                      <th className="py-3">Pendaftaran & Pemilihan Sekolah (Secara Mandiri)</th>
                      <th className="py-3">Batas Proses Seleksi (Penguncian Sistem)</th>
                      <th className="py-3">Pengumuman Hasil<br/>(Pukul 17.00 WIB)</th>
                      <th className="py-3">Lapor Diri (Daftar Ulang) Pasca Lulus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start fw-bold ps-4">Afirmasi Prioritas 1 (Panti Sosial & Anak Tenaga Kesehatan Gugur)</td>
                      <td>15 Juni - 7 Juli 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td className="text-muted fst-italic">Pengecualian<br/>(Diterima Langsung melalui Input Data)</td>
                      <td className="fw-bold text-success fs-6">8 Juli 2026</td>
                      <td>9 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Kunci: 10 Juli (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Afirmasi Prioritas 1 (Penyandang Disabilitas)</td>
                      <td>15 & 17 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>18 Juni 2026<br/><span className="text-danger fw-bold bg-danger bg-opacity-10 px-2 rounded">(Kunci Khusus Pukul 12.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">18 Juni 2026</td>
                      <td>19 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Kunci: 20 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Jalur Domisili / Zonasi Utama</td>
                      <td>15 & 17 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>18 Juni 2026<br/><span className="text-danger fw-bold">(Batas Penguncian 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">18 Juni 2026</td>
                      <td>19 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Kunci: 20 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Afirmasi Prioritas 2 (Pemegang KAJ, PIP, Pekerja KPJ)</td>
                      <td>22 - 23 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>24 Juni 2026<br/><span className="text-danger fw-bold">(Batas Penguncian 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">24 Juni 2026</td>
                      <td>25 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Kunci: 26 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Jalur Mutasi Kepindahan Tugas & Anak Guru</td>
                      <td>15 - 30 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>15-30 Juni & 1 Juli 2026<br/><span className="text-danger fw-bold">(Batas Penguncian 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">1 Juli 2026</td>
                      <td>2 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Kunci: 3 Juli (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold bg-light ps-4">Tahap Kedua (Pemenuhan Sisa Kuota Nasional)</td>
                      <td className="bg-light">29-30 Juni (08.00-23.59)<br/>1 Juli (Ditutup 14.00 WIB)</td>
                      <td className="bg-light">29-30 Juni & 1 Juli<br/><span className="text-danger fw-bold">(Batas Penguncian 14.00 WIB)</span></td>
                      <td className="fw-bold text-success bg-light fs-6">1 Juli 2026</td>
                      <td className="bg-light">2 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Kunci: 3 Juli (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold bg-light ps-4">Tahap Ketiga (Pemenuhan Kuota Terakhir)</td>
                      <td className="bg-light">6 Juli (08.00-23.59)<br/>7 Juli (Ditutup 14.00 WIB)</td>
                      <td className="bg-light">6-7 Juli 2026<br/><span className="text-danger fw-bold">(Batas Penguncian 14.00 WIB)</span></td>
                      <td className="fw-bold text-success bg-light fs-6">7 Juli 2026</td>
                      <td className="bg-light">8 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Kunci: 9 Juli (14.00 WIB)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. JENJANG SEKOLAH MENENGAH PERTAMA (SMP)                         */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'SMP' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('SMP')}
            >
              <i className="bi bi-mortarboard-fill text-info me-3"></i> 4. JENJANG SEKOLAH MENENGAH PERTAMA (SMP)
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'SMP' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <div className="row g-4 mb-4">
                <div className="col-md-5">
                  <div className="card h-100 border-info border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-info text-dark fw-bold rounded-top-4 py-3">Persyaratan Akademik, Usia & Proporsi Kuota SMP</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <ul className="mb-0 ps-3">
                        <li><strong>Batas Usia Maksimal:</strong> Paling tinggi berusia 15 (lima belas) tahun terhitung pada tanggal 1 Juli 2026.</li>
                        <li><strong>Syarat Lulusan:</strong> Telah menyelesaikan pendidikan dasar kelas 6 SD/MI/Paket A atau sederajat, dibuktikan dengan Ijazah atau Surat Keterangan Lulus (SKL) resmi.</li>
                        <li><strong>Batas Pilihan Pemetaan:</strong> Calon peserta didik dapat memilih paling banyak 3 (tiga) sekolah SMP Negeri yang berbeda dalam satu kali pengajuan data di setiap jalur pendaftaran.</li>
                        <li><strong>Distribusi Proporsi Kuota (Total 100%):</strong>
                          <ul className="mt-2">
                            <li><strong>Jalur Prestasi:</strong> Akademik (20%) & Non-Akademik (7%).</li>
                            <li><strong>Jalur Afirmasi:</strong> Total 20% (Prioritas 1 termasuk Anak Tenaga Kesehatan, Panti Sosial, Disabilitas & Prioritas 2 mencakup KJP Plus/PIP).</li>
                            <li><strong>Jalur Domisili / Zonasi Utama:</strong> Mengalokasikan <strong>50%</strong> dari total kursi rombongan belajar.</li>
                            <li><strong>Jalur Mutasi Kepindahan Tugas:</strong> 3%.</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="card h-100 border-danger border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-danger text-white fw-bold rounded-top-4 py-3">Hierarki Pemeringkatan Seleksi SMP</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <p className="mb-3 text-muted border-bottom pb-2">Pemeringkatan pada dasbor bersifat dinamis dan akan menyaring pendaftar apabila kuota melampaui kapasitas, menggunakan urutan parameter berikut:</p>
                      <ul className="mb-0 ps-3 list-group list-group-flush list-group-numbered">
                        <li className="list-group-item bg-transparent border-0 py-2"><strong>Jalur Prestasi (Akademik maupun Non-Akademik):</strong><br/>
                          1) <strong>Total Nilai Pembobotan Indeks Prestasi Akhir</strong> (Akumulasi Nilai Rapor + Hasil TKA + Poin Bobot Sertifikat Kejuaraan) ➔ 2) <strong>Zona Prioritas Kewilayahan Domisili</strong> ➔ 3) <strong>Urutan Pilihan Sekolah</strong> ➔ 4) <strong>Waktu Pendaftaran Digital.</strong>
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 mt-2 border-top"><strong>Jalur Domisili (Zonasi) Reguler:</strong><br/>
                          1) <strong>Zona Prioritas Domisili Berjenjang</strong> (Prioritas 1: RT Domisili bersinggungan langsung dengan RT Sekolah ➔ Prioritas 2: RT di sekitar wilayah zonasi pemetaan Dinas Pendidikan ➔ Prioritas 3: Kelurahan yang sama dengan Kelurahan Sekolah)<br/>
                          2) <strong>Faktor Batas Usia</strong> (Pendaftar yang lebih tua posisinya diprioritaskan melebihi pendaftar muda)<br/>
                          3) <strong>Urutan Pilihan Sekolah</strong><br/>
                          4) <strong>Catatan Waktu Pendaftaran Sistem.</strong>
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 mt-2 border-top"><strong>Jalur Afirmasi Prioritas 2, Jalur Mutasi, & Pemenuhan Sisa Kuota (Tahap Kedua):</strong><br/>
                          1) Zona Prioritas Wilayah ➔ 2) <strong>Pembobotan Nilai Akademik Terapan</strong> (Terdiri dari Nilai Rapor 75% ditambah Persentil di Sekolah Asal 25%) ➔ 3) Urutan Pilihan Sekolah ➔ 4) Waktu Pendaftaran Digital.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="fw-bold text-dark border-bottom pb-2 mt-5">Jadwal Linimasa Lengkap Pendaftaran SMP (Dilengkapi Rincian Jam Penutupan)</h5>
              <div className="table-responsive shadow-sm rounded-3">
                <table className="table table-striped table-bordered text-center align-middle small mb-0 text-dark">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3">Jalur Pelaksanaan SPMB Daring</th>
                      <th className="py-3">Pendaftaran Formulir & Pilihan Sekolah Mandiri</th>
                      <th className="py-3">Batas Penutupan Proses Seleksi Otomatis Sistem</th>
                      <th className="py-3">Waktu Rilis Pengumuman<br/>(Serentak 17.00 WIB)</th>
                      <th className="py-3">Tahap Lapor Diri (Daftar Ulang) Pasca Lulus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start fw-bold ps-4">Jalur Prestasi (Kategori Akademik & Non-Akademik)</td>
                      <td>15 & 17 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>18 Juni 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">18 Juni 2026</td>
                      <td>19 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 20 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Afirmasi Prioritas 1 (Khusus Penyandang Disabilitas)</td>
                      <td>15 & 17 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>18 Juni 2026<br/><span className="text-danger fw-bold bg-danger bg-opacity-10 px-2 rounded">(Batas Kunci Khusus: 12.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">18 Juni 2026</td>
                      <td>19 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 20 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Afirmasi Prioritas 2 (Pemegang KJP Plus, PIP, Pekerja)</td>
                      <td>22 - 23 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>24 Juni 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">24 Juni 2026</td>
                      <td>25 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 26 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Jalur Domisili / Zonasi Utama Kewilayahan</td>
                      <td>29-30 Juni (08.00-23.59 WIB)<br/>1 Juli (Ditutup pada 14.00 WIB)</td>
                      <td>29-30 Juni & 1 Juli 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">1 Juli 2026</td>
                      <td>2 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 3 Juli (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Jalur Mutasi Kepindahan Tugas & Hak Pendidik (Anak Guru)</td>
                      <td>15 - 30 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>15-30 Juni & 1 Juli 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">1 Juli 2026</td>
                      <td>2 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 3 Juli (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold bg-light ps-4">SPMB Tahap Kedua (Pemenuhan Sisa Kuota Nasional)</td>
                      <td className="bg-light">6 Juli (08.00-23.59 WIB)<br/>7 Juli (Ditutup pada 14.00 WIB)</td>
                      <td className="bg-light">6-7 Juli 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success bg-light fs-6">7 Juli 2026</td>
                      <td className="bg-light">8 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 9 Juli (14.00 WIB)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 5. JENJANG SEKOLAH MENENGAH ATAS (SMA)                              */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'SMA' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('SMA')}
            >
              <i className="bi bi-buildings-fill text-primary me-3"></i> 5. JENJANG SEKOLAH MENENGAH ATAS (SMA)
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'SMA' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <div className="row g-4 mb-4">
                <div className="col-md-5">
                  <div className="card h-100 border-primary border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-primary text-white fw-bold rounded-top-4 py-3">Ketentuan Kelulusan, Batas Usia & Alokasi Kuota SMA</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <ul className="mb-0 ps-3">
                        <li><strong>Ambang Batas Usia:</strong> Paling tinggi 21 (dua puluh satu) tahun pada saat tanggal 1 Juli 2026 berjalan.</li>
                        <li><strong>Syarat Kelulusan Administrasi:</strong> Telah menuntaskan program kelas 9 SMP/MTs/Paket B, dibuktikan validitasnya dengan Ijazah/SKL dan Buku Rapor secara lengkap.</li>
                        <li><strong>Distribusi Proporsi Kuota SMA (Skala 100%):</strong>
                          <ul className="mt-2">
                            <li><strong>Jalur Prestasi Akademik:</strong> 25% dari total kursi (Proporsi lebih besar dibandingkan jenjang SMP).</li>
                            <li><strong>Jalur Prestasi Non-Akademik:</strong> 7%.</li>
                            <li><strong>Jalur Afirmasi Kewilayahan & Sosial:</strong> Total alokasi sebesar <strong>30%</strong> (Termasuk Prioritas 1 Disabilitas, Panti Sosial, Tenaga Kesehatan, dan Prioritas 2 KJP Plus).</li>
                            <li><strong>Jalur Domisili / Zonasi Utama:</strong> Ditetapkan menjadi <strong>35%</strong> dari total daya tampung.</li>
                            <li><strong>Jalur Mutasi Kepindahan Tugas:</strong> 3%.</li>
                          </ul>
                        </li>
                        <li className="text-danger fw-bold border-top pt-3 mt-3"><i className="bi bi-pin-map-fill me-2"></i>Regulasi Khusus SMAN 69: Seluruh kuota penerimaan SMAN 69 Kabupaten Administratif Kepulauan Seribu diprioritaskan sepenuhnya (100%) bagi warga yang domisili riil-nya tercatat di wilayah Kepulauan Seribu berdasarkan Kartu Keluarga.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="card h-100 border-danger border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-danger text-white fw-bold rounded-top-4 py-3">Sistem Pemeringkatan Seleksi SMA</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <p className="mb-3 text-muted border-bottom pb-2">Pemeringkatan peladen didasarkan pada urutan parameter berikut secara hierarkis:</p>
                      <ul className="mb-0 ps-3 list-group list-group-flush list-group-numbered">
                        <li className="list-group-item bg-transparent border-0 py-2"><strong>Jalur Prestasi (Akademik & Non-Akademik):</strong><br/>
                          1) <strong>Total Nilai Pembobotan Indeks Prestasi Akademik Nasional</strong> (Formula: Nilai Rapor + Ujian TKA + Evaluasi Sertifikat) ➔ 2) <strong>Zona Prioritas Kewilayahan Domisili</strong> ➔ 3) <strong>Urutan Pilihan Sekolah</strong> ➔ 4) <strong>Catatan Waktu Pendaftaran Digital.</strong>
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 mt-2 border-top"><strong>Jalur Domisili (Zonasi) Reguler Tingkat SMA:</strong><br/>
                          <span className="text-danger fw-bold p-1 bg-danger bg-opacity-10 rounded mb-1 d-inline-block">PERHATIAN: Pemeringkatan pertama mengalami modifikasi khusus untuk jenjang SMA.</span><br/>
                          1) <strong>Pembobotan Murni Nilai Rapor (75%) disandingkan dengan Persentil Sekolah Asal (25%)</strong> (Pendaftar dengan nilai lebih tinggi diutamakan pada zonasi tingkat SMA)<br/>
                          2) <strong>Zona Prioritas Wilayah</strong> (Prioritas 1: RT Rumah Bersinggungan ➔ Prioritas 2: Pemetaan Jarak Terdekat ➔ Prioritas 3: Kelurahan Sama)<br/>
                          3) <strong>Usia Tertua ke Termuda</strong><br/>
                          4) <strong>Urutan Pilihan Sekolah</strong><br/>
                          5) <strong>Waktu Pendaftaran Digital.</strong>
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 mt-2 border-top"><strong>Jalur Afirmasi Prioritas 2, Mutasi, & Pemenuhan Sisa Kuota (Tahap Kedua):</strong><br/>
                          1) Zona Prioritas Wilayah ➔ 2) <strong>Evaluasi Pembobotan Nilai Rapor (75%) & Persentil (25%)</strong> ➔ 3) Urutan Pilihan Sekolah ➔ 4) Waktu Pendaftaran Daring.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="fw-bold text-dark border-bottom pb-2 mt-5">Jadwal Linimasa Terperinci Pendaftaran SMA (Dilengkapi Rincian Jam Penutupan Server)</h5>
              <div className="table-responsive shadow-sm rounded-3">
                <table className="table table-striped table-bordered text-center align-middle small mb-0 text-dark">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3">Jalur Pelaksanaan SPMB Daring (SMA)</th>
                      <th className="py-3">Jadwal Pendaftaran Formulir & Input Pilihan Sekolah</th>
                      <th className="py-3">Batas Penutupan Proses Pemeringkatan Otomatis</th>
                      <th className="py-3">Waktu Rilis Pengumuman<br/>(Serentak 17.00 WIB)</th>
                      <th className="py-3">Tahap Lapor Diri (Daftar Ulang) Pasca Lulus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start fw-bold ps-4">Jalur Prestasi (Kategori Akademik & Non-Akademik)</td>
                      <td>15 & 17 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>18 Juni 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">18 Juni 2026</td>
                      <td>19 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 20 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Afirmasi Prioritas 1 (Khusus Disabilitas Fisik/Mental)</td>
                      <td>15 & 17 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>18 Juni 2026<br/><span className="text-danger fw-bold bg-danger bg-opacity-10 px-2 rounded">(Batas Kunci Khusus: 12.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">18 Juni 2026</td>
                      <td>19 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 20 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Afirmasi Prioritas 2 (KJP Plus, PIP, Anak Pekerja)</td>
                      <td>22 - 23 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>24 Juni 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">24 Juni 2026</td>
                      <td>25 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 26 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Jalur Domisili / Zonasi Utama Kewilayahan</td>
                      <td>29-30 Juni (08.00-23.59 WIB)<br/>1 Juli (Ditutup pada 14.00 WIB)</td>
                      <td>29-30 Juni & 1 Juli 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">1 Juli 2026</td>
                      <td>2 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 3 Juli (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Jalur Mutasi Kepindahan Orang Tua & Anak Guru</td>
                      <td>15 - 30 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>15-30 Juni & 1 Juli 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">1 Juli 2026</td>
                      <td>2 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 3 Juli (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold bg-light ps-4">SPMB Tahap Kedua (Periode Pemenuhan Kuota Tersisa)</td>
                      <td className="bg-light">6 Juli (08.00-23.59 WIB)<br/>7 Juli (Ditutup pada 14.00 WIB)</td>
                      <td className="bg-light">6-7 Juli 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success bg-light fs-6">7 Juli 2026</td>
                      <td className="bg-light">8 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 9 Juli (14.00 WIB)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 6. JENJANG SEKOLAH MENENGAH KEJURUAN (SMK)                          */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'SMK' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('SMK')}
            >
              <i className="bi bi-tools text-warning me-3"></i> 6. JENJANG SEKOLAH MENENGAH KEJURUAN (SMK)
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'SMK' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <div className="row g-4 mb-4">
                <div className="col-md-5">
                  <div className="card h-100 border-warning border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-warning text-dark fw-bold rounded-top-4 py-3">Persyaratan Umum, Bukti Fisik Khusus, & Distribusi Kuota SMK</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <ul className="mb-0 ps-3">
                        <li><strong>Aturan Batas Usia Pendaftaran:</strong> Maksimal 21 (dua puluh satu) tahun berjalan pada saat tanggal 1 Juli 2026.</li>
                        <li className="text-danger mt-2"><strong>Sertifikat Fisik Wajib Tambahan:</strong> Calon pendaftar jurusan teknikal diwajibkan melampirkan "Surat Keterangan Pemeriksaan Tidak Buta Warna" dari instansi medis resmi (RSUD/Puskesmas Kecamatan) untuk mendaftar di 64 Konsentrasi Keahlian spesifik (seperti Ilmu Pelayaran Kapal, Animasi Digital, Desain Komunikasi Visual DKV, Rekayasa Perangkat Lunak RPL, Teknik Mesin, dan Kelistrikan). Bagi peminat program keahlian Nautika Kapal Penangkap Ikan dan Teknika Kapal, kuota pendaftaran diprioritaskan bagi gender Laki-laki dikarenakan standar fisik tuntutan lapangan kerja kelautan.</li>
                        <li className="mt-2"><strong>Batasan Input Pilihan:</strong> Maksimal hanya dapat memilih 3 (tiga) Konsentrasi Keahlian secara bebas (Diperkenankan 3 jurusan di 1 sekolah yang sama, atau 3 jurusan disebar ke sekolah berbeda).</li>
                        <li className="mt-2"><strong>Distribusi Proporsi Kuota Nasional SMK:</strong>
                          <ul className="mt-2">
                            <li><strong>Jalur Prestasi Akademik:</strong> Mayoritas kuota sebesar <strong>53%</strong>.</li>
                            <li><strong>Jalur Prestasi Non-Akademik:</strong> 7%.</li>
                            <li><strong>Jalur Afirmasi Inklusi & Sosial:</strong> Total <strong>37%</strong>.</li>
                            <li><strong>Jalur Mutasi Kepindahan:</strong> 3%.</li>
                            <li className="fw-bold bg-danger text-white px-3 py-1 mt-3 d-inline-block rounded-3 w-100 text-center shadow-sm">PENGUMUMAN PENTING: TIDAK DIBERLAKUKAN JALUR DOMISILI (ZONASI) UNTUK JENJANG SMK DIKARENAKAN KARAKTERISTIK PEMINATAN JURUSAN.</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="card h-100 border-danger border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-danger text-white fw-bold rounded-top-4 py-3">Sistem Pemeringkatan Algoritma Tingkat SMK</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <p className="mb-3 text-muted border-bottom pb-2">Dikarenakan SMK secara murni tidak menggunakan faktor zonasi jarak domisili, sistem akan menyeleksi dari kemampuan akademik dan prestasi melalui parameter hierarkis berikut:</p>
                      <ul className="mb-0 ps-3 list-group list-group-flush list-group-numbered">
                        <li className="list-group-item bg-transparent border-0 py-2"><strong>Seleksi Jalur Prestasi Akademik Nasional:</strong><br/>
                          1) <strong>Total Perhitungan Pembobotan Indeks Prestasi Akademik Tertinggi</strong> (Berdasarkan nilai ijazah, rapor komprehensif, dan kurasi tes kemampuan) ➔ 2) <strong>Urutan Penempatan Pilihan Sekolah/Jurusan</strong> (Jurusan pilihan pertama memprioritaskan pendaftar apabila nilai identik) ➔ 3) <strong>Sistem Jejak Waktu Mendaftar Digital.</strong>
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 mt-2 border-top"><strong>Seleksi Jalur Prestasi Non-Akademik:</strong><br/>
                          1) <strong>Total Poin Pembobotan Indeks Prestasi Sertifikat Non-Akademik Terverifikasi</strong> (Tingkat kota hingga internasional) ➔ 2) <strong>Urutan Prioritas Pilihan Jurusan</strong> ➔ 3) <strong>Catatan Waktu Mendaftar di Sistem.</strong>
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 mt-2 border-top"><strong>Seleksi Jalur Afirmasi Prioritas 2, Mutasi Pindah Tugas, & Pemenuhan Sisa Kuota Nasional Tahap Kedua:</strong><br/>
                          1) <strong>Akumulasi Indeks Prestasi Akademik Inti</strong> (Formula baku: Nilai Rapor Akhir dikali 70% + Hasil TKA Ujian Nasional dikali 30%) ➔ 2) <strong>Urutan Input Pilihan Sekolah/Jurusan</strong> ➔ 3) <strong>Waktu Penyelesaian Formulir Pendaftaran Daring.</strong>
                        </li>
                        <li className="list-group-item bg-transparent border-0 py-2 mt-2 border-top"><strong>Seleksi Eksklusif Afirmasi Prioritas 1 (Disabilitas Fisik / Inklusi):</strong><br/>
                          1) <strong>Kriteria Faktor Usia Calon Pendaftar</strong> (Calon berumur lebih tua diselamatkan lebih awal dari pendaftar yang lebih muda) ➔ 2) <strong>Urutan Pemilihan Jurusan Target</strong> ➔ 3) <strong>Akurasi Waktu Mendaftar di Sistem.</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="fw-bold text-dark border-bottom pb-2 mt-5">Matriks Penjadwalan Resmi Pendaftaran SMK (Dengan Tenggat Waktu Server)</h5>
              <div className="table-responsive shadow-sm rounded-3">
                <table className="table table-striped table-bordered text-center align-middle small mb-0 text-dark">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3">Jalur Masuk Pendaftaran (Khusus SMK)</th>
                      <th className="py-3">Pemilihan Program Keahlian / Jurusan</th>
                      <th className="py-3">Batas Penutupan Proses Kurasi Sistem</th>
                      <th className="py-3">Perilisan Pengumuman<br/>(Pukul 17.00 WIB)</th>
                      <th className="py-3">Periode Wajib Lapor Diri Pendaftar Lulus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start fw-bold ps-4">Jalur Prestasi (Alokasi Akademik & Non-Akademik)</td>
                      <td>15 & 17 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>18 Juni 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">18 Juni 2026</td>
                      <td>19 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 20 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Afirmasi Prioritas 1 (Khusus Inklusi Disabilitas)</td>
                      <td>15 & 17 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>18 Juni 2026<br/><span className="text-danger fw-bold bg-danger bg-opacity-10 px-2 rounded">(Batas Kunci Khusus: 12.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">18 Juni 2026</td>
                      <td>19 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 20 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Afirmasi Prioritas 2 (Dana Bantuan KJP, PIP, Pekerja)</td>
                      <td>22 - 23 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>24 Juni 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">24 Juni 2026</td>
                      <td>25 Juni (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 26 Juni (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold ps-4">Jalur Mutasi Kepindahan Tugas Keluarga & Afirmasi Tenaga Kesehatan</td>
                      <td>15 - 30 Juni 2026<br/>(08.00 s.d 23.59 WIB)</td>
                      <td>15-30 Juni & 1 Juli 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success fs-6">1 Juli 2026</td>
                      <td>2 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 3 Juli (14.00 WIB)</span></td>
                    </tr>
                    <tr>
                      <td className="text-start fw-bold bg-light ps-4">Sistem Pembukaan Tahap Kedua (Eksklusif Sisa Kuota)</td>
                      <td className="bg-light">6 Juli (08.00-23.59 WIB)<br/>7 Juli (Ditutup pada 14.00 WIB)</td>
                      <td className="bg-light">6-7 Juli 2026<br/><span className="text-danger fw-bold">(Batas Kunci: Pukul 14.00 WIB)</span></td>
                      <td className="fw-bold text-success bg-light fs-6">7 Juli 2026</td>
                      <td className="bg-light">8 Juli (Pukul 08.00 s.d 23.59 WIB)<br/><span className="text-danger fw-bold border-top pt-1 d-block mt-1">Batas Akhir: 9 Juli (14.00 WIB)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 7. JENJANG SLB & SKB                                              */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'SLBSKB' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('SLBSKB')}
            >
              <i className="bi bi-heart-pulse-fill text-secondary me-3"></i> 7. JENJANG SEKOLAH LUAR BIASA (SLB) & SANGGAR KEGIATAN BELAJAR (SKB)
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'SLBSKB' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="card h-100 border-secondary border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-secondary text-white fw-bold rounded-top-4 py-3">A. Pedoman Sekolah Luar Biasa (TKLB, SDLB, SMPLB, SMALB)</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <ul className="mb-0 ps-3">
                        <li><strong>Verifikasi Dokumen Administratif:</strong> Sepenuhnya diwajibkan melampirkan lembar surat keterangan diagnosis hambatan yang diterbitkan oleh tenaga medis atau profesional berlisensi (Psikolog Klinis, Dokter Spesialis Tumbuh Kembang, atau Konselor Rehabilitasi Medis). Batas usia menyesuaikan jenjang yang dilamar (SDLB 6-12 tahun, SMPLB maksimal 18 tahun, SMALB maksimal 21 tahun).</li>
                        <li><strong>Ketentuan Kuota Eksklusif Panti:</strong> Pemerintah menjamin hak Afirmasi Anak Panti Sosial dengan mengalokasikan kursi sebesar 40% dari total keseluruhan daya tampung institusi SLB terkait.</li>
                        <li><strong>Opsi Mekanisme Pendaftaran Fleksibel:</strong> Warga diberikan kebebasan mendaftar secara <strong>Luring (Datang Langsung)</strong> ke gedung SLB tujuan untuk dibantu oleh panitia sekolah, atau secara <strong>Daring (Mandiri)</strong> melalui aplikasi portal khusus SLB Provinsi DKI Jakarta.</li>
                        <li><strong>Hierarki Alat Pemeringkat SLB:</strong> 1) Prioritas ditempati oleh pendaftar jalur Anak Panti Sosial yang wilayahnya paling berdekatan dengan gedung ➔ 2) Faktor Batas Usia (Calon pendaftar yang lebih tua dikunci ketersediaan kursinya terlebih dahulu) ➔ 3) Jejak Data Waktu Mendaftar Fisik atau Daring.</li>
                        <li><strong>Penjadwalan Tahap Gelombang 1:</strong> Daftar & Serah Terima Verifikasi Fisik/Daring (Tanggal 15, dan 17-18 Juni pada 08.00-16.00 WIB) ➔ Seleksi Observasi/Berkas (19 Juni dari 08.00-12.00 WIB) ➔ Pengumuman Hasil (20 Juni pukul 15.00 WIB) ➔ Proses Lapor Diri Fisik (22-23 Juni pada 08.00-16.00 WIB). Apabila terdapat kekosongan kursi, Tahap 2 akan dibuka pada tanggal 6-9 Juli 2026.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-secondary border-opacity-50 shadow-sm rounded-4">
                    <div className="card-header bg-secondary text-white fw-bold rounded-top-4 py-3">B. Pedoman Sanggar Kegiatan Belajar (Paket Kesetaraan)</div>
                    <div className="card-body small lh-lg text-dark p-4">
                      <ul className="mb-0 ps-3">
                        <li><strong>Pembagian Program Kesetaraan Edukasi Nasional:</strong> Program Paket A (Kurikulum setara kelulusan SD, dengan persyaratan anak minimal berusia 7 tahun pada saat mendaftar), Program Paket B (Kurikulum setara kelulusan SMP, diwajibkan menyertakan Ijazah kelulusan asli Paket A/SD), Program Paket C (Kurikulum setara SMA, diwajibkan menyerahkan Ijazah kelulusan asli Paket B/SMP).</li>
                        <li><strong>Fleksibilitas Mekanisme Pendaftaran SKB:</strong> Penduduk dipersilakan mendaftar secara langsung (Luring) ke pusat lokasi operasional SKB terdekat, atau dapat melengkapi entri dokumen via Daring di portal pusat SKB Jakarta.</li>
                        <li><strong>Hierarki Penyeleksian & Prioritasi Kuota:</strong> 1) Kriteria Peringkat Berdasarkan Usia (Semakin tua semakin didahulukan untuk menekan angka putus sekolah) ➔ 2) Kalkulasi Rata-rata Nilai Ijazah Kelulusan Terakhir (Hanya diberlakukan untuk pendaftar Paket B dan Paket C) ➔ 3) Titik Jarak Tempuh Tempat Tinggal Calon Murid paling pendek menuju pusat gedung SKB.</li>
                        <li><strong>Penjadwalan Tahap Pembukaan 1:</strong> Sesi Pendaftaran & Verifikasi Legal (Tanggal 6-10 Juli dari 08.00-16.00 WIB harian) ➔ Eksekusi Seleksi Data (11 Juli) ➔ Penetapan Kelulusan Diumumkan (11 Juli tepat 15.00 WIB) ➔ Finalisasi Lapor Diri (13-14 Juli dari 08.00-16.00 WIB). Sesi Pemenuhan Kuota Terakhir Tahap 2 dirilis pada rentang 15-16 Juli 2026.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 8. SPMB BERSAMA (SEKOLAH SWASTA MITRA)                            */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'SWASTA' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('SWASTA')}
            >
              <i className="bi bi-bank2 text-success me-3"></i> 8. REGULASI SPMB BERSAMA (Pelaksanaan di Sekolah Swasta Mitra Pemprov)
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'SWASTA' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <div className="alert alert-success border-0 shadow-sm small lh-lg rounded-4 p-4">
                <h5 className="fw-bold text-success mb-3">Mekanisme Kemitraan Strategis SPMB Bersama (Jenjang SMP, SMA, dan SMK Swasta)</h5>
                <p className="mb-4 text-dark">Program SPMB Bersama diinisiasi sebagai kemitraan resmi antara Pemerintah Provinsi DKI Jakarta dan pihak yayasan Sekolah Swasta. Program ini menyasar calon peserta didik yang memenuhi standar administratif yang tidak tertampung di sekolah negeri akibat keterbatasan daya tampung ruang kelas. Calon pendaftar yang dinyatakan lulus melalui jalur khusus ini <strong>DIBEBASKAN SEPENUHNYA dari seluruh pungutan Biaya Uang Pangkal Gedung serta Biaya SPP Bulanan selama 3 Tahun Ajaran (Biaya pendidikan tersebut dibayarkan oleh dana hibah Pemprov DKI)</strong>.</p>
                
                <div className="row g-4 mt-2">
                  <div className="col-md-6">
                    <div className="p-4 bg-white border border-success rounded-4 h-100 shadow-sm">
                      <h6 className="fw-bold text-dark border-bottom border-success pb-2">Ketentuan Syarat Wajib & Hukuman Pelanggaran:</h6>
                      <ul className="mb-0 ps-3 text-dark mt-3">
                        <li className="mb-2"><strong>Dikhususkan Bagi Kategori Afirmasi:</strong> Diperuntukkan secara eksklusif bagi para pemegang aktif KJP Plus berjalan, penerima Program Indonesia Pintar (PIP), pemegang Kartu Anak Jakarta (KAJ), Anak Tenaga Kesehatan, Anak Pengemudi JakLingko tersertifikasi, dan Anak dari Pekerja/Buruh anggota KPJ.</li>
                        <li className="mb-2"><strong>Peringatan Hukuman Diskualifikasi Permanen:</strong> Apabila siswa telah dinyatakan lulus dan diterima masuk pada salah satu sekolah swasta tersebut namun melakukan pengunduran diri secara sepihak atau melalaikan tahap Lapor Diri, maka Nomor Induk Kependudukan (NIK) siswa terkait <strong>DIBLOKIR KESELURUHAN</strong> dan dilarang mengikuti sisa jalur registrasi di tahun yang sama.</li>
                        <li><strong>Dokumen Surat Pernyataan Bermeterai:</strong> Siswa yang telah diterima diwajibkan menandatangani surat kesediaan bermeterai untuk menaati tata tertib kurikulum yayasan sekolah swasta tersebut serta <strong>DILARANG MEMINTA PERPINDAHAN SEKOLAH (Mutasi)</strong> selama minimal 3 tahun berturut-turut.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4 bg-white border border-success rounded-4 h-100 shadow-sm">
                      <h6 className="fw-bold text-dark border-bottom border-success pb-2">Kalkulasi Hierarki Pemeringkatan (Sistem Seleksi):</h6>
                      <ul className="mb-0 ps-3 text-dark mt-3">
                        <li className="mb-3"><strong>Penyaringan Pada Tingkat SMP & SMA Swasta:</strong><br/>
                          1) Pengelompokan Wilayah PMB Prioritas terdekat ➔ 2) Kalkulasi Pembobotan Nilai Rapor disandingkan dengan nilai Persentil dari Sekolah Asal ➔ 3) Urutan Penempatan Pilihan Sekolah Swasta (Maksimal 3 Sekolah Mitra) ➔ 4) Rekaman Waktu Pendaftaran Elektronik paling awal yang masuk ke dalam sistem.
                        </li>
                        <li><strong>Penyaringan Spesifik Pada Tingkat Kejuruan (SMK Swasta):</strong><br/>
                          1) Menyaring melalui Total Evaluasi Indeks Prestasi Akademik Nasional (Rumus perhitungan: 70% komposisi Nilai Rapor ditambahkan dengan 30% pencapaian Ujian TKA) ➔ 2) Penilaian Skala Prioritas Urutan Pilihan Sekolah/Jurusan Keahlian ➔ 3) Pengurutan melalui Kecepatan Pendaftaran Digital.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <h6 className="fw-bold text-dark mt-5 border-bottom border-success pb-2">Jadwal Kalender Linimasa Penyelenggaraan SPMB Bersama (Sekolah Swasta)</h6>
                <div className="table-responsive bg-white rounded-3 shadow-sm mt-3">
                  <table className="table table-striped table-bordered text-center align-middle mb-0 text-dark">
                    <thead className="table-success">
                      <tr>
                        <th rowSpan="2" className="align-middle py-3">Kategori Tahapan Tersisa (Alokasi Kuota)</th>
                        <th colSpan="2" className="py-2">Zona Aktivitas Sistem Daring</th>
                        <th colSpan="2" className="py-2">Zona Output Akhir Peladen</th>
                      </tr>
                      <tr>
                        <th className="py-2">Pendaftaran Daring & Pemilihan Sekolah<br/>(Berlaku 08.00 - 23.59 WIB)</th>
                        <th className="py-2">Penutupan Proses Seleksi Berjenjang<br/>(Batas Server 00.00 - 14.00 WIB)</th>
                        <th className="py-2">Perilisan Pengumuman Resmi<br/>(Dieksekusi Tepat 17.00 WIB)</th>
                        <th className="py-2">Waktu Kewajiban Finalisasi Lapor Diri Daring</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-bold text-start ps-4">Gelombang Penyelenggaraan Pertama</td>
                        <td>Tanggal 15 & 17 Juni 2026</td>
                        <td>18 Juni 2026 <span className="text-danger fw-bold">(Kunci 14.00)</span></td>
                        <td className="fw-bold text-success fs-6">18 Juni 2026</td>
                        <td>Mulai 19-20 Juni 2026<br/><span className="text-danger fw-bold border-top border-danger pt-1 d-inline-block mt-2">Batas Peladen Lapor: 14.00 WIB</span></td>
                      </tr>
                      <tr>
                        <td className="fw-bold text-start ps-4">Gelombang Penyelenggaraan Kedua</td>
                        <td>Rentang 22 - 23 Juni 2026</td>
                        <td>24 Juni 2026 <span className="text-danger fw-bold">(Kunci 14.00)</span></td>
                        <td className="fw-bold text-success fs-6">24 Juni 2026</td>
                        <td>Mulai 25-26 Juni 2026<br/><span className="text-danger fw-bold border-top border-danger pt-1 d-inline-block mt-2">Batas Peladen Lapor: 14.00 WIB</span></td>
                      </tr>
                      <tr>
                        <td className="fw-bold text-start ps-4">Gelombang Penyelenggaraan Akhir</td>
                        <td>Rentang 6 - 7 Juli 2026</td>
                        <td>6 - 7 Juli 2026 <span className="text-danger fw-bold">(Kunci 14.00)</span></td>
                        <td className="fw-bold text-success fs-6">7 Juli 2026</td>
                        <td>Mulai 8-9 Juli 2026<br/><span className="text-danger fw-bold border-top border-danger pt-1 d-inline-block mt-2">Batas Peladen Lapor: 14.00 WIB</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 9. SPMB SSG (SEKOLAH SWASTA GRATIS)                               */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'SSG' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('SSG')}
            >
              <i className="bi bi-award-fill text-warning me-3"></i> 9. REGULASI SPMB SSG (Sekolah Swasta Gratis)
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'SSG' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <div className="alert alert-warning border-0 shadow-sm small lh-lg rounded-4 p-4 text-dark">
                <h5 className="fw-bold text-dark mb-3">Informasi Terperinci Program Sekolah Swasta Gratis (SSG) 2026</h5>
                <p className="mb-4">Program SPMB SSG (Sekolah Swasta Gratis) merupakan inisiatif khusus Penerimaan Murid Baru di 103 Satuan Pendidikan Swasta (terdiri dari SMP, SMA, dan SMK) Penerima Pendanaan Pendidikan Tahun 2026/2027. Berbeda dengan SPMB Bersama yang dikhususkan bagi pemegang KJP dan pendaftaran secara Daring, program SSG memberikan kesempatan yang lebih luas namun memerlukan prosedur pendaftaran yang berbeda.</p>
                
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="p-4 bg-white border border-warning rounded-4 h-100 shadow-sm">
                      <h6 className="fw-bold text-dark border-bottom border-warning pb-2">Prosedur Pendaftaran & Ketentuan Pembebasan Biaya:</h6>
                      <ul className="mb-0 ps-3 mt-3">
                        <li className="mb-2"><strong>Mekanisme Pendaftaran:</strong> Pendaftaran dilakukan secara <strong>LURING (Datang Langsung)</strong>. Calon peserta didik atau wali diwajibkan mendatangi secara fisik gedung sekolah swasta tujuan yang terdaftar sebagai mitra SSG.</li>
                        <li className="mb-2"><strong>Pembebasan Biaya Penuh (100% Gratis):</strong> Seluruh peserta didik yang diterima melalui jalur SSG ini <strong>tidak akan dipungut biaya apapun</strong>, baik biaya Uang Pangkal (Gedung) maupun biaya Sumbangan Pembinaan Pendidikan (SPP) bulanan selama masa studi.</li>
                        <li><strong>Ketentuan Gelombang Pendaftaran:</strong> Pelaksanaan SSG dibagi menjadi dua tahap. <strong>Gelombang 1</strong> diselenggarakan pada 15 - 29 Juni 2026 dengan alokasi kuota penerimaan sebesar 70%. <strong>Gelombang 2</strong> diselenggarakan untuk memenuhi 30% sisa kuota yang ada.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4 bg-white border border-danger rounded-4 h-100 shadow-sm position-relative">
                      <div className="position-absolute top-0 start-0 w-100 h-100 bg-danger bg-opacity-10 rounded-4" style={{zIndex: 0}}></div>
                      <div className="position-relative" style={{zIndex: 1}}>
                        <h6 className="fw-bold text-danger border-bottom border-danger pb-2"><i className="bi bi-exclamation-octagon-fill me-2"></i>Peringatan Sanksi & Ketentuan Pembatalan:</h6>
                        <ul className="mb-0 ps-3 mt-3">
                          <li className="mb-2"><strong>Sistem Terintegrasi:</strong> Meskipun pendaftaran SSG dilakukan secara Luring di sekolah tujuan, data pendaftar tetap akan disinkronisasikan dan dikunci pada Pusat Data Dinas Pendidikan.</li>
                          <li className="mb-2 text-danger fw-bold"><strong>Hukuman Pembatalan Kepesertaan Ganda:</strong> Apabila calon peserta didik telah dinyatakan diterima dan melakukan tahapan lapor diri di sekolah SSG, maka NIK peserta didik tersebut akan terkunci otomatis.</li>
                          <li className="text-danger fw-bold">Peserta didik yang telah terkunci di sistem SSG <strong>DILARANG KERAS</strong> untuk mendaftar ke Sekolah Negeri manapun maupun jalur SPMB Bersama. Jika terdeteksi melakukan pendaftaran ganda, kepesertaannya berisiko didiskualifikasi dari seluruh sistem pendidikan negeri di Jakarta.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 10. BAB 1: DEFINISI & ALOKASI JALUR PENERIMAAN                    */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'BAB1' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('BAB1')}
            >
              <i className="bi bi-book-half text-primary me-3"></i> 10. BAB 1: Definisi & Ringkasan Alokasi Kuota
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'BAB1' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <div className="row g-4 mb-3">
                <div className="col-12">
                  <div className="card bg-white border border-success h-100 rounded-4 p-4 shadow-sm">
                    <div className="fw-bold text-success mb-3 fs-5 border-bottom pb-2">A. Jalur Afirmasi</div>
                    <div className="text-dark lh-lg small">
                      Diperuntukkan bagi keluarga ekonomi tidak mampu dan penyandang disabilitas.
                      <div className="row mt-3 g-3">
                        <div className="col-md-6">
                          <div className="p-3 bg-success bg-opacity-10 rounded-3 h-100">
                            <h6 className="fw-bold">Afirmasi Prioritas 1</h6>
                            <ul className="mb-0 ps-3">
                              <li>Anak asuh panti sosial (Tercatat di Kartu Keluarga Panti).</li>
                              <li>Penyandang disabilitas (Kuota 2 murid per rombongan belajar).</li>
                              <li>Anak tenaga kesehatan yang gugur dalam penanganan Covid-19 di DKI Jakarta.</li>
                              <li><em>Catatan: Anak panti dan tenaga kesehatan diterima tanpa melalui proses seleksi akademis lanjutan.</em></li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="p-3 bg-success bg-opacity-10 rounded-3 h-100">
                            <h6 className="fw-bold">Afirmasi Prioritas 2</h6>
                            <ul className="mb-0 ps-3">
                              <li>Pemegang Kartu Jakarta Pintar (KJP) Plus aktif.</li>
                              <li>Pemegang Kartu Anak Jakarta (KAJ) khusus jenjang SD.</li>
                              <li>Anak pengemudi mitra TransJakarta (bus kecil).</li>
                              <li>Anak pekerja/buruh terdaftar di Disnakertrans.</li>
                              <li>Penerima Program Indonesia Pintar (PIP).</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-light border rounded-3 text-center fw-bold">
                        Alokasi Kuota Afirmasi: SD (20%) | SMP (20%) | SMA (30%) | SMK (37%)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card bg-white border border-primary h-100 rounded-4 p-4 shadow-sm">
                    <div className="fw-bold text-primary mb-3 fs-5 border-bottom pb-2">B. Jalur Domisili (Zonasi)</div>
                    <div className="text-dark lh-lg small">
                      Berbasis kedekatan domisili Kartu Keluarga dengan lokasi sekolah. Jalur ini tidak diberlakukan untuk jenjang SMK.
                      <div className="row mt-3 g-3">
                        <div className="col-md-4">
                          <div className="p-3 bg-primary bg-opacity-10 rounded-3 h-100">
                            <h6 className="fw-bold">Zona Prioritas 1</h6>
                            RT tempat tinggal Calon Peserta Didik Baru (CPDB) <strong>SAMA PERSIS</strong> dengan RT lokasi sekolah, atau RT rumah <strong>berbatasan langsung/bersinggungan</strong> dengan RT lokasi sekolah.
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="p-3 bg-primary bg-opacity-10 rounded-3 h-100">
                            <h6 className="fw-bold">Zona Prioritas 2</h6>
                            RT tempat tinggal CPDB berada di sekitar sekolah berdasarkan pemetaan Dinas Pendidikan, atau Kelurahan domisili sama dengan kelurahan sekolah (untuk jenjang SD).
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="p-3 bg-primary bg-opacity-10 rounded-3 h-100">
                            <h6 className="fw-bold">Zona Prioritas 3</h6>
                            Kelurahan domisili CPDB sama atau berdekatan dengan kelurahan lokasi sekolah (Hanya berlaku untuk jenjang SMP dan SMA).
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-light border rounded-3 text-center fw-bold">
                        Alokasi Kuota Domisili: SD (77%) | SMP (50%) | SMA (35%) | SMK (Tidak Ada Kuota)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card bg-white border border-warning h-100 rounded-4 p-4 shadow-sm">
                    <div className="fw-bold text-warning text-dark mb-3 fs-5 border-bottom pb-2">C. Jalur Prestasi</div>
                    <div className="text-dark lh-lg small">
                      Jalur yang menyeleksi secara objektif berdasarkan capaian rata-rata nilai rapor, Tes Kemampuan Akademik (TKA), dan sertifikat kejuaraan. Dikecualikan penerapannya untuk jenjang Sekolah Dasar.
                      <div className="row mt-3 g-3">
                        <div className="col-md-6">
                          <div className="p-3 bg-warning bg-opacity-10 rounded-3 h-100 text-dark">
                            <h6 className="fw-bold">Prestasi Akademik</h6>
                            Menilai Rata-rata Nilai Rapor 5 semester, Persentil Nilai, Hasil TKA, dan Sertifikat Kejuaraan di bidang Akademik/Ilmu Pengetahuan.<br/>
                            <span className="fw-bold mt-2 d-inline-block">Kuota: SMP (20%), SMA (25%), SMK (53%)</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="p-3 bg-warning bg-opacity-10 rounded-3 h-100 text-dark">
                            <h6 className="fw-bold">Prestasi Non-Akademik</h6>
                            Menilai Sertifikat Kejuaraan Non-Akademik (Olahraga, Seni, Budaya, Keagamaan, Kepramukaan) dan Pengalaman Kepemimpinan.<br/>
                            <span className="fw-bold mt-2 d-inline-block">Kuota: SMP (7%), SMA (7%), SMK (7%)</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-danger bg-opacity-10 border border-danger rounded-3 text-center text-danger">
                        *Khusus SMAN 69 dan SMKN 61 di Kepulauan Seribu, Jalur Prestasi diprioritaskan bagi warga berdomisili riil di Kabupaten Administrasi Kepulauan Seribu.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card bg-white border border-secondary h-100 rounded-4 p-4 shadow-sm">
                    <div className="fw-bold text-secondary mb-3 fs-5 border-bottom pb-2">D. Jalur Mutasi / Perpindahan Tugas</div>
                    <div className="text-dark lh-lg small">
                      Diperuntukkan bagi anak yang mengikuti perpindahan domisili orang tua/wali (TNI/Polri/Aparatur Sipil Negara/Pegawai BUMN/Karyawan Swasta) dengan kewajiban melampirkan Surat Penugasan resmi yang diterbitkan <strong>paling lama 1 (satu) tahun sebelum hari pertama pendaftaran</strong>. Berlaku juga bagi anak guru atau tenaga kependidikan yang mendaftar <strong>tepat di sekolah tempat orang tuanya bertugas secara administratif</strong>.<br/>
                      <div className="mt-4 p-3 bg-light border rounded-3 text-center fw-bold">
                        Alokasi Kuota Mutasi: SD (3%) | SMP (3%) | SMA (3%) | SMK (3%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 11. BAB 2: SYARAT DOKUMEN & BATAS USIA                            */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'BAB2' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('BAB2')}
            >
              <i className="bi bi-file-earmark-person text-danger me-3"></i> 11. BAB 2: Syarat Administratif Khusus & Sanksi
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'BAB2' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <div className="row g-4 mb-3">
                <div className="col-md-6">
                  <div className="card bg-white border-0 h-100 p-4 shadow-sm rounded-4 border-top border-danger border-4">
                    <h6 className="fw-bold text-dark border-bottom pb-3 mb-3">1. Rincian Tambahan Kartu Keluarga</h6>
                    <div className="small lh-lg text-dark">
                      <ul className="mb-0 ps-3">
                        <li className="mb-2">Apabila terdapat perubahan pada Kartu Keluarga yang <strong>tidak mengubah status domisili</strong> (contoh: penambahan anggota keluarga baru atau pembaharuan dokumen yang rusak) dalam kurun waktu kurang dari batas satu tahun, pendaftar <strong>wajib melampirkan salinan KK Lama</strong> atau Surat Keterangan Kehilangan Kepolisian yang terverifikasi.</li>
                        <li>Bagi anak yang diasuh bukan oleh orang tua kandung sesuai data Kartu Keluarga, validasi pendaftaran memerlukan penetapan legal dari instansi pengadilan untuk menghindari kecurangan alamat fiktif.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card bg-white border-0 h-100 p-4 shadow-sm rounded-4 border-top border-danger border-4">
                    <h6 className="fw-bold text-dark border-bottom pb-3 mb-3">2. Rekapitulasi Batas Usia (Per 1 Juli 2026)</h6>
                    <div className="small lh-lg text-dark">
                      <ul className="mb-0 ps-3">
                        <li className="mb-1"><strong>PAUD:</strong> TKA (4-5 Tahun), TKB (5-6 Tahun), KB (3-4 Tahun kategori prioritas), TPA/SPS (2-6 Tahun).</li>
                        <li className="mb-1"><strong>Sekolah Dasar:</strong> Minimal 6 Tahun. Diperbolehkan usia 5 Tahun 6 Bulan dengan <strong>persyaratan wajib</strong> rekomendasi Psikolog Profesional.</li>
                        <li className="mb-1"><strong>Sekolah Menengah Pertama:</strong> Maksimal berusia 15 Tahun.</li>
                        <li className="mb-1"><strong>Sekolah Menengah Atas / Kejuruan:</strong> Maksimal berusia 21 Tahun.</li>
                        <li><strong>Sekolah Luar Biasa (SLB):</strong> SDLB (6-12 tahun), SMPLB (maksimal 18 tahun), SMALB (maksimal 21 tahun). Berlaku paralel untuk penyandang disabilitas di sekolah reguler.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="card bg-danger bg-opacity-10 border-0 h-100 p-4 shadow-sm rounded-4">
                    <h6 className="fw-bold text-danger border-bottom border-danger pb-3 mb-3">3. Penegakan Disiplin Sanksi Diskualifikasi & Tenggat Lapor Diri</h6>
                    <div className="small lh-lg text-dark">
                      Sistem penerimaan diselenggarakan berlandaskan asas objektivitas, transparansi, dan akuntabilitas peladen.
                      <ul className="mb-0 mt-3 ps-3">
                        <li className="mb-2"><strong>Pelanggaran Pemalsuan Data Administrasi:</strong> Seluruh calon peserta didik dilarang keras merekayasa atau memalsukan rekaman kependudukan (KK), transkrip Nilai Rapor, maupun keaslian Sertifikat Prestasi. Apabila pada proses verifikasi akhir terbukti terdapat tindak pemalsuan, <strong>calon peserta didik akan dijatuhi SANKSI DISKUALIFIKASI</strong> secara permanen dari seluruh tahapan penerimaan, walaupun sistem pada awalnya telah menetapkan status "Diterima".</li>
                        <li><strong>Kelalaian Lapor Diri:</strong> Calon peserta didik yang telah berhasil lolos pemeringkatan dan dinyatakan diterima <strong>SANGAT DIWAJIBKAN</strong> melaksanakan prosedur Lapor Diri (Daftar Ulang) pada sistem aplikasi daring sesuai jadwal yang ditetapkan (sebagai contoh tanggal 20 Juni untuk pelaksanaan Tahap Pertama). Apabila tenggat waktu tersebut terlewat, pendaftar <strong>DIANGGAP MENGUNDURKAN DIRI SECARA SEPIHAK</strong>. Konsekuensinya, akun pendaftar akan diblokir dari sistem untuk mengikuti tahap atau jalur selanjutnya, dan alokasi kursi kosong tersebut akan diserahkan kepada pendaftar tahap berikutnya.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 12. BAB 3: SKORING & FISIK SMK                                    */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'BAB3' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('BAB3')}
            >
              <i className="bi bi-bar-chart-fill text-success me-3"></i> 12. BAB 3: Matriks Skoring Prestasi & Persyaratan Fisik SMK
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'BAB3' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <h5 className="fw-bold text-dark mb-2">A. Komponen Pembobotan Nilai Jalur Prestasi</h5>
              <p className="text-muted small mb-4">
                Sesuai dengan pedoman evaluasi Dinas Pendidikan, nilai akhir Indeks Prestasi akan dibandingkan secara seketika pada sistem peladen. Sertifikat penunjang prestasi harus diterbitkan pada rentang 3 tahun terakhir pelaksanaan studi (Kelas 4 hingga 6 untuk tingkat SD atau Kelas 7 hingga 9 untuk tingkat SMP) dengan penetapan batas masa unggah pada tanggal 31 Maret 2026.
              </p>

              <div className="table-responsive mb-5 shadow-sm rounded-4 overflow-hidden border">
                <table className="table table-bordered table-striped mb-0 align-middle text-center small">
                  <thead className="table-dark">
                    <tr>
                      <th className="text-start py-3 px-4" style={{width: '40%'}}>Indikator Penilaian & Komponen Evaluasi</th>
                      <th className="py-3">Alokasi Jalur Akademik</th>
                      <th className="py-3">Alokasi Jalur Non-Akademik</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-dark">
                    <tr>
                      <td className="text-start p-4">
                        <strong className="d-block mb-1">1. Rata-rata Nilai Rapor & Tes Kemampuan Akademik (TKA)</strong>
                        - 70% diakumulasi dari Rapor 5 Semester (PKn, Bahasa Indonesia, Matematika, IPA, IPS, Bahasa Inggris)<br/>
                        - 30% dievaluasi dari Hasil TKA (Bahasa Indonesia & Matematika)
                      </td>
                      <td className="fw-bold fs-6">40%</td>
                      <td className="fw-bold fs-6">20%</td>
                    </tr>
                    <tr>
                      <td className="text-start p-4">
                        <strong className="d-block mb-1">2. Persentil Evaluasi Nilai Rapor</strong>
                        Penilaian letak peringkat rapor peserta didik apabila dikomparasi dengan kelompok populasi sekolah asalnya, dengan mempertimbangkan metrik Rapor Pendidikan Nasional Sekolah (Predikat Baik/Sedang/Kurang).
                      </td>
                      <td className="fw-bold fs-6">20%</td>
                      <td className="fw-bold fs-6">5%</td>
                    </tr>
                    <tr>
                      <td className="text-start p-4">
                        <strong className="d-block mb-1">3. Verifikasi Prestasi Akademik</strong>
                        Dokumentasi Sertifikat Juara Pertama/Kedua/Ketiga pada gelaran Olimpiade maupun kompetisi Sains mulai dari lingkup Kabupaten/Kota hingga ranah Internasional.
                      </td>
                      <td className="fw-bold fs-6">25%</td>
                      <td className="fw-bold fs-6">5%</td>
                    </tr>
                    <tr>
                      <td className="text-start p-4">
                        <strong className="d-block mb-1">4. Verifikasi Prestasi Non-Akademik</strong>
                        Dokumentasi Sertifikat Juara Pertama/Kedua/Ketiga dalam disiplin Olahraga, Kesenian, Kebudayaan, Lomba Keagamaan, Kepramukaan, dan Palang Merah Remaja.
                      </td>
                      <td className="fw-bold fs-6">5%</td>
                      <td className="fw-bold fs-6">50%</td>
                    </tr>
                    <tr>
                      <td className="text-start p-4">
                        <strong className="d-block mb-1">5. Bukti Pengalaman Kepemimpinan & Kualifikasi Seleksi Ketat</strong>
                        Status kepengurusan struktural OSIS/Majelis Perwakilan Kelas, Ekstrakurikuler, predikat Pramuka Garuda, keanggotaan Paskibra bersertifikat, Jambore Nasional/Internasional, dan kualifikasi hafalan Quran (Hafiz).
                      </td>
                      <td className="fw-bold fs-6">10%</td>
                      <td className="fw-bold fs-6">20%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row g-4 mb-5">
                <div className="col-md-6">
                  <div className="card border-0 bg-light p-4 shadow-sm rounded-4 h-100">
                    <h6 className="fw-bold text-success border-bottom border-success pb-3 mb-3">Tabel Penilaian Skor Sertifikat Kejuaraan</h6>
                    <div className="small lh-lg">
                      Bobot poin sertifikat dievaluasi berlandaskan pada tingkat penyelenggara kompetisi. Hanya 1 (satu) dokumen sertifikat dengan nilai bobot paling tinggi yang diotorisasi oleh sistem.
                      <table className="table table-sm table-bordered mt-3 bg-white text-center align-middle rounded overflow-hidden">
                        <thead>
                          <tr className="bg-secondary text-white">
                            <th className="py-2">Tingkat Penyelenggaraan</th>
                            <th>Jalur Kedinasan (Berjenjang)</th>
                            <th>Jalur Non-Kedinasan / Induk Organisasi</th>
                            <th>Hasil Kurasi Khusus Dinas</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="fw-bold">Juara 1 Internasional</td><td>100</td><td>92</td><td>84</td></tr>
                          <tr><td className="fw-bold">Juara 1 Nasional</td><td>91</td><td>83</td><td>75</td></tr>
                          <tr><td className="fw-bold">Juara 1 Provinsi</td><td>82</td><td>74</td><td>66</td></tr>
                          <tr><td className="fw-bold">Juara 1 Kab/Kota</td><td>73</td><td>65</td><td>57</td></tr>
                        </tbody>
                      </table>
                      <span className="text-muted fst-italic d-block mt-2">*Nilai untuk kategori Pemasalan atau Ekshibisi (Wajib melalui tahap kurasi) akan dimulai dari batas skor 68 untuk predikat Internasional.</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card border-0 bg-light p-4 shadow-sm rounded-4 h-100">
                    <h6 className="fw-bold text-success border-bottom border-success pb-3 mb-3">Rincian Skor Penunjang Tambahan (Kepemimpinan & Hafalan)</h6>
                    <div className="small lh-lg">
                      <strong className="text-dark">Struktur Pengurus OSIS / Majelis Perwakilan Kelas (Bobot 40%):</strong><br/>
                      Jabatan Ketua (Nilai Penuh 100 Poin) | Wakil/Sekretaris/Bendahara (67 Poin) | Koordinator Seksi (33 Poin).<br/><br/>
                      <strong className="text-dark">Struktur Pengurus Ekstrakurikuler (Bobot 20%):</strong><br/>
                      Jabatan Ketua (Nilai Penuh 100 Poin) | Wakil/Sekretaris/Bendahara (67 Poin) | Koordinator Seksi (33 Poin).<br/><br/>
                      <strong className="text-dark">Kualifikasi Pramuka Garuda / Jambore / Paskibraka:</strong><br/>
                      Partisipasi Internasional (100 Poin), Skala Nasional (81 Poin), Skala Provinsi (62 Poin), Skala Kota (43 Poin).<br/><br/>
                      <strong className="text-dark">Sertifikasi Hafiz Quran:</strong><br/>
                      Rentang 28-30 Juz (100 Poin) | 25-27 Juz (94) | 22-24 Juz (88) | 19-21 Juz (82) | 16-18 Juz (76) | 13-15 Juz (70) | 11-12 Juz (64) | 9-10 Juz (58) | 7-8 Juz (52) | 5-6 Juz (46) | 3-4 Juz (40) | 1-2 Juz (34).
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="fw-bold text-dark mt-5 mb-2 border-bottom pb-2">B. Pemeriksaan Kondisi Fisik (Syarat Bebas Buta Warna SMK)</h5>
              <p className="text-muted small mb-4">Calon peserta didik yang menentukan pilihan pada salah satu dari Konsentrasi Keahlian di bawah ini <strong>DIWAJIBKAN MEMILIKI PENGLIHATAN NORMAL (TIDAK BUTA WARNA)</strong>, yang dibuktikan dengan penyerahan Surat Keterangan Pemeriksaan dari Rumah Sakit Umum Daerah atau Puskesmas serta Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) dari Orang Tua pada masa verifikasi berkas.</p>
              
              <div className="card bg-light border-0 shadow-sm p-4 rounded-4 small">
                <div className="row">
                  <div className="col-md-6">
                    <ul className="mb-0 lh-lg text-secondary fw-semibold font-monospace" style={{listStyleType: 'none', paddingLeft: 0}}>
                      <li className="border-bottom border-light pb-1 mb-1">01. Agribisnis Ikan Hias</li>
                      <li className="border-bottom border-light pb-1 mb-1">02. Agribisnis Lanskap dan Pertamanan</li>
                      <li className="border-bottom border-light pb-1 mb-1">03. Agribisnis Pengolahan Hasil Pertanian</li>
                      <li className="border-bottom border-light pb-1 mb-1">04. Agribisnis Perbenihan Tanaman</li>
                      <li className="border-bottom border-light pb-1 mb-1">05. Agribisnis Perikanan Payau dan Laut</li>
                      <li className="border-bottom border-light pb-1 mb-1">06. Agribisnis Tanaman Pangan & Hortikultura</li>
                      <li className="border-bottom border-light pb-1 mb-1">07. Airframe Powerplant</li>
                      <li className="border-bottom border-light pb-1 mb-1">08. Akuntansi</li>
                      <li className="border-bottom border-light pb-1 mb-1">09. Animasi</li>
                      <li className="border-bottom border-light pb-1 mb-1">10. Bisnis Digital</li>
                      <li className="border-bottom border-light pb-1 mb-1">11. Bisnis Retail</li>
                      <li className="border-bottom border-light pb-1 mb-1">12. Desain dan Produksi Busana</li>
                      <li className="border-bottom border-light pb-1 mb-1">13. Desain dan Teknik Furnitur</li>
                      <li className="border-bottom border-light pb-1 mb-1">14. Desain Gambar Mesin</li>
                      <li className="border-bottom border-light pb-1 mb-1">15. Desain Komunikasi Visual (DKV)</li>
                      <li className="border-bottom border-light pb-1 mb-1">16. Desain Pemodelan & Informasi Bangunan</li>
                      <li className="border-bottom border-light pb-1 mb-1">17. Electrical Avionic</li>
                      <li className="border-bottom border-light pb-1 mb-1">18. Konstruksi Gedung dan Sanitasi</li>
                      <li className="border-bottom border-light pb-1 mb-1">19. Kriya Kreatif Batik dan Tekstil</li>
                      <li className="border-bottom border-light pb-1 mb-1">20. Kriya Kreatif Kayu dan Rotan</li>
                      <li className="border-bottom border-light pb-1 mb-1">21. Kriya Kreatif Logam dan Perhiasan</li>
                      <li className="border-bottom border-light pb-1 mb-1">22. Kuliner</li>
                      <li className="border-bottom border-light pb-1 mb-1">23. Layanan Penunjang Keperawatan</li>
                      <li className="border-bottom border-light pb-1 mb-1">24. Layanan Perbankan</li>
                      <li className="border-bottom border-light pb-1 mb-1">25. Layanan Perbankan Syariah</li>
                      <li className="border-bottom border-light pb-1 mb-1">26. Manajemen Logistik</li>
                      <li className="border-bottom border-light pb-1 mb-1">27. Manajemen Perkantoran</li>
                      <li className="border-bottom border-light pb-1 mb-1">28. Nautika Kapal Niaga (Diutamakan Pria)</li>
                      <li className="border-bottom border-light pb-1 mb-1">29. Nautika Kapal Penangkap Ikan (Pria)</li>
                      <li className="border-bottom border-light pb-1 mb-1">30. Pekerjaan Sosial</li>
                      <li className="border-bottom border-light pb-1 mb-1">31. Perhotelan</li>
                      <li className="border-bottom border-light pb-1 mb-1">32. Produksi & Siaran Program Radio</li>
                    </ul>
                  </div>
                  <div className="col-md-6 mt-3 mt-md-0">
                    <ul className="mb-0 lh-lg text-secondary fw-semibold font-monospace" style={{listStyleType: 'none', paddingLeft: 0}}>
                      <li className="border-bottom border-light pb-1 mb-1">33. Produksi & Siaran Program Televisi</li>
                      <li className="border-bottom border-light pb-1 mb-1">34. Produksi Film</li>
                      <li className="border-bottom border-light pb-1 mb-1">35. Rekayasa Perangkat Lunak (RPL)</li>
                      <li className="border-bottom border-light pb-1 mb-1">36. Seni Karawitan</li>
                      <li className="border-bottom border-light pb-1 mb-1">37. Seni Lukis</li>
                      <li className="border-bottom border-light pb-1 mb-1">38. Seni Musik</li>
                      <li className="border-bottom border-light pb-1 mb-1">39. Seni Tari</li>
                      <li className="border-bottom border-light pb-1 mb-1">40. Seni Teater</li>
                      <li className="border-bottom border-light pb-1 mb-1">41. Sistem Informasi, Jaringan & Aplikasi</li>
                      <li className="border-bottom border-light pb-1 mb-1">42. Tata Kecantikan Kulit dan Rambut</li>
                      <li className="border-bottom border-light pb-1 mb-1">43. Teknik Alat Berat</li>
                      <li className="border-bottom border-light pb-1 mb-1">44. Teknik Audio Video</li>
                      <li className="border-bottom border-light pb-1 mb-1">45. Teknik Bodi Kendaraan Ringan</li>
                      <li className="border-bottom border-light pb-1 mb-1">46. Teknik Elektronika Industri</li>
                      <li className="border-bottom border-light pb-1 mb-1">47. Teknik Elektronika Komunikasi</li>
                      <li className="border-bottom border-light pb-1 mb-1">48. Teknik Fabrikasi Logam & Manufaktur</li>
                      <li className="border-bottom border-light pb-1 mb-1">49. Teknik Grafika</li>
                      <li className="border-bottom border-light pb-1 mb-1">50. Teknik Instalasi Tenaga Listrik</li>
                      <li className="border-bottom border-light pb-1 mb-1">51. Teknik Jaringan Tenaga Listrik</li>
                      <li className="border-bottom border-light pb-1 mb-1">52. Teknik Kendaraan Ringan (TKR)</li>
                      <li className="border-bottom border-light pb-1 mb-1">53. Teknik Komputer dan Jaringan (TKJ)</li>
                      <li className="border-bottom border-light pb-1 mb-1">54. Teknik Konstruksi dan Perumahan</li>
                      <li className="border-bottom border-light pb-1 mb-1">55. Teknik Mekatronika</li>
                      <li className="border-bottom border-light pb-1 mb-1">56. Teknik Otomasi Industri</li>
                      <li className="border-bottom border-light pb-1 mb-1">57. Teknik Ototronik</li>
                      <li className="border-bottom border-light pb-1 mb-1">58. Teknik Pemanasan, Tata Udara & Pendingin</li>
                      <li className="border-bottom border-light pb-1 mb-1">59. Teknik Pemesinan</li>
                      <li className="border-bottom border-light pb-1 mb-1">60. Teknik Pengelasan</li>
                      <li className="border-bottom border-light pb-1 mb-1">61. Teknik Sepeda Motor</li>
                      <li className="border-bottom border-light pb-1 mb-1">62. Teknika Kapal Niaga (Diutamakan Pria)</li>
                      <li className="border-bottom border-light pb-1 mb-1">63. Teknika Kapal Penangkap Ikan (Pria)</li>
                      <li className="border-bottom border-light pb-1 mb-1">64. Usaha Layanan Wisata</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 13. BAB 4: HIERARKI PENYARINGAN (SELEKSI KETAT)                     */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'BAB4' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('BAB4')}
            >
              <i className="bi bi-funnel-fill text-info me-3"></i> 13. BAB 4: Aturan Pemeringkatan Peladen (Sistem Seleksi Lanjutan)
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'BAB4' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              <p className="text-muted small mb-4">Dalam kondisi batas kuota di mana hanya tersisa 1 (satu) kursi kosong namun diperebutkan oleh banyak pendaftar dengan status dan skor yang identik, sistem peladen akan mengeksekusi penyaringan otomatis secara ketat dan bertahap berdasarkan hierarki parameter berikut:</p>
              
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border-info border-opacity-50 rounded-4 shadow-sm h-100 overflow-hidden">
                    <div className="card-header bg-info text-white fw-bold py-3">
                      <i className="bi bi-geo-alt-fill me-2"></i> Ketentuan Jalur Domisili (Khusus SD & SMP)
                    </div>
                    <div className="card-body small lh-lg p-4 bg-light text-dark">
                      <ol className="mb-0 ps-3">
                        <li className="mb-2"><strong>Zona Prioritas Wilayah</strong> (Pendaftar di Zona Prioritas 1 dipastikan lolos mendahului Prioritas 2, dan seterusnya).</li>
                        <li className="mb-2"><strong>Usia Tertua ke Termuda</strong> (Sistem memprioritaskan pendaftar yang usianya lebih tua untuk mencegah risiko putus sekolah).</li>
                        <li className="mb-2"><strong>Urutan Pilihan Sekolah</strong> (Pendaftar yang menempatkan sekolah tersebut sebagai Pilihan Pertama akan diprioritaskan).</li>
                        <li><strong>Catatan Waktu Mendaftar</strong> (Diputuskan berdasarkan data waktu tercepat yang masuk ke dalam sistem perekaman daring).</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-info border-opacity-50 rounded-4 shadow-sm h-100 overflow-hidden">
                    <div className="card-header bg-info text-white fw-bold py-3">
                      <i className="bi bi-building me-2"></i> Ketentuan Jalur Domisili (Khusus Tingkat SMA)
                    </div>
                    <div className="card-body small lh-lg p-4 bg-light text-dark">
                      <ol className="mb-0 ps-3">
                        <li className="mb-2"><strong>Pembobotan Nilai Rapor & Evaluasi Persentil</strong> (Peserta didik dengan kualifikasi nilai yang lebih tinggi diprioritaskan pada tahap awal).</li>
                        <li className="mb-2"><strong>Zona Prioritas Wilayah</strong> (Prioritas kewilayahan yang lebih dekat didahulukan dari wilayah yang lebih jauh).</li>
                        <li className="mb-2"><strong>Kriteria Usia Tertua ke Termuda</strong>.</li>
                        <li><strong>Urutan Pilihan Sekolah & Akurasi Waktu Mendaftar</strong>.</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-warning border-opacity-50 rounded-4 shadow-sm h-100 overflow-hidden">
                    <div className="card-header bg-warning text-dark fw-bold py-3">
                      <i className="bi bi-trophy-fill me-2"></i> Ketentuan Jalur Prestasi (SMP, SMA, SMK)
                    </div>
                    <div className="card-body small lh-lg p-4 bg-light text-dark">
                      <ol className="mb-0 ps-3">
                        <li className="mb-2"><strong>Total Indeks Prestasi Akhir</strong> (Akumulasi gabungan nilai akademik dan non-akademik tertinggi menjadi prioritas utama).</li>
                        <li className="mb-2"><strong>Zona Prioritas Kewilayahan</strong> (Parameter ini dikhususkan bagi jenjang SMP dan SMA, sementara tingkat SMK mengecualikan zona wilayah).</li>
                        <li className="mb-2"><strong>Pemetaan Urutan Pilihan Sekolah</strong>.</li>
                        <li><strong>Pencatatan Waktu Mendaftar di Sistem Server</strong>.</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-secondary border-opacity-50 rounded-4 shadow-sm h-100 overflow-hidden">
                    <div className="card-header bg-secondary text-white fw-bold py-3">
                      <i className="bi bi-bank2 me-2"></i> SPMB Bersama (Kemitraan Sekolah Swasta)
                    </div>
                    <div className="card-body small lh-lg p-4 bg-light text-dark">
                      <p className="mb-2 border-bottom border-secondary pb-2 fw-bold">Penyeleksian Jenjang SMP & SMA Swasta:</p>
                      <ol className="mb-4 ps-3 text-secondary">
                        <li>Pengelompokan Wilayah PMB Prioritas secara administratif.</li>
                        <li>Kalkulasi pembobotan nilai rapor & persentil nilai.</li>
                        <li>Penyaringan melalui urutan pilihan sekolah.</li>
                        <li>Rekaman waktu pendaftaran elektronik.</li>
                      </ol>
                      <p className="mb-2 border-bottom border-secondary pb-2 fw-bold">Penyeleksian Tingkat SMK Swasta:</p>
                      <ol className="mb-0 ps-3 text-secondary">
                        <li>Total pembobotan indeks prestasi akademik (Mencakup Nilai Rapor Murni 70% dan TKA 30%).</li>
                        <li>Analisis urutan pilihan sekolah & waktu penyelesaian formulir pendaftaran daring.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 14. BAB 5: JADWAL PELAKSANAAN LENGKAP 2026                          */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'BAB5' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('BAB5')}
            >
              <i className="bi bi-calendar3 text-dark me-3"></i> 14. BAB 5: Jadwal & Alur Penyelenggaraan SPMB 2026/2027 Terperinci
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'BAB5' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              <p className="text-muted small mb-4">Merujuk pada ketetapan Surat Keputusan Kepala Dinas Pendidikan Provinsi DKI Jakarta Tahun 2026, berikut disajikan rincian linimasa operasional sistem pendaftaran secara komprehensif.</p>
              
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="card border-0 bg-dark text-white p-4 rounded-4 shadow-sm h-100">
                    <h6 className="fw-bold text-warning border-bottom border-secondary pb-3 mb-3">A. Proses Pra-Pendaftaran (Khusus Lulusan Luar DKI)</h6>
                    <ul className="list-unstyled lh-lg small mb-0 font-monospace">
                      <li><strong>Pengisian & Unggah Dokumen:</strong><br/>19 Mei - 10 Juni 2026 (Aktif 24 Jam)</li>
                      <li className="mt-2"><strong>Masa Sanggah Prapendaftaran:</strong><br/>13 April - 8 Mei 2026</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 bg-dark text-white p-4 rounded-4 shadow-sm h-100">
                    <h6 className="fw-bold text-warning border-bottom border-secondary pb-3 mb-3">B. Pengajuan Akun & Validasi Kartu Keluarga</h6>
                    <ul className="list-unstyled lh-lg small mb-0 font-monospace">
                      <li><strong>Tingkat Sekolah Dasar (SD):</strong><br/>Dibuka Mulai 18 Mei 2026</li>
                      <li className="mt-2"><strong>Tingkat Menengah Pertama (SMP):</strong><br/>Dibuka Mulai 25 Mei 2026</li>
                      <li className="mt-2"><strong>Tingkat Atas & Kejuruan (SMA/SMK):</strong><br/>Dibuka Mulai 2 Juni 2026</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 bg-danger text-white p-4 rounded-4 shadow-sm h-100">
                    <h6 className="fw-bold text-warning border-bottom border-light border-opacity-25 pb-3 mb-3">C. Penjadwalan Jalur Khusus Terbatas</h6>
                    <ul className="list-unstyled lh-lg small mb-0 font-monospace">
                      <li><strong>Afirmasi Panti & Tenaga Kesehatan:</strong><br/>15 - 30 Juni 2026</li>
                      <li className="mt-2"><strong>Jalur Perpindahan Tugas Dinas:</strong><br/>15 - 30 Juni 2026</li>
                      <li className="mt-2"><strong>Pendidikan Luar Biasa (SLB):</strong><br/>15 - 18 Juni 2026</li>
                      <li className="mt-2"><strong>Pendidikan Kesetaraan (SKB):</strong><br/>6 - 10 Juli 2026</li>
                      <li className="mt-2 text-warning fw-bold"><strong>SPMB SSG (Pendaftaran Luring):</strong><br/>15 - 29 Juni (Gelombang Pertama)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h6 className="fw-bold text-dark border-bottom pb-2 mb-4">Rekapitulasi Pelaksanaan Jalur Reguler Sistem Daring</h6>
              <div className="table-responsive shadow-sm rounded-3">
                <table className="table table-striped table-bordered text-center align-middle small mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th className="py-3 px-3">Kategori Jalur Pendaftaran</th>
                      <th className="py-3">Tingkat Pendidikan</th>
                      <th className="py-3 bg-primary text-white">Masa Pemilihan Sekolah Daring</th>
                      <th className="py-3 bg-success text-white">Pengumuman Kelulusan</th>
                      <th className="py-3 bg-danger text-white">PROSES LAPOR DIRI</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td className="fw-bold text-start ps-4">Prestasi (Akademik & Non-Akademik)</td>
                      <td>SMP, SMA, SMK</td>
                      <td>15, 17, dan 18 Juni 2026</td>
                      <td className="fw-bold text-success">18 Jun (17:00)</td>
                      <td className="fw-bold text-danger">19 - 20 Juni 2026</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-4">Domisili / Zonasi (Tahap Awal)</td>
                      <td>SD</td>
                      <td>15, 17, dan 18 Juni 2026</td>
                      <td className="fw-bold text-success">18 Jun (17:00)</td>
                      <td className="fw-bold text-danger">19 - 20 Juni 2026</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-4">Afirmasi Disabilitas (Prioritas Pertama)</td>
                      <td>SD, SMP, SMA, SMK</td>
                      <td>15, 17, dan 18 Juni 2026</td>
                      <td className="fw-bold text-success">18 Jun (17:00)</td>
                      <td className="fw-bold text-danger">19 - 20 Juni 2026</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-4">SPMB Bersama (Kemitraan Swasta)</td>
                      <td>SMP, SMA, SMK</td>
                      <td>15, 17, dan 18 Juni 2026</td>
                      <td className="fw-bold text-success">18 Jun (17:00)</td>
                      <td className="fw-bold text-danger">19 - 20 Juni 2026</td>
                    </tr>
                    <tr className="table-warning border-warning">
                      <td colSpan="5" className="py-1"></td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-4">Afirmasi Prioritas Kedua (Pemegang KJP dsb.)</td>
                      <td>SD, SMP, SMA, SMK</td>
                      <td>22 - 24 Juni 2026</td>
                      <td className="fw-bold text-success">24 Jun (17:00)</td>
                      <td className="fw-bold text-danger">25 - 26 Juni 2026</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-4">Domisili / Wilayah Zonasi Utama</td>
                      <td>SMP, SMA</td>
                      <td>29-30 Juni & 1 Juli 2026</td>
                      <td className="fw-bold text-success">1 Jul (17:00)</td>
                      <td className="fw-bold text-danger">2 - 3 Juli 2026</td>
                    </tr>
                    <tr className="table-warning border-warning">
                      <td colSpan="5" className="py-1"></td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-4">Pendaftaran Gelombang Kedua (Sisa Kuota)</td>
                      <td>SD</td>
                      <td>29-30 Juni & 1 Juli 2026</td>
                      <td className="fw-bold text-success">1 Jul (17:00)</td>
                      <td className="fw-bold text-danger">2 - 3 Juli 2026</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-4">Pendaftaran Gelombang Kedua (Sisa Kuota)</td>
                      <td>SMP, SMA, SMK</td>
                      <td>6 - 7 Juli 2026</td>
                      <td className="fw-bold text-success">7 Jul (17:00)</td>
                      <td className="fw-bold text-danger">8 - 9 Juli 2026</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-start ps-4">Pendaftaran Tahap Terakhir (Penyelesaian)</td>
                      <td>SD</td>
                      <td>6 - 7 Juli 2026</td>
                      <td className="fw-bold text-success">7 Jul (17:00)</td>
                      <td className="fw-bold text-danger">8 - 9 Juli 2026</td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-3 bg-light text-muted fst-italic text-end small border-top-0 border rounded-bottom-3">
                  *Ketentuan Jadwal bersifat dinamis dan dapat berubah sewaktu-waktu sesuai dengan ketetapan dari Panitia SPMB Provinsi DKI Jakarta. Layanan operasional pendaftaran daring berfungsi harian pada pukul 08:00 - 23:59 WIB, sedangkan sistem persetujuan Lapor Diri ditutup secara otomatis pada pukul 14:00 WIB.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 15. BAB 6: FAQ & RESOLUSI MASALAH LAPANGAN                        */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'BAB6' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('BAB6')}
            >
              <i className="bi bi-person-raised-hand text-success me-3"></i> 15. BAB 6: Panduan Penanganan Kendala Lapangan (Penyelesaian Masalah)
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'BAB6' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              <p className="text-muted small mb-4">Operator posko diharapkan berpedoman pada format prosedur operasional di bawah ini guna memberikan penyelesaian yang seragam, cepat, dan terstruktur saat merespons laporan warga di fasilitas posko lapangan maupun pelaporan berjenjang melalui sarana komunikasi resmi dinas.</p>
              
              <div className="accordion rounded-4 shadow-sm border overflow-hidden" id="faqTroubleshooting">
                
                {/* Kasus 1: NIK Terpakai */}
                <div className="accordion-item border-0 border-bottom">
                  <h2 className="accordion-header">
                    <button className={`accordion-button fw-bold py-4 text-dark ${openFaqs[1] ? '' : 'collapsed'}`} type="button" onClick={() => toggleFaq(1)} style={{backgroundColor: openFaqs[1] ? '#e8f5e9' : 'white'}}>
                      <i className="bi bi-x-circle-fill text-danger me-3"></i> 1. Dugaan NIK Digunakan Pihak Lain / Peringatan "Siswa Telah Memiliki Akun"
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse ${openFaqs[1] ? 'show' : ''}`}>
                    <div className="accordion-body small lh-lg bg-light border-top p-4">
                      <strong>Langkah Penyelesaian di Posko:</strong><br/>
                      1. Arahkan pelapor untuk mencoba prosedur "Login atau Aktivasi Akun" secara langsung menggunakan Nomor Induk Kependudukan (NIK) miliknya. Sering ditemukan bahwa data akun sebenarnya telah didaftarkan secara kolektif oleh pihak sekolah asal tanpa pemberitahuan sebelumnya kepada orang tua.<br/>
                      2. Apabila setelah dilakukan verifikasi ternyata NIK memang diretas atau didaftarkan oleh individu dengan identitas yang berbeda, petugas wajib meminta salinan/fotokopi dokumen Kartu Keluarga asli. Pelapor diinstruksikan untuk menunggu proses penghapusan data (pengaturan ulang akun) yang akan dilakukan oleh Verifikator Pusat Dinas.<br/><br/>
                      <strong>Format Pelaporan Khusus ke Saluran Bantuan Dinas:</strong>
                      <div className="bg-dark text-warning p-3 rounded-3 mt-3 font-monospace" style={{fontSize: '0.85rem'}}>
                        *PERMOHONAN PEMBATALAN AKUN SPMB (PENGGUNAAN NIK OLEH PIHAK LAIN)*<br/><br/>
                        Identitas Pendaftar Asli : <br/>
                        Nomor Induk Kependudukan (NIK) : <br/>
                        Tanggal Lahir Pendaftar : <br/>
                        Status Validasi Akun Saat Ini : (Belum Verifikasi / Telah Diverifikasi)<br/>
                        Jenjang Pendidikan Tujuan : <br/>
                        Rincian Kendala : Mengajukan permohonan penghapusan data akun dikarenakan NIK yang bersangkutan digunakan oleh pihak tidak bertanggung jawab a.n. (Tuliskan nama individu lain). Mohon dilaksanakan pengaturan ulang data. Dokumen pendukung KK Terlampir.<br/><br/>
                        POSKO PELAYANAN SPMB PROVINSI DKI JAKARTA
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kasus 2: Salah Input Data & Alamat */}
                <div className="accordion-item border-0 border-bottom">
                  <h2 className="accordion-header">
                    <button className={`accordion-button fw-bold py-4 text-dark ${openFaqs[2] ? '' : 'collapsed'}`} type="button" onClick={() => toggleFaq(2)} style={{backgroundColor: openFaqs[2] ? '#e8f5e9' : 'white'}}>
                      <i className="bi bi-pencil-square text-primary me-3"></i> 2. Kekeliruan Pengisian Data Demografi / Alamat pada Sistem
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse ${openFaqs[2] ? 'show' : ''}`}>
                    <div className="accordion-body small lh-lg bg-light border-top p-4">
                      <strong>Langkah Penyelesaian di Posko:</strong><br/>
                      1. Lakukan pemeriksaan terhadap status pengajuan akun peserta didik. Apabila statusnya masih <strong>Belum Diverifikasi / Dalam Masa Revisi / Ditolak</strong>, pendaftar dapat mengakses kembali portal dan melakukan <strong>PEMBARUAN DATA SECARA MANDIRI</strong> tanpa melibatkan intervensi petugas posko.<br/>
                      2. Namun, apabila status pengajuan <strong>Telah Disetujui (Ditandai Indikator Centang Hijau)</strong>, sistem telah mengunci pembaruan akun secara sepihak. Dokumen akun tersebut SANGAT DIWAJIBKAN untuk dihapus terlebih dahulu oleh verifikator wilayah. Setelah berhasil dihapus dari pusat data, pendaftar diperkenankan untuk merestrukturisasi pengajuan pendaftaran sedari awal.<br/><br/>
                      <strong>Format Pelaporan Khusus ke Saluran Bantuan Dinas:</strong>
                      <div className="bg-dark text-warning p-3 rounded-3 mt-3 font-monospace" style={{fontSize: '0.85rem'}}>
                        *PERMOHONAN PENOLAKAN AKUN SPMB (KOREKSI INPUT DATA)*<br/><br/>
                        Identitas Lengkap : <br/>
                        Nomor Peserta / NIK : <br/>
                        Tanggal Lahir : <br/>
                        Status Validasi Akun : Telah Disetujui (Centang Hijau)<br/>
                        Jenjang Pendidikan Tujuan : <br/>
                        Rincian Kendala : Terdapat kekeliruan pengisian data pendaftar (Mohon uraikan secara jelas: Kesalahan input Rukun Tetangga / Identitas nama Ibu tertukar dengan Ayah / Ketidaksesuaian domisili dengan basis KK). Mohon agar pengajuan akun DITOLAK sehingga pendaftar dapat memperbaiki dan mengajukan ulang data.<br/><br/>
                        POSKO PELAYANAN SPMB PROVINSI DKI JAKARTA
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kasus 3: Masalah KK Pendatang Baru / Penertiban Dukcapil */}
                <div className="accordion-item border-0 border-bottom">
                  <h2 className="accordion-header">
                    <button className={`accordion-button fw-bold py-4 text-dark ${openFaqs[3] ? '' : 'collapsed'}`} type="button" onClick={() => toggleFaq(3)} style={{backgroundColor: openFaqs[3] ? '#e8f5e9' : 'white'}}>
                      <i className="bi bi-card-heading text-warning me-3"></i> 3. Penolakan NIK Tidak Valid (Dukcapil) / Kartu Keluarga Berstatus Pendatang Baru
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse ${openFaqs[3] ? 'show' : ''}`}>
                    <div className="accordion-body small lh-lg bg-light border-top p-4">
                      <strong>Langkah Penyelesaian di Posko:</strong><br/>
                      1. <strong>Situasi NIK belum aktif pasca penertiban kependudukan:</strong> Edukasi pelapor bahwa keabsahan NIK sepenuhnya berada pada ranah kewenangan peladen Dinas Kependudukan dan Pencatatan Sipil (Dukcapil). Portal SPMB hanya menarik informasi sebagai pencerminan data terpusat. Masyarakat diwajibkan untuk bersabar menunggu sinkronisasi pembaruan data Dukcapil diselesaikan (estimasi waktu penyelesaian maksimal 24 jam kerja semenjak pemutakhiran di kantor kelurahan).<br/>
                      2. <strong>Situasi Dokumen KK Terdeteksi Sebagai Pendatang Baru (Lewat Batas Penerbitan 15 Juni 2025):</strong> Jika sebuah keluarga menerbitkan Kartu Keluarga baru akibat restrukturisasi anggota (penambahan kelahiran/kematian) dengan memastikan alamat domisili tidak mengalami pergeseran, pendaftar <strong>SANGAT DIWAJIBKAN menggunakan Dokumen KK Lama yang masih valid periodenya</strong>. Apabila telah terlanjur memindai KK Baru dan akun ditangguhkan, arahkan untuk meminta penghapusan akun kepada petugas.<br/><br/>
                      <strong>Format Pelaporan Khusus ke Saluran Bantuan Dinas:</strong>
                      <div className="bg-dark text-warning p-3 rounded-3 mt-3 font-monospace" style={{fontSize: '0.85rem'}}>
                        *PERMOHONAN PENGHAPUSAN AKUN SPMB (KENDALA BATAS WAKTU KARTU KELUARGA)*<br/><br/>
                        Identitas Lengkap : <br/>
                        Nomor Induk Kependudukan / Nomor Peserta : <br/>
                        Tanggal Lahir : <br/>
                        Jenjang Pendidikan Tujuan : <br/>
                        Rincian Kendala : Sistem pendataan mengidentifikasi Kartu Keluarga baru sebagai Pendatang Baru. Namun demikian, keluarga pendaftar memiliki bukti kepemilikan KK lama dengan titik koordinat domisili yang sama persis tanpa pergeseran. Mohon akun agar dihapuskan dari sistem agar pendaftar dapat mengulang proses pemindaian menggunakan dokumen KK lama yang terverifikasi secara waktu.<br/><br/>
                        POSKO PELAYANAN SPMB PROVINSI DKI JAKARTA
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kasus 4: Nilai TKA NOL */}
                <div className="accordion-item border-0 border-bottom">
                  <h2 className="accordion-header">
                    <button className={`accordion-button fw-bold py-4 text-dark ${openFaqs[4] ? '' : 'collapsed'}`} type="button" onClick={() => toggleFaq(4)} style={{backgroundColor: openFaqs[4] ? '#e8f5e9' : 'white'}}>
                      <i className="bi bi-file-earmark-bar-graph text-info me-3"></i> 4. Indikator Kualifikasi Tes Kemampuan Akademik (TKA) / Nilai Rapor Terbaca "Nol"
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse ${openFaqs[4] ? 'show' : ''}`}>
                    <div className="accordion-body small lh-lg bg-light border-top p-4">
                      <strong>Langkah Penyelesaian di Posko:</strong><br/>
                      Sistem integrasi penyatuan komponen nilai TKA bagi siswa berstatus lulusan Daerah Khusus Ibukota Jakarta diproses menggunakan metode penghubungan lintas sistem secara terstruktur pada peladen belakang. Apabila indikator evaluasi memunculkan angka nol, berikan jaminan kepada pelapor bahwa peladen pusat tengah menangani ribuan antrean penarikan dan penyesuaian (sinkronisasi) nilai secara bertahap. Pendaftar hanya perlu memantau dasbor pendaftaran secara periodik.<br/>
                      Namun, jika kendala ini berlarut hingga satu hari sebelum masa penutupan, petugas posko diperkenankan untuk meneruskan keluhan menggunakan templat di bawah ini:<br/><br/>
                      <strong>Format Pelaporan Khusus ke Saluran Bantuan Dinas:</strong>
                      <div className="bg-dark text-warning p-3 rounded-3 mt-3 font-monospace" style={{fontSize: '0.85rem'}}>
                        *PERMOHONAN PEMERIKSAAN INDIKATOR NILAI TKA / RAPOR KOSONG*<br/><br/>
                        Identitas Peserta : <br/>
                        Nomor Induk Kependudukan (NIK) : <br/>
                        Nomor Pendaftaran / Nomor Akun : <br/>
                        Status Validasi Akun : Telah Menyelesaikan Aktivasi dan Verifikasi<br/>
                        Rincian Kendala : Mengacu pada halaman profil peserta, indikator kalkulasi nilai TKA atau Nilai Rapor masih menampilkan angka 0 (Nol) / Kosong secara sistemik. Mohon penanganan dari tim rekayasa teknis pusat untuk memuat ulang tahapan sinkronisasi rekam jejak nilai peserta didik yang bersangkutan.<br/><br/>
                        POSKO PELAYANAN SPMB PROVINSI DKI JAKARTA
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kasus 5: Web Error */}
                <div className="accordion-item border-0">
                  <h2 className="accordion-header">
                    <button className={`accordion-button fw-bold py-4 text-dark ${openFaqs[5] ? '' : 'collapsed'}`} type="button" onClick={() => toggleFaq(5)} style={{backgroundColor: openFaqs[5] ? '#e8f5e9' : 'white'}}>
                      <i className="bi bi-bug-fill text-danger me-3"></i> 5. Kehilangan Kata Sandi Akses / Gangguan Sistem Portal / Berkas Terhapus Saat Pengunggahan
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse ${openFaqs[5] ? 'show' : ''}`}>
                    <div className="accordion-body small lh-lg bg-light border-top p-4">
                      <ul className="mb-0 ps-3">
                        <li className="mb-3"><strong>Prosedur Kehilangan Kata Sandi Keamanan:</strong> Pendaftar yang kehilangan atau melupakan kata sandi token keamanan diwajibkan untuk hadir secara fisik ke Sentra Pelayanan Posko Sekolah Negeri terdekat dengan membawa fisik Kartu Keluarga asli sebagai sarana verifikasi identitas, atau menghubungi Pusat Layanan Telepon (Call Center) resmi institusi.</li>
                        <li className="mb-3"><strong>Fenomena Berkas Terhapus Pada Sesi Pengunggahan:</strong> Kendala teknis ini bersumber dari padatnya lalu lintas pertukaran data (puncak pemakaian) pada portal Sidanira atau sistem SPMB. Berikan edukasi kepada masyarakat untuk memuat ulang halaman secara paksa (melalui instruksi teknis kombinasi tombol Ctrl+F5), mencoba menggunakan variasi peramban internet lain (dari Google Chrome dialihkan ke Mozilla Firefox atau Microsoft Edge), atau memanfaatkan perangkat komputasi alternatif dengan jaringan yang memiliki kestabilan lebih prima.</li>
                        <li><strong>Identitas Asal Institusi Pendidikan Luar Daerah Terekam "Kepulauan Seribu":</strong> Apabila pendaftar menempuh pendidikan di luar wilayah teritorial provinsi (sebagai contoh, berasal dari Bandung), namun hasil pencetakan formulir sistem menunjukkan identifikasi "Kepulauan Seribu" atau "Jakarta Selatan", <strong>TIDAK PERLU DIPERMASALAHKAN (Dapat Diabaikan)</strong>. Kebutuhan dasar portal sistem ini semata-mata adalah status pengklasifikasian bahwa peserta didik terkait merupakan pendaftar dari wilayah "Luar Provinsi DKI Jakarta". Keabsahan proses pendaftaran akan tetap diakui oleh panitia seleksi.</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 16. BAB 7: HOTLINE & POSKO PUSAT                                  */}
        {/* ================================================================= */}
        <div className="accordion-item border-bottom">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'BAB7' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('BAB7')}
            >
              <i className="bi bi-telephone-fill text-secondary me-3"></i> 16. BAB 7: Direktori Kontak Layanan Bantuan (Helpdesk) Pemerintah Provinsi DKI
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'BAB7' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              
              <div className="card bg-dark text-white border-0 p-4 shadow-sm rounded-4">
                <div className="row g-5">
                  <div className="col-md-6">
                    <strong className="d-block mb-3 text-warning fs-5 border-bottom border-secondary pb-3"><i className="bi bi-telephone-inbound-fill me-2"></i> Pusat Layanan Informasi Telepon (Call Center)</strong>
                    <ul className="list-unstyled mb-0 lh-lg font-monospace fs-6 mt-2 ps-2 text-light">
                      <li className="mb-2">0812 8055 5426</li>
                      <li className="mb-2">0812 8055 5612</li>
                      <li className="mb-2">0812 8055 5148</li>
                      <li className="mb-2">0812 8055 5165</li>
                      <li className="mb-2">0812 8055 5124</li>
                      <li>0812 8055 5147</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <strong className="d-block mb-3 text-success fs-5 border-bottom border-secondary pb-3"><i className="bi bi-whatsapp me-2"></i> Pusat Pelayanan Pesan Digital (WhatsApp Center)</strong>
                    <ul className="list-unstyled mb-0 lh-lg font-monospace fs-6 mt-2 ps-2 text-light">
                      <li className="mb-2">0877 1235 7970</li>
                      <li className="mb-2">0852 1241 9399</li>
                      <li className="mb-2">0856 9136 1471</li>
                      <li className="mb-2">0851 1131 5191</li>
                      <li className="mb-2">0822 4652 5541</li>
                      <li>0819 3614 9192</li>
                    </ul>
                  </div>
                  <div className="col-12 mt-2 pt-4 border-top border-secondary">
                    <strong className="d-block mb-4 text-info fs-5"><i className="bi bi-geo-alt-fill me-2"></i> Lokasi Titik Pelayanan Publik Luring (Fokus Eskalasi Kendala Berat)</strong>
                    <div className="d-flex flex-wrap gap-3">
                      <span className="badge bg-light text-dark px-4 py-2 border border-secondary shadow-sm rounded-pill fs-6">SMKN 1 Jakarta</span>
                      <span className="badge bg-light text-dark px-4 py-2 border border-secondary shadow-sm rounded-pill fs-6">SMKN 12 Jakarta</span>
                      <span className="badge bg-light text-dark px-4 py-2 border border-secondary shadow-sm rounded-pill fs-6">SMKN 14 Jakarta</span>
                      <span className="badge bg-light text-dark px-4 py-2 border border-secondary shadow-sm rounded-pill fs-6">SMKN 26 Jakarta</span>
                      <span className="badge bg-light text-dark px-4 py-2 border border-secondary shadow-sm rounded-pill fs-6">SMPN 30 Jakarta</span>
                      <span className="badge bg-light text-dark px-4 py-2 border border-secondary shadow-sm rounded-pill fs-6">SMPN 108 Jakarta</span>
                      <span className="badge bg-light text-dark px-4 py-2 border border-secondary shadow-sm rounded-pill fs-6">SDN Cipete Selatan 03</span>
                      <span className="badge bg-light text-dark px-4 py-2 border border-secondary shadow-sm rounded-pill fs-6">SMAN 78 Jakarta</span>
                      <span className="badge bg-light text-dark px-4 py-2 border border-secondary shadow-sm rounded-pill fs-6">SMAN 70 Jakarta</span>
                      <span className="badge bg-light text-dark px-4 py-2 border border-secondary shadow-sm rounded-pill fs-6">SMAN 39 Jakarta</span>
                      <span className="badge bg-light text-dark px-4 py-2 border border-secondary shadow-sm rounded-pill fs-6">Suku Dinas Pendidikan Kepulauan Seribu</span>
                    </div>
                    <div className="mt-5 pt-3 text-secondary text-center">
                      *Jam Operasional Sentra Pelayanan Publik Posko: Senin hingga Jumat (Pukul 08.00 s/d 16.00 WIB) serta Hari Sabtu (Pukul 08.00 s/d 12.00 WIB). Portal Aplikasi Utama Pendaftaran Daring: spmb.jakarta.go.id.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 17. BAB 8: REFERENSI DAYA TAMPUNG SEKOLAH NEGERI                  */}
        {/* ================================================================= */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button fw-bold fs-5 text-dark bg-light ${openAccordion === 'BAB8' ? 'shadow-sm' : 'collapsed'}`} 
              type="button" 
              onClick={() => toggleAccordion('BAB8')}
            >
              <i className="bi bi-database-fill text-danger me-3"></i> 17. BAB 8: Integrasi Database Daya Tampung Sekolah Negeri (Tahun 2026/2027)
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === 'BAB8' ? 'show' : ''}`}>
            <div className="accordion-body p-4 bg-white">
              <p className="text-muted small mb-4">Pangkalan data resmi di bawah ini difungsikan untuk memfasilitasi kebutuhan verifikasi warga seputar limitasi kuota daya tampung maksimal yang telah dialokasikan oleh masing-masing institusi pendidikan pada tingkat SMP dan SMA Negeri di wilayah provinsi DKI Jakarta untuk tahun ajaran 2026/2027 berdasarkan penetapan Surat Keputusan Kepala Dinas Pendidikan Tahun 2026.</p>

              {/* Sub-Bab Daya Tampung SMA */}
              <h5 className="fw-bold text-dark mt-4 border-bottom pb-2">A. Daya Tampung Institusi Pendidikan Jenjang SMA Negeri</h5>
              <div className="table-responsive shadow-sm rounded-4 border mb-5" style={{maxHeight: '500px', overflowY: 'auto'}}>
                <table className="table table-bordered table-striped table-hover mb-0 text-center small align-middle">
                  <thead className="table-dark" style={{position: 'sticky', top: '0', zIndex: '1'}}>
                    <tr>
                      <th className="py-3">Nomor Pokok Sekolah Nasional (NPSN)</th>
                      <th className="py-3 text-start ps-4">Penamaan Resmi Satuan Pendidikan</th>
                      <th className="py-3">Kapasitas Maksimal Daya Tampung (Peserta Didik)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr><td>20100216</td><td className="text-start ps-4">SMAN 1 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101622</td><td className="text-start ps-4">SMAN 2 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102216</td><td className="text-start ps-4">SMAN 3 JAKARTA</td><td>324</td></tr>
                    <tr><td>20100211</td><td className="text-start ps-4">SMAN 4 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100210</td><td className="text-start ps-4">SMAN 5 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102574</td><td className="text-start ps-4">SMAN 6 JAKARTA</td><td>324</td></tr>
                    <tr><td>20100200</td><td className="text-start ps-4">SMAN 7 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102568</td><td className="text-start ps-4">SMAN 8 JAKARTA</td><td>360</td></tr>
                    <tr><td>20103279</td><td className="text-start ps-4">SMAN 9 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100217</td><td className="text-start ps-4">SMAN 10 JAKARTA</td><td>180</td></tr>
                    <tr><td>20103287</td><td className="text-start ps-4">SMAN 11 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103285</td><td className="text-start ps-4">SMAN 12 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100806</td><td className="text-start ps-4">SMAN 13 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103284</td><td className="text-start ps-4">SMAN 14 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100807</td><td className="text-start ps-4">SMAN 15 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101625</td><td className="text-start ps-4">SMAN 16 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101624</td><td className="text-start ps-4">SMAN 17 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100809</td><td className="text-start ps-4">SMAN 18 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101623</td><td className="text-start ps-4">SMAN 19 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100218</td><td className="text-start ps-4">SMAN 20 JAKARTA</td><td>180</td></tr>
                    <tr><td>20103283</td><td className="text-start ps-4">SMAN 21 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103282</td><td className="text-start ps-4">SMAN 22 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101621</td><td className="text-start ps-4">SMAN 23 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100219</td><td className="text-start ps-4">SMAN 24 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100221</td><td className="text-start ps-4">SMAN 25 JAKARTA</td><td>180</td></tr>
                    <tr><td>20102218</td><td className="text-start ps-4">SMAN 26 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100223</td><td className="text-start ps-4">SMAN 27 JAKARTA</td><td>252</td></tr>
                    <tr><td>20107319</td><td className="text-start ps-4">SMAN 28 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102217</td><td className="text-start ps-4">SMAN 29 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100224</td><td className="text-start ps-4">SMAN 30 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103281</td><td className="text-start ps-4">SMAN 31 JAKARTA</td><td>360</td></tr>
                    <tr><td>20102215</td><td className="text-start ps-4">SMAN 32 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101620</td><td className="text-start ps-4">SMAN 33 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102214</td><td className="text-start ps-4">SMAN 34 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100212</td><td className="text-start ps-4">SMAN 35 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103280</td><td className="text-start ps-4">SMAN 36 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102213</td><td className="text-start ps-4">SMAN 37 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102212</td><td className="text-start ps-4">SMAN 38 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103296</td><td className="text-start ps-4">SMAN 39 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100810</td><td className="text-start ps-4">SMAN 40 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100811</td><td className="text-start ps-4">SMAN 41 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103297</td><td className="text-start ps-4">SMAN 42 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102211</td><td className="text-start ps-4">SMAN 43 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103298</td><td className="text-start ps-4">SMAN 44 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100812</td><td className="text-start ps-4">SMAN 45 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102210</td><td className="text-start ps-4">SMAN 46 JAKARTA</td><td>324</td></tr>
                    <tr><td>20102193</td><td className="text-start ps-4">SMAN 47 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103314</td><td className="text-start ps-4">SMAN 48 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102592</td><td className="text-start ps-4">SMAN 49 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103313</td><td className="text-start ps-4">SMAN 50 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103312</td><td className="text-start ps-4">SMAN 51 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100797</td><td className="text-start ps-4">SMAN 52 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103311</td><td className="text-start ps-4">SMAN 53 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103310</td><td className="text-start ps-4">SMAN 54 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102575</td><td className="text-start ps-4">SMAN 55 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101605</td><td className="text-start ps-4">SMAN 56 JAKARTA</td><td>180</td></tr>
                    <tr><td>20101604</td><td className="text-start ps-4">SMAN 57 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103309</td><td className="text-start ps-4">SMAN 58 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103308</td><td className="text-start ps-4">SMAN 59 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102573</td><td className="text-start ps-4">SMAN 60 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103307</td><td className="text-start ps-4">SMAN 61 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103306</td><td className="text-start ps-4">SMAN 62 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102572</td><td className="text-start ps-4">SMAN 63 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103305</td><td className="text-start ps-4">SMAN 64 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101589</td><td className="text-start ps-4">SMAN 65 JAKARTA</td><td>180</td></tr>
                    <tr><td>20102571</td><td className="text-start ps-4">SMAN 66 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103304</td><td className="text-start ps-4">SMAN 67 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100199</td><td className="text-start ps-4">SMAN 68 JAKARTA</td><td>288</td></tr>
                    <tr><td>20107185</td><td className="text-start ps-4">SMAN 69 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102570</td><td className="text-start ps-4">SMAN 70 JAKARTA</td><td>360</td></tr>
                    <tr><td>20103303</td><td className="text-start ps-4">SMAN 71 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100796</td><td className="text-start ps-4">SMAN 72 JAKARTA</td><td>249</td></tr>
                    <tr><td>20100795</td><td className="text-start ps-4">SMAN 73 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102569</td><td className="text-start ps-4">SMAN 74 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100779</td><td className="text-start ps-4">SMAN 75 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103302</td><td className="text-start ps-4">SMAN 76 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100201</td><td className="text-start ps-4">SMAN 77 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101588</td><td className="text-start ps-4">SMAN 78 JAKARTA</td><td>396</td></tr>
                    <tr><td>20107320</td><td className="text-start ps-4">SMAN 79 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100780</td><td className="text-start ps-4">SMAN 80 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103301</td><td className="text-start ps-4">SMAN 81 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102566</td><td className="text-start ps-4">SMAN 82 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100781</td><td className="text-start ps-4">SMAN 83 JAKARTA</td><td>180</td></tr>
                    <tr><td>20101587</td><td className="text-start ps-4">SMAN 84 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101586</td><td className="text-start ps-4">SMAN 85 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102565</td><td className="text-start ps-4">SMAN 86 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102564</td><td className="text-start ps-4">SMAN 87 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103300</td><td className="text-start ps-4">SMAN 88 JAKARTA</td><td>180</td></tr>
                    <tr><td>20103299</td><td className="text-start ps-4">SMAN 89 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102563</td><td className="text-start ps-4">SMAN 90 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103278</td><td className="text-start ps-4">SMAN 91 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100782</td><td className="text-start ps-4">SMAN 92 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103258</td><td className="text-start ps-4">SMAN 93 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101585</td><td className="text-start ps-4">SMAN 94 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101584</td><td className="text-start ps-4">SMAN 95 JAKARTA</td><td>324</td></tr>
                    <tr><td>20101583</td><td className="text-start ps-4">SMAN 96 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102562</td><td className="text-start ps-4">SMAN 97 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103257</td><td className="text-start ps-4">SMAN 98 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103256</td><td className="text-start ps-4">SMAN 99 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103294</td><td className="text-start ps-4">SMAN 100 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101627</td><td className="text-start ps-4">SMAN 101 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103293</td><td className="text-start ps-4">SMAN 102 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103292</td><td className="text-start ps-4">SMAN 103 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103291</td><td className="text-start ps-4">SMAN 104 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103290</td><td className="text-start ps-4">SMAN 105 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103289</td><td className="text-start ps-4">SMAN 106 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103288</td><td className="text-start ps-4">SMAN 107 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102230</td><td className="text-start ps-4">SMAN 108 JAKARTA</td><td>180</td></tr>
                    <tr><td>20102219</td><td className="text-start ps-4">SMAN 109 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100802</td><td className="text-start ps-4">SMAN 110 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100803</td><td className="text-start ps-4">SMAN 111 JAKARTA</td><td>144</td></tr>
                    <tr><td>20101626</td><td className="text-start ps-4">SMAN 112 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103286</td><td className="text-start ps-4">SMAN 113 JAKARTA</td><td>324</td></tr>
                    <tr><td>20100804</td><td className="text-start ps-4">SMAN 114 JAKARTA</td><td>144</td></tr>
                    <tr><td>20100805</td><td className="text-start ps-4">SMAN 115 JAKARTA</td><td>144</td></tr>
                    <tr><td>70053381</td><td className="text-start ps-4">SMAN 116 JAKARTA</td><td>216</td></tr>
                    <tr><td>70054019</td><td className="text-start ps-4">SMAN 117 JAKARTA</td><td>180</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Sub-Bab Daya Tampung SMP */}
              <h5 className="fw-bold text-dark mt-5 border-bottom pb-2">B. Daya Tampung Institusi Pendidikan Jenjang SMP Negeri</h5>
              <div className="table-responsive shadow-sm rounded-4 border mb-3" style={{maxHeight: '500px', overflowY: 'auto'}}>
                <table className="table table-bordered table-striped table-hover mb-0 text-center small align-middle">
                  <thead className="table-dark" style={{position: 'sticky', top: '0', zIndex: '1'}}>
                    <tr>
                      <th className="py-3">Nomor Pokok Sekolah Nasional (NPSN)</th>
                      <th className="py-3 text-start ps-4">Penamaan Resmi Satuan Pendidikan</th>
                      <th className="py-3">Kapasitas Maksimal Daya Tampung (Peserta Didik)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr><td>20100251</td><td className="text-start ps-4">SMP NEGERI 1 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100236</td><td className="text-start ps-4">SMP NEGERI 2 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102470</td><td className="text-start ps-4">SMP NEGERI 3 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100274</td><td className="text-start ps-4">SMP NEGERI 4 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100277</td><td className="text-start ps-4">SMP NEGERI 5 JAKARTA</td><td>180</td></tr>
                    <tr><td>20103596</td><td className="text-start ps-4">SMP NEGERI 6 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103594</td><td className="text-start ps-4">SMP NEGERI 7 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100260</td><td className="text-start ps-4">SMP NEGERI 8 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103590</td><td className="text-start ps-4">SMP NEGERI 9 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100252</td><td className="text-start ps-4">SMP NEGERI 10 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102402</td><td className="text-start ps-4">SMP NEGERI 11 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102509</td><td className="text-start ps-4">SMP NEGERI 12 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102507</td><td className="text-start ps-4">SMP NEGERI 13 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103516</td><td className="text-start ps-4">SMP NEGERI 14 JAKARTA</td><td>144</td></tr>
                    <tr><td>20102503</td><td className="text-start ps-4">SMP NEGERI 15 JAKARTA</td><td>252</td></tr>
                    <tr><td>20107034</td><td className="text-start ps-4">SMP NEGERI 16 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100231</td><td className="text-start ps-4">SMP NEGERI 17 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100232</td><td className="text-start ps-4">SMP NEGERI 18 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102522</td><td className="text-start ps-4">SMP NEGERI 19 JAKARTA</td><td>360</td></tr>
                    <tr><td>20103620</td><td className="text-start ps-4">SMP NEGERI 20 JAKARTA</td><td>308</td></tr>
                    <tr><td>20100770</td><td className="text-start ps-4">SMP NEGERI 21 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101529</td><td className="text-start ps-4">SMP NEGERI 22 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100772</td><td className="text-start ps-4">SMP NEGERI 23 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103624</td><td className="text-start ps-4">SMP NEGERI 24 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103602</td><td className="text-start ps-4">SMP NEGERI 25 JAKARTA</td><td>180</td></tr>
                    <tr><td>20103575</td><td className="text-start ps-4">SMP NEGERI 26 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103571</td><td className="text-start ps-4">SMP NEGERI 27 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100270</td><td className="text-start ps-4">SMP NEGERI 28 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102471</td><td className="text-start ps-4">SMP NEGERI 29 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100746</td><td className="text-start ps-4">SMP NEGERI 30 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102469</td><td className="text-start ps-4">SMP NEGERI 31 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101546</td><td className="text-start ps-4">SMP NEGERI 32 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102468</td><td className="text-start ps-4">SMP NEGERI 33 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100747</td><td className="text-start ps-4">SMP NEGERI 34 JAKARTA</td><td>288</td></tr>
                    <tr><td>20107182</td><td className="text-start ps-4">SMP NEGERI 35 JAKARTA</td><td>396</td></tr>
                    <tr><td>20103584</td><td className="text-start ps-4">SMP NEGERI 36 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102467</td><td className="text-start ps-4">SMP NEGERI 37 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100272</td><td className="text-start ps-4">SMP NEGERI 38 JAKARTA</td><td>216</td></tr>
                    <tr><td>20106401</td><td className="text-start ps-4">SMP NEGERI 39 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100275</td><td className="text-start ps-4">SMP NEGERI 40 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102480</td><td className="text-start ps-4">SMP NEGERI 41 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100748</td><td className="text-start ps-4">SMP NEGERI 42 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102481</td><td className="text-start ps-4">SMP NEGERI 43 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103601</td><td className="text-start ps-4">SMP NEGERI 44 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101545</td><td className="text-start ps-4">SMP NEGERI 45 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102482</td><td className="text-start ps-4">SMP NEGERI 46 JAKARTA</td><td>144</td></tr>
                    <tr><td>20100276</td><td className="text-start ps-4">SMP NEGERI 47 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102495</td><td className="text-start ps-4">SMP NEGERI 48 JAKARTA</td><td>288</td></tr>
                    <tr><td>20109183</td><td className="text-start ps-4">SMP NEGERI 49 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103599</td><td className="text-start ps-4">SMP NEGERI 50 JAKARTA</td><td>180</td></tr>
                    <tr><td>20103598</td><td className="text-start ps-4">SMP NEGERI 51 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103597</td><td className="text-start ps-4">SMP NEGERI 52 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100749</td><td className="text-start ps-4">SMP NEGERI 53 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101544</td><td className="text-start ps-4">SMP NEGERI 54 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100750</td><td className="text-start ps-4">SMP NEGERI 55 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102494</td><td className="text-start ps-4">SMP NEGERI 56 JAKARTA</td><td>360</td></tr>
                    <tr><td>20102493</td><td className="text-start ps-4">SMP NEGERI 57 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102492</td><td className="text-start ps-4">SMP NEGERI 58 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100278</td><td className="text-start ps-4">SMP NEGERI 59 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100279</td><td className="text-start ps-4">SMP NEGERI 60 JAKARTA</td><td>180</td></tr>
                    <tr><td>20101543</td><td className="text-start ps-4">SMP NEGERI 61 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103595</td><td className="text-start ps-4">SMP NEGERI 62 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101542</td><td className="text-start ps-4">SMP NEGERI 63 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100280</td><td className="text-start ps-4">SMP NEGERI 64 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100751</td><td className="text-start ps-4">SMP NEGERI 65 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102491</td><td className="text-start ps-4">SMP NEGERI 66 JAKARTA</td><td>180</td></tr>
                    <tr><td>20102490</td><td className="text-start ps-4">SMP NEGERI 67 JAKARTA</td><td>180</td></tr>
                    <tr><td>20102489</td><td className="text-start ps-4">SMP NEGERI 68 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101541</td><td className="text-start ps-4">SMP NEGERI 69 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100269</td><td className="text-start ps-4">SMP NEGERI 70 JAKARTA</td><td>216</td></tr>
                    <tr><td>20106410</td><td className="text-start ps-4">SMP NEGERI 71 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100267</td><td className="text-start ps-4">SMP NEGERI 72 JAKARTA</td><td>144</td></tr>
                    <tr><td>20102488</td><td className="text-start ps-4">SMP NEGERI 73 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103593</td><td className="text-start ps-4">SMP NEGERI 74 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101540</td><td className="text-start ps-4">SMP NEGERI 75 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100256</td><td className="text-start ps-4">SMP NEGERI 76 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100257</td><td className="text-start ps-4">SMP NEGERI 77 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100258</td><td className="text-start ps-4">SMP NEGERI 78 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100259</td><td className="text-start ps-4">SMP NEGERI 79 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103592</td><td className="text-start ps-4">SMP NEGERI 80 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103591</td><td className="text-start ps-4">SMP NEGERI 81 JAKARTA</td><td>324</td></tr>
                    <tr><td>20101539</td><td className="text-start ps-4">SMP NEGERI 82 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101538</td><td className="text-start ps-4">SMP NEGERI 83 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100752</td><td className="text-start ps-4">SMP NEGERI 84 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102487</td><td className="text-start ps-4">SMP NEGERI 85 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102486</td><td className="text-start ps-4">SMP NEGERI 86 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102485</td><td className="text-start ps-4">SMP NEGERI 87 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101537</td><td className="text-start ps-4">SMP NEGERI 88 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101522</td><td className="text-start ps-4">SMP NEGERI 89 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103589</td><td className="text-start ps-4">SMP NEGERI 90 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103588</td><td className="text-start ps-4">SMP NEGERI 91 JAKARTA</td><td>164</td></tr>
                    <tr><td>20103587</td><td className="text-start ps-4">SMP NEGERI 92 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100261</td><td className="text-start ps-4">SMP NEGERI 93 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100262</td><td className="text-start ps-4">SMP NEGERI 94 JAKARTA</td><td>144</td></tr>
                    <tr><td>20100753</td><td className="text-start ps-4">SMP NEGERI 95 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102484</td><td className="text-start ps-4">SMP NEGERI 96 JAKARTA</td><td>206</td></tr>
                    <tr><td>20103586</td><td className="text-start ps-4">SMP NEGERI 97 JAKARTA</td><td>324</td></tr>
                    <tr><td>20102483</td><td className="text-start ps-4">SMP NEGERI 98 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103565</td><td className="text-start ps-4">SMP NEGERI 99 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101558</td><td className="text-start ps-4">SMP NEGERI 100 JAKARTA</td><td>180</td></tr>
                    <tr><td>20101557</td><td className="text-start ps-4">SMP NEGERI 101 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103507</td><td className="text-start ps-4">SMP NEGERI 102 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103508</td><td className="text-start ps-4">SMP NEGERI 103 JAKARTA</td><td>180</td></tr>
                    <tr><td>20102420</td><td className="text-start ps-4">SMP NEGERI 104 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101556</td><td className="text-start ps-4">SMP NEGERI 105 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103524</td><td className="text-start ps-4">SMP NEGERI 106 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102419</td><td className="text-start ps-4">SMP NEGERI 107 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101554</td><td className="text-start ps-4">SMP NEGERI 108 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103523</td><td className="text-start ps-4">SMP NEGERI 109 JAKARTA</td><td>260</td></tr>
                    <tr><td>20102527</td><td className="text-start ps-4">SMP NEGERI 110 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101553</td><td className="text-start ps-4">SMP NEGERI 111 JAKARTA</td><td>324</td></tr>
                    <tr><td>20100717</td><td className="text-start ps-4">SMP NEGERI 112 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100718</td><td className="text-start ps-4">SMP NEGERI 113 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100719</td><td className="text-start ps-4">SMP NEGERI 114 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102510</td><td className="text-start ps-4">SMP NEGERI 115 JAKARTA</td><td>324</td></tr>
                    <tr><td>20100720</td><td className="text-start ps-4">SMP NEGERI 116 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103522</td><td className="text-start ps-4">SMP NEGERI 117 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100241</td><td className="text-start ps-4">SMP NEGERI 118 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100240</td><td className="text-start ps-4">SMP NEGERI 119 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100721</td><td className="text-start ps-4">SMP NEGERI 120 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100740</td><td className="text-start ps-4">SMP NEGERI 121 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100741</td><td className="text-start ps-4">SMP NEGERI 122 JAKARTA</td><td>324</td></tr>
                    <tr><td>20100760</td><td className="text-start ps-4">SMP NEGERI 123 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102508</td><td className="text-start ps-4">SMP NEGERI 124 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101552</td><td className="text-start ps-4">SMP NEGERI 125 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103521</td><td className="text-start ps-4">SMP NEGERI 126 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101551</td><td className="text-start ps-4">SMP NEGERI 127 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103520</td><td className="text-start ps-4">SMP NEGERI 128 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100761</td><td className="text-start ps-4">SMP NEGERI 129 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101550</td><td className="text-start ps-4">SMP NEGERI 130 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102506</td><td className="text-start ps-4">SMP NEGERI 131 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101562</td><td className="text-start ps-4">SMP NEGERI 132 JAKARTA</td><td>252</td></tr>
                    <tr><td>20106342</td><td className="text-start ps-4">SMP NEGERI 133 JAKARTA</td><td>108</td></tr>
                    <tr><td>20101563</td><td className="text-start ps-4">SMP NEGERI 134 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103519</td><td className="text-start ps-4">SMP NEGERI 135 JAKARTA</td><td>288</td></tr>
                    <tr><td>20106716</td><td className="text-start ps-4">SMP NEGERI 136 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100228</td><td className="text-start ps-4">SMP NEGERI 137 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103518</td><td className="text-start ps-4">SMP NEGERI 138 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103517</td><td className="text-start ps-4">SMP NEGERI 139 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100762</td><td className="text-start ps-4">SMP NEGERI 140 JAKARTA</td><td>180</td></tr>
                    <tr><td>20102505</td><td className="text-start ps-4">SMP NEGERI 141 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101564</td><td className="text-start ps-4">SMP NEGERI 142 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100763</td><td className="text-start ps-4">SMP NEGERI 143 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103515</td><td className="text-start ps-4">SMP NEGERI 144 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102504</td><td className="text-start ps-4">SMP NEGERI 145 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103514</td><td className="text-start ps-4">SMP NEGERI 146 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103513</td><td className="text-start ps-4">SMP NEGERI 147 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103512</td><td className="text-start ps-4">SMP NEGERI 148 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103511</td><td className="text-start ps-4">SMP NEGERI 149 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103510</td><td className="text-start ps-4">SMP NEGERI 150 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100764</td><td className="text-start ps-4">SMP NEGERI 151 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100765</td><td className="text-start ps-4">SMP NEGERI 152 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102502</td><td className="text-start ps-4">SMP NEGERI 153 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102501</td><td className="text-start ps-4">SMP NEGERI 154 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102500</td><td className="text-start ps-4">SMP NEGERI 155 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100230</td><td className="text-start ps-4">SMP NEGERI 156 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103509</td><td className="text-start ps-4">SMP NEGERI 157 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103489</td><td className="text-start ps-4">SMP NEGERI 158 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101576</td><td className="text-start ps-4">SMP NEGERI 159 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103564</td><td className="text-start ps-4">SMP NEGERI 160 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102499</td><td className="text-start ps-4">SMP NEGERI 161 JAKARTA</td><td>324</td></tr>
                    <tr><td>20100766</td><td className="text-start ps-4">SMP NEGERI 162 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102498</td><td className="text-start ps-4">SMP NEGERI 163 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102511</td><td className="text-start ps-4">SMP NEGERI 164 JAKARTA</td><td>282</td></tr>
                    <tr><td>20103639</td><td className="text-start ps-4">SMP NEGERI 165 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102512</td><td className="text-start ps-4">SMP NEGERI 166 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103619</td><td className="text-start ps-4">SMP NEGERI 167 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103618</td><td className="text-start ps-4">SMP NEGERI 168 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101574</td><td className="text-start ps-4">SMP NEGERI 169 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100767</td><td className="text-start ps-4">SMP NEGERI 170 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103617</td><td className="text-start ps-4">SMP NEGERI 171 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103616</td><td className="text-start ps-4">SMP NEGERI 172 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100768</td><td className="text-start ps-4">SMP NEGERI 173 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103615</td><td className="text-start ps-4">SMP NEGERI 174 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102513</td><td className="text-start ps-4">SMP NEGERI 175 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101573</td><td className="text-start ps-4">SMP NEGERI 176 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102526</td><td className="text-start ps-4">SMP NEGERI 177 JAKARTA</td><td>324</td></tr>
                    <tr><td>20102525</td><td className="text-start ps-4">SMP NEGERI 178 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103614</td><td className="text-start ps-4">SMP NEGERI 179 JAKARTA</td><td>324</td></tr>
                    <tr><td>20109257</td><td className="text-start ps-4">SMP NEGERI 180 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100233</td><td className="text-start ps-4">SMP NEGERI 181 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102524</td><td className="text-start ps-4">SMP NEGERI 182 JAKARTA</td><td>324</td></tr>
                    <tr><td>20100235</td><td className="text-start ps-4">SMP NEGERI 183 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103612</td><td className="text-start ps-4">SMP NEGERI 184 JAKARTA</td><td>324</td></tr>
                    <tr><td>20102523</td><td className="text-start ps-4">SMP NEGERI 185 JAKARTA</td><td>180</td></tr>
                    <tr><td>20101572</td><td className="text-start ps-4">SMP NEGERI 186 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101571</td><td className="text-start ps-4">SMP NEGERI 187 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103611</td><td className="text-start ps-4">SMP NEGERI 188 JAKARTA</td><td>180</td></tr>
                    <tr><td>20101570</td><td className="text-start ps-4">SMP NEGERI 189 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101569</td><td className="text-start ps-4">SMP NEGERI 190 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101568</td><td className="text-start ps-4">SMP NEGERI 191 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103610</td><td className="text-start ps-4">SMP NEGERI 192 JAKARTA</td><td>180</td></tr>
                    <tr><td>20103609</td><td className="text-start ps-4">SMP NEGERI 193 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103608</td><td className="text-start ps-4">SMP NEGERI 194 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103607</td><td className="text-start ps-4">SMP NEGERI 195 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103606</td><td className="text-start ps-4">SMP NEGERI 196 JAKARTA</td><td>180</td></tr>
                    <tr><td>20101566</td><td className="text-start ps-4">SMP NEGERI 197 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103605</td><td className="text-start ps-4">SMP NEGERI 198 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103604</td><td className="text-start ps-4">SMP NEGERI 199 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100769</td><td className="text-start ps-4">SMP NEGERI 200 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101565</td><td className="text-start ps-4">SMP NEGERI 201 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103621</td><td className="text-start ps-4">SMP NEGERI 202 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103622</td><td className="text-start ps-4">SMP NEGERI 203 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101549</td><td className="text-start ps-4">SMP NEGERI 204 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101548</td><td className="text-start ps-4">SMP NEGERI 205 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101533</td><td className="text-start ps-4">SMP NEGERI 206 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101532</td><td className="text-start ps-4">SMP NEGERI 207 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103638</td><td className="text-start ps-4">SMP NEGERI 208 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103637</td><td className="text-start ps-4">SMP NEGERI 209 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103636</td><td className="text-start ps-4">SMP NEGERI 210 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102521</td><td className="text-start ps-4">SMP NEGERI 211 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102520</td><td className="text-start ps-4">SMP NEGERI 212 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103635</td><td className="text-start ps-4">SMP NEGERI 213 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103634</td><td className="text-start ps-4">SMP NEGERI 214 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101531</td><td className="text-start ps-4">SMP NEGERI 215 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100237</td><td className="text-start ps-4">SMP NEGERI 216 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103633</td><td className="text-start ps-4">SMP NEGERI 217 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102519</td><td className="text-start ps-4">SMP NEGERI 218 JAKARTA</td><td>288</td></tr>
                    <tr><td>20101530</td><td className="text-start ps-4">SMP NEGERI 219 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101528</td><td className="text-start ps-4">SMP NEGERI 220 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100771</td><td className="text-start ps-4">SMP NEGERI 221 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103632</td><td className="text-start ps-4">SMP NEGERI 222 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103631</td><td className="text-start ps-4">SMP NEGERI 223 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101527</td><td className="text-start ps-4">SMP NEGERI 224 JAKARTA</td><td>180</td></tr>
                    <tr><td>20101526</td><td className="text-start ps-4">SMP NEGERI 225 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102518</td><td className="text-start ps-4">SMP NEGERI 226 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102517</td><td className="text-start ps-4">SMP NEGERI 227 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100238</td><td className="text-start ps-4">SMP NEGERI 228 JAKARTA</td><td>288</td></tr>
                    <tr><td>20109212</td><td className="text-start ps-4">SMP NEGERI 229 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103630</td><td className="text-start ps-4">SMP NEGERI 230 JAKARTA</td><td>360</td></tr>
                    <tr><td>20100773</td><td className="text-start ps-4">SMP NEGERI 231 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103629</td><td className="text-start ps-4">SMP NEGERI 232 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103628</td><td className="text-start ps-4">SMP NEGERI 233 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103627</td><td className="text-start ps-4">SMP NEGERI 234 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102516</td><td className="text-start ps-4">SMP NEGERI 235 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103626</td><td className="text-start ps-4">SMP NEGERI 236 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103625</td><td className="text-start ps-4">SMP NEGERI 237 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102515</td><td className="text-start ps-4">SMP NEGERI 238 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102514</td><td className="text-start ps-4">SMP NEGERI 239 JAKARTA</td><td>324</td></tr>
                    <tr><td>20102497</td><td className="text-start ps-4">SMP NEGERI 240 JAKARTA</td><td>252</td></tr>
                    <tr><td>20106343</td><td className="text-start ps-4">SMP NEGERI 241 JAKARTA</td><td>108</td></tr>
                    <tr><td>20102496</td><td className="text-start ps-4">SMP NEGERI 242 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103623</td><td className="text-start ps-4">SMP NEGERI 243 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100759</td><td className="text-start ps-4">SMP NEGERI 244 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102479</td><td className="text-start ps-4">SMP NEGERI 245 JAKARTA</td><td>180</td></tr>
                    <tr><td>20103603</td><td className="text-start ps-4">SMP NEGERI 246 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102478</td><td className="text-start ps-4">SMP NEGERI 247 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101524</td><td className="text-start ps-4">SMP NEGERI 248 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101523</td><td className="text-start ps-4">SMP NEGERI 249 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102477</td><td className="text-start ps-4">SMP NEGERI 250 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103582</td><td className="text-start ps-4">SMP NEGERI 251 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103581</td><td className="text-start ps-4">SMP NEGERI 252 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102476</td><td className="text-start ps-4">SMP NEGERI 253 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102475</td><td className="text-start ps-4">SMP NEGERI 254 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103580</td><td className="text-start ps-4">SMP NEGERI 255 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103579</td><td className="text-start ps-4">SMP NEGERI 256 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103578</td><td className="text-start ps-4">SMP NEGERI 257 JAKARTA</td><td>324</td></tr>
                    <tr><td>20103577</td><td className="text-start ps-4">SMP NEGERI 258 JAKARTA</td><td>360</td></tr>
                    <tr><td>20103576</td><td className="text-start ps-4">SMP NEGERI 259 JAKARTA</td><td>360</td></tr>
                    <tr><td>20106346</td><td className="text-start ps-4">SMP NEGERI 260 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100758</td><td className="text-start ps-4">SMP NEGERI 261 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103574</td><td className="text-start ps-4">SMP NEGERI 262 JAKARTA</td><td>216</td></tr>
                    <tr><td>20103573</td><td className="text-start ps-4">SMP NEGERI 263 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101534</td><td className="text-start ps-4">SMP NEGERI 264 JAKARTA</td><td>216</td></tr>
                    <tr><td>20102474</td><td className="text-start ps-4">SMP NEGERI 265 JAKARTA</td><td>288</td></tr>
                    <tr><td>20100757</td><td className="text-start ps-4">SMP NEGERI 266 JAKARTA</td><td>252</td></tr>
                    <tr><td>20102473</td><td className="text-start ps-4">SMP NEGERI 267 JAKARTA</td><td>252</td></tr>
                    <tr><td>20103572</td><td className="text-start ps-4">SMP NEGERI 268 JAKARTA</td><td>324</td></tr>
                    <tr><td>20100253</td><td className="text-start ps-4">SMP NEGERI 269 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100742</td><td className="text-start ps-4">SMP NEGERI 270 JAKARTA</td><td>216</td></tr>
                    <tr><td>20101535</td><td className="text-start ps-4">SMP NEGERI 271 JAKARTA</td><td>288</td></tr>
                    <tr><td>20103570</td><td className="text-start ps-4">SMP NEGERI 272 JAKARTA</td><td>252</td></tr>
                    <tr><td>20100255</td><td className="text-start ps-4">SMP NEGERI 273 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101536</td><td className="text-start ps-4">SMP NEGERI 274 JAKARTA</td><td>180</td></tr>
                    <tr><td>20103569</td><td className="text-start ps-4">SMP NEGERI 275 JAKARTA</td><td>288</td></tr>
                    <tr><td>20102472</td><td className="text-start ps-4">SMP NEGERI 276 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100743</td><td className="text-start ps-4">SMP NEGERI 277 JAKARTA</td><td>252</td></tr>
                    <tr><td>20101547</td><td className="text-start ps-4">SMP NEGERI 278 JAKARTA</td><td>180</td></tr>
                    <tr><td>20100744</td><td className="text-start ps-4">SMP NEGERI 279 JAKARTA</td><td>216</td></tr>
                    <tr><td>20100271</td><td className="text-start ps-4">SMP NEGERI 280 JAKARTA</td><td>144</td></tr>
                    <tr><td>20103568</td><td className="text-start ps-4">SMP NEGERI 281 JAKARTA</td><td>345</td></tr>
                    <tr><td>20100745</td><td className="text-start ps-4">SMP NEGERI 282 JAKARTA</td><td>216</td></tr>
                    <tr><td>20107179</td><td className="text-start ps-4">SMP NEGERI 283 JAKARTA</td><td>216</td></tr>
                    <tr><td>20107180</td><td className="text-start ps-4">SMP NEGERI 284 JAKARTA</td><td>180</td></tr>
                    <tr><td>20106347</td><td className="text-start ps-4">SMP NEGERI 285 JAKARTA</td><td>72</td></tr>
                    <tr><td>20108854</td><td className="text-start ps-4">SMP NEGERI 286 JAKARTA</td><td>180</td></tr>
                    <tr><td>20107181</td><td className="text-start ps-4">SMP NEGERI 287 JAKARTA</td><td>252</td></tr>
                    <tr><td>20106344</td><td className="text-start ps-4">SMP NEGERI 288 JAKARTA</td><td>72</td></tr>
                    <tr><td>69800097</td><td className="text-start ps-4">SMP NEGERI 289 JAKARTA</td><td>264</td></tr>
                    <tr><td>69980874</td><td className="text-start ps-4">SMP NEGERI 290 JAKARTA</td><td>180</td></tr>
                    <tr><td>70053290</td><td className="text-start ps-4">SMP NEGERI 291 JAKARTA</td><td>144</td></tr>
                    <tr><td>70053408</td><td className="text-start ps-4">SMP NEGERI 292 JAKARTA</td><td>108</td></tr>
                    <tr><td>70053539</td><td className="text-start ps-4">SMP NEGERI 293 JAKARTA</td><td>108</td></tr>
                    <tr><td>70053213</td><td className="text-start ps-4">SMP NEGERI 294 JAKARTA</td><td>144</td></tr>
                    <tr><td>70053698</td><td className="text-start ps-4">SMP NEGERI 295 JAKARTA</td><td>216</td></tr>
                    <tr><td>-</td><td className="text-start ps-4">SMP NEGERI 296 JAKARTA</td><td>108</td></tr>
                    <tr><td>-</td><td className="text-start ps-4">SMP NEGERI 297 JAKARTA</td><td>288</td></tr>
                    <tr><td>-</td><td className="text-start ps-4">SMP NEGERI 298 JAKARTA</td><td>288</td></tr>
                    <tr><td>-</td><td className="text-start ps-4">SMP NEGERI 299 JAKARTA</td><td>216</td></tr>
                    <tr><td>20107183</td><td className="text-start ps-4">SMP Negeri SATU ATAP 01 PULAU PARI</td><td>36</td></tr>
                    <tr><td>20107711</td><td className="text-start ps-4">SMP Negeri SATU ATAP 02 PULAU SABIRA</td><td>36</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}