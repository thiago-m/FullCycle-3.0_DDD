import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "../../../order/repository/sequilize/order.model";
import OrderItemModel from "./order-item.model";
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface'
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        total: item.total
      }))
      }, {
        include: [{model: OrderItemModel}]
      }
    )
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          total: item.total
        }))
      },
      {
        where: {
          id: entity.id,
        }
      }
    )
  }


  async find(id: string): Promise<Order | null> {
    const orderModel = await OrderModel.findByPk(id, {
      include: [{ model: OrderItemModel, as: 'items' }]
    })
    if (!orderModel) return null

    const order = new Order(
      orderModel.id,
      orderModel.customer_id, 
      orderModel.items.map((itemModel: any) => new OrderItem(
        itemModel.id,
        itemModel.product_id,
        itemModel.name,
        itemModel.price,
        itemModel.quantity
      )
    ))

    return order
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({
      include: [{ model: OrderItemModel, as: 'items' }]
    })

    return ordersModel.map((orderModel: any) => {
      const order = new Order(
        orderModel.id,
        orderModel.customer_id, 
        orderModel.items.map((itemModel: any) => new OrderItem(
          itemModel.id,
          itemModel.product_id,
          itemModel.name,
          itemModel.price,
          itemModel.quantity
        )
      ))
      return order
    })
  }

  async delete(id: string): Promise<void> {
    const order = await OrderModel.findByPk(id)
    if (!order) {
      throw new Error(`Order with id ${id} not found`)
    }
    await order.destroy()
  }
}
