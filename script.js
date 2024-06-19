import tableModule from './table-module.js';
import editModule from './edit-module.js';

// OBJECT CONSTRUCTORS

function bookToRead(title, author, type, subject, priority) {
  this.title = title;
  this.author = author;
  this.type = type;
  this.subject = subject;
  this.priority = priority;
}
function bookRead(title, author, type, subject, rating) {
  this.title = title;
  this.author = author;
  this.type = type;
  this.subject = subject;
  this.rating = rating;
}

// ON LOAD
let workingTable = "table-read";
let readLibraryArr = [];
let toReadLibraryArr = [];

const tableReadBody = document.querySelector('#table-read > tbody');
const tableToReadBody = document.querySelector('#table-to-read > tbody');

let wholeTable = workingTable == "table-read" ? tableModule.tableRead : tableModule.tableToRead;
let tableBody = workingTable == "table-read" ? tableReadBody : tableToReadBody;
let libraryArr = workingTable == "table-read" ? readLibraryArr : toReadLibraryArr;

tableModule.renderTable(workingTable, tableBody, libraryArr);


// TOGGLE TABLE FXS
tableModule.btnTogglesToRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  wholeTable.style.display = 'none';
  workingTable = "table-to-read";
  wholeTable.style.display = 'block';
  tableModule.renderTable(workingTable, tableBody, libraryArr);
});

tableModule.btnTogglesRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  wholeTable.style.display = 'none';
  workingTable = "table-read";
  wholeTable.style.display = 'block';
  tableModule.renderTable(workingTable, tableBody, libraryArr);
});


// ADD BOOK: EMPTY ROW IN TABLE & OBJ IN ARR
const btnAddsBook = document.querySelector(".add-button");
btnAddsBook.addEventListener("click", () => {
  let newBook;
  if (workingTable == "book-to-read") {
    newBook = new bookRead();
  }
  else {
    newBook = new bookToRead();
  }
  libraryArr.unshift(newBook);
  tableModule.renderTable(workingTable, tableBody, libraryArr);
  
  tableModule.disableButtons();
  tableModule.disableRowsNot(tableBody.rows[0]);
  editModule.addEditButtons(workingTable, tableBody.rows[0], tableBody, libraryArr);
})


// EDIT TABLE
tableBody.addEventListener('click', function(event) {
  const clickedCell = event.target.closest('td');
  const clickedRow = event.target.closest('tr');
  
  if (!clickedCell || !clickedRow) return; 

  tableModule.disableButtons();
  tableModule.disableRowsNot(clickedRow);
  editModule.addEditButtons(workingTable, clickedRow, tableBody, libraryArr);
})