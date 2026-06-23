import React, { useState, useEffect, useRef } from 'react';

export default function Antrean() {
  const [antrean, setAntrean] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk mengontrol komputer mana yang jadi sumber suara (TV)
  const [isTvMode, setIsTvMode] = useState(false);
  
  // State BARU: Untuk menyimpan ID meja yang dipilih petugas (Disimpan di LocalStorage agar tidak hilang saat di-refresh)
  const [operatorId, setOperatorId] = useState(localStorage.getItem('operatorId') || '');
  
  const isTvModeRef = useRef(false);
  const prevAntreanRef = useRef([]);

  // URL Backend
  const API_URL = 'https://dashboard-zonasi.onrender.com/api/antrean';

  // Simpan operatorId ke LocalStorage tiap kali berubah
  useEffect(() => {
    localStorage.setItem('operatorId', operatorId);
  }, [operatorId]);

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

      if (isTvModeRef.current && prevAntreanRef.current.length > 0) {
        data.forEach(mejaBaru => {
          const mejaLama = prevAntreanRef.current.find(m => m.id === mejaBaru.id);
          
          if (mejaLama && mejaBaru.nomor_sekarang > mejaLama.nomor_sekarang) {
            panggilSuara(mejaBaru.nomor_sekarang, mejaBaru.nama_meja, mejaBaru.kategori);
          }
        });
      }

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
    isTvModeRef.current = checked; 

    if (checked) {
      const dummy = new SpeechSynthesisUtterance('');
      window.speechSynthesis.speak(dummy);
      alert("✅ Mode TV Aktif! Komputer ini akan bersuara dan Panel Admin disembunyikan agar layar lebih rapi.");
    }
  };

  // ==========================================
  // HANDLER TOMBOL OPERATOR (Di PC Petugas)
  // ==========================================
  const handleUpdate = async (id, action) => {
    setAntrean(prev => prev.map(item => {
      if (item.id === id) {
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
    <div className="card shadow border-0 rounded-0 bg-white mb-5 p-0 overflow-hidden d-flex flex-column" style={{ minHeight: '80vh' }}>
      
      {/* HEADER TV & SAKELAR MODE */}
      <div className="bg-dark text-white d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 border-bottom border-4 border-warning">
        <h2 className="fw-bolder mb-2 mb-md-0 tracking-wider text-uppercase">MODEL LAYANAN ANTRIAN POSKO SUDIN JT2</h2>
        
        <div className="form-check form-switch fs-5 bg-black bg-opacity-25 px-4 py-2 rounded-pill border border-secondary d-flex align-items-center">
          <label className="form-check-label text-white small fw-bold me-3" htmlFor="tvModeSwitch" style={{cursor: 'pointer'}}>
            📺 MODE LAYAR TV
          </label>
          <input 
            className="form-check-input shadow-none mt-0 border-0" 
            type="checkbox" 
            id="tvModeSwitch" 
            style={{cursor: 'pointer', boxShadow: 'none', outline: 'none'}}
            checked={isTvMode}
            onChange={toggleTvMode}
          />
        </div>
      </div>
      
      <div className="card-body p-3 p-md-4 bg-light flex-grow-1">
        {/* --- LOKET SUDIN --- */}
        <div className="mb-5">
          <h5 className="fw-bold text-primary mb-3 text-center border-bottom border-primary pb-2 d-inline-block mx-auto">
            LOKET LAYANAN SUDIN 
          </h5>
          <div className="row g-3 justify-content-center">
            {antreanSudin.map((item) => {
              // Highlight jika ini adalah meja milik petugas yang sedang login
              const isMyMeja = item.id === operatorId;
              return (
                <div key={item.id} className="col-4 col-md-2">
                  <div className={`card border-0 shadow-sm rounded-3 h-100 text-center overflow-hidden ${isMyMeja ? 'ring ring-primary ring-offset-2' : ''}`} style={isMyMeja ? { transform: 'scale(1.05)', transition: 'all 0.2s', border: '2px solid #0d6efd' } : {}}>
                    <div className="bg-primary text-white py-1 fw-bold small text-truncate px-1">{item.nama_meja}</div>
                    <div className="card-body py-3 bg-white">
                      <h2 className="fw-bolder text-dark mb-0 font-monospace">
                        {item.nomor_sekarang.toString().padStart(3, '0')}
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- LOKET DUKCAPIL --- */}
        <div className="mb-2 mt-4">
          <h5 className="fw-bold text-success mb-3 text-center border-bottom border-success pb-2 d-inline-block mx-auto">
            LOKET LAYANAN DUKCAPIL
          </h5>
          <div className="row g-3 justify-content-center">
            {antreanDukcapil.map((item) => {
              const isMyMeja = item.id === operatorId;
              return (
                <div key={item.id} className="col-4 col-md-3">
                  <div className={`card shadow-sm rounded-3 h-100 text-center overflow-hidden border-success ${isMyMeja ? 'ring ring-success' : 'border-0'}`} style={isMyMeja ? { transform: 'scale(1.05)', transition: 'all 0.2s', border: '2px solid #198754' } : {}}>
                    <div className="bg-success text-white py-1 fw-bold small text-truncate px-1">{item.nama_meja}</div>
                    <div className="card-body py-4 bg-white">
                      <h1 className="display-6 fw-bolder text-dark mb-0 font-monospace">
                        {item.nomor_sekarang.toString().padStart(3, '0')}
                      </h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- PANEL OPERATOR ADMIN (HANYA MUNCUL JIKA MODE TV MATI) --- */}
      {!isTvMode && (
        <div className="bg-white border-top border-3 p-4 shadow-lg mt-auto">
          <div className="d-flex align-items-center mb-4 border-bottom pb-3">
            <span className="badge bg-danger p-2 me-3 blink" style={{ letterSpacing: '2px' }}>LIVE</span>
            <div>
              <h6 className="fw-bold text-dark mb-0">PANEL OPERATOR KHUSUS PETUGAS</h6>
              <span className="text-muted" style={{fontSize: '0.85rem'}}>Pastikan Anda mengontrol meja yang benar.</span>
            </div>
          </div>
          
          {/* LOGIKA: Jika belum pilih meja, tampilkan Form Dropdown */}
          {!operatorId ? (
            <div className="row justify-content-center my-4">
              <div className="col-md-6 col-lg-4 text-center">
                <div className="p-4 bg-light rounded border border-secondary border-opacity-25">
                  <h6 className="fw-bold text-dark mb-3">Siap Bertugas?</h6>
                  <p className="text-muted small mb-3">Silakan pilih posisi loket meja Anda untuk membuka kunci akses pemanggilan nomor antrean.</p>
                  <select 
                    className="form-select form-select-lg mb-0 fw-bold text-center border-secondary shadow-sm cursor-pointer"
                    value={operatorId}
                    onChange={(e) => setOperatorId(e.target.value)}
                  >
                    <option value="">-- PILIH MEJA & POSKO --</option>
                    <optgroup label="POSKO SUDIN">
                      {antreanSudin.map(m => <option key={m.id} value={m.id}>{m.nama_meja}</option>)}
                    </optgroup>
                    <optgroup label="POSKO DUKCAPIL">
                      {antreanDukcapil.map(m => <option key={m.id} value={m.id}>{m.nama_meja}</option>)}
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            /* LOGIKA: Jika sudah pilih meja, tampilkan Tombol Kontrol HANYA untuk meja tersebut */
            (() => {
              const myMeja = antrean.find(a => a.id === operatorId);
              // Fallback jika id tidak ditemukan
              if (!myMeja) return null; 

              const isSudin = myMeja.kategori === 'SUDIN';
              
              return (
                <div className="row justify-content-center my-2">
                  <div className="col-md-8 col-lg-6">
                    <div className={`d-flex flex-column flex-sm-row align-items-center justify-content-between border rounded p-4 h-100 shadow-sm ${isSudin ? 'bg-primary bg-opacity-10 border-primary' : 'bg-success bg-opacity-10 border-success'}`}>
                      
                      <div className="text-center text-sm-start mb-3 mb-sm-0">
                        <div className={`fw-bold small px-2 py-1 rounded d-inline-block mb-2 text-white ${isSudin ? 'bg-primary' : 'bg-success'}`}>
                          POSKO {myMeja.kategori}
                        </div>
                        <h3 className="fw-bolder mb-0 text-dark text-uppercase">{myMeja.nama_meja}</h3>
                      </div>
                      
                      <div className="d-flex align-items-center">
                        <div className="btn-group btn-group-lg shadow">
                          <button className="btn btn-outline-danger px-4 fw-bold fs-4" title="Koreksi Nomor" onClick={() => handleUpdate(myMeja.id, 'prev')}>-</button>
                          <span className="btn btn-light px-5 fw-bold font-monospace border-top border-bottom text-dark" style={{pointerEvents:'none', fontSize: '1.8rem'}}>
                            {myMeja.nomor_sekarang.toString().padStart(3, '0')}
                          </span>
                          <button className="btn btn-primary px-4 fw-bold fs-5" onClick={() => handleUpdate(myMeja.id, 'next')}>+ PANGGIL</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <button className="btn btn-sm btn-outline-secondary px-3 rounded-pill" onClick={() => setOperatorId('')}>
                        <i className="bi bi-box-arrow-right"></i> Akhiri Tugas / Ganti Meja
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}
      
    </div>
  );
}