import './shared.js';
import tableModule from './table-module.js';

const editModule = (function() {

    let editorButtonsContainer = document.querySelector(".editor-buttons.container");
    let cells = currentRow.cells;

    const addEditButtons = () => {
        let rowRect = currentRow.getBoundingClientRect();
        let tableRect = currentTable.getBoundingClientRect();
        let yCoordinateOfCurrentRowsTop = rowRect.top - tableRect.top;
    
        if (currentArr[0].title != undefined) {
            editorButtonsContainer.innerHTML += `
                <input type="image" class="back editor-button" src="./images/Back-Mingcute.svg" alt="Back" title="Don't Save Changes" width="20">
            `;
            if (currentTableNameIs == "table-to-read") {
                editorButtonsContainer.innerHTML = `
                    <input type="image" class="mark-as-read editor-button" src="./images/Mark-Read-Mingcute.svg" alt="Mark as Read" title="Mark as Read" width="20">
                `;
            }
            else if (currentTableNameIs == "table-read") {
                editorButtonsContainer.innerHTML = `
                     <input type="image" class="mark-as-unread editor-button" src="./images/Mark-Read-Mingcute.svg" alt="Mark as Not Read" title="Mark as Not Read" width="20">
                `;
            }
        }
        editorButtonsContainer.innerHTML += `
        <input type="image" class="save editor-button" src="./images/Check-Mingcute.svg" alt="Save" title="Save Changes" width="20">
        <input type="image" class="delete editor-button" src="./images/Delete-Mingcute.svg" alt="Delete" title="Delete Entry" width="20">
        `;

        editorButtonsContainer.style.top = `${yCoordinateOfCurrentRowsTop}px`;
    }

    // EVENT LISTENERS + FXY FOR EDITOR BUTTONS
    let bookObjToBeSaved = currentArr[currentRow.rowIndex];
    let keys = Object.keys(editedBookObj);
    
    const markAsRead = () => {
        // add book obj to read array
        readLibraryArr.unshift(bookObjToBeSaved);
        // remove book obj from to-read array
        toReadLibraryArr.splice(currentRow.rowIndex, 1);
        // re-render workingTable without the book obj's row
        currentTable.deleteRow(currentRow.rowIndex);
        
    }
    const markReadButton = document.querySelector(".mark-as-read.editor-button");
    markReadButton.addEventListener("click", markAsRead);

    const markAsUnread = () => {
        // add book obj to to-read array
        toReadLibraryArr.unshift(bookObjToBeSaved);
        // remove book obj from read array
        readLibraryArr.splice(currentRow.rowIndex, 1);
        // re-render workingTable without the book obj's row
        currentTable.deleteRow(currentRow.rowIndex);
        
    }
    const markUnreadButton = document.querySelector(".mark-as-read.editor-button");
    markUnreadButton.addEventListener("click", markAsUnread);

    const goBack = () => {
      // RE-RENDER ORIGINAL ROW TEXT
      for (let i = 0; i < cells.length-1; i++) {
        Object.keys(currentArr[currentRow.rowIndex]).forEach(key => {
            cells[i].innerHTML = `<input type="text" value="${book[key]}" data-index="${index}" data-key="${key}">`;
        });
      }
      reset();  
    }
    const backButton = document.querySelector(".back.editor-button");
    backButton.addEventListener("click", goBack);

    const saveCurrentRow = () => {
      // CHECK IF TABLE IS MISSING TEXT INPUT
      let nullOrFullPropertiesArr = [];
      for (let i = 0; i < cells.length; i++) {
        const userInput = cells[i].querySelector('input').value;
        if (userInput && userInput == "") {
            nullOrFullPropertiesArr.push(null);
        }
        else if (userInput && userInput!= "") {
            bookObjToBeSaved[keys[i]] = userInput;
            nullOrFullPropertiesArr.push("full");
        }
        // SAVE RATING OR PRIORITY FOR LAST PROPERTY OF BOOK OBJECT
        else if (!userInput) {
            let iconsOn = 0;
            for(let j = 1; j <= 5; j++) {
                let icons = cells[i].querySelector('img');
                if (icons[j].classList.contains('on')) {
                    iconsOn++;
                }
            }
            if (currentTableNameIs == "table-read") {
                bookObjToBeSaved.rating = iconsOn;
            }
            else {
                bookObjToBeSaved.priority = iconsOn;
            }
        }
      }
      // IF TABLE MISSING TEXT INPUT(S), HIGHLIGHT IN RED AND DON'T ALLOW SAVE
      if (nullOrFullPropertiesArr.contains(null)) {
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
        currentArr[currentRow.rowIndex] = editedBookObj;
        reset();
      }
    }
    const saveButton = document.querySelector(".save.editor-button");
    saveButton.addEventListener("click", saveCurrentRow());
    
    const deleteCurrentRow = () => {
      currentArr.splice(currentRow.rowIndex, 1);
      currentTable.deleteRow(currentRow.rowIndex);
      reset();
    }
    const deleteButton = document.querySelector(".delete.editor-button");
    deleteButton.addEventListener("click", deleteCurrentRow());

    const reset = () => {
      readButton.removeEventListener("click", markAsRead);
      backButton.removeEventListener("click", goBack);
      saveButton.removeEventListener("click", saveCurrentRow);
      deleteButton.removeEventListener("click", deleteCurrentRow);
      editorButtonsContainer.innerHTML = '';
      tableModule.enableAllRows();
      tableModule.enableButtons();
    }
})();

export default editModule;