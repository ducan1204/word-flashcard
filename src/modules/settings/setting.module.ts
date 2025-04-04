import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SettingController } from "./app/http/controllers/api/v1/setting.controller";
import SettingEntity from "./data/datasources/entities/setting-entity";
import { SettingDataSource } from "./data/datasources/setting-datasource";
import { CreateSettingUsecase } from "./domain/usecases/settings/create-setting-usecase";
import { GetSettingUsecase } from "./domain/usecases/settings/get-setting-usecase";
import { GetSettingsUsecase } from "./domain/usecases/settings/get-settings-usecase";
import { UpdateSettingUsecase } from "./domain/usecases/settings/update-setting-usecase";

@Module({
    imports: [TypeOrmModule.forFeature([SettingEntity])],
    controllers: [SettingController],
    providers: [SettingDataSource, GetSettingUsecase, GetSettingsUsecase, CreateSettingUsecase, UpdateSettingUsecase],
    exports: [GetSettingUsecase],
})
export class SettingModule { }