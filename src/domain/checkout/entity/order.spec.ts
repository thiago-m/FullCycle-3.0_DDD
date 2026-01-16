import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => { new Order("", "Product 1", []) }).toThrow('Id is required')
    })
    it("should throw error when customerId is empty", () => {
        expect(() => { new Order("1", "", []) }).toThrow('CustomerId is required')
    })
    it("should throw error when items are empty", () => {
        expect(() => { new Order("1", "Customer 1", []) }).toThrow('Items qtd must be greater than zero')
    })
    it("should calaculate total", () => {
        const item1 = new OrderItem("1", "Product 1", "Item 1", 100, 1)
        const item2 = new OrderItem("2", "Product 2", "Item 2", 200, 2)

        const order1 = new Order("1", "Customer 1", [item1])
        const order2 = new Order("1", "Customer 1", [item1, item2])

        expect(order1.total()).toBe(100)
        expect(order2.total()).toBe(500)
    })
    it("should throw error if the item quantity is less than or equal to zero", () => {
        expect(() => {
            const item1 = new OrderItem("1", "Product 1", "Item 1", 100, 0)
            const order1 = new Order("1", "Customer 1", [item1])

        }).toThrow("Quantity must be greater than zero")
    })
});
