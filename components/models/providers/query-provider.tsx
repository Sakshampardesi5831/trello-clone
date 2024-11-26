"use client";
import React from "react";
import { Fragment, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Fragment>
  );
};

export default QueryProvider;
