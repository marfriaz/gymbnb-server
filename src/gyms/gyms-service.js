const xss = require("xss");

const GymsService = {
  getAllGyms(db) {
    return db
      .from("gymbnb_gyms AS gym")
      .select(
        "gym.id",
        "gym.title",
        "gym.user_id",
        "gym.description",
        "gym.price",
        "gym.max_guest",
        "gym.location",
        "gym.date_created",
        db.raw(
          `json_strip_nulls(
              json_build_object(
                'id', img.id,
                'img_urls', img.img_urls,
                'gym_id', img.gym_id
             )
            ) AS "images"`
        ),
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'first_name', usr.first_name,
              'last_name', usr.last_name,
              'email', usr.email,
              'date_created', usr.date_created
           )
          ) AS "user"`
        )
      )
      .leftJoin("gym_images AS img", "gym.id", "img.gym_id")
      .leftJoin("gymbnb_users AS usr", "gym.user_id", "usr.id")
      .groupBy("gym.id", "usr.id", "img.id");
  },

  getById(db, id) {
    return GymsService.getAllGyms(db).where("gym.id", id).first();
  },

  getByLocation(db, location) {
    return GymsService.getAllGyms(db).where("gym.location", location);
  },

  insertGym(db, newGym, img_urls) {
    return db
      .insert(newGym)
      .into("gymbnb_gyms")
      .returning("*")
      .then(([gym]) => gym)
      .then((gym) => GymsService.insertImages(db, gym.id, img_urls));
  },

  insertImages(db, gym_id, img_urls) {
    return db
      .raw(
        `INSERT INTO gym_images(gym_id, img_urls) VALUES(${gym_id}, '${img_urls}')`
      )

      .then(() => GymsService.getById(db, gym_id));
  },

  getById(db, id) {
    return GymsService.getAllGyms(db).where("gym.id", id).first();
  },

  serializeGym(gym) {
    const { user, images } = gym;
    return {
      id: gym.id,
      title: xss(gym.title),
      description: xss(gym.description),
      price: Number(gym.price),
      max_guest: Number(gym.max_guest),
      location: GymsService.serializeGymLocation(gym.location),
      date_created: new Date(gym.date_created),
      images: {
        id: images.id,
        gym_id: images.gym_id,
        img_urls: images.img_urls,
      },
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        date_created: new Date(user.date_created),
      },
    };
  },

  serializeGymLocation(location) {
    let serializedLocation = location
      .split("-")
      .map((s) => s.substr(0, 1).toUpperCase() + s.substr(1))
      .join(" ");
    return xss(serializedLocation);
  },
};

module.exports = GymsService;
