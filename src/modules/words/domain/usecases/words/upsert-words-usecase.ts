import { Injectable } from '@nestjs/common';
import { WordDataSource } from '../../../data/datasources/word-datasource';
import { WordModel } from '../../models/word-model';

@Injectable()
export class UpsertWordsUsecase {
  constructor(private readonly wordDataSource: WordDataSource) {}

  async call(words: WordModel[]): Promise<void> {
    await this.wordDataSource.upsert(words);
  }
}
