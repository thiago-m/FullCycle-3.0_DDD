// import OrderModel from '../model/order.model'
// import OrderItemModel from '../model/order-item.model'
// import CustomerModel from '../model/customer.model'

// export const setupAssociations = () => {
//   // customer 1:N orders
//   CustomerModel.hasMany(OrderModel, {
//     foreignKey: 'customer_id',
//     as: 'orders',
//   });
//   CustomerModel.belongsTo(CustomerModel, {
//     foreignKey: 'customer_id',
//     as: 'customer',
//   });

//   // order 1:N order items
// //   OrderModel.hasMany(OrderItemModel, {
// //     foreignKey: 'order_id',
// //     as: 'items',
// //   });
// //   OrderItemModel.belongsTo(OrderModel, {
// //     foreignKey: 'order_id',
// //     as: 'order',
// //   });
// };