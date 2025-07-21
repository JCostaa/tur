import { Content } from '../entities/Content.js';
export declare class ContentService {
    private contentRepository;
    constructor();
    createContent(contentData: Partial<Content>): Promise<Content>;
    findContentById(id: number): Promise<Content | null>;
    findContentByType(type: string): Promise<Content[]>;
    updateContent(id: number, contentData: Partial<Content>): Promise<Content | null>;
    deleteContent(id: number): Promise<boolean>;
    getAllContent(): Promise<Content[]>;
    getActiveContent(): Promise<Content[]>;
    toggleContentStatus(id: number): Promise<Content | null>;
    searchContent(query: string): Promise<Content[]>;
}
//# sourceMappingURL=ContentService.d.ts.map