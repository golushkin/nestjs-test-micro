import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GoogleCloudPubSubServer } from './pub-sub/gcp-pub-sub-server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const pubSubServer = app.get(GoogleCloudPubSubServer);
  app.connectMicroservice({
    strategy: pubSubServer,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
