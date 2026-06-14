import React, { useState, useEffect, useRef } from 'react';

export default function Antrean() {
  const [antrean, setAntrean] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk mengontrol komputer mana yang jadi sumber suara (TV)
  const [isTvMode, setIsTvMode] = useState(false);
  
  // Reference agar nilai terbaru bisa dibaca di dalam fungsi Interval (tanpa bug closure)
  const isTvModeRef = useRef(false);
  const prevAntreanRef = useRef([]);

  // GANTI DENGAN URL BACKEND NODE.JS KAMU NANTI (Misal: https://api.zonasispmb.com/api/antrean)
const API_URL = 'https://dashboard-zonasi.onrender.com/api/antrean';
  // ==========================================
  // FUNGSI SUARA AI (TEXT TO SPEECH)
  // ==========================================
  const panggilSuara = (nomor, meja, kategori) => {
    if ('speechSynthesis' in window) {
      const sebutanPosko = kategori === 'SUDIN' ? 'Posko Sudin' : 'Posko Dukcapil';
      const teks = `Nomor antrean, ${nomor}, silakan menuju ke, ${meja}, ${sebutanPosko}`;
      const utterance = new SpeechSynthesisUtterance(teks);
      
      utterance.lang = 'id-ID';
      utterance.rate = 0.85; 
      utterance.pitch = 1;   

      // Trik untuk mencegah bug suara hilang di Google Chrome
      window.utterance = utterance; 
      window.speechSynthesis.speak(window.utterance);
    }
  };

  // ==========================================
  // FUNGSI PENARIKAN DATA (POLLING)
  // ==========================================
  const fetchAntrean = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // LOGIKA CERDAS: Cek apakah ada penambahan nomor dari petugas di PC lain
      if (isTvModeRef.current && prevAntreanRef.current.length > 0) {
        data.forEach(mejaBaru => {
          const mejaLama = prevAntreanRef.current.find(m => m.id === mejaBaru.id);
          
          // Jika nomor di database lebih besar dari nomor di layar saat ini -> BUNYIKAN SUARA!
          if (mejaLama && mejaBaru.nomor_sekarang > mejaLama.nomor_sekarang) {
            panggilSuara(mejaBaru.nomor_sekarang, mejaBaru.nama_meja, mejaBaru.kategori);
          }
        });
      }

      // Simpan data terbaru ke memori layar
      prevAntreanRef.current = data;
      setAntrean(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal terhubung ke server antrean:", error);
    }
  };

  useEffect(() => {
    fetchAntrean();
    const interval = setInterval(fetchAntrean, 3000); 
    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // HANDLER SAKELAR MODE TV
  // ==========================================
  const toggleTvMode = (e) => {
    const checked = e.target.checked;
    setIsTvMode(checked);
    isTvModeRef.current = checked; // Simpan ke referensi

    if (checked) {
      // Browser butuh interaksi klik pertama agar suara tidak diblokir
      const dummy = new SpeechSynthesisUtterance('');
      window.speechSynthesis.speak(dummy);
      alert("✅ Mode Suara TV Aktif! Komputer ini akan bersuara jika ada petugas yang memanggil antrean.");
    }
  };

  // ==========================================
  // HANDLER TOMBOL OPERATOR (Di PC Petugas)
  // ==========================================
  const handleUpdate = async (id, action) => {
    // Layar petugas langsung update (optimistic UI) biar ga nge-lag
    setAntrean(prev => prev.map(item => {
      if (item.id === id) {
        // Cari maksimal nomor di kategori yang sama
        const maxNomor = Math.max(...prev.filter(i => i.kategori === item.kategori).map(i => i.nomor_sekarang));
        const newNomor = action === 'next' ? maxNomor + 1 : Math.max(0, item.nomor_sekarang - 1);
        return { ...item, nomor_sekarang: newNomor };
      }
      return item;
    }));

    try {
      await fetch(`${API_URL}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      });
      // Sinkronisasikan ulang setelah berhasil simpan
      fetchAntrean();
    } catch (error) {
      console.error("Gagal update data ke database:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5 py-5 fw-bold text-muted">Menghubungkan ke Server Database Antrean...</div>;
  }

  const antreanSudin = antrean.filter(a => a.kategori === 'SUDIN').sort((a, b) => a.id.localeCompare(b.id, undefined, {numeric: true}));
  const antreanDukcapil = antrean.filter(a => a.kategori === 'DUKCAPIL').sort((a, b) => a.id.localeCompare(b.id, undefined, {numeric: true}));

  return (
    <div className="card shadow border-0 rounded-0 bg-white mb-5 p-0 overflow-hidden">
      
      {/* HEADER TV & SAKELAR MODE */}
      <div className="bg-dark text-white d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 border-bottom border-4 border-warning">
        <h2 className="fw-bolder mb-2 mb-md-0 tracking-wider text-uppercase">MONITOR ANTREAN POSKO SPMB</h2>
        
        {/* SAKELAR INI YANG PALING PENTING */}
        <div className="form-check form-switch fs-5 bg-black bg-opacity-25 px-4 py-2 rounded-pill border border-secondary">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="tvModeSwitch" 
            style={{cursor: 'pointer'}}
            checked={isTvMode}
            onChange={toggleTvMode}
          />
          <label className="form-check-label text-warning fw-bold ms-2" htmlFor="tvModeSwitch" style={{cursor: 'pointer'}}>
            🔊 MODE SUARA TV
          </label>
        </div>
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
            <span className="text-muted" style={{fontSize: '0.75rem'}}>Petugas dapat mengakses web ini di HP/Laptop masing-masing dan klik (+) untuk memanggil.</span>
          </div>
        </div>
        
        <div className="row g-4">
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