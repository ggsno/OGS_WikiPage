import { Link } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import { routePath } from "../../../shared/consts/routePath";

export default function CreateWikiLink() {
  return (
    <>
      <Link to={routePath["wiki-editor"]()}>
        <Button>위키 작성하기</Button>
      </Link>
    </>
  );
}
