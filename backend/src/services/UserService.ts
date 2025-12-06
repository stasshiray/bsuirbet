import type { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

export class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const existingUsername = await this.findByUsername(username);
    if (existingUsername) {
      throw new Error('User with this username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      balance: 100, // Welcome bonus
      isVerified: false,
    });

    return this.userRepository.save(newUser);
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}

export const userService = new UserService();

