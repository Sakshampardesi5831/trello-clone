"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSideBar } from "@/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./sidebar";

const MobileSideBar = () => {
  const pathname = usePathname();
  const onOpen = useMobileSideBar((state) => state.onOpen);
  const onClose = useMobileSideBar((state) => state.onClose);
  const isOpen = useMobileSideBar((state) => state.isOpen);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);
  if (!isMounted) {
    return null;
  }
  return (
    <Fragment>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default MobileSideBar;
