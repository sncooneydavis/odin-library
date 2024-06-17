// EDIT TEXT IN TABLE CELLS

const tableModule = (function() {

  const tableRead = document.querySelector('#table-read');
  const tableToRead = document.querySelector('#table-to-read');

  const fillTable = (workingTable, segmentToFillWith) => {
    if (workingTable == "table-read") {
      const tableReadBody = document.getElementById('table-read').querySelector('tbody');
      for (const book of segmentToFillWith) {
          const readBookHTML = `
            <tr>
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.type}</td>
              <td>${book.subject}</td>
              <td>${book.rating}</td>
              <td>${book.dateRead}</td>
              <td class="button-holder"></td>
            </tr>
          `;
          tableReadBody.innerHTML = readBookHTML;
      }
    }
    else if (workingTable == "table-to-read") {
      const tableToReadBody = document.getElementById('table-to-read').querySelector('tbody');
      for (const book of segmentToFillWith) {
          const toReadBookHTML = `
            <tr>
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.type}</td>
              <td>${book.priority}</td>
              <td class="button-holder"></td>
            </tr>
          `;
          tableToReadBody.insertAdjacentHTML('afterbegin', toReadBookHTML); 
      }  
    }
  }

  const hideTable = (workingTable) => {
    if (workingTable == "table-read") {
      tableRead.classList.add('hidden');
      tableToRead.classList.remove('hidden');
      workingTable = "table-to-read";
    }
    else {
      tableRead.classList.remove('hidden');
      tableToRead.classList.add('hidden');
      workingTable = "table-read";
    }
  }

  const addBookRow = (workingTable) => {

    if (workingTable == "table-read") {
        const newRowHTML = `
          <tr> 
            <td class="new"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="button-holder"></td>
          </tr>
        `;
        tableRead.insertAdjacentHTML('afterbegin', newRowHTML);
        
      }
      if (workingTable == "table-to-read") {
        const newRowHTML = `
          <tr> 
            <td class="new"></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="button-holder"></td>
          </tr>
        `;
        tableToRead.insertAdjacentHTML('afterbegin', newRowHTML);
    }
    const firstCell = document.querySelector(".dim.new");
    addEditButtons(firstCell);
  }

  //ADD BUTTONS TO LAST CELL OF TABLE
  const addEditButtons = (cell) => {
    function insertHtmlInLastCell(cell, htmlContent) {
      const lastCell = cell.closest('tr').querySelector('td:last-child');
      lastCell.innerHTML += htmlContent;
    }
    const saveButtonHTML = `
      <input type="image" class="save mini-button" src="./images/Save-Mingcute.svg" alt="Save" width="20">
    `;
    insertHtmlInLastCell(cell, saveButtonHTML);

    const deleteButtonHTML = `
      <input type="image" class="delete mini-button" src="./images/Delete-Mingcute.svg" alt="Delete" width="20">
    `;
    insertHtmlInLastCell(cell, deleteButtonHTML);
  } 

  // CHANGE CELL CONTENT
  const editCell = (cell) => {
    rowBeingEdited = cell.closest('tr');
    // TODO: Force focus on row being edited until save or delete is clicked
    cell.textContent = "";
    cell.innerHTML = `
      <input type="text" class="dim" />
    `;
    // SAVE EDITS TO ARRAY
    const saveButton = document.querySelector(".save.mini-button");
    saveButton.addEventListener("click", () => {
      const selectorsInRow = Array.from(rowBeingEdited.querySelectorAll('td'));
      let dataInRow = [];
      for (let selector of selectorsInRow) {
        const input = selector.querySelector('input');
        if (input) {
          dataInRow.push(input.value);
        } else {
          dataInRow.push(selector.innerText);
        }
      }
      
    });
    // DELETE EDITS
    const deleteButton = document.querySelector("delete.mini-button");
    deleteButton.addEventListener("click", () => {
      
    })

    editingMode = "off";
  }
  
})();


    
        

    //event listener delete button: delete row in table and corresponding obj in arr


    // no save if title or author cell empty
    // event listener on save: add or update corresponding object in array



export default tableModule;