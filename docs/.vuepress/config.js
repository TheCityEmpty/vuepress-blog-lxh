module.exports = {
  title: '江湖录',
  description: '一个前端的江湖之路',
  base: '/vuepress-blog-lxh/',
  dest: './dist',
  themeConfig: {
    logo: '/logo.svg',
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
  }

  // plugins: {
  //   '@vssue/vuepress-plugin-vssue': {
  //     // 设置 `platform` 而不是 `api`
  //     platform: 'github',

  //     // 其他的 Vssue 配置
  //     owner: 'thecityempty',
  //     repo: 'vuepress-blog-lxh',
  //     clientId: 'f42ce1252c7935654846',
  //     clientSecret: 'be26c1cf4c842f0643186942102a465c0cc67985',
  //     locale: 'zh'
  //   },
  // }

  // plugins: ['@vuepress/back-to-top']
  //   '@vssue/vuepress-plugin-vssue': {
  //     // 设置 `platform` 而不是 `api`
  //     platform: 'github',

  //     // 其他的 Vssue 配置
  //     owner: 'thecityempty',
  //     repo: 'vuepress-blog-lxh',
  //     clientId: 'f42ce1252c7935654846',
  //     clientSecret: 'be26c1cf4c842f0643186942102a465c0cc67985',
  //     locale: 'zh'
  //   }
}
