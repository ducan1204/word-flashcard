import { parseBoolean, throwError } from "src/core/helpers/utils";
import { DomainModel } from "src/core/models/domain-model";
import { SettingType } from '../enums/setting-type';

export class SettingModel extends DomainModel {
  public readonly id: string;
  public readonly key: string;
  public readonly value: string;
  public readonly type: string;
  public readonly scope: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: string,
    key: string,
    value: string,
    type: string,
    scope: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.key = key;
    this.value = value;
    this.type = type;
    this.scope = scope;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toJson(showHidden: boolean): Record<string, any> {
    return {
      id: this.id,
      key: this.key,
      value: this.getValue(),
      type: this.type,
      scope: this.scope,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
  }

  getValue() {
    switch (this.type) {
      case SettingType.Json: {
        return JSON.parse(this.value);
      }
      case SettingType.Integer: {
        return parseInt(this.value);
      }
      case SettingType.String: {
        return this.value;
      }
      case SettingType.Bool: {
        return parseBoolean(this.value);
      }
      default: {
        throwError('Setting type is not supported.');
      }
    }
  }
}