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
        "gym.guests",
        "gym.location",
        "gym.date_created",
        "gym.img_url_one",
        "gym.img_url_two",
        "gym.img_url_three",
        "gym.img_url_four",
        "gym.img_url_five"
      );
    // "*",
    //   db.raw(`count(DISTINCT gym) AS number_of_gyms`),

    //   db.raw(
    //     `json_strip_nulls(
    //   json_build_object(
    //     'id', usr.id,
    //     'first_name', usr.first_name,
    //     'last_name', usr.last_name,
    //     'email', usr.email,
    //     'date_created', usr.date_created,
    //     )
    //   ) AS "user"`
    //   )
    // )
    // .leftJoin("gymbnb_users AS usr", "gym.user_id", "usr.id")
    // .groupBy("gym.id", "usr.id");
  },

  // getAllGyms(db) {
  //   return db.select("*").from("gymbnb_gyms");
  // },

  getById(db, id) {
    return GymsService.getAllGyms(db).where("gym.id", id).first();
  },

  //HELP
  getByLocation(db, location) {
    return GymsService.getAllGyms(db).where("gym.location", location).first();
  },

  insertGym(db, newGym) {
    return db
      .insert(newGym)
      .into("gymbnb_gyms")
      .returning("*")
      .then(([gym]) => gym)
      .then((gym) => GymsService.getById(db, gym.id));
  },

  serializeGym(gym) {
    const { user } = gym;
    return {
      id: gym.id,
      title: xss(gym.title),
      description: xss(gym.description),
      price: Number(gym.price),
      guests: Number(gym.guests),
      location: gym.location,
      // number_of_gyms: Number(gym.number_of_gyms) || 0,
      date_created: new Date(gym.date_created),
      img_url_one: gym.img_url_one,
      img_url_two: gym.img_url_two,
      img_url_three: gym.img_url_three,
      img_url_four: gym.img_url_four,
      img_url_five: gym.img_url_five,
      // user: {
      //   id: user.id,
      //   first_name: user.first_name,
      //   last_name: user.last_name,
      //   email: user.email,
      //   date_created: new Date(user.date_created),
      // },
    };
  },
};

module.exports = GymsService;

// const xss = require("xss");

// const GymsService = {
//   getAllGyms(db) {
//     return db
//       .from("gymbnb_gyms AS gym")
//       .select("*"
//         db.raw(`count(DISTINCT gym) AS number_of_gyms`),
//         db.raw(
//           `json_strip_nulls(
//             json_build_object(
//               'id', usr.id,
//               'user_name', usr.user_name,
//               'full_name', usr.full_name,
//               'nickname', usr.nickname,
//               'date_created', usr.date_created,
//               'date_modified', usr.date_modified
//             )
//           ) AS "author"`
//         )
//       )
//       .leftJoin("blogful_comments AS comm", "art.id", "commgym_id")
//       .leftJoin("blogful_users AS usr", "art.author_id", "usr.id")
//       .groupBy("art.id", "usr.id");
//   },

//   getById(db, id) {
//     return GymsService.getAllGyms(db).where("art.id", id).first();
//   },

//   getCommentsForArticle(db, article_id) {
//     return db
//       .from("blogful_comments AS comm")
//       .select(
//         "comm.id",
//         "comm.text",
//         "comm.date_created",
//         db.raw(
//           `json_strip_nulls(
//             row_to_json(
//               (SELECT tmp FROM (
//                 SELECT
//                   usr.id,
//                   usr.user_name,
//                   usr.full_name,
//                   usr.nickname,
//                   usr.date_created,
//                   usr.date_modified
//               ) tmp)
//             )
//           ) AS "user"`
//         )
//       )
//       .where("commgym_id", article_id)
//       .leftJoin("blogful_users AS usr", "comm.user_id", "usr.id")
//       .groupBy("comm.id", "usr.id");
//   },

//   serializeArticle(article) {
//     const { author } = article;
//     return {
//       id: article.id,
//       style: article.style,
//       title: xss(article.title),
//       content: xss(article.content),
//       date_created: new Date(article.date_created),
//       number_of_comments: Number(article.number_of_comments) || 0,
//       author: {
//         id: author.id,
//         user_name: author.user_name,
//         full_name: author.full_name,
//         nickname: author.nickname,
//         date_created: new Date(author.date_created),
//         date_modified: new Date(author.date_modified) || null,
//       },
//     };
//   },

//   serializeArticleComment(comment) {
//     const { user } = comment;
//     return {
//       id: comment.id,
//       article_id: commentgym_id,
//       text: xss(comment.text),
//       date_created: new Date(comment.date_created),
//       user: {
//         id: user.id,
//         user_name: user.user_name,
//         full_name: user.full_name,
//         nickname: user.nickname,
//         date_created: new Date(user.date_created),
//         date_modified: new Date(user.date_modified) || null,
//       },
//     };
//   },
// };

// module.exports = GymsService;
