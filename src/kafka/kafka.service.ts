import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { partition } from 'rxjs';

@Injectable()
export class KafkaService {
  //   constructor(private readonly appService: AppService) {}
  private kafka;
  constructor() {
    this.kafka = new Kafka({
      clientId: 'kafka',
      brokers: ['localhost:9092'],
      // retry: {
      //   // retries: 50, // Maximum number of retries
      //   // initialRetryTime: 100, // Initial retry time in milliseconds
      //   // maxRetryTime: 30000, // Maximum retry time in milliseconds
      // },
    });
  }

  async sendMessage(message) {
    try {
      const producer = this.kafka.producer();

      await producer.connect();

      await producer.send({
        topic: 'test-topic',
        messages: [{ value: message }],
      });

      await producer.disconnect();

      return 'Message sent successfully';
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async consumeMessages() {
    try {
      const consumer = this.kafka.consumer({ groupId: 'test-group' });

      await consumer.connect();
      await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

      const data = consumer.run({
        eachMessage: async ({ topic, message, partition }) => {
          console.log({
            message: message.value.toString(),
            partition,
            offset: message.offset,
          });
          return message;
        },
      });
      consumer.seek({
        topic: 'test-topic',
        partition: 0,
        offset: '0',
      });

      console.log('data', data);

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
