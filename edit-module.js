import './shared.js';
import tableModule from './table-module.js';

const editModule = (function() {

    const buttonCont = document.querySelector(".mini-buttons");
    let cells;

    const addEditButtons = () => {
        // TODO: need to orient buttons to be near row selected 
        cells = currentRow.cells;

        if (currentTableNameIs == "table-to-read" && currentArr[0] != undefined) {
        buttonCont.innerHTML = `
            <input type="image" class="read mini-button" src="./images/Book-Mingcute.svg" alt="Read" title="Mark as Read" width="20">
        `;
        }
        if (libraryArr[0].title != undefined) {
        buttonCont.innerHTML += `
            <input type="image" class="back mini-button" src="./images/Back-Mingcute.svg" alt="Back" title="Don't Save Changes" width="20">
        `;
        }
        buttonCont.innerHTML += `
        <input type="image" class="save mini-button" src="./images/Save-Mingcute.svg" alt="Save" title="Save Changes" width="20">
        <input type="image" class="delete mini-button" src="./images/Delete-Mingcute.svg" alt="Delete" title="Delete Entry" width="20">
        `;
    }

    // EVENT LISTENERS + FXY FOR MINI BUTTONS
    const markAsRead = () => {
        // add book obj to read array
        Object.keys 
        // remove book obj from to-read array
        
        
        // re-render workingTable without the book obj's row
        
    }
    const readButton = document.querySelector(".read.mini-button");
    readButton.addEventListener("click", markAsRead);

    const goBack = () => {
      // RE-RENDER ORIGINAL ROW TEXT
      for (let i = 0; i < cells.length-1; i++) {
        Object.keys(libraryArr[currentRow.rowIndex]).forEach(key => {
            cells[i].innerHTML = `<input type="text" value="${book[key]}" data-index="${index}" data-key="${key}">`;
        });
      }
      reset();  
    }
    const backButton = document.querySelector(".back.mini-button");
    backButton.addEventListener("click", goBack);

    const saveCurrentRow = () => {
      let bookObjToBeSaved = currentArr[currentRow.rowIndex];
      const keys = Object.keys(editedBookObj);
      let nullOrFullPropertiesArr = [];

      // CHECK IF TABLE IS MISSING TEXT INPUT
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
    const saveButton = document.querySelector(".save.mini-button");
    saveButton.addEventListener("click", saveCurrentRow());
    
    const deleteCurrentRow = () => {
      currentArr.splice(currentRow.rowIndex, 1);
      reset();
    }
    const deleteButton = document.querySelector(".delete.mini-button");
    deleteButton.addEventListener("click", deleteCurrentRow());

    const reset = () => {
      readButton.removeEventListener("click", markAsRead);
      backButton.removeEventListener("click", goBack);
      saveButton.removeEventListener("click", saveCurrentRow);
      deleteButton.removeEventListener("click", deleteCurrentRow);
      buttonCont = '';
      tableModule.enableAllRows();
      tableModule.enableButtons();
    }
})();

export default editModule;