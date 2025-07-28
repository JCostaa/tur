export interface SaaSConfig {
    defaultProviderId: number;
    defaultProviderSlug: string;
    customDomainsEnabled: boolean;
    subdomainEnabled: boolean;
    maxUsersPerProvider: number;
    maxFilesPerProvider: number;
    maxStoragePerProvider: number;
    features: {
        customDomain: boolean;
        analytics: boolean;
        backup: boolean;
        apiAccess: boolean;
        whiteLabel: boolean;
    };
    plans: {
        free: {
            name: string;
            price: number;
            maxUsers: number;
            maxFiles: number;
            maxStorage: number;
            features: string[];
        };
        basic: {
            name: string;
            price: number;
            maxUsers: number;
            maxFiles: number;
            maxStorage: number;
            features: string[];
        };
        pro: {
            name: string;
            price: number;
            maxUsers: number;
            maxFiles: number;
            maxStorage: number;
            features: string[];
        };
        enterprise: {
            name: string;
            price: number;
            maxUsers: number;
            maxFiles: number;
            maxStorage: number;
            features: string[];
        };
    };
}
export declare const saasConfig: SaaSConfig;
export declare const getProviderPlan: (providerId: number) => keyof SaaSConfig["plans"];
export declare const checkProviderLimits: (providerId: number, type: "users" | "files" | "storage", currentCount: number) => Promise<boolean>;
//# sourceMappingURL=saas.d.ts.map