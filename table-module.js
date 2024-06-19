import './shared.js';

// EDIT TEXT IN TABLE CELLS
const tableModule = (function() {

  const renderTable = (tableBody) => {
    tableBody.innerHTML = "";
    currentArr.forEach((book, index) => {
      let rowRendering = tableBody.insertRow();
      Object.keys(book).forEach(key => {
          let cell = rowRendering.insertCell();
          cell.innerHTML = `<input type="text" value="${book[key]}" data-index="${index}" data-key="${key}">`;
      });
      renderLastCell(rowRendering);    
    });
  }

  const renderLastCell = (rowRendering) => {
    if (currentTableNameIs == "table-read") {
      rowRendering.cells[4].innerHTML = `
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
      `;
      const stars = rowRendering.cells[4].querySelector('img');
      for (let i = 0; i < book.rating; i++) {
        stars[i].classList.add('on');
        stars[i].classList.remove('off');
      }
    }
    else {
      rowRendering.cells[4].innerHTML = `
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
    `;
      const flags = rowRendering.cells[4].querySelector('img');
      for (let i = 0; i < book.priority; i++) {
        flags[i].classList.add('on');
        flags[i].classList.remove('off');
      }
    }
  }

  const disableRowsNot = (row) => {
    document.querySelectorAll('tr').forEach(row => {
      if (row !== currentRow) {
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

  const makeBtnArr = () => {
    const btnAddsBook = document.querySelector(".add-button");
    const btnTogglesRead = document.querySelector('.toggle-read');
    const btnTogglesToRead = document.querySelector('.toggle-to-read');
    return [btnAddsBook, btnTogglesRead, btnTogglesToRead];
  }

  const disableButtons = () => {
    const btnArr = makeBtnArr();
    for (let btn of btnArr) {
      btn.disabled = true;
    }
  }

  const enableButtons = () => {
    const btnArr = makeBtnArr();
    for (let btn of btnArr) {
        btn.disabled = false;
    }
  }

})();

export default tableModule;