export default {
  main: "/",
  wiki: (title: string) => `/wiki/${title}`,
  "wiki-editor": (title?: string) =>
    `/wiki-editor${title ? `?title=${title}` : ""}`,
} as const;
