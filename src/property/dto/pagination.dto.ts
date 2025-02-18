import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDTO {
    @Type(() => Number) // Преобразует строку в число
    @IsNumber()
    @IsPositive()
    @IsOptional()
    skip: number;

    @Type(() => Number) // Преобразует строку в число
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number;
}