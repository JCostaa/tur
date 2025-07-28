export const saasConfig = {
    defaultProviderId: 1,
    defaultProviderSlug: 'viva-barra-do-borges',
    customDomainsEnabled: true,
    subdomainEnabled: true,
    maxUsersPerProvider: 100,
    maxFilesPerProvider: 1000,
    maxStoragePerProvider: 1024, // 1GB
    features: {
        customDomain: true,
        analytics: true,
        backup: true,
        apiAccess: true,
        whiteLabel: true,
    },
    plans: {
        free: {
            name: 'Free',
            price: 0,
            maxUsers: 1,
            maxFiles: 50,
            maxStorage: 100, // 100MB
            features: ['Basic CMS', '5 pages', 'Basic support'],
        },
        basic: {
            name: 'Basic',
            price: 29,
            maxUsers: 5,
            maxFiles: 200,
            maxStorage: 500, // 500MB
            features: ['Full CMS', 'Unlimited pages', 'Email support', 'Custom domain'],
        },
        pro: {
            name: 'Professional',
            price: 99,
            maxUsers: 25,
            maxFiles: 1000,
            maxStorage: 2048, // 2GB
            features: ['Everything in Basic', 'Analytics', 'API access', 'Priority support', 'White label'],
        },
        enterprise: {
            name: 'Enterprise',
            price: 299,
            maxUsers: 100,
            maxFiles: 5000,
            maxStorage: 10240, // 10GB
            features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
        },
    },
};
export const getProviderPlan = (providerId) => {
    // This would typically be stored in the database
    // For now, return 'pro' as default
    return 'pro';
};
export const checkProviderLimits = async (providerId, type, currentCount) => {
    const plan = getProviderPlan(providerId);
    const planConfig = saasConfig.plans[plan];
    switch (type) {
        case 'users':
            return currentCount < planConfig.maxUsers;
        case 'files':
            return currentCount < planConfig.maxFiles;
        case 'storage':
            return currentCount < planConfig.maxStorage;
        default:
            return false;
    }
};
//# sourceMappingURL=saas.js.map