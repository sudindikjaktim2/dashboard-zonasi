const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// UPDATE BAGIAN CORS INI:
// Hanya izinkan website frontend kamu yang bisa mengakses/merubah antrean
app.use(cors({
  origin: '',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Ganti string ini dengan Connection String dari Neon Tech kamu
const pool = new Pool({
  connectionString: ''
});

// Endpoint untuk MENGAMBIL semua data antrean
app.get('/api/antrean', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM antrean_posko ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data antrean' });
  }
});

// Endpoint untuk MENGUPDATE (Tambah/Kurang) nomor antrean
// Endpoint untuk MENGUPDATE nomor antrean (Sistem Shared Queue)
app.post('/api/antrean/update', async (req, res) => {
  const { id, action } = req.body; 

  try {
    if (action === 'next') {
      // Cari nilai tertinggi di kategori yang sama, lalu +1 untuk meja yang memanggil
      const query = `
        WITH target_kat AS (SELECT kategori FROM antrean_posko WHERE id = $1),
             max_val AS (SELECT COALESCE(MAX(nomor_sekarang), 0) AS max_num FROM antrean_posko WHERE kategori = (SELECT kategori FROM target_kat))
        UPDATE antrean_posko
        SET nomor_sekarang = (SELECT max_num FROM max_val) + 1
        WHERE id = $1
        RETURNING *;
      `;
      const result = await pool.query(query, [id]);
      res.json(result.rows[0]);
    } else if (action === 'prev') {
      // Tombol Minus (-) hanya mengoreksi/mengurangi nomor di meja itu saja
      const query = `
        UPDATE antrean_posko
        SET nomor_sekarang = GREATEST(0, nomor_sekarang - 1)
        WHERE id = $1
        RETURNING *;
      `;
      const result = await pool.query(query, [id]);
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengupdate antrean.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend Antrean berjalan di port ${PORT}`);
});
