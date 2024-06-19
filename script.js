import './shared.js';
import tableModule from './table-module.js';
import editModule from './edit-module.js';
import { currentTable } from './shared.js';

// ON LOAD
currentTableNameIs = "table-read";
tableModule.renderTable();


// TOGGLE TABLE FXS
btnTogglesToRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  currentTable.style.display = 'none';
  currentTableNameIs = "table-to-read";
  currentTable.style.display = 'block';
  tableModule.renderTable();
});

btnTogglesRead.addEventListener("click", function() {
  this.classList.remove('dim');
  this.disabled = true;
  currentTable.style.display = 'none';
  currentTableNameIs = "table-read";
  currentTable.style.display = 'block';
  tableModule.renderTable();
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
  disableHeaderButtons();
  tableModule.disableCellsNotOnCurrentRow();
  editModule.addEditButtons();
})

// EDIT TABLE
currentTable.querySelector('tbody').addEventListener('click', function(event) {
  currentRow = event.target.closest('tr');
  disableHeaderButtons();
  tableModule.disableCellsNotOnCurrentRow();
  editModule.addEditButtons();
})

