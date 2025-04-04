import { Injectable } from "@nestjs/common";
import { throwError, uuidv4 } from "../../../../../core/helpers/utils";
import { SettingDataSource } from "../../../data/datasources/setting-datasource";
import { SettingModel } from "../../models/setting-model";
import { GetSettingUsecase } from "./get-setting-usecase";

@Injectable()
export class CreateSettingUsecase {
    constructor(
        private readonly settingDataSource: SettingDataSource,
        private readonly getSettingUsecase: GetSettingUsecase,
    ) { }

    async call(key: string, value: string, type: string, scope: string): Promise<SettingModel> {
        const settingExists = await this.getSettingUsecase.call(key);
        if (settingExists) {
            throwError(`Setting with key ${key} already exists`);
        }
        const setting = new SettingModel(
            uuidv4(),
            key,
            value,
            type,
            scope,
            new Date(),
            new Date(),
        );
        await this.settingDataSource.create(setting);

        return setting;
    }
}