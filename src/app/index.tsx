import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import queryClient from "../shared/tanstack-query/queryClient";
import rootRouter from "./providers/rootRouter";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={rootRouter} />
      </QueryClientProvider>
    </>
  );
}

export default App;
