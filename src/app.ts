import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes';

dotenv.config(); //why we need this line? check

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


