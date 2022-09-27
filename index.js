import { DateTime } from "./module/luxon.js";

const displaySection = document.querySelector('.list');
const addBtn = document.getElementById('btn');
const contactMenu = document.querySelector('#contact');
const contactDiv = document.querySelector('#contact-link');
const formMenu = document.querySelector('#awesome-books');
const formLink = document.querySelector('#add-link');
const listMenu = document.querySelector('#list');
const listLink = document.querySelector('#list-link');
const date = document.querySelector('.date');
const all = document.querySelector('#all');

contactDiv.addEventListener('click', () => {
  contactMenu.style.display = 'block';
  formMenu.style.display = 'none';
  listMenu.style.display = 'none';
  all.style.display = 'none';
});

listLink.addEventListener('click', () => {
  contactMenu.style.display = 'none';
  formMenu.style.display = 'none';
  listMenu.style.display = 'block';
  all.style.display = 'block';
});

formLink.addEventListener('click', () => {
  contactMenu.style.display = 'none';
  formMenu.style.display = 'block';
  listMenu.style.display = 'none';
  all.style.display = 'none';
});

function now() {
  const time = DateTime.local();
  date.innerHTML = time;
}
window.onload = now();

function refresh() {
  contactMenu.style.display = 'none';
  formMenu.style.display = 'none';
  listMenu.style.display = 'block';
  all.style.display = 'block';
}
window.onload = refresh();

class Book {
  availableBooks;

  constructor() {
    this.getFromLocalStorage();
  }

  saveToLocalStorage = (addedBooks) => localStorage.setItem('availableBooks', JSON.stringify(addedBooks));

  getFromLocalStorage = () => {
    this.availableBooks = JSON.parse(localStorage.getItem('availableBooks')) ?? [];
  };

  displayItem = () => {
    this.getFromLocalStorage();
    displaySection.innerHTML = '';
    this.availableBooks.forEach((availableBook, i) => {
      displaySection.innerHTML += `<div class="availableBook">
        <p>"${availableBook.title}" by ${availableBook.author}</p>
        <button class="remove" id=${i}>Remove</button>
        </div>`;
    });
  };

  addBook = (e) => {
    e.preventDefault();
    const addedBook = {
      title: title.value,
      author: author.value,
    };
    this.availableBooks.push(addedBook);
    this.clear();
    this.saveToLocalStorage(this.availableBooks);
    this.displayItem();
  };

  deleteBook = (i) => {
    const filterBooks = this.availableBooks
      .filter((availableBook) => availableBook !== this.availableBooks[i]);
    this.saveToLocalStorage(filterBooks);
    this.displayItem();
  };

  clear = () => {
    title.value = '';
    author.value = '';
  };
}

const availableBook = new Book();
document.addEventListener('DOMContentLoaded', () => {
  availableBook.displayItem();
});

addBtn.addEventListener('click', availableBook.addBook);
displaySection.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const targetId = +e.target.getAttribute('id');
    availableBook.deleteBook(targetId);
  }
});
