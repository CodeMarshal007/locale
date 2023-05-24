
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connect, ConnectOptions } from 'mongoose';

import authRoutes from './routes/authRoutes';
import regionRoutes from './routes/regionRoutes';
import stateRoutes from './routes/stateRoutes';
import lgaRoutes from './routes/lgaRoutes';
import authMiddleware from './middlewares/authMiddleware';

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Authentication routes
app.use('/api/auth', authRoutes);

// Authentication middleware
app.use(authMiddleware);

// API routes
app.use('/api/regions', regionRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/lgas', lgaRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Connect to MongoDB
connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
