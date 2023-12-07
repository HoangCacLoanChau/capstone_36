import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Pirest Clone')
    .setDescription('collection of image')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, doc);
  await app.listen(8080);
}
bootstrap();
