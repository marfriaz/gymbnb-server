const express = require("express");
// Express on router module solely for:
// const gymsRouter = express.Router();
// const jsonBodyParser = express.json();
const path = require("path");
const GymsService = require("./gyms-service");
// The service object will allow us to make all CRUD transactions for one table.
// Their objective is to group together related functions as a 'service' to the rest of our application
const { requireAuth } = require("../middleware/jwt-auth");

const gymsRouter = express.Router();
// Express has a feature that helps us modularize our code, called routing.
// This is similar to the routing we saw in the React module, in Express the routes will be for groups of endpoints
// Create a route using the express.Router method.
const jsonBodyParser = express.json();
// the express.json() middleware must be applied to parse the JSON data in the body of the request.

gymsRouter
  .route("/")
  // without router would be:
  // app.get(PATH, HANDLER); AKA
  // app.get('/gyms', (req, res) => {
  // res.send('results');})
  // res is an object that represents the HTTP response that Express sends to the client after the request is processed
  // req.query = the query string of a URL is the set of key/value pairs after the question mark (?) on the URL.
  // It does not form part of the routing for the URL
  // but rather carries information that the handler function may use to process the request.

  .get((req, res, next) => {
    console.log("demo");
    GymsService.getAllGyms(req.app.get("db"))
      // To read the properties on the app object, we can use req.app.get('property-name').
      // from the server app.set("db", db);
      .then((gyms) => {
        res.json(gyms.map(GymsService.serializeGym));
      })
      .catch(next);
  })

  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {
      title,
      description,
      max_guest,
      location,
      price,
      img_urls,
    } = req.body;

    const imgs = img_urls;
    const newGym = {
      title,
      description,
      max_guest,
      location,
      price,
    };

    for (const [key, value] of Object.entries(newGym))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
          // The methods of the response object are chainable.
          // We're sending status code and json error
          // The .json() method handles all of this for you.
          // Frequently the server needs to send JSON data to the client. To do so a content-type header needs to be set
          // The .json() method handles all of this for you
          // It sets the correct content-type and converts the parameter provided to a JSON string using JSON.stringify().
        });

    newGym.user_id = req.user.id;

    GymsService.insertGym(req.app.get("db"), newGym, imgs)
      .then((gym) => {
        console.log(gym);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${gym.id}`))
          .json(GymsService.serializeGym(gym));
      })
      .catch(next);
  });

gymsRouter
  .route("/:gym_id")
  .all(checkGymIdExists)
  //the async function has not been finished yet
  .get((req, res) => {
    res.json(GymsService.serializeGym(res.gym));
  });

gymsRouter
  .route("/location/:gymLocation")

  .all(checkGymLocationExists)
  .get((req, res) => {
    const results = res.gyms.map((gym) => GymsService.serializeGym(gym));
    console.log(results);
    res.send(results);
  });

/* async/await syntax for promises */
async function checkGymIdExists(req, res, next) {
  try {
    // suspends execution of rest of function until promise is fulfilled or rejected
    // and it yields the control back to where the async function was called
    // if waiting for that
    const gym = await GymsService.getById(req.app.get("db"), req.params.gym_id);

    if (!gym)
      return res.status(404).json({
        error: `Gym doesn't exist`,
      });

    res.gym = gym;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkGymLocationExists(req, res, next) {
  try {
    const gyms = await GymsService.getByLocation(
      req.app.get("db"),
      req.params.gymLocation
    );

    if (!gyms)
      return res.status(404).json({
        error: `Gym location doesn't exist`,
      });

    res.gyms = gyms;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = gymsRouter;
