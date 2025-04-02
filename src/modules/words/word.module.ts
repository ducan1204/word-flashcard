import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WordController } from "./app/http/controllers/api/v1/word.controller";
import WordEntity from "./data/datasources/entities/word-entity";
import { WordDataSource } from "./data/datasources/word-datasource";
import { CheckWordUsecase } from "./domain/usecases/check-word-usecase";
import { GetQuizUsecase } from "./domain/usecases/get-quiz-usecase";

@Module({
    imports: [TypeOrmModule.forFeature([WordEntity])],
    controllers: [WordController],
    providers: [WordDataSource, CheckWordUsecase, GetQuizUsecase],
    exports: [WordDataSource],
})
export class WordModule { }