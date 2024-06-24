//import './shared.js';
import { library, row, btnAddsBook, btnTogglesRead, btnTogglesToRead } from './shared.js';
import tableModule from './table-module.js';
import editModule from './edit-module.js';


// ON LOAD
library.setting = "table-read";
btnTogglesRead.disabled = true;
library.notCurrentTable.style.display = 'none';
//new Tablesort(document.getElementById('#table-to-read'));
//new Tablesort(document.getElementById('#table-read'));
tableModule.renderTable();


// TOGGLE TABLE FXS
btnTogglesToRead.addEventListener("click", function() {
  tableModule.switchTable(library.currentTable);
});

btnTogglesRead.addEventListener("click", function() {
  tableModule.switchTable(library.currentTable);
});

// OBJECT CONSTRUCTORS
function bookRead(title, author, type, subject, priority, dateRead) {
  this.title = title;
  this.author = author;
  this.type = type;
  this.subject = subject;
  this.priority = priority;
  this.dateRead = dateRead;
}
function bookToRead(title, author, type, rating) {
  this.title = title;
  this.author = author;
  this.type = type;
  this.rating = rating;
}

// ADD BOOK: EMPTY ROW IN TABLE & OBJ IN ARR
btnAddsBook.addEventListener("click", () => {
  let newBook;
  if (library.setting == "table-read") {
    newBook = new bookRead();
  }
  else if (library.setting == "table-to-read") {
    newBook = new bookToRead();
  }
  library.currentArr.unshift(newBook);
  let newRow = library.currentTbody.insertRow(0);
  for (let i = 0; i < Object.keys(newBook).length; i++) {
    let newCell = newRow.insertCell();
    newCell.innerHTML = `<input type="text" value="" data-index= "" data-key="">`;  
  }
  row.selected = newRow;
  editModule.setupEditing();
})

// SET UP EVENT LISTENERS TO EDIT CELLS OF TABLE
library.currentTbody.addEventListener('click', function(event) {
  row.selected = event.target.closest('tr');
  editModule.setupEditing();
})

library.notCurrentTable.querySelector('tbody').addEventListener('click', function(event) {
  row.selected = event.target.closest('tr');
  editModule.setupEditing();
})

 
