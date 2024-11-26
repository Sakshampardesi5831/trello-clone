"use client";
import React, { Fragment, useState, useRef, ElementRef } from "react";
import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AlignLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";
interface DescriptionProps {
  data?: CardWithList;
}

const CardDescription = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const params = useParams();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      // textareaRef.current?.select();
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = async (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data?.id],
      });
      toast.success(`Card ${data.title} Updated`);
      disableEditing();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;
    //TODO: Execute
    execute({
      id: data?.id as string,
      title: data?.title as string,
      description,
      boardId,
    });
  };

  return (
    <Fragment>
      <div className="flex items-start gap-x-3 w-full">
        <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
        <div className="w-full">
          <p className="font-semibold text-neutral-700 mb-2">Description</p>
          {isEditing ? (
            <form action={onSubmit} ref={formRef} className="space-y-2">
              <FormTextarea
                id="description"
                className="w-full mt-2"
                placeholder="Add a more details description "
                defaultValue={data?.description || undefined}
                errors={fieldErrors}
                ref={textareaRef}
              />
              <div className="flex items-center gap-x-2">
                <FormSubmit className="text-white">Save</FormSubmit>
                <Button
                  type="button"
                  onClick={disableEditing}
                  size="sm"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Fragment>
              <div
                onClick={enableEditing}
                role="button"
                className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
              >
                {data?.description || "Add a more detailed description"}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

CardDescription.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};

export default CardDescription;
