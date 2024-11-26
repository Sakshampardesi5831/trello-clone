import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { Fragment } from "react";

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

const Hint = ({
  children,
  description,
  side = "bottom",
  sideOffset: sideOffset = 0,
}: HintProps) => {
  return (
    <Fragment>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side={side} sideOffset={sideOffset}>
            {description}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Fragment>
  );
};

export default Hint;
