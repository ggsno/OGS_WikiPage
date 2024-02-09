import { Link } from "react-router-dom";
import Button from "../../../shared/ui/Button";

export default function EditWikiLink({ title }: { title: string }) {
  return (
    <>
      <Link to={`/wiki-editor?title=${title}`}>
        <Button variant="sub">수정</Button>
      </Link>
    </>
  );
}
