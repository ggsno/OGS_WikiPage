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
];

const handlers: HttpHandler[] = [
  http.get("/wikis", async () => {
    return HttpResponse.json(mockWikis);
  }),

  http.get("/wikis/:title", async ({ params }) => {
    const { title } = params;

    const wiki = mockWikis.find((e) => e.title === title);

    if (!wiki)
      return new HttpResponse(
        `해당 제목의 위키를 찾을 수 없습니다. title: [${title}]`,
        { status: 404 }
      );

    return HttpResponse.json(wiki);
  }),
];

export default handlers;
