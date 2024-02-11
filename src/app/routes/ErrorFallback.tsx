import { Link, useRouteError } from "react-router-dom";
import { AxiosError } from "axios";
import FullScreenContainer from "../../shared/ui/FullScreenContainer";
import Button from "../../shared/ui/Button";
import routePath from "../../shared/consts/routePath";

export default function ErrorFallback() {
  const error = useRouteError();

  const errorMessage =
    (error instanceof AxiosError && error.response?.data) ??
    "알 수 없는 오류입니다.";

  return (
    <>
      <FullScreenContainer>
        <p>{errorMessage}</p>
        <Link to={routePath.main}>
          <Button>메인으로 돌아가기</Button>
        </Link>
      </FullScreenContainer>
    </>
  );
}
