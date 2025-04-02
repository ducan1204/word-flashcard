import { Body, Controller, Get, Post, Render, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs/promises';
import { diskStorage } from 'multer';
import * as pdfParse from 'pdf-parse';
import { AppService } from '../../../../../data/services/app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('home')
  @Render('index')
  homePage() {
    return {};
  }
}
