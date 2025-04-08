import { Injectable } from '@nestjs/common';
import { WordDataSource } from '../../../data/datasources/word-datasource';
import { WordModel } from '../../models/word-model';

@Injectable()
export class GetWordUsecase {
  constructor(private readonly wordDataSource: WordDataSource) {}

  async call(id: string): Promise<WordModel | undefined> {
    const newWord = await this.wordDataSource.get(id);
    return newWord;
  }
}
