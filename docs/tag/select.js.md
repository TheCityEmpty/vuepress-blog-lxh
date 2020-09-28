---
description: '使用原生js开发的一款select选择器。'
isHot: true
types: ['js', 'tag', 'compentent']
endTime: '2020/09/27'
isPages: false

---

# select.js

这是一个基于原生 `javascript` 开发的select选择器。<br />使用模拟的增强下拉选择器来代替浏览器原生的选择器。<br />选择器支持单选、多选、搜索，以及键盘快捷操作。

[select.js github地址](https://github.com/TheCityEmpty/select.js)


### 1.基本用法
<br />

<selectjs id="__Query__">
    <template slot="desc">
       基本用法。<br />
       总数据量大于<code>50</code>条数据时会截取50条数据展示，提供搜索功能从 10000 条数据中搜索。主键<code>queryKey</code> 代表匹配对象中的哪个属性。<br />
       在展开选择器后，可以使用键盘的<code>up</code>和<code>down</code>快速上下选择，按下<code>Enter</code>选择，按下<code>Esc</code>收起选择器。<br />
       在关闭选择器后，如果<code>select</code>处于激活状态，则按下<code>Esc</code>可打开选择器。
       <br />
       <code>text</code>属性是显示在 option 上的文字，可自定义。
    </template>
</selectjs>

```js
const arr = []
for (let i = 1; i< 10000 ;i++) {
    arr.push({
        id: i,
        text: `头条${i}号`,
        coed: 'SCOSD' + i,
    })
}
const select = new __Select__({
    id: '__Query__',
    data: arr,
    queryKey: 'id'
})
```

### 2.禁用select选择器
<br />
<selectjs id="__Query__1" :datas="[{id:0,text:'天空1号',__disabled__:true},{id:1,text:'天空2号'}]">
    <template slot="actions">
        <button onclick="window.$__Query__1.$setDisabled(true)">禁用</button>
        <button onclick="window.$__Query__1.$setDisabled(false)">取消禁用</button>
    </template>
    <template slot="desc">
       通过原型上<code>$setDisabled</code>方法禁用整个选择器。<br />
       <code>select.$setDisabled(true)</code> true 为禁用， false 为取消禁用。 <br />
       通过给<code>data</code>数据中添加<code>__disabled__</code>属性可为禁用当前项。
    </template>
</selectjs>

```js
const arr = []
var arr = [
    {
        id: 0,
        text: '天空1号',
        __disabled__: true
    },
    {
        id: 1,
        text: '天空2号'
    }
]
const select = new __Select__({
    id: '__Query__1',
    data: arr,
    queryKey: 'id'
})

// 禁用
select.$setDisabled(true)

// 取消禁用
select.$setDisabled(false)
```

### 3.可清空
<br />
<selectjs id="__Query__2" clear>
    <template slot="desc">
      通过设置属性<code>clear</code>为true可以清空已选项。
    </template>
</selectjs>

```js
const arr = []
for (let i = 1; i< 10000 ;i++) {
    arr.push({
        id: i,
        text: `头条${i}号`,
        coed: 'SCOSD' + i,
    })
}
const select = new __Select__({
    id: '__Query__2',
    data: arr,
    queryKey: 'id',
    clear: true
})
```

### 4.多选
<br />
<selectjs id="__Query__3" clear type="multiple">
    <template slot="desc">
      通过设置属性<code>type</code>为<code>multiple</code>可以开启多选模式。
    </template>
</selectjs>

```js
const arr = []
for (let i = 1; i< 10000 ;i++) {
    arr.push({
        id: i,
        text: `头条${i}号`,
        coed: 'SCOSD' + i,
    })
}
const select = new __Select__({
    id: '__Query__3',
    data: arr,
    queryKey: 'id',
    clear: true
})
```

### 5.标签集合
<br />
<selectjs id="__Query__4" clear type="multiple" :maxTagCount="3">
    <template slot="desc">
      在多选模式下可以设置属性 <code>maxTagCount</code> 可指定最多显示的 tag 数量，超出后折叠。
    </template>
</selectjs>

```js
const arr = []
for (let i = 1; i< 10000 ;i++) {
    arr.push({
        id: i,
        text: `头条${i}号`,
        coed: 'SCOSD' + i,
    })
}
const select = new __Select__({
    id: '__Query__4',
    data: arr,
    queryKey: 'id',
    clear: true
})
```


<br />
<selectjs id="__Query__5" clear type="multiple" :maxTagCount="3" :maxTagPlaceholder="(num) => 'more ' + num">
    <template slot="desc">
      在多选模式下可以设置属性 <code>maxTagCount</code> 可指定最多显示的 tag 数量，超出后折叠。
      设置属性 <code>maxTagPlaceholder</code> 可以自定义 tag 超出后折叠的显示内容。
    </template>
</selectjs>

```js
const arr = []
for (let i = 1; i< 10000 ;i++) {
    arr.push({
        id: i,
        text: `头条${i}号`,
        coed: 'SCOSD' + i,
    })
}
const select = new __Select__({
    id: '__Query__5',
    data: arr,
    queryKey: 'id',
    clear: true,
    maxTagPlaceholder (num) {
        return 'more ' + num
    }
})
```
### 6.获取值与设置值
<br />
<selectjs id="__Query__6">
    <template slot="actions">
        <button onclick="alert(window.$__Query__6.$getVal())">$getVal()</button>
        <button onclick="window.$__Query__6.$setVal(2)">$setVal(2)</button>
        <button onclick="alert(JSON.stringify(window.$__Query__6.$getVallabel()))">$getVallabel()</button>
    </template>
    <template slot="desc">
      通过 <code>$getVal()</code> 方法可以获取选中的值。在单选模式获取的是字符串，多选模式下获取的是数组。<br />
      通过 <code>$setVal()</code> 方法可以获取对select选择器设置值。在单选模式需要设置的是字符串，多选模式下需要设置的是数组。<br />
      通过 <code>$getVallabel()</code> 方法可以获取选中的值的项信息。在单选模式获取的是对象，多选模式下获取的是数组。<br />
    </template>
</selectjs>

```js
const arr = []
for (let i = 1; i< 10000 ;i++) {
    arr.push({
        id: i,
        text: `头条${i}号`,
        coed: 'SCOSD' + i,
    })
}
const select = new __Select__({
    id: '__Query__6',
    data: arr,
    queryKey: 'id'
})
// 获取值
select.$getVal()

// 设置值
// 单选
select.$setVal(2)

// 多选
select.$setVal([2, 3])
```


## API

| 属性        | 说明           | 类型  | 默认值  |
| ------------- |:-------------:| -----:| ------:|
| id      | 绑定的html标签id | String |  无(必填)      |
| data      | options 数据      |  Array |  []      |
| slice | 针对数据量过多时，截取展示的数据量   |   Number |   50(必填)      |
| placeHolder | input 框的 placeHolder 值  |   String |   请选择    |
| queryKey | options 的 key 值   |   String  | 无(必填)
| type | 单选模式还是多选模式(single 和 multiple)   |   String |   single     |
| maxTagCount | 指定最多显示的 tag 数量，超出后折叠。   |   Number |   0     |
| maxTagPlaceholder | 自定义 tag 超出后折叠的显示内容。   |   Function |   无     |
| clear | 清空模式   |   Boolean |   false     |


## methods
| 方法名 | 说明   |   参数 |
| ------------- |:-------------:| -----:|   
| $getVal | 获取选中的值。在单选模式获取的是字符串，多选模式下获取的是数组。   |   无 |
| $setVal | 对select选择器设置值。在单选模式需要设置的是字符串，多选模式下需要设置的是数组。   |   [String, Number 等] | Array |
| $getVallabel | 获取选中的值的项信息。在单选模式获取的是对象，多选模式下获取的是数组。  | 无   |
| $setDisabled | 禁用整个选择器。  | true or false  |


## Features

- 远程搜索
- 添加目录
- 虚拟列表

## Logs

- 2020/9/28 
    1.修复按上下键 foucs 进入不可见区域时滚动条不跟着滚动
    2.修复创建多个实例时，style 标签重复创建
