import { object, string, number, TypeOf } from "zod";

export const createPersonSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    lastName: string().optional(),
    address: string({
      required_error: "adress is required",
    }),
    gender: string({
      required_error: "gender is required",
    }),
    job: string().optional(),
    age: number({
      required_error: "age is required",
    }).gte(18, { message: "age has to be min 18" }),
  }),
});

export type createPersonInput = TypeOf<typeof createPersonSchema>;
