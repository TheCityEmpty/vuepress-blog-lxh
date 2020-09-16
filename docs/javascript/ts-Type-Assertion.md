---
description: '学习typescript'
isHot: false
types: ['ts', 'typescript', 'javascript']
endTime: '2020/09/16'

---

# 学习 ts 二： 类型断言 Type Assertion

## 什么是类型断言

在 `typescript` 中，会将某些变量具体为某种类型的变量，以此来规范变量的类型。但是总有些时候一个变量我们不清楚他到底是属于哪种具体的类型。
```ts
let a: string = 'a' // 将 a 变量规范为 string 类型

a = 1 // 我们想 将 一个 number 赋值给 a， 这确实是业务逻辑， 但是在 typescript 中是不允许的 error 报错
```

我们可以使用管道符 `|` 来指定一个变量多种可能的类型。这样，再次给它赋值一个 `number` 类型的时候就不会报错了。
```ts
let a: string | number = 'a'
a = 1  // scuuess 成功
```
断言语法：
```ts
<类型>值

或

值 as 类型
```

有时候我想取得 `a` 的长度，但是 `typescript` 不清楚 `a` 到底是 `string` 还是 `number` 类型，而作为 `number` 类型是没有 `length` 这个属性的，所以会报错，  但是作为开发者的我们是肯定他最后是个 `string` 的。这时候就可以使用断言将 `a` 指定为 `string` 类型。

```ts
let a: string | number // 联合类型
let b:number = (<string>a).length // 这样就不会报错了
```


## 类型断言的作用

### 1. 将一个联合类型断言成其中一个类型

上面也是使用的这个作用。然后看下面的代码，如果 `a` 为 `string` 类型， 那么我就想去 `a` 的长度，否则我转换下类型再取。但是如果不将 `a` 断言成 `string` 就会报错。
```ts
let a: string | number = 1

// if (typeof a === 'string') {
//   console.log(a).length)   // 如果这样写就会报错 ，需要像下面这样将 `a` 断言成 `string`
// }
if (typeof a === 'string') {
  console.log((<string>a).length)
}
if (typeof a === 'number') {
  console.log(String(a).length)
}
```

:::warning 需要注意的是
  断言只能**欺骗** `typescript` 编译器，无法避免运行时的错误，所以请勿滥用断言。
:::

下面代码，本意是想取字符串的第一个字符。在 `typescript` 编译的时候并不会报错，但是运行时确报错了。原因是 `(<string>val).substr(0, 1)` 这串代码直接将 `val` 变量断言成 `string` 类型了，却没有考虑到它也可能为 `number` 类型。而 `typescript` 编译器一看这里是断言，也不校验这里的类型了。

```js
Uncaught TypeError: val.substr is not a function
    at getFirst (index.js:133)
    at index.js:135
```
```ts
function getFirst (val: string | number): string {
  return (<string>val).substr(0, 1)
}

getFirst(3)
```

### 2.将任何一个类型断言为 any

在很多时候， 在 `js` 中我们会这样为一个对象新增属性。这是很常见的， 也是很方便的一种新增属性的方法。

```js
// index.index
const obj = {}
obj.name = 'lwx'
obj.job = 'lol player'
```

但是在 `typescript` 中却会编译报错。因为在 `obj` 对象上是没有 `name` 和 `obj` 两个属性的，所以会报错。但是我们确认以及肯定这样的代码是不会报错的。
```ts
// index.ts
const obj: object = {}
obj.name = 'lwx' // error 报错 类型“{}”上不存在属性“name”。
obj.job = 'lol player' // error 报错 类型“{}job
```

我们可以使用断言来处理这样的代码。我们临时将 `obj` 断言成 `any` 类型， 在 `any` 类型上访问任何属性都是允许的。
```ts
const obj: object = {};
(<any>obj).name = 'lwx';
(<any>obj).job = 'lol player';
```


### 2.将any断言为精准的类型

有时候以为一些历史原因， 又或者是前任的代码原因等滥用 `any` 的代码，我们可以选择进行优化。如下面的代码，参数是 `any`，返回值是 `any`。
```ts
function getLength (val: any): any {
  return val.length
}
```

改进后的代码：当然，原代码我们不会去修改，只不过在调用的时候，将参数和返回值断言成精确的值。这样 `len` 的类型推导出来就是 `number`。
```ts
function getLength (val: any): any {
  return val.length
}

const len = <number>getLength(<string>'lwx')
console.log(len)
```