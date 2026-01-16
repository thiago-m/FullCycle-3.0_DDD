import Order from '../../entity/order'

export default interface OrderRepository {
  create(order: Order): Promise<void>
  update(order: Order): Promise<void>
  find(id: string): Promise<Order | null>
  findAll(): Promise<Order[]>
  delete(id: string): Promise<void>
}
