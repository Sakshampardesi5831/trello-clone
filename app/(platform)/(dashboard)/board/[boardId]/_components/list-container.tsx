"use client";
import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import React, { Fragment, useEffect, useState } from "react";
import ListForm from "./list-form";
import ListItem from "./list-item";
import { toast } from "sonner";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";
interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);
  const { execute: executeUpdateOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) return;
    //Drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //User move a list
    if (type == "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);
      //TODO : TRIGGER SERVER ACTION
      executeUpdateOrder({ items, boardId });
    }
    //uSER mOVE A CARD
    if (type == "card") {
      const newOrderedData = [...orderedData];
      //Source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );
      if (!sourceList || !destinationList) return;

      // Check if the card exists in the source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      //Check card exist in the destination list
      if (!destinationList.cards) {
        destinationList.cards = [];
      }
      //Moving the card in same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);

        //TODO Trigger server actions
        // executeUpdateCardOrder({items:,boardId})
        executeUpdateCardOrder({
          boardId,
          items: reorderedCards,
        });
      } else {
        //Remove Card from the source List
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        //Assign the new list id to the moved card
        movedCard.listId = destination.droppableId;
        // Add Card to destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        //Update order for remaining cards
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        // Update the order for each card in the destination card
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        // TODO : Trigger server actions
        executeUpdateCardOrder({
          boardId,
          items: destinationList.cards,
        });
      }
    }
  };
  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists" type="list" direction="horizontal">
          {(provided) => (
            <ol
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-x-3 h-full"
            >
              {orderedData.map((list, index) => {
                return <ListItem key={list.id} index={index} data={list} />;
              })}
              {provided.placeholder}
              <ListForm />
              <div className="flex shrink-0 w-1" />
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
};

export default ListContainer;
