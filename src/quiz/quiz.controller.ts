import { Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CustomError } from 'src/common/helpers/exceptions';
import { START_QUIZ } from 'src/common/serverPetterns/quiz-server.pettern';

@ApiTags('Quiz')
@Controller()
export class QuizController {
  constructor(
    @Inject('QUIZ_SERVICE') private readonly quizClient: ClientProxy,
  ) {}

  @ApiBearerAuth()
  @Post('start-quiz')
  async startQuiz(@Req() request) {
    try {
      return await firstValueFrom(
        this.quizClient.send(START_QUIZ, request.user),
      );
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError('something went wrong!!');
      }
    }
  }
}
