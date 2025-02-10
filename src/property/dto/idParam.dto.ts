import { IsNumber, IsPositive } from "class-validator";

export class IdParamDto {
    @IsNumber()
    @IsPositive()
    id: number
}