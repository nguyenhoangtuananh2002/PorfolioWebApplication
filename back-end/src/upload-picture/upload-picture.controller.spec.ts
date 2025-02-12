import { Test, TestingModule } from '@nestjs/testing';
import { UploadPictureController } from './upload-picture.controller';
import { UploadPictureService } from './upload-picture.service';

describe('UploadPictureController', () => {
  let controller: UploadPictureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadPictureController],
      providers: [UploadPictureService],
    }).compile();

    controller = module.get<UploadPictureController>(UploadPictureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
