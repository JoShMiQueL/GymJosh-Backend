require("../dist/backend/esm/src/util/environment");
const { default: app } = require("../dist/backend/esm/src/routes");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { MONGO_HOST, MONGO_USER, MONGO_PASSWORD } = process.env;
const mongoURL = `mongodb://${
  MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}@` : ""
}${MONGO_HOST}/JestDB`;

beforeEach((done) => {
  mongoose.connect(
    mongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe("MongoDB", () => {
  test("Connect database", () => {
    expect(mongoose.connection.db).toBeDefined();
  });

  let exercise;

  test("GET /exercises", async () => {
    exercise = await mongoose.connection.db.collection("exercises").insertMany([
      {
        id: 1,
        name: "Pijo",
        count: 199,
      },
      {
        id: 2,
        name: "Pija",
        count: 21,
      },
    ]);
    const res = await supertest(app).get("/exercises").expect(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(2);

    expect(res.body[0].id).toBe(exercise.ops[0].id);
    expect(res.body[0].name).toBe(exercise.ops[0].name);
    expect(res.body[0].count).toBe(exercise.ops[0].count);
  });
});
