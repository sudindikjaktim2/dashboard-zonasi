import React, { useState, useEffect } from 'react';

export default function Antrean() {
  const [antrean, setAntrean] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // GANTI DENGAN URL BACKEND NODE.JS KAMU YANG ONLINE
 const API_URL = 'https://dashboard-zonasi.onrender.com/api/antrean';

  const fetchAntrean = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setAntrean(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal terhubung ke server antrean:", error);
    }
  };

  // Polling data setiap 3 detik
  useEffect(() => {
    fetchAntrean();
    const interval = setInterval(fetchAntrean, 3000); 
    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // FUNGSI SUARA AI (TEXT TO SPEECH)
  // ==========================================
 const panggilSuara = (nomor, meja) => {
    if ('speechSynthesis' in window) {
      const teks = `Nomor antrean, ${nomor}, silakan menuju ke, ${meja}`;
      const utterance = new SpeechSynthesisUtterance(teks);
      
      // Pengaturan Suara (Bahasa Indonesia)
      utterance.lang = 'id-ID';
      utterance.rate = 0.85; // Kecepatan diperlambat sedikit agar natural
      utterance.pitch = 1;   

      // Trik untuk mencegah bug suara tiba-tiba hilang/bisu di Google Chrome
      window.utterance = utterance; 
      
      // Mainkan suara
      window.speechSynthesis.speak(window.utterance);
    } else {
      console.warn('Browser Anda tidak mendukung fitur suara AI Text-to-Speech.');
    }
  };

  const handleUpdate = async (id, action) => {
    // 1. CARI NOMOR BARU DULUAN SECARA SINKRON (Jangan di dalam setAntrean)
    const targetDesk = antrean.find(item => item.id === id);
    if (!targetDesk) return;

    // Cari nomor tertinggi di kategori meja tersebut
    const maxNomor = Math.max(...antrean.filter(i => i.kategori === targetDesk.kategori).map(i => i.nomor_sekarang));
    
    // Tentukan nomor panggil yang baru
    const newNomor = action === 'next' ? maxNomor + 1 : Math.max(0, targetDesk.nomor_sekarang - 1);

    // 2. JALANKAN SUARA LANGSUNG SAAT TOMBOL DIKLIK (Mencegah blokir browser)
    if (action === 'next') {
      panggilSuara(newNomor, targetDesk.nama_meja);
    }

    // 3. UPDATE LAYAR LANGSUNG (Optimistic Update tanpa delay)
    setAntrean(prev => prev.map(item => 
      item.id === id ? { ...item, nomor_sekarang: newNomor } : item
    ));

    // 4. KIRIM KE DATABASE (BACKEND)
    try {
      const response = await fetch(`${API_URL}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      });
      const updatedRow = await response.json();
      
      // Update data resmi dari database ke layar untuk memastikan valid
      setAntrean(prev => prev.map(item => item.id === id ? updatedRow : item));
    } catch (error) {
      console.error("Gagal update data ke database:", error);
      fetchAntrean(); // Rollback ke data asli jika error jaringan
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5 py-5 fw-bold text-muted">Menghubungkan ke Server Database Antrean...</div>;
  }

  // Pisahkan & Urutkan agar posisi meja rapi berurutan (1,2,3...9)
  const antreanSudin = antrean.filter(a => a.kategori === 'SUDIN').sort((a, b) => a.id.localeCompare(b.id, undefined, {numeric: true}));
  const antreanDukcapil = antrean.filter(a => a.kategori === 'DUKCAPIL').sort((a, b) => a.id.localeCompare(b.id, undefined, {numeric: true}));

  return (
    <div className="card shadow border-0 rounded-0 bg-white mb-5 p-0 overflow-hidden">
      
      {/* HEADER TV */}
      <div className="bg-dark text-white text-center py-3 border-bottom border-4 border-warning">
        <h2 className="fw-bolder mb-0 tracking-wider text-uppercase">MONITOR ANTREAN POSKO SPMB</h2>
      </div>
      
      <div className="card-body p-3 p-md-4 bg-light">
        
        {/* --- LOKET SUDIN (9 MEJA) --- */}
        <div className="mb-5">
          <h5 className="fw-bold text-primary mb-3 text-center border-bottom border-primary pb-2 d-inline-block mx-auto">
            LOKET LAYANAN SUDIN PENDIDIKAN
          </h5>
          <div className="row g-3 justify-content-center">
            {antreanSudin.map((item) => (
              <div key={item.id} className="col-4 col-md-2">
                <div className="card border-0 shadow-sm rounded-3 h-100 text-center overflow-hidden">
                  <div className="bg-primary text-white py-1 fw-bold small text-truncate px-1">{item.nama_meja}</div>
                  <div className="card-body py-3 bg-white">
                    <h2 className="fw-bolder text-dark mb-0 font-monospace">
                      {item.nomor_sekarang.toString().padStart(3, '0')}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- LOKET DUKCAPIL (3 MEJA) --- */}
        <div className="mb-2 mt-4">
          <h5 className="fw-bold text-success mb-3 text-center border-bottom border-success pb-2 d-inline-block mx-auto">
            LOKET LAYANAN DUKCAPIL (KK & NIK)
          </h5>
          <div className="row g-3 justify-content-center">
            {antreanDukcapil.map((item) => (
              <div key={item.id} className="col-4 col-md-3">
                <div className="card border-0 shadow-sm rounded-3 h-100 text-center overflow-hidden border-success">
                  <div className="bg-success text-white py-1 fw-bold small text-truncate px-1">{item.nama_meja}</div>
                  <div className="card-body py-4 bg-white">
                    <h1 className="display-6 fw-bolder text-dark mb-0 font-monospace">
                      {item.nomor_sekarang.toString().padStart(3, '0')}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- PANEL OPERATOR ADMIN --- */}
      <div className="bg-white border-top border-3 p-4 shadow-lg">
        <div className="d-flex align-items-center mb-3 border-bottom pb-3">
          <span className="badge bg-danger p-2 me-2 blink">LIVE</span>
          <div>
            <h6 className="fw-bold text-dark mb-0">PANEL OPERATOR</h6>
            <span className="text-muted" style={{fontSize: '0.75rem'}}>Klik (+) untuk memanggil antrean selanjutnya (Suara otomatis menyala).</span>
          </div>
        </div>
        
        <div className="row g-4">
          {/* Kontrol Sudin */}
          <div className="col-lg-8 border-end-lg">
            <div className="text-primary fw-bold small mb-2"><i className="bi bi-person-badge"></i> KONTROL MEJA SUDIN</div>
            <div className="row g-2">
              {antreanSudin.map(item => (
                <div key={`op-${item.id}`} className="col-12 col-sm-6 col-xl-4">
                  <div className="d-flex align-items-center justify-content-between border rounded p-1 bg-light h-100 shadow-sm">
                    <span className="fw-bold ms-2 small text-secondary text-truncate" style={{maxWidth: '70px'}}>{item.nama_meja}</span>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-danger px-2 fw-bold" onClick={() => handleUpdate(item.id, 'prev')}>-</button>
                      <span className="btn btn-sm btn-light px-2 fw-bold font-monospace border-top border-bottom text-dark" style={{pointerEvents:'none'}}>
                        {item.nomor_sekarang}
                      </span>
                      <button className="btn btn-sm btn-primary px-3 fw-bold" onClick={() => handleUpdate(item.id, 'next')}>+ Panggil</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Kontrol Dukcapil */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="text-success fw-bold small mb-2"><i className="bi bi-card-heading"></i> KONTROL MEJA DUKCAPIL</div>
            <div className="row g-2">
              {antreanDukcapil.map(item => (
                <div key={`op-${item.id}`} className="col-12 col-sm-6 col-lg-12">
                  <div className="d-flex align-items-center justify-content-between border border-success rounded p-1 bg-success bg-opacity-10 h-100 shadow-sm">
                    <span className="fw-bold ms-2 small text-success text-truncate">{item.nama_meja}</span>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-danger px-2 fw-bold" onClick={() => handleUpdate(item.id, 'prev')}>-</button>
                      <span className="btn btn-sm btn-light px-3 fw-bold font-monospace border-top border-bottom border-success text-dark" style={{pointerEvents:'none'}}>
                        {item.nomor_sekarang}
                      </span>
                      <button className="btn btn-sm btn-success px-3 fw-bold" onClick={() => handleUpdate(item.id, 'next')}>+ Panggil</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}