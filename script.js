let myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read == true) {
            return `${this.title} by ${this.author}, ${this.pages} pages, read.`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`;
        }
    }
}

function addBooktoLibrary() {
    
}