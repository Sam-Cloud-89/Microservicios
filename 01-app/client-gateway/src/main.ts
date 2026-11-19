import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { Logger } from '@nestjs/common';
import { envs } from './config/envs.js';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.setGlobalPrefix('api');
  await app.listen(envs.port);
  logger.log(`Gateway running on port ${ envs.port }`)
}
await bootstrap();
