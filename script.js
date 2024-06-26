//import './shared.js';
import './shared.js';
import { bookRead, bookToRead, library, row} from './shared.js';
import tableModule from './table-module.js';
import editModule from './edit-module.js';


// ON LOAD
library.setting = "table-read";
tableModule.btnTogglesRead.disabled = true;
library.notCurrentTable.style.display = 'none';
//new Tablesort(document.getElementById('#table-to-read'));
//new Tablesort(document.getElementById('#table-read'));
tableModule.renderTable();
editModule.initEditing();


// TOGGLE TABLE FXS
tableModule.btnTogglesToRead.addEventListener("click", function(event) {
  tableModule.switchTable(library.currentTable);
  event.currentTarget.style.color = 'var(--off-white)';
  tableModule.btnTogglesRead.style.color = 'var(--blue-purple)';

  
});

tableModule.btnTogglesRead.addEventListener("click", function(event) {
  tableModule.switchTable(library.currentTable);
  event.currentTarget.style.color = 'var(--off-white)';
  tableModule.btnTogglesToRead.style.color = 'var(--blue-purple)';
});

// ADD BOOK: EMPTY ROW IN TABLE & OBJ IN ARR
tableModule.btnAddsBook.addEventListener("click", () => {
  let newBook;
  if (library.setting == "table-read") {
    newBook = new bookRead();
  }
  else if (library.setting == "table-to-read") {
    newBook = new bookToRead();
  }
  library.currentArr.unshift(newBook);
  let newRow = library.currentTbody.insertRow(0);
  row.selected = newRow;
  for (let i = 0; i < Object.keys(newBook).length; i++) {
    let newCell = newRow.insertCell();
    newCell.innerHTML = `<input type="text" value="" data-index= "" data-key="">`;  
  }
  // add rank buttons 
  tableModule.renderRankCell(newBook, newRow);
  tableModule.renderDateCell(newBook, newRow);
  row.selected = library.currentTable.rows[1];
  editModule.edit();
})



 
