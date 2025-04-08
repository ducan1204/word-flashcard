import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { WordCheck, WordCreateDto } from 'src/modules/words/app/dtos/word-dtos';
import { CheckWordUsecase } from 'src/modules/words/domain/usecases/words/check-word-usecase';
import { CreateWordUsecase } from 'src/modules/words/domain/usecases/words/create-word-usecase';
import { GetQuizUsecase } from 'src/modules/words/domain/usecases/words/get-quiz-usecase';
import { GetWordUsecase } from 'src/modules/words/domain/usecases/words/get-word-usecase';
import { GetWordsUsecase } from 'src/modules/words/domain/usecases/words/get-words-usecase';

@Controller()
export class WordController {
  constructor(
    private readonly checkWordUsecase: CheckWordUsecase,
    private readonly getQuizUsecase: GetQuizUsecase,
    private readonly createWordUsecase: CreateWordUsecase,
    private readonly getWordUsecase: GetWordUsecase,
    private readonly getWordsUsecase: GetWordsUsecase
  ) {}

  @Get('words')
  async getWords(@Res() res: Response) {
    const words = await this.getWordsUsecase.call();
    res.status(HttpStatus.OK).json(words);
  }

  @Get('words/random')
  async getRandomWord(@Res() res: Response) {
    const words = await this.getWordsUsecase.call();
    const randomIndex = Math.floor(Math.random() * words.length);
    const question = words[randomIndex].en_definition;
    res.status(HttpStatus.OK).json(question);
  }

  @Get('words/quiz')
  async getQuiz(@Res() res: Response) {
    const quiz = await this.getQuizUsecase.call();
    res.status(HttpStatus.OK).json(quiz);
  }

  @Post('words/check')
  async checkWord(@Body() answer: WordCheck, @Res() res: Response) {
    const checkAnswer = await this.checkWordUsecase.call(answer.word, answer.meaning);
    res.status(HttpStatus.OK).json(checkAnswer);
  }

  @Get('words/:id')
  async getWordById(@Res() res: Response, id: string) {
    const word = await this.getWordUsecase.call(id);
    res.status(HttpStatus.OK).json(word);
  }

  @Post('words')
  async createWord(@Body() body: WordCreateDto, @Res() res: Response) {
    const newWord = await this.createWordUsecase.call(
      body.word,
      body.en_definition,
      body.vi_definition,
      body.type,
      body.pronunciation,
      body.synonym,
      body.antonym,
      body.example,
      body.note
    );
    res.status(HttpStatus.CREATED).json(newWord);
  }
}
