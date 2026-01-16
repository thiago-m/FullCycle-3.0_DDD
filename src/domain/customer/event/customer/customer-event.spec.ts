import EventDispatcher from "../shared/event-dispatcher";
import EnviaConsoleLog1Handler from "./handler/send-email-when-customer-is-created.handler";
import EnviaConsoleLog2Handler from "./handler/send-email-when-customer-is-created.handler-2";
import EnviaConsoleLogHandler from "./handler/semd-email-when-customer-address-updated.handler";
import Customer from "../../entity/customer";
import Address from "../../value-object/address";

describe("Customer Domain Events", () => {
  it("should call both handlers when customer is created", () => {
    const dispatcher = new EventDispatcher();
    const handler1 = new EnviaConsoleLog1Handler();
    const handler2 = new EnviaConsoleLog2Handler();

    const spy1 = jest.spyOn(handler1, "handle");
    const spy2 = jest.spyOn(handler2, "handle");

    dispatcher.register("CustomerCreatedEvent", handler1);
    dispatcher.register("CustomerCreatedEvent", handler2);

    Customer.setEventDispatcher(dispatcher);

    new Customer("c1", "John Doe");

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it("should call handler when customer address is changed", () => {
    const dispatcher = new EventDispatcher();
    const handler = new EnviaConsoleLogHandler();
    const spy = jest.spyOn(handler, "handle");

    dispatcher.register("CustomerAddressChangedEvent", handler);

    Customer.setEventDispatcher(dispatcher);

    const customer = new Customer("c2", "Jane Doe");
    customer.changeAddress(new Address("Rua A", 10, "12345-678", "Cidade"));

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      eventData: expect.objectContaining({
        id: "c2",
        name: "Jane Doe",
        address: "Rua A, 10, 12345-678 Cidade"
      })
    }));
  });
});
