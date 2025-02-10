import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // глобальная проверка валидации, может отдельно проверяться в к контроллере и в модуле, или здесь
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
