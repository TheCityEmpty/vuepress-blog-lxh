function btnStr(code) {
  return `\n<button onclick='handleCodeRun(${code})'>点击运行代码</button>\n`
}
module.exports = {
  name: 'display',
  extendPageData ($page) {
    if ($page.frontmatter.isPages) return

    // let reg = /([^]*?)(```js)([^]*?)(```)([^]*?)/g
    // $page._content = $page._content.replace(reg , (match, $1, $2, $3, $4, $5) => {
    //   return $1 + btnStr($3) + $2 + $3 + $4 + $5
    // })
    // $page._strippedContent = $page._strippedContent.replace(reg , (match, $1, $2, $3, $4, $5) => {
    //   return $1 + btnStr($3) + $2 + $3 + $4 + $5
    // })
    // console.log($page)
  }
}

