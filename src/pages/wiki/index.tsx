import { routePath } from "../../shared/consts/routePath";
import Page from "./Page";
import loader from "./loader";

export default {
  path: routePath.wiki(":title"),
  loader,
  element: <Page />,
};
