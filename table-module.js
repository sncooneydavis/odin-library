import './shared.js'; 
import { library, row, btnTogglesRead, btnTogglesToRead } from './shared.js';


// EDIT TEXT IN TABLE CELLS
const tableModule = (function() {

  const renderTable = () => {
    library.currentTbody.innerHTML = "";
    library.currentArr.forEach((book) => {
      let newRow = library.currentTbody.appendChild(document.createElement('tr'));
      Object.keys(book).forEach((key, index) => {
        const newCell = newRow.insertCell();          
        newCell.innerHTML = `<input type="text" value="${book[key]}" data-index= "${index}" data-key="${key}">`;       
      });
      renderRankCell(book, newRow);
      if (library.setting == 'table-read') {
        renderDateCell(book, newRow);
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
    let rankCellHTML = "";
    if (library.setting == "table-read") {
        const rankCell = newRow.cells[4];  
        // Populate with rating stars
        for (let i = 0; i < 5; i++) {
          rankCellHTML += `<img class='rating button ${i < bookObj.rating ? 'on' : 'off'}' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>`;
        }
        rankCell.innerHTML = rankCellHTML;
    } 
    else {
      const rankCell = newRow.cells[3];  
      // Populate with priority flags
      for (let i = 0; i < 5; i++) {
        rankCellHTML += `<img class='priority button ${i < bookObj.priority ? 'on' : 'off'}' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>`;
      }
      rankCell.innerHTML = rankCellHTML;
    }
  }

  const renderDateCell = (bookObj, newRow) => {
    const dateCell = newRow.cells[5];
    if (bookObj.dateRead) {
      dateCell.innerHTML = `<input type='date' value=${bookObj.dateRead}>`;
    }
    else {
      dateCell.innerHTML = `<input type='date' value=${getTodaysDate()}>`;
    }
  }
  const getTodaysDate = () => {
    const fullDate = new Date();
    let month = '0' + (fullDate.getMonth()+1);
    month = month.slice(-2);
    return `${fullDate.getFullYear()}-${month}-${fullDate.getDate()}`;
  }

  const switchTable = (tableSwitchFrom) => {
    tableSwitchFrom.classList.remove('dim');
    tableSwitchFrom.style.display = 'none';
    if (library.setting == "table-read") {
      library.setting = "table-to-read";
      btnTogglesRead.disabled = false;
      btnTogglesToRead.disabled = true;
    }
    else if (library.setting == 'table-to-read') {
      library.setting = "table-read";
      btnTogglesRead.disabled = true;
      btnTogglesToRead.disabled = false;
    }
    library.currentTable.style.display = '';
    tableModule.renderTable();
  }

  const disableCellsNotOnCurrentRow = () => {
    document.querySelectorAll('tr').forEach(tr => {
      if (tr !== row.selected) {
        tr.querySelectorAll('input, img').forEach(input => {
          input.disabled = true;
        }) 
      }
    })
  }

  const enableAllRows = () => {
    document.querySelectorAll('tr').forEach(tr => {
      tr.querySelectorAll('input, img').forEach(input => {
        input.disabled = false;
      }) 
    })
  }

  return {
    renderTable: renderTable,
    renderRow: renderRow,
    renderRankCell: renderRankCell,
    renderDateCell: renderDateCell,
    getTodaysDate: getTodaysDate,
    switchTable: switchTable,
    disableCellsNotOnCurrentRow: disableCellsNotOnCurrentRow,
    enableAllRows: enableAllRows,
  };
})(); 

export default tableModule;