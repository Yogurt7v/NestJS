import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {

    @IsOptional()
    skip: number;

    @IsOptional()
    limit: number;
}