import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }

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

}
