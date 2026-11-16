import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../common/index.js';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @MessagePattern({ cmd: 'create_product'})
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  
  @MessagePattern({ cmd: 'find_all'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'find_one_product'})
  findOne(@Payload('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @MessagePattern({ cmd: 'update_product'})
  update(@Payload() updateProductDto: UpdateProductDto) { 
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern({ cmd: 'delete_product'})
  remove(@Payload('id') id: string) {
    return this.productsService.remove(+id);
  }

}


//ANTES
/*@Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  
  //Parámetros de consulta (Query Parameters / ?param=valor)  
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  // Parámetros de ruta (Route Parameters / :id)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) { 
    /*return {
      id,
      updateProductDto
    }*/
   /* return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }*/