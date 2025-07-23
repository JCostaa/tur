import { Request, Response } from 'express';
export declare class ExperienceController {
    createExperience(req: Request, res: Response): Promise<void>;
    getAllExperiences(req: Request, res: Response): Promise<void>;
    getExperienceById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=ExperienceController.d.ts.map