import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [PropertyController],
  // проверка валидации в модуле. можно в main, а можно в контроллере
  // providers: [{
  //   provide: APP_PIPE,
  //   useValue: new ValidationPipe({
  //     whitelist: true,

  //     forbidNonWhitelisted: true
  //   })
  // }]
})
export class PropertyModule { }
