import { Injectable } from '@nestjs/common';
import { WordDataSource } from '../../../data/datasources/word-datasource';
import { WordModel } from '../../models/word-model';

@Injectable()
export class GetWordsUsecase {
  constructor(private readonly wordDataSource: WordDataSource) {}

  async call(): Promise<WordModel[]> {
    const words = await this.wordDataSource.list();
    return words;
  }
}
