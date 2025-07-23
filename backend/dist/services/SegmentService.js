import { AppDataSource } from '../config/database.js';
import { Segment } from '../entities/Segment.js';
import { Like } from 'typeorm';
export class SegmentService {
    constructor() {
        this.segmentRepository = AppDataSource.getRepository(Segment);
    }
    async getAllSegments() {
        return await this.segmentRepository.find({
            order: { orderIndex: 'ASC', createdAt: 'DESC' },
            relations: ['image']
        });
    }
    async getActiveSegments() {
        return await this.segmentRepository.find({
            where: { isActive: true },
            order: { orderIndex: 'ASC', createdAt: 'DESC' },
            relations: ['image']
        });
    }
    async findSegmentById(id) {
        return await this.segmentRepository.findOne({
            where: { id },
            relations: ['image']
        });
    }
    async createSegment(segmentData) {
        const segment = this.segmentRepository.create(segmentData);
        return await this.segmentRepository.save(segment);
    }
    async updateSegment(id, segmentData) {
        const segment = await this.segmentRepository.findOne({ where: { id } });
        if (!segment) {
            return null;
        }
        Object.assign(segment, segmentData);
        return await this.segmentRepository.save(segment);
    }
    async deleteSegment(id) {
        const segment = await this.segmentRepository.findOne({ where: { id } });
        if (!segment) {
            return false;
        }
        await this.segmentRepository.remove(segment);
        return true;
    }
    async toggleSegmentStatus(id) {
        const segment = await this.segmentRepository.findOne({ where: { id } });
        if (!segment) {
            return null;
        }
        segment.isActive = !segment.isActive;
        return await this.segmentRepository.save(segment);
    }
    async reorderSegments(segmentOrders) {
        const segments = [];
        for (const order of segmentOrders) {
            const segment = await this.segmentRepository.findOne({ where: { id: order.id } });
            if (segment) {
                segment.orderIndex = order.orderIndex;
                segments.push(await this.segmentRepository.save(segment));
            }
        }
        return segments;
    }
    async searchSegments(query) {
        return await this.segmentRepository.find({
            where: [
                { title: Like(`%${query}%`) },
                { description: Like(`%${query}%`) }
            ],
            order: { orderIndex: 'ASC', createdAt: 'DESC' },
            relations: ['image']
        });
    }
}
//# sourceMappingURL=SegmentService.js.map