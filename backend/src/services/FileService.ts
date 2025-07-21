import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database.js';
import fs from 'fs/promises';
import path from 'path';

export class FileService {
  private fileRepository!: Repository<any>;
  private userRepository!: Repository<any>;

  constructor() {
    this.initializeRepositories();
  }

  private async initializeRepositories() {
    const { File } = await import('../entities/File.js');
    const { User } = await import('../entities/User.js');
    this.fileRepository = AppDataSource.getRepository(File);
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createFile(fileData: Partial<any>): Promise<any> {
    await this.initializeRepositories();
    const file = this.fileRepository.create(fileData);
    return await this.fileRepository.save(file);
  }

  async findFileById(id: number): Promise<any | null> {
    await this.initializeRepositories();
    return await this.fileRepository.findOne({ 
      where: { id }
    });
  }

  async findFileByFilename(filename: string): Promise<any | null> {
    await this.initializeRepositories();
    return await this.fileRepository.findOne({ where: { filename } });
  }

  async updateFile(id: number, fileData: Partial<any>): Promise<any | null> {
    await this.initializeRepositories();
    const file = await this.findFileById(id);
    if (!file) return null;

    Object.assign(file, fileData);
    return await this.fileRepository.save(file);
  }

  async deleteFile(id: number): Promise<boolean> {
    await this.initializeRepositories();
    const file = await this.findFileById(id);
    if (!file) return false;

    try {
      // Delete physical file
      const filePath = path.join(process.cwd(), 'uploads', file.filename);
      await fs.unlink(filePath);
      
      // Delete database record
      const result = await this.fileRepository.delete(id);
      return result.affected! > 0;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  async getAllFiles(): Promise<any[]> {
    await this.initializeRepositories();
    return await this.fileRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async getFilesByUser(userId: number): Promise<any[]> {
    await this.initializeRepositories();
    return await this.fileRepository.find({
      where: { uploadedById: userId },
      order: { createdAt: 'DESC' }
    });
  }

  async getFilesByMimeType(mimeType: string): Promise<any[]> {
    await this.initializeRepositories();
    return await this.fileRepository.find({
      where: { mimeType },
      order: { createdAt: 'DESC' }
    });
  }

  async searchFiles(query: string): Promise<any[]> {
    await this.initializeRepositories();
    return await this.fileRepository
      .createQueryBuilder('file')
      .where('file.originalName LIKE :query OR file.filename LIKE :query', { query: `%${query}%` })
      .orderBy('file.createdAt', 'DESC')
      .getMany();
  }

  async getFileStats(): Promise<{ totalFiles: number; totalSize: number; byType: Record<string, number> }> {
    await this.initializeRepositories();
    const files = await this.getAllFiles();
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    
    const byType: Record<string, number> = {};
    files.forEach(file => {
      const type = file.mimeType.split('/')[0];
      byType[type] = (byType[type] || 0) + 1;
    });

    return {
      totalFiles: files.length,
      totalSize,
      byType
    };
  }
} 