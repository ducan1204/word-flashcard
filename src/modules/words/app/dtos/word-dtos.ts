import { IsString } from "class-validator";

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