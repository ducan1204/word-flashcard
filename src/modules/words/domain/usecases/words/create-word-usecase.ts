import { Injectable } from "@nestjs/common";
import { SettingKey } from "src/modules/settings/domain/enums/setting-key";
import { GetSettingUsecase } from "src/modules/settings/domain/usecases/settings/get-setting-usecase";
import { WordDataSource } from "../../../data/datasources/word-datasource";
import { QuizMode } from "../../enums/quiz-mode";

@Injectable()
export class CreateWordUsecase {

    constructor(
        private readonly wordDataSource: WordDataSource,
        private readonly getSettingUsecase: GetSettingUsecase,
    ) { }

    async call(word: string, meaing: string): Promise<boolean> {
        const setting = await this.getSettingUsecase.call(SettingKey.WORD_QUIZMODE);
        if (!setting) {
            throw new Error('Setting not found');
        }

        const answerWord = await this.wordDataSource.getByWord(word);
        if (!answerWord) {
            throw new Error('Word not found');
        }
        if (setting.value === QuizMode.EN_EN) {
            return answerWord.en_definition === meaing;
        } else if (setting.value === QuizMode.EN_VI)
            return answerWord.vi_definition === meaing;
        else {
            throw new Error('Invalid quiz mode');
        }
    }

}