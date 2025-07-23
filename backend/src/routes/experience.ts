import { Router } from 'express';
import { ExperienceController } from '../controllers/ExperienceController.js';
import { upload } from '../controllers/FileController.js';

const router = Router();
const experienceController = new ExperienceController();

// Criar experiência (com upload de imagem)
router.post('/', upload.single('image'), experienceController.createExperience.bind(experienceController));

// Listar todas experiências
router.get('/', experienceController.getAllExperiences.bind(experienceController));

// Obter experiência por id
router.get('/:id', experienceController.getExperienceById.bind(experienceController));

export default router; 