const sidebarArr = require('./sidebar.js')
module.exports = {
  title: '江湖录',
  description: '一个前端的学习之路',
  base: '/vuepress-blog-lxh',
  repo: '',
  // permalink: "/:year/:month/:day/:slug",
  themeConfig:  {
    sidebarDepth: 4,
    sidebar: 'auto',
    sidebar: sidebarArr,
    nav: [
      {
        text: '文章分类',
        items: [
          { text: 'javascript', link: '/javascript/' }
          // { text: 'html/css', link: '/javascript/' },
          // { text: 'vue', link: '/javascript/' },
          // { text: 'node', link: '/javascript/' }
        ]
      }
    ]
  }
}
