import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-kwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from "argon2";
import { CurrentUser } from './types/current-user';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException("Пользователь не найден.")
        }
        const isPasswordMatch = await compare(password, user.password) // функция bcrypt сравнивает наш пароль и пароль из запроса

        if (!isPasswordMatch) {
            throw new UnauthorizedException("Неверный пароль")
        }

        return { id: user.id } // возвращать весь объект плохо. там лишние данные и те которые не надо показывать
    }

    async login(userId: number) {
        // const payload: AuthJwtPayload = { sub: userId }
        // const token = this.jwtService.sign(payload)
        // const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig)
        const { accessToken, refreshToken } = await this.generateToken(userId)
        const hashedRefreshToken = await argon2.hash(refreshToken)
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken)
        return {
            id: userId,
            accessToken,
            refreshToken
        }
    }

    async generateToken(userId: number) {
        const payload: AuthJwtPayload = { sub: userId }
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ])
        return {
            accessToken,
            refreshToken
        }
    }

    async refreshToken(userId: number) {
        const { accessToken, refreshToken } = await this.generateToken(userId)
        const hashedRefreshToken = await argon2.hash(refreshToken)
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken)
        return {
            id: userId,
            accessToken,
            refreshToken
        }
    }

    async validateRefreshToken(userId: number, refreshToken: string) {
        const user = await this.userService.findOne(userId)
        if (!user || !user.hashedRefreshToken) {
            throw new UnauthorizedException("Invalid Refresh Token")
        }
        const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, refreshToken)
        if (!refreshTokenMatches) throw new UnauthorizedException("Invalid Refresh Token")

        return { id: userId }
    }


    async signOut(userId) {
        await this.userService.updateHashedRefreshToken(userId, "")

    }

    async validateJwtUser(userId: number) {
        const user = await this.userService.findOne(userId)
        if (!user) throw new UnauthorizedException("Пользователь не найден")
        const currentUser: CurrentUser = {
            id: user.id,
            role: user.role
        }
        return currentUser
    }

}
