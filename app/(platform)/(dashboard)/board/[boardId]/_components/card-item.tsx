import { Card } from "@prisma/client";
import React, { Fragment } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModel } from "@/hooks/use-card-model";
interface CardItemProps {
  data: Card;
  index: number;
}

const CardItem = ({ data, index }: CardItemProps) => {
  const cardModel = useCardModel();
  return (
    <Fragment>
      <Draggable draggableId={data.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
            onClick={() => cardModel.onOpen(data.id)}
            className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm mt-1"
          >
            {data.title}
          </div>
        )}
      </Draggable>
    </Fragment>
  );
};

export default CardItem;
