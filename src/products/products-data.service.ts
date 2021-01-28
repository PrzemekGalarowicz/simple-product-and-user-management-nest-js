import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './db/products.repository';
import { TagRepository } from './db/tag.repository';
import { Product } from './db/products.entity';

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
    private connection: Connection,
  ) {}

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  getProductById(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async addProduct(item: CreateProductDto): Promise<Product> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const productToSave = new Product();

      productToSave.name = item.name;
      productToSave.price = item.price;
      productToSave.count = item.count;
      productToSave.tags = await manager
        .getCustomRepository(TagRepository)
        .findTagsByName(item.tags);

      return await manager
        .getCustomRepository(ProductRepository)
        .save(productToSave);
    });
  }

  async updateProduct(id: string, item: UpdateProductDto): Promise<Product> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const productToSave = await this.getProductById(id);

      productToSave.name = item.name;
      productToSave.price = item.price;
      productToSave.count = item.count;
      productToSave.tags = await manager
        .getCustomRepository(TagRepository)
        .findTagsByName(item.tags);

      return await manager
        .getCustomRepository(ProductRepository)
        .save(productToSave);
    });
  }

  async deleteProduct(id: string): Promise<void> {
    this.productRepository.delete(id);
  }
}
