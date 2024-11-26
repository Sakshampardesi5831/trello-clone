"use client";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";
const OrganizationControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();
  useEffect(() => {
    if (!setActive) return;
    setActive({
      organization: params.id as string,
    });
  }, [setActive, params.id]);
  return null;
};

export default OrganizationControl;
