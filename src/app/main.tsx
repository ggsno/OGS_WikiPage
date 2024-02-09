import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import queryClient from "../shared/tanstack-query/queryClient";
import "./styles/global.css";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("../mocks");
  await worker.start();
}

const rootRouter = (await import("./providers/rootRouter")).default;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={rootRouter} />
    </QueryClientProvider>
  </React.StrictMode>
);
