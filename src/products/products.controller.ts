import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsDataService } from './products-data.service';
import { RoleGuard } from '../shared/guards/role.guard';
import { Product } from './db/products.entity'

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get()
  async getAllProducts(): Promise<ExternalProductDto[]> {
    const products = await this.productRepository.getAllProducts()
    return products.map(product => this.mapProductToExternal(product))
  }

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productRepository.getProductById(id)
    );
  }

  @Post()
  @UseGuards(RoleGuard)
  async addProduct(@Body() product: CreateProductDto): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productRepository.addProduct(product)
    );
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatedProduct: UpdateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productRepository.updateProduct(id, updatedProduct)
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.productRepository.deleteProduct(id);
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: new Date(product.createdAt).toISOString(),
      updatedAt: new Date(product.updatedAt).toISOString(),
      tags: product.tags?.map(i => i.name)
    };
  }
}
