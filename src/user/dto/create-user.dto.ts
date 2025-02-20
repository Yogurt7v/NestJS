import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator"

export class CreateUserDto {

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsEmail()
    email: string

    @IsUrl()
    @IsOptional()
    avatarUrl?: string

    @IsString() // потом заменить на отдельный декоратор
    password: string

}
