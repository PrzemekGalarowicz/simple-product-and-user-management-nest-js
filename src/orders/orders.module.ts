import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './db/orders.repository';
import { OrderedProductRepository } from './db/ordered-products.repository';
import { OrdersController } from './orders.controller';
import { OrdersDataService } from './orders-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository, OrderedProductRepository])],
  controllers: [OrdersController],
  providers: [OrdersDataService],
})
export class OrdersModule {}
