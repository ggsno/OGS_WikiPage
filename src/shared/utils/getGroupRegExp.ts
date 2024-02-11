import escapeRegExpKeywords from "./escapeRegExpKeywords";

export default (texts: string[]) =>
  new RegExp("(" + texts.map(escapeRegExpKeywords).join("|") + ")", "g");
