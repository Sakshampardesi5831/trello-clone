import React, { Fragment } from "react";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ListContainer from "./_components/list-container";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

// BoardIdPage
const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { userId, orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId: orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <Fragment>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer
         boardId={params.boardId}
         data={lists}
        />

      </div>
    </Fragment>
  )
};

export default BoardIdPage;
