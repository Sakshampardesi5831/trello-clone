"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { Fragment } from "react";
import { useCardModel } from "@/hooks/use-card-model";
import { useQuery } from "@tanstack/react-query";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import CardHeader from "./header";
import CardDescription from "./description";
import CardActions from "./actions";
import { AuditLog } from "@prisma/client";
import CardActivity from "./activity";
const CardModel = () => {
  const id = useCardModel((state) => state.id);
  const isOpen = useCardModel((state) => state.isOpen);
  const onClose = useCardModel((state) => state.onClose);
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });
  return (
    <Fragment>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          {!cardData ? <CardHeader.Skeleton /> : <CardHeader data={cardData} />}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
            <div className="col-span-3">
              <div className="w-full space-y-6">
                {!cardData ? (
                  <CardDescription.Skeleton />
                ) : (
                  <CardDescription data={cardData} />
                )}
                {!auditLogsData ? (
                  <CardActivity.Skeleton />
                ) : (
                  <CardActivity items={auditLogsData} />
                )}
              </div>
            </div>
            {!cardData ? (
              <CardActions.Skeleton />
            ) : (
              <CardActions data={cardData} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CardModel;
