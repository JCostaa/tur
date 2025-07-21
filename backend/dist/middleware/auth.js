import { UserService } from '../services/UserService.js';
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const userService = new UserService();
        const user = await userService.validateToken(token);
        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};
export const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};
export const optionalAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token) {
            const userService = new UserService();
            const user = await userService.validateToken(token);
            if (user) {
                req.user = user;
            }
        }
        next();
    }
    catch (error) {
        // Continue without authentication
        next();
    }
};
//# sourceMappingURL=auth.js.map