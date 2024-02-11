import { RouteProps } from "react-router-dom";
import routePath from "../../shared/consts/routePath";
import Page from "./Page";
import loader from "./loader";

export default {
  path: routePath.main,
  loader,
  element: <Page />,
} as RouteProps;
