import routePath from "../../shared/consts/routePath";
import Page from "./Page";
import loader from "./loader";

export default {
  path: routePath["wiki-editor"](),
  loader,
  element: <Page />,
};
