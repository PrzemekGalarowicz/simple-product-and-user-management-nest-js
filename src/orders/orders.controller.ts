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
import { OrdersDataService } from './orders-data.service';
import { Order } from './db/orders.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { ExternalOrderDto } from './dto/external-order.dto'

@Controller('orders')
export class OrdersController {
  constructor(private orderRepository: OrdersDataService) { }
  
  @Get()
  async getAllOrders(): Promise<ExternalOrderDto[]> {
    const orders = await this.orderRepository.getAllOrders();
    return orders.map((order) => this.mapOrderToExternal(order));
  }

  @Get(':id')
  async getOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderRepository.getOrderById(id)
    );
  }

  @Post()
  async addOrder(@Body() order: CreateOrderDto): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderRepository.addOrder(order)
    );
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatedOrder: UpdateOrderDto,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderRepository.updateOrder(id, updatedOrder)
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.orderRepository.deleteOrder(id)
  }

  mapOrderToExternal(order: Order): ExternalOrderDto {
    const products = order.products.map(product => ({
      orderedProductId: product.id,
      productId: product.product.id,
      name: product.product.name,
      price: product.price,
      count: product.count,
    }))
    const externalOrder = {
      ...order,
      products,
      user: {
        firstName: order.user.firstName,
        lastName: order.user.lastName,
        email: order.user.email,
        address: null
      },
      createdAt: new Date(order.createdAt).toISOString()
    }

    return externalOrder;
  }
}
