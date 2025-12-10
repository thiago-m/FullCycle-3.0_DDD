import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";
import Customer from "../entity/customer";

describe("Order service unit tests", () => {
    it("Should get total of all orders", () => {
        const orderItem1 = new OrderItem("1", "Product 1", "Item 1", 100, 1)
        const orderItem2 = new OrderItem("2", "Product 2", "Item 2", 200, 2)

        const order = new Order("1", "Customer 1", [orderItem1]);
        const order2 = new Order("2", "Customer 1", [orderItem1, orderItem2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(600);
    })
    it("Should place an order for a customer", () => {
        const customer = new Customer("c1", "Customer 1");
        const orderItem1 = new OrderItem("1", "Product 1", "Item 1", 100, 1)

        const order = OrderService.placeOrder(customer, [orderItem1]);

        expect(customer.reawardsPoints).toBe(50);
        expect(order.total()).toBe(100);
    });
});