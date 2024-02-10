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

    if (!page)
      return new HttpResponse(
        JSON.stringify(mockWikis.slice(0, ITEM_COUNT_PER_PAGE)),
        { headers: { "x-total-count": String(mockWikis.length) } }
      );

    if (maxPage < Number(page))
      return new HttpResponse(`찾을 수 없는 페이지입니다.`, { status: 404 });

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
        `해당 제목의 위키를 찾을 수 없습니다. title: [${title}]`,
        { status: 404 }
      );

    const titles = wiki.content
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

    return HttpResponse.json({ ...wiki, containedTitles: titles });
  }),

  http.post<object, { title: string; content: string }>(
    "/wikis",
    async ({ request }) => {
      const { title, content } = await request.json();
      if (titleDictionary.includesWord(title)) {
        return new HttpResponse("이미 존재하는 제목입니다.", { status: 400 });
      }

      const newWiki = {
        id: String(Number(mockWikis[0].id) + 1),
        title,
        content,
      };

      mockWikis.unshift(newWiki);
      titleDictionary.appendWord(newWiki.title);

      return new HttpResponse(null, { status: 201 });
    }
  ),

  http.put<object, { id: string; title: string; content: string }>(
    "wikis",
    async ({ request }) => {
      const { id, title, content } = await request.json();

      if (titleDictionary.includesWord(title)) {
        return new HttpResponse("이미 존재하는 제목입니다.", { status: 400 });
      }

      const index = mockWikis.findIndex((wiki) => wiki.id === id);
      if (index === -1) {
        return new HttpResponse("존재하지 않는 위키입니다.", { status: 400 });
      }

      titleDictionary.updateWord(mockWikis[index].title, title);
      mockWikis.splice(index, 1, { id, title, content });
      return new HttpResponse(null, { status: 204 });
    }
  ),
];

export default handlers;
