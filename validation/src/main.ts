import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleCloudPubSubServer } from './gcp-pub-sub-server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.getOrThrow('PORT');

  app.connectMicroservice({
    strategy: new GoogleCloudPubSubServer(configService),
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.startAllMicroservices();
  await app.listen(port);
}

bootstrap();
