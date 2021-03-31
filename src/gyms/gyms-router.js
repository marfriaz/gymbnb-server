const express = require("express");
const path = require("path");
const GymsService = require("./gyms-service");
const { requireAuth } = require("../middleware/jwt-auth");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const gymsRouter = express.Router();
const jsonBodyParser = express.json();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECI,
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "gymbnb",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${uuidv4()}.jpeg`);
    },
  }),
}).array("image", 6);

gymsRouter
  .route("/")

  .get((req, res, next) => {
    GymsService.getAllGyms(req.app.get("db"))
      .then((gyms) => {
        res.json(gyms.map(GymsService.serializeGym));
      })
      .catch(next);
  })

  .post(requireAuth, jsonBodyParser, uploadS3, (req, res, next) => {
    let imgs = req.files.map((str) => str.location);

    const { title, description, max_guest, location, price } = req.body;

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

    newGym.user_id = 1;

    GymsService.insertGym(req.app.get("db"), newGym, `{${imgs}}`)
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

  .all(checkGymLocationExists)
  .get((req, res) => {
    const results = res.gyms.map((gym) => GymsService.serializeGym(gym));
    res.send(results);
  });

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
