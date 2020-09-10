#! /usr/bin/env node

const path = require('path')
const fs = require('fs')

const artRoot = './docs/'
const Root = '../'
const excludeName = [
  '.vuepress',
  'other-pages'
]
const h1Reg = /#(\s)+([^\n#\r]+)/g
const timeReg = /endTime[^\n\r]*/g
const resArr = []
// 读取文章标题 时间 路径等
fileDisplay(artRoot)

resArr.sort((n, p) => {
  return p.timestamp - n.timestamp
})

// 生成md文件
buildMdFile(resArr)

function buildMdFile (articles) {
  const strs = articles.map(a => {
    return `[${a.title}](https://thecityempty.github.io/vuepress-blog-lxh/${a.positionPath})  ${a.time}`
  }).join('\n')
  try {
    const res = fs.writeFileSync('./README.md', strs)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
  
}


// 定义方法 方便递归
function fileDisplay (dirPath) {
  const files = fs.readdirSync(dirPath)

  files.forEach(name => {
    const positionPath = path.join(dirPath, name)

    const fileInfo = fs.statSync(positionPath)
    // 是文件
    const isFile = fileInfo.isFile()
    // 是文件夹
    const isDir = fileInfo.isDirectory()

    if (isDir && excludeName.indexOf(name) === -1) {
      fileDisplay(positionPath)
    } 

    if (isFile && ['README.md'].indexOf(name) === -1) {
      const mdContent = fs.readFileSync(positionPath, 'utf-8')
      const title = mdContent.match(h1Reg)[0]
      const time = mdContent.match(timeReg)[0].split(':')[1].trim().replace(/'/g, '')
      resArr.push({
        title,
        time,
        timestamp: new Date(time).getTime(),
        name,
        positionPath: path.relative(artRoot, positionPath).replace('\\', '/')
      })
    }
  })

}

