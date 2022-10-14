---
description: '学习typescript'
isHot: false
types: ['ts', 'typescript', 'javascript']
endTime: '2020/09/18'

---

# 学习 ts 三： 接口 interface

## 什么是接口

可以理解为接口是抽象的，而不是实际的。它是用来描述某一串数据应该要符合哪些规范。

如下代码，我定义了一个名为 `User` 的接口。
```ts
// index.ts
interface User {
  name: string,
  sex: string,
  readonly card: Number,
  job?: string
}

const lwx: User = {
  name: 'lwx',
  sex: '男',
  card: 362426
}
```
使用 `tsc index.ts` 将 `typescript` 代码转为 `javascript` 代码。可以发现 `User` 接口并未在 `javascript` 中实现， 这就是接口是抽象的，而不是实际的。
```js
// index.js
var lwx = {
    name: 'lwx',
    sex: '男',
    card: 362426
};
```
### 缺少接口属性时
其中 `name`， `sex`， `card` 是必填项，如果 `lwx` 对象缺少这几个属性那将会编译报错 。定义一个这样的接口就我们规范了 `javascript` 中数据，让这些数据按照我们期望的那样，而不会出现意料之外的情况。使用过 `vue` 的同学会发现这个很像组件中的 `props` 选项，规范了传输过来的数据，防止出错的可能。
```ts
interface User {
  name: string,
  sex: string,
  readonly card: Number,
  job?: string
}

const lwx: User = { // error 报错 类型 "{ name: string; sex: string; }" 中缺少属性 "card"，但类型 "User" 中需要该属性。
  name: 'lwx',
  sex: '男'
}
```

一般来说，你定义这么多属性时，那你必定要有这么多属性。但是一定要缺少属性时，可以采用 **类型断言** 来处理这种问题。这样他就不会因为你少了一个属性而报错了。
```ts
interface User {
  name: string,
  sex: string,
  readonly card: Number,
  job?: string
}

const lwx: User = <User>{
  name: 'lwx',
  sex: '男',
}
```

### 接口属性多出时
下面这种情况就是接口属性多出时，有时你定义了接口的属性为2个，但是发现后台传输过来的数据有3个属性，这样多出一个未定义在接口的属性时 `typescript` 编译器会报错。
```ts
interface User {
  name: string,
  sex: string
}

const lwx: User = {
  name: 'lwx',
  sex: '男',
  job: 'lol player' // error 报错 不能将类型“{ name: string; sex: string; job: string; }”分配给类型“User”。
  // 对象文字可以只指定已知属性，并且“job”不在类型“User”中。
}
```

我们有三种方法处理这种情况。

#### 1. 可选属性
针对这种这个用户有职业， 而另一个用户没有职业的情况，可以采取可选属性。在这个属性名后面加一个 `?` 即可，这样就代表这个属性时可选的。
```ts
interface User {
  name: string,
  sex: string,
  job?: string // 可选属性
}

const lwx: User = {
  name: 'lwx',
  sex: '男',
  job: 'lol player'
}

const uzi: User = { // 就算没有 job 属性也不会报错
  name: 'lwx',
  sex: '男'
}
```

#### 2. 类型断言
将数据断言成 `User` 类型， 那编译器就会认为这个数据就是 `User` 类型，就不会去检查它是否匹配 `User` 类型。
```ts
interface User {
  name: string,
  sex: string
}

const lwx: User = <User>{
  name: 'lwx',
  sex: '男',
  job: 'lol player'
}
```
#### 3. 字符串索引签名

这是我觉得最方便的方法了。**可选属性**还是需要一个一个的定义，如果有100个其他属性呢？**类型断言**属于修改变量的类型，会造成类型混乱不清。

字符串索引签名写法：

其中**任意字段**指代表名称， 代表接下来一大串的其他参数，只是让开发者更好阅读代码， 无实际意义，所以叫任意字段。**索引类型**指的是属性名的类型，
**索引返回值类型**指的属性值的类型。
```ts
interface 接口名 {
  [任意字段: 索引类型]: 索引返回值类型;
}
```
下面代码我定义了一个 `User` 接口，并定义了一个 `prop` 字符串索引签名，约定了对象的键为 `string` 类，值为 `string`，`number`，`boolean`中的任意一个即可， 这样我们就可以在 `lwx` 中加符合约定的任意属性了。
```ts
interface User {
  name: string,
  sex: string,
  [prop: string]: string | number | boolean
}

const lwx: User = {
  name: 'lwx',
  sex: '男',
  job: 'lol player', // 新加的任意属性， 和 prop 这个词没任何关系， 只需要符合后面的约定即可
  height: 100 // 新加的任意属性， 和 prop 这个词没任何关系， 只需要符合后面的约定即可
}
```

### 索引的类型

索引也是有不同类型的，我们把它分为 **字符串索引**和**数字索引**，还有**混合索引**。

#### 1. 字符串索引
也就是键为字符串，值随意，类似普通对象。
```ts
interface User {
  name: string,
  sex: string,
  [prop: string]: string | number | boolean
}

const lwx: User = {
  name: 'lwx',
  sex: '男',
  height: 100
}
```
**字符串索引不能同时定义两个。**
```ts
interface User {
  name: string,
  sex: string,
  [prop: string]: string,
  [otherProp: string]: string // error 报错 字符串索引签名重复。
}
```
#### 2. 数字索引
也就是键为数字，值随意，类似普通数组（数组其实就是特殊的对象，只不过键是 0, 1, 2, 3的数字）。
```ts
interface User {
  name: string,
  sex: string,
  [otherProp: number]: string | number | boolean
}

const lwx: User = {
  name: 'lwx',
  sex: '男',
  0: '啊啊啊，我是一个小数组'
}
```

**数字索引也不能同时定义两个。**
```ts
interface User {
  name: string,
  sex: string,
  [prop: number]: string,
  [otherProp: number]: string // error 报错 数字索引签名重复。
}
```

#### 3. 混合索引

将**字符串索引**和**数字索引**混合在一起就变成了**混合索引**。但是依旧不能同时存在两个**字符串索引**或两个**数字索引**。
```ts
interface User {
  name: string,
  sex: string,
  [prop: string]: string | number | boolean,
  [otherProp: number]: string | number | boolean
}
```

### 只读属性
使用 `readonly` 关键字可以将接口的某个属性定义为只读。
```ts
interface User {
  name: string,
  readonly card: Number
}

const lwx: User = {
  name: 'lwx',
  card: 362426
}

lwx.card = 3 // error 报错  无法分配到 "card" ，因为它是只读属性
```

### 只读属性 readonly 和 const

`const` 定义了一个不可变的常量， 但是针对数组，对象的属性是可以修改。而 `readonly` 所定义的对象就是【数组，对象的属性】，让对象属性不可变，如果对象的属性还是数组，那这个数组还是可以改变的，如下面的代码 `obj.b[0] = 'd'`。
```ts
interface O {
  a: number,
  readonly b: Array<string>
}
const obj: O = {
  a: 1,
  b: ['a', 'b', 'c']
}
obj.a = 3 // succes 成功
obj = {} // error 失败 无法分配到 "obj" ，因为它是常数。
obj.b = [] // error 失败 无法分配到 "b" ，因为它是只读属性。
obj.b[0] = 'd'  // succes 成功
```

### 函数类型接口

我们可以使用基础数据类型来约束一个函数的参数和返回值。我们约定函数的两个参数为 `number` 类型，并且返回值也为 `number` 类型。代码如下：
```ts
// 获取最大值和最小值之间的 随机数
function getRandom (min: number, max: number): number {
  return Math.random() * (max - min) + min
}

getRandom(0, 100)
```

我们还可以用函数类型接口做到。

```ts
interface random {
  (min: number, max: number): number
}
let getRandom: random = function (min, max) {
  return Math.random() * (max - min) + min
}
getRandom(0, 100)
```
函数类型接口的语法：
```ts
interface 函数类型接口名 {
  (第一个参数: 第一个参数类型, 第二个参数: 第二个参数类型, ...): 函数返回值类型
}
```
左边是参数约定， 右边是返回值约定。对于接口中的参数的规定，接口中的参数名其实和实际的参数名没什么关系，在编译阶段检查是否遵循约定， `typescript` 是按照参数的顺序的。也就是说不同的参数名也是可以的。下面代码我将 `min` 改为 `n` ，`max` 改为 `x` 也是可用通过编译的。

```ts
interface random {
  (n: number, x: number): number
}
let getRandom: random = function (min, max) {
  return Math.random() * (max - min) + min
}

getRandom(0, 100)
```

下面的代码是会报错的，原因在于接口第二位参数是 `string` 类型， 却进行了运算。
```ts
// interface random {
//   (n: number, x: number, f: string): string  // succes 正确的
// }

interface random {
  (n: number, f: string, x: number): string // error 错误的 ,和参数名没关系，而是和顺序有关。
}
let getRandom: random = function (min, max, flag) {
  return (Math.random() * (max - min) + min) + flag
}

getRandom(0, 100, '秒')
```

### 类类型接口

说白了，就是用一个接口来约束类。下面代码我创建了一个 `classCalc` 接口，接口了定义了四个方法，还有方法的参数和返回值。然后定义了一个 `Calc` 的类来实现这个接口。那么， 这个类就要符合这个接口的约束了。也就是这个类必须要定义这四个方法，否则会报错。

```ts
interface classCalc {
  add (p: number, n: number) :number, // 加
  subtract (p: number, n: number) :number, // 减
  multiply (p: number, n: number) :number, // 乘
  dvide (p: number, n: number) :number // 除
}


class Calc implements classCalc {
  add (n1: number, n2: number) {
    return n1 + n2
  }
  subtract (n1: number, n2: number) {
    return n1 - n2
  }
  multiply (n1: number, n2: number) {
    return n1 * n2
  }
  dvide (n1: number, n2: number) {
    return n1 / n2
  }
}
```

#### 在类中定义属性

在 ES6 中新增了 `class` 关键字来创建一个类。在类中定义属性的方式有两种， 一种是直接定义在顶层， 还一种是定义在构造函数里面。可以发现两种方式没区别。
```js
class A {
  max = 3
  constructor () {
    this.min = 0
  }
}
console.log(new A()) // A {max: 3, min: 0}
```


在 `typescript` 中如何去定义属性呢？在类接口中定义了 `min` 属性，则在类中也必须要定义，但是接口中没定义的， 也不影响类中定义的其他的属性，方法等，如 `max` 属性 和 `floatCalc` 方法。
```ts
interface classCalc {
  min: number,
  add (p: number, n: number) :number, // 加
  subtract (p: number, n: number) :number, // 减
  multiply (p: number, n: number) :number, // 乘
  dvide (p: number, n: number) :number // 除
}
class Calc implements classCalc {
  max: number = null
  min: number
  constructor () {
    this.min = null
  }
  add (n1: number, n2: number) {
    return n1 + n2
  }
  subtract (n1: number, n2: number) {
    return n1 - n2
  }
  multiply (n1: number, n2: number) {
    return n1 * n2
  }
  dvide (n1: number, n2: number) {
    return n1 / n2
  }
  floatCalc () {}
}
```
### 接口继承

对于一些接口有公共部分，我们可以抽离出来使用接口继承的方式处理，可以更灵活地将接口分割到可重用的模块里。
```ts
interface Biology { // 生物 接口
  weight: number,
  height: number,
  age: number,
  desc: string
}
interface Person extends Biology { // 人 接口
  name: string,
  job: string,
  hobby: string
}
```

一个接口也可继承多个接口来更加细化模块。
```ts

interface Biology { // 生物 接口
  weight: number,
  height: number,
  age: number,
  desc: string
}
interface Person { // 人 接口
  name: string,
  job: string,
  hobby: string
}

interface man extends Biology, Person { // 男人 接口
  
}
```
### 混合接口

之前说了**三种**接口，分别是 **普通接口**，**函数接口**，**类类型接口**。将这些接口进行混合就变成了一个**混合接口**。

```ts
interface O {
  readonly name: string,
  age?: number,
  hobby: Array<string>,
  base: object,
  (x: string): string
}
const play: O = (x: string) => { return x }
play.hobby = ['']
play.base = {}
```


