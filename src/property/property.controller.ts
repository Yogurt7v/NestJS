import { Controller, Get, Post, Param, Body, HttpCode, ParseIntPipe, Query, ParseBoolPipe, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';

@Controller('property')
export class PropertyController {

    @Get()
    findAll(): string {
        return "ALL properties";
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id, @Query("sort", ParseBoolPipe) sort) {
        return { id, sort };
    }
    @Post()
    // @HttpCode(202) // так можно менять код ответа
    // create(@Body("test") test) {
    //     return test; // так вытаскивается значение из объекта если есть поле "тест"
    // }
    @UsePipes(new ValidationPipe({ whitelist: true, groups: ['create'] }))
    // выбираем эту функцию для запуска валидации согласно типам CreatePropertyDto и только им. лишнее будет удалено
    create(@Body() body: CreatePropertyDto) {
        console.log(body)
        return body
    }

    @Patch(':id')
    update(@Body(new ValidationPipe({
        whitelist: true,
        groups: ['update']
    })) body: CreatePropertyDto) {
        return body
    }
}
