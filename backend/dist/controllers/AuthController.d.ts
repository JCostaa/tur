import { Request, Response } from 'express';
export declare class AuthController {
    private userService;
    constructor();
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    validateToken(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static validateLogin(): import("express-validator").ValidationChain[];
    static validateRegister(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=AuthController.d.ts.map