export default {
  wikis: (page: number) => `/wikis?page=${page}`,
  wikiByTitle: (title: string) => `/wikis/${title}`,
};
