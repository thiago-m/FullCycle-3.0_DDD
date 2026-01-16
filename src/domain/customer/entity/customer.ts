import Address from "../value-object/address";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false
    private _reawardsPoints: number = 0

    private static eventDispatcher?: EventDispatcher;

    static setEventDispatcher(dispatcher: EventDispatcher) {
        Customer.eventDispatcher = dispatcher;
    }
    static getEventDispatcher(): EventDispatcher | undefined {
        return Customer.eventDispatcher;
    }

    constructor(id: string, name: string) {
        this._id = id
        this._name = name
        this.validate()

        // Dispara evento de criação
        const eventDispatcher = Customer.getEventDispatcher();
        eventDispatcher?.notify(new CustomerCreatedEvent({ id, name }));
    }

    validate() {
        if(!this._id.length) throw new Error('Id is required')
        if(!this._name.length) throw new Error('Name is required')
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    activate() {
        if(!this._address) throw new Error("Address is mandatory to activate a customer")
        this._active = true
    }
    
    deactivate() {
        this._active = false
    }

    isActive(): boolean {
        return this._active
    }

    addReawardsPoints(points: number) {
        this._reawardsPoints += points
    }

    changeAddress(address: Address) {
        this._address = address
        
        // Dispara evento de alteração de endereço
        const eventDispatcher = Customer.getEventDispatcher();
        eventDispatcher?.notify(new CustomerAddressChangedEvent({
            id: this._id,
            name: this._name,
            address: address.toString()
        }));
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get reawardsPoints(): number {
        return this._reawardsPoints
    }

    get address(): Address {
        return this._address
    }

    set Address(address: Address) {
        this._address = address
    }
}
