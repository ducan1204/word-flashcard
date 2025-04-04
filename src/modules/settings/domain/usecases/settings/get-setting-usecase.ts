import { Injectable } from "@nestjs/common";
import { SettingDataSource } from "../../../data/datasources/setting-datasource";
import { SettingModel } from "../../models/setting-model";


@Injectable()
export class GetSettingUsecase {
    constructor(
        private readonly settingDataSource: SettingDataSource,
    ) { }

    async call(idOrKey: string): Promise<SettingModel | undefined> {
        const setting = await this.settingDataSource.get(idOrKey);
        return setting;
    }
}