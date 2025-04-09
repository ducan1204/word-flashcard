import { Injectable } from '@nestjs/common';
import { throwError, uuidv4 } from 'src/core/helpers/utils';
import { GetSheetDataUseCase } from 'src/modules/google/domain/usecases/sheets/get-sheet-data-usecase';
import { UpsertWordsUsecase } from './upsert-words-usecase';

@Injectable()
export class SyncWordDataUseCase {
  private readonly SheetID = '1Y_Da31WcVWiGHYzu1qZRomS0a66fqx5nvFOq1Le4IMM';
  private readonly SheetRange = 'Sheet1!A:I';
  constructor(
    private readonly getSheetDataUseCase: GetSheetDataUseCase,
    private readonly upsertWordsUsecase: UpsertWordsUsecase
  ) {}

  async call(): Promise<void> {
    const data = await this.getSheetDataUseCase.call(this.SheetID, this.SheetRange);

    const [headers, ...rows] = data;
    const words = new Set<string>();
    const mappedWords = rows.map((row) => {
      const word = {};
      headers.forEach((key, i) => {
        word[key.toLowerCase()] = row[i];
      });
      word['id'] = uuidv4();
      const wordValue = word['word'];
      if (words.has(wordValue)) {
        console.log('duplicate', wordValue); // Log duplicate values
        throwError(`Duplicate word found: ${wordValue}`);
      }
      words.add(wordValue);
      return word;
    });

    await this.upsertWordsUsecase.call(mappedWords);
  }
}
