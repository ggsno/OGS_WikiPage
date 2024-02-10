import { WikiProps } from "../../src/entities/wiki/type";

const mockWikis = [
  {
    id: "1",
    title: "웹",
    content: `웹은 "World Wide Web"의 줄임말로, 전 세계적으로 분산된 컴퓨터 네트워크를 통해 접근할 수 있는 정보의 공간을 나타냅니다. 웹은 여러 웹 페이지, 문서, 이미지, 비디오 등을 포함하며, 사용자는 웹 브라우저를 통해 이러한 자료에 접근하고 상호 작용할 수 있습니다.\n\n웹은 다양한 기술과 프로토콜을 사용하여 구성됩니다. 여기에는 다음과 같은 주요 구성 요소가 포함됩니다:\n\n1. '웹 브라우저': 사용자는 웹 브라우저를 통해 웹에 접근합니다. 대표적인 브라우저로는 Google Chrome, Mozilla Firefox, Microsoft Edge, Safari 등이 있습니다.\n\n2. '웹 서버': 웹 서버는 웹 페이지 및 기타 자료를 저장하고 클라이언트(웹 브라우저)에게 제공하는 역할을 합니다. Apache, Nginx, Microsoft IIS 등이 일반적으로 사용되는 웹 서버 소프트웨어입니다.\n\n3. 'URL(Uniform Resource Locator)': 웹에서 특정 자원의 위치를 지정하는 주소 체계입니다. 예를 들어, 'https://www.example.com'는 해당 웹 사이트의 주소입니다.\n\n4. 'HTML(HyperText Markup Language)': 웹 페이지의 기본 구조를 정의하는 마크업 언어입니다. HTML은 웹 문서의 구조적 요소를 표현하며, 하이퍼링크, 이미지, 텍스트 등을 포함할 수 있습니다.\n\n5. 'CSS(Cascading Style Sheets)': 웹 페이지의 디자인과 스타일을 정의하는 스타일 시트 언어입니다. CSS는 HTML 요소의 레이아웃, 색상, 글꼴 등을 꾸며줍니다.\n\n6. 'JavaScript': 클라이언트 측 웹 프로그래밍 언어로, 웹 페이지의 동적인 요소와 상호 작용을 담당합니다. JavaScript를 사용하면 사용자와 웹 페이지 간에 동적인 경험을 제공할 수 있습니다.\n\n7. 'HTTP(HyperText Transfer Protocol)': 클라이언트와 서버 간에 정보를 전송하기 위한 통신 규약입니다. 대부분의 웹 트래픽은 HTTP 또는 HTTPS(암호화된 HTTP)를 사용하여 이루어집니다.\n\n웹은 정보를 쉽게 공유하고 액세스할 수 있는 열린 플랫폼으로, 전 세계적으로 연결된 사용자들에게 다양한 형태의 콘텐츠를 제공합니다. 웹 기술은 지속적으로 발전하며 새로운 기능과 향상된 사용자 경험을 위한 다양한 도구와 기술이 도입되고 있습니다.`,
    createdAt: new Date(1),
    updatedAt: new Date(1),
  },
  {
    id: "2",
    title: "JavaScript",
    content:
      "JavaScript는 주로 웹 페이지에서 동적인 요소를 추가하고 상호 작용을 구현하기 위한 프로그래밍 언어입니다. 이 언어는 브라우저에서 클라이언트 측 스크립팅에 주로 사용되지만, 서버 측에서도 사용될 수 있습니다. JavaScript를 사용하면 사용자와 웹 페이지 간의 상호 작용을 향상시키고 동적으로 내용을 변경할 수 있습니다.\n\nJavaScript의 주요 특징과 용도는 다음과 같습니다:\n\n1. 클라이언트 측 스크립팅: 주로 웹 브라우저에서 실행되며, HTML 및 CSS와 함께 사용하여 동적인 웹 페이지를 만들고 사용자 인터페이스를 조작합니다.\n\n2. 이벤트 기반: JavaScript는 이벤트 기반 언어로, 사용자의 행동에 따라 반응하거나 특정 이벤트를 처리할 수 있습니다. 이를 통해 웹 페이지는 동적이고 사용자 친화적인 경험을 제공할 수 있습니다.\n\n3. 객체 지향 프로그래밍: JavaScript는 객체 지향 프로그래밍 언어로서, 데이터를 객체로 캡슐화하고 객체 간의 상호 작용을 통해 프로그램을 구성합니다.\n\n4. 가변적인 타입: JavaScript는 동적으로 타입이 결정되는 언어로, 변수의 데이터 타입이 실행 중에 결정됩니다.\n\n5. 서버 측 개발: Node.js라는 환경을 사용하여 JavaScript를 서버 측에서 실행할 수 있습니다. 이로써 전체 웹 애플리케이션 스택을 JavaScript로 작성할 수 있게 되었습니다.\n\nJavaScript는 현재 웹 개발에서 필수적이며, 다양한 라이브러리와 프레임워크(jQuery, React, Angular, Vue 등)를 통해 더 효과적인 웹 애플리케이션 개발이 가능합니다.",
    createdAt: new Date(2),
    updatedAt: new Date(2),
  },
  {
    id: "3",
    title: "this",
    content:
      "JavaScript에서 함수의 this 키워드는 다른 언어와 조금 다르게 동작합니다.\n또한 엄격 모드와 비엄격 모드에서도 일부 차이가 있습니다.\n대부분의 경우 this의 값은 함수를 호출한 방법에 의해 결정됩니다.\n실행중에는 할당으로 설정할 수 없고 함수를 호출할 때 마다 다를 수 있습니다.\nES5는 함수를 어떻게 호출했는지 상관하지 않고 this 값을 설정할 수 있는 bind 메서드를 도입했고, ES2015는 스스로의 this 바인딩을 제공하지 않는 화살표 함수를 추가했습니다(이는 렉시컬 컨텍스트안의 this값을 유지합니다).",
    createdAt: new Date(3),
    updatedAt: new Date(3),
  },
  {
    id: "4",
    title: "바인딩",
    content:
      '프로그래밍 관점에서, 바인딩(Binding)은 값과 식별자 사이의 연관 관계를 의미합니다.\n모든 바인딩이 변수인 것은 아닙니다.\n예를 들어, 함수 매개변수 및 catch (e) (en-US) 코드 블록은 엄격하게 "변수"가 아닙니다.\n또한, 일부 바인딩은 언어에 의해 암시적으로 생성됩니다.\n예를 들어, JavaScript에서의 this와 new.target를 들 수 있습니다.\n',
    createdAt: new Date(4),
    updatedAt: new Date(4),
  },
  {
    id: "5",
    title: "화살표 함수",
    content:
      "화살표 함수 표현식(화살표 함수 expression)은 함수 표현식에 대한 간결한 대안으로, 약간의 의미적 차이와 의도적인 사용상의 제한을 가지고 있습니다.\n화살표 함수에는 자체 바인딩이 this에 없으며, 인수 또는 super로 사용해야 하며, 메서드로 사용하면 안 됩니다.\n화살표 함수는 생성자로 사용할 수 없습니다.\nnew로 호출하면 TypeError가 반환됩니다.\nnew.target 키워드에 대한 액세스 권한도 없습니다.\n화살표 함수는 함수 내부에서 yield를 사용할 수 없으며 제너레이터 함수로 생성할 수 없습니다.\n",
    createdAt: new Date(5),
    updatedAt: new Date(5),
  },
  {
    id: "6",
    title: "엄격 모드",
    content:
      'ECMAScript 5 에서 소개된 JavaScript 의 엄격모드는 JavaScript 의 제한된 버전을 선택하여 암묵적인 "느슨한 모드(sloppy mode)" 를 해제하기 위한 방법입니다.\n엄격 모드는 단지 부분적인 것이 아니며, 이것은 고의적으로 일반 코드와 다른 시멘틱을 가지고 있습니다.\n엄격모드를 지원하지 않는 브라우저에서는 엄격 모드의 코드가 다른 방식으로 동작할 것입니다, 그 때문에 엄격 모드가 적절하게 적용된 피쳐 테스트 없이 엄격 모드에 의존하면 안됩니다.\n엄격 모드의 코드와 비엄격 모드의 코드는 공존할 수 있으며, 때문에 스크립트의 엄격 모드를 취사 선택하는 것이 점진적으로 가능하게 되었습니다.\n',
    createdAt: new Date(6),
    updatedAt: new Date(6),
  },
  {
    id: "7",
    title: "비엄격 모드",
    content:
      "비엄격 모드란 엄격 모드가 아닌 경우를 말하며, 일부 덜 엄격한 규칙을 따르는 상태입니다.\n이 모드에서는 더 많은 유연성이 허용되기 때문에 일부 오류가 무시되거나 허용될 수 있습니다. ",
    createdAt: new Date(7),
    updatedAt: new Date(7),
  },
] as Omit<WikiProps, "containedTitles">[];

/* 주석을 해제하고 다수의 데이터 넣기
Array(50)
  .fill(0)
  .forEach((_, i) =>
    mockWikis.push({
      id: new Date(i) + "",
      title: `test${i}`,
      content: `Content${i}`,
      createdAt: new Date(i),
      updatedAt: new Date(i),
    })
  );
*/

export default mockWikis;
