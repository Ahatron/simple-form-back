import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async register(username: string, password: string) {
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      console.log(existingUser);
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        username,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);
      return this.login(newUser);
    }
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async validateUser(username: string, pass: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    console.log(user.password, pass);

    if (user && bcrypt.compare(pass, user.password)) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}
