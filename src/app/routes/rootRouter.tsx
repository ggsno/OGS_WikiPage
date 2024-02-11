import { RouteObject, createBrowserRouter } from "react-router-dom";
import main from "../../pages/main";
import wiki from "../../pages/wiki";
import wikiEditor from "../../pages/wiki-editor";
import notFound from "../../pages/not-found";
import ErrorFallback from "./ErrorFallback";

const routes = [
  {
    path: "",
    errorElement: <ErrorFallback />,
    children: [main, wiki, wikiEditor, notFound],
  },
] as RouteObject[];

const rootRouter = createBrowserRouter(routes, { basename: "/" });

export default rootRouter;
