import { AppDataSource } from '../config/database.js';
import { Banner } from '../entities/Banner.js';
export class BannerService {
    constructor() {
        this.bannerRepository = AppDataSource.getRepository(Banner);
    }
    async createBanner(bannerData) {
        // Se não foi especificada uma ordem, coloca no final
        if (bannerData.orderIndex === undefined) {
            const lastBanner = await this.bannerRepository.findOne({
                order: { orderIndex: 'DESC' }
            });
            bannerData.orderIndex = lastBanner ? lastBanner.orderIndex + 1 : 0;
        }
        const banner = this.bannerRepository.create(bannerData);
        return await this.bannerRepository.save(banner);
    }
    async findBannerById(id) {
        const banner = await this.bannerRepository.findOne({
            where: { id },
            relations: ['image']
        });
        if (banner) {
            const imageData = banner.__image__ || banner.image;
            return {
                ...banner,
                image: imageData && imageData.filename ? {
                    ...imageData,
                    url: `/uploads/${imageData.filename}`
                } : null
            };
        }
        return null;
    }
    async updateBanner(id, bannerData) {
        // Update imageId separately if provided
        if (bannerData.imageId !== undefined) {
            await this.bannerRepository.update(id, { imageId: bannerData.imageId });
        }
        const banner = await this.bannerRepository.findOne({
            where: { id },
            relations: ['image']
        });
        if (!banner)
            return null;
        // Update other fields
        const { imageId, ...otherData } = bannerData;
        Object.assign(banner, otherData);
        await this.bannerRepository.save(banner);
        // Reload with relations to get updated image
        return await this.findBannerById(id);
    }
    async deleteBanner(id) {
        const result = await this.bannerRepository.delete(id);
        return result.affected > 0;
    }
    async getAllBanners() {
        const banners = await this.bannerRepository.find({
            relations: ['image'],
            order: { orderIndex: 'ASC', createdAt: 'DESC' }
        });
        return banners.map(banner => {
            const imageData = banner.__image__ || banner.image;
            return {
                ...banner,
                image: imageData && imageData.filename ? {
                    ...imageData,
                    url: `/uploads/${imageData.filename}`
                } : null
            };
        });
    }
    async getActiveBanners() {
        const banners = await this.bannerRepository.find({
            where: { isActive: true },
            relations: ['image'],
            order: { orderIndex: 'ASC' }
        });
        return banners.map(banner => {
            const imageData = banner.__image__ || banner.image;
            return {
                ...banner,
                image: imageData && imageData.filename ? {
                    ...imageData,
                    url: `/uploads/${imageData.filename}`
                } : null
            };
        });
    }
    async toggleBannerStatus(id) {
        const banner = await this.findBannerById(id);
        if (!banner)
            return null;
        banner.isActive = !banner.isActive;
        return await this.bannerRepository.save(banner);
    }
    async reorderBanners(bannerOrders) {
        const banners = [];
        for (const orderData of bannerOrders) {
            const banner = await this.findBannerById(orderData.id);
            if (banner) {
                banner.orderIndex = orderData.orderIndex;
                banners.push(await this.bannerRepository.save(banner));
            }
        }
        return banners;
    }
    async searchBanners(query) {
        return await this.bannerRepository
            .createQueryBuilder('banner')
            .leftJoinAndSelect('banner.image', 'image')
            .where('banner.title LIKE :query OR banner.description LIKE :query', { query: `%${query}%` })
            .andWhere('banner.isActive = :isActive', { isActive: true })
            .orderBy('banner.orderIndex', 'ASC')
            .getMany();
    }
    async getBannersByType(type) {
        const queryBuilder = this.bannerRepository
            .createQueryBuilder('banner')
            .leftJoinAndSelect('banner.image', 'image')
            .where('banner.isActive = :isActive', { isActive: true })
            .orderBy('banner.orderIndex', 'ASC');
        if (type) {
            queryBuilder.andWhere('banner.type = :type', { type });
        }
        return await queryBuilder.getMany();
    }
}
//# sourceMappingURL=BannerService.js.map