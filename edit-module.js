import './shared.js';
import { readLibraryArr, toReadLibraryArr, library, row, btnAddsBook, btnTogglesRead, btnTogglesToRead } from './shared.js';
import tableModule from './table-module.js';

const editModule = (function() {

    let editorButtonsContainer;
    const setupEditing = () => {
      editorButtonsContainer = document.querySelector(".editor-buttons.container");


       // DISABLE HEADER BUTTONS
      const btnArr = [btnAddsBook, btnTogglesRead, btnTogglesToRead];
      for (let btn of btnArr) {
        btn.disabled = true;
      }
      tableModule.disableCellsNotOnCurrentRow();

      editorButtonsContainer.innerHTML = `
        <input type="image" class="mark-as-read editor-button" src="./images/Mark-Read-Mingcute.svg" alt="Mark as Read" title="Mark as Read" width="20" style="display:none">
        <input type="image" class="mark-as-unread editor-button" src="./images/Mark-Read-Mingcute.svg" alt="Mark as Not Read" title="Mark as Not Read" width="20"style="display:none">
        <input type="image" class="back editor-button" src="./images/Back-Mingcute.svg" alt="Back" title="Don't Save Changes" width="20" style="display:none">
        <input type="image" class="save editor-button" src="./images/Check-Mingcute.svg" alt="Save" title="Save Changes" width="20">
        <input type="image" class="delete editor-button" src="./images/Delete-Mingcute.svg" alt="Delete" title="Delete Entry" width="20">
      `;

      // SAVE QUERY SELECTED ELEMENTS AND INITIALIZE EVENT LISTENERS 
      eventBack();
      eventMarkRead();
      eventMarkUnread();
      eventSave();
      eventDelete();

      // REMOVE IRRELEVANT EDITING BUTTONS
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
      tableModule.switchTable(library.currentTable);
      reset();
      editModule.setupEditing();
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
      tableModule.switchTable(library.currentTable);
      reset();
      editModule.setupEditing();
    }
    
    let saveButton; 
    let saveCurrentRow;
    const eventSave = () => {
      saveButton = document.querySelector(".save.editor-button");
      saveButton.addEventListener("click", () => saveCurrentRow());
      saveCurrentRow = () => {
        // CHECK IF TABLE IS MISSING TEXT INPUT
        let nullOrFullPropertiesArr = [];
        for (let i = 0; i < row.selected.cells.length; i++) {
          const userInput = row.selected.cells[i].querySelector('input')?.value;
          console.log(`user input for index ${i}: ${userInput}`);
          
          // SAVE RATING OR PRIORITY 
          if (userInput == undefined) {
              let numberIconsOn = 0;
              for (let j = 0; j < 5; j++) {
                let icons = row.selected.cells[i].querySelectorAll('img');
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
          else if (userInput != "") {
            const keys = Object.keys(row.selectedBookObj);
            row.selectedBookObj[keys[i]] = userInput;
            nullOrFullPropertiesArr.push("full");
          }
          else {
            nullOrFullPropertiesArr.push("null");
          }
        }
        console.log(`null or full arr: ${nullOrFullPropertiesArr}`);
        // IF TABLE MISSING TEXT INPUT(S), HIGHLIGHT IN RED AND DON'T ALLOW SAVE
        if (nullOrFullPropertiesArr.includes("null")) {
          for (let i = 0; i < row.selected.cells.length-1; i++) {
            if (nullOrFullPropertiesArr[i] == "null") {
              row.selected.cells[i].classList.add('missing-input');
            }
            else {
              row.selected.cells[i].classList.remove('missing-input');
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