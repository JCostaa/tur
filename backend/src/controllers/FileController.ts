import { Request, Response } from 'express';
import { FileService } from '../services/FileService.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

export class FileController {
  private fileService: FileService;

  constructor() {
    this.fileService = new FileService();
  }

  async getAllFiles(req: Request, res: Response) {
    try {
      const files = await this.fileService.getAllFiles();
      res.json(files);
    } catch (error) {
      console.error('Get all files error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getFileById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const file = await this.fileService.findFileById(parseInt(id));
      
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
      
      res.json(file);
    } catch (error) {
      console.error('Get file by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getFilesByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const files = await this.fileService.getFilesByUser(parseInt(userId));
      res.json(files);
    } catch (error) {
      console.error('Get files by user error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getFilesByMimeType(req: Request, res: Response) {
    try {
      const { mimeType } = req.params;
      const files = await this.fileService.getFilesByMimeType(mimeType);
      res.json(files);
    } catch (error) {
      console.error('Get files by MIME type error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async uploadFile(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        uploadedById: (req as any).user?.id
      };

      const file = await this.fileService.createFile(fileData);
      res.status(201).json(file);
    } catch (error) {
      console.error('Upload file error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateFile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const file = await this.fileService.updateFile(parseInt(id), req.body);
      
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
      
      res.json(file);
    } catch (error) {
      console.error('Update file error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteFile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.fileService.deleteFile(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: 'File not found' });
      }
      
      res.json({ message: 'File deleted successfully' });
    } catch (error) {
      console.error('Delete file error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async searchFiles(req: Request, res: Response) {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: 'Search query is required' });
      }
      
      const files = await this.fileService.searchFiles(q);
      res.json(files);
    } catch (error) {
      console.error('Search files error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getFileStats(req: Request, res: Response) {
    try {
      const stats = await this.fileService.getFileStats();
      res.json(stats);
    } catch (error) {
      console.error('Get file stats error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async downloadFile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const file = await this.fileService.findFileById(parseInt(id));
      
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }

      const filePath = path.join(process.cwd(), 'uploads', file.filename);
      
      // Check if file exists
      try {
        await fs.access(filePath);
      } catch {
        return res.status(404).json({ error: 'File not found on disk' });
      }

      res.download(filePath, file.originalName);
    } catch (error) {
      console.error('Download file error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

// Multer configuration for file uploads
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images, documents, and common file types
    const allowedMimes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain', 'text/csv'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
}); 