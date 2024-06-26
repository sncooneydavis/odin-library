//import './shared.js';
import './shared.js';
import { library, row} from './shared.js';
import tableModule from './table-module.js';
import editModule from './edit-module.js';


// ON LOAD
library.setting = "table-read";
tableModule.btnTogglesRead.disabled = true;
tableModule.btnTogglesToRead.style.color = 'var(--blue-purple)';
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
library.currentTable.querySelector('.add.button').addEventListener("click",() => tableModule.addBook());
library.notCurrentTable.querySelector('.add.button').addEventListener("click",() => tableModule.addBook());



 
