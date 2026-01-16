import EventHandlerInterface from "../../../../@shared/event/event-handleer.interface";
import CustomerAddressChangedEvent from "../customer-created.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle(event: CustomerAddressChangedEvent): void {
    const { id, name, address } = event.eventData;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
  }
}
