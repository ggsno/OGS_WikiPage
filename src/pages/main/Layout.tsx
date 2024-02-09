import { ReactNode } from "react";
import Header from "../../widgets/header/ui/Header";
import FlexCenterContainer from "../../shared/ui/FlexCenterContainer";
import CreateWikiLink from "../../features/create-wiki/ui/CreateWikiLink";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <FlexCenterContainer>
        <Header MenuComponent={<CreateWikiLink />} />
        {children}
      </FlexCenterContainer>
    </>
  );
}
