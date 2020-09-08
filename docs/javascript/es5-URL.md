---
description: '浏览器内置对象URL，用于解析url，绝大数浏览器都支持。'
isHot: false
types: ['javascript', 'URL对象']
endTime: '2020/09/05'

---
# URL对象
URL是Web中的一个核心概念。它是浏览器用来检索web上公布的任何资源的机制。

URL 的名称实际为 统一资源定位符（Uniform Resource Locator）。

## 一个URL应该由什么组成

<img :src="$withBase('/1599273679(1).png')" style="width: 100%x;height: 300px;" alt="URL组成结构图">

* `href` 一个完整的URL地址
* `origin`  由协议（protocol），域名（hostname），端口（post） 组成的源， 他是一个只读属性
  * 对于 `http` 和 `https` 协议的URL，返回值就是 `http://www.baidu.com:222`
  * 对于 `file:` 协议的 URL， 返回值应浏览器而异
  * 对于 `blob:` 协议的 URL， 返回值是 blob: 后跟随的源地址. 例如 `"blob:https://www.baidu.com:222"` 将会返回 `"https://www.baidu.com:222"`
* `protocol` 协议， 常见的协议有 `http` `https` `ftp`, 协议表示我们可以通过不同的规则访问一个URl，前提是服务器支持该协议
* `hostname` 域名，或者说是主机名。
* `port` 端口号， 一般 `http` 的端口为 80 ，而 `https` 的端口为 443
* `pathname` 路径
* `search` 路由参数  以 `?` 开头
* `hash` 哈希值  以 `#` 开头

* 如果存在 HTTP 身份验证，则这里可能还会有 user 和 password 属性


## 如何创建URL对象

```js
new URL(url, [base])
```
* `url` --- 完整的 URL，或者仅路径（如果设置了 base）
* `base` --- 可选参数，如果设置了两个参数，则会根据两参数生成一个完整的Url

以下两个都是一样的值： 

```js
const u1 = new URL('https://www.baidu.com/aa/bb')
const u2 = new URL('/aa/bb', 'https://www.baidu.com')
console.log(u1.href, u2.href)
// u1 -> https://www.baidu.com/aa/bb
// u2 -> https://www.baidu.com/aa/bb
```
      
看看url 有哪些属性值： 发现这个内置对象 可以取出一个URL 的所有属性，可以很方便的处理URL。

```js
const u1 = new URL('https://www.baidu.com/aa/bb')
console.log(u1)
// {
//   hash: ""
//   host: "www.baidu.com"
//   hostname: "www.baidu.com"
//   href: "https://www.baidu.com/aa/bb"
//   origin: "https://www.baidu.com"
//   password: ""
//   pathname: "/aa/bb"
//   port: ""
//   protocol: "https:"
//   search: ""
//   searchParams: URLSearchParams {}
//   username: ""
// }
```

## 对于字符串的手动编码解码

::: warning 提示
  在某项标准中规定了URL只能包含某些字符，而那些不合规的字符将会被转义。一般这种情况是针对于我们所带的参数中不合规的字符。这样导致在页面接受参数的时候发现参数和原参数对不上，被转义了。
:::


下面是个a链接，带了一个 a 参数，参数中有一个空格。

```html
 <!-- index.html -->
 <a href="cli.html?a=VSA UIO">跳转页面</a>
```

发现在 `cli.html` 中取参数的时候， 空格变成了 `%20`, 那就有问题了，当我想拿参数进行处理的时候， 会发现对不上原始参数。

**转义的规则是：根据操作系统的默认编码，将每个字节转为百分号（%）加上两个大写的十六进制字母。**
```html
 <!-- cli.html -->
 <script>
  console.log(window.location.href)
  // http://localhost:8082/cli.html?a=VSA%20UIO
 </script>
```

所以我们需要将参数进行手动编码 `encodeURI` 。在进行编码之后， 取值的时候应该要进行解码 `decodeURI`，这样就得到了正确的值。

```js
let encodeURI = encodeURI('cli.html?a=VSA UIO')
console.log(encodeURI)
// cli.html?a=VSA%20UIO
encodeURI = decodeURI(encodeURI)
console.log(encodeURI)
// cli.html?a=VSA UIO
```

除此之外， 还有 `encodeURIComponent` 和 `decodeURIComponent` 编码方式。

* `encodeURI` 编码整个 URL
* `decodeURI` 解码为编码前的状态
* `encodeURIComponent` 编码 URL 组件，例如搜索参数，或者 hash，或者 pathname
* `decodeURIComponent` 解码为编码前的状态

那两个编码方法有什么区别呢？

下面有一个全面的URL地址：

```js
https://www.baidu.com:8080/path/page?p1=v1&p2=v2#hash
```

可以发现在URL中 `:`  `.` `/` `?` `=` `&` `#` 这类字符是被允许的。

合法字符分为两类： 

**URL元字符：** 分号`;` 逗号`,` 斜杆`/` 问好`?` 冒号`:` at符`@` and符`&` 等于号`=` 加号`+` 美元符`$` 

**语义字符：** 井号`#` 连接符号`-` 下划线`_` 点`.` 感叹号`!` 波浪号`~` 星号`*` 单引号`'` 圆括号`()` 最后还有 大小写字母`a-z A-Z` 和 阿拉伯数字 `0-9`

为啥要分两类呢？`encodeURI` 方法只会转编码合法字符之外的其他字符， `encodeURIComponent` 则会编码URL元字符之外的字符。

如果你想传一个参数 `12&123` 怎么办， 它会把 `&` 当成参数分隔符。 和你的本意不同，这样， 我们就是使用 `encodeURIComponent` 进行参数编码。

下面的代码我们将 `p1` 参数取出， 并使用 `decodeURIComponent` 方法解码， 就得到了原来的值。
```js
const params = encodeURIComponent('12&123')
const url = `https://www.baidu.com:8080/path/page?p1=${params}&a=1`
console.log(url)
// https://www.baidu.com:8080/path/page?p1=12%26123&a=1

const arr = url.match(/([^&?])+(=)([^&])+/g)
console.log(arr)
//  ["p1=12%26123", "a=1"]

console.log(arr[0].split('='))
// ["p1", "12%26123"]


const p1 = arr[0].split('=')[1]
console.log(p1)
// 12%26123

console.log(decodeURIComponent(p1))
// 12&123
```


## 使用URL对象进行自动编码解码

上面我们使用 `encodeURIComponent` 和 `decodeURIComponent` 进行手动编码， 下面我们用 `URL` 对象进行自动编码。

`URL` 对象下面有个属性为 `searchParams`，使用它可以进行对参数的各种处理。

（提示： `searchParams` 其实是 `URLSearchParams`(window 下面的内置对象， 和URL对象一样) 的实例，两者的用法也是一样的。）

* **`append` 方法：** `new URL(url).searchParams.append('p1', '12&123')`  往 url 里添加 属性名为 p1, 属性值为 12&123 的参数，对于 属性值 **该方法会自动进行编码**。
* **`get` 方法：** `new URL(url).searchParams.get('p1')`  从 url 里取出 属性名为 p1 的参数值， **该方法会自动进行解码**
* **`delete` 方法：** `new URL(url).searchParams.delete('a')`  从 url 里删除 属性名为 p1 的参数
* **`has` 方法：** `new URL(url).searchParams.has('p1')`  url 中是否有 p1 参数， 返回 `true` 或 `false`

* **`set` 方法：**  有两种功能，，分别是 添加新参数 和 替换旧参数
  * `new URL(url).searchParams.set('p2', '00000')` 往 url 里添加 属性名为 p2，属性值为 00000 的参数
  * `new URL(url).searchParams.set('p1', '11111')` 从 url 将属性名为 p1的属性值替换为 00000

* **`getAll` 方法：** `new URL(url).searchParams.getAll('p1')`  

`append` 方法允许插入相同属性名甚至相同属性值参数， 但是使用 `get` 方法的时候只能取第一个 `p1` 的值。这个时候我们就需要 `getAll` 方法， 它会取出所有的 `p1` 的值。

```js
const url = `https://www.baidu.com:8080/path/page`

let urlObj = new URL(url)
urlObj.searchParams.append('p1', '12&123')
urlObj.searchParams.append('p1', '12&123')

console.log(urlObj.search)
// ?p1=12%26123&p1=12%26123  一样的属性名 和 一样的属性值 是可行的


const url = `https://www.baidu.com:8080/path/page`

let urlObj = new URL(url)
urlObj.searchParams.append('p1', '12&123')
urlObj.searchParams.append('p1', '000000')

console.log(urlObj.search)
// ?p1=12%26123&p1=000000

console.log(urlObj.searchParams.get('p1'))
// 12&123   只会取第一个值

console.log(urlObj.searchParams.getAll('p1'))
//  ["12&123", "000000"]  返回一个数组
```


* **`keys` 方法：** `new URL(url).searchParams.keys()`   生成一个包含参数属性名的迭代器
* **`values` 方法：** `new URL(url).searchParams.values()`   生成一个包含参数属性值的迭代器
```js
const url = `https://www.baidu.com:8080/path/page`
let urlObj = new URL(url)
urlObj.searchParams.append('p1', '213')
urlObj.searchParams.append('p2', '421')
for (let key of urlObj.searchParams.keys()) {
  console.log(key)
  // p1
  // p2
}
```

* **`new URL(url).searchParams` 本身就是一个迭代器，拥有 `forEach` 方法， 和数组的 `forEach` 方法一样的使用**


## URL的方法

这两个静态方法是相辅相成的， 一个是在内存中创建 URL 对象， 一个是 在内存中释放 URL 对象。
### `createObjectURL`
使用方法 `window.URL.createObjectURL(object)`, 用于创建 URL 的 File 对象、Blob 对象或者 MediaSource 对象。

### `revokeObjectURL`
使用方法 `window.URL.revokeObjectURL(objectURL)`, 用来释放一个之前已经存在的、通过调用 `URL.createObjectURL()` 创建的 URL 对象。


## 最后，看看兼容性吧

除了 `IE` 不支持， 其他的浏览器基本都支持， 可以放心在 移动端使用了。
<use-list>
  <use-option :versions="['6-10|false', '11|false']">IE</use-option>
  <use-option :versions="['12-83|true', '84|true']">Edge</use-option>
  <use-option :versions="['2-25|false', '26-79|true', '80|true', '81-82|true']">Firefox</use-option>
  <use-option :versions="['4-22|false', '23-31|false', '32-84|true', '85|true', '86-88|true']">Chrome</use-option>
  <use-option :versions="['3.1-6.1|false', '7|false', '7.1-13|true', '13.1|true', '14-TP|true']">Safari</use-option>
  <use-option :versions="['10-12.1|false', '15-18|false', '19 - 69|true', '70|true']">Opera</use-option>
</use-list>


