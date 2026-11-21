import { Body, Controller,Delete,Get,Param,Patch,Post,Inject,Query, Logger, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config/services.js';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common/index.js';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';


@Controller('products')
export class ProductsController {

  log: String = 'Peticion desde client-gateway --> ';
  private readonly logger = new Logger('ProductsController_ClientGateway');
  constructor(
  @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy) 
  {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto)
  {
    return this.productsClient.send({ cmd: 'create_product'},createProductDto)
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto)
  {
    this.logger.log(this.log + 'find_all_products');
    return this.productsClient.send({ cmd: 'find_all_products' },paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: String)
  {
    this.logger.log(this.log + 'find_one_product')
    try{
      //Función : firstValueFrom. Se suscribe por debajo, toma el primer valor que llegue, cancela la suscripción y te resuelve la Promise. Un Observable
      const product = await firstValueFrom(this.productsClient.send({ cmd: 'find_one_product'},{ id }));

      return product;
    }
    catch(error)
    { 
      /*if (error instanceof Error) {
        throw new RpcException(error.message);
      }*/
      throw new BadRequestException(error);
    }
    //return this.productsClient.send({ cmd: 'find_one_product'},{ id });
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: String)
  {
    return this.productsClient.send({ cmd: 'delete_product'},{ id });
  }

  @Patch(':id')
  patchProduct(
    @Param('id',ParseIntPipe) id:number,
    @Body() updateProductDto:UpdateProductDto)
  {
   return this.productsClient.send({ cmd: 'update_product' },
      {
        id,
        ...updateProductDto,   
      },
    ).pipe(catchError(error => {throw new RpcException(error)}));
  }
}
