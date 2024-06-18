import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QuizController } from './quiz.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'QUIZ_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [QuizController],
})
export class QuizModule {}
