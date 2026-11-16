import { Injectable,Logger,NotFoundException,OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../common/index.js';
import { number } from 'joi';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('ProductsService');
  async onModuleInit() {
    // Esto conecta tu aplicación con la base de datos al arrancar
    await this.$connect();
    //console.log('Conectado a base de datos');
    this.logger.log('Conectado a base de datos');
  }


  create(createProductDto: CreateProductDto) {
    return this.product.create
    ({
      data:createProductDto
    });
    //return 'This action adds a new product';
  }

  async findAll(paginationDto: PaginationDto) 
  {
    const { page, limit } = paginationDto;
    const totalPages = await this.product.count();
    const lastPage = Math.ceil( totalPages / limit);

    return {
      data: await this.product.findMany({
        skip: ( page -1 ) * limit,
        take: limit,
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      }
    }



    //return `This action returns all products`;
  }

  async findOne(id: number) {
    //return `This action returns a #${id} product`;
    const product=  await this.product.findFirst({
      where: {
        id: id
      }
    });

    if( !product )
    {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
     // Prisma lanzará un error automático si el ID no existe, 
    // que puedes capturar o dejar que NestJS convierta en un 404 / 500
    return await this.product.update({
      data: updateProductDto,
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }


  
}
