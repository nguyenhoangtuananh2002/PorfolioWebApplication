import { Module } from '@nestjs/common';
import { UploadPictureService } from './upload-picture.service';
import { UploadPictureController } from './upload-picture.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './src/assets'
    })
  ],
  controllers: [UploadPictureController],
  providers: [UploadPictureService],
})
export class UploadPictureModule {}
