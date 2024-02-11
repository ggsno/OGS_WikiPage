import { Fragment, ReactNode } from "react";

type Props = {
  wholeText: string;
  regExp: RegExp;
  replacedRender: (match: string) => ReactNode;
};

export default function ReplaceMatches(props: Props) {
  const { wholeText, regExp, replacedRender } = props;

  return wholeText
    .split(regExp)
    .map((text, index) => (
      <Fragment key={text + index}>
        {index % 2 === 0 ? text : replacedRender(text)}
      </Fragment>
    ));
}
