import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database.js';
import { Content } from '../entities/Content.js';

export class ContentService {
  private contentRepository: Repository<Content>;

  constructor() {
    this.contentRepository = AppDataSource.getRepository(Content);
  }

  async createContent(contentData: Partial<Content>): Promise<Content> {
    const content = this.contentRepository.create(contentData);
    return await this.contentRepository.save(content);
  }

  async findContentById(id: number): Promise<Content | null> {
    return await this.contentRepository.findOne({ where: { id } });
  }

  async findContentByType(type: string): Promise<Content[]> {
    return await this.contentRepository.find({ where: { type, isActive: true } });
  }

  async updateContent(id: number, contentData: Partial<Content>): Promise<Content | null> {
    const content = await this.findContentById(id);
    if (!content) return null;

    Object.assign(content, contentData);
    return await this.contentRepository.save(content);
  }

  async deleteContent(id: number): Promise<boolean> {
    const result = await this.contentRepository.delete(id);
    return result.affected! > 0;
  }

  async getAllContent(): Promise<Content[]> {
    return await this.contentRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getActiveContent(): Promise<Content[]> {
    return await this.contentRepository.find({ 
      where: { isActive: true },
      order: { createdAt: 'DESC' }
    });
  }

  async toggleContentStatus(id: number): Promise<Content | null> {
    const content = await this.findContentById(id);
    if (!content) return null;

    content.isActive = !content.isActive;
    return await this.contentRepository.save(content);
  }

  async searchContent(query: string): Promise<Content[]> {
    return await this.contentRepository
      .createQueryBuilder('content')
      .where('content.title LIKE :query OR content.content LIKE :query', { query: `%${query}%` })
      .andWhere('content.isActive = :isActive', { isActive: true })
      .orderBy('content.createdAt', 'DESC')
      .getMany();
  }
} 