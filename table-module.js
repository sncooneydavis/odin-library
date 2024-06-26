import editModule from './edit-module.js';
import './shared.js'; 
import {bookRead, bookToRead, library, row} from './shared.js';


// EDIT TEXT IN TABLE CELLS
const tableModule = (function() {
  const btnAddsReadBook = document.querySelector(".add.button");
  const btnAddsUnreadBook = document.querySelector(".add.button");
  const btnTogglesRead = document.querySelector('.toggle-read');
  const btnTogglesToRead = document.querySelector('.toggle-to-read');

  const renderTable = () => {
    library.currentTbody.innerHTML = "";
    library.currentArr.forEach((book) => {
      let newRow = library.currentTbody.appendChild(document.createElement('tr'));
      Object.keys(book).forEach((key, index) => {
        const newCell = newRow.insertCell();          
        newCell.innerHTML = `<input type="text" value="${book[key]}" data-index= "${index}" data-key="${key}">`;       
      });
      renderRankCell(book, newRow);
      if (library.setting == "table-read") {
        renderDateCell(book, newRow);
      } 
      else if (library.setting == "table-to-read") {
        return;
      }
    }) 
  }

  const renderRow = (bookObj, newRow) => {
    const cells = newRow.querySelectorAll('td');
    Object.keys(bookObj).forEach((key, index) => {
      cells[index].innerHTML = `<input type="text" value="${bookObj[key]}" data-index= "${index}" data-key="${key}">`;
    });
    renderRankCell(bookObj, newRow);
    if (library.setting == 'table-read') {
      renderDateCell(bookObj, newRow);
    } 
  }

  const renderRankCell = (bookObj, newRow) => {
    let rankCell;
    if (library.setting == "table-read") {
      rankCell = newRow.cells[4];
      }
    else if (library.setting == "table-to-read") {
      rankCell = newRow.cells[3];  
    }
      rankCell.classList.add('rank-cell');        
    // Populate with rating stars/priority flags
    // from book saved in array 
    if (bookObj.rating) {
      renderSelected(rankCell, bookObj.rating-1);
    }
    // from new (empty) book in array 
    else if (bookObj.priority) {
      renderSelected(rankCell, bookObj.priority-1);
    }
    else {
      renderUnselected(rankCell);
    }
  }

  const renderUnselected = (rankCell) => {
    rankCell.innerHTML = "";
    if (library.setting == "table-read") {
      for (let i = 0; i < 5; i++) {
        rankCell.innerHTML += `
          <input type="image" class="rating button" data-order="${i}" src="./images/Star-Mingcute.svg" alt="Rate">
        `;
      }
    }
    else if (library.setting == "table-to-read") {
      for (let i = 0; i < 5; i++) {
        rankCell.innerHTML += `
          <input type="image" class="rating button" data-order="${i}" src="./images/Flag-Mingcute.svg" alt="Rate">
        `;
      }
    }
  }

  const renderSelected = (rankCell, rating) => {
    rankCell.innerHTML = "";
    if (library.setting == "table-read") {
      for (let i = 0; i < 5; i++) {
        rankCell.innerHTML += `
          <input type="image" class="rating button ${i <= rating ? 'on' : 'off'}" data-order="${i}" src="./images/Star-Fill-Mingcute.svg" alt="Rate">
        `;
      } 
    }
    else if (library.setting == "table-to-read") {
      for (let i = 0; i < 5; i++) {
        rankCell.innerHTML += `
          <input type="image" class="rating button ${i <= rating ? 'on' : 'off'}" data-order="${i}" src="./images/Flag-Fill-Mingcute.svg" alt="Rate">
        `;
      } 
    }
  }

  const renderDateCell = (bookObj, newRow) => {
    const dateCell = newRow.cells[5];
    if (bookObj.dateRead) {
      dateCell.innerHTML = `<input type='date'  class='date-input' value=${bookObj.dateRead}>`;
    }
    else {
      dateCell.innerHTML = `<input type='date'  class='date-input' value=${getTodaysDate()}>`;
    }
  }
  const getTodaysDate = () => {
    const fullDate = new Date();
    let month = '0' + (fullDate.getMonth()+1);
    month = month.slice(-2);
    return `${fullDate.getFullYear()}-${month}-${fullDate.getDate()}`;
  }

  const switchTable = (tableSwitchFrom) => {
    tableSwitchFrom.style.display = 'none';
    if (library.setting == "table-read") {
      library.setting = "table-to-read";
      btnTogglesRead.disabled = false;
      btnTogglesToRead.disabled = true;
    }
    else if (library.setting == "table-to-read") {
      library.setting = "table-read";
      btnTogglesRead.disabled = true;
      btnTogglesToRead.disabled = false;
    }
    library.currentTable.style.display = '';
    renderTable();
    editModule.initEditing();
  }

  const addBook = () => {
    let newBook;
    if (library.setting == "table-read") {
      newBook = new bookRead();
    }
    else if (library.setting == "table-to-read") {
      newBook = new bookToRead();
    }
    library.currentArr.unshift(newBook);
    let newRow = library.currentTbody.insertRow(0);
    row.selected = newRow;
    for (let i = 0; i < Object.keys(newBook).length; i++) {
      let newCell = newRow.insertCell();
      newCell.innerHTML = `<input type="text" value="" data-index= "" data-key="">`;  
    }
    // add rank buttons 
    tableModule.renderRankCell(newBook, newRow);
    if (library.setting == "table-read"){
      tableModule.renderDateCell(newBook, newRow);
    }
    
    row.selected = library.currentTable.rows[1];
    editModule.edit();
  }

  const disableHeaderButtons = () => {
    const btnArr = [tableModule.btnAddsUnreadBook, tableModule.btnAddsReadBook, tableModule.btnTogglesRead, tableModule.btnTogglesToRead];
    for (let btn of btnArr) {
      btn.disabled = true;
    }
  }

  const disableCellsNotOnCurrentRow = () => {
    document.querySelectorAll('tr').forEach(tr => {
      if (tr !== row.selected) {
        tr.style.border = 'none';
        tr.querySelectorAll('input').forEach(input => {
          input.disabled = true;
        }) 
      }
      else if (tr == row.selected) {
        tr.classList.add('hovering');
      }
    })
  }
  

  const enableAllRows = () => {
    document.querySelectorAll('tr').forEach(tr => {
      tr.querySelectorAll('input').forEach(input => {
        input.disabled = false;
        tr.style.border = '';
        tr.classList.remove('hovering');
      }) 
    })
  }

  return {
    btnAddsReadBook: btnAddsReadBook,
    btnAddsUnreadBook: btnAddsUnreadBook,
    btnTogglesRead: btnTogglesRead,
    btnTogglesToRead: btnTogglesToRead,
    renderTable: renderTable,
    renderRow: renderRow,
    renderRankCell: renderRankCell,
    renderDateCell: renderDateCell,
    renderSelected: renderSelected, 
    renderUnselected: renderUnselected,
    getTodaysDate: getTodaysDate,
    switchTable: switchTable,
    addBook: addBook,
    disableHeaderButtons: disableHeaderButtons,
    disableCellsNotOnCurrentRow: disableCellsNotOnCurrentRow,
    enableAllRows: enableAllRows,
  };

})(); 

export default tableModule;