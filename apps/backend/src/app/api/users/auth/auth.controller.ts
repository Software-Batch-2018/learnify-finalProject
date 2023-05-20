import { Body, Controller, Inject, Post, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '../entities/user.entity';
import { LoginDto, RegisterDto } from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Authentication (Login and Register)')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register/user')
  @ApiOperation({ summary: 'Login and get a JWT token.' })
  private register(@Body() body: RegisterDto) {
    return this.service.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User, returns Auth Token' })
  private login(@Body() body: LoginDto) {
    return this.service.login(body);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Returns Refresh Token, requires authorization token.',
  })
  @UseGuards(JwtAuthGuard)
  private refresh(@Req() { user }: Request): Promise<string | never> {
    return this.service.refresh(<User>user);
  }
}
