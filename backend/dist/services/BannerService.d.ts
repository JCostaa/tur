import { Banner } from '../entities/Banner.js';
export declare class BannerService {
    private bannerRepository;
    constructor();
    createBanner(bannerData: Partial<Banner>): Promise<Banner>;
    findBannerById(id: number): Promise<Banner | null>;
    updateBanner(id: number, bannerData: Partial<Banner>): Promise<Banner | null>;
    deleteBanner(id: number): Promise<boolean>;
    getAllBanners(): Promise<Banner[]>;
    getActiveBanners(): Promise<Banner[]>;
    toggleBannerStatus(id: number): Promise<Banner | null>;
    reorderBanners(bannerOrders: {
        id: number;
        orderIndex: number;
    }[]): Promise<Banner[]>;
    searchBanners(query: string): Promise<Banner[]>;
    getBannersByType(type?: string): Promise<Banner[]>;
}
//# sourceMappingURL=BannerService.d.ts.map