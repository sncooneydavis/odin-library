// EDIT TEXT IN TABLE CELLS

const tableModule = (function() {

  const tableRead = document.querySelector('#table-read');
  const tableToRead = document.querySelector('#table-to-read');
  const tableReadBody = tableRead.querySelector('tbody');
  const tableToReadBody = tableToRead.querySelector('tbody');

  const renderTable = (workingTable, libraryArr) => {
    if (workingTable == "table-read") { 
      tableReadBody.innerHTML = "";
      libraryArr.forEach((book, index) => {
        let row = tableReadBody.insertRow();
        Object.keys(book).forEach(key => {
            let cell = row.insertCell();
            cell.innerHTML = `<input type="text" value="${book[key]}" data-index="${index}" data-key="${key}">`;
        });
      });
    }
    else if (workingTable == "table-to-read") {
      tableToReadBody.innerHTML = "";
      libraryArr.forEach((book, index) => {
        let row = tableToReadBody.insertRow();
        Object.keys(book).forEach(key => {
            let cell = row.insertCell();
            cell.innerHTML = `<input type="text" value="${book[key]}" data-index="${index}" data-key="${key}">`;
        });
      });
    }
    let lastCell = row.insertCell();
    lastCell.innerHTML = `<td class='mini-button container'></td>`;
    addEditButtons(row);
  }

  const hideTable = (workingTable) => {
    if (workingTable == "table-to-read") {
      tableRead.classList.add('hidden');
      tableToRead.classList.remove('hidden');
    }
    else {
      tableRead.classList.remove('hidden');
      tableToRead.classList.add('hidden');
    }
  }

  const addBook = (workingTable, libraryArr) => {
    const newBook = new bookToRead();
    libraryArr.push(newBook);
    renderTable(workingTable, libraryArr);
    disableRowsNot() // TODO not first row


  }

  const disableRowsNot = (selectedRow) => {
    document.querySelectorAll('tr').forEach(row => {
      if (row !== selectedRow) {
        row.querySelectorAll('input, button').forEach(input => {
          input.disabled = true;
        }) 
      }
    })

  }

  const disableButtons = (...) => {
    //disable each button in list supplied
  }

  const enable = (workingTable, addButton, btnTogglesRead, btnTogglesToRead) => {
    addButton.disabled = false;
    if (workingTable == 'table-read') {
      btnTogglesRead.disabled = false;
    }
    else {
      btnTogglesToRead.disabled = false;
    }
  }

  //ADD EDIT BUTTONS TO LAST CELL OF TABLE
  const addEditButtons = (row) => {
    const lastCell = row.cells[row.cells.length - 1];
    lastCell.innerHTML = `
      <input type="image" class="save mini-button" src="./images/Save-Mingcute.svg" alt="Save" width="20">
      <input type="image" class="delete mini-button" src="./images/Delete-Mingcute.svg" alt="Delete" width="20">
    `;

    // EVENT LISTENERS ON SAVE BUTTON
    const saveButton = document.querySelector(".save.mini-button");
    saveButton.addEventListener("click", () => {
      
    })

    //EVENT LISTENER ON DELETE BUTTON
    const deleteButton = document.querySelector("delete.mini-button");
    deleteButton.addEventListener("click", () => {
      
    })
  } 

  // EDIT EXISTING OR NEW CELL CONTENT 
  const editCell = () => {
    

  }
  
    // SAVE EDITS
        // event listener on save: add or update corresponding object in array
        // no save if title or author cell empty
        enableButtons();



    // DELETE EDITS
        //event listener delete button: delete row in table and corresponding obj in arr
      enableButtons();

})();

export default tableModule;