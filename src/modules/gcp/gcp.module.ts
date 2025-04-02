import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GCPController } from "./app/http/controllers/api/v1/gcp-conntrollers";
import gcp from "./config/gcp";
import { SpreadSheetService } from "./data/services/google-sheet-service";

@Module({
    imports: [ConfigModule.forRoot({
        load: [gcp]
    })],
    controllers: [GCPController],
    providers: [SpreadSheetService],
    exports: [],
})
export class GCPModule { }