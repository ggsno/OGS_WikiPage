import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import queryClient from "../shared/config/queryClient";
import main from "../pages/main";
import wiki from "../pages/wiki";
import wikiEditor from "../pages/wiki-editor";
import notFound from "../pages/not-found";
import "./styles/global.css";
import ErrorFallback from "./ErrorFallback";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("../../mocks");
  await worker.start();
}

const routes = [
  {
    path: "",
    errorElement: <ErrorFallback />,
    children: [main, wiki, wikiEditor, notFound],
  },
] as RouteObject[];

const rootRouter = createBrowserRouter(routes, { basename: "/" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={rootRouter} />
    </QueryClientProvider>
  </React.StrictMode>
);
