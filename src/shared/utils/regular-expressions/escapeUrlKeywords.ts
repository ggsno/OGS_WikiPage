export default (str: string) =>
  str.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, encodeURIComponent);
