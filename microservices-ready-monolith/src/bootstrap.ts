import { Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap(AppModule: Type<any>, port: number) {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS Examples - Data-centric Microservices Ready Monolith')
    .setDescription(
      'Event-driven API con Data-centric architecture - Gestión de gimnasios pequeños',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
