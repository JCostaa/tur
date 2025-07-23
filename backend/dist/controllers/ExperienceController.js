import { AppDataSource } from '../config/database.js';
import { Experience } from '../entities/Experience.js';
import { Category } from '../entities/Category.js';
import { File } from '../entities/File.js';
export class ExperienceController {
    async createExperience(req, res) {
        try {
            const { title, subtitle, description, categoryIds } = req.body;
            let imageId = undefined;
            // Se houver upload de imagem, salvar arquivo e criar registro em File
            if (req.file) {
                const fileRepo = AppDataSource.getRepository(File);
                const file = fileRepo.create({
                    filename: req.file.filename,
                    originalName: req.file.originalname,
                    mimeType: req.file.mimetype,
                    size: req.file.size,
                    path: req.file.path,
                });
                const savedFile = await fileRepo.save(file);
                imageId = savedFile.id;
            }
            const experienceRepo = AppDataSource.getRepository(Experience);
            const categoryRepo = AppDataSource.getRepository(Category);
            // Buscar categorias
            let categories = [];
            if (categoryIds && Array.isArray(categoryIds)) {
                categories = await categoryRepo.findByIds(categoryIds);
            }
            const experience = experienceRepo.create({
                title,
                subtitle,
                description,
                imageId,
                categories,
            });
            const savedExperience = await experienceRepo.save(experience);
            res.status(201).json(savedExperience);
        }
        catch (error) {
            console.error('Create experience error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getAllExperiences(req, res) {
        try {
            const experienceRepo = AppDataSource.getRepository(Experience);
            const experiences = await experienceRepo.find({ relations: ['categories', 'image'] });
            const BASE_URL = process.env.BASE_URL || 'http://localhost:5001/';
            const result = await Promise.all(experiences.map(async (exp) => {
                const image = exp.image ? await exp.image : null;
                return {
                    id: exp.id,
                    title: exp.title,
                    subtitle: exp.subtitle,
                    description: exp.description,
                    imageId: exp.imageId,
                    createdAt: exp.createdAt,
                    updatedAt: exp.updatedAt,
                    image: image
                        ? {
                            ...image,
                            url: image.path.startsWith('http') ? image.path : BASE_URL + (image.path.startsWith('/') ? image.path.slice(1) : image.path),
                        }
                        : null,
                    categories: exp.categories ? await exp.categories : [],
                };
            }));
            res.json(result);
        }
        catch (error) {
            console.error('Get all experiences error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getExperienceById(req, res) {
        try {
            const { id } = req.params;
            const experienceRepo = AppDataSource.getRepository(Experience);
            const experience = await experienceRepo.findOne({ where: { id: Number(id) }, relations: ['categories', 'image'] });
            if (!experience) {
                return res.status(404).json({ error: 'Experience not found' });
            }
            res.json(experience);
        }
        catch (error) {
            console.error('Get experience by id error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
//# sourceMappingURL=ExperienceController.js.map