import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import * as path from 'path';

@Injectable()
export class SpreadSheetService {
    private sheets;
    private drive;
    constructor() {
        const apiKey = process.env.GOOGLE_API_KEY;
        const file = 'dict-446603-93d208e8664a.json';
        const keyFilePath = path.join(__dirname, '../../../../../src/modules/gcp/config', file);

        const auth = new google.auth.GoogleAuth({
            keyFile: keyFilePath,
            scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
        });
        this.drive = google.drive({ version: 'v3', auth });
        this.sheets = google.sheets({ version: 'v4', auth });
    }

    public async listSpreadsheets() {
        try {
            const res = await this.drive.files.list({
                q: "mimeType='application/vnd.google-apps.spreadsheet'",
                fields: 'files(id, name)',
            });
            console.log(res);
            return res.data.files;
        } catch (e) {
            console.log(e);
        }
    }

    public async getSheetData(spreadsheetId: string, range: string) {
        try {
            // const sheests = await this.sheets.spreadsheets.get({
            //     spreadsheetId,
            // });
            // console.log(sheests);
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
            return response.data.values;
            // return sheests;
        } catch (error) {
            console.error('Error getting sheet data:', error);
            throw new Error('Failed to get sheet data');
        }
    }
}