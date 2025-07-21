import { AppDataSource } from '../config/database.js';
import { Content } from '../entities/Content.js';
export class ContentService {
    constructor() {
        this.contentRepository = AppDataSource.getRepository(Content);
    }
    async createContent(contentData) {
        const content = this.contentRepository.create(contentData);
        return await this.contentRepository.save(content);
    }
    async findContentById(id) {
        return await this.contentRepository.findOne({ where: { id } });
    }
    async findContentByType(type) {
        return await this.contentRepository.find({ where: { type, isActive: true } });
    }
    async updateContent(id, contentData) {
        const content = await this.findContentById(id);
        if (!content)
            return null;
        Object.assign(content, contentData);
        return await this.contentRepository.save(content);
    }
    async deleteContent(id) {
        const result = await this.contentRepository.delete(id);
        return result.affected > 0;
    }
    async getAllContent() {
        return await this.contentRepository.find({ order: { createdAt: 'DESC' } });
    }
    async getActiveContent() {
        return await this.contentRepository.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' }
        });
    }
    async toggleContentStatus(id) {
        const content = await this.findContentById(id);
        if (!content)
            return null;
        content.isActive = !content.isActive;
        return await this.contentRepository.save(content);
    }
    async searchContent(query) {
        return await this.contentRepository
            .createQueryBuilder('content')
            .where('content.title LIKE :query OR content.content LIKE :query', { query: `%${query}%` })
            .andWhere('content.isActive = :isActive', { isActive: true })
            .orderBy('content.createdAt', 'DESC')
            .getMany();
    }
}
//# sourceMappingURL=ContentService.js.map