import React, { Fragment, Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import ActivityListPage from "./_components/activity-list";
const ActivityPage = () => {
  return (
    <Fragment>
      <div className="w-full">
        <Info />
        <Separator className="my-2" />
        <Suspense fallback={<ActivityListPage.Skeleton />}>
          <ActivityListPage />
        </Suspense>
      </div>
    </Fragment>
  );
};

export default ActivityPage;
