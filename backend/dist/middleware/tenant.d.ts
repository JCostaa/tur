import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            provider?: any;
            providerId?: number;
        }
    }
}
export declare class TenantMiddleware {
    private providerService;
    constructor();
    identifyProvider(req: Request, res: Response, next: NextFunction): Promise<void>;
    requireProvider(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    filterByProvider(req: Request, res: Response, next: NextFunction): Promise<void>;
    private extractSubdomain;
}
export declare const tenantMiddleware: TenantMiddleware;
//# sourceMappingURL=tenant.d.ts.map