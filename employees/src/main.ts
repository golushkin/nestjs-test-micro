import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GoogleCloudPubSubServer } from './pub-sub/gcp-pub-sub-server';
import { WebSocketAdapter } from './ws/ws.adapter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.getOrThrow('PORT');

  app.connectMicroservice({
    strategy: new GoogleCloudPubSubServer(configService),
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useWebSocketAdapter(new WebSocketAdapter(app));

  await app.startAllMicroservices();
  await app.listen(port);
}

bootstrap();
