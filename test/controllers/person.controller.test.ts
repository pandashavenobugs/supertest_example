import app from "../../src/app";
import supertest from "supertest";
import personModel, {
  PersonDocument,
  PersonInput,
} from "../../src/models/person.model";
import {
  connectDBForTesting,
  disconnectDBForTesting,
} from "../connectDbForTesting";
import faker from "@faker-js/faker";

describe("person controller Test", () => {
  const personInput: PersonInput = {
    name: faker.name.findName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 18, max: 50 }),
    address: faker.address.streetAddress(),
    gender: faker.name.gender(),
    job: faker.name.jobTitle(),
  };
  var person: PersonDocument;
  beforeAll(async () => {
    await connectDBForTesting();
  });
  afterAll(async () => {
    await personModel.collection.drop();
    await disconnectDBForTesting();
  });

  it("create", async () => {
    const response = await supertest(app)
      .post("/api/persons")
      .send({ ...personInput });
    // console.log(response.body);
    const { person: personAsresponse } = response.body;
    person = personAsresponse;
    // console.log(person);
    expect(person).toMatchObject(personInput);
  });
  it("get", async () => {
    const response = await supertest(app)
      .get("/api/persons")
      .query({ personId: `${person._id}` });
    const { person: personAsresponse } = response.body;
    expect(personAsresponse).toMatchObject(personInput);
  });
  it("update", async () => {
    const updatePersonInput: PersonInput = {
      name: faker.name.findName(),
      lastName: faker.name.lastName(),
      age: faker.datatype.number({ min: 18, max: 50 }),
      address: faker.address.streetAddress(),
      gender: faker.name.gender(),
      job: faker.name.jobTitle(),
    };
    const response = await supertest(app)
      .put(`/api/persons/${person._id}`)
      .send({ ...updatePersonInput });
    const { updatePerson: personAsresponse } = response.body;
    person = personAsresponse;
    expect(person).toMatchObject(updatePersonInput);
    expect(person).not.toMatchObject(personInput);
  });

  it("delete", async () => {
    const response = await supertest(app).delete(`/api/persons/${person._id}`);
    console.log(response.body);
    expect(response.body.message).toBe("person deleted");
  });
});
