import './shared.js';
import { readLibraryArr, toReadLibraryArr, bookRead, bookToRead, library, row} from './shared.js';
import tableModule from './table-module.js';

const editModule = (function() {
  let editorButtonsContainer;
  let selectableRows; 

  // SET UP EVENT LISTENERS TO EDIT CELLS OF TABLE
  const initEditing = () => {
    selectableRows = library.currentTbody.querySelectorAll('tr');
    selectableRows.forEach((selectableRow) => {
      selectableRow.addEventListener('click', function() {
        row.selected = this;
        edit();
      })
    })
  }
  
  function edit() {
    // prevents event propagation, so clicking a new input does not reset other inputs
    const inputs = row.selected.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('click', (event) => {
        event.stopPropagation();  
      });
    });
    
     // DISABLE HEADER BUTTONS
    tableModule.disableHeaderButtons();
    tableModule.disableCellsNotOnCurrentRow();

    //ADD EDITOR BUTTONS
    editorButtonsContainer = document.querySelector(".editor-buttons.container");
    editorButtonsContainer.innerHTML = `
      <input type="image" class="mark-as-read editor-button" src="./images/Mark-Read-Mingcute.svg" alt="Mark as Read" title="Mark as Read" width="20">
      <input type="image" class="mark-as-unread editor-button" src="./images/Mark-Read-Mingcute.svg" alt="Mark as Not Read" title="Mark as Not Read" width="20">
      <input type="image" class="back editor-button" src="./images/Back-Mingcute.svg" alt="Back" title="Don't Save Changes" width="20">
      <input type="image" class="save editor-button" src="./images/Check-Mingcute.svg" alt="Save" title="Save Changes" width="20">
      <input type="image" class="delete editor-button" src="./images/Delete-Mingcute.svg" alt="Delete" title="Delete Entry" width="20">
    `;

    // REMOVE IRRELEVANT EDITOR BUTTONS
  
      if (library.setting == "table-to-read") {
        editorButtonsContainer.querySelector('.mark-as-unread').style.display = 'none';
        if (library.currentArr[0].priority == undefined) {
          editorButtonsContainer.querySelector('.mark-as-read').style.display = 'none';
          editorButtonsContainer.querySelector('.back').style.display = 'none';
        }
      } 
      else if (library.setting == "table-read") {
        editorButtonsContainer.querySelector('.mark-as-read').style.display = 'none';
        if (library.currentArr[0].rating == undefined) {
          editorButtonsContainer.querySelector('.mark-as-unread').style.display = 'none';
          editorButtonsContainer.querySelector('.back').style.display = 'none';
        }
      }
    
      // PLACE EDITOR BUTTONS NEXT TO SELECTED ROW
      let rowRect = row.selected.getBoundingClientRect();
      let tableRect = library.currentTable.getBoundingClientRect();
      let yCoordinateOfCurrentRowsTop = rowRect.top - tableRect.top;
      editorButtonsContainer.style.top = `${yCoordinateOfCurrentRowsTop}px`;
      
      const rankCell = row.selected.querySelector('.rank-cell');
      tableModule.renderUnselected(rankCell);
    
      // SAVE QUERY SELECTED ELEMENTS AND INITIALIZE EVENT LISTENERS  
        eventRank();
        eventBack();
        eventMarkRead();
        eventMarkUnread();
        eventSave();
        eventDelete();
  }
  
    // EVENT LISTENERS ON RANK BUTTONS
    let rankButtons;
    let eventRank = () => {
      rankButtons = document.querySelectorAll('.rating.button');
      rankButtons.forEach((button) => {
        button.addEventListener("click", (event) => rank(event));
      })
    }
    let rank = (event) => {
      event.stopPropagation();
      const rankCell = row.selected.querySelector('.rank-cell');
      let target = event.target; 
      const dataOrder = parseInt(target.getAttribute('data-order'), 10);
      tableModule.renderSelected(rankCell, dataOrder);
    }

    // EVENT LISTENERS + FXY FOR EDITOR BUTTONS
    let backButton;
    let eventBack = () => {
      backButton = document.querySelector(".back.editor-button");
      backButton.addEventListener("click", () => goBack());
    };
    let goBack  = () => {
      tableModule.renderRow(row.selectedBookObj, row.selected);
      reset(); 
    };
    
    let markReadButton; 
    let eventMarkRead = () => { 
      markReadButton = document.querySelector(".mark-as-read.editor-button");
      markReadButton.addEventListener("click", () => markAsRead());
    }
    let markAsRead = () => {
      // add book obj to read array
      let arrToMutate = row.selectedBookObj;
      delete arrToMutate.priority;
      arrToMutate['subject'] = "";
      arrToMutate['rating'] = 0;
      arrToMutate['dateRead'] = tableModule.getTodaysDate();
      readLibraryArr.unshift(arrToMutate);

      // remove book obj from to-read array
      toReadLibraryArr.splice(row.selectedIndex, 1);
      reset();
      tableModule.switchTable(library.currentTable);
      row.selected = library.currentTable.rows[1];
      
      edit();
    }
    
     
    let markUnreadButton; 
    const eventMarkUnread = () => {
      markUnreadButton = document.querySelector(".mark-as-unread.editor-button");
      markUnreadButton.addEventListener("click", () => markAsUnread());
    }
    let markAsUnread = () => {
      // add book obj to to-read array
      let arrToMutate = row.selectedBookObj;
      delete arrToMutate.subject;
      delete arrToMutate.rating;
      delete arrToMutate.dateRead;
      arrToMutate['priority'] = 0;
      toReadLibraryArr.unshift(arrToMutate);

      // remove book obj from read array
      readLibraryArr.splice(row.selectedIndex, 1);
      reset();
      tableModule.switchTable(library.currentTable);
      row.selected = library.currentTable.rows[1];
      editModule.edit();
    }
    
    let saveButton; 
    const eventSave = () => {
      saveButton = document.querySelector(".save.editor-button");
      saveButton.addEventListener("click", () => saveCurrentRow());
    }
    let saveCurrentRow = () => {
      const keys = Object.keys(row.selectedBookObj);
      // NEW OBJ: WILL BE SAVED IF FULL, WILL FORCE RETURN IF NOT
      let storageBookObj;
      if (library.setting == "table-read") {
        storageBookObj = new bookRead();
      }
      else if (library.setting == 'table-to-read') {
        storageBookObj = new bookToRead();
      }
      // INPUT IS TEXT OR DATE
      for (let i = 0; i < keys.length; i++) {
        const inputElem = row.selected.cells[i].querySelector('input');
        if (inputElem.type == 'text' || inputElem.type == 'date') {
          if (inputElem.value) {              
            storageBookObj[keys[i]] = inputElem.value;
            row.selected.cells[i].classList.remove('missing-input');
          }
          else {
            storageBookObj[keys[i]] = "null";
            row.selected.cells[i].classList.add('missing-input');
          }
        }
        // INPUT IS RANK BUTTONS
        else if (inputElem.type == 'image') {
          let rankCount = 0;
          for (let j = 0; j < 5; j++) {
            let icons = row.selected.cells[i].querySelectorAll('.rating.button');
              if (icons[j].classList.contains('on')) {
                  rankCount++;
              }
          }
          if (rankCount != 0) {
            storageBookObj[keys[i]] = rankCount;
            row.selected.cells[i].classList.remove('missing-input');
          }
          else if (rankCount == 0) {
            storageBookObj[keys[i]] = "null";
            row.selected.cells[i].classList.add('missing-input');
          }
        }
      }
      // CHECK IF STORAGE OBJ IS FULL 
      for (let key in row.selectedBookObj) {
        if (storageBookObj[key] == "null") {
          return;
        }
      }
      for(let key in row.selectedBookObj) {
        row.selectedBookObj[key] = storageBookObj[key];
      }
      reset();
    }
      
    let deleteButton;
    const eventDelete = () => {
      deleteButton = document.querySelector(".delete.editor-button");
      deleteButton.addEventListener("click", deleteCurrentRow);
      }
    function deleteCurrentRow() {
      library.currentArr.splice(row.selectedIndex, 1);
      library.currentTable.deleteRow(row.selectedIndex + 1);
      reset();
    }

    const reset = () => {
      selectableRows.forEach((input) => {
        input.removeEventListener("click", edit);
      })
      rankButtons.forEach((button) => {
        button.removeEventListener("click", rank);
      })
      backButton.removeEventListener("click", goBack); 
      markReadButton.removeEventListener("click", markAsRead);
      markUnreadButton.removeEventListener("click", markAsUnread);
      saveButton.removeEventListener("click", saveCurrentRow);
      deleteButton.removeEventListener("click", deleteCurrentRow);
      editorButtonsContainer.innerHTML = '';
      // ENABLE HEADER BUTTONS, CELLS FOR EDITING
      tableModule.btnAddsBook.disabled = false;
      if (library.setting == "table-read") {
        tableModule.btnTogglesToRead.disabled = false;
      }
      else if (library.setting == "table-to-read") {
        tableModule.btnTogglesRead.disabled = false;
      }
      tableModule.enableAllRows();
    }
  
  return {
    initEditing: initEditing,
    edit: edit,
  }
})();

export default editModule;