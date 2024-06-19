// EDIT TEXT IN TABLE CELLS
const tableModule = (function() {
  
  const btnTogglesRead = document.querySelector('.toggle-read');
  const btnTogglesToRead = document.querySelector('.toggle-to-read');

  // might want an additional fx that renders new lines only and edits only
  const renderTable = (workingTable, tableBody, libraryArr) => {
    tableBody.innerHTML = "";
    libraryArr.forEach((book, index) => {
      let row = tableBody.insertRow();
      Object.keys(book).forEach(key => {
          let cell = row.insertCell();
          cell.innerHTML = `<input type="text" value="${book[key]}" data-index="${index}" data-key="${key}">`;
      });
      renderLastCell(workingTable, row);    
    });
  }

  const renderLastCell = (workingTable, row) => {
    if (workingTable == "table-read") {
      row.cells[4].innerHTML = `
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
        <img class='rating button off' src='./images/Star-Mingcute.svg' alt="rating star" width='5'>
      `;
      const stars = row.cells[4].querySelector('img');
      for (let i = 0; i < book.rating; i++) {
        stars[i].classList.add('on');
        stars[i].classList.remove('off');
      }
    }
    else {
      row.cells[4].innerHTML = `
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
      <img class='priority button off' src='./images/Flag-Mingcute.svg' alt="priority" width='5'>
    `;
      const flags = row.cells[4].querySelector('img');
      for (let i = 0; i < book.priority; i++) {
        flags[i].classList.add('on');
        flags[i].classList.remove('off');
      }
    }
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
})();

export default tableModule;