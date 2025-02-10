import { Controller, Get, Post, Param, Body, HttpCode, ParseIntPipe, Query, ParseBoolPipe, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdppipes';

@Controller('property')
export class PropertyController {

    @Get()
    findAll(): string {
        return "ALL properties";
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id, @Query("sort", ParseBoolPipe) sort) {

        console.log(id)
        console.log(sort)

        return id;
    }
    @Post()
    // @HttpCode(202) // так можно менять код ответа

    // create(@Body("test") test) {
    //     return test; // так вытаскивается значение из объекта если есть поле "тест"
    // }

    // @UsePipes(new ValidationPipe({ whitelist: true, groups: ['create'] }))
    // выбираем эту функцию для запуска валидации согласно типам CreatePropertyDto и только им. лишнее будет удалено
    // но если мы проверяем ее глобально в main, то здесь она не нужна

    create(@Body() body: CreatePropertyDto) {
        console.log(body)
        return body
    }

    @Patch(':id')
    update(@Param("id", ParseIdPipe) id, @Body() body: CreatePropertyDto) {
        return body
    }
}
