import { Injectable } from "@nestjs/common";
import { SettingDataSource } from "../../../data/datasources/setting-datasource";
import { SettingModel } from "../../models/setting-model";


@Injectable()
export class GetSettingsUsecase {
    constructor(
        private readonly settingDataSource: SettingDataSource,
    ) { }

    async call(): Promise<SettingModel[]> {
        const settings = await this.settingDataSource.list();

        return settings;
    }
}