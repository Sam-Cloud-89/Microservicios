import { Body, Controller,Delete,Get,Param,Patch,Post,Inject,Query, Logger } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config/services.js';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../common/index.js';


@Controller('products')
export class ProductsController {

  log: String = 'Peticion desde client-gateway --> ';
  private readonly logger = new Logger('ProductsController_ClientGateway');
  constructor(
  @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy) 
  {}

  @Post()
  createProduct()
  {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto)
  {
    this.logger.log(this.log + 'find_all_products');
    return this.productsClient.send({ cmd: 'find_all_products' },paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: String)
  {
    this.logger.log(this.log + 'find_one_product')
    return this.productsClient.send({ cmd: 'find_one_product'},{ id })
    //return 'Esta funcion regresa el producto ' + id;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: String)
  {
    return 'Esta funcion elimina el producto ' + id;
  }

  @Patch(':id')
  patchProduct(@Param('id') id:String,@Body() body:any)
  {
    return 'Esta funcion actualiza el producto ' + id;
  }
}
