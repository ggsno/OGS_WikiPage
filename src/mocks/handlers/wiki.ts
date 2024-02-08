import { http, HttpHandler, HttpResponse } from "msw";

const mockWikis = [
  {
    id: "1",
    title: "this",
    content:
      "JavaScript에서 함수의 this 키워드는 다른 언어와 조금 다르게 동작합니다. 또한 엄격 모드와 비엄격 모드에서도 일부 차이가 있습니다. 대부분의 경우 this의 값은 함수를 호출한 방법에 의해 결정됩니다. 실행중에는 할당으로 설정할 수 없고 함수를 호출할 때 마다 다를 수 있습니다. ES5는 함수를 어떻게 호출했는지 상관하지 않고 this 값을 설정할 수 있는 bind 메서드를 도입했고, ES2015는 스스로의 this 바인딩을 제공하지 않는 화살표 함수를 추가했습니다(이는 렉시컬 컨텍스트안의 this값을 유지합니다).",
  },
  {
    id: "2",
    title: "엄격 모드",
    content:
      'ECMAScript 5 에서 소개된 JavaScript 의 엄격모드는 JavaScript 의 제한된 버전을 선택하여 암묵적인 "느슨한 모드(sloppy mode)" 를 해제하기 위한 방법입니다. 엄격 모드는 단지 부분적인 것이 아니며, 이것은 고의적으로 일반 코드와 다른 시멘틱을 가지고 있습니다. 엄격모드를 지원하지 않는 브라우저에서는 엄격 모드의 코드가 다른 방식으로 동작할 것입니다, 그 때문에 엄격 모드가 적절하게 적용된 피쳐 테스트 없이 엄격 모드에 의존하면 안됩니다. 엄격 모드의 코드와 비-엄격 모드의 코드는 공존할 수 있으며, 때문에 스크립트의 엄격 모드를 취사 선택하는 것이 점진적으로 가능하게 되었습니다.',
  },
  {
    id: "3",
    title: "화살표 함수",
    content:
      "화살표 함수 표현식(화살표 함수 expression)은 함수 표현식에 대한 간결한 대안으로, 약간의 의미적 차이와 의도적인 사용상의 제한을 가지고 있습니다. 화살표 함수에는 자체 바인딩이 this에 없으며, 인수 또는 super로 사용해야 하며, 메서드로 사용하면 안 됩니다. 화살표 함수는 생성자로 사용할 수 없습니다. new로 호출하면 TypeError가 반환됩니다. new.target 키워드에 대한 액세스 권한도 없습니다. 화살표 함수는 함수 내부에서 yield를 사용할 수 없으며 제너레이터 함수로 생성할 수 없습니다.",
  },
  {
    id: "4",
    title: "바인딩",
    content:
      '프로그래밍 관점에서, 바인딩(Binding)은 값과 식별자 사이의 연관 관계를 의미합니다. 모든 바인딩이 변수인 것은 아닙니다. 예를 들어, 함수 매개변수 및 catch (e) (en-US) 코드 블록은 엄격하게 "변수"가 아닙니다. 또한, 일부 바인딩은 언어에 의해 암시적으로 생성됩니다. 예를 들어, JavaScript에서의 this와 new.target를 들 수 있습니다.',
  },
  {
    id: "5",
    title: "React 기초",
    content:
      "React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리로, 페이스북에서 개발했습니다. 가상 DOM을 사용하여 성능을 향상시키고, 컴포넌트 기반 아키텍처를 채택하여 모듈화와 재사용성을 높입니다.",
  },
  {
    id: "6",
    title: "Vue.js 소개",
    content:
      "Vue.js는 진보적인 JavaScript 프레임워크로, 가볍고 유연한 생태계를 제공합니다. MVVM 아키텍처를 기반으로 하며, 단일 파일 컴포넌트로 구조화된 프로젝트를 쉽게 작성할 수 있습니다.",
  },
  {
    id: "7",
    title: "웹 애니메이션 효과",
    content:
      "웹 애니메이션은 사용자 경험을 향상시키는 데 핵심적인 역할을 합니다. CSS와 JavaScript를 사용하여 다양한 효과를 적용할 수 있으며, 라이브러리나 프레임워크를 활용하여 더욱 효율적으로 구현할 수 있습니다.",
  },
  {
    id: "8",
    title: "Responsiveness",
    content:
      "반응형 웹 디자인은 다양한 디바이스와 화면 크기에 대응하여 웹 애플리케이션을 구축하는 중요한 측면입니다. 미디어 쿼리와 Flexbox, Grid 등을 사용하여 다양한 화면에 대응하는 방법을 학습할 수 있습니다.",
  },
  {
    id: "9",
    title: "모바일 앱 개발",
    content:
      "프론트엔드 개발에서는 웹 앱 뿐만 아니라 네이티브 모바일 앱도 개발할 수 있습니다. React Native나 Flutter와 같은 기술을 사용하여 효율적으로 크로스 플랫폼 앱을 제작할 수 있습니다.",
  },
  {
    id: "10",
    title: "웹 보안",
    content:
      "웹 애플리케이션 보안은 매우 중요한 주제입니다. 사용자 데이터 보호, 인증 및 권한 관리, HTTPS 사용 등을 통해 안전한 웹 앱을 구축하는 방법을 학습할 수 있습니다.",
  },
  {
    id: "11",
    title: "현대적인 빌드 도구",
    content:
      "Webpack, Babel과 같은 현대적인 빌드 도구를 사용하면 프론트엔드 프로젝트의 효율성을 향상시킬 수 있습니다. 코드 번들링, 트랜스파일링, 모듈 번들링 등의 작업을 자동화할 수 있습니다.",
  },
  {
    id: "12",
    title: "웹 컴포넌트",
    content:
      "웹 컴포넌트는 재사용 가능한 사용자 정의 요소로, Shadow DOM과 HTML 템플릿, Custom Elements 등을 활용하여 독립적이고 확장 가능한 컴포넌트를 작성할 수 있습니다.",
  },
  {
    id: "13",
    title: "GraphQL 쿼리 언어",
    content:
      "GraphQL은 데이터를 효율적으로 요청하고 응답할 수 있는 쿼리 언어입니다. REST API 대신 사용하여 필요한 데이터만 요청할 수 있으며, 클라이언트 측에서 원하는 구조로 데이터를 가져올 수 있습니다.",
  },
  {
    id: "14",
    title: "상태 관리",
    content:
      "대규모 웹 애플리케이션에서는 상태 관리가 핵심입니다. Redux, MobX 등의 상태 관리 라이브러리를 사용하여 애플리케이션의 상태를 효과적으로 관리할 수 있습니다.",
  },
  {
    id: "15",
    title: "웹 성능 최적화",
    content:
      "웹 성능 최적화는 사용자 경험을 향상시키는 데 중요한 역할을 합니다. 이미지 최적화, 코드 번들 최소화, 렌더링 최적화 등을 통해 웹 앱의 성능을 향상시킬 수 있습니다.",
  },
  {
    id: "16",
    title: "웹 접근성",
    content:
      "웹 접근성은 모든 사용자가 웹 콘텐츠에 동등하게 접근할 수 있도록 하는 것입니다. HTML의 시맨틱 마크업, ARIA 속성, 키보드 네비게이션 등을 통해 웹 앱을 접근성 있게 개발하는 방법을 익힐 수 있습니다.",
  },
];

type Dictionary = { [key: string]: string[] };

const titleDictionary = (() => {
  const hasIndex = (dictionary: Dictionary, index: string) => {
    return dictionary[index];
  };

  const isDuplicated = (dictionary: Dictionary, newWord: string) => {
    const index = newWord[0];
    if (!hasIndex(dictionary, index)) return false;
    return dictionary[index].includes(newWord);
  };

  const addNewTitle = (dictionary: Dictionary, newWord: string) => {
    const index = newWord[0];

    if (isDuplicated(dictionary, newWord)) {
      return dictionary;
    }

    if (hasIndex(dictionary, index)) {
      return {
        ...dictionary,
        [index]: [...dictionary[index], newWord].sort(
          (a, b) => b.length - a.length
        ),
      };
    }

    return { ...dictionary, [index]: [newWord] };
  };

  let dict = mockWikis.reduce<Dictionary>((acc, { title }) => {
    return addNewTitle(acc, title);
  }, {});

  const getDict = () => ({ ...dict });

  const setNewTitle = (newTitle: string) =>
    (dict = addNewTitle(dict, newTitle));

  return {
    getDict,
    setNewTitle,
  };
})();

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

    const dict = titleDictionary.getDict();

    const titles = wiki.content.split("").reduce<string[]>((acc, cur, i) => {
      if (i !== 0 && wiki.content[i - 1] !== " ") return acc;

      const comps = dict[cur];

      if (!comps) return acc;

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
      if (mockWikis.some((wiki) => wiki.title === title)) {
        return new HttpResponse("이미 존재하는 제목입니다.", { status: 400 });
      }

      const newWiki = {
        id: String(Number(mockWikis[mockWikis.length - 1].id) + 1),
        title,
        content,
      };

      mockWikis.unshift(newWiki);
      titleDictionary.setNewTitle(newWiki.title);

      return new HttpResponse(null, { status: 201 });
    }
  ),

  http.put<object, { id: string; title: string; content: string }>(
    "wikis",
    async ({ request }) => {
      const { id, title, content } = await request.json();
      const index = mockWikis.findIndex((wiki) => wiki.id === id);
      if (index === -1) {
        return new HttpResponse("존재하지 않는 위키입니다.", { status: 400 });
      }

      mockWikis.splice(index, 1, { id, title, content });
      return new HttpResponse(null, { status: 204 });
    }
  ),
];

export default handlers;
