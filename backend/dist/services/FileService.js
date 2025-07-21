import { AppDataSource } from '../config/database.js';
import fs from 'fs/promises';
import path from 'path';
export class FileService {
    constructor() {
        this.initializeRepositories();
    }
    async initializeRepositories() {
        const { File } = await import('../entities/File.js');
        const { User } = await import('../entities/User.js');
        this.fileRepository = AppDataSource.getRepository(File);
        this.userRepository = AppDataSource.getRepository(User);
    }
    async createFile(fileData) {
        await this.initializeRepositories();
        const file = this.fileRepository.create(fileData);
        return await this.fileRepository.save(file);
    }
    async findFileById(id) {
        await this.initializeRepositories();
        return await this.fileRepository.findOne({
            where: { id }
        });
    }
    async findFileByFilename(filename) {
        await this.initializeRepositories();
        return await this.fileRepository.findOne({ where: { filename } });
    }
    async updateFile(id, fileData) {
        await this.initializeRepositories();
        const file = await this.findFileById(id);
        if (!file)
            return null;
        Object.assign(file, fileData);
        return await this.fileRepository.save(file);
    }
    async deleteFile(id) {
        await this.initializeRepositories();
        const file = await this.findFileById(id);
        if (!file)
            return false;
        try {
            // Delete physical file
            const filePath = path.join(process.cwd(), 'uploads', file.filename);
            await fs.unlink(filePath);
            // Delete database record
            const result = await this.fileRepository.delete(id);
            return result.affected > 0;
        }
        catch (error) {
            console.error('Error deleting file:', error);
            return false;
        }
    }
    async getAllFiles() {
        await this.initializeRepositories();
        return await this.fileRepository.find({
            order: { createdAt: 'DESC' }
        });
    }
    async getFilesByUser(userId) {
        await this.initializeRepositories();
        return await this.fileRepository.find({
            where: { uploadedById: userId },
            order: { createdAt: 'DESC' }
        });
    }
    async getFilesByMimeType(mimeType) {
        await this.initializeRepositories();
        return await this.fileRepository.find({
            where: { mimeType },
            order: { createdAt: 'DESC' }
        });
    }
    async searchFiles(query) {
        await this.initializeRepositories();
        return await this.fileRepository
            .createQueryBuilder('file')
            .where('file.originalName LIKE :query OR file.filename LIKE :query', { query: `%${query}%` })
            .orderBy('file.createdAt', 'DESC')
            .getMany();
    }
    async getFileStats() {
        await this.initializeRepositories();
        const files = await this.getAllFiles();
        const totalSize = files.reduce((sum, file) => sum + file.size, 0);
        const byType = {};
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
//# sourceMappingURL=FileService.js.map