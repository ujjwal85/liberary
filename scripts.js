let myLibrary = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// GET BOOKS FROM LOCAL STORAGE
if (localStorage.getItem('books') === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  myLibrary = booksFromStorage;
}


//write the logic to show how many books are read, how many books are unread and total books.
function showLibraryInfo() {
  let readCounter = 0;
  let unreadCounter = 0;
  let totalBookscounter = 0;
  const localStorageContent1 = localStorage.getItem('Books');
  let arr = JSON.parse(localStorageContent1)
  totalBookscounter = arr.length;
  arr.map((element) => {
    if (element.status === "read") {
      readCounter++
    }
    else {
      unreadCounter++
    }
  })
  const booksRead = document.querySelector('#books-read');
  const booksUnread = document.querySelector('#books-unread');
  const totalBooks = document.querySelector('#total-books');

  booksRead.textContent = readCounter;
  booksUnread.textContent = unreadCounter;
  totalBooks.textContent = totalBookscounter;
  //add your code here

}
showLibraryInfo()

function showBooksInLibrary() {
  if (myLibrary.length === 0) {
    const localStorageContent1 = localStorage.getItem('Books');
    let arr = JSON.parse(localStorageContent1)
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = ''
    for (let i = 0; i < arr.length; i += 1) {
      const tr = `<tr>
            <td>${arr[i].title}</td>
            <td>${arr[i].author}</td>
            <td>${arr[i].pages}</td>
            <td>${arr[i].status}</td>
            <td><button class="del" onclick="del(${i})">Remove</button></td>
          </tr>`
      tbody.innerHTML += tr;

    }
  } else {
    const localStorageContent1 = localStorage.getItem('Books');
    let arr = JSON.parse(localStorageContent1)
    // console.log(arr.length);


    if (localStorageContent1 === null) {

      arr = [];
      arr.push(myLibrary[myLibrary.length - 1])
    }
    else {
      arr.push(myLibrary[myLibrary.length - 1])
      //  temp1= JSON.parse(localStorageContent1);
    }

    localStorage.setItem('Books', JSON.stringify(arr));

    const tbody = document.getElementById('table-body');
    tbody.innerHTML = ''
    for (let i = 0; i < arr.length; i += 1) {
      const tr = `<tr>
            <td>${arr[i].title}</td>
            <td>${arr[i].author}</td>
            <td>${arr[i].pages}</td>
            <td>${arr[i].status}</td>
            <td><button class="del" onclick="del(${i})")>Remove</button></td>
            </tr>`
      tbody.innerHTML += tr;


    }
    location.reload()

  }

}
/*delete  */
function deleteAllBooks() {
  localStorage.clear();
  location.reload()
}

function del(index) {
  //console.log(typeof(index));
  const localStorageContent1 = localStorage.getItem('Books');
  let arr = JSON.parse(localStorageContent1)

  arr.splice(index, 1)
  localStorage.setItem('Books', JSON.stringify(arr));
  location.reload()
}


//add book to library
function addBookToLibrary(title, author, pages, status) {
  const st = document.getElementById('status')
  if (st.checked === true) {
    status = "read";
  }
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
  const validat = validateForm();

  if (validat === undefined) {
    showBooksInLibrary();
  }
  else {
    alert(validat)
  }

}

// FORM VALIDATION
function validateForm() {
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const page = document.getElementById('page').value
  var letters = /^[a-zA-Z_-]+$/;

  const intpage = parseInt(page)
  // console.log(typeof(intpage))
  if (title === '') {
    return "plese enter title"
  }
  else if (!title.match(letters)) {
    return "plese enter alphabet in title field"
  }
  else if (author === '') {
    return "plese enter author name"
  }
  else if (!author.match(letters)) {
    return "plese enter alphabet in author field"
  }
  else if (page === '') {
    return "plese enter number of pages and only numerical value"
  }

}

// MODAL/POP-UP FOR BOOKS REMOVAL
function manipulateModal() {
  const modal = document.querySelector('#modal');
  modal.style.display = 'block';
  modal.addEventListener('click', (event) => {
    const { target } = event;
    if (target.classList.contains('close')) {
      modal.style.display = 'none';
    } else if (target.classList.contains('confirm-removal')) {
      myLibrary = [];
      modal.style.display = 'none';
    }
  });
}

function listenClicks() {
  document.addEventListener('click', (event) => {
    const { target } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === 'add-book') {
      validateForm(event);
    } else if (target.id === 'delete-all-btn') {
      manipulateModal();
    } else if (target.classList.contains('fa-trash-alt')) {
      myLibrary.splice(tr, 1);
    } else if (target.classList.contains('fa-check')) {
      target.classList.remove('fa-check');
      target.classList.add('fa-times');
      myLibrary[tr].status = false;
    } else if (target.classList.contains('fa-times')) {
      target.classList.remove('fa-times');
      target.classList.add('fa-check');
      myLibrary[tr].status = true;
    }
    showBooksInLibrary();
  });

}
showBooksInLibrary();
listenClicks();
