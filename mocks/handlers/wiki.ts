import { http, HttpHandler, HttpResponse } from "msw";
import mockWikis from "../data/mockWikis";

type DictionaryProps = Record<string, string[]>;

class Dictionary {
  private dict: DictionaryProps;

  constructor(contents: Array<{ title: string }>) {
    this.dict = {};

    contents.forEach(({ title }) => {
      this.appendWord(title);
    }, {});
  }

  get copy() {
    return { ...this.dict };
  }

  includesIndex(index: string) {
    return !!this.dict[index];
  }

  includesWord(word: string) {
    const index = word[0];
    if (!this.includesIndex(index)) return false;
    return this.dict[index].includes(word);
  }

  appendWord(word: string) {
    const index = word[0];

    if (this.includesWord(word)) {
      return;
    }

    if (this.includesIndex(index)) {
      this.dict[index] = [...this.dict[index], word].sort(
        (a, b) => b.length - a.length
      );
      return;
    }

    this.dict[index] = [word];
  }

  updateWord(originWord: string, newWord: string) {
    const originIndex = originWord[0];

    const toDeleteIndex = this.dict[originIndex].findIndex(
      (e) => e === originWord
    );
    if (toDeleteIndex === -1) {
      console.error("삭제할 인덱스가 없습니다.");
      return;
    }
    this.dict[originIndex].splice(toDeleteIndex, 1);

    this.appendWord(newWord);
  }
}

const titleDictionary = new Dictionary(mockWikis);

const handlers: HttpHandler[] = [
  http.get("/wikis", async ({ request }) => {
    const ITEM_COUNT_PER_PAGE = 5;
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const maxPage = Math.ceil(mockWikis.length / ITEM_COUNT_PER_PAGE);

    mockWikis.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));

    if (!page || (mockWikis.length === 0 && page === "1"))
      return new HttpResponse(
        JSON.stringify(mockWikis.slice(0, ITEM_COUNT_PER_PAGE)),
        { headers: { "x-total-count": String(mockWikis.length) } }
      );

    if (maxPage < Number(page))
      return new HttpResponse(`잘못된 페이지 번호입니다.`, { status: 400 });

    const startIndex = (Number(page) - 1) * ITEM_COUNT_PER_PAGE;
    const endIndex = startIndex + ITEM_COUNT_PER_PAGE;
    return new HttpResponse(
      JSON.stringify(mockWikis.slice(startIndex, endIndex)),
      {
        headers: {
          "x-total-count": String(mockWikis.length),
        },
      }
    );
  }),

  http.get("/wikis/:title", async ({ params }) => {
    const { title } = params;

    const wiki = mockWikis.find((e) => e.title === title);

    if (!wiki)
      return new HttpResponse(
        `해당 위키를 찾을 수 없습니다. title: [${title}]`,
        {
          status: 404,
        }
      );

    const _containedTitles = wiki.content
      .split("")
      .reduce<string[]>((acc, initial, i) => {
        if (i !== 0 && wiki.content[i - 1] !== " ") return acc;

        if (!titleDictionary.includesIndex(initial)) {
          return acc;
        }
        const comps = titleDictionary.copy[initial];

        const title = comps.find(
          (comp) => comp === wiki.content.slice(i, i + comp.length)
        );

        if (!title) return acc;

        return [...acc, title];
      }, []);

    const containedTitles = [...new Set(_containedTitles)];

    return HttpResponse.json({ ...wiki, containedTitles });
  }),

  http.post<object, { title: string; content: string }>(
    "/wikis",
    async ({ request }) => {
      const { title, content } = await request.json();
      if (titleDictionary.includesWord(title)) {
        return new HttpResponse("이미 존재하는 제목입니다.", { status: 400 });
      }

      const newWiki = {
        id: Date.now() + "",
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockWikis.push(newWiki);
      titleDictionary.appendWord(newWiki.title);

      return new HttpResponse(null, { status: 201 });
    }
  ),

  http.put<object, { id: string; title: string; content: string }>(
    "wikis",
    async ({ request }) => {
      const { id, title, content } = await request.json();

      const index = mockWikis.findIndex((wiki) => wiki.id === id);
      if (index === -1) {
        return new HttpResponse("수정할 위키를 찾지 못했습니다.", {
          status: 404,
        });
      }

      const originWiki = mockWikis[index];

      const isChangedTitle = originWiki.title !== title;

      if (isChangedTitle && titleDictionary.includesWord(title)) {
        return new HttpResponse("이미 존재하는 제목입니다.", { status: 400 });
      }

      titleDictionary.updateWord(originWiki.title, title);
      mockWikis.splice(index, 1, {
        ...originWiki,
        title,
        content,
        updatedAt: new Date(),
      });

      return new HttpResponse(null, { status: 204 });
    }
  ),
];

export default handlers;
