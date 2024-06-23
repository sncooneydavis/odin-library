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

  const renderRow = (bookObj, row) => {
    const cells = row.querySelectorAll('td');
    console.log(cells);
    Object.keys(bookObj).forEach((key, index) => {
      cells[index].innerHTML = `<input type="text" value="${bookObj[key]}" data-index= "${index}" data-key="${key}">`;      
    });
    renderRankCell(bookObj, row);
    if (library.setting == 'table-read') {
      renderDateCell(bookObj, row);
    } 
  }

  const renderRankCell = (book, row) => {
    let rankCellHTML = "";
    if (library.setting == "table-read") {
        const rankCell = row.cells[4];  
        // Populate with rating stars
        for (let i = 0; i < 5; i++) {
          rankCellHTML += `<img class='rating button ${i < book.rating ? 'on' : 'off'}' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>`;
        }
        rankCell.innerHTML = rankCellHTML;
    } 
    else {
      const rankCell = row.cells[3];  
      // Populate with priority flags
      for (let i = 0; i < 5; i++) {
        rankCellHTML += `<img class='priority button ${i < book.priority ? 'on' : 'off'}' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>`;
      }
      rankCell.innerHTML = rankCellHTML;
    }
  }
  const renderDateCell = (book, row) => {
    const dateCell = row.cells[5];
    dateCell.innerHTML = `<input type='date' value=${book.dateRead}>`;
  }


  const switchTable = (tableSwitchFrom) => {
    tableSwitchFrom.classList.remove('dim');
    tableSwitchFrom.style.display = 'none';
    if (library.setting == "table-read") {
      library.setting = "table-to-read";
      btnTogglesRead.disabled = false;
      btnTogglesToRead.disabled = true;
    }
    else {
      library.setting = "table-read";
      btnTogglesToRead.disabled = false;
      btnTogglesRead.disabled = true;
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
    switchTable: switchTable,
    disableCellsNotOnCurrentRow: disableCellsNotOnCurrentRow,
    enableAllRows: enableAllRows,
  };
})(); 

export default tableModule;