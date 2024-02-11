import { Link } from "react-router-dom";
import FlexCenterContainer from "../../shared/ui/FlexCenterContainer";
import routePath from "../../shared/consts/routePath";
import Button from "../../shared/ui/Button";

export default function Page() {
  return (
    <>
      <FlexCenterContainer>
        <div
          className="flex flex-col gap-4 justify-center items-center
          w-full h-[50vh]"
        >
          <p>페이지를 찾을 수 없습니다.</p>
          <Link to={routePath.main}>
            <Button>메인으로 돌아가기</Button>
          </Link>
        </div>
      </FlexCenterContainer>
    </>
  );
}
