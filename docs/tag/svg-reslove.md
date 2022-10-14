---
description: '基于vue 2.0 的自定义svg组件'
isHot: false
types: ['vue', 'svg', 'compentent']
endTime: '2020/11/27'
isPages: false

---

# svg-reslove.vue

平常对于一些简单小巧的图片， 我们都会使用 `svg` 格式的图片。

因为 `svg` 格式的图片具有很多优点，比如用户可以任意缩放图像显示，而不会破坏图像的清晰度、细节等，SVG文件比那些GIF和JPEG格式的文件要小很多，因而下载也很快等等。

最主要的是由于SVG是基于XML的， 因而能制作出空前强大的动态交互图像。即SVG图像能对用户动作做出不同响应， 例如高亮、声效、特效、动画等。

`svg-reslove.vue` 就是基于一个 `svg` 格式的图片来重新构造一个自定义的 `svg` 格式的图片。

`svg-reslove.vue`源码 [https://github.com/TheCityEmpty/electron-lxh-home/blob/master/src/renderer/components/utils/svg-resolve.js](https://github.com/TheCityEmpty/electron-lxh-home/blob/master/src/renderer/components/utils/svg-resolve.js)

## `svg-reslove.vue` 原理

### `svg` 格式图片的构造

`svg` 格式的图片一般由一个 `<svg></svg>` 标签作为父级标签， `<path></path>` 标签、 `<circle></circle>` 标签等作为子级内容来填充。

而对于一般简单解构的，色彩单一的 `svg` 图片，子级内容只有 `<path></path>` 标签。

针对于 `<svg></svg>` 标签，比较重要属性有：

* `viewBox` 属性 ----> `viewBox` 属性的值是一个包含4个参数的列表 `min-x` , `min-y` , `width` and `height` ， 以空格或者逗号分隔开， 在用户空间中指定一个矩形区域映射到给定的元素，不允许宽度和高度为负值,0则禁用元素的呈现。
* `width` 属性 ----> `width` 属性 指的就是 `svg ` 图片的宽
* `height` 属性 ----> `height` 属性 指的就是 `svg ` 图片的高
* `fill` 属性 ----> `fill` 属性 指的就是 `svg ` 图片内容所占区域的颜色
* `stroke` 属性 ----> `stroke` 属性 指的就是 `svg ` 图片内容所占区域的描边颜色，有点类似于边框


针对于 `<path></path>` 标签，比较重要属性有：

* `d` 属性 ----> 属性 `d` 实际上是一个字符串，包含了一系列路径描述。可以说整个 `svg` 图片的形状的形成就是靠这个属性了。
* `fill` 属性 ----> `fill` 属性 指的就是 `svg ` 图片内容所占区域的颜色
* `stroke` 属性 ----> `stroke` 属性 指的就是 `svg ` 图片内容所占区域的描边颜色，有点类似于边框

### 解析 `svg` 格式图片

我们可以通过 `http` 请求来解析一张 `svg` 格式图片，他返回一个 `xml` 格式的字符串给我们。

（如果是别的格式，如 `png` 格式，那么他返回一个 `base64` 的数据给我们。）

```js
const { data } = await this.$http({ type: 'GET', url: this.path })

console.log(data)
/**
<?xml version="1.0" standalone="no"?>
<svg t="1606358041043"
  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2753" width="64"
  height="64" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style type="text/css"></style>
  </defs>
  <path
    d="M374.5 65.1H168.2c-57.2 0-103.4 46.8-103.4 103.4v206.3c0 57.2 46.8 103.4 103.4 103.4h206.3c56.6 0 103.4-46.8 103.4-103.4V168.5c0-57.2-46.8-103.4-103.4-103.4z m34.1 309.7c0 18.7-15.4 34.1-34.1 34.1H168.2c-18.7 0-34.1-15.4-34.1-34.1V168c0-18.7 15.4-34.1 34.1-34.1l206.3 0.6c18.7 0 34.1 15.4 34.1 34.1v206.2zM855.8 65.1H649.5c-57.2 0-103.4 46.8-103.4 103.4v206.3c0 57.2 46.8 103.4 103.4 103.4h206.3c56.7 0 102.9-46.8 103.4-103.4V168.5c0-57.2-46.8-103.4-103.4-103.4z m34.1 309.7c0 18.7-15.4 34.1-34.1 34.1H649.5c-18.7 0-34.1-15.4-34.1-34.1V168c0-18.7 15.4-34.1 34.1-34.1l206.3 0.6c18.7 0 34.1 15.4 34.1 34.1v206.2zM374.5 546.4H168.2c-57.2 0-103.4 46.8-103.4 103.4v205.7c0 57.2 46.8 103.4 103.4 103.4h206.3c56.6 0 103.4-46.2 103.4-102.9V649.8c0-57.2-46.8-103.4-103.4-103.4zM408.6 856c0 18.7-15.4 34.1-34.1 34.1H168.2c-18.7 0-34.1-15.4-34.1-34.1V649.8c0-18.7 15.4-34.1 34.1-34.1h206.3c18.7 0 34.1 15.4 34.1 34.1V856zM855.8 546.4H649.5c-57.2 0-103.4 46.8-103.4 103.4v205.7c0 57.2 46.8 103.4 103.4 103.4h206.3c56.7 0 102.9-46.2 103.4-102.9V649.8c0-57.2-46.8-103.4-103.4-103.4zM889.9 856c0 18.7-15.4 34.1-34.1 34.1H649.5c-18.7 0-34.1-15.4-34.1-34.1V649.8c0-18.7 15.4-34.1 34.1-34.1h206.3c18.7 0 34.1 15.4 34.1 34.1V856z"
    p-id="2754" fill="#ffffff"></path>
</svg>
**/
```

通过这个 `xml` 格式得到字符串我们就可以拿到里面关键的 `svg` 属性， 然后进行重构一个 `svg` 元素。
（记住，`svg` 也是一个 `html` 标签。）

```js
 render (h) {
    return h('svg', {
      attrs: {
        viewBox: this.viewBox,
        width: this.svgWidth,
        height: this.svgHeight,
        fill: this.fillColor,
        stroke: this.strokeColor
      },
      on: {
        mouseover: () => this.mouseHandle('over'),
        mouseleave: () => this.mouseHandle('leave')
      }
    }, [h('path', { attrs: { d: this.dataPath } })])
  },
```

### 解析 `svg` 格式图片的path 是哪里的

1. 首先你的 `path` 不能是相对路径，必须是绝对路径。

相对路径 
```html
<img src="./image.png" >
```
在 `vue-cli` 将会编译成
```js
h('img', { attrs: { src: require('./image.png') }})
```

所以是不能使用相对路径。（也包括 `@/images/image.png` 等别名路径。）

2. 使用相对路径的话，可以将图片放置项目的任意位置。


放在 static 文件夹下
```html
<img src="/static/imgs/tool.svg">
```

放在 src 文件夹下都可以
```html
<img src="/src/renderer/assets/imgs/Blod.png">
```

**这时候你就可以开始改变 `svg` 图片的颜色，描边颜色，宽高了，当然你也可以按照你的也无需求，加上一些其他需要改变的地方。**





