---
description: '学习electron'
isHot: false
types: ['javascript', 'electron']
endTime: '2020/11/21'
isPages: false
---
# 学习electron

## 运行第一个桌面端程序

```bash
git clone https://github.com/electron/electron-quick-start

cd electron-quick-start

# 国内无法连接上， 使用淘宝镜像（使用前请先安装淘宝镜像）
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/

npm install

npm start

```


## 相比于传统的web页面，electron 该如何来调试呢

在此以前， 我们需要了解 **一个electron程序由有且只有一个主进程和若干多个渲染进程组成**。

主进程由 `main.js` 中的代码组成，渲染进程由 `html` 后缀的代码组成，比如上面的示例代码中的 `index.html`。


### 渲染进程的调试

当你成功启动electron程序时，会弹出一个页面。页面上有若干的导航栏， 点击 `View`，再点击 `Toggle Developer Tools`。这时就会弹出和谷歌浏览器一样的 `console` 调试器。当然你也可以使用快捷键 `Ctrl + Shift + i` 来打开调试器。

### 主进程的调试（使用浏览器进行调试）

这时我们需要修改 `package.json`，设置 5858 端口。然后再重新运行程序。 

```json {3}
  "scripts": {
    -- "start": "electron ."
    ++ "start": "electron --inspect=5858 ."
  },

```

接着我们需要打开谷歌浏览器，输入网址 `chrome://inspect/`。

在打开的界面中我们可以看到两个按钮 `Port forwarding...` 和 `Configure...`。

点击 `Configure...` 会出现一个输入 ip 和 port 的弹窗。

我们输入 `localhost:5858`。 点击 `done`。

重新运行程序。

最后界面如下：
<img :src="$withBase('/electron-1.png')" data-water style="width: 100%x;height: 300px;" alt="chrome://inspect/图">

出现了 `Remote Target` 即为成功。点击 `inspect` ，就会出现 `debbug` 窗口。

然后点击 `Sources` 源代码标签页。就会出现 `main.js` 中的代码。这时候你就可以开始在 `main.js` 断点代码了。

**如果点击`Sources` 源代码标签页并未出现`main.js` 中的代码，那就点击三个点， 点击 `Open file`去搜索文件，输入 `main.js`即可搜索到。**

<img :src="$withBase('/electron-2.png')" data-water style="width: 100%x;height: 300px;" alt="调试界面图">

### 主进程的调试（使用vs code工具进行调试）

点击 `vs code` 右边导航栏中的运行标签， 也可以使用快捷键 `Ctrl + Shift + D`。这时就会出现调试界面， 点击绿色箭头就可以开始调试，这时你就可以去 `main.js` 中设置断点了。

<img :src="$withBase('/electron-3.png')" data-water style="width: 100%x;height: 300px;" alt="vscode图">


## 看下文档，了解下相应的api

看完文档，很多都忘记了。但是却记住了下面几条重要的东西：
1. `Node.js` 中所有内置模块和第三方模块 在 Electron 中都支持。
2. 注意：要从渲染过程中访问Node.js API，您需要设置 nodeIntegration 选项为 true。

Node.js API 包含了 `require` 模块， `process` 信息， `fs` 模块，`path` 模块等。所以我可以理解， 这个一定要设置。

3. Electron API是根据流程类型分配的。这意味这某些模块或API只能在主进程或渲染进程使用，有些可以在两者中使用。Electron 的 API 文档指明了每个模块可以使用的过程。所以有时候你发现API没用，那看下文档吧。

4. 在 Electron 中，通信是十分重要的。比如主进程和渲染进程通信，不同的渲染进程之间的通信。而通信有两种方式进行通信。分别是 `ipcMain` 和 `ipcRenderer` 通信模块。下面有个渲染进程和主进程通信的示例：
```js
// 主进程
const { ipcMain } = require('electron')

ipcMain.handle('tel', (evidence, ...args) => {

})

// 在渲染进程中
const { ipcRenderer } = require('electron')

ipcRenderer.invotrake('tel', ...args)

```

可以发现和 `events` 通信有点相似。任意命名一个相同的字符串， 通过 `ipcMain` 创建监听器， `ipcRenderer` 触发监听器。

5. 主进程和渲染进程的区别，只有主进程可以和 `GUI` 或底层系统打交道， 而渲染进程除了额外能够使用 Node.js 能力之外，与普通网页没区别。

看了下文档，太多了，简单说一下大概功能：

**主进程模块**
* app -> 控制应用程序的事件生命周期，相当于整个程序的实例。
* autoUpdater -> 控制程序的自动更新
* BrowserView -> 创建新页面的
* BrowserWindow -> 创建和控制浏览器窗口
* contentTracing -> 内容跟踪，以发现性能瓶颈和缓慢的操作
* dialog -> 显示用于打开和保存文件、警报等的本机系统对话框
* globalShortcut -> 创建全局快捷键方式
* inAppPurchase -> Mac App Store中的应用内购买相关
* ipcMain -> 通信模块，从主进程到渲染进程的异步通信
* Menu -> 顶部菜单相关
* MenuItem -> 顶部菜单项相关
* net -> 使用Chromium的原生网络库发出HTTP / HTTPS请求
* netLog -> 网络事件日志的记录
* nativeTheme -> 读取并响应Chromium本地色彩主题中的变化
* Notification -> 创建OS(操作系统)桌面通知，比如有新的版本要更新了，有人发消息给你了等等...
* powerMonitor -> 监视电源状态的改变
* powerSaveBlocker -> 阻止系统进入低功耗 (休眠) 模式
* protocol -> 注册自定义协议并拦截基于现有协议的请求
* screen -> 检索有关屏幕大小、显示器、光标位置等的信息
* session -> 管理浏览器会话、cookie、缓存、代理设置等
* systemPreferences -> 获取system preferences
* TouchBar -> 为原生macOS应用创建TouchBar布局
* Tray -> 添加图标和上下文菜单到系统通知区
* webContents -> 渲染以及控制 web 页面

**渲染进程模块**
* desktopCapturer -> 可以访问那些用于从桌面上捕获音频和视频的媒体源信息
* ipcRenderer -> 从渲染器进程到主进程的异步通信
* remote -> 可以让我们在在渲染进程中使用主进程模块  
* webFrame -> 自定义渲染当前网页

**两种进程都可以用模块**
* clipboard -> 在系统剪贴板上执行复制和粘贴操作
* crashReporter -> 将崩溃日志提交给远程服务器
* nativeImage -> 使用 PNG 或 JPG 文件创建托盘、dock和应用程序图标
* shell -> 使用默认应用程序管理文件和 url

**我们是需要大概了解下所有的api的，以便在开发的时候知道去哪查看文档！**

## 现在我们可以开始做一个项目了

想了很久， 就做一个个人管理器吧， 就是类似于一个`windows` 系统，然后很多功能集成在里面。没事，慢慢写...

因为写着写着你就会发现，好多报错，哈哈哈

### 1. 好歹是做过很多项目的， 得先把文件结构分好。

首先分出一个文件夹`views`存放web界面的，这个文件夹将专门管理渲染界面。

`views` 下面的每一个文件夹都有三个文件，分别是 `html`, `css`, `renderer.js` 文件，对应着一个渲染进程。

如下图所示：

<img :src="$withBase('/electron-4.png')" data-water style="width: 100%x;height: 300px;" alt="文件结构目录图">

记住： 这时你也要更改 `main.js` 中的路径，它第一次打开界面所指路径。

```js
// main.js

-- mainWindow.loadFile('index.html')
++ mainWindow.loadFile('./views/index/index.html')
```

然后再创建一些别的文件夹对应别的功能，比如 `config` 全局配置，`utils` 工具类，`ipc` 进程通信 等对应别的功能。


### 2. 开始写UI吧

**然后就发现了一个问题，在 `html` 文件中 `style` 标签和元素的 `style` 属性一旦写了就直接报错了。**
```js
// 报错信息

Refused to apply inline style because it violates the following Content Security Policy directive: "default-src 'self'". 
Either the 'unsafe-inline' keyword, a hash ('sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='), or a nonce ('nonce-...') is 
required to enable inline execution. Note also that 'style-src' was not explicitly set, so 'default-src' is used as a fallback.
```

当然你也用 `css` 文件来避免这个报错， 不使用`style` 标签和元素的 `style` 属性。

但是也有别的解决办法：

修改下 `html` 文件的 `meta` 标签即可。
```html
<!-- ./views/index/index.html --> 
-- <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
++ <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'; script-src 'self'">
```

### 3. 还是先整合vue进去吧

突然还是发现 `vue` 够香，所以使用了 `electron-vue` 搭建项目。

`electron-vue` 文档 [https://simulatedgreg.gitbooks.io/electron-vue/content/cn/](https://simulatedgreg.gitbooks.io/electron-vue/content/cn/)


```bash
# 安装 vue-cli 和 脚手架样板代码
npm install -g vue-cli
vue init simulatedgreg/electron-vue my-project

# 安装依赖并运行你的程序
cd my-project
yarn # 或者 npm install
yarn run dev # 或者 npm run dev
```

安装完之后就可以开始运行了， 运行时出现了一个问题：

```js
ReferenceError: process is not defined
```

解决方案：

```js
// 文件目录 .electron-vue/webpack.web.config.js
plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({filename: 'styles.css'}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.ejs'),
     ++ templateParameters(compilation, assets, options) {
     ++  return {
     ++     compilation: compilation,
     ++     webpack: compilation.getStats().toJson(),
     ++     webpackConfig: compilation.options,
     ++     htmlWebpackPlugin: {
     ++       files: assets,
     ++       options: options
     ++     },
     ++     process,
     ++   };
     ++ },
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },


   // 文件目录 .electron-vue/webpack.renderer.config.js
plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({filename: 'styles.css'}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.ejs'),
     ++ templateParameters(compilation, assets, options) {
     ++  return {
     ++     compilation: compilation,
     ++     webpack: compilation.getStats().toJson(),
     ++     webpackConfig: compilation.options,
     ++     htmlWebpackPlugin: {
     ++       files: assets,
     ++       options: options
     ++     },
     ++     process,
     ++   };
     ++ },
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },   
```

再次运行，就可以了。

