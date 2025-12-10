import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import Order from "../../domain/entity/order";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import ProductRepository from "./product.repository";
import OrderRepository from "./order.repository";
// import { setupAssociations } from "../db/sequelize/associations/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
      models: [CustomerModel, OrderModel, OrderItemModel, ProductModel],
    });
    // setupAssociations();
    // await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street 1", 123, "12345", "City");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
    const order = new Order("o1", customer.id, [orderItem]);

    console.log('order', order);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: "o1" }, include: ["items"] });
    console.log('orderModel', orderModel!.toJSON());

    expect(orderModel!.toJSON()).toStrictEqual({
      id: "o1",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          product_id: product.id,
          price: product.price,
          quantity: orderItem.quantity,
          total: orderItem.orderItemTotal(),
          order_id: order.id,
        },
      ],
    });
  });

});
