//script for library project

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
    let i = 0;
    for (let value of formData.entries()) {
        if (value[1] == ''){
            alert('Must fill in all fields!');
            return false;
        } else if (i == 2){
            if (parseInt(value[1]) <= 0 || parseFloat(value[1]) % 1 != 0) {
                alert('Page count must be a whole number greater than zero!');
                return false;
            }
        }
        i++;
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
    row.setAttribute('class', 'row');

    //fill row with book data
    let cell1 = row.insertCell(0);
    cell1.textContent = myLibrary[index].title;
    let cell2 = row.insertCell(1);
    cell2.textContent = myLibrary[index].author;
    let cell3 = row.insertCell(2);
    cell3.textContent = myLibrary[index].pages;
    let cell4 = row.insertCell(3);
    cell4.setAttribute('id', `read_status${index}`);
    cell4.setAttribute('class', 'read_status');
    if (myLibrary[index].read == 'yes') {
        cell4.textContent = 'yes';
    } else {
        cell4.textContent = 'no';
    }

    //add read status toggle button
    let newReadToggleBtn = document.createElement('button');
    newReadToggleBtn.textContent='Toggle Read';
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
    newDeleteRowBtn.textContent='Delete';
    newDeleteRowBtn.setAttribute('class', 'del_row_btn');
    newDeleteRowBtn.setAttribute('id', index);
    newDeleteRowBtn.addEventListener('click', function(e) {
        let targetRow = document.getElementById(`row${this.id}`);
        targetRow.remove();
        myLibrary.splice(index, 1);
        updateIds();
    })
    let cell6 = row.insertCell(5);
    cell6.appendChild(newDeleteRowBtn);
}

function updateIds() {
    let rows = document.getElementsByClassName('row');
    let delBtns = document.getElementsByClassName('del_row_btn');
    let readBtns = document.getElementsByClassName('read_toggle_btn');
    let readStatus = document.getElementsByClassName('read_status');
    for (let i=0; i<rows.length; i++) {
        rows[i].setAttribute('id', `row${i}`);
        delBtns[i].setAttribute('id', i);
        readBtns[i].setAttribute('id', i);
        readStatus[i].setAttribute('id', `read_status${i}`);
    }
}

addBookToLibrary('The Miracle of Mindfulness', 'Thich Nhat Hanh', 102, 'no');
addBookToLibrary('Bird by Bird', 'Anne Lamott', 274, 'no');
addBookToLibrary('Shogun', 'James Clavell', 1231, 'yes');
addBookToLibrary('Radical Acceptance', 'Tara Brach', 352, 'yes');

populateTable();