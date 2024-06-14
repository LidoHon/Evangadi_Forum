import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const port = process.env.PORT || 8000;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);

app.get('/', (req, res) => {
	res.send('server is ready');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
