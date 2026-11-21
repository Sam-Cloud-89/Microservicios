import { Injectable,Logger,NotFoundException,OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../common/index.js';
import { number } from 'joi';
import { RpcException } from '@nestjs/microservices';

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
    const totalPages = await this.product.count({where: {available:true}});
    const lastPage = Math.ceil( totalPages / limit);

    this.logger.log(`page: ${page} limit: ${limit} totalPages: ${totalPages} lastPage: ${lastPage}`);

    return {
      data: await this.product.findMany({
        skip: ( page -1 ) * limit,
        take: limit,
        where:
        {
          available: true
        }
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
        id: id, available: true
      }
    });

    if( !product )
    {
      //throw new NotFoundException(`Product with id ${id} not found`);
      throw new RpcException(`Product with id ${id} not found`);
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

  async remove(id: number) {
    //return `This action removes a #${id} product`;
    await this.findOne(id);
    return await this.product.update(
      {
        where:{id:id},
        data:{available:false}
      }
    )
      /* return this.product.delete({
      where :{id:id}
    });
    */
  }




  
}
