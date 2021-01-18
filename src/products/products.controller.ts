import { Controller, Get, Post, Param, Body, Put, Delete, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsDataService } from './products-data.service';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {

  }

  @Get()
  getAllProducts(): Array<ExternalProductDto> {
    return this.productRepository.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): ExternalProductDto {
    return this.productRepository.getProductById(id)
  }

  @Post()
  addProduct(@Body() product: CreateProductDto): ExternalProductDto {
    return this.productRepository.addProduct(product)
  }

  @Put(':id')
  updateProduct(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updatedProduct: UpdateProductDto): ExternalProductDto {
    return this.productRepository.updateProduct(id, updatedProduct)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    this.productRepository.deleteProduct(id);
  }
}
