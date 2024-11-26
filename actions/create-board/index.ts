"use server";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/org-limit";
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized access" };
  }
  const canCreate = await hasAvailableCount();
  if (!canCreate) {
    return {
      error:
        "You have reached your limit of free boards. Please upgrade to create more",
    };
  }
  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");
  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return { error: "Image data is missing" };
  }
  let board;
  try {
    board = await db.broad.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });
    await incrementAvailableCount();
    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return { error: "Database error" };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);

/*import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const createBoard = z.object({
  title: z.string().min(3, " Minimum 3 character in board"),
});

export async function createForm(prevState: State, formData: FormData) {
  const validatedField = createBoard.safeParse({
    title: formData.get("title"),
  });
  //const title = formData.get("title") as string;
  if(!validatedField.success){
    return {
      errors: validatedField.error.flatten().fieldErrors,
      message:"Missing Field"
    }
  }
  const {title}=validatedField.data;
  try {
    await db.broad.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message:"database error"
    }
  }
  revalidatePath("/organization/org_2juRboGjYXPuMRGQD0WWuvkiA64");
  redirect("/organization/org_2juRboGjYXPuMRGQD0WWuvkiA64");
}*/
