const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const bcrypt = require('bcryptjs');


let users = [];
const JWTSECRET = process.env.JWT_SECRET;

const isValid = (username)=>{ //returns boolean
    return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
    const user = users.find(user => user.username === username);
    return user && bcrypt.compareSync(password, user.password);
}

//only registered users can login
regd_users.get("/login", (req,res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }
  
    // Check if the user is valid and the password matches
    if (authenticatedUser(username, password)) {
      // Create a JWT token
      const token = jwt.sign({ username }, JWTSECRET, { expiresIn: '1h' });
  
      // Store the token in session (if needed for further verification)
      req.session.authorization = { accessToken: token };
  
      return res.status(200).json({ message: "Customer successfully logged in", token });
    } else {
      return res.status(401).json({ message: "Invalid username or password." });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
