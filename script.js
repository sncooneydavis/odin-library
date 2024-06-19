import './shared.js';
import tableModule from './table-module.js';
import editModule from './edit-module.js';

// ON LOAD
currentTableNameIs = "table-read";
const tableReadBody = document.querySelector('#table-read > tbody');
const tableToReadBody = document.querySelector('#table-to-read > tbody');
let tableBody = currentTableNameIs == "table-read" ? tableReadBody : tableToReadBody;
let wholeTable = currentTableNameIs == "table-read" ? tableModule.tableRead : tableModule.tableToRead;
tableModule.renderTable(tableBody);


// TOGGLE TABLE FXS
tableModule.btnTogglesToRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  wholeTable.style.display = 'none';
  currentTableNameIs = "table-to-read";
  wholeTable.style.display = 'block';
  tableModule.renderTable(tableBody);
});

tableModule.btnTogglesRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  wholeTable.style.display = 'none';
  currentTableNameIs = "table-read";
  wholeTable.style.display = 'block';
  tableModule.renderTable(tableBody);
});

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

// ADD BOOK: EMPTY ROW IN TABLE & OBJ IN ARR
btnAddsBook.addEventListener("click", () => {
  let newBook;
  if (currentTableNameIs == "book-to-read") {
    newBook = new bookRead();
  }
  else {
    newBook = new bookToRead();
  }
  currentArr.unshift(newBook);
  currentRow = tableBody.rows[0];
  tableModule.renderRow();
  
  disableButtons();
  tableModule.disableRowsNot(currentRow);
  editModule.addEditButtons();
})

// EDIT TABLE
tableBody.addEventListener('click', function(event) {
  currentRow = event.target.closest('tr');
  disableButtons();
  tableModule.disableRowsNot(currentRow);
  editModule.addEditButtons();
})

