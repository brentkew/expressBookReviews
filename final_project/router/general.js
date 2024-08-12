const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());



public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "Username already exists. Please choose another one." });
  }
  
  // Hash the password before storing it
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = {
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  return res.status(201).json({ message: "Customer successfully registered, Now you can login", user: newUser });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn; // Retrieve ISBN from request parameters
  let bookFound = null;
  for (const key in books) {
    if (books[key].isbn === isbn) {
      bookFound = books[key];
      break;
    }
  }

  if (bookFound) {
      return res.status(200).json(bookFound);
  } else {
      return res.status(404).json({ message: "Book not found" });
  }
});
  
// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author.toLowerCase(); // Get the author from the request parameters and convert to lowercase
  const filteredBooks = Object.values(books).filter(
    (book) => book.author.toLowerCase() === author
  );

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks); // Return the list of books by the author if found
  } else {
    return res.status(404).json({ message: "No books found by this author" }); // Return an error if no books are found
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title.toLowerCase();  // Get the title from the request parameters and convert to lowercase
  const filteredBooks = Object.values(books).filter(book => book.title.toLowerCase() === title);

  if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);  // Return the list of books with the title if found
  } else {
      return res.status(404).json({ message: "No books found with this title" });  // Return an error if no books are found
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn; // Retrieve ISBN from request parameters
  let bookFound = null;
  for (const key in books) {
    if (books[key].isbn === isbn) {
      bookFound = books[key];
      break;
    }
  }

  if (bookFound) {
      return res.status(200).json(bookFound.reviews);
  } else {
      return res.status(404).json({ message: "Book not found" });
  }
});





// Task 10: Get all books using an async callback function
// Get the book list available in the shop ()
const fetchBooks = async () => {
  try {
    const response = await axios.get('https://brentkew-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/books');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
};
public_users.get('/', async (req, res) => {
  try {
    // Fetch the list of books using the async function
    const bookList = await fetchBooks();
    return res.status(200).json(bookList); // Send the list of books as JSON response
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Send error message if fetching fails
  }
});




module.exports.general = public_users;
