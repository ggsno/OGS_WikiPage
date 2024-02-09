import { routePath } from "../../shared/consts/routePath";
import Page from "./Page";

export default {
  path: routePath.wiki(":title"),
  element: <Page />,
};
