import { z } from "zod";

const TITLE_REQUIRED = "Title is required";
const DESCRIPTION_REQUIRED = "Description is required";

export const issueSchema = z.object({
  title: z
    .string({ required_error: TITLE_REQUIRED })
    .min(1, TITLE_REQUIRED)
    .max(255, "Title must be less than 255 characters"),
  description: z.string({ required_error: DESCRIPTION_REQUIRED }).min(1, DESCRIPTION_REQUIRED),
});
