import {
  Controller,
  Get,
  Param,
  Post,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductsFilesService } from './productsFiles.service';

@ApiTags('Products_Files')
@Controller({
  path: 'files/products',
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
  @UseInterceptors(FileInterceptor('product_img'))
  async uploadFile(@UploadedFile() file) {
    return this.prodctsFilesService.uploadFile(file);
  }

  @Get(':path')
  download(@Param('path') path, @Response() response) {
    return response.sendFile(path, { root: './files/products_files' });
  }
}
