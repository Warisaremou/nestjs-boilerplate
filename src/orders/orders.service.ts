import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { OrderStatus } from 'src/statuses/entities/orderStatus.entity';
import { OrderStatusEnum } from 'src/statuses/orderStatus.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // let orderStatus = null;

    // switch (true) {
    //   case createOrderDto.is_cancelled:
    //     orderStatus = OrderStatusEnum.annuler;
    //     break;
    //   case createOrderDto.is_delivered:
    //     orderStatus = OrderStatusEnum.expedier;
    //     break;
    //   case createOrderDto.payment !== null:
    //     orderStatus = OrderStatusEnum.valider;
    //     break;
    //   default:
    //     orderStatus = OrderStatusEnum.attente;
    //     break;
    // }

    const createOrder = await this.ordersRepository.create({
      ...createOrderDto,
      status: {
        id: OrderStatusEnum.attente,
      } as OrderStatus,
    });

    // if payment not made, then order status is "en attente de paiement" else "valider" if delivery is made "expédier" if user cancel order "annuler"
    // if (createOrderDto.payment == null) {
    //   createOrder.status = 'en attente de paiement';
    // } else {
    //   createOrder.status = 'valider';
    // }
    // if (createOrderDto.is_delivered == true) {
    //   createOrder.status = 'expédier';
    // } else if (createOrderDto.is_cancelled == true) {
    //   createOrder.status = 'annuler';
    // }

    return this.ordersRepository.save(createOrder);
  }

  findAll() {
    const orderRpository = this.ordersRepository.find();
    return orderRpository;
  }

  findOne(id: number) {
    const orderRepository = getRepository(Orders);
    const order = orderRepository.findOne(id);
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `update #${id} order with ${updateOrderDto}`;
  }

  async softDelete(id: number) {
    await this.ordersRepository.softDelete(id);
  }
}
