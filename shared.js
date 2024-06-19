// GLOBAL VARS
export let readLibraryArr = []; // storage array of books read. associated with table of books read.
export let toReadLibraryArr = []; // storage array of books to-be-read. associated with table of books to-be-read.

export let currentTableNameIs; // string describing which table is in view
export let currentTable = currentTableNameIs =="table-read" ? document.querySelector("#table-read") : document.querySelector("#table-to-read"); // access table corresponding to which table is in view.
export let currentArr = currentTableNameIs == "table-read" ? readLibraryArr : toReadLibraryArr; // accesses array corresponding to which table is in view.

export let currentRow; // HTML selector of row upon clicking or rendering

export const btnAddsBook = document.querySelector(".add-button");
export const btnTogglesRead = document.querySelector('.toggle-read');
export const btnTogglesToRead = document.querySelector('.toggle-to-read');
