import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
/*  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  await app.listen(process.env.PORT ?? 3000);
}*/

const app = await NestFactory.create(AppModule);

app.useGlobalPipes(
 new ValidationPipe({
    whitelist: true,
    transform: true, // 👈 Esto activa class-transformer automáticamente
    forbidNonWhitelisted: true,
 }),
);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
