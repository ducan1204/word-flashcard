import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleSheetDto } from 'src/modules/google/app/dtos/google-dtos';
import { GetGoogleSheetsUsecase } from 'src/modules/google/domain/usecases/sheets/get-google-sheets-usecase';
import { GetSheetDataUseCase } from 'src/modules/google/domain/usecases/sheets/get-sheet-data-usecase';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly getGoogleSheetsUsecase: GetGoogleSheetsUsecase,
    private readonly getSheetDataUsecase: GetSheetDataUseCase
  ) {}

  @Get('sheets')
  async getGoogleSheeets(@Res() res: Response) {
    const sheets = await this.getGoogleSheetsUsecase.call();
    res.status(HttpStatus.OK).json(sheets);
  }

  @Get('sheets/:id')
  async getSheetData(@Res() res: Response, @Param() param: GoogleSheetDto) {
    const data = await this.getSheetDataUsecase.call(param.id, 'Sheet1!A:I');
    res.status(HttpStatus.OK).json(data);
  }
}
