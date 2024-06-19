import tableModule from './table-module.js';
import editModule from './edit-module.js';

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
let workingTable = "table-read";
let readLibraryArr = [];
let toReadLibraryArr = [];

let wholeTable = workingTable == "table-read" ? tableModule.tableRead : tableModule.tableToRead;
let tableBody = workingTable == "table-read" ? tableModule.tableReadBody : tableModule.tableToReadBody;
let libraryArr = workingTable == "table-read" ? readLibraryArr : toReadLibraryArr;

tableModule.renderTable(tableBody, libraryArr);


// TOGGLE TABLE FXS
tableModule.btnTogglesToRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  wholeTable.style.display = 'none';
  workingTable = "table-to-read";
  wholeTable.style.display = 'block';
  tableModule.renderTable(tableBody, libraryArr);
});

tableModule.btnTogglesRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  wholeTable.style.display = 'none';
  workingTable = "table-read";
  wholeTable.style.display = 'block';
  tableModule.renderTable(tableBody, libraryArr);
});


// ADD BOOK: EMPTY ROW IN TABLE & OBJ IN ARR
const btnAddsBook = document.querySelector(".add-button");
btnAddsBook.addEventListener("click", () => {
  
  const newBook = new bookToRead();
  libraryArr.unshift(newBook);
  tableModule.renderTable(tableBody, libraryArr);
  
  tableModule.disableButtons();
  tableModule.disableRowsNot(tableBody.rows[0]);
  editModule.addEditButtons(workingTable, tableBody.rows[0], tableBody, libraryArr);
})


// EDIT TABLE
tableBody.addEventListener('click', function(event) {
  const clickedCell = event.target.closest('td');
  const clickedRow = event.target.closest('tr');
  
  if (!clickedCell || !clickedRow) return; 

  clickedCell.classList.remove('missing-input');
  tableModule.disableButtons();
  tableModule.disableRowsNot(clickedRow);
  editModule.addEditButtons(workingTable, clickedRow, tableBody, libraryArr);
})