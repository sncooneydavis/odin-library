import './shared.js';
import { readLibraryArr, toReadLibraryArr, library, row, btnAddsBook, btnTogglesRead, btnTogglesToRead } from './shared.js';
import tableModule from './table-module.js';

const editModule = (function() {

    let editorButtonsContainer = document.querySelector(".editor-buttons.container");

    const setupEditing = () => {

       // DISABLE HEADER BUTTONS
      const btnArr = [btnAddsBook, btnTogglesRead, btnTogglesToRead];
      for (let btn of btnArr) {
        btn.disabled = true;
      }
      tableModule.disableCellsNotOnCurrentRow();

      console.log(`editModule: ${row.selectedBookObj}`);
      let cells = row.selected.cells; 

      editorButtonsContainer.innerHTML = `
        <input type="image" class="mark-as-read editor-button" src="./images/Mark-Read-Mingcute.svg" alt="Mark as Read" title="Mark as Read" width="20" style="display:none">
        <input type="image" class="mark-as-unread editor-button" src="./images/Mark-Read-Mingcute.svg" alt="Mark as Not Read" title="Mark as Not Read" width="20"style="display:none">
        <input type="image" class="back editor-button" src="./images/Back-Mingcute.svg" alt="Back" title="Don't Save Changes" width="20" style="display:none">
        <input type="image" class="save editor-button" src="./images/Check-Mingcute.svg" alt="Save" title="Save Changes" width="20">
        <input type="image" class="delete editor-button" src="./images/Delete-Mingcute.svg" alt="Delete" title="Delete Entry" width="20">
      `;

      eventBack(row.selectedBookObj);
      eventMarkRead(row.selectedBookObj);
      eventMarkUnread(row.selectedBookObj);
      eventSave(cells, row.selectedBookObj);
      eventDelete();

      if (library.currentArr[0].title != undefined) {
        editorButtonsContainer.querySelector('.back').style.display = 'inline';

        if (library.setting == "table-to-read") {
          editorButtonsContainer.querySelector('.mark-as-read').style.display = 'inline';
          
        }
        else if (library.setting == "table-read") {
          editorButtonsContainer.querySelector('.mark-as-unread').style.display = 'inline';
        }
      }

      // PLACE EDITOR BUTTONS NEXT TO SELECTED ROW
      let rowRect = row.selected.getBoundingClientRect();
      let tableRect = library.currentTable.getBoundingClientRect();
      let yCoordinateOfCurrentRowsTop = rowRect.top - tableRect.top;
      editorButtonsContainer.style.top = `${yCoordinateOfCurrentRowsTop}px`;
    }

    // EVENT LISTENERS + FXY FOR EDITOR BUTTONS
    let backButton;
    let eventBack = () => {
      backButton = document.querySelector(".back.editor-button");
      backButton.addEventListener("click", () => goBack(row.selectedBookObj));
    };
    let goBack  = () => {
      let indexReminder = row.selectedIndex;
      console.log(`index of row to be re-added: ${indexReminder}`);
      console.log(`book in array to be re-added: ${row.selectedBookObj}`);
      tableModule.renderRow(row.selectedBookObj, row.selected);
      reset(); 
    };
    
    let markReadButton; 
    let eventMarkRead = () => { 
      markReadButton = document.querySelector(".mark-as-read.editor-button");
      markReadButton.addEventListener("click", () => markAsRead(row.selectedBookObj));
    }
    let markAsRead = () => {
      // add book obj to read array
      readLibraryArr.unshift(row.selectedBookObj);
      // remove book obj from to-read array
      toReadLibraryArr.splice(row.selectedIndex, 1);
      reset();
      tableModule.switchTable();
      // switch setting
    }
    
     
    let markUnreadButton; 
    let markAsUnread;
    const eventMarkUnread = () => {
      markUnreadButton = document.querySelector(".mark-as-unread.editor-button");
      markUnreadButton.addEventListener("click", () => markAsUnread(row.selectedBookObj));
      markAsUnread = () => {
        // add book obj to to-read array
        toReadLibraryArr.unshift(row.selectedBookObj);
        // remove book obj from read array
        readLibraryArr.splice(row.selectedIndex, 1);
        reset();
        tableModule.switchTable();
      }
    }
    
    let saveButton; 
    let saveCurrentRow;
    const eventSave = (cells) => {
      saveButton = document.querySelector(".save.editor-button");
      saveButton.addEventListener("click", () => saveCurrentRow);
      saveCurrentRow = () => {
        // CHECK IF TABLE IS MISSING TEXT INPUT
        let nullOrFullPropertiesArr = [];
        for (let i = 0; i < cells.length; i++) {

            const userInput = cells[i].querySelector('input')?.value;
          
          if (userInput && userInput == "") {
              nullOrFullPropertiesArr.push(null);
          }
          else if (userInput && userInput!= "") {
              Object.keys(row.selectedBookObj)[i] = userInput;
              nullOrFullPropertiesArr.push("full");
          }
          // SAVE RATING OR PRIORITY FOR LAST PROPERTY OF BOOK OBJECT
          else if (userInput == undefined) {
              let numberIconsOn = 0;
              for (let j = 0; j < 5; j++) {
                let icons = cells[i].querySelectorAll('img');
                if (icons[j].classList.contains('on')) {
                    numberIconsOn++;
                }
              }
              if (library.setting == "table-read") {
                  row.selectedBookObj.rating = numberIconsOn;
              }
              else {
                  row.selectedBookObj.priority = numberIconsOn;
              }
          }
        }
        // IF TABLE MISSING TEXT INPUT(S), HIGHLIGHT IN RED AND DON'T ALLOW SAVE
        if (nullOrFullPropertiesArr.includes(null)) {
          for (let i = 0; i < cells.length-1; i++) {
            if (nullOrFullPropertiesArr[i] == null) {
              cells[i].classList.add('missing-input');
            }
            else {
              cells[i].classList.remove('missing-input');
            }
          }
        }
        // IF TABLE HAS ALL TEXT INPUTS, SAVE TO LIBRARY ARR AND RESET
        else {
          library.currentArr[row.selectedIndex] = row.selectedBookObj;
          reset();
        }
      }
    }
      
    function deleteCurrentRow() {
      library.currentArr.splice(row.selectedIndex, 1);
      library.currentTable.deleteRow(row.selectedIndex + 1);
      reset();
    }
    let deleteButton;
    const eventDelete = () => {
      deleteButton = document.querySelector(".delete.editor-button");
      deleteButton.addEventListener("click", deleteCurrentRow);
      }

    const reset = () => {
      backButton.removeEventListener("click", goBack); 
      markReadButton.removeEventListener("click", markAsRead);
      markUnreadButton.removeEventListener("click", markAsUnread);
      saveButton.removeEventListener("click", saveCurrentRow);
      deleteButton.removeEventListener("click", deleteCurrentRow);
      editorButtonsContainer.innerHTML = '';
      // ENABLE HEADER BUTTONS, CELLS FOR EDITING
      btnAddsBook.disabled = false;
      if (library.setting == "table-read") {
        btnTogglesToRead.disabled = false;
      }
      else if (library.setting == "table-to-read") {
        btnTogglesRead.disabled = false;
      }
      tableModule.enableAllRows();
    }
    
    return {
      setupEditing: setupEditing,
    }
})();

export default editModule;