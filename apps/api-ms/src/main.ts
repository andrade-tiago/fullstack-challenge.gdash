import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix("api")

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    }),
  );

  const documentConfig = new DocumentBuilder()
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, documentConfig)
  SwaggerModule.setup('docs', app, document)

  app.enableCors()

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap();
