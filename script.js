/* DOM Selector variables */
const closeButton = document.querySelector('fieldset > img');
const newBookButton = document.querySelector('.addbook');
const overlay = document.querySelector('.overlay');
const form = document.getElementById('addbook');
// const readButton = document.querySelector('.read');
const bookList = document.querySelector('.books-list');
const bookCard = document.querySelector('.book-card');
//////////////////////////////

form.addEventListener('submit', addBooktoLibrary);
newBookButton.addEventListener('click', insertOverlay)
closeButton.addEventListener('click', removeOverlay);

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBooktoLibrary(event) {
    // Stops page from refreshing
    event.preventDefault();
    
    /* Create a new Book object with the submitted values,
    and add it to the library */
    let temp = new Book(form.elements['title'].value, form.elements['author'].value, form.elements['pages'].value, form.elements['read'].value)
    myLibrary.push(temp);
    
    
    /* Setup a new card to add to the bookList grid with a clone
    of the  default bookCard */
    let tempCard = bookCard.cloneNode(true);
    
    // Remove the class that sets display: none to the card
    tempCard.classList.remove('delete');
    
    /* Set the card values to the values of the book we just added
    to the myLibrary Array */
    tempCard.querySelector('.title').textContent = myLibrary[myLibrary.length-1].title;
    tempCard.querySelector('.author').textContent = 'by ' + myLibrary[myLibrary.length-1].author;
    tempCard.querySelector('.pages').textContent = myLibrary[myLibrary.length-1].pages + ' pages';
    
    /* If the user hasn't read the book, add the unread CSS class */
    let hasRead = myLibrary[myLibrary.length-1].read;
    if (hasRead == 'false') {
        tempCard.querySelector('.read').classList.add('unread');
    }
    
    // Give a unique identifier to each entry
    tempCard.setAttribute('data-position', `${myLibrary.length-1}`)
    console.log(tempCard.getAttribute('data-position'));
    
    // Add the card we just built into the grid
    bookList.appendChild(tempCard);
    
    /* Add event listeners for the newly created buttons */
    let readButton = document.querySelectorAll('.read');
    readButton.forEach(element => element.addEventListener('click', readToggle));

    form.reset();
}

// Opens up the add book overlay
function insertOverlay() {
    overlay.classList.remove('delete');
}

// Closes the add book overlay
function removeOverlay() {
    overlay.classList.add('delete');
}

function readToggle(e) {
    let button = e.target;
    if(button.classList.contains('unread')) {
        button.classList.remove('unread');
    } else {
        button.classList.add('unread');
    }
}