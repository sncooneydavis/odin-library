import tableModule from './table-module.js';

const editModule = (function() {

    const buttonCont = document.querySelector(".mini-buttons");
    let workingTable;
    let row;
    let tableBody;
    let libraryArr;

    const addEditButtons = (importedWorkingTable, importedRow, importedTableBody, importedLibraryArr) => {
        // TODO: need to orient buttons to be near row selected 
        workingTable = importedWorkingTable;
        row = importedRow;
        tableBody = importedTableBody;
        libraryArr = importedLibraryArr;

        if (workingTable == "table-to-read") {
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
        // remove book obj from to-read array
        // add book obj to read array
        // re-render workingTable without the book obj's row
        
    }
    const readButton = document.querySelector(".read.mini-button");
    readButton.addEventListener("click", markAsRead);

    const goBack = () => {
      reset();  
    }
    const backButton = document.querySelector(".back.mini-button");
    backButton.addEventListener("click", goBack);

    const saveCurrentRow = (workingTable, row, libraryArr) => {
      let bookObjToBeSaved = libraryArr[row.rowIndex];
      const cells = row.cells;
      const keys = Object.keys(editedBookObj);
      let nullOrFullPropertiesArr = [];
      for (let i = 0; i < cells.length; i++) {
        const userInput = cells[i].querySelector('input').value;
        if (userInput && userInput == "") {
            nullOrFullPropertiesArr.push(null);
        }
        else if (userInput && userInput!= "") {
            bookObjToBeSaved[keys[i]] = userInput;
            nullOrFullPropertiesArr.push(userInput);
        }
        else if (!userInput) {
            let iconsOn = 0;
            for(let j = 1; j <= 5; j++) {
                let icons = cells[i].querySelector('img');
                if (icons[j].classList.contains('on')) {
                    iconsOn++;
                }
            }
            if (workingTable == "table-read") {
                bookObjToBeSaved.rating = iconsOn;
            }
            else {
                bookObjToBeSaved.priority = iconsOn;
            }
        }
      }
      if (nullOrFullPropertiesArr.contains('empty')) {
        for (let i = 0; i < cells.length; i ++) {
          if (nullOrFullPropertiesArr[i] == 'empty') {
            cells[i].classList.add('missing-input');
          }
          else {
            cells[i].classList.remove('missing-input');
          }
        }
      }
      else {
        libraryArr[row.rowIndex] = editedBookObj;
        tableModule.enableButtons();
        for (let i = 0; i < cells.length; i++) {
            cells[i].querySelector('input').value = nullOrFullPropertiesArr[i];
        }
        reset();
      }
    }
    const saveButton = document.querySelector(".save.mini-button");
    saveButton.addEventListener("click", saveCurrentRow(workingTable, row, libraryArr));
    
    const deleteCurrentRow = (row, libraryArr) => {
      libraryArr.splice(row.rowIndex, 1);
      reset();
    }
    const deleteButton = document.querySelector(".delete.mini-button");
    deleteButton.addEventListener("click", deleteCurrentRow(row, libraryArr));

    const reset = () => {
      readButton.removeEventListener("click", markAsRead);
      backButton.removeEventListener("click", goBack);
      saveButton.removeEventListener("click", saveCurrentRow);
      deleteButton.removeEventListener("click", deleteCurrentRow);
      buttonCont = '';
      tableModule.renderTable(tableBody, libraryArr);
      tableModule.enableButtons();
      tableModule.enableAllRows();
    }
})();

export default editModule;