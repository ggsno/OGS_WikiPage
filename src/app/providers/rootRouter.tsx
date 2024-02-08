import { createBrowserRouter } from "react-router-dom";
import main from "../../pages/main";
import wiki from "../../pages/wiki";
import wikiEditor from "../../pages/wiki-editor";

const routes = [main, wiki, wikiEditor];

const rootRouter = createBrowserRouter(routes, { basename: "/" });

export default rootRouter;
