import { createBrowserRouter } from "react-router-dom";
import main from "../../pages/main";
import wiki from "../../pages/wiki";

const routes = [main, wiki];

const rootRouter = createBrowserRouter(routes, { basename: "/" });

export default rootRouter;
