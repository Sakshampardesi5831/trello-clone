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
        <ol className='space-y-4 mt-4'>
            <p className='hidden last:block text-xs text-center text-muted-foreground '>
                No Activity found inside this organization
            </p>
            {auditLogs.map((log)=>(
                <ActivityItem key={log.id} data={log}/>
            ))}
        </ol>
    </Fragment>
  )
}

ActivityListPage.Skeleton=function ActivityListPageSkeleton(){
   return (
    <ol className='space-y-4 mt-4'>
        <Skeleton className='w-[80%] h-14'/>
        <Skeleton className='w-[50%] h-14'/>
        <Skeleton className='w-[70%] h-14'/>
        <Skeleton className='w-[60%] h-14'/>
        <Skeleton className='w-[75%] h-14'/>
    </ol>
   )
}


export default ActivityListPage