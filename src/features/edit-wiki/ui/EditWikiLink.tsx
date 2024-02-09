import { Link } from "react-router-dom";
import Button from "../../../shared/ui/Button";
import { routePath } from "../../../shared/consts/routePath";

export default function EditWikiLink({ title }: { title: string }) {
  return (
    <>
      <Link to={routePath["wiki-editor"](title)}>
        <Button variant="sub">수정</Button>
      </Link>
    </>
  );
}
