import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsDataService } from './products-data.service';
import { TagRepository } from './db/tag.repository';
import { ProductRepository } from './db/products.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagRepository]),
    TypeOrmModule.forFeature([ProductRepository]),
  ],
  controllers: [ProductsController],
  providers: [ProductsDataService],
})
export class ProductsModule {}
