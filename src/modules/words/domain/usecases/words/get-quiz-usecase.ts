import { Injectable } from '@nestjs/common';
import { SettingKey } from 'src/modules/settings/domain/enums/setting-key';
import { GetSettingUsecase } from 'src/modules/settings/domain/usecases/settings/get-setting-usecase';
import { WordDataSource } from "../../../data/datasources/word-datasource";
import { QuizMode } from '../../enums/quiz-mode';

@Injectable()
export class GetQuizUsecase {

    constructor(
        private readonly wordDataSource: WordDataSource,
        private readonly getSettingUsecase: GetSettingUsecase,
    ) { }

    async call(): Promise<any> {
        const setting = await this.getSettingUsecase.call(SettingKey.WORD_QUIZMODE);
        if (!setting) {
            throw new Error('Setting not found');
        }

        const correctWord = await this.wordDataSource.getRandomWord();
        const distractorWords = await this.wordDataSource.getRandomWords(3, [correctWord.id]);

        const quizMode = setting.value;
        let answers = [];
        if (quizMode === QuizMode.EN_EN) {
            answers = [...distractorWords.map((word) => word.en_definition), correctWord.en_definition];
        } else if (quizMode === QuizMode.EN_VI) {
            answers = [...distractorWords.map((word) => word.vi_definition), correctWord.vi_definition];
        } else {
            throw new Error('Invalid quiz mode');
        }

        const shuffleAnswers = answers.sort(() => Math.random() - 0.5);

        return {
            word: correctWord.word,
            meanings: shuffleAnswers
        };
    }

}