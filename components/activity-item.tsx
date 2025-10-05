import { AuditLog } from "@prisma/client";
import {format} from 'date-fns'
import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { Fragment } from "react";
interface ActivityItemProps {
  data: AuditLog;
}
const ActivityItem = ({ data }: ActivityItemProps) => {
  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'UPDATE':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'DELETE':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Fragment>
      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={data.userImage} />
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-900 truncate">
              {data.userName}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full border ${getActionColor(data.action)}`}>
              {data.action}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1 truncate">
            {generateLogMessage(data)}
          </p>
          <p className="text-xs text-gray-500">
            {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default ActivityItem;
