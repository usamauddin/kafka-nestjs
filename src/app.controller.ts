import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Client,
  ClientKafka,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) {}

  // @Client({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'kafkaSample',
  //       brokers: ['localhost:9092'],
  //     },
  //     consumer: {
  //       groupId: 'my-kafka-consumer', // Should be the same thing we give in consumer
  //     },
  //   },
  // })
  // client: ClientKafka;

  async onModuleInit() {
    // Need to subscribe to topic
    // so that we can get the response from kafka microservice
    // this.client.subscribeToResponseOf('test-topic');
    // await this.client.connect();
  }

  @Get()
  getHello() {
    return this.appService.getHello();
    // console.log('api hit');

    // return this.client.send('test-topic', 'Hello Kafka');
  }

  // @MessagePattern('test-topic') // Our topic name
  // getHelloo(@Payload() message) {
  //   console.log(message);
  //   return 'Hello World';
  // }
}
