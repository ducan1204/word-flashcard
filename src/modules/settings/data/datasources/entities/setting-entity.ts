import { SettingModel } from "src/modules/settings/domain/models/setting-model";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('settings')
export default class SettingEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    key!: string;

    @Column()
    value!: string;

    @Column()
    type!: string;

    @Column()
    scope!: string;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    toModel(): SettingModel {
        return new SettingModel(
            this.id,
            this.key,
            this.value,
            this.type,
            this.scope,
            this.created_at,
            this.updated_at,
        )
    }
}