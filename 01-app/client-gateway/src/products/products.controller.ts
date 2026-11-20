import { Body, Controller,Delete,Get,Param,Patch,Post,Inject, Logger } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config/services.js';
import { ClientProxy } from '@nestjs/microservices';


@Controller('products')
export class ProductsController {

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
  findAllProducts()
  {
    this.logger.log('peticion desde client-gateway')
    return this.productsClient.send({ cmd: 'find_all_products' },{});
  }

  @Get(':id')
  findOne(@Param('id') id: String)
  {
    return 'Esta funcion regresa el producto ' + id;
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
