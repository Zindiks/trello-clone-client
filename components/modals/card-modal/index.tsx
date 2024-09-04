"use client";

import { onClose } from "@/lib/store/slices/cardModelSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input"; // Fix the import
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FetchError, ResponseCard } from "@/hooks/useCards";

const fetchCardById = async (card_id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/cards/${card_id}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching card: ${error}`);
  }
};

const CardModal = () => {
  const cardModal = useSelector((state: RootState) => state.cardModal);
  const dispatch = useDispatch();
  const { id } = cardModal;

  const {
    data: cardValues,
    isLoading,
    error,
  } = useQuery<ResponseCard, FetchError>({
    queryKey: ["card", id],
    queryFn: () => fetchCardById(id),
    enabled: !!id,
  });

  // if (isLoading) return <div></div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <Dialog open={cardModal.value} onOpenChange={() => dispatch(onClose())}>
      <DialogTitle>hello</DialogTitle>

      <DialogContent>
        <div>
          {cardValues && (
            <div>
              <p>Title: {cardValues.title}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
