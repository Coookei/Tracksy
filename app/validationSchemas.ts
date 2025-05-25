import { z } from "zod";

const DESCRIPTION_REQUIRED = "Description is required";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  description: z.string({ required_error: DESCRIPTION_REQUIRED }).min(1, DESCRIPTION_REQUIRED),
});
