import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../common/index.js';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        name: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: {
            name: string;
            price: number;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        }[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(id: string): Promise<{
        name: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: string): string;
}
