---
description: '学习electron'
isHot: false
types: ['javascript', 'electron']
endTime: '2020/11/21'
isPages: true
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
<img :src="$withBase('/electron-1.png')" style="width: 100%x;height: 300px;" alt="URL组成结构图">

出现了 `Remote Target` 即为成功。点击 `inspect` ，就会出现 `debbug` 窗口。

然后点击 `Sources` 源代码标签页。就会出现 `main.js` 中的代码。这时候你就可以开始在 `main.js` 断点代码了。

**如果点击`Sources` 源代码标签页并未出现`main.js` 中的代码，那就点击三个点， 点击 `Open file`去搜索文件，输入 `main.js`即可搜索到。**

<img :src="$withBase('/electron-2.png')" style="width: 100%x;height: 300px;" alt="URL组成结构图">

### 主进程的调试（使用vs code工具进行调试）

点击 `vs code` 右边导航栏中的运行标签， 也可以使用快捷键 `Ctrl + Shift + D`。这时就会出现调试界面， 点击绿色箭头就可以开始调试，这时你就可以去 `main.js` 中设置断点了。

<img :src="$withBase('/electron-3.png')" style="width: 100%x;height: 300px;" alt="URL组成结构图">


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
* app 控制应用程序的事件生命周期，相当于整个程序的实例。
* autoUpdater
* 
* 
* 
* 
* 
* 
* 
* 
