import { Module } from '@nestjs/common';
import { GoogleController } from './app/http/controllers/api/v1/google.controller';
import { GoogleService } from './data/datasources/google-service';
import { GetGoogleSheetsUsecase } from './domain/usecases/sheets/get-google-sheets-usecase';
import { GetSheetDataUseCase } from './domain/usecases/sheets/get-sheet-data-usecase';

@Module({
  imports: [],
  controllers: [GoogleController],
  providers: [GoogleService, GetGoogleSheetsUsecase, GetSheetDataUseCase],
  exports: [GetSheetDataUseCase],
})
export class GoogleModule {}
