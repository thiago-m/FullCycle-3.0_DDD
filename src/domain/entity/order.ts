import OrderItem from "./order_item"

export default class Order {
    private _id: string
    private _customerId: string
    private _items: OrderItem[] = []
    private _total: number = 0
    // private _productId: string = ''

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id
        this._customerId = customerId
        this._items = items
        this._total = this.total()
        this.validade()
    }

    validade(): boolean {
        if(!this._id.length) throw new Error('Id is required')
        if(!this._customerId.length) throw new Error('CustomerId is required')
        if(this._items.length === 0) throw new Error('Items qtd must be greater than zero')
        if(this._items.some(item => item.quantity <= 0)) throw new Error('Quantity must be greater than zero')

        return true
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

    changeItems(items: OrderItem[]): void {
        this._items = items
        this._total = this.total()
        this.validade()
    }

    get id(): string {
        return this._id
    }
    get customerId(): string {
        return this._customerId
    }
    get items(): OrderItem[] {
        return this._items
    }

    // get productId(): string {
    //     return this._productId
    // }
}