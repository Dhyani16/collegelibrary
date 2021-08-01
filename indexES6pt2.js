console.log("This is the ES6 part-2 version of the project");
//for initially loading the contents
let bookArray = localStorage.getItem("array");
if (bookArray != null) {
  let array = JSON.parse(bookArray);
  let tableBody = document.getElementById("tableBody");
  let displayString = "";
  array.forEach(function (element, index) {
    displayString =
      displayString +
      `<tr class="searchBook">
            <th scope="row">${index + 1}</th>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button type="button" id="${index}" onclick="deleteNode(this.id)" class="btn btn-danger">Delete</button></td>
        </tr>`;
  });
  tableBody.innerHTML = displayString;
}

class Book {
  constructor(givenName, givenAuthor, givenType) {
    this.name = givenName;
    this.author = givenAuthor;
    this.type = givenType;
  }
  //this validate book was in display function earlier but then i sifted it here just for checking purposes
  validate(book) {
    if (book.name.length <= 2 || book.author.length <= 2) {
      return false;
    } else {
      let bookToAdd = {
        name: book.name,
        author: book.author,
        type: book.type,
      };

      let bookArray = localStorage.getItem("array");
      let array;
      if (bookArray == null) {
        array = [];
      } else {
        array = JSON.parse(bookArray);
      }
      array.push(bookToAdd);
      localStorage.setItem("array", JSON.stringify(array));
      return true;
    }
  }
}
class Display {
  add(book) {
    //console.log("Adding to the UI");
    let bookArray = localStorage.getItem("array");
    let array = JSON.parse(bookArray);
    let tableBody = document.getElementById("tableBody");
    let displayString = "";
    array.forEach(function (element, index) {
      displayString =
        displayString +
        `<tr class="searchBook">
            <th scope="row">${index + 1}</th>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button type="button" id="${index}" onclick="deleteNode(this.id)" class="btn btn-danger">Delete</button></td>
        </tr>`;
    });
    tableBody.innerHTML = displayString;
  }

  clear() {
    libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  show(type, message) {
    let alertMessage = document.getElementById("alertMessage");
    alertMessage.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                ${message}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`;
    setTimeout(function () {
      alertMessage.innerHTML = "";
    }, 3000);
  }
}

function deleteNode(id) {
  let bookArray = localStorage.getItem("array");
  let array = JSON.parse(bookArray);
  array.splice(id, 1);
  localStorage.setItem("array", JSON.stringify(array));
  let tableBody = document.getElementById("tableBody");
  let displayString = "";
  array.forEach(function (element, index) {
    displayString =
      displayString +
      `<tr class="searchBook">
            <th scope="row">${index + 1}</th>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button type="button" id="${index}" onclick="deleteNode(this.id)" class="btn btn-danger">Delete</button></td>
        </tr>`;
  });
  tableBody.innerHTML = displayString;
}

//Submit Event Listener
libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log("You have submitted the form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  let type;
  //.checked fucntion tells whether the option is checked or not
  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else {
    type = cooking.value;
  }

  let book = new Book(name, author, type);
  console.log(book);
  let display = new Display();
  if (book.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Book added successfully");
  } else {
    display.show("danger", "Sorry you can not add this book");
  }

  e.preventDefault(); //so that the page doesnt get refreshed automatically
}

searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {
  let inputval = searchTxt.value.toLowerCase();
  let book = document.getElementsByClassName("searchBook");
  Array.from(book).forEach(function (element, index) {
    let td = element.getElementsByTagName("td");
    Array.from(td).forEach(function (element) {
      if (element.innerText.includes(inputval)) {
        element.style.color = "red";
      } else {
        element.style.color = "black";
      }
    });
  });
});
