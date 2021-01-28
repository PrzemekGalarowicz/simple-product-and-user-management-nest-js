import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { ProductRepository } from '../products/db/products.repository';
import { Order } from './db/orders.entity'
import { OrderRepository } from './db/orders.repository';
import { OrderedProduct } from './db/ordered-products.entity'
import { OrderedProductRepository } from './db/ordered-products.repository';
import { User } from '../users/db/users.entity'
import { UserAddress } from '../users/db/user-address.entity'
import { Status } from './enums/status.enum'
import { Product } from 'src/products/db/products.entity';

@Injectable()
export class OrdersDataService {
  constructor(
    private orderRepository: OrderRepository,
    private orderedProductRepository: OrderedProductRepository,
    private connection: Connection,
  ) { }

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  getOrderById(id: string): Promise<Order> {
    return this.orderRepository.findOne(id);
  }

  async addOrderedProducts(items: CreateOrderedProductDto[]): Promise<OrderedProduct[]> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const productIds: string[] = await items.map(product => product.id);
      const products: Product[] = await manager.getCustomRepository(ProductRepository).findByIds(productIds);

      const orderedProductsToSave: OrderedProduct[] = await items.map(orderedProduct => {
        const product: Product = products.find(product => product.id === orderedProduct.id);
        const orderedProductToSave = new OrderedProduct();

        orderedProductToSave.id = orderedProduct.id;
        orderedProductToSave.count = orderedProduct.count;
        orderedProductToSave.price = product.price;
        orderedProductToSave.product = product;

        return orderedProductToSave;
      })

      return await manager
        .getCustomRepository(OrderedProductRepository)
        .save(orderedProductsToSave);
    });
  }

  async addOrder(item: CreateOrderDto): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToSave = new Order();    

      const products: OrderedProduct[] = await this.addOrderedProducts(item.products)

      orderToSave.totalPrice = await this.getTotalPrice(products)
      orderToSave.products = products

      orderToSave.additionalInformation = item.additionalInformation;

      orderToSave.status = 'NEW' as Status;

      orderToSave.user = new User();
      orderToSave.user.id = item.userId;

      orderToSave.userAddress = new UserAddress();
      orderToSave.userAddress.id = item.userAddressId;

      return await manager
        .getCustomRepository(OrderRepository)
        .save(orderToSave);
    });
  }

  async updateOrder(id: string, item: UpdateOrderDto): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      await manager.getCustomRepository(OrderedProductRepository).deleteProductOrderByOrderId(id);

      const orderToSave = new Order();

      const products: OrderedProduct[] = await this.addOrderedProducts(item.products)

      orderToSave.totalPrice = await this.getTotalPrice(products)
      orderToSave.products = products

      orderToSave.additionalInformation = item.additionalInformation;

      orderToSave.status = 'NEW' as Status;

      orderToSave.user = new User();
      orderToSave.user.id = item.userId;

      orderToSave.userAddress = new UserAddress();
      orderToSave.userAddress.id = item.userAddressId;

      return await manager
        .getCustomRepository(OrderRepository)
        .save(orderToSave);
    });
  }

  async deleteOrder(id: string): Promise<void> {
    this.orderRepository.delete(id);
  }

  async getTotalPrice(products: OrderedProduct[]): Promise<number> {
    return await products.reduce((prev, curr) => prev + curr.price, 0) 
  }
}
