import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.reawardsPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zip: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.reawardsPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;

    try {
      customerModel = await CustomerModel.findOne({ where: { id } });
      if (!customerModel) {
        throw new Error("Customer not found");
      }
    } catch (error) {
      throw new Error("Customer not found");
    }
    

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zip,
      customerModel.city
    );
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModel = await CustomerModel.findAll();
    
    const customers: Customer[] = customerModel.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city
      );
      customer.changeAddress(address);
      return customer
    });

    return customers;
  }

}