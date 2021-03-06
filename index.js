class Booklet {
  constructor(listShowContainer) {
    this.bookList = [];
    this.listShowContainer = listShowContainer;
  }

  removeBook = (index) => {
    this.bookList = this.bookList.filter((book, ind) => ind !== index);
  }

  addNewBook = (bookList) => {
    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const book = {
      title,
      author,
    };
    this.bookList.unshift(book);
    this.saveDataLocally(bookList);
    this.generateBooks();
  }

  generateBooks = () => {
    const parentElement = this.listShowContainer;
    parentElement.textContent = '';

    this.bookList.forEach((bookObject, index) => {
      const div = document.createElement('div');
      div.className = 'book';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'book-title';
      titleSpan.textContent = `"${bookObject.title}" by ${bookObject.author}`;
      div.appendChild(titleSpan);

      const removeButton = document.createElement('button');
      removeButton.className = 'remove-button';
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
        this.saveDataLocally(this.bookList);
        this.generateBooks();
      });

      div.appendChild(removeButton);
      parentElement.appendChild(div);

      if (index % 2 !== 0) {
        div.classList.add('grey-background');
      }
    });

    if (this.bookList.length === 0) {
      document.querySelector('.all-books').classList.add('hide');
      document.querySelector('.horizontal-line1').classList.add('hide');
    } else {
      document.querySelector('.all-books').classList.remove('hide');
      document.querySelector('.horizontal-line1').classList.remove('hide');
    }
  }

  saveDataLocally = (bookList) => {
    const stringifiedBookList = JSON.stringify(bookList);
    localStorage.setItem('bookList', stringifiedBookList);
  }

  checkLocalStorage() {
    if (localStorage.getItem('bookList') !== null) {
      const localBookList = localStorage.getItem('bookList');
      const convertedBookList = JSON.parse(localBookList);
      this.bookList = convertedBookList;
      this.generateBooks();
    } else {
      this.generateBooks();
    }
  }

  addListener() {
    const addButton = document.querySelector('.add');
    addButton.addEventListener('click', () => this.addNewBook(this.bookList));
  }
}
window.onload = () => {
  const allBooks = new Booklet(document.querySelector('.listShow'));
  allBooks.generateBooks();
  allBooks.checkLocalStorage();
  allBooks.addListener();
};
