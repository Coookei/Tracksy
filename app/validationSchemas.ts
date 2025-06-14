import { z } from "zod";

const TITLE_REQUIRED = "Title is required";
const DESCRIPTION_REQUIRED = "Description is required";
const ASSIGNED_TO_USER_ID_REQUIRED = "AssignedToUserId is required";

export const issueSchema = z
  .object({
    title: z
      .string({ required_error: TITLE_REQUIRED })
      .min(1, TITLE_REQUIRED)
      .max(255, "Title must be less than 255 characters"),
    description: z
      .string({ required_error: DESCRIPTION_REQUIRED })
      .min(1, DESCRIPTION_REQUIRED)
      .max(65535, "Description must be less than 65,535 characters"),
  })
  .strict();

const patchIssueBaseSchema = z
  .object({
    title: z
      .string()
      .min(1, TITLE_REQUIRED)
      .max(255, "Title must be less than 255 characters")
      .optional(),
    description: z
      .string()
      .min(1, DESCRIPTION_REQUIRED)
      .max(65535, "Description must be less than 65,535 characters")
      .optional(),
    assignedToUserId: z
      .string()
      .min(1, ASSIGNED_TO_USER_ID_REQUIRED)
      .max(255, "AssignedToUserId must be less than 255 characters")
      .optional()
      .nullable(),
  })
  .strict();

type PatchIssueData = z.infer<typeof patchIssueBaseSchema>;
const PATCH_FIELDS = Object.keys(patchIssueBaseSchema.shape) as (keyof PatchIssueData)[];

export const patchIssueSchema = patchIssueBaseSchema.refine(
  (data) => PATCH_FIELDS.some((field) => data[field] !== undefined),
  {
    message: `At least one of ${PATCH_FIELDS.join(", ")} must be provided`,
  },
);
