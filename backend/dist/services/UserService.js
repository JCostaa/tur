import { AppDataSource } from '../config/database.js';
import { User } from '../entities/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export class UserService {
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }
    async createUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword
        });
        return await this.userRepository.save(user);
    }
    async findUserById(id) {
        return await this.userRepository.findOne({ where: { id } });
    }
    async findUserByUsername(username) {
        return await this.userRepository.findOne({ where: { username } });
    }
    async findUserByEmail(email) {
        return await this.userRepository.findOne({ where: { email } });
    }
    async updateUser(id, userData) {
        const user = await this.findUserById(id);
        if (!user)
            return null;
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        Object.assign(user, userData);
        return await this.userRepository.save(user);
    }
    async deleteUser(id) {
        const result = await this.userRepository.delete(id);
        return result.affected > 0;
    }
    async getAllUsers() {
        return await this.userRepository.find();
    }
    async authenticateUser(username, password) {
        const user = await this.findUserByUsername(username);
        if (!user)
            return null;
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return null;
        const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        return { user, token };
    }
    async validateToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            return await this.findUserById(decoded.userId);
        }
        catch (error) {
            return null;
        }
    }
}
//# sourceMappingURL=UserService.js.map