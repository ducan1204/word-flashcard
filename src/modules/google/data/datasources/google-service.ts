import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { throwError } from '../../../../core/helpers/utils';

@Injectable()
export class GoogleService {
  private sheets;
  private drive: any;
  constructor() {
    const credentials = JSON.parse(
      process.env.GOOGLE_SERVICES_JSON ?? throwError('GOOGLE_SERVICES_JSON is not defined')
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets.readonly',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
      ],
    });

    const authClient = auth.getClient();

    this.sheets = google.sheets({ version: 'v4', auth });
    this.drive = google.drive({ version: 'v3', auth });
  }

  async getSheetData(spreadSheetId: string, range: string): Promise<any[][]> {
    const res = await this.sheets.spreadsheets.values.get({
      spreadsheetId: spreadSheetId,
      range,
    });

    return res.data.values ?? [];
  }

  async getSheetIds(): Promise<string[]> {
    const authClient = await new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICES_JSON!),
      scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
    }).getClient();

    // const drive = google.drive({ version: 'v3', authClient });

    const res = await this.drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      // fields: 'files(id, name)',
    });

    if (!res.data.files || res.data.files.length === 0) {
      throw new Error('No spreadsheets found.');
    }

    return res.data.files.map((file) => `${file.name} (${file.id})`);
  }
}
