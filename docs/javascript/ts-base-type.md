---
description: '学习typescript'
isHot: false
types: ['ts', 'typescript', 'javascript']
endTime: '2020/09/15'

---

# 学习 ts 一： [运行ts文件, 基础类型]
## 1. 如何运行ts文件

`typescript` 需要声明一个后缀为 `.ts` 的文件来承载。如下面的 `index.ts`，在 `.ts` 文件中可以直接书写 `javascript` 语法。

```ts
// index.ts
const a = {  c: 1, d: 2 }

console.log({...a})
```
然后我们需要安装一个依赖 `typescript` 来将 `.ts` 文件转换成 `.js` 文件。毕竟浏览器只识别 `.js` 文件。

```sh
npm install -g typescript
```

该依赖提供了 `tsc` 命令来将`.ts` 文件转换成同名 `.js` 文件。
 ```sh
 tsc 文件名
 ```

 接下来我们将 `index.ts` 文件进行转换。 `tsc index.ts`。转换结果如下：

 发现会自动将 `es6` 代码转换成 `es5` 的。对于 `tsc` 命令， 会覆盖掉同名的 `js` 后缀名文件。
 ```js
// index.js
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var a = { c: 1, d: 2 };
console.log(__assign({}, a));
 ```


## 2. 基础类型

相比于js中的基础类型，ts不仅包含js中所有的基础类型，还新增了许多其他的基础类型。

### 先来看看与js基础类型几乎相同的数据类型

### 1. boolean 布尔值

与js一样， 就是简单的true/false值。声明一个类型变量就是这么的简单， 冒号`:` + 数据类型即可。
```ts
let flag: boolean = true
```

### 2. number 数字

与js一样， ts中的所有数字都是浮点数。并且支持 十进制， 二进制，八进制和十六进制。

```ts
let n1: number = 6 // 十进制
let n2: number = 0xf00d // 十六进制
let n3: number = 0b1010 // 二进制
let n4: number = 0o744 // 八进制
```

### 3. stirng 字符串

与js中一样， ts中的字符串同样支持单引号 `'` 和 双引号 `"`。并且对于 `es6` 中对于字符串的操作，同样也是支持的。

```ts
let who: string = 'our'
let str: string = 'luck you'
let str2: string = 'luck me'
let str3: string = `luck ${who}`
```

### 4. array 数组

在ts中有两种方法定义数组。注意： 使用方式二数组泛型的时候， `Array` 首字母是大写的， 和之前的数据类型都是小写的不一样。
```ts
// 方式一： 在数据类型后面接上[]
let arr1: string[] = ['you', 'me', 'our']
// 方式二： 使用数组泛型， Array<数据类型>
let arr2: Array<string> = ['a', 'b', 'c']
// 方式三： 定义只读数组， ReadonlyArray<数据类型>
let arr2: ReadonlyArray<string> = ['a', 'b', 'c']

// 一般来说，数组里都是些杂乱的数据， 所以可以使用 any 数据类型
let arr3: Array<any> = ['a', 2, true]
```
只读数组 和 `const` 的区别？两者都是只读。 `const` 定义的变量不可更改，但是属性却可以更改。
```ts
const obj = {
  a: 1
}
obj.a = 2 // 这是允许的

let arr2: ReadonlyArray<string> = ['a', 'b', 'c']
arr2.push('d') // error 错误  类型“readonly string[]”上不存在属性“push”。
arr2[0] = 'd' // error 错误 类型“readonly string[]”中的索引签名仅允许读取。
arr2.length = 0 // error 错误 无法分配到 "length" ，因为它是只读属性。
```
判断该使用readonly 还是 const 的方法主要是看作为变量还是作为属性，**作为变量的话使用 const，作为属性则使用 readonly**
### 5. null 和 undefined

在ts中， `null` 和 `undefined` 分别有着自己的类型， 分别是 `null` 和 `undefined`。

```ts
let n: null = null
let u: undefined = undefined
```

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给其他类型的变量（但是不能够赋值给never类型。）。

```ts
let aa: null = null
let bb: string = aa
console.log(bb) // null
```

### 6. object

`object` 表示非原始类型， 也就是除 `number`，`string`，`boolean`，`symbol`，`null` 或 `undefined` 之外的类型。

```ts
let obj: object = { a: 1, b2: 2 }
```

### 接下来就是 ts 的特殊数据类型了


### 7. 元组 Tuple

元组类型表示 一个已知数量和类型的数组。本质上也是一个数组，只不过数组会按照所定义的类型排列。

下面第一行代码我定义了一个数量为3 的数组， 第一位和第二位是 `string` 类型， 第三位是 `number` 类型。

针对于元组的操作， 添加一类的方法只能添加 所定义的类型。 下面的就只能添加 `string` 和 `number` 类型，如果添加
一个 `boolean` 类型的就会报错。 删除一类的方法都可以执行。

```ts
let t: [string, string, number] = ['a', 'b', 2]

t.push(true) // error
t.push(1) // success
t.unshift(1) // success
t.pop() // success
t.shift() // success
```

### 8. 枚举

枚举是对 `js` 标准类型的补充，本质上就是一组键值对。

通常来说枚举分三种， 数字枚举 和 字符串枚举 还有 异构枚举（就是值中包含了数字和字符串）。也就是说如果键的值为 非 数字和 非 字符串类型的时候， 会报错。

比如下面的 `BooleanEnum1` 中的 `flag` 键被赋值为 `true` 的布尔类型， 就不行了。

针对**数字枚举**， 枚举是双向键值对。而**字符串枚举**则是单向键值对。怎么理解这句话呢？
（数字枚举经过编译之后会生成 lookup table (反向映射表)，即除了生成键值对的集合，还会生成值键对的集合。）

可以看下面分别输出的 `NumEnum1` 和 `StrEnum1` 值。

也就是对于**数字枚举**， `NumEnum1[0] === 'one'` 和 `NumEnum1['one'] === 0` 都为 `true`。

而对于**字符串枚举**，只能 `StrEnum1['a'] === 'a1'`


**数字枚举**还有一个特点，**自增**。第一个键值为 `0`, 如果后面的 键没有赋值就是 1 2 3的自增上去。
如果中间有某个值被赋值了， 则之后的键， 以此值为基础 自增 +1。

**枚举**获取键值的方式和`js`的对像是一样的。

```ts
enum NumEnum1 {
  one,
  two = 3,
  there
}

enum StrEnum1 {
  a = 'a1',
  b = 'b1'
}

enum BooleanEnum1 { // error
  flag = true
}

console.log(NumEnum1)
// {0: "one", 3: "two", 4: "there", one: 0, two: 3, there: 4}
console.log(StrEnum1)
// {a: "a1", b: "b1"}
console.log(BooleanEnum1) // error
```


**枚举**类型的数据可以理解为常量， 是不可变的，只允许读取。
```ts
enum NumEnum1 {
  one,
  two = 3,
  there
}
NumEnum1[0]  = 1 // 报错 error

```


**字符串枚举**
下面是字符串枚举的几种可能的方式。而第一，第二种方式是可以的， 第三种是报错的。

在赋值了字符串的字符串枚举中， 不允许计算属性方式（第二种方式就叫计算属性方式的赋值）的赋值。
```ts
enum Str1{ // success
  s1 = 'a',
  s2 = 'b'
}

enum Str2 { // success
  s1 = Str1.s1,
  s2 = Str1.s2
}

enum Str3 { // error
  s1 = 'a',
  s2 = Str1.s1
}
```


`const` 修饰符声明枚举， 一下是通过修饰符声明枚举。通过 `const` 修饰符，会造成 无法访问 `Str1` 变量， 枚举不会再进行反向映射了（双向映射）。

```ts
const enum Str1 {
  a = 1,
  b = 2
}
console.log(Str1) // 错误的， 只能使用它的属性值
console.log(Str1['1']) // 错误的， 不会生成反向映射了
console.log(Str1['a']) // 正确的， 只会生成正向映射
```

我们可以和其他的类型一样，为一个变量指定枚举类型。一旦为一个变量指定了相应的枚举类型， 那这个变量的值只能是从枚举中取出来的的值。就算是赋值一个一模一样的值也是不行的。
```ts
const enum Str {
  a = 'a',
  b = 'b'
}
let s: Str = 'a' // error 报错
let s: Str = 'c' // error 报错
let s: Str = 1 // error 报错
let s: Str = Str.a // sucess 成功
```

**枚举**是个**运行时**的类型，怎么解释呢?在ts中输出枚举是不管用的，直接报错了。

```ts
const enum Str {
  a = 'a',
  b = 'b'
}
console.log(Str) // error 报错
```

我们可以使用 `tsc index.ts` 转换为 `js` 文件看下转换后的结果。可以看到下面的代码， 转换后的js文件并没有存储 `Str` 变量。 

```ts
// 原文件 index.ts
const enum Str {
  a = 'a',
  b = 'b'
}
let s: Str = Str.a
```

```js
// 转换后的文件 index.js
var s = "a" /* a */;
```


### 9. any

`any` 的意思是任何，在 `ts` 中指定了该类型的变量，可以赋任意值。和使用原生定义变量基本一样。
按理说一个对象上面是没有 `toFixed` 方法的， 但是转换的时候一样不会报错，只会在浏览器运行的时候报错。
```ts
let num: any = {}
num.toFixed()
```


一般来说，将一个指定了 `number` 类型的变量赋值给 `string` 类型是不行的。比如下面代码的第三行，我想将 `number` 类型变量 `num2` 赋值给 `string` 类型变量 `num3`，这样是不行的。变量之间的赋值必须是同类型的。但是凡事有个意外，`any` 类型的变量可以赋值给其他变量（除never类型之外）或接受其他任何变量的值（除never类型之外）。
```ts
let num1: any = 1
let num2: number = 2
let num3: string = num2 // error 报错 无法将 一个 number 类型赋值给一个 string类型
let num4: string = String(num2) // scuess 成功， 虽然无法赋值不同类型， 但是我们可以将类型进行转换为相同的类型
let num5: string = num1 // scuess 成功， any类型可以赋值给任何类型（除never类型之外）
let num6: any = num2 // scuess 成功， any类型可以接受任何类型的值（除never类型之外）
```

和原生 `js` 一样，如何变量是 `any` 类型， 那么可以访问它的任意属性（即使不存在也不会报错）。
```ts
let n: any = 1
console.log(n.m) // 输出 undefined
```
### 10. void

在一些其他语言中， 一个方法没有返回值，那这个方法的类型就可以定义为 `void` 。 在 `typescript` 中，也有一个这样的类型。代表这个函数没有返回值。。如果你在 `void` 类型的方法中写了 `return` 那会直接报错的。`void` 和 `any` 类型是相反的， `void` 代表没有任何类型， `any` 代表任何类型。
```ts
function aa (): void {
  console.log('ccc')
}

aa()
```

`void` 类型也可以定义在变量上，定义上后变量的值只能为 `null` 和 `undefined` 。
```ts
let aa: void = null  // scuess 成功
let bb: void = undefined // scuess 成功
let cc: void = 'cc' // error 报错
let dd: void = 11 // error 报错
let ff: void = true // error 报错
let ee: void = {} // error 报错
```
*** 

### 11. never

`never` 类型代表那些永远没有值的类型。既然是没有值，那么你给一个 `never` 类型的变量赋值也是会报错的。
```ts
let n: never // scuess 成功
let b: never = 'error' //  error 报错
```

### 12. unknown

听这名字， 不知道的。和 `any` 类型很相似， 有时候我们需要一个类型来描述那些不确认的变量，这时候我们就可以用 `unknown` 类型来定义一个变量。
有了 `any` 类型，为啥还需要 `unknown` 类型呢？

因为 `any` 类型实在太宽松了， 和 `js` 没啥区别了，为了解决 `any` 带来的问题，TypeScript 3.0 引入了 `unknown` 类型。
```ts
let notSure: unknown = 'aaa' // 我并不确认 notSure 在最后会变成什么样类型
notSure = 4 // scuess 成功
notSure = true // scuess 成功
```
`unknown` 类型可以赋值给其他类型变量。但是 `ts` 会以`unknown` 类型定义时被推导的类型来确认能不能赋值。
```ts
let notSure: unknown = 'aaa' // 定义时被推导的类型 是 string 类型， 那就只能赋值给 string 类型
let str: string = notSure // scuess 成功
let num: number = notSure // error 报错


let notSure: unknown = 'aaa'
notSure = 1 // 尽管这里的类型被推导为 number,但是 ts 是以 unknown被定义时推导
let num: number = notSure // error 报错
```

### 类型断言


参考资料： 

[TypeScript中文网](https://www.tslang.cn/docs/handbook/basic-types.html)

[前端教程](https://www.softwhy.com/article-9937-1.html)

[TypeScript官网](https://www.typescriptlang.org/docs/handbook/basic-types.html#unknown)