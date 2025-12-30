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
  let orderRepository: OrderRepository

  // beforeEach(async () => {
  //   orderRepository = new OrderRepository()
  //   await sequelize.sync({ force: true })
  // })
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

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: "o1" }, include: ["items"] });

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

  it("should update an order", async () => {
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

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.changeItems([ new OrderItem("o2", product.id, product.name, product.price, 3) ]);  
    
    await orderRepository.update(order);
    
    const orderModel2 = await OrderModel.findOne({ where: { id: "o1" }, include: ["items"] });
        
    expect(orderModel2).not.toBeNull();
    expect(orderModel2!.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: '1',
          name: product.name,
          price: product.price,
          quantity: 2,
          order_id: order.id,
          product_id: product.id,
          total: 200
        },
      ],
    })
  });

  it("should find an order by id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "John Doe");
    customer.changeAddress(new Address("Street", 1, "00000", "City"));
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 100);
    await productRepository.create(product);

    const item = new OrderItem("i1", product.id, product.name, product.price, 2);
    const order = new Order("o1", customer.id, [item]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find("o1");

    expect(foundOrder).not.toBeNull();
    expect(foundOrder!.id).toBe("o1");
    expect(foundOrder!.customerId).toBe("c1");
    expect(foundOrder!.items.length).toBe(1);
    expect(foundOrder!.total()).toBe(200);
  });

  it("should return null when order is not found", async () => {
    const orderRepository = new OrderRepository();
    const order = await orderRepository.find("not-exists");

    expect(order).toBeNull();
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "John Doe");
    customer.changeAddress(new Address("Street", 1, "00000", "City"));
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 100);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();

    const order1 = new Order(
      "o1",
      customer.id,
      [new OrderItem("i1", product.id, product.name, product.price, 1)]
    );

    const order2 = new Order(
      "o2",
      customer.id,
      [new OrderItem("i2", product.id, product.name, product.price, 2)]
    );

    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders.length).toBe(2);
  });

  it("should delete an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "John Doe");
    customer.changeAddress(new Address("Street", 1, "00000", "City"));
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 100);
    await productRepository.create(product);

    const order = new Order(
      "o1",
      customer.id,
      [new OrderItem("i1", product.id, product.name, product.price, 1)]
    );

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    await orderRepository.delete("o1");

    const orderModel = await OrderModel.findByPk("o1");
    const items = await OrderItemModel.findAll({ where: { order_id: "o1" } });

    expect(orderModel).toBeNull();
    expect(items.length).toBe(0);
  });

  it("should throw error when deleting non-existing order", async () => {
    const orderRepository = new OrderRepository();

    await expect(orderRepository.delete("invalid-id"))
      .rejects
      .toThrow("Order with id invalid-id not found");
  });
});