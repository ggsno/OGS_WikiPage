export default {
  getWikis: (page: number) => `/wikis?page=${page}`,
  putWiki: "/wikis",
  postWiki: "/wikis",
  getWikiByTitle: (title: string) => `/wikis/${title}`,
};
