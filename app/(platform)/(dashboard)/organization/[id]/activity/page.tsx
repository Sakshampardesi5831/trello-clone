import React, { Fragment, Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import ActivityListPage from "./_components/activity-list";
const ActivityPage = () => {
  return (
    <Fragment>
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold">Activity Feed</h1>
            </div>
            <p className="text-muted-foreground">
              Track all activities and changes across your organization
            </p>
          </div>

          <Separator />

          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
              <Suspense fallback={<ActivityListPage.Skeleton />}>
                <ActivityListPage />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ActivityPage;
