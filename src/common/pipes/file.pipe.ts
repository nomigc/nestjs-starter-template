import { CustomBadRequestException } from '@/utils';
import { Injectable, PipeTransform } from '@nestjs/common';
import { ParseFilePipeBuilder } from '@nestjs/common';

/** 
  Pipe for validate file. This will validate file's type and size
  @param {String} fileIsRequired pass true if file is required else false
*/
@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly fileIsRequired: boolean = true,
    private readonly fileName: string | null = null,
  ) {}

  transform(value: any) {
    return new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /(jpg|jpeg|png)$/,
      })
      .addMaxSizeValidator({
        maxSize: 5 * 1024 * 1024, // 5MB
      })
      .build({
        fileIsRequired: this.fileIsRequired,
        exceptionFactory: (error) => {
          let message =
            'Invalid file. Only JPG, JPEG, and PNG files under 5MB are allowed';

          if (error === 'File is required') {
            message = `${this.fileName} is required`;
          }

          throw new CustomBadRequestException(message);
        },
      })
      .transform(value);
  }
}
