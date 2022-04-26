import { Request, Response } from "express";
import personModel from "../models/person.model";
import { createPersonInput } from "../schemas/person.schema";
import {
  createPerson,
  deletePerson,
  findAndUpdatePerson,
  findPerson,
} from "../services/person.service";

export async function createPersonHandler(
  req: Request<{}, {}, createPersonInput["body"]>,
  res: Response
) {
  try {
    const { body } = req;
    const person = await createPerson({
      ...body,
    });
    res.status(200).json({
      person,
    });
  } catch (error) {
    res.status(500).json({ message: "server err" });
  }
}

export async function updatePersonHandler(req: Request, res: Response) {
  try {
    const { personId: _id } = req.params;
    const { body: update } = req;
    const person = await findPerson({ _id });
    if (!person) {
      return res.status(404);
    }
    const updatePerson = await findAndUpdatePerson({ _id }, update, {
      new: true,
    });
    res.status(200).json({
      updatePerson,
    });
  } catch (error) {
    res.status(500).json({ message: "server err" });
  }
}

export async function getPersonHandler(req: Request, res: Response) {
  try {
    const { personId: _id } = req.query;

    const person = await findPerson({ _id });
    if (!person) {
      return res.status(404);
    }

    res.status(200).json({
      message: "person fetched",
      person,
    });
  } catch (error) {
    res.status(500).json({ message: "server err" });
  }
}
export async function deletePersonHandler(req: Request, res: Response) {
  try {
    const { personId: _id } = req.params;
    const person = await findPerson({ _id });
    if (!person) {
      return res.status(404);
    }
    await deletePerson({ _id });
    res.status(200).json({
      message: "person deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "server err" });
  }
}
