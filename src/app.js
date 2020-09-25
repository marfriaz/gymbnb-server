const express = require("express");
// To use Express you first need to require the package.
// After installing it as a dependency in your project
const morgan = require("morgan");
// Logging Middleware: it is one of the stations that the
// request passes through on the way to your handler function. s the request passes through,
// Morgan gets some details from the request and prints it out on the console.
// It can be configured to write the log output to a file if necessary.
const cors = require("cors");
// Cross-Origin Resource Sharing Middleware: the browser refuses to send requests from
// scripts to hosts other than the original host. CORS node package solves for this by that
// allows restricted resources on a web page to be requested from another domain outside the domain
// from which the first resource was served
// Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers
// to give a web application running at one origin, access to selected resources from a different origin.
// A web application executes a cross-origin HTTP request when it requests a resource that has a different origin
// (domain, protocol, or port) from its own
const helmet = require("helmet");
// Secures headers: hackers cant see we're using Express. Make sure to place helmet before cors in the pipeline.
const { NODE_ENV } = require("./config");
// a standard environmental variable for Node applications that determines if the application is running in
// production or some other environment.
const gymsRouter = require("./gyms/gyms-router");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");

const app = express();
// express(): The top-level function exported by the Express module. Calling this function creates an
// Express app and gives us access to the other Express objects below.

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test",
  })
);
// In order for middleware to be used by Express, it must be Mounted (or added) at some specified path.
// The Express application object provides a method use() precisely for mounting middleware.

app.use(cors());
app.use(helmet());

app.use("/api/gyms", gymsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: "Server error" };
  } else {
    console.error(error);
    response = { error: error.message, object: error };
  }
  res.status(500).json(response);
});
// Our production applications should hide error messages from users and other malicious parties.
// error-handling middleware to catch any server errors that occur and print a more user-friendly error in production
// 4 parameters in middleware, express knows to treat this as error handler

module.exports = app;
// Any value we set on the exports object is made available when the module is required
