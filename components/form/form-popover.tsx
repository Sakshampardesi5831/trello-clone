"use client";
import React, { ElementRef, Fragment,useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { useRouter } from "next/navigation";
import { useProModel } from "@/hooks/use-pro-model";
interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}
const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset,
}: FormPopoverProps) => {
  const router=useRouter();
  const proModel=useProModel();
  const closeRef=useRef<ElementRef<"button">>(null)
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
      toast.success("Board Created");
      closeRef.current?.click();
      router.push(`/board/${data.id}`)
    },
    onError: (error:any) => {
      console.log(error);
      toast.error(error);
      proModel.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
    console.log({ title, image });
  };
  return (
    <Fragment>
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          align={align}
          className="w-80 pt-3"
          side={side}
          sideOffset={sideOffset}
        >
          <div className="text-sm font-medium text-center text-neutral-600 pb-4 ">
            Create Board
          </div>
          <PopoverClose ref={closeRef} asChild>
            <Button
              variant="ghost"
              className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
          <form action={onSubmit} className="space-y-4">
            <div className="space-y-4">
              <FormPicker id="image" errors={fieldErrors} />
              <FormInput
                id="title"
                label="Board Title"
                type="text"
                errors={fieldErrors}
              />
            </div>
            <FormSubmit className="w-full text-white">Create</FormSubmit>
          </form>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
};

export default FormPopover;
