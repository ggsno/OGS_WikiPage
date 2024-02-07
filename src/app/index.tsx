import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { quertClient } from "./react-query";
import rootRouter from "./router/rootRouter";

function App() {
  return (
    <>
      <QueryClientProvider client={quertClient}>
        <RouterProvider router={rootRouter} />
      </QueryClientProvider>
    </>
  );
}

export default App;
