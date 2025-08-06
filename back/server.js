import express from 'express';
import pool from './config/db.js'
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';

const app = express();
const port = 3000

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query("SHOW TABLES");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/categories',categoryRouter)

app.listen(port, () => {
  console.log(`serveur demarré sur http://localhost:${port}`);
});
