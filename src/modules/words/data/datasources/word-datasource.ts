import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Not, Repository } from 'typeorm';
import { WordModel } from '../../domain/models/word-model';
import WordEntity from './entities/word-entity';

@Injectable()
export class WordDataSource {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>
  ) {}

  async get(id: string): Promise<WordModel | undefined> {
    return (
      await this.wordRepository.findOne({
        where: {
          id: id,
        },
      })
    )?.toModel();
  }

  async list(): Promise<WordModel[]> {
    const condition: FindOptionsWhere<WordEntity> = {};
    const query = this.wordRepository.createQueryBuilder().setFindOptions({
      where: condition,
    });
    return (await query.getMany()).map((entity) => entity.toModel());
  }

  async getByWord(word: string): Promise<WordModel | undefined> {
    return (
      await this.wordRepository.findOne({
        where: {
          word: word,
        },
      })
    )?.toModel();
  }

  async getByMeaning(meaning: string): Promise<WordModel | undefined> {
    return (
      await this.wordRepository.findOne({
        where: {
          en_definition: meaning,
        },
      })
    )?.toModel();
  }

  async getRandomWord(): Promise<WordModel> {
    const condition: FindOptionsWhere<WordEntity> = {};
    let query = this.wordRepository.createQueryBuilder().setFindOptions({
      where: condition,
      take: 1,
    });
    query = query.orderBy('RANDOM()');
    return query.getOne().then((entity) => entity.toModel());
  }

  async getRandomWords(amount: number, excludeIds: string[] = []): Promise<WordModel[]> {
    const condition: FindOptionsWhere<WordEntity> = {};
    if (excludeIds.length > 0) {
      condition.id = Not(In(excludeIds));
    }
    const query = this.wordRepository.createQueryBuilder().setFindOptions({
      where: condition,
      take: amount,
    });
    query.orderBy('RANDOM()');
    return (await query.getMany()).map((entity) => entity.toModel());
  }

  async create(model: WordModel): Promise<void> {
    const wordEntity = new WordEntity();
    wordEntity.id = model.id;
    wordEntity.word = model.word;
    wordEntity.en_definition = model.en_definition;
    wordEntity.vi_definition = model.vi_definition;
    wordEntity.type = model.type;
    wordEntity.pronunciation = model.pronunciation;
    wordEntity.synonym = model.synonym;
    wordEntity.antonym = model.antonym;
    wordEntity.example = model.example;
    wordEntity.note = model.note;
    await this.wordRepository.save(wordEntity);
  }
}
