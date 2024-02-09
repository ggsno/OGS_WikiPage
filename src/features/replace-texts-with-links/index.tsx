import { Link } from "react-router-dom";
import { routePath } from "../../shared/consts/routePath";

type Props = { wholeText: string; targetTexts: string[]; except: string };

export default function ReplaceTextsWithLinks({
  wholeText,
  targetTexts,
  except,
}: Props) {
  const regexPattern = new RegExp(
    targetTexts
      .map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    "g"
  );

  return wholeText.split(regexPattern).flatMap((part, index, array) => {
    if (index < array.length - 1) {
      const matchedString = regexPattern.exec(wholeText)![0];
      if (except === matchedString) return [part, matchedString];
      return [
        part,
        <Link
          to={routePath.wiki(matchedString)}
          className="text-blue-600 hover:underline"
        >
          {matchedString}
        </Link>,
      ];
    }
    return [part];
  });
}
