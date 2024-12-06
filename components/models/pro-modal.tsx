"use client";

import { useProModel } from "@/hooks/use-pro-model";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import React, { Fragment } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
const ProModel = () => {
  const proModel = useProModel();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });
  const onClick = () => {
    // execute({});
    toast.error("Payment Gateway is in progress");
  };
  return (
    <Fragment>
      <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <div className="aspect-video relative flex items-center justify-center">
            <Image src="/Capture.PNG" alt="pro" fill />
          </div>
          <div className="text-neutral-700 mx-auto space-y-6 p-6">
            <h2>Upgrade to Taskify Pro Today</h2>
            <p className="text-xs font-semibold text-neutral-600">
              Explore the best of Taskify
            </p>
            <div className="pl-3">
              <ul className="text-sm list-disc">
                <li>Unlimited boards</li>
                <li>Advance checklists</li>
                <li>Admin and security features</li>
                <li>And More !</li>
              </ul>
            </div>
            <Button
              disabled={isLoading}
              onClick={onClick}
              className="w-full text-white"
              variant="primary"
            >
              Upgrade
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default ProModel;
