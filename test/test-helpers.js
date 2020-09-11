const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      id: 1,
      first_name: "test-user-1",
      last_name: "Test user 1",
      email: "TU1",
      password: "password",
      date_created: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 2,
      first_name: "test-user-2",
      last_name: "Test user 2",
      email: "TU2",
      password: "password",
      date_created: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 3,
      first_name: "test-user-3",
      last_name: "Test user 3",
      email: "TU3",
      password: "password",
      date_created: "2029-01-22T16:28:32.615Z",
    },
  ];
}

function makeGymsArray(users) {
  return [
    {
      id: 1,
      user_id: users[0].id,
      title: "Amazing customized home gym in SF!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?",
      price: 15,
      guests: 5,
      location: "san-francisco",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      img_url_one:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_6.jpg",
      img_url_two:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg",
      img_url_three:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg",
      img_url_four:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafa0e52c5a.jpeg",
      img_url_five:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_3.jpg",
    },
    {
      id: 2,
      user_id: users[1].id,
      title: "SD gym for you surfer bros & gals",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?",
      price: 15,
      guests: 3,
      location: "san-diego",
      date_created: new Date("2020-09-10T07:53:34.035Z"),
      img_url_one:
        "https://i.pinimg.com/236x/f0/3e/10/f03e10aee84a171dc6ece6c1e29619d7.jpg",
      img_url_two:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg",
      img_url_three:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg",
      img_url_four:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafa0e52c5a.jpeg",
      img_url_five:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_3.jpg",
    },
    {
      id: 3,
      user_id: users[2].id,
      title: "Sunnyvale gym for your workouts",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?",
      price: 15,
      guests: 5,
      location: "sunnyvale",
      date_created: new Date("2020-09-10T07:53:34.035Z"),
      img_url_one:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_6.jpg",
      img_url_two:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg",
      img_url_three:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg",
      img_url_four:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafa0e52c5a.jpeg",
      img_url_five:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_3.jpg",
    },
    {
      id: 4,
      user_id: users[0].id,
      title: "Getaway gym in San Fran",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?",
      price: 15,
      guests: 2,
      location: "san-francisco",
      date_created: new Date("2020-09-10T07:53:34.035Z"),
      img_url_one:
        "https://i.pinimg.com/originals/6f/c3/e8/6fc3e8a189fa706150a9fc3780ac29ea.jpg",
      img_url_two:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg",
      img_url_three:
        "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg",
      img_url_four: null,
      img_url_five: null,
    },
  ];
}

function makeExpectedGym(users, gym) {
  //double checck
  const user = users.find((user) => user.id === gym.user_id);

  return {
    id: gym.id,
    title: gym.title,
    description: gym.description,
    price: Number(gym.price),
    guests: Number(gym.guests),
    location: gym.location
      .split("-")
      .map((s) => s.substr(0, 1).toUpperCase() + s.substr(1))
      .join(" "),
    date_created: gym.date_created.toISOString(),
    img_url_one: gym.img_url_one,
    img_url_two: gym.img_url_two,
    img_url_three: gym.img_url_three,
    img_url_four: gym.img_url_four,
    img_url_five: gym.img_url_five,
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      date_created: user.date_created,
    },
  };
}

function makeMaliciousGym(user) {
  const maliciousGym = {
    id: 911,
    user_id: user.id,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    price: 15,
    guests: 2,
    location: "los-angeles",
    date_created: new Date(),
    img_url_one:
      "https://i.pinimg.com/originals/26/b1/fb/26b1fbfb2bff406f71bd213b314872a5.jpg",
    img_url_two:
      "https://i.pinimg.com/236x/5e/49/3d/5e493d1f8381303bcc8d1c870d1da1d7.jpg",
    img_url_three:
      "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg",
    img_url_four:
      "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafa0e52c5a.jpeg",
    img_url_five:
      "https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_3.jpg",
  };
  const expectedGym = {
    ...makeExpectedGym([user], maliciousGym),
    title:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  };
  return {
    maliciousGym,
    expectedGym,
  };
}

function makeGymsFixtures() {
  const testUsers = makeUsersArray();
  const testGyms = makeGymsArray(testUsers);
  return { testUsers, testGyms };
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
        gymbnb_gyms,
        gymbnb_users
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE gymbnb_gyms_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE gymbnb_users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('gymbnb_gyms_id_seq', 0)`),
          trx.raw(`SELECT setval('gymbnb_users_id_seq', 0)`),
        ])
      )
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into("gymbnb_users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('gymbnb_users_id_seq', ?)`, [
        users[users.length - 1].id,
      ])
    );
}

function seedGymsTables(db, users, gyms) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async (trx) => {
    await seedUsers(trx, users);
    await trx.into("gymbnb_gyms").insert(gyms);
    // update the auto sequence to match the forced id values
    await trx.raw(`SELECT setval('gymbnb_gyms_id_seq', ?)`, [
      gyms[gyms.length - 1].id,
    ]);
  });
}

function seedMaliciousGym(db, user, gym) {
  return seedUsers(db, [user]).then(() => db.into("gymbnb_gyms").insert([gym]));
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.email,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeGymsArray,
  makeExpectedGym,
  makeMaliciousGym,

  makeGymsFixtures,
  cleanTables,
  seedGymsTables,
  seedMaliciousGym,
  makeAuthHeader,
  seedUsers,
};
