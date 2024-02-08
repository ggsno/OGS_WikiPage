import Page from "./page";
import Layout from "./Layout";

export default {
  path: "/wiki/:title",
  element: (
    <Layout>
      <Page />
    </Layout>
  ),
};
