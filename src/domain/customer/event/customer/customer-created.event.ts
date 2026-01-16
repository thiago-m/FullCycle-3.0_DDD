import EventInterface from "../../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurrend: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurrend = new Date();
    this.eventData = eventData;
  }
}
