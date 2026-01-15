import EventInterface from "../shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurrend: Date;
  eventData: {
    id: string;
    name: string;
    address: string;
  };

  constructor(eventData: {id: string; name: string; address: string}) {
    this.dataTimeOccurrend = new Date();
    this.eventData = eventData;
  }
}
