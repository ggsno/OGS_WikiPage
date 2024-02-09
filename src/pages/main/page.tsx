import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../widgets/header/ui/Header";
import CreateWikiLink from "../../features/create-wiki/ui/CreateWikiLink";
import WikiTable from "../../features/get-wiki/ui/WikiTable";
import FlexCenterContainer from "../../shared/ui/FlexCenterContainer";
import AsyncBoundary from "../../shared/async-boundary/AsyncBoundary";
import { routePath } from "../../shared/consts/routePath";

export default function Page() {
  const [serachParams, setSerachParams] = useSearchParams();
  const page = Number(serachParams.get("page") ?? "1");
  const navigate = useNavigate();

  return (
    <>
      <FlexCenterContainer>
        <Header MenuComponent={<CreateWikiLink />} />
        <AsyncBoundary>
          <WikiTable
            page={page}
            setPage={(newPage) => setSerachParams({ page: String(newPage) })}
            handleClickRow={(title) => navigate(routePath.wiki(title))}
          />
        </AsyncBoundary>
      </FlexCenterContainer>
    </>
  );
}
