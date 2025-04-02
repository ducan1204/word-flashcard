import { Injectable } from "@nestjs/common";
import { WordDataSource } from "../../data/datasources/word-datasource";
import { WordModel } from "../models/word-model";

@Injectable()
export class CheckWordUsecase {

    constructor(
        private readonly wordDataSource: WordDataSource,
    ) { }

    async call(word: string, meaing: string): Promise<WordModel> {
        const answerWord = await this.wordDataSource.getByWord(word);
        if (!answerWord) {
            throw new Error('Word not found');
        }
        if (answerWord.en_definition === meaing) {
            return answerWord;
        } else {
            const trueWord = await this.wordDataSource.getByMeaning(meaing);
            if (trueWord) {
                return trueWord;
            } else {
                throw new Error('Meaning not found');
            }
        }
    }

}