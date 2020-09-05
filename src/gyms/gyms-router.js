const express = require("express");
const path = require("path");
const GymsService = require("./gyms-service");
const { requireAuth } = require("../middleware/jwt-auth");

const gymsRouter = express.Router();
const jsonBodyParser = express.json();

gymsRouter
  .route("/")

  .get((req, res, next) => {
    GymsService.getAllGyms(req.app.get("db"))
      .then((gyms) => {
        // res.json(gyms);
        res.json(gyms.map(GymsService.serializeGym));
      })
      .catch(next);
  })

  // .post(requireAuth, jsonBodyParser, (req, res, next) => {
  .post(jsonBodyParser, (req, res, next) => {
    const {
      title,
      //check user id
      user_id,
      description,
      guests,
      location,
      price,
      img_url_one,
      img_url_two,
      img_url_three,
      img_url_four,
      img_url_five,
    } = req.body;
    const newGym = {
      title,
      //check user id
      user_id,
      description,
      guests,
      location,
      price,
      img_url_one,
      img_url_two,
      img_url_three,
      img_url_four,
      img_url_five,
    };

    for (const [key, value] of Object.entries(newGym))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });

    // HELP WITH THIS
    // newGym.user_id = req.user.id;

    GymsService.insertGym(req.app.get("db"), newGym)
      .then((gym) => {
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
  .get((req, res) => {
    res.json(GymsService.serializeGym(res.gym));
  });

gymsRouter
  .route("/location/:gymLocation")
  // check gyms exist plural
  .all(checkGymLocationExists)
  .get((req, res) => {
    res.json(GymsService.serializeGym(res.gym));
  });

/* async/await syntax for promises */
async function checkGymIdExists(req, res, next) {
  try {
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
    const gym = await GymsService.getByLocation(
      req.app.get("db"),
      req.params.gymLocation
    );

    if (!gym)
      return res.status(404).json({
        error: `Gym location doesn't exist`,
      });

    res.gym = gym;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = gymsRouter;
