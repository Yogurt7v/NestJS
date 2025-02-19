import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // подключает env фаил
      expandVariables: true, //  подключает использование переменных в env файлах
      load: [dbConfig],
    }),
    PropertyModule,
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
