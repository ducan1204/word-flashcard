import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { QuizMode } from "src/modules/words/domain/enums/quiz-mode";
import { SettingScope } from "../../domain/enums/setting-scope";
import { SettingType } from "../../domain/enums/setting-type";

export class SettingDto {
    @IsString()
    setting: string;
}

export class SettingCheck {
    @IsString()
    setting: string;

    @IsString()
    meaning: string;
}

export class SettingBody {
    @IsString()
    @IsNotEmpty()
    key!: string;

    @IsString()
    @IsNotEmpty()
    value!: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(SettingType)
    type!: SettingType;

    @IsString()
    @IsNotEmpty()
    @IsEnum(SettingScope)
    scope!: SettingScope;
}

export class Setting {
    @IsString()
    id!: string;
}

export class SettingUpdateDto {
    value: any;
}

export class SettingQuizmodeDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(QuizMode)
    value!: QuizMode;
}