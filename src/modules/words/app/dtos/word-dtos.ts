import { IsOptional, IsString } from 'class-validator';

export class WordDto {
  @IsString()
  word: string;
}

export class WordCheck {
  @IsString()
  word: string;

  @IsString()
  meaning: string;
}

export class WordCreateDto {
  @IsString()
  word: string;

  @IsString()
  en_definition: string;

  @IsString()
  vi_definition: string;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  pronunciation?: string | undefined;

  @IsString()
  @IsOptional()
  synonym?: string | undefined;

  @IsString()
  @IsOptional()
  antonym?: string | undefined;

  @IsString()
  @IsOptional()
  example?: string | undefined;

  @IsString()
  @IsOptional()
  note?: string | undefined;
}
