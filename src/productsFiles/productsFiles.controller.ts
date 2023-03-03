import {
  Controller,
  Get,
  Param,
  Post,
  Response,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductsFilesService } from './productsFiles.service';

@ApiTags('Products_Files')
@Controller({
  path: 'products_files',
  version: '1',
})
export class ProductsFilesController {
  constructor(private readonly prodctsFilesService: ProductsFilesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 4))
  async uploadFile(@UploadedFiles() files) {
    return this.prodctsFilesService.uploadFiles(files);
  }

  @Get(':path')
  download(@Param('path') path, @Response() response) {
    return response.sendFile(path, { root: './products_files' });
  }
}
