import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.js';
export declare const superAdminMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export declare const providerAdminMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
//# sourceMappingURL=superAdmin.d.ts.map