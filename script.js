const bookLibrary = [];

function Book(read, title, author, type) {
  this.read = read;
  this.title = title;
  this.author = author;
  this.type = type;
}

function Read(dateRead, title, author, type, subject, rating, notes) {
  Book.call(this, title, author, type);
  this.dateRead = dateRead;
  this.subject = subject;
  this.rating = rating;
  this.notes = notes;
}
Object.setPrototypeOf(Read.prototype, Book.prototype);

function toRead(title, author, type, priority) {
  Book.call(this, title, author, type);
  this.priority = priority;
}
Object.setPrototypeOf(toRead.prototype, Book.prototype);




