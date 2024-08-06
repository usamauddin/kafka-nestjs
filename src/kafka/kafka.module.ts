import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';

@Module({
  imports: [],
  providers: [KafkaService],
  controllers: [KafkaController],
})
export class KafkaModule {}
