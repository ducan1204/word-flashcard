import { Injectable } from '@nestjs/common';
import { GoogleService } from 'src/modules/google/data/datasources/google-service';

@Injectable()
export class GetGoogleSheetsUsecase {
  constructor(private readonly googleService: GoogleService) {}

  async call(): Promise<any> {
    const sheets = await this.googleService.getSheetIds();
    return sheets;
  }
}
