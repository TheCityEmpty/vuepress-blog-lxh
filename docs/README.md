---
  home: true
---
## 1. `String.prototype.split()`

该api用于分割字符串为数组，例：
```js
'a*b*c'.split('*')  // ['a', 'b', 'c']
```
该api还可以提供第二个参数，限定返回数组的最大成员数
```js
'a*b*c'.split('*', 1)  // ['a']
```
**例如： `'3.1+2.1-9.3/3*2'` 我想分割成['3.1', '+', '2.1', '-', '9.3', '/', '3', '*', '2']怎么办**

没关系，该api还支持正则为第一个参数
```js
const res = '3.1+2.1-9.3/3*2'.split(/(\+)|(\-)|(\*)|(\/)/g)
// [ '3.1', '+', undefined, undefined, undefined, '2.1', undefined, 
'-', undefined, undefined, '9.3', undefined, undefined, undefined, 
'/', '3', undefined, undefined, '*', undefined, '2' ]

// 然后，就可以按照自己的想法随意分割字符串了
res.filter(i => i !== undefined && i !== '')
// [ '3.1', '+', '2.1', '-', '9.3', '/', '3', '*', '2' ]
```

```!
有大佬告诉我为啥这里会返回 undefined 或者 '' 吗？。。。。
```

## 2. `RegExp.prototype.test()`

该api用于是否匹配字符串， 例：
```js
 /\*/g.test('aa*aa') // true
```

第一次匹配后， 下次匹配会从上次匹配的地方开始匹配 （正则对象要是同一个）
```js
// 注意， 正则对象要是同一个
const reg = /\*/g
reg.test('aa*aa') // true
reg.test('aa*aa') // false
```
可以设置 `lasrIndex` 属性，指定从哪里开始匹配
```js
// 指定从 * 后一个字符的位置匹配，所以匹配不到
const reg = /\*/g
reg.lastIndex = 3
reg.test('aa*aa') // false
```

## 3. `String.prototype.replace()`
该api 用来替换字符串中的所匹配的字符，例：
```js
'<div></div>'.replace('<div>', '<div class="active">')
// <div class="active"></div>
```
该api 第二个参数还可以是个函数，将每一个匹配内容替换为函数返回值
```js
'3 and 5'.replace(/[0-9]+/g, (match) => {
    return match * 2
})
// 6 and 10
```
作为replace方法第二个参数的替换函数，可以接受多个参数。其中，第一个参数是捕捉到的内容，第二个参数是捕捉到的组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置（比如从第五个位置开始），最后一个参数是原字符串。比如：
```js
let tem = '<div></div>'
tem = tem.replace(/(<div)(>)(<\/div>)/g, (match, $1, $2, $3) => {
    return $1 + ' class="active"' + $2 + 'hahha' + $3
})
// <div class="active">hahha</div>
```


```!
事实证明，学好正则走遍天下都不怕
```

## 4. `Array.prototype.map` `Array.prototype.forEach` `Array.prototype.filter`
这些数组的api 常见用法, 例：
```js
[1, 2, 3].map((item, index, arr) => {})
[1, 2, 3].forEach((item, index, arr) => {})
[1, 2, 3].filter((item, index, arr) => {})
```
这些api 还可以接受第二个参数, 绑定参数函数内部的this变量

但是这个时候不能写成箭头函数
```js
let list = []
[1, 2, 3].forEach(function (item, index, arr) {
 this.push(item)
}, list)

console.log(list) // [1, 2, 3]
```

## 5. `Number.prototype.toFixed`
该api用于先将一个数转为指定位数的小数，然后返回这个小数对应的字符串,例：
```js
(10).toFixed(2) // '10.00'
```
有时候我们就会这个方法来进行数值的四舍五入，但是由于浮点数的原因，小数5的四舍五入是**不确定的**，使用的时候必须小心。如：
```js
(10.055).toFixed(2) // '10.05' => 错误的 应该是=> '10.06'
(10.005).toFixed(2) // '10.01' => 正确的
```
这里提供一个方法来正确的四舍五入：
```js
 /**
	* @method
	* @description 四舍五入 并 保留几位小数
		默认 保留 2 位小数
	* @param { String | Number } val 四舍五入的数值
	* @param { String | Number } num 保留几位小数
	* @returns { Number } 四舍五入 并 保留几位小数 后的数值
	*/
	const roundAndFixed = (val, num = 2) => {
		const v = Number(`1${'0'.repeat(num)}`)
		return Math.round(val * v) / v
	}
```
运行一下：

![](https://user-gold-cdn.xitu.io/2020/3/31/17130bc36779b1b5?w=404&h=228&f=png&s=14107)
是不是发现都是正确的 : )  ,而且第二个参数 可以指定保留几位小数。