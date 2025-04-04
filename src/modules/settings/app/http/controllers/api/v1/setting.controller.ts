import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { throwError } from "src/core/helpers/utils";
import { Setting, SettingBody, SettingQuizmodeDto } from "src/modules/settings/app/dtos/setting-dtos";
import { SettingKey } from "src/modules/settings/domain/enums/setting-key";
import { CreateSettingUsecase } from "src/modules/settings/domain/usecases/settings/create-setting-usecase";
import { GetSettingUsecase } from "src/modules/settings/domain/usecases/settings/get-setting-usecase";
import { GetSettingsUsecase } from "src/modules/settings/domain/usecases/settings/get-settings-usecase";
import { UpdateSettingUsecase } from "src/modules/settings/domain/usecases/settings/update-setting-usecase";

@Controller()
export class SettingController {
    constructor(
        private readonly createSettingUsecase: CreateSettingUsecase,
        private readonly getSettingUsecase: GetSettingUsecase,
        private readonly getSettingsUsecase: GetSettingsUsecase,
        private readonly updateSettingUsecase: UpdateSettingUsecase
    ) { }

    @Get('settings')
    async getSettings(@Res() res: Response) {
        const settings = await this.getSettingsUsecase.call();
        res.status(HttpStatus.OK).json(settings);
    }

    @Post('settings')
    async createSetting(@Body() setting: SettingBody, @Res() res: Response) {
        const newSetting = await this.createSettingUsecase.call(setting.key, setting.value, setting.type, setting.scope);
        res.status(HttpStatus.OK).json(newSetting);
    }

    @Get('settings/:id')
    async getSettingById(@Res() res: Response, @Param() param: Setting) {
        const setting = await this.getSettingUsecase.call(param.id);
        res.status(HttpStatus.OK).json(setting);
    }

    @Put(`settings/${SettingKey.WORD_QUIZMODE}`)
    async updateSetting(@Res() res: Response, @Body() body: SettingQuizmodeDto) {
        const settingModel = await this.getSettingUsecase.call(SettingKey.WORD_QUIZMODE);
        if (!settingModel) {
            throwError('Setting not found');
        }
        await this.updateSettingUsecase.call(settingModel, body.value);

        const updatedSetting = await this.getSettingUsecase.call(SettingKey.WORD_QUIZMODE);
        res.status(HttpStatus.OK).json(updatedSetting);
    }
}