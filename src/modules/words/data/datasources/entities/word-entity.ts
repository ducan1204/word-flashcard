import { WordModel } from "src/modules/words/domain/models/word-model";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('words')
export default class WordEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    word: string;

    @Column()
    en_definition: string;

    @Column()
    vi_definition: string;

    @Column()
    type: string;

    @Column()
    pronunciation: string;

    @Column()
    synonym: string;

    @Column()
    antonym: string;

    @Column()
    example: string;

    @Column()
    note: string;

    toModel(): WordModel {
        return new WordModel(
            this.id,
            this.word,
            this.en_definition,
            this.vi_definition,
            this.type,
            this.pronunciation,
            this.example,
            this.synonym,
            this.antonym,
            this.note,
        )
    }
}