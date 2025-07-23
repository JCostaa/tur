import { Request, Response } from 'express';
export declare class AuthController {
    private userService;
    constructor();
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    validateToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static validateLogin(): import("express-validator").ValidationChain[];
    static validateRegister(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=AuthController.d.ts.map