"use client";

import React, { ElementRef, Fragment, useRef, useState } from "react";
import { CardWithList } from "@/types";
import { Layout } from "lucide-react";
import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { updateCard } from "@/actions/update-card";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
interface CardHeaderProps {
  data?: CardWithList;
}
const CardHeader = ({ data }: CardHeaderProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data?.title);

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["card", data?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data?.id],
      });
      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title");
    const boardId = params.boardId as string;
    if (title === data?.title) {
      return;
    }
    execute({
      title: title as string,
      id: data?.id as string,
      boardId: boardId,
    });
  };
  return (
    <Fragment>
      <div className="flex items-start gap-x-3 mb-6 w-full">
        <Layout className="h-5 w-5 mt-1 text-neutral-700 " />
        <div className="w-full">
          <form action={onSubmit}>
            <FormInput
              ref={inputRef}
              onBlur={onBlur}
              id="title"
              defaultValue={title}
              className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible: border-input mb-0.5 truncate "
            />
          </form>
          <p className="text-sm text-muted-foreground mt-2">
            in list <span className="underline">{data?.list.title}</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

CardHeader.Skeleton = function CardHeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mb-1 bg-neutral-200" />
      <Skeleton className="h-4 w-12  bg-neutral-200 " />
    </div>
  );
};

export default CardHeader;
