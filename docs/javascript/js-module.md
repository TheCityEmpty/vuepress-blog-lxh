---
description: '日常工作中我们经常使用 export 导出，import 导入， 又或者是 module.exports 导出， require 导入。但是我们却不了解他们，让我们从历史到现在的发展深入了解 JavaScript 模块化。'
isHot: false
types: ['javascript', 'es6', '模块化']
endTime: '2020/08/05'

---
# 深入了解 JavaScript 模块化

## JavaScript 模块化 的历史

想要真正的了解一样东西，就得从源头开始研究。我们将通过了解 `JavaScript`模块化 的发展史来学习`JavaScript`模块化。

### 1. Script 标签 和 闭包

HTML 网页中， 浏览器通过 `<script></script>` 标签加载 JavaScript 脚本。

```html
<!-- 页面内嵌的脚本 -->
<script type="application/javascript">
  // module code
</script>

<!-- 外部脚本 -->
<script type="application/javascript" src="./myModule.js">
</script>
```

上面代码中，由于浏览器脚本的默认语言是 JavaScript，因此 `type="application/javascript"` 可以省略。

默认情况下，浏览器将从上往下执行代码。在执行时遇到了 `<script></script>` 标签将会停下来去执行 script 脚本。

如果脚本很大，将造成页面卡住。这显然是不好的，所以浏览器允许这些脚本异步去加载。

我们下面去做一个实验， 来了解 `defer` 和 `async` 的加载顺序。

下面代码中，`script` 标签打开 `defer` 或者 `async` 属性，脚本就会异步加载。浏览器的渲染引擎遇到这一行代码，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。
```html
  <script>
    console.log(1)
  </script>

  <script defer src="./export.js"></script>
  <!-- export.js 里只有一行输出语句： console.log('export')  -->

  <script async src='./import.js'></script>
  <!-- import.js 里只有一行输出语句： console.log('import')  -->

  <script>
    console.log(4)
  </script>

  ...下面大约5000个div
  <div>asdasdasd</div>
```

输出的结果如下：

```bash
1
4
import
export
```

由此我们可以得出结论，`defer` 和 `async` 的区别是： 

`defer` 要等到整个页面正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行。

`async` 一但将脚本下载完成，浏览器渲染引擎就会中断渲染，执行这个脚本，执行完成后再继续渲染剩下的 DOM。

如果有多个 `defer` 脚本，会按照它们出现在页面的顺序 加载。而又多个 `async` 是不能保证加载顺序的。

通过 `script` 方式加载的脚本都共享一个全局作用域 `window` ，在其中定义的变量都将挂载在 `window` 这个全局变量中。
```html
<script defer src="./export.js"></script>
<script async src='./import.js'></script>
```

```js
// export.js
var a = 1
console.log(window)
/*
  {
    a: 1,
    ...,
    b: 2,
    ...
  }
*/
```

```js
// import
var b = 2
```

而随着 Web 应用越来越复杂，这种共享全局作用域的方式弊端开始显现出来。于是 `IIFE` (立即调用函数表达式) 就被发明出来了。

`IIFE` 就是一整段代码包裹在一个函数中，然后立即执行该函数。

我们都知道在每个函数都有着自己的作用域，而我们使用 `IIFE` 就形成了一个个单独的作用域，在其中定义的变量将无法污染外面的变量。

下面有几种 `IIFE` 的写法，第一种是最常见的。

```js
(function () {
 // code todo
 var a = 1
})()

~function () {
 // code todo
 var b = 2
}()

void function () {
  // code todo
  var c = 3
}()
```

在其中定义的变量 `a`， `b`，`c` 将不会挂载在 `window` 上。



### 2. AMD规范 -> RequireJS, AngularJS

`RequireJS` 和  `AngularJS` 的出现让前端终于有了一点模块化的雏形。

下面的方法就是 `RequireJS` 的核心，他接受两个参数， 第一个是数组，表示所需要加载的模块，第二个是回调函数，当数组里的模块都被加载完之后就会执行和这个回调函数。加载的模块会以参数的形势传入该函数，从而在该函数内部使用这些模块。
```js
require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
　　　...
});
```

使用过 `RequireJS` 和 `AngularJS` 的同学都发现了一个问题， API 不够直观，使用起来不是很方便。

### 3. CommonJS 规范

再之后， Node.js 横空出世。并带来了属于他的模块化方案 `CommonJS`，简称 `CJS `。

在 Node.js 中可以访问文件，每一个文件都是一个单独的作用域。

我们可以通过 `require` 方法来加载别的文件，通过 `module.exports` 方式来将文件中的内容输出出去。

```js
const { count } = require('./m.js')
```
```js
// m.js
module.exports = {
  count: 0
}
```

`CommonJS` 模块的特点如下：

1. **所有代码都在模块作用域运行，不会污染全局作用域。**

2. **模块可以加载多次，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，之后再加载，就直接读取缓存结果。想要让模块再次运行，必须清楚缓存。**

3. **模块加载的顺序，按照其在代码中出现的顺序。**


`CommonJS` 规范规定，每个模块内容， `module` 变量代表当前模块。这个变量是一个对象，它的 `exports` 属性（即 `module.exports`）是对外的接口。加载或者导入某个模块就是加载这个模块的 `module.exports` 属性。

下面是打印整个 `module` 对象：可以看到这个模块我们向外导出了一个 `count` 变量。

```js
Module {
  id: '.', // 模块的识别符，通常是带有绝对路径的模块文件名
  path: 'e:\\lxh-code\\study-exm\\js模块化',
  exports: { count: 0 }, // 表示模块对外输出的值
  parent: null, // 一个对象，表示调用该模块的模块
  filename: 'e:\\lxh-code\\study-exm\\js模块化\\export.js', // 模块文件名，带有绝对路径
  loaded: false, // 一个布尔值，表示模块是否已经完成加载
  children: [ // 一个数组，表示该模块要用到的其他模块
    Module {
      id: 'e:\\lxh-code\\study-exm\\js模块化\\import.js',
      path: 'e:\\lxh-code\\study-exm\\js模块化',
      exports: {},
      parent: [Circular *1],
      filename: 'e:\\lxh-code\\study-exm\\js模块化\\import.js',
      loaded: true,
      children: [],
      paths: [Array]
    }
  ],
  paths: [
    'e:\\lxh-code\\study-exm\\js模块化\\node_modules',
    'e:\\lxh-code\\study-exm\\node_modules',
    'e:\\lxh-code\\node_modules',
    'e:\\node_modules'
  ]
}
```

为了方便， `nodeJS` 还提供了一个 `exports` 变量指向 `module.exports`。这等同于在模块头部，有一行这样的命令。

```js
const exports = module.exports
```

下面两种写法的结果完全一致：

```js
// 写法 一

module.exports.count = 0
module.exports.fn = () => {}
```
```js
// 写法 二

exports.count = 0
exports.fn = () => {}
```

但是有一个问题，使用 `exports` 的写法时，只能往上面添加属性而不能重新赋值，这很容易理解， 当你赋值的时候，你就切断了和 `module.exports` 的联系了。

```js
// 这是正确的
exports.count = 0

// 这是错误的
var count = 0
exports = count
```

所以有时候确实很难区分 `module.exports` 和 `exports` 的区别， 那只用一个好了。

### 4. ECMAScript Modules(ESM)

基于之前的遗憾，`javascript` 在 `es6` 中终于推出了 属于自己的模块化，简称 `ESM`。

相比于 `CommonJS` 的运行时加载，`es6` 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上 `"use strict"`。

严格模式主要有以下限制。

**下面代码在 非严格模式 下皆不会报错！**

**下面代码皆假如处于 严格模式 下，注释即在严格模式下的报错信息！**

1. 变量必须声明后再使用

```js
a = 1
// 报错：ReferenceError: a is not defined
```

2. 函数的参数不能有同名属性，否则报错

```js
function fn (type, type) {
  console.log(type)
}

fn(1, 2)
// SyntaxError: Duplicate parameter name not allowed in this context
```

3. 不能使用with语句

```js
const obj = {
  a: {
    b: {
      name: 'aa',
      age: 14
    }
  }
}
with (obj.a.b) {
  console.log(name)
  console.log(age)
}
// SyntaxError: Strict mode code may not include a with statement
```

4. 不能对只读属性赋值，否则报错

5. 不能使用前缀 0 表示八进制数，否则报错

6. 不能删除不可删除的属性，否则报错

7. 不能删除变量delete prop，会报错，只能删除属性delete global[prop]

8. eval不会在它的外层作用域引入变量

9. eval和arguments不能被重新赋值

10. arguments不会自动反映函数参数的变化

11. 不能使用arguments.callee

12. 不能使用arguments.caller

13. 禁止this指向全局对象

14. 不能使用fn.caller和fn.arguments获取函数调用的堆栈

15. 增加了保留字（比如protected、static和interface）

`ESM` 主要由两个命令构成： `export` 和 `import` 命令。


**`export` 用于对外输出， `import` 用于对内输入。**

```js
// export.js

export let count = 1
```

```js
// import.js

import { count } from './export.js'

console.log(count)
// 1
```

需要注意的一点， `export` 命令规定对外的接口， 必须与模块内部的变量建立一一对应的关系。


**两种导出的写法：**
```js
// 写法一：
export let count = 1

// 写法二：
let count = 1
export {
  count
}

```

其他的写法都没有与 `export` 建立联系， 将无法生效。

比如像下面的写法是错误的：

```js
let count = 1
export count
```

还要一个很重要的， **`export` 输出的接口和模块中的变量是动态绑定的，即通过该接口可以取到模块内部的最新值（或者说实时值）。**

```js
// export.js
export let count = 1

setTimeout(() => { count++ }, 500)
```

```js
// import.js
import { count } from './export.js'

console.log(count)

setTimeout(() => { console.log(count)}, 500)

// 1

// 延迟500ms 后，输出了 2
```

`export` 命令和 `import` 命令可以出现在模块任何位置，只要出现在顶层就可以了。如果处于块级作用域中，就会报错。这是因为处于条件代码块之内，就没法
进行静态优化了，违背了 ES6 的设计初衷。

下面的代码就会报错了：

```js
setTimeout(() => { 
  export let count = 1
}, 500)

// SyntaxError: Unexpected token 'export'
```

当我们模块中有重复的名字该怎么办？

我们可以使用 `as` 关键字来重命名。

```js
// export.js
let api = 'http://www.baidu.com'

export {
  api as $__API
}
```

```js
// import.js
import { $__API as api } from './export.js'

console.log(api)
// http://www.baidu.com
```

由上面的所有示例代码我们可以看出， `export` 对外输出的变量名和 `import` 对内输入的变量名必须相同，否则将取不到值。当然你也可以使用 `as` 关键字来重命名。

为了避免整个输入输出的流向正常， `ESM` 规定 `import` 对内输入的变量是只读的， 无法去修改。如下就会报错！

```js
// import.js
// import.js
import { $__API as api } from './export.js'

api = ''
// TypeError: Assignment to constant variable.
```

**但是如果 `api` 是个对象， 你去修改对象的属性是可以的。但是这种写法是很难排错的，不建议这样写。**

每当你 `import` 一个文件进来时， 你就相当于运行了该文件：
```js
// export.js

consolel.log('运行 export.js')

export let count = 1
```

```js
// import.js

console.log('运行了 import.js')

import { count } from './export.js'
console.log(count)
```

运行 `import.js` ， 结果如下：
```bash
运行 export.js
运行了 import.js
1
```

从这个示例我们可以发现几个结论：

1. 每当你 `import` 一个文件进来时， 你就相当于运行了该文件

2.  `import` 命令具有提升效果，会自动提升到模块顶部。导致首先会去运行 导入的模块。所以 `运行 export.js` 第一个输出。

如果你只是想执行（运行）你导入的模块， 那你可以这样，它仅仅执行 `export.js` ，不输出任何值。

```js
import 'export.js'
```

如果重复执行同一个模块，将只执行一次：
```js
// export.js
console.log('运行 export.js')
```

```js
// import.js
import './export.js'
import './export.js'
```

运行结果如下：
```bash
运行 export.js
```

**由于 `import` 是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法解构是不能使用的。**

如下面的语法都是错误的：

```js
let name = 'exe'
import { `$__${name}` } from './name.js'

let url = './../name.js'
import url

if (...) {
  import './a.js'
} else {
  import './b.js'
}
```

除了指定加载某个输出值外，我们还可以使用 `*` 关键字来输出全部。

```js
import * as all from './export.js'

console.log(all)
```

当你采用 `*` 来输出全部的时候，你无法修改 `all` ，包括属性也无法修改。

下面的代码会报错。
```js
import * as all from './export.js'

all.name = 'Luoxuehi'
// 报错 TypeError: Cannot assign to read only property 'name' of object '[object Module]'
console.log(all)
```

在 `ESM` 中， 还有一个默认输出 `export default` ，每个模块只能有一个默认输出。

```js
// export.js
export const name = 'xxx'
export const age = 28
export const sex = '男'

export default {
  name,
  age,
  sex
}
```

```js
// import.js
import * as all from './export.js'
import info from './export.js'
import info1, { name } from './export.js'

console.log(info)
// { name: 'xxx', age: 28, sex: '男' }

console.log(all)
//  {
//   age: 28,
//   default: { name: 'xxx, age: 28, sex: '男' },
//   name: 'xxx',
//   sex: '男'
// }
```

从上面代码中我们可以得到几个结论：

1. 默认输出 和 普通输出时可以写在一起的

2. 默认输入 和 不同输入也可以写在一起: `import info1, { name } from './export.js'`

3. 默认输出每个模块只有一个

4. 默认输出其实是 将 `default` 作为键值来输出内容的

5. 默认输出的时候其实是输出匿名变量的， 即你在 `import` 时可以任意命名

6. 当你直接 `import info from './export.js'` 不使用大括号的时候，他输入的就是 默认输出。

本质上，`export default` 就是输出一个叫做 `default` 的变量或方法，然后系统允许你为它任意取名。

所以下面两个写法是一致的：

```js
const name = 'xxx'
export {
  name as default
}
```

```js
const name = 'xxx'
export default name
```

从上面结论的第二条， **默认输出每个模块只有一个**，下面的写法是不允许的：
```js
const name = 'xxx'

export {
  name as default
}

// 报错， 只能有一个 默认输出
export default function () {
  console.log('cc')
}

```

除了输出， 输入我们也可以这样理解， 所以下面两行也是一致的：

```js
// import name from './export.js'

import { default as name } from './export.js'
```

如果我们需要同时写上的话， 请修改下变量名即可，如下：
```js
import name1 from './export.js'
import { default as name } from './export.js'

console.log(name)
console.log(name1)
```

当我们把 `export` 和 `import` 写在一个模块时，这时表示的是 将 `export.js` 中的 `name` 和 `age` 转发出去：

```js
// import.js
export { name, age } from './export.js'

// 与下面相等
import { name, age } from './export.js'
export { name, age }
```

再看下面的代码。这时需要注意，当 `export` 和 `import` 写在一行时， `name` 和 `age` 并没有被引入当前模块，只是相对于对外转发这两个接口，导致了当前模块不能直接使用 `name` 和 `age`。

```js
// import.js
export { name, age } from './export.js'

// 报错 ReferenceError: name is not defined
console.log(name)
```

下面看一些其他写法：
```js
// 接口改名
export { name as username, age } from './export.js'

// 整体输出
export * from './export.js'

// 将 export.js 的默认接口 指定为 当前模块的默认接口 输出
export { default } from './export.js'

// 将 export.js 的 name 变量作为 当前模块的默认接口输出
export { name as default } from './export.js'

// 将 export.js 的默认接口作为 当前模块的 info 变量进行输出
export { default as info } from './export.js'
```

基于上面的一些知识，那模块与模块之前的继承我们可以这样写：

```js
// parent.js
export const a = 1
export const b = 2
export const c = 3
```

```js
// chilren.js

// 我们将继承 parent.js 中的所有字段
export * from './parent.js'

// 开始新添 属于 chilren.js 的独有属性
export const d = 4
```

前面介绍过， `import` 命令只能在模块顶层，无法在代码块中， 也无法使用表达式来书写。因为 `import` 命令会被 JS 引擎静态分析，先于模块内的其他语句执行。

这样设计虽然有利于编译器提高效率。但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果 `import` 命令要取代Node中 `require` 方法，这就无法进行取代了。因为 `require` 方法是运行时加载模块，`import` 命令无法取代 `require` 方法中的动态加载模块。

```js
if (type === 'white') {
  require('white-style.css')
} else {
  require('block-style.css')
}
```

上面就是动态加载，到底加载哪个模块， 需要在运行时才能决定的。而 `import` 命令做不到这一点。

[ES2020提案](https://github.com/tc39/proposal-dynamic-import) 引入 `import()` 方法，支持动态加载。

```js
// 语法
import(模块路径)
```

`import` 命令能支持什么参数， `import()` 方法就能支持什么参数。唯一的区别就是 `import()` 方法能动态加载。

```js
import('./export.js').then(module => {
  console.log(module)
})
// {
//   age: 28,
//   default: { name: 'xxx', age: 28, sex: '男' },
//   name: 'xxx',
//   sex: '男'
// }
```
`import()` 方法返回一个 `Promise` 对象，所以 `import()` 方法是异步加载的。而 Node中的 `require` 方法是同步的。


### 5. 在浏览器中运行 ESM

```js
<script type="module" src="./export.js"></script>
<script type="module" src='./import.js'></script>
```

我们将 `<script></script>` 标签的 type 属性设置为 `module` 即可在在浏览器中运行 ES6 模块了，这时候我们告知了浏览器这个文件是个 ES6 模块。

浏览器对带有 `type="module"` 的 `<script></script>`，都是异步加载，不会造成堵塞浏览器，而是等到整个页面渲染完成后再去执行脚本。等同于打开了 `<script></script>` 的 `defer` 属性。如果浏览器有多个 `type="module"` 的 `<script></script>` ，他们会按照在页面中出现的顺序依次执行。

对于这种加载一个文件的 `type="module"` ，我们需要启动一个服务来运行整个 `html`，否则会出现跨域问题。

建议在 `VS code` 中安装一个 `Live Server` 即可轻易实验下模块化。


### 6. ESM 和 CommonJS 模块的差异

在了解如何在 `Node` 中运行 ES6 模块前，我们需要了解下 ESM 和 CommonJS 模块的差异。

ESM 和 CommonJS 模块主要有三个差异：

- 1. CommonJS 模块输出的是一个值的拷贝， ES6 模块输出的是一个值的引用。
- 2. CommonJS 模块是运行时加载，  ES6 模块是编译时输出接口
- 3. CommonJS 模块的 `require()` 方法是同步加载模块，而ES6 模块的 `import` 命令是异步加载，它有一个独立的模块依赖解析阶段。

下面的代码就能充分体现第一个差异：

可以看到 CommonJS 模块 输出的是值的拷贝，也就是说一旦输出了一个值，模块内部的变化就影响不到这个值。
```js
// CommonJS 模块

// 输出
let count = 0
setTimeout(() => count++, 1000)
module.exports = {
  count
}

// 输入
const m = require('./export.js')
console.log(m.count)
// 0
setTimeout(() => {
  console.log(m.count)
  // 0
}, 1000)
```

而在 ES6 模块 中却是不一样的， ES6 模块输出的是值的引用， 内部值的变化是可以影响到外部的。

```js
// export.js
export let count = 1

setTimeout(() => { count++ }, 500)
```

```js
// import.js
import { count } from './export.js'

console.log(count)

setTimeout(() => { console.log(count)}, 500)

// 1

// 延迟500ms 后，输出了 2
```

### 7. 如何在 `Node` 中运行 ES6 模块

CommonJS 是独属于 Node.js 的，和 ES6 模块并不兼容。语法上面，两者最明显的差异是：CommonJS 模块使用 `require()` 和 `module.exports` ，ES6 模块使用 `import` 和 `export` 。

从 Node.js v13.2 版本开始，Node.js 默认打开了对 ES6 模块的支持。

如果你要在 Node.js 中使用 ES6 模块， 有两种方法：

1. 将文件名从 `.js` 后缀 改为 `.mjs`，这样 Node.js 就会对这个模块采用 ES6 模块方式进行解析。并且默认打开严格模式。

2. 如果不希望改后缀，那就在项目中的 `package.json` 文件中，将 `type` 字段指定为 `module`。实例如下：

```json
// package.json
{
   "type": "module"
}
```

如果你要在 Node.js 中使用 本来的 CommonJS 模块， 也有两种方法，和上面的方法正好相反：
1. 将文件名从 `.js` 后缀 改为 `.cjs`，这样 Node.js 就会对这个模块采用  CommonJS 模块方式进行解析。

2. 如果不希望改后缀，那就在项目中的 `package.json` 文件中，将 `type` 字段指定为 `commonjs`。实例如下：

```json
// package.json
{
   "type": "commonjs"
}
```

需要注意的是，两种方式不要混着用， `.mjs` 后缀的只能识别 ES6 模块，`.cjs` 后缀的只能识别CommonJS 模块。

### 8. CommonJS 模块加载 ES6 模块

有时候我们写 Node.js 程序的时候采用了默认的 CommonJS 模块来处理模块化。然后我们需要引入一个 采用ES6 模块 的 库。

CommonJS 模块的 `require()` 命令不能加载 ES6 模块，会报错。但是我们可以使用 `import()` 这个方法来加载。
```js
// export.mjs
export const name = 'xxx'
export const age = 28
export const sex = '男'

export default {
  name,
  age,
  sex
}
```

```js
// import.js
import('./export.mjs').then(m => {
  console.log(m)
})
```

### 9.  ES6 模块 加载 CommonJS 模块

有时候我们写 Node.js 程序的时候采用了ES6 模块来处理模块化。然后我们需要引入一个 采用 CommonJS 模块 的 库。

ES6 模块 的 `import` 命令 可以加载 CommonJS 模块， 但是只能整体加载。不能进行解构加载。

```js
// export.cjs

module.exports = {
  name: 'xxx'
}
```

```js
// import.js

import info from './export.cjs'
// 成功

import { name } from './export.cjs'
// 报错 SyntaxError: The requested module './export.cjs' does not provide an export named 'name'


console.log(info)
// { name: 'xxx' }
```

还有一种方法可以加载 CommonJS 模块。就是使用 ES6 模块的 `import()` 方法。但是看打印的值， 发现它会自动将模块内容挂载在 `default` 上。

```js
// import.js

import('./export.cjs').then(m => {
  console.log(m)
  // { default: { name: 'xxx' } }
})
```


参考资料： 

[阮一峰的es6教程](https://es6.ruanyifeng.com/#docs/module)





