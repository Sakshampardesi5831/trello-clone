"use client";
import React, { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModel } from "@/hooks/use-card-model";
interface CardActionsProps {
  data?: CardWithList;
}

const CardActions = ({ data }: CardActionsProps) => {
  const params = useParams();
  const cardModel=useCardModel();
  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} copied`);
        cardModel.onClose();
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error.message);
      },
    }
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} Deleted`);
        cardModel.onClose();
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error.message);
      },
    }
  );

  const onCopyCard = () => {
    if (!data) return;
    const boardId = params.boardId as string;
    executeCopyCard({ id: data.id, boardId });
  };

  const onDeleteCard = () => {
    if (!data) return;
    const boardId = params.boardId as string;
    executeDeleteCard({ id: data.id, boardId });
  };

  return (
    <Fragment>
      <div className="space-y-2 mt-2">
        <p className="text-xs font-semibold">Actions</p>
        <Button
          className="w-full justify-start"
          variant="gray"
          size="inline"
          onClick={onCopyCard}
          disabled={isLoadingCopy}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button
         className="w-full justify-start"
          variant="gray"
          size="inline"
          onClick={onDeleteCard}
          disabled={isLoadingDelete}
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </Fragment>
  );
};

CardActions.Skeleton = function ActionsSkeleton() {
  return (
    <Fragment>
      <div className="space-y-2 mt-2">
        <Skeleton className="w-20 h-4 bg-neutral-200" />
        <Skeleton className="w-full h-8 bg-neutral-200" />
        <Skeleton className="w-full h-8 bg-neutral-200" />
      </div>
    </Fragment>
  );
};

export default CardActions;
