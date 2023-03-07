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

  async uploadFiles(files): Promise<ProductsFilesEntity> {
    if (!files) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'Selectionner les images',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    console.log(files);

    const paths = [];
    if (Array.isArray(files)) {
      for (let i = 0; i < files.length; i++) {
        const path = {
          local: `/${this.configService.get('app.apiPrefix')}/v1/${
            files[i].path
          }`,
          s3: files[i].location,
        };

        paths.push(path[this.configService.get('file.driver')]);
      }
    }

    if (paths.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'Selectionner les images',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.productsFileRepository.save(
      this.productsFileRepository.create({
        path: paths,
      }),
    );
  }
}
