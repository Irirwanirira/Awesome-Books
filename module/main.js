const addBook = document.querySelector('#btn');
const bookList = document.querySelector('#list');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('#form');


const Book = function objBook(title, author) {
  this.title = title;
  this.author = author;
};

const storedBooks = [];
function addBooks(newBook) {
  const bookStore = `<div class = "book">
<h2> Title: ${newBook.title}</h2> 
<h2> Author: ${newBook.author}</h2>
<button class="delete" type="button">Remove</button>
<hr>
</div>`;
  bookList.innerHTML += bookStore;
  return bookList.innerHTML;
}
let localForm = { title: '', author: '' };
if (localStorage.localForm) {
  localForm = JSON.parse(localStorage.localForm);
  title.value = localForm.title;
  author.value = localForm.author;
}
form.addEventListener('input', () => {
  localStorage.localForm = JSON.stringify(localForm);
  localForm.title = title.value;
  localForm.author = author.value;
});


addBook.addEventListener('click', (e) => {
  if (title.value === '' || author.value === '') {
    e.preventDefault();
  } else {
    const newBook = new Book(title.value, author.value);
    addBooks(newBook);
    title.value = '';
    author.value = '';
  }
});


bookList.addEventListener('click', (eve) => {
  if (eve.target.classList.contains('delete')) {
    document.querySelector('.list').removeChild(eve.target.parentElement);
    const x = eve.target.parentElement;
    const removeBook = storedBooks.find((item) => item.title === x.firstChild.innerText);
    storedBooks.splice(storedBooks.indexOf(removeBook), 1);
  }
});






















