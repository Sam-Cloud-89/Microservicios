import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { envs } from './config/envs.js'
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Orders-Main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.TCP,
    options: {
      port: envs.port
    }
  });


  await app.listen();
  logger.log(`Orders running on port ${ envs.port }`)
}
await bootstrap();
