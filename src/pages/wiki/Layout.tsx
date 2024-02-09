import { ReactNode } from "react";
import Header from "../../widgets/header/ui/Header";
import FlexCenterContainer from "../../shared/ui/FlexCenterContainer";
import EditWikiLink from "../../features/edit-wiki/ui/EditWikiLink";
import { useParams } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  const pathParam = useParams();
  const title = pathParam["title"] as string;

  return (
    <>
      <FlexCenterContainer>
        <Header MenuComponent={<EditWikiLink title={title} />} />
        {children}
      </FlexCenterContainer>
    </>
  );
}
