import * as uuid from "uuid";
import Customer from "../../customer/entity/customer";
import Order from "../../entity/order";
import OrderItem from "../entity/order_item";

export default class ProductService {
    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if(items.length === 0) throw new Error("Order must have at least one item");

        const order = new Order(uuid.v4(), customer.id, items);
        customer.addReawardsPoints(order.total() / 2);
        
        return order;
    }

    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }
}
