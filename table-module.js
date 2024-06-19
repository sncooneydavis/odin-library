// EDIT TEXT IN TABLE CELLS

const tableModule = (function() {
  
  const tableRead = document.querySelector('#table-read');
  const tableToRead = document.querySelector('#table-to-read');
  const tableReadBody = tableRead.querySelector('tbody');
  const tableToReadBody = tableToRead.querySelector('tbody');
  const btnTogglesRead = document.querySelector('.toggle-read');
  const btnTogglesToRead = document.querySelector('.toggle-to-read');


  const renderTable = (tableBody, libraryArr) => {
    tableBody.innerHTML = "";
    libraryArr.forEach((book, index) => {
      let row = tableBody.insertRow();
      Object.keys(book).forEach(key => {
          let cell = row.insertCell();
          cell.innerHTML = `<input type="text" value="${book[key]}" data-index="${index}" data-key="${key}">`;
      });
    });
  }

  const disableRowsNot = (selectedRow) => {
    document.querySelectorAll('tr').forEach(row => {
      if (row !== selectedRow) {
        row.querySelectorAll('input').forEach(input => {
          input.disabled = true;
        }) 
      }
    })
  }
  const enableAllRows = () => {
    document.querySelectorAll('tr').forEach(row => {
      row.querySelectorAll('input').forEach(input => {
        input.disabled = false;
      }) 
    })
  }
  const disableButtons = () => {
    const buttonArr = [btnAddsBook, btnTogglesRead, btnTogglesToRead];
    for (let btn of buttonArr) {
      btn.disabled = true;
    }
  }
  const enableButtons = () => {
    const buttonArr = [btnAddsBook, btnTogglesRead, btnTogglesToRead];
    for (let btn of buttonArr) {
      btn.disabled = false;
    }
  }

  const addEditButtons = (row, tableBody, libraryArr) => {
    // TODO: need to orient buttons to be near row selected 
    // working table, buttonCont, libraryArr, row, 

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

    // EVENT LISTENERS + FXY FOR MINI BUTTONS
    function markAsRead() {
        
    }
    const readButton = document.querySelector(".read.mini-button");
    readButton.addEventListener("click", markAsRead);

    function goBack() {
      reset();  
    }
    const backButton = document.querySelector(".back.mini-button");
    backButton.addEventListener("click", goBack);

    function saveCurrentRow() {
      let editedBookObj = libraryArr[row.rowIndex];
      const cells = row.cells;
      const keys = Object.keys(editedBookObj);
      let nullOrFullPropertiesArr = [];
      for (let i = 0; i < cells.length; i++) {
        const userInput = cells[i].querySelector('input').value;
      if (userInput == "") {
        nullOrFullPropertiesArr.push(null);
      }
      else {
        editedBookObj[keys[i]] = userInput;
        nullOrFullPropertiesArr.push(userInput);
      }
      }
      if (nullOrFullPropertiesArr.contains('empty')) {
        for (let i = 0; i < cells.length; i ++) {
          if (nullOrFullPropertiesArr[i] == 'empty') {
            cells[i].classList.add('missing-input');
          }
        }
      }
      else {
        libraryArr[row.rowIndex] = editedBookObj;
        enableButtons();
        for (let i = 0; i < cells.length; i++) {
            cells[i].querySelector('input').value = nullOrFullPropertiesArr[i];
        }
        reset();
      }
    }
    const saveButton = document.querySelector(".save.mini-button");
    saveButton.addEventListener("click", saveCurrentRow);
    
    function deleteCurrentRow() {
      libraryArr.splice(row.rowIndex, 1);
      reset();

    }
    const deleteButton = document.querySelector(".delete.mini-button");
    deleteButton.addEventListener("click", deleteCurrentRow);

    const reset = () => {
      readButton.removeEventListener("click", markAsRead);
      backButton.removeEventListener("click", goBack);
      saveButton.removeEventListener("click", saveCurrentRow);
      deleteButton.removeEventListener("click", deleteCurrentRow);
      buttonCont = '';
      renderTable(tableBody, libraryArr);
      enableButtons();
      enableAllRows();
    }
  } 
})();

export default tableModule;