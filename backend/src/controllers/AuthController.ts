import { Request, Response } from 'express';
import { UserService } from '../services/UserService.js';
import { body, validationResult } from 'express-validator';

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;
      const result = await this.userService.authenticateUser(username, password);

      if (!result) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const { user, token } = result;
      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await this.userService.findUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const existingEmail = await this.userService.findUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const user = await this.userService.createUser({
        username,
        email,
        password,
        role: role || 'admin'
      });

      res.status(201).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async validateToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const user = await this.userService.validateToken(token);
      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Token validation error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Validation middleware
  static validateLogin() {
    return [
      body('username').notEmpty().withMessage('Username is required'),
      body('password').notEmpty().withMessage('Password is required')
    ];
  }

  static validateRegister() {
    return [
      body('username').notEmpty().withMessage('Username is required'),
      body('email').isEmail().withMessage('Valid email is required'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ];
  }
} 