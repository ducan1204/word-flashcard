import { Injectable } from '@nestjs/common';
import { uuidv4 } from 'src/core/helpers/utils';
import { WordDataSource } from '../../../data/datasources/word-datasource';
import { WordModel } from '../../models/word-model';
import { GetWordByWordUsecase } from './get-word-by-word-usecase';

@Injectable()
export class CreateWordUsecase {
  constructor(
    private readonly wordDataSource: WordDataSource,
    private readonly getWordByWordUsecase: GetWordByWordUsecase
  ) {}

  async call(
    word: string,
    en_definition: string,
    vi_definition: string,
    type?: string,
    pronunciation?: string,
    synonym?: string,
    antonym?: string,
    example?: string,
    note?: string
  ): Promise<WordModel> {
    const existingWord = await this.getWordByWordUsecase.call(word);
    console.log(existingWord);
    if (existingWord) {
      throw new Error('Word already exists');
    }
    const newWord = new WordModel(
      uuidv4(),
      word,
      en_definition,
      vi_definition,
      type,
      pronunciation,
      synonym,
      antonym,
      example,
      note
    );
    await this.wordDataSource.create(newWord);
    return newWord;
  }
}
