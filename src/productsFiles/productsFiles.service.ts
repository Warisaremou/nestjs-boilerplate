import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsFilesEntity } from './entities/productsFiles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsFilesService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ProductsFilesEntity)
    private productsFileRepository: Repository<ProductsFilesEntity>,
  ) {}

  async uploadFile(file): Promise<ProductsFilesEntity> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const path = {
      local: `/${this.configService.get('app.apiPrefix')}/v1/${file.path}`,
      s3: file.location,
    };

    return this.productsFileRepository.save(
      this.productsFileRepository.create({
        path: path[this.configService.get('file.driver')],
      }),
    );
  }
}
