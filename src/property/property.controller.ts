import { Controller, Get, Post } from '@nestjs/common';

@Controller('property')
export class PropertyController {

    @Get()
    findAll(): string {
        return "ALL properties";
    }
    @Post()
    create(): string {
        return "Create a new property";
    }
}
