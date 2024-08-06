import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  // For hybrid app
  // const app = await NestFactory.create(AppModule);

  // const microservice = app.connectMicroservice({
  //   transport: Transport.KAFKA,
  //   options: { host: 'localhost', port: 9092 }
  // });

  // await app.startAllMicroservices();
  // await app.listen(3000);
  // console.log('listeing at port 3000');

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
