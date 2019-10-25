export default [
  {
    exact: true,
    path: '/',
    breadcrumb: '首页',
    render: (props: any) =>
      import(/* webpackChunkName: "article" */ './pages/articles')
  },
  {
    exact: true,
    path: '/add-article/:id?',
    breadcrumb: '添加文章',
    render: (props: any) =>
      import(/* webpackChunkName: "addArticle" */ './pages/addArticle')
  }
];
