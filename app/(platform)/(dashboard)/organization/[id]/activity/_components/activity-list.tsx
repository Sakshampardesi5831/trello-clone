import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import ActivityItem from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';
import React, { Fragment } from 'react'

const ActivityListPage =async  () => {
  const {orgId}=auth();
  if(!orgId){
    redirect("/select-org")
  }
  const auditLogs=await db.auditLog.findMany({
    where:{
      orgId
    },
  })
  return (
    <Fragment>
        <div className="space-y-3 max-h-96 overflow-y-auto">
            {auditLogs.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">
                        No Activity found inside this organization
                    </p>
                </div>
            ) : (
                auditLogs.map((log)=>(
                    <ActivityItem key={log.id} data={log}/>
                ))
            )}
        </div>
    </Fragment>
  )
}

ActivityListPage.Skeleton=function ActivityListPageSkeleton(){
   return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
        <Skeleton className='w-full h-16'/>
        <Skeleton className='w-full h-16'/>
        <Skeleton className='w-full h-16'/>
        <Skeleton className='w-full h-16'/>
        <Skeleton className='w-full h-16'/>
    </div>
   )
}


export default ActivityListPage