import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config/index.js';


async function bootstrap() {


const logger = new Logger('Main');

const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  AppModule,
  {
    transport: Transport.TCP,
    options: 
    {
      port: envs.port
    }
  }
)

app.useGlobalPipes(
 new ValidationPipe({
    whitelist: true,// Borra automáticamente cualquier propiedad que no esté en el DTO (seguridad)
    transform: true, // 👈 Esto activa class-transformer automáticamente
    forbidNonWhitelisted: true,// Lanza un error si el usuario envía campos "extra" que no pedimos
 }),
);

  await app.listen();
  logger.log(`Products Microservice running on port --> ${envs.port}`);

}
bootstrap();



/*  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  await app.listen(process.env.PORT ?? 3000);
}*/


/*const app = await NestFactory.create(AppModule, {
  instrument: ObserveInstrument,
});*/


  //await app.listen(process.env.PORT ?? 3000);

  //logger.log(`App running on port --> ${envs.port}`);
  //console.log(`App running on port --> ${envs.port}`)