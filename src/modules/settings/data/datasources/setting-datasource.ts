import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { SettingModel } from "../../domain/models/setting-model";
import SettingEntity from "./entities/setting-entity";

@Injectable()
export class SettingDataSource {
    constructor(@InjectRepository(SettingEntity)
    private readonly settingRepository: Repository<SettingEntity>) {
    }

    async get(idOrKey: string): Promise<SettingModel | undefined> {
        return (await this.settingRepository
            .createQueryBuilder()
            .where('id = :id', { id: idOrKey })
            .orWhere('key = :key', { key: idOrKey })
            .getOne()
        )?.toModel();
    }

    async list(): Promise<SettingModel[]> {
        const condition: FindOptionsWhere<SettingEntity> = {};
        const query = this.settingRepository.createQueryBuilder().setFindOptions({
            where: condition
        });
        return (await query.getMany()).map((entity) => entity.toModel());
    }

    async create(setting: SettingModel): Promise<void> {
        const entity = new SettingEntity();
        entity.id = setting.id;
        entity.key = setting.key;
        entity.value = setting.value;
        entity.type = setting.type;
        entity.scope = setting.scope;
        entity.created_at = setting.createdAt;
        entity.updated_at = setting.updatedAt;
        await this.settingRepository.insert(entity);
    }

    async update(setting: SettingModel, value: string | null | undefined): Promise<void> {
        await this.settingRepository.update(setting.id, {
            ...(value !== undefined && { value: <string>value }),
        });
    }
}