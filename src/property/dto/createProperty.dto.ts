import { IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreatePropertyDto {
    @IsString()
    @Length(2, 30)
    name: string;

    @IsString()
    description: string;

    @IsNumber() // функция из класс-валидатора для валидации типа значения
    @IsPositive()
    price: number
}