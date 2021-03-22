import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Simple todo API')
    .setDescription('The simple todo API')
    .setVersion('1.0')
    .addTag('simple todo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc/api', app, document);

  await app.listen(3000);
}
bootstrap();
