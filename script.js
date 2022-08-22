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
let uniqueID = 0;

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBooktoLibrary(event) {
    // Stops page from refreshing
    event.preventDefault();
    
    /* Create a new Book object with the submitted values + a 
    unique identifier, and add it to the library */
    let temp = new Book(form.elements['title'].value, form.elements['author'].value, form.elements['pages'].value, form.elements['read'].value, `${uniqueID}`)
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
    
    // Give a unique identifier to the card that matches the one in the array
    tempCard.setAttribute('data-position', `${uniqueID}`)
    console.log(tempCard.getAttribute('data-position'));
    
    // Add the card we just built into the grid
    bookList.appendChild(tempCard);
    
    /* Add event listeners for the newly created buttons */
    let readButton = document.querySelectorAll('.read');
    readButton.forEach(element => element.addEventListener('click', readToggle));
    let removeButton = document.querySelectorAll('.remove');
    removeButton.forEach(element => element.addEventListener('click', removeCard))


    // Iterate the unique ID number
    uniqueID++;
    
    // Reset the form to its default values
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

// Toggle the read button from read to unread
function readToggle(event) {
    let button = event.target;
    let dataPos = event.path[2].getAttribute('data-position');


    console.log(event.path[2].getAttribute('data-position'));

    // If the book is currently 'unread'...
    if(button.classList.contains('unread')) {

        // Display the green 'read' button
        button.classList.remove('unread');

        /* Grab the unique identifier, look it up in the array, and set
        the 'read' property to true. */
        myLibrary[dataPos].read = 'true';

    } else { // Otherwise, the book is currently 'read'

        // Display the red 'unread' button
        button.classList.add('unread');

        /* Grab the unique identifier, look it up in the array, and set
        the 'read' property to false. */
        myLibrary[dataPos].read = 'false';

    }

    console.log(myLibrary[dataPos])
}

function removeCard(event) {
    let card = findParentCard(event);
    let cardLocation = null;
    console.log(card);

    
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == card.getAttribute('data-position')) {
            console.log('bababooey');
        }
    }
}

function findParentCard(event) {
    /* If the user clicked the nested image, the card element
    is path[3], otherwise it's path[2] */
    if (event.target.nodeName === 'IMG') {
        return event.path[3];
    } else {
        return event.path[2];
    }
}