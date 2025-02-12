import { PartialType } from '@nestjs/mapped-types';
import { CreateUploadPictureDto } from './create-upload-picture.dto';

export class UpdateUploadPictureDto extends PartialType(CreateUploadPictureDto) {}
