const express = require("express");
const path = require("path");
const GymsService = require("./gyms-service");
const { requireAuth } = require("../middleware/jwt-auth");

const gymsRouter = express.Router();
const jsonBodyParser = express.json();

gymsRouter
  .route("/")

  .get((req, res, next) => {
    console.log("demo");
    GymsService.getAllGyms(req.app.get("db"))
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
