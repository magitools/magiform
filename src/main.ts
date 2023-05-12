import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('MagiForm - Era')
    .setVersion('0.0')
    .addBearerAuth()
    .build();
  app.enableCors();
  if (process.env.STORAGE_ADAPTER === "disk") {
    app.useStaticAssets(process.env.STORAGE_PATH, {prefix: "/media/"});
  }
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
