import { Injectable } from "@nestjs/common";
import { SettingDataSource } from "../../../data/datasources/setting-datasource";
import { SettingModel } from "../../models/setting-model";
import { SettingType } from "../../enums/setting-type";
import { throwError } from "src/core/helpers/utils";


@Injectable()
export class UpdateSettingUsecase {
    constructor(
        private readonly settingDataSource: SettingDataSource,
    ) { }

    async call(setting: SettingModel, value: any | undefined): Promise<void> {
        await this.settingDataSource.update(setting, this.convertValue(setting, value));
      }
    
      convertValue(setting: SettingModel, value: any | undefined) {
        if (value === null) {
          return null;
        }
    
        switch (setting.type) {
          case SettingType.Json: {
            return JSON.stringify(value);
          }
          case SettingType.Integer:
          case SettingType.String: {
            return String(value);
          }
          case SettingType.Bool: {
            return value ? 'true' : 'false';
          }
          default: {
            throwError('Setting type is not supported.');
          }
        }
      }
}