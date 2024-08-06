import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  //   constructor(private readonly appService: AppService) {}
  private kafka;
  constructor() {
    this.kafka = new Kafka({
      clientId: 'kafka',
      brokers: ['localhost:9092'],
    });
  }

  async sendMessage(message) {
    try {
      const producer = this.kafka.producer();

      await producer.connect();
      await producer.send({
        topic: 'test-topic',
        messages: [{ value: 'Hello Kafka user!' }],
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

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            message: message.value.toString(),
          });
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
