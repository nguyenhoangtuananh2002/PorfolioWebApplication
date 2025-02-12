import { Controller, Post, Get, Param, Res, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPictureService } from './upload-picture.service';
import { Response } from 'express';
import { Public } from 'src/decorator/public.decorator';

@Controller('upload-picture')
export class UploadPictureController {
  constructor(private readonly uploadPictureService: UploadPictureService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPicture(@UploadedFile() file: Express.Multer.File) {
    console.log('File: ' , file)
    if (!file)
    {throw new BadRequestException('file is required')}
    return this.uploadPictureService.handleFileUpload(file);
  }

  @Get(':filename')
  @Public()
  getPicture(@Param('filename') filename: string, @Res() res: Response) {
    return this.uploadPictureService.getPicture(filename, res);
  }
}
