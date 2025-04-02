import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { WordCheck } from "src/modules/words/app/dtos/word-dtos";
import { WordDataSource } from "src/modules/words/data/datasources/word-datasource";
import { CheckWordUsecase } from "src/modules/words/domain/usecases/check-word-usecase";

@Controller()
export class WordController {
    constructor(private readonly wordDataSource: WordDataSource, private readonly checkWordUsecase: CheckWordUsecase) { }

    @Get('words')
    async getWords(@Res() res: Response) {
        const words = await this.wordDataSource.list();
        console.log(words);
        res.status(HttpStatus.OK).json(words);
    }

    @Get('words/random')
    async getRandomWord(@Res() res: Response) {
        const words = await this.wordDataSource.list();
        const randomIndex = Math.floor(Math.random() * words.length);
        const question = words[randomIndex].en_definition;
        res.status(HttpStatus.OK).json(question);
    }

    @Get('words/:id')
    async getWordById(@Res() res: Response, id: number) {
        const word = await this.wordDataSource.get(id);
        res.status(HttpStatus.OK).json(word);
    }

    @Post('words/check')
    async checkWord(@Body() answer: WordCheck, @Res() res: Response) {
        const checkAnswer = await this.checkWordUsecase.call(answer.word, answer.meaning);
        res.status(HttpStatus.OK).json(checkAnswer);
    }
}