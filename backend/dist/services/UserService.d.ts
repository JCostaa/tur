import { User } from '../entities/User.js';
export declare class UserService {
    private userRepository;
    constructor();
    createUser(userData: Partial<User>): Promise<User>;
    findUserById(id: number): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    updateUser(id: number, userData: Partial<User>): Promise<User | null>;
    deleteUser(id: number): Promise<boolean>;
    getAllUsers(): Promise<User[]>;
    authenticateUser(username: string, password: string): Promise<{
        user: User;
        token: string;
    } | null>;
    validateToken(token: string): Promise<User | null>;
}
//# sourceMappingURL=UserService.d.ts.map