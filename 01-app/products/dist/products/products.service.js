var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
let ProductsService = class ProductsService extends PrismaClient {
    logger = new Logger('ProductsService');
    async onModuleInit() {
        await this.$connect();
        this.logger.log('Conectado a base de datos');
    }
    create(createProductDto) {
        return this.product.create({
            data: createProductDto
        });
    }
    async findAll(paginationDto) {
        const { page, limit } = paginationDto;
        const totalPages = await this.product.count({ where: { available: true } });
        const lastPage = Math.ceil(totalPages / limit);
        this.logger.log(`page: ${page} limit: ${limit} totalPages: ${totalPages} lastPage: ${lastPage}`);
        return {
            data: await this.product.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    available: true
                }
            }),
            meta: {
                total: totalPages,
                page: page,
                lastPage: lastPage,
            }
        };
    }
    async findOne(id) {
        const product = await this.product.findFirst({
            where: {
                id: id, available: true
            }
        });
        if (!product) {
            throw new RpcException(`Product with id ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        return await this.product.update({
            data: updateProductDto,
            where: { id },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.product.update({
            where: { id: id },
            data: { available: false }
        });
    }
};
ProductsService = __decorate([
    Injectable()
], ProductsService);
export { ProductsService };
//# sourceMappingURL=products.service.js.map