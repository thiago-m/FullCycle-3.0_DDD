import Product from "../entity/product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => { new Product("", "Product 1", 100) }).toThrow('Id is required')
    })
    it("should throw error when name is empty", () => {
        expect(() => { new Product("1", "", 100) }).toThrow('Name is required')
    })
    it("should throw error when price is less than zero", () => {
        expect(() => { new Product("1", "Product 1", -10) }).toThrow('Price must be greater than zero')
    })
    it("should change name", () => {
        const product = new Product("1", "Product name", 10)
        product.changeName("New Product Name")
        expect(product.name).toBe('New Product Name')
    })
    it("should change price", () => {
        const product = new Product("1", "Product name", 10)
        product.changePrice(150)
        expect(product.price).toBe(150)
    })
})
