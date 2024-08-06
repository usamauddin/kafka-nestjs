import { Body, Controller, Get, Post } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private kafkaService: KafkaService) {}

  @Post('send')
  async sendMessage(@Body() body) {
    try {
      return await this.kafkaService.sendMessage(body.message);
    } catch (error) {
      throw error;
    }
  }

  @Get('get')
  async consumeMessages() {
    try {
      return await this.kafkaService.consumeMessages();
    } catch (error) {
      throw error;
    }
  }
}
