import { DomainModel } from '../models/domain-model';
import { promises as fs, readFileSync } from 'fs';
import { join } from 'path';
import { PageList } from '../models/page-list';
export function throwError(errorMessage = ''): never {
    throw new Error(errorMessage);
}

export const normalizeResponseData = (result: any, showHidden = false): any => {
    let data: any = result;
    if (result instanceof PageList) {
        data = result.data.map((model) => model.toJson(showHidden));
    } else if (result instanceof DomainModel) {
        data = result.toJson(showHidden);
    } else if (Array.isArray(result)) {
        data = result.map((item) => {
            if (item instanceof DomainModel) {
                return item.toJson(showHidden);
            }
            return item;
        });
    }
    return data ?? null;
};

export const parseBoolean = (val: string | boolean | number | undefined, strict = true): boolean | undefined | null => {
    if (val === undefined || val === null) {
        return strict ? null : undefined;
    }

    const s = val && val.toString().toLowerCase().trim();
    return s == 'true' || s == '1';
};

export const readJsonFile = async (fileName: string): Promise<any> => {
    const data = await fs.readFile(join(process.cwd(), fileName));
    const stringData = data.toString();
    return JSON.parse(stringData);
};


// TODO: remove this once it is provided by TypeORM (in case that ever happens)
declare module 'typeorm' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface SelectQueryBuilder<Entity> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        exists<T>(): Promise<boolean>;
    }
}

export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(randomNumber(0, characters.length - 1));
    }

    return result;
}

export function uuidv4() {
    return crypto.randomUUID();
}
