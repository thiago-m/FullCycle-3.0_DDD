import { Table, Model, Column, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import ProductModel from '../../../product/repository/sequilize/product.model'
import type OrderModel from './order.model'
import { col } from 'sequelize'

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string

  @BelongsTo(() => ProductModel)
  declare product: ProductModel

  // @ts-ignore - require aqui evita o erro "Cannot access ... before initialization"
  @ForeignKey(() => require('./order.model').default)
  @Column({ allowNull: false })
  declare order_id: string
 
  // @ts-ignore - require aqui evita o erro "Cannot access ... before initialization"
  @BelongsTo(() => require('./order.model').default)
  declare order: OrderModel

  @Column({ allowNull: false })
  declare quantity: number

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare price: number

  @Column({ allowNull: false })
  declare total: number

}
