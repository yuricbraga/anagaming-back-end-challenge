import { Controller, Get, Inject, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CSV_PROCESS_SERVICE_RABBITMQ } from './constants';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CSV_PROCESS_SERVICE_RABBITMQ) private readonly client: ClientProxy,
  ) {}

  @Post('uploadcsv')
  @UseInterceptors(FileInterceptor('file'))
  uploadCSV(@UploadedFile() file: Express.Multer.File) {
    this.appService.uploadCSV(file, this.client);

    return {
      message: 'File was uploaded and is being processed',
    };
  }
}
