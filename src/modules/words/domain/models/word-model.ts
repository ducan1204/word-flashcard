import { DomainModel } from "src/core/models/domain-model";

export class WordModel extends DomainModel {
    public readonly id: string;
    public readonly word: string;
    public readonly en_definition: string;
    public readonly vi_definition: string;
    public readonly pronunciation: string;
    public readonly type: string;
    public readonly example: string;
    public readonly synonym: string;
    public readonly antonym: string;
    public readonly note: string;

    constructor(
        id: string,
        word: string,
        en_definition: string,
        vi_definition: string,

        type: string,
        example: string,
        pronunciation: string,
        synonym: string,
        antonym: string,
        note: string,
    ) {
        super();
        this.id = id;
        this.word = word;
        this.en_definition = en_definition;
        this.vi_definition = vi_definition;
        this.type = type;
        this.pronunciation = pronunciation;
        this.example = example;
        this.synonym = synonym;
        this.antonym = antonym;
        this.note = note;
    }

    public toJson(showHidden: boolean): Record<string, any> {
        return {
            id: this.id,
            word: this.word,
            en_definition: this.en_definition,
            vi_definition: this.vi_definition,
            type: this.type,
            pronunciation: this.pronunciation,
            example: this.example,
            synonym: this.synonym,
            antonym: this.antonym,
            note: this.note,
        }
    }
}