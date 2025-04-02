import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { WordModel } from "../../domain/models/word-model";
import WordEntity from "./entities/word-entity";

@Injectable()
export class WordDataSource {
    constructor(@InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>) {
    }

    async get(id: number): Promise<WordModel | undefined> {
        return (await this.wordRepository.findOne({
            where: {
                ID: id
            }
        }))?.toModel();
    }

    async list(): Promise<WordModel[]> {
        const condition: FindOptionsWhere<WordEntity> = {};
        const query = this.wordRepository.createQueryBuilder().setFindOptions({
            where: condition
        });
        return (await query.getMany()).map((entity) => entity.toModel());
    }

    async getByWord(word: string): Promise<WordModel | undefined> {
        return (await this.wordRepository.findOne({
            where: {
                Word: word
            }
        }))?.toModel();
    }

    async getByMeaning(meaning: string): Promise<WordModel | undefined> {
        return (await this.wordRepository.findOne({
            where: {
                En_Definition: meaning
            }
        }))?.toModel();
    }
}