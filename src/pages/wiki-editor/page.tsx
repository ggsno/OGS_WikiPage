import { useLoaderData, useNavigate } from "react-router-dom";
import { WikiProps } from "../../entities/wiki/type";
import { useState } from "react";
import axios from "axios";

const Page = () => {
  const loadedWiki = useLoaderData() as WikiProps | null;
  const [wiki, setWiki] = useState<WikiProps>(
    loadedWiki ?? {
      id: "",
      title: "",
      content: "",
    }
  );
  const isEditMode = !!loadedWiki;
  const navigate = useNavigate();

  return (
    <>
      <form>
        <div>
          <input
            type="text"
            placeholder="위키 제목"
            onChange={(e) => {
              setWiki({ ...wiki, title: e.target.value });
            }}
            value={wiki.title}
          />
        </div>
        <div>
          <textarea
            placeholder="위키를 작성해주세요!"
            rows={10}
            cols={100}
            onChange={(e) => {
              setWiki({ ...wiki, content: e.target.value });
            }}
            value={wiki.content}
          />
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault();
            if (!wiki || wiki.title.length === 0 || wiki.content.length === 0)
              return;
            if (isEditMode) {
              await axios.put("/wikis", wiki);
            } else {
              await axios.post("/wikis", wiki);
            }
            navigate(`/wiki/${wiki.title}`);
          }}
        >
          저장
        </button>
      </form>
    </>
  );
};

export default Page;
