import { Injectable } from '@nestjs/common';
import { WordDataSource } from '../../../data/datasources/word-datasource';
import { WordModel } from '../../models/word-model';

@Injectable()
export class GetWordByWordUsecase {
  constructor(private readonly wordDataSource: WordDataSource) {}

  async call(word: string): Promise<WordModel | undefined> {
    const newWord = await this.wordDataSource.getByWord(word);
    return newWord;
  }
}
