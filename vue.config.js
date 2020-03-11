let projectname = process.argv[3]
let glob = require('glob')

function getEntry (url) {
  let entries = {}
  let items = glob.sync(url)
  if (process.env.NODE_ENV === 'production') {
    entries = {
      index: {
        // page的入口
        entry: `src/pages/${projectname}/index.js`,
        // 模板来源
        template: `src/pages/${projectname}/index.html`,
        // 在 dist/index.html 的输出
        filename: 'index.html',
        title: projectname,
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      }
    }
  } else {
    for (let i in items) {
      let filepath = items[i]
      let fileList = filepath.split('/')
      let fileName = fileList[fileList.length - 2]
      entries[fileName] = {
        entry: `src/pages/${fileName}/index.js`,
        // 模板来源
        template: `src/pages/${fileName}/index.html`,
        // 在 dist/index.html 的输出
        filename: `${fileName}.html`,
        title: `pages-${fileName}`,
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', fileName]
      }
    }
  }
  return entries
}

let pages = getEntry('./src/pages/**?/*.html')
module.exports = {
  publicPath: './',
  productionSourceMap: false, // 生产禁止显示源代码
  outputDir: 'dist/' + projectname,
  pages: pages
}
