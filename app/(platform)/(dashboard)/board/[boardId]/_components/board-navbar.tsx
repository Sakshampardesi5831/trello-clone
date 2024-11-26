import React, { Fragment } from "react";
import { Broad } from "@prisma/client";
import BoardTitleForm from "./board-title-form";
import BoardOptions from "./board-options";
interface BoardNavbarProps {
  data: Broad;
}

const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <Fragment>
      <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white ">
        <BoardTitleForm data={data} />
        <div className="ml-auto">
           <BoardOptions id={data.id} />
          
        </div>
      </div>
    </Fragment>
  );
};

export default BoardNavbar;
