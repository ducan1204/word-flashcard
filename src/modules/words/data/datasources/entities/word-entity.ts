import { WordModel } from "src/modules/words/domain/models/word-model";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('words')
export default class WordEntity {
    @PrimaryColumn()
    ID: number;

    @Column()
    Word: string;

    @Column()
    En_Definition: string;

    @Column()
    Vi_Definition: string;

    @Column()
    Type: string;

    @Column()
    Pronunciation: string;

    @Column()
    Synonym: string;

    @Column()
    Antonym: string;

    @Column()
    Example: string;

    @Column()
    Note: string;

    toModel(): WordModel {
        return new WordModel(
            this.ID,
            this.Word,
            this.En_Definition,
            this.Vi_Definition,
            this.Type,
            this.Pronunciation,
            this.Example,
            this.Synonym,
            this.Antonym,
            this.Note,
        )
    }
}