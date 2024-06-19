// GLOBAL VARS

export let currentTableNameIs; // string describing which table is in view
export let currentRow; // HTML selector of row in focus
export let readLibraryArr = []; // storage array of books read. associated with table of books read.
export let toReadLibraryArr = []; // storage array of books to-be-read. associated with table of books to-be-read.
export let currentArr = currentTable == "table-read" ? readLibraryArr : toReadLibraryArr; // accesses table corresponding to which table is in view.

