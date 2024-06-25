// GLOBAL VARS
export let readLibraryArr = [
    {
        "title" : "The Complete Dreamsongs",
        "author" : "George R.R. Martin",
        "type" : "short stories",
        "subject" : "fantasy",
        "rating" : 4,
        "dateRead" : "2024-01-20",
    },
    {
        "title" : "When We Cease to Understand the World",
        "author" : "Benjamin Labatut",
        "type" : "literature",
        "subject" : "science, history, fantasy",
        "rating" : 5,
        "dateRead" : "2024-01-20",
    },
    {
        "title" : "Parable of the Talents",
        "author" : "Octavia E. Butler",
        "type" : "fiction",
        "subject" : "fantasy",
        "rating" : 3,
        "dateRead" : "2023-12-30",
    },
    {
        "title" : "Principles for Dealing with the Changing World Order: Why Nations Succeed and Fail",
        "author" : "Ray Dalio",
        "type" : "non-fiction",
        "subject" : "economics, history",
        "rating" : 2,
        "dateRead" : "2023-12-10",
    },
    {
        "title" : "Thus Spoke Zarathustra",
        "author" : "Friedrich Nietzsche",
        "type" : "classic",
        "subject" : "philosophy",
        "rating" : 3,
        "dateRead" : "2023-12-01",
    },
]; 
// storage array of books to-be-read. associated with table of books to-be-read.

export let toReadLibraryArr = [
    {
        "title" : "Tomorrow, and Tomorrow, and Tomorrow",
        "author" : "Gabrielle Zevin",
        "type" : "fiction",
        "priority" : 5,
    },
    {
        "title" : "The Dark Forest",
        "author" : "Cixin Liu",
        "type" : "fiction",
        "priority" : 4,
    },
    {
        "title" : "Babel:",
        "author" : "R.F. Kuang",
        "type" : "fiction",
        "priority" : 4,
    },
    {
        "title" : "Four Thousand Weeks: Time Management for Mortals",
        "author" : "Oliver Burkeman",
        "type" : "self-help",
        "priority" : 2,
    },
    {
        "title" : "A Swim in a Pond in the Rain: In Which Four Russians Give a Master Class on Writing, Reading, and Life",
        "author" : "George Saunders",
        "type" : "guide",
        "priority" : 3,
    },
    {
        "title" : "LikeWar: The Weaponization of Social Media",
        "author" : "P.W. Singer, Emerson T. Brooking",
        "type" : "non-fiction",
        "priority" : 1,
    },
    
]; 

// OBJECT CONSTRUCTORS
export function bookRead(title, author, type, subject, priority, dateRead) {
    this.title = title;
    this.author = author;
    this.type = type;
    this.subject = subject;
    this.priority = priority;
    this.dateRead = dateRead;
  }
 export function bookToRead(title, author, type, rating) {
    this.title = title;
    this.author = author;
    this.type = type;
    this.rating = rating;
  }

export const library = {
    // setting = string "table-read" or "table-to-read"
    _setting: "",  

    get setting() {
        return this._setting;
    },

    set setting(value) {
        this._setting = value;
    },

    get currentTable() {
        return document.querySelector(this._setting
        === "table-read" ? "#table-read" : "#table-to-read");
    },

    get notCurrentTable() {
        return document.querySelector(this._setting
        === "table-read" ? "#table-to-read" : "#table-read");
    },

    get currentTbody() {
        return this.currentTable.querySelector('tbody');
    },

    get currentArr() {
        return this._setting === "table-read" ? readLibraryArr : toReadLibraryArr;
    },
};

export const row = {
    _selected: null,

    get selected() {
        return this._selected;
    },

    set selected(element) {
        this._selected = element;
    },

    get selectedBookObj() {
        return library.currentArr[this.selectedIndex];
    },

    get selectedIndex() {
        return this._selected.rowIndex - 1;
    } 
};



