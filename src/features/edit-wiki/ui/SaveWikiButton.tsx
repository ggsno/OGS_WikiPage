import axios from "axios";
import { WikiProps } from "../../../entities/wiki/type";
import Button from "../../../shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../../shared/consts/routePath";

type Props = {
  wiki: WikiProps;
  isEditMode: boolean;
};

export default function SaveWikiButton({ wiki, isEditMode }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={async (e) => {
          e.preventDefault();
          if (!wiki || wiki.title.length === 0 || wiki.content.length === 0)
            return;
          if (isEditMode) {
            await axios.put("/wikis", wiki);
          } else {
            await axios.post("/wikis", wiki);
          }
          navigate(routePath.wiki(wiki.title));
        }}
      >
        저장
      </Button>
    </>
  );
}
