import { Injectable } from '@nestjs/common';
import { GoogleService } from '../../../data/datasources/google-service';

@Injectable()
export class GetSheetDataUseCase {
  constructor(private readonly googleService: GoogleService) {}

  async call(id: string, range: string): Promise<any> {
    return this.googleService.getSheetData(id, range);
  }
}
