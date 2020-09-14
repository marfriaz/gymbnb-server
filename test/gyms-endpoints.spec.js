const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Gyms Endpoints", function () {
  let db;

  const { testUsers, testGyms, testImages } = helpers.makeGymsFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`GET /api/gyms`, () => {
    context(`Given no gyms`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/gyms").expect(200, []);
      });
    });

    context("Given there are gyms in the database", () => {
      beforeEach("insert gyms", () =>
        helpers.seedGymsTables(db, testUsers, testGyms, testImages)
      );

      it("responds with 200 and all of the gyms", () => {
        const expectedGyms = testGyms.map((gym) =>
          helpers.makeExpectedGym(testUsers, gym, testImages)
        );
        return supertest(app).get("/api/gyms").expect(200, expectedGyms);
      });
    });

    context(`Given an XSS attack gym`, () => {
      const testUser = helpers.makeUsersArray()[1];
      const testImage = helpers.makeImagesArray()[1];
      const { maliciousGym, expectedGym } = helpers.makeMaliciousGym(
        testUser,
        testImage
      );

      beforeEach("insert malicious gym", () => {
        return helpers.seedMaliciousGym(db, testUser, maliciousGym, testImage);
      });

      it("removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/gyms`)
          .expect(200)
          .expect((res) => {
            expect(res.body[0].title).to.eql(expectedGym.title);
            expect(res.body[0].description).to.eql(expectedGym.description);
          });
      });
    });
  });

  describe(`GET /api/gyms/:gym_id`, () => {
    context(`Given no gyms`, () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));

      it(`responds with 404`, () => {
        const gymId = 123456;
        return supertest(app)
          .get(`/api/gyms/${gymId}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Gym doesn't exist` });
      });
    });

    context("Given there are gyms in the database", () => {
      beforeEach("insert gyms", () =>
        helpers.seedGymsTables(db, testUsers, testGyms, testImages)
      );

      it("responds with 200 and the specified gym", () => {
        const gymId = 2;
        const expectedGym = helpers.makeExpectedGym(
          testUsers,
          testGyms[gymId - 1],
          testImages
        );

        return supertest(app)
          .get(`/api/gyms/${gymId}`)
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedGym);
      });
    });

    context(`Given an XSS attack gym`, () => {
      const testUser = helpers.makeUsersArray()[1];
      const testImage = helpers.makeImagesArray()[4];
      const { maliciousGym, expectedGym } = helpers.makeMaliciousGym(testUser);

      beforeEach("insert malicious gym", () => {
        return helpers.seedMaliciousGym(db, testUser, maliciousGym, testImage);
      });

      it("removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/gyms/${maliciousGym.id}`)
          .set("Authorization", helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect((res) => {
            expect(res.body.title).to.eql(expectedGym.title);
            expect(res.body.description).to.eql(expectedGym.description);
          });
      });
    });
  });
});
