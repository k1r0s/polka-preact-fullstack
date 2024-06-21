import assert from "assert";
import request from "request-promise-native";

const VARS = {};
VARS.first_course_id = null;

describe("Create course", () => {
  let payload;
  let options;

  beforeEach(() => {
    payload = {};
    payload.title =                    "Sample course";
    payload.description =              "this is a sample";
    payload.hours =                    "12";
    payload.credits =                  "15";
    payload.difficulty =               "easy";

    options = {};
    options.method =                  "POST";
    options.uri =                     "http://localhost:3000/courses";
    options.body =                    payload;
    options.json =                    true;
    options.resolveWithFullResponse = true;
    options.simple =                  false;
  })

  it("should create a course", () => {
    return request(options).then(response => {
      assert(response.statusCode === 201);
      assert("title" in response.body);
      assert(response.body.title === payload.title);
      assert("description" in response.body);
      assert(response.body.description === payload.description);
      assert("hours" in response.body);
      assert(response.body.hours === payload.hours);
      assert("credits" in response.body);
      assert(response.body.credits === payload.credits);
      assert("difficulty" in response.body);
      assert(response.body.difficulty === payload.difficulty);
      assert("uid" in response.body);

      VARS.first_course_id = response.body.uid;
    })
  })

  it("create another course for testing purposes", () => {

    payload.title =                    "Another course";
    payload.description =              "this is another sample";

    return request(options).then(response => {

      assert(response.statusCode === 201);
      assert("title" in response.body);
      assert("description" in response.body);
      assert("hours" in response.body);
      assert("credits" in response.body);
      assert("difficulty" in response.body);
      assert("uid" in response.body);

      assert(VARS.first_course_id !== response.body.uid);
    })
  })
})

describe("List courses", () => {
  let payload;
  let options;

  it("should list available courses", () => {
    options = {};
    options.uri =                     "http://localhost:3000/courses";
    options.json =                    true;
    options.resolveWithFullResponse = true;
    options.simple =                  false;

    return request(options).then(response => {
      assert(response.statusCode === 200);
      assert(Array.isArray(response.body));
      assert(response.body.includes(VARS.first_course_id));
    })
  })
})
