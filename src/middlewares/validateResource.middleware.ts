import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const validateSource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e: any) {
      const error: ZodError = e;
      return res.status(400).send(error.errors);
    }
  };
export default validateSource;
