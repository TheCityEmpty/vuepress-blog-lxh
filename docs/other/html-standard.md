---
description: '了解下html的编码规范'
isHot: false
types: ['html', '规范']
endTime: '2020/11/13'
isPages: false

---

# 了解下html的编码规范

最近和公司的一个同事一起做一个项目，偶然看到他的代码，我差点想骂人了。直接看截图。

<img :src="$withBase('/html-standard-1.jpg')" data-water style="width: 500px;height: 300px;" alt="html代码截图">

* `style='margin-bottom:10px'`，一个 `html` 属性以单引号包裹，最奇葩的是有的属性用单引号有的用双引号。
* `:data = 'data01'` ，在属性的等于号 `=` 两边加上了空格，导致了对于变量类型的值 `vs code` 是无法高亮的。这个 `data01` 变量的命名也是这么随意，让人无法理解其中的意思。
* 当然还有很多其他一些 `js`， `css` 等一些写法我感觉很奇怪的地方。
* 最忍受不了的是， 代码排版不调整。导致看的人完全不知道这个 开头大括号对应哪个结尾的大括号。
* 该有的注释根本没有，该换行的地方也不换行。

现在项目做完了，然后他被调离项目组了，就剩我一个了。。。。

**到现在终于发现有一个好的规范是多么的重要，还好上家公司对我们的严格，定制了很多很良好的规范，并一直付诸于行动。导致现在的我写代码会及其注重这些。**


## 现在来了解下html的编码规范

**当然，规范是人制作的，那每个人，每家公司都有可能有些不同，下面的内容仅供参考。**

平常对于一个完整的 `html` 结构， 我们前端工程师其实是不太了解，或者说了解的不全。因为我们只需要在 `vs code` 中按下 `!` 号就会自动出来一个 `html` 的框架， 我们只需要在其上面进行修改就可以了。

下面是在我的 `vs code` 上打上 `!` 出来的 `html`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```
::: tip
约定一:

HTML文件必须加上 DOCTYPE 声明，并统一使用 HTML5 的文档声明：
```
<!DOCTYPE html>
```

:::

### 了解下 DOCTYPE

`<!DOCTYPE>` 会告知你的浏览器这个 `html` 文件用哪个版本的 `HTML` (或 `XML`) 来书写的。

**历史原因：**
在很久以前，网页有两种版本，分别是 网景（Netscape）的Navigator 和 微软（Microsoft）的Internet Explorer（也就是现在的ie）。在W3C创立网页标准后，为了不破坏当时既有的网站，浏览器不能直接使用这些标准。因此，浏览器导入了能分辨符合新规范或老网站的两种模式。这就是我们所说的 **怪异模式** 和 **标准模式**。

**怪异模式** 使用的是网景（Netscape）的Navigator 和 微软（Microsoft）的Internet Explorer自定义的非标准行为

**标准模式** 使用W3C创立的标准行为

对于 `html` 文件来说，浏览器使用文件开头的 `DOCTYPE` 来决定使用怪异模式还是标准模式。为了确保页面使用标准模式，请确认你的页面拥有DOCTYPE。
在 `html` 的早期， `DOCTYPE` 属于推荐规范。但今时今日的浏览器都会对拥有`DOCTYPE`的网页使用标准模式。

而 `<!DOCTYPE html>` 为最简单最好的 `DOCTYPE`，如果使用其他 `DOCTYPE`，可能会冒着触发接近标准模式、或着怪异模式的风险。

请确定把 `DOCTYPE` 正确地放在 `html` 文件顶端。任何放在 `DOCTYPE` 前面的东西，如注释或 `XML` 声明，会令Internet Explorer 9或更早期的浏览器触发怪异模式。

在 `HTML5` ，`DOCTYPE` 唯一的作用是启用标准模式。更早期的 `HTML` 标准会附加其他意义，但没有任何浏览器会用 `DOCTYPE` 去做模式间互换以外的用途。


### 了解下 页面语言 lang

看了很多网站的 `lang` 是如何写的，发现尽不相同。下面我举几个例子：

* 百度的 `<html>` 莫得写，可能在其他地方通过 `js` 设置吧。。。
* MDN `<html lang="zh-TW">` ，这个好像是台湾吧。。
* 知乎 `<html lang="zh">`

最后看到了 `vue` 官网的，
* 中文版 `<html lang="zh-CN">`
* 英文版 `<html lang="en">`
* 日文版 `<html lang="ja">`


### 了解下 `<meta charset="UTF-8">`

`HTML-5` 中默认的字符编码是 `UTF-8`，而 `UTF-8` 属于 Unicode 标准。Unicode 标准覆盖了（几乎）所有的字符、标点符号和符号。Unicode 使文本的处理、存储和运输，独立于平台和语言。这样就没有不同平台语言的兼容性问题了。

请写成 `UTF-8` ，不要写成 `utf-8` 或 `utf8` 或 `UTF8`。因为 `UTF-8` 是标准写法。


### 元素及标签闭合

先了解下 `html` 中标签的类型：

* 1. 空元素：`<area>`、`<base>`、`<br>`、`<col>`、`<command>`、`<embed>`、`<hr>`、`<img>`、`<input>`、`<keygen>`、`<link>`、`<meta>`、`<param>`、`<source>`、`<track>`、`<wbr>` 空元素指的是没有闭合标签，也就没有里面的内容。（不像div可以在里面写内容）
* 2. 原始文本元素： `<script></script>`、`<style></style>`
* 3. RCDATA元素： `<textarea></textarea>`、`<title></title>` (RCDATA=Replaceable Character Data)可以理解为替换元素
* 4. 外来元素：来自MathML命名空间和SVG命名空间的元素
* 5. 常规元素：其他HTML允许的元素都称为常规元素。

通常而言：
1. 对于具有开始标签和结束标签的元素都需要写上起止标签，就算某些允许省略的标签也要写上。
2. 对于空元素， 比如 br 标签， 应该写成 `<br>`，而不应该 `<br />`


### 下面就是一些常见的风格问题

#### html 的大小写，空格
* 1. `html` 标签名、类名、标签属性和大部分属性值都应该小写
* 2. 并且书写属性时，等于号两边不应该有空格
* 3. 对于属性与属性之间，属性与标签名之间只能有一个空格， 不能写多个空格。（更不能没有空格，就直接报错了）

正确写法：
```html
<div class="main"></div>
```

错误写法：
```html
<DIV  CLASS = "MAIN" ></DIV>
```

* 4. 当然，对于一些meta标签中的属性值，是应该要大写的
如：
```html
<!-- 优先使用 IE 最新版本和 Chrome Frame -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
```

#### 类型属性

* 5. 不需要为 CSS、JS 指定类型属性，因为在 html5 中已包含。
推荐：
```html
<link rel="stylesheet" href="" >
<script src=""></script>
```

不推荐：
```html
<link rel="stylesheet" type="text/css" href="" >
<script type="text/javascript" src="" ></script>
```

#### 元素属性
* 6. 元素属性应该都使用双引号，而不是使用单引号，也不能啥引号也不加。

推荐：
```html
<input type="text" name="name">
```

不推荐：
```html
<input type=text>
<input type='text' name='name'>
```

#### 特殊字符
* 7. 对于在html中书写的特殊字符，一般是用来转义不合法的字符。
正确写法：
```html
<a>more&gt;&gt;</a>
```

错误写法：浏览器会将 `>>` 作为标签解析。
```html
<a>more>></a>
```

#### 其他规范

* 8. 如代码换行，代码缩进

自己感觉下哪种更好。
```html
<template>
  <div class="use-option">
    <h4 class="browser-header"><slot /></h4>
    <div class="released-versions">
      <div class="versions-box" v-for="(item, index) in versionsArr" :key="index">
        <span class="stat-cell" :class="setClass(item)">{{ item && item.split('|')[0] || '' }}</span>
      </div>
    </div>
  </div>
</template>
```

```html
<template>
  <div class="use-option">
    <h4 class="browser-header">
      <slot />
    </h4>

    <div class="released-versions">
      <div class="versions-box" v-for="(item, index) in versionsArr" :key="index">
        <span class="stat-cell" :class="setClass(item)">
          {{ item && item.split('|')[0] || '' }}
        </span>
      </div>
    </div>
    
  </div>
</template>
```