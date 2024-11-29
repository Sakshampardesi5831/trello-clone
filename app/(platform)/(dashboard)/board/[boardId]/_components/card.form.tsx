"use client";
import React, {
  forwardRef,
  Fragment,
  useRef,
  ElementRef,
  KeyboardEventHandler,
  KeyboardEvent,
} from "react";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";
import { useOnClickOutside, useEventListener } from "usehooks-ts";
import { toast } from "sonner";
interface CardFormProps {
  listId: string;
  isEditing: boolean;
  disableEditing: () => void;
  enableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, disableEditing, enableEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`);
      },
      onError: (error) => {
        toast.error(error);
      },
    });
    const onKeyDown =  (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };
    useOnClickOutside(formRef, disableEditing);
    //useEventListener("keydown", onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;
      console.log(title,listId,boardId);
      execute({ title, listId, boardId });
      formRef.current?.reset();
    };

    if (isEditing) {
      return (
        <form ref={formRef} action={onSubmit} className="m-1 py-0.5 space-y-4">
          <FormTextarea
            id="title"
            onKeyDown={onTextareakeyDown}
            ref={ref}
            placeholder="Enter the title for this Card"
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-x-1 text-white">
            <FormSubmit>Add Card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="w-4 h-4 text-black " />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <Fragment>
        <div className="pt-2 px-2">
          <Button
            onClick={enableEditing}
            className="h-auto px-2 py-1.5 w-full justify-start text-gray-500 text-sm"
            size="sm"
            variant="ghost"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add a Card
          </Button>
        </div>
      </Fragment>
    );
  }
);

CardForm.displayName = "CardForm";
