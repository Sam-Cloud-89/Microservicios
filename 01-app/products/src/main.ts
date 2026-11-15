import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/index.js';

async function bootstrap() {
/*  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  await app.listen(process.env.PORT ?? 3000);
}*/

const app = await NestFactory.create(AppModule);

app.useGlobalPipes(
 new ValidationPipe({
    whitelist: true,// Borra automáticamente cualquier propiedad que no esté en el DTO (seguridad)
    transform: true, // 👈 Esto activa class-transformer automáticamente
    forbidNonWhitelisted: true,// Lanza un error si el usuario envía campos "extra" que no pedimos
 }),
);

  //await app.listen(process.env.PORT ?? 3000);
  await app.listen(envs.port);
  console.log(`App running on port --> ${envs.port}`)
}
bootstrap();
