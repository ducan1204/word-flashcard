import { Injectable, Get } from '@nestjs/common';
import { WordDataSource } from "../../data/datasources/word-datasource";
import { WordModel } from "../models/word-model";

@Injectable()
export class GetQuizUsecase {

    constructor(
        private readonly wordDataSource: WordDataSource,
    ) { }

    async call(): Promise<any> {
        console.log('get-quiz-usecase')
        const correctWord = await this.wordDataSource.getRandomWord();
        const distractorWords = await this.wordDataSource.getRandomWords(3, [correctWord.id]);
        const answers = [...distractorWords.map((word) => word.en_definition), correctWord.en_definition];
        const shuffleAnswers = answers.sort(() => Math.random() - 0.5);

        return {
            word: correctWord.word,
            meanings: shuffleAnswers
        };
    }

}