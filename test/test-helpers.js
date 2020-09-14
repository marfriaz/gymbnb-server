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

function makeMaliciousGymInstance(user) {
  return {
    id: 911,
    user_id: user.id,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    price: 15,
    max_guest: 2,
    location: "los-angeles",
    date_created: new Date(),
  };
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
      max_guest: 5,
      location: "san-francisco",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 2,
      user_id: users[1].id,
      title: "SD gym for you surfer bros & gals",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?",
      price: 15,
      max_guest: 3,
      location: "san-diego",
      date_created: new Date("2020-09-10T07:53:34.035Z"),
    },
    {
      id: 3,
      user_id: users[2].id,
      title: "Sunnyvale gym for your workouts",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?",
      price: 15,
      max_guest: 5,
      location: "sunnyvale",
      date_created: new Date("2020-09-10T07:53:34.035Z"),
    },
    {
      id: 4,
      user_id: users[0].id,
      title: "Getaway gym in San Fran",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?",
      price: 15,
      max_guest: 2,
      location: "san-francisco",
      date_created: new Date("2020-09-10T07:53:34.035Z"),
    },

    {
      id: 911,
      user_id: users[0].id,
      title: 'Naughty naughty very naughty <script>alert("xss");</script>',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
      price: 15,
      max_guest: 2,
      location: "los-angeles",
      date_created: new Date("2020-09-10T07:53:34.035Z"),
    },
  ];
}

function makeImagesArray() {
  return [
    {
      id: 1,
      gym_id: 1,
      img_urls: [
        "https://live.staticflickr.com/65535/50328957172_22665abf5e_h.jpg",
        "https://live.staticflickr.com/65535/50328956702_00db80da55_h.jpg",
      ],
    },
    {
      id: 2,
      gym_id: 2,
      img_urls: [
        "https://live.staticflickr.com/65535/50328957172_22665abf5e_h.jpg",
        "https://live.staticflickr.com/65535/50328956702_00db80da55_h.jpg",
      ],
    },
    {
      id: 3,
      gym_id: 3,
      img_urls: [
        "https://live.staticflickr.com/65535/50328957172_22665abf5e_h.jpg",
        "https://live.staticflickr.com/65535/50328956702_00db80da55_h.jpg",
      ],
    },
    {
      id: 4,
      gym_id: 4,
      img_urls: [
        "https://live.staticflickr.com/65535/50328957172_22665abf5e_h.jpg",
        "https://live.staticflickr.com/65535/50328956702_00db80da55_h.jpg",
      ],
    },
    {
      id: 5,
      gym_id: 911,
      img_urls: [
        "https://live.staticflickr.com/65535/50328957172_22665abf5e_h.jpg",
        "https://live.staticflickr.com/65535/50328956702_00db80da55_h.jpg",
      ],
    },
  ];
}

function makeExpectedGym(users, gym, images) {
  const user = users.find((user) => user.id === gym.user_id);
  const img = images.find((img) => img.gym_id === gym.id);

  return {
    id: gym.id,
    title: gym.title,
    description: gym.description,
    price: Number(gym.price),
    max_guest: Number(gym.max_guest),
    location: gym.location
      .split("-")
      .map((s) => s.substr(0, 1).toUpperCase() + s.substr(1))
      .join(" "),
    date_created: gym.date_created.toISOString(),
    images: {
      id: img.id,
      gym_id: img.gym_id,
      img_urls: img.img_urls,
    },
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
  console.log([user][0]);
  const maliciousGym = makeMaliciousGymInstance(user);

  // const user = makeUsersArray()[2];

  // const maliciousGym = {
  //   id: 911,
  //   user_id: user.id,
  //   title: 'Naughty naughty very naughty <script>alert("xss");</script>',
  //   description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  //   price: 15,
  //   max_guest: 2,
  //   location: "los-angeles",
  //   date_created: new Date(),
  // };

  const image = makeImagesArray()[4];

  const expectedGym = {
    ...makeExpectedGym([user], maliciousGym, [image]),
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
  const testImages = makeImagesArray();

  return { testUsers, testGyms, testImages };
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
        gymbnb_gyms,
        gymbnb_users, 
        gym_images
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

function seedGymsTables(db, users, gyms, images) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async (trx) => {
    await seedUsers(trx, users);
    await trx.into("gymbnb_gyms").insert(gyms);
    await trx.into("gym_images").insert(images);
    // update the auto sequence to match the forced id values
    await trx.raw(`SELECT setval('gymbnb_gyms_id_seq', ?)`, [
      gyms[gyms.length - 1].id,
    ]);
  });
}

function seedMaliciousGym(db, user, gym, img) {
  return seedUsers(db, [user])
    .then(() => db.into("gymbnb_gyms").insert([gym]))
    .then(() => db.into("gym_images").insert([img]));
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
  makeImagesArray,
  makeExpectedGym,
  makeMaliciousGym,

  makeGymsFixtures,
  cleanTables,
  seedGymsTables,
  seedMaliciousGym,
  makeAuthHeader,
  seedUsers,
};
