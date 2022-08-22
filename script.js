/* DOM Selector variables */
const closeButton = document.querySelector('fieldset > img');
const newBookButton = document.querySelector('.addbook');
const overlay = document.querySelector('.overlay');
const form = document.getElementById('addbook');
//////////////////////////////

let myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


form.querySelector('button').addEventListener('click', addBooktoLibrary);

function addBooktoLibrary(e) {
    console.log(e);
    console.log(form.elements['pages'].value);
}

newBookButton.addEventListener('click', insertOverlay)
closeButton.addEventListener('click', removeOverlay);

function insertOverlay() {
    overlay.classList.remove('delete');
}

function removeOverlay() {
    overlay.classList.add('delete');
}