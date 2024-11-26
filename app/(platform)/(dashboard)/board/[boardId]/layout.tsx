import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { startCase } from "lodash";
import { notFound, redirect } from "next/navigation";
import BoardNavbar from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) {
    return {
      title: "Baord",
    };
  }
  const board = await db.broad.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });
  return {
    title: startCase(board?.title || "Board"),
    //description: `Manage ${startCase(orgI)} organization`,
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }
  const board = await db.broad.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-[100vh] bg-no-repeat bg-center bg-cover  "
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
