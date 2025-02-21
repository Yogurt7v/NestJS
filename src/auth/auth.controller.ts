import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth') // адрес получается auth/login
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard) // активирует локальную стратегию
  @Post("login")
  async login(@Request() req) {
    const token = this.authService.login(req.user.id)
    return {
      id: req.user.id,
      token
    }
  }
}
