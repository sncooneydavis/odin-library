
//POPULATE TABLES
function fillTable(tableType, library) {
    if (tableType == tableReadBody) {
        for (const book of library) {
            const readBookHTML = `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                    <td>${book.subject}</td>
                    <td>${book.rating}</td>
                    <td>${book.dateRead}</td>
                    <td class="button-holder"></td>
                </tr>
            `;
            tableType.innerHTML = readBookHTML;
        }
    }
    else if (tableType == tableToReadBody) {
        for (const book of library) {
            const toReadBookHTML = `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                    <td>${book.priority}</td>
                    <td class="button-holder"></td>
                </tr>
            `;
            tableType.innerHTML = toReadBookHTML;
        }  
    }
}

export default fillTable; 
