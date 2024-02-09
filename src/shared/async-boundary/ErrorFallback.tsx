import { FallbackProps } from "react-error-boundary";
import Button from "../ui/Button";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  // TODO: 에러 원인에 따라 처리 후 아래의 임시로 넣은 콘솔로그 지우기
  console.log(error);
  return (
    <>
      <div>요청에 실패했습니다.</div>
      <Button variant="sub" onClick={() => resetErrorBoundary()}>
        재시도
      </Button>
    </>
  );
}
