import React, { useState, useEffect } from 'react';

export default function Antrean() {
  const [antrean, setAntrean] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sesuaikan URL ini dengan port backend Node.js kamu
  const API_URL = 'http://localhost:5000/api/antrean';

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

  useEffect(() => {
    fetchAntrean();
    const interval = setInterval(fetchAntrean, 3000); 
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async (id, action) => {
    // Optimistic UI Update
    setAntrean(prev => prev.map(item => {
      if (item.id === id) {
        const newNomor = action === 'next' ? item.nomor_sekarang + 1 : Math.max(0, item.nomor_sekarang - 1);
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
      console.error("Gagal update data:", error);
      fetchAntrean();
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5 py-5 fw-bold text-muted">Menghubungkan ke Server Database Antrean...</div>;
  }

  const antreanSudin = antrean.filter(a => a.kategori === 'SUDIN');
  const antreanDukcapil = antrean.filter(a => a.kategori === 'DUKCAPIL');

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
                  <div className="bg-primary text-white py-1 fw-bold small">{item.nama_meja}</div>
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
        <div className="mb-2">
          <h5 className="fw-bold text-success mb-3 text-center border-bottom border-success pb-2 d-inline-block mx-auto">
            LOKET LAYANAN DUKCAPIL 
          </h5>
          <div className="row g-3 justify-content-center">
            {antreanDukcapil.map((item) => (
              <div key={item.id} className="col-4 col-md-3">
                <div className="card border-0 shadow-sm rounded-3 h-100 text-center overflow-hidden border-success">
                  <div className="bg-success text-white py-1 fw-bold small">{item.nama_meja}</div>
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
        <div className="d-flex align-items-center mb-3">
          <span className="badge bg-danger p-2 me-2 blink">LIVE</span>
          <h6 className="fw-bold text-dark mb-0">PANEL OPERATOR (Klik untuk panggil nomor)</h6>
        </div>
        
        <div className="row g-4">
          {/* Kontrol Sudin */}
          <div className="col-md-8 border-end">
            <div className="text-primary fw-bold small mb-2">KONTROL MEJA SUDIN</div>
            <div className="row g-2">
              {antreanSudin.map(item => (
                <div key={`op-${item.id}`} className="col-6 col-lg-4">
                  <div className="d-flex align-items-center justify-content-between border rounded p-1 bg-light">
                    <span className="fw-bold ms-2 small text-secondary">{item.nama_meja}</span>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-danger px-2 fw-bold" onClick={() => handleUpdate(item.id, 'prev')}>-</button>
                      <span className="btn btn-sm btn-light px-2 fw-bold font-monospace border-top border-bottom" style={{pointerEvents:'none'}}>{item.nomor_sekarang}</span>
                      <button className="btn btn-sm btn-primary px-2 fw-bold" onClick={() => handleUpdate(item.id, 'next')}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Kontrol Dukcapil */}
          <div className="col-md-4">
            <div className="text-success fw-bold small mb-2">KONTROL MEJA DUKCAPIL</div>
            <div className="row g-2">
              {antreanDukcapil.map(item => (
                <div key={`op-${item.id}`} className="col-12">
                  <div className="d-flex align-items-center justify-content-between border border-success rounded p-1 bg-success bg-opacity-10">
                    <span className="fw-bold ms-2 small text-success">{item.nama_meja}</span>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-danger px-2 fw-bold" onClick={() => handleUpdate(item.id, 'prev')}>-</button>
                      <span className="btn btn-sm btn-light px-3 fw-bold font-monospace border-top border-bottom" style={{pointerEvents:'none'}}>{item.nomor_sekarang}</span>
                      <button className="btn btn-sm btn-success px-3 fw-bold" onClick={() => handleUpdate(item.id, 'next')}>+</button>
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