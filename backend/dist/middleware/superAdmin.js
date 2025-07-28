export const superAdminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    // Check if user is super admin (provider_id = 1 or role = 'super_admin')
    // Also allow users with provider_id = 1 as legacy support
    if (req.user.role !== 'super_admin' && req.user.provider_id !== 1) {
        return res.status(403).json({ error: 'Super admin access required' });
    }
    next();
};
export const providerAdminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    // Check if user is admin or super admin
    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};
//# sourceMappingURL=superAdmin.js.map