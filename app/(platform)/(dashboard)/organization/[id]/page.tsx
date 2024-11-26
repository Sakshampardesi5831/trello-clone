import { db } from "@/lib/db";
import React, { Fragment, Suspense } from "react";
import { useFormState } from "react-dom";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/board-list";
const OrganizationPage = async () => {
  return (
    <Fragment>
      <div className="w-full mb-20">
        <Info />
        <Separator className="my-4" />
        <div className="px-2 md:px-4">
          <Suspense fallback={<BoardList.Skeleton />}>
            <BoardList />
          </Suspense>
        </div>
      </div>
    </Fragment>
  );
};

export default OrganizationPage;
//import Board from "./_components/board";
//import FormComponents from "./form";
//const boards = await db.broad.findMany();
// <div className="flex flex-col space-y-4">
//   <FormComponents/>
//   <div className="space-y-2">
//     {boards.map((board) => (
//       <Fragment key={board.id}>
//         <Board id={board.id} title={board.title} />
//       </Fragment>
//     ))}
//   </div>
// </div>
