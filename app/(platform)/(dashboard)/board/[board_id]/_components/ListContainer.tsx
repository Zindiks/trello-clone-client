"use client";

import { List } from "../types";
import { useEffect, useState } from "react";

import ListForm from "./ListForm";
import ListItem from "./ListItem";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { assign } from "lodash";
import { useLists } from "@/hooks/useLists";
import { useCards } from "@/hooks/useCards";

interface ListContainerProps {
  data: List[];
  board_id: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const ListContainer = ({ data, board_id }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  const { updateListsOrder } = useLists(board_id);

  const { updateCardsOrder } = useCards();

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;
    //if dropped in the same postition

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // user move a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      );

      //TODO: Trigger API
      setOrderedData(items);
      updateListsOrder.mutate([items, board_id]);
    }

    // if user moved a  card
    if (type === "card") {
      let newOrderedData = [...orderedData];

      // Source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      );

      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destList) {
        return;
      }

      //check if cards exists in sourcelist

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      //check if cards exists in destlist
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);

        //TODO: Save to api
        updateCardsOrder.mutate([reorderedCards, sourceList.id]);
      } else {
        //USER moves the card to another List

        //Remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        //Assign the new list_id to the moved card

        movedCard.list_id = destination.droppableId;

        // Add card to the destination list

        destList.cards.splice(destination.index, 0, movedCard);

        // update the order of cards in sourceList
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // update the order of cards in destination List
        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        //TODO: Trigger API

        console.log(sourceList.cards);
        console.log(destList.cards)

        updateCardsOrder.mutate([destList.cards, sourceList.id]);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData?.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}

            {provided.placeholder}
            <ListForm />
            <div className={"flex shrink-0 w-1"}></div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
