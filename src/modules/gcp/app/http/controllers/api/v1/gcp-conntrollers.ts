import { Controller, Get } from "@nestjs/common";
import { SpreadSheetService } from "src/modules/gcp/data/services/google-sheet-service";

@Controller()
export class GCPController {

    constructor(private readonly spreadSheetService: SpreadSheetService) {

    }
    @Get('gcp')
    async getGCP() {
        const data = await this.spreadSheetService.listSpreadsheets();
        console.log(data);
        return data;
    }

    @Get('gcp/details')
    async getGCPDetails() {
        const data = await this.spreadSheetService.getSheetData('1Y_Da31WcVWiGHYzu1qZRomS0a66fqx5nvFOq1Le4IMM', 'Sheet1!A1:G30')
        console.log(data);
        return data;
    }
}