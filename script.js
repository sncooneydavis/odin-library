class Model {
  static collection = [
    {
      title: 'Cosmicomics',
      author: 'Italo Calvino',
      genre: 'Science Fiction',
      pageCount: 172,
      readBool: false,
      dateRead: null,
      rating: null,
    },
  ];
  static idCounter = 0;
  
  constructor(title, author, genre, pageCount, readBool, dateRead, rating) {
    Model.idCounter++;

    this.id = Model.idCounter;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.readBool = readBool;
    this.dateRead = readBool? dateRead :null;
    this.rating = readBool? rating :null;

    Model.collection.unshift(this);
  }

  static editData(value, book, field) {
    book[field] = value;
  } 

  static getBook(target) {
    const bookId = parseInt(target.closest('[data-id]').dataset.id, 10);
    return Model.collection.find(book => book.id === bookId);
  }
}

class View {
  static libraryTableElement = document.querySelector('#libraryTable');
  static activeRow = null;
  static saveButton = null;
  static backButton = null;
  static deleteButton = null;
  

  static getRatingCell(target) {
    return target.closest('td').nextElementSibling;
  }
  static getDateReadInput(target) {
    return target.closest('td').previousElementSibling.firstElementChild;
  }

  static {  
    // Listen for click on add-book button
    document.querySelector('#add-book-button').addEventListener('click', () => {
      const row = document.createElement('tr');
      View.renderBlankBook(row);
      View.libraryTableElement.appendChild(row);
      View.activeRow = row;
      View.activate(View.activeRow, true);
    });

    // Listen for mouseover on rating stars 
    View.libraryTableElement.addEventListener('mouseover', (e) => {
      if (e.target.getAttribute('type') === 'image') {
        for (let star of View.getRatingCell(e.target).children) {
          if (star.dataset.starNumber <= e.target.dataset.starNumber) {
            star.style.opacity = '1';
          }
          else {
            star.style.opacity = '0.25';
          }
        }
      } 
    });

    // Listen for click on rating image
    View.libraryTableElement.addEventListener('click', (e) => {
      if (e.target.getAttribute('type') === 'image') {
        const ratingCell = View.getRatingCell();
        for (let star of ratingCell.children) {
          if (star.dataset.starNumber <= target.dataset.starNumber) {
            star.style.opacity = '1';
          }
          else {
            star.style.opacity = '0';
          }
        }
      }
    });
  }

  static renderCellElement(value, field, placeholder, type) {
    const cellElmt = document.createElement('td');
    const inputElmt = document.createElement('input');
    inputElmt.setAttribute('type', type);
    inputElmt.value = value;
    inputElmt.placeholder = placeholder;
    inputElmt.dataset.field = field;
    cellElmt.appendChild(inputElmt);
    return cellElmt;
  }

  static renderReadElement(readBool) {
    const readCellElmt = document.createElement('td');
    const readCheckboxElmt = document.createElement('input');
    readCheckboxElmt.setAttribute('type', 'checkbox');
    if (readBool) {
      readCheckboxElmt.checked = true;
    }
    readCheckboxElmt.dataset.field = 'readBool';
    readCellElmt.appendChild(readCheckboxElmt);
    return readCellElmt;
  }

  static renderDateElement(dateRead, readBool) {
    const dateReadCellElmt = document.createElement('td');
    const dateReadIptElmt = document.createElement('input');
    dateReadIptElmt.setAttribute('type', 'date');
    dateReadIptElmt.value = dateRead;
    if (!readBool) {
      dateReadIptElmt.disabled = true;
    }
    dateReadIptElmt.dataset.field = 'dateRead';
    dateReadCellElmt.appendChild(dateReadIptElmt);
    return dateReadCellElmt;
  }

  static renderRatingElement(rating, readBool) {
    const ratingCellElmt = document.createElement('td');
    for (let i = 1; i < 6; i++) {
      const ratingStarIptElmt = document.createElement('input');
      ratingStarIptElmt.setAttribute('type', 'image');
      ratingStarIptElmt.setAttribute('src', './images/Star-Fill-Mingcute.svg');
      ratingStarIptElmt.dataset.starNumber = i;
      if (readBool) {
        if (rating && i <= rating) {
          ratingStarIptElmt.style.opacity = '1';
        }
        else {
          ratingStarIptElmt.style.opacity = '0';
        }
      }
      else {
        ratingStarIptElmt.disabled = true;
        ratingStarIptElmt.style.opacity = '0';
      }
      ratingCellElmt.appendChild(ratingStarIptElmt);
    }
    return ratingCellElmt;
  }

  static activate(activeRow, newBool) {
    // Activate target row
    View.activeRow = activeRow;
    activeRow.classList.add('activated');

    // Render editing container
    const editingDiv = document.createElement('div');
    editingDiv.setAttribute('id', 'editor-container');
    const saveButton = document.createElement('button');
    saveButton.setAttribute('src', './images/Check-Mingcute.svg');
    saveButton.addEventListener('click', Controller.attemptSave());
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('src', './images/Delete-Mingcute.svg');
    deleteButton.addEventListener('click', Controller.delete());
    if (!newBool) {
      const backButton = document.createElement('button');
      backButton.setAttribute('src', './images/Back-Mingcute.svg');
      backButton.addEventListener('click', () => {
        View.renderBook(View.getBook());
        View.reactivateAllRows();
      });
      editingDiv.append(saveButton, backButton, deleteButton);
    }
    else {
      editingDiv.append(saveButton, deleteButton);
    }
    document.querySelector('#main-container').append(editingDiv);

    // Place editing container


    // Deactivate all other rows
    View.libraryTableElement.querySelectorAll('tr').forEach(row => {
      if (row !== activeRow) {
        row.classList.add('deactivated'); 
        row.querySelectorAll('input').forEach(input => { input.disabled = true });
      } 
    });
  }

  static renderBook(book, row) {
    row.dataset.id = book.id;
    row.append(
      View.renderCellElement(book.title, 'title', 'Title', 'text'),
      View.renderCellElement(book.author, 'author', 'Author', 'text'),
      View.renderCellElement(book.genre, 'genre', 'Genre(s)', 'text'),
      View.renderCellElement(book.pageCount, 'pageCount', 'Pages', 'number'),

      View.renderReadElement(book.readBool),
      View.renderDateElement(book.dateRead, book.readBool), 
      View.renderRatingElement(book.rating, book.readBool)
    )
  }

  static renderBlankBook(row) {
    bookRowElmt.append(
      View.renderCellElement('', 'title', 'Title', 'text'),
      View.renderCellElement('', 'author', 'Author', 'text'),
      View.renderCellElement('', 'genre', 'Genre(s)', 'text'),
      View.renderCellElement(0, 'pageCount', 'Pages', 'number'),

      View.renderReadElement(false),
      View.renderDateElement('', false), 
      View.renderRatingElement('', false)
    )
  }

  static reactivateAllRows() {
    View.activeRow = null;
    View.libraryTableElement.querySelectorAll('tr').forEach(row => { 
      row.classList.remove('deactivated', 'activated'); 
      row.querySelectorAll('input').forEach(input => { input.disabled = false });
    })
    document.querySelector('#editor-container').remove();

  }

  static updateDateElementOnReadChange(readBool, dateReadValue, target) {
    const dateReadInput = View.getDateReadInput(target);
    dateReadInput.disabled = !readBool;
    dateReadInput.value = dateReadValue ;
  }

  static updateRatingElementOnReadChange(readBool, target) {
    const ratingCell = View.getRatingCell(target);
    for (let star of ratingCell.children) {
      star.disabled = !readBool;
      if (readBool) {
          star.style.opacity = '0.25';
      }
      else {
        star.style.opacity = '0';
      }
    }
  }
}
class Controller {

  static initialize() {
    for (book in Model.collection){
      const newRow = document.createElement('tr');
      View.renderBook(book, newRow);
      libraryTableElement.appendChild(newRow);
    }
  }

  static {
    
    // Listen for checkbox change 
    View.libraryTableElement.addEventListener('change', (e) => {
      if (e.target.getAttribute('type') === 'checkbox') {
        const book = Model.getBook(e.target);
        book.readBool = !book.readBool;
        const todayOrNull = book.readBool? Controller.getTodayDate() :null;

        

        View.updateDateElementOnReadChange(book.readBool, todayOrNull, e.target);
        View.updateRatingElementOnReadChange(book.readBool, e.target);
      }
    });

    // Listen for focusout on input elements to update model data
    // View.libraryTableElement.addEventListener('focusout', (e) => {
    //   const type = e.target.getAttribute('type');
    //   if ( type === 'text' || type === 'number' || type === 'date') {
    //     Model.editData(e.target.value, Model.getBook(e.target), e.target.dataset.field);
    //   }
    // });

    
  }

  static getActiveBook(thingToReturn) {
    const idOfActiveRow = parseInt(View.activeRow.dataset.id, 10);
    if (thingToReturn == 'index') {
      return Model.collection.findIndex((book) => book.id === idOfActiveRow);
    }
    else if (thingToReturn == 'book') {
      return Model.collection.find(book => book.id === idOfActiveRow);
    }
  }

  static attemptSave() {
    bookRowElmt.dataset.id = book.id;
    for(let cell of View.activeRow.children) {
      if (cell.firstElementChild.type == 'text') {
        if ()
        return;
      }
    }
    for(let cell of View.activeRow.children) {
      Model.editData(value, book, field);
    }
    View.reactivateAllRows();

    // Model.editData(todayOrNull, book, 'dateRead');
        // Model.editData(null, book, 'rating');
  }

  static delete() {
    Model.collection.splice(Controller.getActiveBook('index'), 1);
    View.activeRow.remove();
    View.reactivateAllRows();
  }

  static getTodayDate() {
    const fullDate = new Date();
    const month = String(fullDate.getMonth() + 1).padStart(2, '0');
    const day = String(fullDate.getDate()).padStart(2, '0');
    return `${fullDate.getFullYear()}-${month}-${day}`;
  }
}

Controller.initialize();