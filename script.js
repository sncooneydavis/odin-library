import tableModule from './table-module.js';

// OBJECT CONSTRUCTORS
function Book(title, author, type) {
  this.title = title;
  this.author = author;
  this.type = type;
}

function bookRead(title, author, type, subject, rating, dateRead, notes) {
  Book.call(this, title, author, type);
  this.subject = subject;
  this.rating = rating;
  this.dateRead = dateRead;
  this.notes = notes;
}
Object.setPrototypeOf(bookRead.prototype, Book.prototype);

function bookToRead(title, author, type, priority) {
  Book.call(this, title, author, type);
  this.priority = priority;
}
Object.setPrototypeOf(bookToRead.prototype, Book.prototype);


// ON LOAD
let readLibraryArr = [];
let toReadLibraryArr = [];
let workingTable = "table-read";
tableModule.fillTable(workingTable, readLibraryArr);
let editingMode = "off";


// TOGGLE TABLE FXS
const btnTogglesRead = document.querySelector('.toggle-read');
const btnTogglesToRead = document.querySelector('.toggle-to-read');

btnTogglesToRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  tableModule.hideTable(workingTable);
  tableModule.fillTable(tableToReadBody, toReadLibraryArr);
});

btnTogglesRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  tableModule.hideTable(workingTable);
  tableModule.fillTable(tableReadBody, readLibraryArr);
});


// ADD BOOK EMPTY ROW
const addButton = document.querySelector("add-button");
addButton.addEventListener("click", () => {
  // must save or delete new row before toggling to the other table or adding a new row
  addButton.disabled = true;
  btnTogglesRead.disabled = true;
  btnTogglesToRead.disabled = true;
  tableModule.addBookRow(workingTable);
})


// ALL CELLS EDITABLE
const selectedCell = document.querySelectorAll('td');
selectedCell.addEventListener("click", function() {
    if (editingMode == "off") {
      addEditButtons(selectedCell);
    }
    editingMode = "on";
    tableModule.editCell(this);
})

