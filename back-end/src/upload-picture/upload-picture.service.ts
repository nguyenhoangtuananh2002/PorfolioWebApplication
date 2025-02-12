import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class UploadPictureService {
  handleFileUpload(file: Express.Multer.File) {
    const filePath = file.path
    fs.readFileSync(filePath)
    return {
      message: 'file upload successfully',
      filename: file.filename
    }
  }

  getPicture(filename: string, res:Response)
  {
    const filepath = path.join(__dirname,'../../src/assets',filename)
    if(fs.existsSync(filepath))
    {
      res.setHeader('Content-Type', 'image/jpeg')
      res.sendFile(filepath)
    }
    else
    {
      res.status(400).send({message: 'file not found'})
    }
  }
}
