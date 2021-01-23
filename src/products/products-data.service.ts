import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './db/products.repository'
import { TagRepository } from './db/tag.repository'
import { Product } from './db/products.entity'
import { Tag } from './db/tag.entity'

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository
  ) { }

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  getProductById(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async addProduct(item: CreateProductDto): Promise<Product> {
    const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
    const productToSave = new Product();

    productToSave.name = item.name;
    productToSave.price = item.price;
    productToSave.count = item.count;
    productToSave.tags = tags;

    return this.productRepository.save(productToSave);
  }

  async updateProduct(id: string, item: UpdateProductDto): Promise<Product> {
    const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
    const productToUpdate = await this.getProductById(id);

    productToUpdate.name = item.name;
    productToUpdate.price = item.price;
    productToUpdate.count = item.count;
    productToUpdate.tags = tags;

    await this.productRepository.save(productToUpdate);

    return await this.getProductById(id);
  }

  async deleteProduct(id: string): Promise<void> {
    this.productRepository.delete(id);
  }
}
