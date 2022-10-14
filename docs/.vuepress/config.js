// const { myToken } = require('./plugins/myToken.js')
// const highlightFn = require('@vuepress/markdown/lib/highlight.js')
// const preReg = /(<pre v-pre class="language-js"><code>)([^]*)(<\/code><\/pre>)/g
const path = require('path')

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
    extractHeaders: [ 'h1', 'h2', 'h3', 'h4' ],
    extendMarkdown: md => {
      // md.set({
      //   highlight: (str, lang) => {
      //     return highlightFn(str, lang).replace(preReg, (m ,$1, $2, $3) => {
      //       return `<pre v-pre class="language-${lang}" data-codeType="${lang}" data-code="${str}"><code>` + $2 +$3
      //     })
      //   }
      // })
    }
  },

  plugins: [
    '@vuepress/back-to-top'
    // require('./plugins/display.js')
  ],

  globalUIComponents: [
    'footer-box'
  ],

  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js')
  ],

  configureWebpack: {
    resolve: {
      alias: {
        '@imgs': './public'
      }
    }
  },
  devServer: {
    open: true,
    host: 'localhost'
  }
  // configureWebpack: config =>{
  //   config.plugins = [require('./plugins/autoInjectContent.js')]
  // }
}
