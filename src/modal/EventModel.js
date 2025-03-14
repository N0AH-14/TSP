// models/Event.js
class EventModel{
  constructor(
    id,
    title,
    description,
    date,
    time,
    venue,
    image,
    ticketsAvailable
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date; // ISO format
    this.time = time; // HH:MM format
    this.venue = venue;
    this.image = image; // URL to event image
    this.ticketsAvailable = ticketsAvailable; // number of tickets available
  }
}

export default EventModel;
