import { IsString } from 'class-validator';

export class GoogleSheetDto {
  @IsString()
  id: string;
}
