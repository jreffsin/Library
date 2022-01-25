//next things todo:
//make it so that ids of rows and cells change when rows are deleted
//(otherwise deleting a row will cause display table and myLibrary array to be out of sync, 
//which will be a problem once user has ability to add elements themselves)


let myLibrary = [];
let tableRowElements = 6;
let submit_btn = document.getElementById('submit_btn');
submit_btn.addEventListener('click', updateTable);

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary (title, author, pages, read) {
    let newId = myLibrary.length;
    let newBook = new Book(title, author, pages, read, newId);
    myLibrary.push(newBook);
}

function populateTable(){
    for (let i = 0; i < myLibrary.length; i++){
        appendToTable(i);
    }
}

function updateTable(){
    if (updateLibraryArray()){
        appendToTable(myLibrary.length - 1);
    }
}

function updateLibraryArray() {
    let form = document.getElementById('form');
    let formData = new FormData(form);
    for (let value of formData.entries()) {
        if (value[1] == ''){
            alert('Must fill in all fields!');
            return false;
        }
    }
    let title = formData.get('title');
    let author = formData.get('author');
    let pages = formData.get('pages');
    let read = formData.get('read');

    addBookToLibrary(title, author, pages, read);

    clearInputs();

    return true;
}

function clearInputs () {
    let inputs = document.getElementsByClassName('book_submission')
    for (let el of inputs){
        el.value = '';
    }
}

function appendToTable(index){
    //get table and add row element to it
    let table = document.getElementById('libaryTable');
    let row = table.insertRow(-1);
    row.setAttribute('id', `row${index}`);

    //fill row with book data
    let cell1 = row.insertCell(0);
    cell1.textContent = myLibrary[index].title;
    let cell2 = row.insertCell(1);
    cell2.textContent = myLibrary[index].author;
    let cell3 = row.insertCell(2);
    cell3.textContent = myLibrary[index].pages;
    let cell4 = row.insertCell(3);
    cell4.setAttribute('id', `read_status${index}`);
    if (myLibrary[index].read == 'yes') {
        cell4.textContent = 'yes';
    } else {
        cell4.textContent = 'no';
    }

    //add read status toggle button
    let newReadToggleBtn = document.createElement('button');
    newReadToggleBtn.textContent='Toggle Read Status';
    newReadToggleBtn.setAttribute('class', 'read_toggle_btn');
    newReadToggleBtn.setAttribute('id', index);
    newReadToggleBtn.addEventListener('click', function(e) {
        let readStatus = document.getElementById(`read_status${this.id}`);
        if (readStatus.textContent == 'yes'){
            readStatus.textContent = 'no';
            return;
        }
        readStatus.textContent = 'yes';
    })
    let cell5 = row.insertCell(4);
    cell5.appendChild(newReadToggleBtn);

    //add row delete button
    let newDeleteRowBtn = document.createElement('button');
    newDeleteRowBtn.textContent='Delete Entry';
    newDeleteRowBtn.setAttribute('class', 'del_row_btn');
    newDeleteRowBtn.setAttribute('id', index);
    newDeleteRowBtn.addEventListener('click', function(e) {
        let targetRow = document.getElementById(`row${this.id}`);
        targetRow.remove();
        myLibrary.splice(index, 1);
    })
    let cell6 = row.insertCell(5);
    cell6.appendChild(newDeleteRowBtn);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkein', 310, 'yes');
addBookToLibrary("Ender's Game", 'Orson Scott Card', 324, 'yes');
addBookToLibrary('Moby Dick', 'Herman Melville', 427, 'no');

populateTable();