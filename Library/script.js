// Constants and link to JSON data
const link = 'https://mocki.io/v1/fd40c06c-f792-4280-ae28-c6a7da9265f9';

// Fetch data from the provided JSON link
fetch(link)
  .then(response => response.json())
  .then(data => {
    // Save data to localStorage
    localStorage.setItem('books', JSON.stringify(data));
    // Display books in the table
    displayBooks(data);
    saveData();
  });


// Display books in the table
function displayBooks(books) {
  // Get the table element by its ID
  const table = document.getElementById('bookTable');
  
  // Create the table header
  table.innerHTML = '<thead><th>Title</th><th>Author</th><th>Genre</th><th>Publication Year</th><th>Action</th></thead>';

  // Loop through each book and create table rows with book details and buttons for actions
  books.forEach(book => {
    const row = table.insertRow();
    // Create buttons to show book details, edit, and delete
    row.innerHTML = `<tr><td><button class="titleBtn" onclick="showDetails(${books.indexOf(book)})">${book.title}</button></td><td>${book.author}</td><td>${book.genre}</td><td>${book.year}</td><td><button onclick="editBook(${books.indexOf(book)})">Edit</button><button onclick="deleteBook(${books.indexOf(book)})">Delete</button></td></tr>`;
  });
}

// Show book details in an alert
function showDetails(index) {
  const books = JSON.parse(localStorage.getItem('books'));
  const book = books[index];
  alert(`Title: ${book.title}\nAuthor: ${book.author}\nGenre: ${book.genre}\nPublication Year: ${book.year}\nSynopsis: ${book.synopsis}`);
}

// Function to edit a book
function editBook(index) {
  // Get the edit dialog element
  const dialog = document.getElementById("editDialog");
  
  // Display the edit dialog
  dialog.showModal();

  // Get the book details from localStorage
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const book = books[index];

  // Get the save button from the edit dialog
  const saveBtn = document.querySelector(".save");

  // Fill the form fields with the book details
  document.getElementById("editTitle").value = book.title;
  document.getElementById("editAuthor").value = book.author;
  document.getElementById("editGenre").value = book.genre;
  document.getElementById("editPublicationYear").value = book.year;
  document.getElementById("editSynopsis").value = book.synopsis;

  // Add an event listener to the save button
  saveBtn.addEventListener("click", () => {
    // Create an object with the edited book details
    const editedBook = {
      title: document.getElementById('editTitle').value,
      author: document.getElementById('editAuthor').value,
      genre: document.getElementById('editGenre').value,
      year: document.getElementById('editPublicationYear').value,
      synopsis: document.getElementById('editSynopsis').value,
    };
        
    // Update the book in the array
    books[index] = editedBook;
    // Update localStorage and refresh the display
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks(books);
    
    // Close the edit dialog
    closeDialog();

    // Save data again (if needed)
    saveData();
  });
}

// Function to close the edit dialog
function closeDialog() {
  document.getElementById('editDialog').close();
}

// Function to add a new book
function addBook() {
  // Get values from the form fields
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const genre = document.getElementById('genre').value;
  const year = document.getElementById('publicationYear').value;
  const synopsis = document.getElementById('synopsis').value;

  // Create a new book object
  const newBook = { title, author, genre, year, synopsis };

  // Get the existing books from localStorage
  const books = JSON.parse(localStorage.getItem('books')) || [];
  
  // Add the new book to the array
  books.push(newBook);

  // Update localStorage with the new array of books
  localStorage.setItem('books', JSON.stringify(books));

  // Refresh the display of books in the table
  displayBooks(books);

  // Clear the form fields
  document.getElementById('addBookForm').reset();

  // Save data again (if needed)
  saveData();
}

// Function to delete a book
function deleteBook(index) {
  // Confirm with the user before deleting
  if (confirm('Are you sure you want to delete this book?')) {
    // Get the existing books from localStorage
    const books = JSON.parse(localStorage.getItem('books')) || [];
    
    // Remove the selected book from the array
    books.splice(index, 1);
    
    // Update localStorage with the new array of books
    localStorage.setItem('books', JSON.stringify(books));

    // Refresh the display of books in the table
    displayBooks(books);

    // Save data again (if needed)
    saveData();
  }
}

// Function to search for books based on the search bar input
function search() {
  const searchBar = document.getElementById('searchBar').value;
  const table = document.getElementById('bookTable');
  tr = table.getElementsByTagName("tr");
  
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for(j = 0; j < td.length; j++) {
      let tdata = td[j];
      if (tdata) {
        // Show or hide rows based on the search bar input
        if (td[0].innerHTML.toLocaleLowerCase().indexOf(searchBar.toLocaleLowerCase()) > -1 || td[1].innerHTML.toLocaleLowerCase().indexOf(searchBar.toLocaleLowerCase()) > -1) {
          tr[i].style.display = "";
          break; 
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }
  // Show all rows if the search bar is empty
  if(searchBar.toLocaleLowerCase() ==""){
    for (i = 1; i < tr.length; i++) {
      tr[i].style.display = "";
    }
  }
}

// Function to toggle the display of the dropdown
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Function to sort the table based on a specific column (ascending order)
function sort(value) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("bookTable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[value];
      y = rows[i + 1].getElementsByTagName("td")[value];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// Function to sort the table based on a specific column (descending order)
function backSort(value) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("bookTable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[value];
      y = rows[i + 1].getElementsByTagName("td")[value];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// Function to save data to localStorage
function saveData() {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  localStorage.setItem('books', JSON.stringify(books));
}
