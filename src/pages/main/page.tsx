import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../widgets/header/ui/Header";
import WikiList from "../../features/get-wiki/ui/WikiList";
import FlexCenterContainer from "../../shared/ui/FlexCenterContainer";
import AsyncBoundary from "../../shared/async-boundary/AsyncBoundary";
import { routePath } from "../../shared/consts/routePath";
import Button from "../../shared/ui/Button";

export default function Page() {
  const [serachParams, setSerachParams] = useSearchParams();
  const page = Number(serachParams.get("page") ?? "1");
  const navigate = useNavigate();

  return (
    <>
      <FlexCenterContainer>
        <Header
          MenuComponent={
            <Link to={routePath["wiki-editor"]()}>
              <Button>위키 작성하기</Button>
            </Link>
          }
        />
        <AsyncBoundary>
          <WikiList
            page={page}
            setPage={(newPage) => setSerachParams({ page: String(newPage) })}
            handleClickRow={(title) => navigate(routePath.wiki(title))}
          />
        </AsyncBoundary>
      </FlexCenterContainer>
    </>
  );
}
