import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Check out the best Home Library Service API!')
    .setVersion('1.0')
    .addServer(`http://localhost:${PORT}/`, 'Local environment') //.addTag('Your API Tag')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
