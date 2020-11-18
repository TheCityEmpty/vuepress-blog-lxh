---
description: '了解下js的编码规范'
isHot: false
types: ['js', '规范']
endTime: '2020/11/16'
isPages: false

---

# 了解下js代码的规范吧

## js 语法规范

相比于 `html`, `js` 的规范相对要更多，也要更加严格。

**当然，规范是人制作的，那每个人，每家公司都有可能有些不同，下面的内容仅供参考。**

### 1. 请始终保持不在一行语句末尾添加分号`;`，  除了特殊情况。

对于我本人来说，我是个无分号主义者。我的建议是不要写分号，因为 `JavaScript` 在所有类 `C` 语言中是比较独特的，它不需要在每个语句的末尾有分号。在很多情况下，`JavaScript引擎` 可以确定一个分号应该在什么位置然后自动添加它。此特征被称为 自动分号插入（ASI）。

但就算是这样，有时候我也无奈的需要为一行语句末尾添加分号。

如下代码：

```js
// 正确代码：在定义 name 的末尾我加上了一个分号
const name = 'lxh';
((x) => x + 1)


// 报错代码：在定义 name 的末尾没有分号，所以下面的代码会报错。
const name = 'lxh'
((x) => x + 1)
```

所以以中括号开头的语句尽量少些，避免上面的情况出现。

### 2. 请再也不要使用 `var` 来命名变量了。

使用 `var` 来命名变量有太多的不好的地方，导致 `es6` 新增了 `const` 和 `let` 关键字。

对于不可变引用请使用 `const` 来命名。可变的引用请使用 `let`。

**到现在为止，我还在不少 vue 代码中看到有人使用 var 关键字来命名变量**
```js
// a 不会变
const a = 1

// b 接下来会变
let b = 1
b = 3
```
(
`js` 中的变量类型一般分为 基本类型（字符串， 数值， 布尔类型， null， undefined） 和 复杂类型（object, array, function）。
对于复杂类型的变量应该使用 `const` 来命名。
```js
const obj = {}
const arr = []
const fun = () => {
  return true
}
```

### 3. 请使用全等来替代双等

`===` ：全等也就是严格等于，它会比较两边变量的数据类型来确定是否全等。

```js
const a = 1
const b = '1'
console.log(a === b) // false
```

`==` ：不严格等于， 不会比较两边变量的数据类型。

```js
const a = 1
const b = '1'
console.log(a == b) // true
```

### 4. 善用解构

解构可以说是 `es6` 最方便的设计了，极大的简化了程序。解构的用法也是多种多样，用的好可以少写很多混乱的代码。

（1） 为对象，数组解构

请注意对象的解构不需要考虑数据的顺序性，而数组需要考虑数据的顺序
```js
const { name, age } = userInfo
const { age, name } = userInfo // 这样也行

const [ one, two ] = num
const [ two, one ] = num // 数据就会出错
```

（2） 10 个字段 取九个字段的集合

```js
// 普通方法
const { a, b, c, d, e, f, r, t, y, z } = word
const newWord = { b, c, d, e, f, r, t, y, z }

// 采用解构来简化程序，这时候虽然 a 没用， 但也是被解构出来了。
const { a, ...newWord } = word
console.log(newWord) // b c d e f r t y z
```

（3）函数参数解构

```js
// 当不采用解构的时候
function fn (userInfo) {
  const age = userInfo.age
  const name = userInfo.name

  return `我是 ${name}, 今年 ${age} 岁。`
}

// 当采用解构的时候
function fn (userInfo) {
  const { age, name } = userInfo

  return `我是 ${name}, 今年 ${age} 岁。`
}

// 当采用函数参数解构的时候
function fn ({ age, name }) {
  return `我是 ${name}, 今年 ${age} 岁。`
}
```

（4）默认值以及多重解构

**默认值 以及 函数参数默认值**

```js
// 解构的默认值 当 age 解构不出来的时候， 他的默认值就为 13
const { age = 13, name } = userInfo

// 函数参数默认值
function fn ({ age = 13, name }) {
    return `我是 ${name}, 今年 ${age} 岁。`
}
// 当函数参数是一个个的时候 也是可以使用默认值的
function fn (age = 13, name) {
    return `我是 ${name}, 今年 ${age} 岁。`
}

```

**多重解构**

在对接接口的时候， 我们一般会拿到这样的数据。最终我们要拿到 `rows` 将其中的数据渲染在页面上。

```js
const res = {
  code: 0,
  data: {
    rows: [
      {},
      {}
    ]
  },
  msg: 'success'
}

// 以前的做法
const rows = res.data && res.data.rows || []

// 采用解构的方式
 const { data: { rows = [] } = {} } = res

// 假如数据为这样的
const res1 = {}
const { data: { rows = [] } = {} } = res1
console.log(rows) // []
```

### 5. 善用模板字符串，不在使用字符串拼接功能

`es6` 出了一个模板字符串， 弥补了 `es5` 对字符串的处理能力不足之处。

```js
var name = 'lxh'
var age = 13
// es5 
var str = '我是 ' + name + ', 今年 ' + age + '岁。'

// es6
const str = `我是 ${name}, 今年 ${age} 岁。`
```

### 6. 对象的使用

对象是个复杂数据类型， 它的值是存储在堆栈里面的。而对象的命名只是对这个堆栈的引用。在使用对象时要非常小心，因为你可能在操作同一个对象。

（1）请使用字面量方式创建对象

```js
// 不好的
const a = new Object()

// 好的
const b = {}
```

（2）请别用保留字来当做对象的键值
```js
// 错误的
const a = {
  default: true,
  name: '123'
}
```

（3）针对对象的属性是方法时，请使用简写的方式
```js
// 不简写
const a = {
  fn: function () {}
}

// 简写
const a = {
  fn () {}
}
```

（4） 对象属性也建议采用简写的方式

```js
// 不简写
const name = 'lxh'
const age = 13
const a = {
  name: name,
  age: age
}


// 采用简写
const a = {
  name,
  age
}

// 有变量 也有常量的时候, 请把简写写在一起， 不简写的写在一起
const a = {
  name,
  age,
  id: '123123',
  code: '3624'
}
```

### 7. 扩展运算符的使用

如果你要复制一个数组或者一个对象， 都可以采用 `es6` 的扩展运算符， 简单方便。

**但是要特别注意，扩展运算符的复制只是浅复制，而非深复制。使用时要特别注意这点。**

```js
// 数组
const arr = [1, 2, 3, 4]
const copyArr = [...arr]
const arr2 = [...arr, 5, 6, 7]

// 对象
const obj = { age: 13, name: 'lxh' }
const copyObj = { ...obj }
const obj2 = { ...obj, id: '123123', code: '3624' }
```

### 8. 数组的使用

（1）请使用字面量方式创建数组

```js
// 不好的
const a = new Array()

// 好的
const b = []
```

（2）在操作数组时，请避免使用 `for` 循环等基础语句，而应该使用 `forEach`, `map`, `filter` 等高阶函数来处理数组。

**在对于单一语句的情况下，请省略 `return` 或大括号**
```js
const arr = [1, 2, 3, 4, 5, 6]
// 使用 for
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

// 使用 forEach
arr.forEach(i => console.log(i))
```

### 9. 字符串的使用

请统一使用使用 单引号来操作字符串。少按两下键盘不舒服吗？

```js
const name = "lxh"

const name = 'lxh'
```

### 10. 函数的使用

（1） 函数参数的多种用法

```js
// 普通
function fn (name, age, id, code, user, healthy) {
  const params= { id, code, user, healthy }

  // todo
  return `我是 ${name}, 今年 ${age} 岁。`
}

// 默认值
function fn (name, age = 13, id, code, user, healthy) {
  const params= { id, code, user, healthy }

  // todo
  return `我是 ${name}, 今年 ${age} 岁。`
}

// 扩展符来充当参数
function fn (name, age = 13, ...ohterParams) {
  const params = ohterParams

  // todo
  return `我是 ${name}, 今年 ${age} 岁。`
}

// 获取所有参数
function fn (...args) {

}
```

### 11. 不要去修改内置对象原型

有些人喜欢为 `String` 的原型上挂载方法， 以简化引用。
```js
String.prototype.handleStr = function () {

}
```

### 12. 该使用 `class` 去代替原型了
```js
// 原型
function Q () {
  // todo
}

Q.prototype.handleStr = function () {}
Q.prototype.handleArr = function () {}

// 类的方式

class Q {
  constructor () {

  }

  handleStr () {

  }

  handleArr () {
    
  }
}
```

### 13. 怎么去使用 `Promise` 和 `async await`

下面是几个 封装的axios 请求， axios 请求返回一个 Promise。
```js
function getData () {
  return new Promise((resolve, reject) => {
    $http({
      url: 'http://www.baidu.com',
      type: 'post',
      data: {}
    }).then(res => {
      const { code } = res
      $http({
        url: 'http://www.baobao.com',
        type: 'post'
      }).then(res2 => {
        // TODO 处理接下来逻辑
        resolve(res2)
      }).catch(err => reject(err))
    }).catch(err => reject(err))
  })
}


```

可以发现，在这种很多的 `Promise` 处理时，有着嵌套地狱的风险。


下面是合理的使用 `Promise` 和 `async await`，可以发现采用同步处理，整个逻辑层次都清晰起来了， 最后再用 `Promise` 的语法糖来返回一个 `Promise`。
```js
async function getData () {
  try {
    const { code } = await $http({
      url: 'http://www.baidu.com',
      type: 'post',
      data: {}
    })

    const res2 = await $http({
      url: 'http://www.baobao.com',
      type: 'post',
    })
    // TODO 处理接下来逻辑

    Promise.resolve(res2)

  } catch (err) {
    Promise.reject(err)
  }
      
}

```

**可以发现， 大部分的规范都围绕着 `es6` 来进行，确实 `es6` 让整个代码变得更加优雅了，所有我们要善于使用`es6`。**


## js 代码规范

不同的人的代码规范更加是千奇百怪，但只有一个目的，就是将代码写的清晰。

### 1. 空格 与 空行

善于在某些地方使用正确的空格会让你的代码变得更加清晰的。

```js
// 这是没有空格的
async function getData(){
  try {
    const {code} = await $http({
      url:'http://www.baidu.com',
      type:'post',
      data:{}
    })

    const res2 = await $http({
      url:'http://www.baobao.com',
      type:'post',
    })
    // TODO 处理接下来逻辑
    Promise.resolve(res2)
  } catch(err){
    Promise.reject(err)
  }
}


// 这是有空格 并且加上一些空行的
async function getData () {
  try {
    
    const { code } = await $http({
      url: 'http://www.baidu.com',
      type: 'post',
      data: {}
    })

    const res2 = await $http({
      url: 'http://www.baobao.com',
      type: 'post',
    })

    // TODO 处理接下来逻辑
    Promise.resolve(res2)

  } catch (err) {
    Promise.reject(err)
  }
      
}
```

### 2. 注释

合理的注释会让阅读你代码的人心情愉悦， 而不会想着去某宝买把刀。

普通注释
```js
// 获取数据
async function getData () {
  // TODO 处理接下来逻辑
}
```

针对重要功能，逻辑复杂的功能的注释
```js
/**
  * @desc 获取数据方法
  * @param { String } url
  * @param { String } type
  * @param { Object } data
  */
async function getData (url, type, data) {
  // TODO 处理接下来逻辑
}
```

### 3. 拖尾逗号

在 `es5` 中， 拖尾逗号是合法的。但是在 `IE8` （非 IE8 文档模式）下，当出现拖尾逗号，则会抛出错误。
```js
const obj = {
  name: 'lxh',
  age: 13, // 这就是拖尾逗号
}
```
### 4. 构造函数参数

在 `js` 中， 通过  `new` 调用构造函数时，如果不带参数，可以省略后面的圆括号。

```js
// 合法的
const P = new Person

// 但是为了一致性，请加上圆括号
const P = new Person()
```

### 4. 链式声明赋值

```js
// 针对多个变量的声明赋值，有的人会这样写
let a = 1, b = 2, c = 3

// 建议这样写
let a = 1
let b = 2
let c= 3

```

### 5. 长代码变短代码

尽量不要写很长的代码，实在是很难看。
```js
// 请看这个长代码(好吧，其实还不算长)
const index = [1, 2, 3, 4, 5, 6, 7, 8].findIndex(i => i === 1 && i % 2 !== 0)

// 拆分为短代码
const arr = [1, 2, 3, 4, 5, 6, 7, 8]
const index = arr.findIndex(i => {
  return i === 1 && i % 2 !== 0
})
```
### 6. 代码复用

千万别觉得抽离一个函数出来更浪费时间，总有某个时刻你会发现你真的很聪明的。

### 7. 上线前删除掉所有 `console.log`

在浏览器中， `console.log` 其实是个很耗费性能的代码。将它删除可以提升程序运行的速度。
