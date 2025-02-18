import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty';
import { PaginationDTO } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class PropertyService {

    constructor(@InjectRepository(Property) private propertyRepo: Repository<Property>) { }
    async findOne(id: number) {
        const property = await this.propertyRepo.findOne({
            where: {
                id: id
            }
        })

        if (!property) throw new NotFoundException("нет такой записи")
        return property
    }
    async findAll(paginationDTO: PaginationDTO) {
        return await this.propertyRepo.find({
            skip: (Number(paginationDTO.skip)) < 0 ? 0 : Number(paginationDTO.skip),
            take: (Number(paginationDTO.limit) ?? DEFAULT_PAGE_SIZE) < 0 ? DEFAULT_PAGE_SIZE : Number(paginationDTO.limit),
        });
    }
    async create(dto: CreatePropertyDto) {
        return await this.propertyRepo.save(dto)
    }
    async update(id: number, dto: UpdatePropertyDto) {
        return await this.propertyRepo.update(id, dto)
    }

    async delete(id) {
        return await this.propertyRepo.delete(id)

    }
}
