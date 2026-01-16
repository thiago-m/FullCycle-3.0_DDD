import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street 1", 123, "12345", "City");
    customer.Address = address;
    
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel!.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.reawardsPoints,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street 1", 123, "12345", "City");
    customer.Address = address;
    
    await customerRepository.create(customer);

    customer.changeName("Jane Doe");
    await customerRepository.update(customer);
    
    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });
    expect(customerModel!.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.reawardsPoints,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street 1", 123, "12345", "City");
    customer.Address = address;

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find("123");

    expect(foundCustomer).toStrictEqual(customer);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("456");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("123", "John Doe");
    const address1 = new Address("Street 1", 123, "12345", "City");
    customer1.Address = address1;

    const customer2 = new Customer("456", "Jane Doe");
    const address2 = new Address("Street 2", 456, "67890", "City");
    customer2.Address = address2;

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });

});
