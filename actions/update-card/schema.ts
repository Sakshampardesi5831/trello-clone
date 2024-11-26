import { z } from "zod";

export const UpdateCard = z.object({
  title: z.optional(
    z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
      })
      .min(3, {
        message: "Title is Too short",
      })
  ),
  id: z.string(),
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        invalid_type_error: "Description is Required",
        required_error: "Description is Required",
      })
      .min(3, {
        message: "Description is too short",
      })
  ),
});
