"use client";
import { ListWithCards } from "@/types";
import React, { ElementRef, Fragment, useRef, useState } from "react";
import ListHeader from "./list-header";
import { CardForm } from "./card.form";
import { cn } from "@/lib/utils";
import CardItem from "./card-item";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
interface ListItemProps {
  index: number;
  data: ListWithCards;
}

const ListItem = ({ index, data }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };
  return (
    <Fragment>
      <Draggable draggableId={data.id} index={index}>
        {(provided) => (
          <li
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="shrink-0 h-full w-[272px] select-none"
          >
            <div
              {...provided.dragHandleProps}
              className="w-full rounded-md bg-white bg-opacity-75 shadow-md pb-2"
            >
              <ListHeader onAddCard={enableEditing} data={data} />
              <Droppable droppableId={data.id} type="card">
                {(provided) => (
                  <ol
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "mx-1 px-1 py-0.5 flex flex-col gap-x-2 ",
                      data.cards.length > 0 ? "mt-2" : "mt-0"
                    )}
                  >
                    {data.cards.map((card, index) => (
                      <CardItem index={index} key={card.id} data={card} />
                    ))}
                    {provided.placeholder}
                  </ol>
                )}
              </Droppable>
              <CardForm
                listId={data.id}
                ref={textareaRef}
                isEditing={isEditing}
                disableEditing={disableEditing}
                enableEditing={enableEditing}
              />
            </div>
          </li>
        )}
      </Draggable>
    </Fragment>
  );
};

export default ListItem;
