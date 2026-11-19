import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { envs } from './config/index.js';
async function bootstrap() {
    const logger = new Logger('Main');
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.TCP,
        options: {
            port: envs.port
        }
    });
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen();
    logger.log(`Products Microservice running on port --> ${envs.port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map