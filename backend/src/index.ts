import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import menuRoutes from './routes/menu.js';
import settingsRoutes from './routes/settings.js';
import uploadRoutes from './routes/upload.js';
import bannerRoutes from './routes/banner.js';
import segmentRoutes from './routes/segment.js';
import experienceRoutes from './routes/experience.js';
import categoryRoutes from './routes/category.js';

// Import database configuration
import { initializeDatabase } from './config/database.js';

// Import middleware
import { authMiddleware, adminMiddleware } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "http:", "https:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      scriptSrc: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:5173'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  setHeaders: (res, path) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}));

// Public routes (no authentication required)
app.use('/api/auth', authRoutes);

// Protected routes (authentication required)
app.use('/api/content', authMiddleware, contentRoutes);
app.use('/api/menu', authMiddleware, menuRoutes);
app.use('/api/settings', authMiddleware, settingsRoutes);
app.use('/api/upload', authMiddleware, uploadRoutes);
app.use('/api/banners', authMiddleware, bannerRoutes);
app.use('/api/segments', authMiddleware, segmentRoutes);
app.use('/api/experiences', authMiddleware, experienceRoutes);
app.use('/api/categories', authMiddleware, categoryRoutes);

// Admin routes (admin role required)
app.use('/api/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Admin access granted' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    console.log('Database initialized successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 