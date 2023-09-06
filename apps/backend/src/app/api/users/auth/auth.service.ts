import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginResponse } from '../dto/response.dto';
import { User } from '../entities/user.entity';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { Level } from '../../courses/entities/level.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @InjectRepository(Level)
  private readonly levelRepo: Repository<Level>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password, user_level }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    const level = await this.levelRepo.findOne({
      where: {
        level_id: user_level,
      },
    });

    user = new User();

    user.name = name;
    user.email = email;
    user.password = password;
    user.user_level = level;

    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<LoginResponse> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid Password!!!', HttpStatus.NOT_FOUND);
    }

    this.repository.update(user.id, { lastLoginAt: new Date() });

    const token = this.helper.generateToken(user);

    return {
      user,
      token,
    };
  }

  public async refresh(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }
}
