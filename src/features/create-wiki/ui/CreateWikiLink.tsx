import { Link } from "react-router-dom";
import Button from "../../../shared/ui/Button";

export default function CreateWikiLink() {
  return (
    <>
      <Link to="/wiki-editor">
        <Button>위키 작성하기</Button>
      </Link>
    </>
  );
}
