import Page from "./page";
import loader from "./loader";
import Layout from "./Layout";

export default {
  path: "/wiki-editor",
  loader,
  element: (
    <Layout>
      <Page />
    </Layout>
  ),
};
