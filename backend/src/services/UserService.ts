import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database.js';
import { User } from '../entities/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
    return await this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    const user = await this.findUserById(id);
    if (!user) return null;

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    Object.assign(user, userData);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected! > 0;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async authenticateUser(username: string, password: string): Promise<{ user: User; token: string } | null> {
    const user = await this.findUserByUsername(username);
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return null;

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return { user, token };
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
      return await this.findUserById(decoded.userId);
    } catch (error) {
      return null;
    }
  }
} 