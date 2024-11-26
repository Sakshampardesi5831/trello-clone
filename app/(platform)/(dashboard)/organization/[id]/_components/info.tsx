"use client";
import React, { Fragment } from "react";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
const Info = () => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <Info.Skeleton />;
  }
  return (
    <Fragment>
      <div className="flex items-center gap-x-4">
        <div className="w-[60px] h-[60px] relative">
          <Image fill src={organization?.imageUrl!} alt="logo" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-xl">{organization?.name}</p>
          <div className="flex items-center text-sm">
            <CreditCard className=" mr-1" />
            Free
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-[200px] h-4" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};

export default Info;
