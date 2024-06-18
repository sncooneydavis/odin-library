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
tableModule.renderTable(workingTable, readLibraryArr);

// TOGGLE TABLE FXS
const btnTogglesRead = document.querySelector('.toggle-read');
const btnTogglesToRead = document.querySelector('.toggle-to-read');

btnTogglesToRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  workingTable = "table-to-read";
  tableModule.hideTable(workingTable);
  tableModule.renderTable(workingTable, toReadLibraryArr);
});

btnTogglesRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  workingTable = "table-read";
  tableModule.hideTable(workingTable);
  tableModule.renderTable(workingTable, readLibraryArr);
});

// ADD BOOK EMPTY ROW
const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", () => {
  tableModule.disableButtons(this, btnTogglesRead, btnTogglesToRead);
  const currentArray = workingTable === "table-read" ? readLibraryArr : toReadLibraryArr;
  tableModule.addBook(workingTable, currentArray);
});

// EDIT TABLE
let table;
if (workingTable == "table-read") {
  table = tableModule.tableRead; 
}
else {
  table = tableModule.tableToRead;
}
table.addEventListener('click', function(event) {
  const clickedCell = event.target.closest('td');
  const clickedRow = event.target.closest('tr');
  
  if (!clickedCell || !clickedRow) return; 
  
  tableModule.addEditButtons(clickedRow);
  tableModule.disableRowsNot(clickedRow);

  if (workingTable == "table-read") {
    tableModule.editCell(clickedCell, readLibraryArr);
  } 
  else if (workingTable == "table-to-read") {
    tableModule.editCell(clickedCell, toReadLibraryArr);
  }
});


