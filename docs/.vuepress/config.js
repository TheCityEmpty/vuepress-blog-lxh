module.exports = {
  title: '江湖录',
  description: '一个前端的江湖之路',
  base: '/vuepress-blog-lxh/',
  dest: './ dist',
  themeConfig:  {
    logo: '/assets/img/logo.svg',
    repo: 'TheCityEmpty/vuepress-blog-lxh/tree/code',
    repoLabel: 'github',
    editLinks: false,
    lastUpdated: '上次更新',
    sidebarDepth: 4,
    sidebar: 'auto',
    nav: [
      {
        text: '主页',
        link: '/'
      },
      {
        text: '文章分类',
        link: '/other-pages/category.html'
      }
    ]
  },

  markdown: {
    lineNumbers: true,
    extractHeaders: [ 'h1', 'h2', 'h3', 'h4' ]
  },

  plugins: ['@vuepress/back-to-top']
}
