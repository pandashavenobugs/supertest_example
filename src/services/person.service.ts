import personModel, {
  PersonInput,
  PersonDocument,
} from "../models/person.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
export async function createPerson(input: PersonInput) {
  const person = new personModel({
    ...input,
  });
  return person.save();
}

export async function findPerson(
  query: FilterQuery<{ _id: string }>,
  options: QueryOptions = { lean: false }
) {
  return personModel.findOne(query, {}, options);
}

export async function findAndUpdatePerson(
  query: FilterQuery<{ _id: string }>,
  update: UpdateQuery<PersonDocument>,
  options: QueryOptions
) {
  return personModel.findOneAndUpdate(query, update, options);
}

export async function deletePerson(query: FilterQuery<{ _id: string }>) {
  return personModel.deleteOne(query);
}
