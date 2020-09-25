require("dotenv").config(); // NPM package dotenv: reads .env files and use it to add values to the process.env object
//at the top of your server.js, require the dotenv module and invoke it's config() method to read the .env file.

const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
