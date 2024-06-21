import './shared.js';

// EDIT TEXT IN TABLE CELLS
const tableModule = (function() {

  const renderTable = () => {
    currentTbody = currentTable.querySelector('tbody');
    currentTbody.innerHTML = "";
    currentArr.forEach((book, index) => {
      currentRow = tbody.insertRow();
      Object.keys(book).forEach(key => {
          let cell = currentRow.insertCell();
          cell.innerHTML = `<input type="text" value="${book[key]}" data-index="${index}" data-key="${key}">`;
      });
      renderLastCell(currentRow);    
    });
  }

  const renderLastCell = () => {
    if (currentTableNameIs == "table-read") {
      currentRow.cells[4].innerHTML = `
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
      `;
      const stars = currentRow.cells[4].querySelector('img');
      for (let i = 0; i < currentArr[currentRow.rowIndex].rating; i++) {
        stars[i].classList.add('on');
        stars[i].classList.remove('off');
      }
    }
    else {
      currentRow.cells[4].innerHTML = `
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
    `;
      const flags = currentRow.cells[4].querySelector('img');
      for (let i = 0; i < currentArr[currentRow.rowIndex].rating; i++) {
        flags[i].classList.add('on');
        flags[i].classList.remove('off');
      }
    }
  }


  const disableCellsNotOnCurrentRow = () => {
    document.querySelectorAll('tr').forEach(row => {
      if (row !== currentRow) {
        row.querySelectorAll('input, img').forEach(input => {
          input.disabled = true;
        }) 
      }
    })
  }

  const enableAllRows = () => {
    document.querySelectorAll('tr').forEach(row => {
      row.querySelectorAll('input, img').forEach(input => {
        input.disabled = false;
      }) 
    })
  }

  const disableHeaderButtons = () => {
    const btnArr = [btnAddsBook, btnTogglesRead, btnTogglesToRead];
    for (let btn of btnArr) {
      btn.disabled = true;
    }
  }

  const enableButtons = () => {
    const btnArr = [btnAddsBook, btnTogglesRead, btnTogglesToRead];
    for (let btn of btnArr) {
        btn.disabled = false;
    }
  }
})();

export default tableModule;