require("dotenv").config();
// NPM package dotenv: reads .env files and use it to add values to the process.env object
//at the top of your server.js, require the dotenv module and invoke it's config() method to read the .env file.
const knex = require("knex");
// Knex (npm package) is a SQL query builder library that we can use with different types of databases with Node
const app = require("./app");
const { PORT, DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});
// Creating Knex instance: The function's arguments specify which driver to use and which database to connect to
// pg = Postgres database driver
// example: knexInstance('amazong_products').select('*');
// Knex instance methods return promise like objects for building queries has the same three methods as a
// promise (then, catch and finally) but also has other methods too! Other methods are not part of standard promises
// so we call these objects "promise-like" to explain they offer more functionality.(use .from, .select, .where)
// When building a query, we can use the .then promise method to perform the query.

app.set("db", db);
// The server.js file attaches the Knex instance to the app as a property called 'db'

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
// Creates a server that listens on port __ of your computer.
// When port ___ get accessed, write "Hello World!" back as a response:
