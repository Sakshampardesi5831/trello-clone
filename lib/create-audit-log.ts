import { auth, currentUser } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface Props {
  entityId: string;
  entityTitle: string;
  entityType: ENTITY_TYPE;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();
    if (!orgId || !user) {
      throw new Error("User not found");
    }
    const {entityId,entityTitle,entityType,action}=props;
    await db.auditLog.create({
      data: {
        entityId,
        entityTitle,
        entityType,
        action,
        userId:user.id,
        userImage:user?.imageUrl,
        userName:user?.firstName+" "+user?.lastName,
        orgId:orgId
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR", error);
  }
};
