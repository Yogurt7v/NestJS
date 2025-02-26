import { Controller, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { PublicDecorator } from './decorators/public.decorator';

@Controller('auth') // адрес получается auth/login
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @PublicDecorator()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard) // активирует локальную стратегию
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user.id)
  }

  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post("signout")
  singOut(@Req() req) {
    this.authService.signOut(req.user.id)
  }
}
