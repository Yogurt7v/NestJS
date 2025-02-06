import { Controller, Get, Post, Param, Body, HttpCode } from '@nestjs/common';

@Controller('property')
export class PropertyController {

    @Get()
    findAll(): string {
        return "ALL properties";
    }

    @Get(':id/:slug')
    findOne(@Param('id') id, @Param("slug") slug) {
        return { id: id, slug: slug };
    }
    @Post()
    @HttpCode(202) // так можно менять код ответа
    create(@Body("test") test) {
        return test; // так вытаскивается значение из объекта если есть поле "тест"
    }
}
