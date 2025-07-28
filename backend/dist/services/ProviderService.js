import { AppDataSource } from '../config/database.js';
import { Provider } from '../entities/Provider.js';
import { User } from '../entities/User.js';
import { Banner } from '../entities/Banner.js';
import { Category } from '../entities/Category.js';
import { Content } from '../entities/Content.js';
import { Experience } from '../entities/Experience.js';
import { File } from '../entities/File.js';
import { Menu } from '../entities/Menu.js';
import { Segment } from '../entities/Segment.js';
import { Setting } from '../entities/Setting.js';
export class ProviderService {
    constructor() {
        this.providerRepository = AppDataSource.getRepository(Provider);
        this.userRepository = AppDataSource.getRepository(User);
        this.bannerRepository = AppDataSource.getRepository(Banner);
        this.categoryRepository = AppDataSource.getRepository(Category);
        this.contentRepository = AppDataSource.getRepository(Content);
        this.experienceRepository = AppDataSource.getRepository(Experience);
        this.fileRepository = AppDataSource.getRepository(File);
        this.menuRepository = AppDataSource.getRepository(Menu);
        this.segmentRepository = AppDataSource.getRepository(Segment);
        this.settingRepository = AppDataSource.getRepository(Setting);
    }
    async getAllProviders() {
        return await this.providerRepository.find({
            order: { createdAt: 'DESC' }
        });
    }
    async getProviderById(id) {
        return await this.providerRepository.findOne({
            where: { id }
        });
    }
    async getProviderBySlug(slug) {
        return await this.providerRepository.findOne({
            where: { slug }
        });
    }
    async createProvider(data) {
        const provider = this.providerRepository.create(data);
        return await this.providerRepository.save(provider);
    }
    async updateProvider(id, data) {
        await this.providerRepository.update(id, data);
        return await this.getProviderById(id);
    }
    async deleteProvider(id) {
        // Check if provider has any data
        const userCount = await this.userRepository.count({ where: { provider_id: id } });
        const bannerCount = await this.bannerRepository.count({ where: { provider_id: id } });
        const categoryCount = await this.categoryRepository.count({ where: { provider_id: id } });
        const contentCount = await this.contentRepository.count({ where: { provider_id: id } });
        const experienceCount = await this.experienceRepository.count({ where: { provider_id: id } });
        const fileCount = await this.fileRepository.count({ where: { provider_id: id } });
        const menuCount = await this.menuRepository.count({ where: { provider_id: id } });
        const segmentCount = await this.segmentRepository.count({ where: { provider_id: id } });
        const settingCount = await this.settingRepository.count({ where: { provider_id: id } });
        if (userCount > 0 || bannerCount > 0 || categoryCount > 0 || contentCount > 0 ||
            experienceCount > 0 || fileCount > 0 || menuCount > 0 || segmentCount > 0 || settingCount > 0) {
            throw new Error('Cannot delete provider with existing data. Please delete all associated data first.');
        }
        await this.providerRepository.delete(id);
    }
    async getProviderStats(id) {
        const [userCount, bannerCount, categoryCount, contentCount, experienceCount, fileCount, menuCount, segmentCount, settingCount] = await Promise.all([
            this.userRepository.count({ where: { provider_id: id } }),
            this.bannerRepository.count({ where: { provider_id: id } }),
            this.categoryRepository.count({ where: { provider_id: id } }),
            this.contentRepository.count({ where: { provider_id: id } }),
            this.experienceRepository.count({ where: { provider_id: id } }),
            this.fileRepository.count({ where: { provider_id: id } }),
            this.menuRepository.count({ where: { provider_id: id } }),
            this.segmentRepository.count({ where: { provider_id: id } }),
            this.settingRepository.count({ where: { provider_id: id } })
        ]);
        return {
            users: userCount,
            banners: bannerCount,
            categories: categoryCount,
            content: contentCount,
            experiences: experienceCount,
            files: fileCount,
            menuItems: menuCount,
            segments: segmentCount,
            settings: settingCount,
            total: userCount + bannerCount + categoryCount + contentCount +
                experienceCount + fileCount + menuCount + segmentCount + settingCount
        };
    }
    async getProviderByDomain(domain) {
        // This method can be extended to support custom domains
        // For now, we'll use a simple mapping or slug-based approach
        const slug = domain.replace(/\./g, '-').toLowerCase();
        return await this.getProviderBySlug(slug);
    }
    async createProviderWithDefaultData(data) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Create provider
            const provider = this.providerRepository.create(data);
            const savedProvider = await queryRunner.manager.save(Provider, provider);
            // Create default admin user
            const bcrypt = await import('bcryptjs');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const defaultUser = this.userRepository.create({
                username: 'admin',
                email: `admin@${data.slug}.com`,
                password: hashedPassword,
                role: 'admin',
                provider_id: savedProvider.id
            });
            await queryRunner.manager.save(User, defaultUser);
            // Create default settings
            const defaultSettings = [
                { key: 'site_title', value: `${data.name} - Sistema Tur`, type: 'string', provider_id: savedProvider.id },
                { key: 'site_description', value: `Descubra as maravilhas de ${data.name}`, type: 'string', provider_id: savedProvider.id },
                { key: 'primary_color', value: '#ff6b35', type: 'color', provider_id: savedProvider.id },
                { key: 'secondary_color', value: '#2c5f2d', type: 'color', provider_id: savedProvider.id },
                { key: 'logo_url', value: '/images/logo.png', type: 'string', provider_id: savedProvider.id },
                { key: 'contact_email', value: `contato@${data.slug}.com`, type: 'string', provider_id: savedProvider.id },
                { key: 'contact_phone', value: '+55 65 99999-9999', type: 'string', provider_id: savedProvider.id },
                { key: 'social_facebook', value: '', type: 'string', provider_id: savedProvider.id },
                { key: 'social_instagram', value: '', type: 'string', provider_id: savedProvider.id },
                { key: 'social_youtube', value: '', type: 'string', provider_id: savedProvider.id }
            ];
            for (const setting of defaultSettings) {
                const settingEntity = this.settingRepository.create(setting);
                await queryRunner.manager.save(Setting, settingEntity);
            }
            // Create default menu items
            const defaultMenuItems = [
                { name: 'Home', url: '/', orderIndex: 1, provider_id: savedProvider.id },
                { name: 'Destinos', url: '/destinos', orderIndex: 2, provider_id: savedProvider.id },
                { name: 'Pacotes', url: '/pacotes', orderIndex: 3, provider_id: savedProvider.id },
                { name: 'Sobre', url: '/sobre', orderIndex: 4, provider_id: savedProvider.id },
                { name: 'Contato', url: '/contato', orderIndex: 5, provider_id: savedProvider.id }
            ];
            for (const menuItem of defaultMenuItems) {
                const menuEntity = this.menuRepository.create(menuItem);
                await queryRunner.manager.save(Menu, menuEntity);
            }
            await queryRunner.commitTransaction();
            return savedProvider;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
}
//# sourceMappingURL=ProviderService.js.map