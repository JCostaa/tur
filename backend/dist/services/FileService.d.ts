export declare class FileService {
    private fileRepository;
    private userRepository;
    constructor();
    private initializeRepositories;
    createFile(fileData: Partial<any>): Promise<any>;
    findFileById(id: number): Promise<any | null>;
    findFileByFilename(filename: string): Promise<any | null>;
    updateFile(id: number, fileData: Partial<any>): Promise<any | null>;
    deleteFile(id: number): Promise<boolean>;
    getAllFiles(): Promise<any[]>;
    getFilesByUser(userId: number): Promise<any[]>;
    getFilesByMimeType(mimeType: string): Promise<any[]>;
    searchFiles(query: string): Promise<any[]>;
    getFileStats(): Promise<{
        totalFiles: number;
        totalSize: number;
        byType: Record<string, number>;
    }>;
}
//# sourceMappingURL=FileService.d.ts.map