import EventHandlerInterface from "../../shared/event-handleer.interface";
import ProductCreatedEvent from "../product-create.event";

export default class SendEmailWhenProductIsCreateHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to...`)
  }
}
