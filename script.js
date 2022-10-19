let myLibrary = [];

// DEFINE BOOK OBJECT
class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title.value,
        this.author = author.value,
        this.pages = pages.value,
        this.readStatus = readStatus.checked
    }
}

const bookList = document.querySelector('.bookList');
const newBookBtn = document.querySelector('.add');
const formBlock = document.querySelector('.edit');
const form = document.querySelector('form');
const addBook = document.querySelector('.add.book');
const cancelBtn = document.querySelector('.cancel');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const readStatus = document.getElementById('status');

// FUNCTION TO ADD BOOKS TO LIBRARY
function addBookToLibrary() {
    // create a book object from the info obtained from the form inputs
    book = new Book(title, author, pages, readStatus);
    // add object to myLibrary then display book object to screen
    myLibrary.push(book);
    displayBooks();
}

// FUNCTION TO DISPLAY BOOKS ON SCREEN
function displayBooks() {
    // delete each book entry in the old book list
    books = document.querySelectorAll('.bookEntry');
    if(books.length > 0) {
        books.forEach(book => {
            bookList.removeChild(book);
        });
    }
    // create a book entry for each book in myLibrary
    for(let i=0; i<myLibrary.length; i++) {
        createBook(myLibrary[i], i);
    }
}

// FUNCTION TO CREATE BOOK ENTRY AND ADD IT TO BOOK LIST
function createBook(book, index) {
    // create div element for each book entry
    entry = document.createElement('div'); 
    entry.classList.add('bookEntry');
    
    // create div element which holds book info
    infoDiv = document.createElement('div'); 
    
    // create div element which holds book control buttons
    controlDiv = document.createElement('div'); 
    controlDiv.classList.add('buttons');

    // create p element to store book title
    titleInfo = document.createElement('p'); 
    titleInfo.innerText = book.title;
    
    // create p element to store book author
    authorInfo = document.createElement('p'); 
    authorInfo.innerText =  'By: '+ book.author;
    
    // create p element to store book # of pages
    pagesInfo = document.createElement('p'); 
    pagesInfo.innerText =  'Number of pages: ' + book.pages;
    
    // create button element to control book read status
    bookStatus = document.createElement('button'); 
    if(book.readStatus === true) {
        bookStatus.classList.add('read');
        bookStatus.innerText = 'read';
    }
    else {
        bookStatus.classList.add('notread');
        bookStatus.innerText = 'not read';
    }
    // toggle between read and unread classes when button is clicked
    bookStatus.addEventListener('click', () => {
        book.readStatus = !book.readStatus;
        displayBooks();
    })
    
    // create button element to remove book entry
    remove = document.createElement('button'); 
    remove.innerText = 'remove';
    // remove book entry when button is clicked then display the updated book list
    remove.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        bookList.removeChild(entry);
        displayBooks();
        saveBooks();
    })

    // append book info elements to infoDiv
    infoDiv.appendChild(titleInfo);
    infoDiv.appendChild(authorInfo);
    infoDiv.appendChild(pagesInfo);
    
    // append book control buttons to control div
    controlDiv.appendChild(bookStatus);
    controlDiv.appendChild(remove);
    
    entry.appendChild(infoDiv);
    entry.appendChild(controlDiv);
    bookList.appendChild(entry);

    // save current book list to local storage
    saveBooks();
}

// FUNCTION TO SAVE BOOK LIST TO LOCAL STORAGE
function saveBooks() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// FUNCTION TO LOAD BOOKS FROM LOCAL STORAGE INTO SCREEN
function loadBooks() {
    if (!localStorage.myLibrary) displayBooks();
    else {
        books = localStorage.getItem('myLibrary');
        books = JSON.parse(books);
        myLibrary =books;
        displayBooks();
    }
}

loadBooks();

// show form block when newBookBtn is clicked
newBookBtn.addEventListener('click', () => {
    formBlock.hidden = false;
})

// reset form inputs and hide form block when cancelBtn is clicked
cancelBtn.addEventListener('click', () => {
    form.reset();
    formBlock.hidden = true;
})

// add book to myLibrary when addBook is clicked and inputs are not empty
addBook.addEventListener('click', () => {
    if (title.value && author.value && pages.value) {
        addBookToLibrary();
        formBlock.hidden = true;
        form.reset();
    }
})
/*
form.onsubmit = function() {
    if (title.value && author.value) {
        addBookToLibrary();
        formBlock.hidden = true;
        form.reset();
    }
}*/


