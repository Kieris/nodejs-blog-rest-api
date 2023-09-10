const express = require('express');

require('dotenv').config();
require("./config/dbConnect")
const app = express();

//Middleware

//Routes

//Error handlers

//Listen to server
const PORT = process.env.PORT || 8083;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`));