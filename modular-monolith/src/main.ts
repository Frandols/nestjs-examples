import { AppModule } from '@app/app.module';
import { config } from '@app/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentConfig = new DocumentBuilder()
    .setTitle('NestJS Examples - Data-centric Microservices Ready Monolith')
    .setDescription(
      'Event-driven API con Data-centric architecture - Gestión de gimnasios pequeños',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.PORT);
}

bootstrap();
