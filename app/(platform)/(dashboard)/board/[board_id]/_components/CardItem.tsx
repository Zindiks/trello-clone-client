import { useDispatch, useSelector } from "react-redux";
import { Card } from "../types";

import { Draggable } from "@hello-pangea/dnd";
import { RootState } from "@/lib/store/store";
import { onOpen } from "@/lib/store/slices/cardModelSlice";

interface CardItemProps {
  index: number;
  data: Card;
}

const CardItem = ({ index, data }: CardItemProps) => {
  const cardModal = useSelector((state: RootState) => state.cardModal);

  const dispatch = useDispatch();

  



  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          role={"button"}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
          onClick={() => dispatch(onOpen(data.id))}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
