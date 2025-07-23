import { getRepository } from 'typeorm';
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
                const fileRepo = getRepository(File);
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
            const experienceRepo = getRepository(Experience);
            const categoryRepo = getRepository(Category);
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
            const experienceRepo = getRepository(Experience);
            const experiences = await experienceRepo.find({ relations: ['categories', 'image'] });
            res.json(experiences);
        }
        catch (error) {
            console.error('Get all experiences error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getExperienceById(req, res) {
        try {
            const { id } = req.params;
            const experienceRepo = getRepository(Experience);
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