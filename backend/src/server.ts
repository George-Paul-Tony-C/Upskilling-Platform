import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import learnerRoutes from './routes/learner';
import adminRoutes from './routes/admin';
import { authenticate } from './middleware/authn';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/auth', authRoutes);          // ⬅️ works now

app.use(authenticate);                 // JWT gate
app.use('/learner', learnerRoutes);
app.use('/admin',   adminRoutes);

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => console.log(`🚀 API running on :${PORT}`));
