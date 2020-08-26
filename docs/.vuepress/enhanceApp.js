// function integrateGitalk(router) {
//   const linkGitalk = document.createElement('link');
//   linkGitalk.href = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css';
//   linkGitalk.rel = 'stylesheet';
//   document.body.appendChild(linkGitalk);
//   const scriptGitalk = document.createElement('script');
//   scriptGitalk.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
//   document.body.appendChild(scriptGitalk);

//   router.afterEach((to) => {
//     if (scriptGitalk.onload) {
//       loadGitalk(to);
//     } else {
//       scriptGitalk.onload = () => {
//         loadGitalk(to);
//       }
//     }
//   });

//   function loadGitalk(to) {
//     let commentsContainer = document.getElementById('gitalk-container');
//     if (!commentsContainer) {
//       commentsContainer = document.createElement('div');
//       commentsContainer.id = 'gitalk-container';
//       commentsContainer.style = 'padding: 20px;'
//       commentsContainer.classList.add('content');
//     }
//     const $page = document.querySelector('.page');
//     if ($page) {
//       $page.appendChild(commentsContainer);
//       if (typeof Gitalk !== 'undefined' && Gitalk instanceof Function) {
//         renderGitalk(to.fullPath);
//       }
//     }
//   }
//   function renderGitalk(fullPath) {
//     const gitalk = new Gitalk({
//       clientID: 'f42ce1252c7935654846', // 在github上生成的
//       clientSecret: 'be26c1cf4c842f0643186942102a465c0cc67985', // 在github上生成的 come from github development
//       repo: 'vuepress-blog-lxh', // 你的博客的仓库名称
//       owner: 'thecityempty', // 你在githug上的用户名称
//       admin: ['thecityempty'], // 管理成员
//       id: 'comment',
//       distractionFreeMode: false,
//       language: 'zh-CN',
//     });
//     gitalk.render('gitalk-container');
//   }
// }

export default ({Vue, options, router}) => {
}
