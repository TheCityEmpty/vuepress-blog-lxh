---
description: '对于一个重度vue的使用者来说，开始学习react是痛苦的。但是公司需要开始做技术转型，我只能开始慢慢的学习react了。'
isHot: false
types: ['react']
endTime: '2021/08/23'
isPages: false

---

# react 学习

本课程是写给自己看的， 记录下学习和摸索的过程，并不会对 `react` 进行原子解析般的面面俱到，只会针对于一些需要理解的东西做出记录。

## 1. 对比下 函数组件 和 类组件吧

在`react` 中，有两种定义组件的方式。分别是 **函数组件** 和 **类组件**。

这是 **函数组件** 的定义方式：

没错， 它就是一个 `js` 中的函数， 而我们习惯于首字母大写，表示这是个构造函数。

它接受一个 `props` 参数， 和 `vue` 中的 `props` 一样， 都是表示从父组件中传来的参数。
```js
function App (props, twoParams) {
    return (<div>holleo</div>)
}
```


而这是个 **类组件** 的定义方式：

```js
import React from 'react'

class App extends React.Component {
  render () {
   return <div>{ this.props.msg }</div>
  }
}

```