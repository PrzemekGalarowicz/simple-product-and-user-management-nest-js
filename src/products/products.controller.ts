import { Controller, Get, Post, Param, Body, Put, Delete, HttpCode } from '@nestjs/common';
import { IProduct } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsDataService } from './products-data.service';
import { dateToArray } from '../shared/helpers/date.helper';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {

  }

  @Get()
  getAllProducts(): Array<ExternalProductDto> {
    return this.productRepository.getAllProducts().map(product => this.mapProductToExternal(product));
  }

  @Get(':id')
  getProductById(@Param('id') _id_: string): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.getProductById(_id_)
    );
  }

  @Post()
  addProduct(@Body() product: CreateProductDto): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.addProduct(product)
    );
  }

  @Put(':id')
  updateProduct(@Param('id') _id_: string, @Body() updatedProduct: UpdateProductDto): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(_id_, updatedProduct)
    );
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') _id_: string): void {
    this.productRepository.deleteProduct(_id_);
  }

  mapProductToExternal(product: IProduct): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }
}
