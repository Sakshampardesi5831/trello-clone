"use client";
import React, { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import ActivityItem from "@/components/activity-item";

interface CardActivityProps {
  items?: AuditLog[];
}

const CardActivity = ({ items }: CardActivityProps) => {
  return (
    <Fragment>
      <div className="flex items-start gap-x-3 w-full">
        <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
        <div className="w-full">
          <p className="font-semibold text-neutral-700 mb-2 ">Activity</p>
          <ol className="mt-2 space-y-4">
            {items?.map((item) => (
              <Fragment key={item.id}>
                <ActivityItem data={item} />
              </Fragment>
            ))}
          </ol>
        </div>
      </div>
    </Fragment>
  );
};
CardActivity.Skeleton = function ActivitySkeleton() {
  return (
    <Fragment>
      <div className="flex items-start gap-x-3 w-full">
        <Skeleton className="w-6 h-6 bg-neutral-200" />
        <div className="w-full">
          <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
          <Skeleton className="w-full h-10 bg-neutral-200" />
        </div>
      </div>
    </Fragment>
  );
};
export default CardActivity;
