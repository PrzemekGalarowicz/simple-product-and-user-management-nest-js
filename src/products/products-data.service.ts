import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import { IProduct } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsDataService {
  private products: Array<IProduct> = []

  getAllProducts(): Array<IProduct> {
    return this.products
  }

  getProductById(id: string): IProduct {
    return this.products.find(product => product.id === id)
  }

  getProductByIndex(id: string): number {
    return this.products.findIndex(product => product.id === id)
  }

  addProduct(newProduct: CreateProductDto): IProduct {
    const date = new Date()
    const product = {
      ...newProduct,
      id: uuidv4(),
      createdAt: date,
      updatedAt: date
    }
    this.products.push(product)
    return product
  }

  updateProduct(id: string, dto: UpdateProductDto): IProduct {
    const productIndex = this.getProductByIndex(id)
    const currentProduct = this.getProductById(id)
    const updatedProduct = {
      ...currentProduct,
      name: dto.name,
      price: dto.price,
      count: dto.count,
      tags: dto.tags,
      updatedAt: new Date()
    }
    this.products[productIndex] = updatedProduct
    return updatedProduct
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter(product => product.id !== id)
  }
}
