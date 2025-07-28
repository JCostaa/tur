import { Provider } from '../entities/Provider.js';
export declare class ProviderService {
    private providerRepository;
    private userRepository;
    private bannerRepository;
    private categoryRepository;
    private contentRepository;
    private experienceRepository;
    private fileRepository;
    private menuRepository;
    private segmentRepository;
    private settingRepository;
    getAllProviders(): Promise<Provider[]>;
    getProviderById(id: number): Promise<Provider | null>;
    getProviderBySlug(slug: string): Promise<Provider | null>;
    createProvider(data: {
        name: string;
        slug: string;
    }): Promise<Provider>;
    updateProvider(id: number, data: {
        name?: string;
        slug?: string;
    }): Promise<Provider | null>;
    deleteProvider(id: number): Promise<void>;
    getProviderStats(id: number): Promise<any>;
    getProviderByDomain(domain: string): Promise<Provider | null>;
    createProviderWithDefaultData(data: {
        name: string;
        slug: string;
    }): Promise<Provider>;
}
//# sourceMappingURL=ProviderService.d.ts.map