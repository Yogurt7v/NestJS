import { Controller, Get, Post, Param, Body, HttpCode, ParseIntPipe, Query, ParseBoolPipe, UsePipes, ValidationPipe, Patch, Headers } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdppipes';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { createPropertySchema, CreatePropertyZodDto } from './dto/createPropertyZod.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';


interface Service {
    findAll()
    findOne()
    create()
    update()
}

@Controller('property')
export class PropertyController {

    constructor(private propertyService: PropertyService) {
        // this.propertyService = propertyService
    }

    @Get()
    // findAll(): string {
    //     return "ALL properties";
    // }
    findAll() {
        return this.propertyService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id) {
        return this.propertyService.findOne(id)
    }
    // findOne() {
    //     return this.propertyService.findOne()
    // }


    @Post()
    // @UsePipes(new ZodValidationPipe(createPropertySchema))
    // @HttpCode(202) // так можно менять код ответа

    // create(@Body("test") test) {
    //     return test; // так вытаскивается значение из объекта если есть поле "тест"
    // }

    // @UsePipes(new ValidationPipe({ whitelist: true, groups: ['create'] }))
    // выбираем эту функцию для запуска валидации согласно типам CreatePropertyDto и только им. лишнее будет удалено
    // но если мы проверяем ее глобально в main, то здесь она не нужна

    create(@Body() dto: CreatePropertyDto) {
        return this.propertyService.create(dto)
    }
    // create() {
    //     return this.propertyService.create()
    // }

    @Patch(':id')
    update(
        @Param("id", ParseIdPipe) id,
        @Body()
        body: CreatePropertyDto,
        @RequestHeader(new ValidationPipe({ validateCustomDecorators: true })) header: HeadersDto   // так мы вытаскиваем содержимое заголовков запроса под полем "host" и присваиваем результат к переменной header
    ) {
        return header
    }
    // update() {
    //     return this.propertyService.findOne()
    // }
}
