import { Router } from "express";
import {
  createPersonHandler,
  deletePersonHandler,
  getPersonHandler,
  updatePersonHandler,
} from "../controllers/person.controller";
import validateSource from "../middlewares/validateResource.middleware";
import { createPersonSchema } from "../schemas/person.schema";

const personRoutes = Router();

personRoutes.get("/api/persons", getPersonHandler);

personRoutes.post(
  "/api/persons",
  validateSource(createPersonSchema),
  createPersonHandler
);

personRoutes.put(
  "/api/persons/:personId",
  validateSource(createPersonSchema),
  updatePersonHandler
);
personRoutes.delete(
  "/api/persons/:personId",

  deletePersonHandler
);
export default personRoutes;
