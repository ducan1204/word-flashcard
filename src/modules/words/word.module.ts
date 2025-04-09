import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleModule } from '../google/google.module';
import { SettingModule } from '../settings/setting.module';
import { WordController } from './app/http/controllers/api/v1/word.controller';
import WordEntity from './data/datasources/entities/word-entity';
import { WordDataSource } from './data/datasources/word-datasource';
import { CheckWordUsecase } from './domain/usecases/words/check-word-usecase';
import { CreateWordUsecase } from './domain/usecases/words/create-word-usecase';
import { GetQuizUsecase } from './domain/usecases/words/get-quiz-usecase';
import { GetWordByWordUsecase } from './domain/usecases/words/get-word-by-word-usecase';
import { GetWordUsecase } from './domain/usecases/words/get-word-usecase';
import { GetWordsUsecase } from './domain/usecases/words/get-words-usecase';
import { SyncWordDataUseCase } from './domain/usecases/words/sync-words-data-usecase';
import { UpsertWordsUsecase } from './domain/usecases/words/upsert-words-usecase';

@Module({
  imports: [
    forwardRef(() => SettingModule),
    forwardRef(() => GoogleModule),
    TypeOrmModule.forFeature([WordEntity]),
  ],
  controllers: [WordController],
  providers: [
    WordDataSource,
    CheckWordUsecase,
    GetQuizUsecase,
    CreateWordUsecase,
    GetWordUsecase,
    GetWordsUsecase,
    GetWordByWordUsecase,
    UpsertWordsUsecase,
    SyncWordDataUseCase,
  ],
  exports: [UpsertWordsUsecase],
})
export class WordModule {}
