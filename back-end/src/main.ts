import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Initialize Swagger
  const config = new DocumentBuilder()
    .setTitle('Web Application API')
    .setDescription('API documentation for the web application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useStaticAssets(join(__dirname,'..','uploads'),{prefix: '/upload-picture'})
  SwaggerModule.setup('api', app, document);  // Swagger UI will be available at /api
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
