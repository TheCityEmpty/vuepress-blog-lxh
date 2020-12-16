---
description: 'vue3 项目初始化，了解些vue3重要的改动以及变化'
isHot: false
types: ['vue3']
endTime: '2020/12/14'
isPages: false

---
# 1.0之了解vue3的改动

`vue3` 的版本现在也已经发布了正式版本，这就说明之后不管怎么变动都不会太大，只会打点补丁新增写特性之类的。而其他一些 `vue` 的相关配件， 如 `vuex` , `vue-router`, `vue-cli` 等都处于 `beta` 状态了。在这个时候， `vue3` 可能还不会大规模的使用， 但是我们也需要开始学习了。因为 `vue3` 真的是太棒了。

**以下所有 `vue2` 指 `vue2.x版本` ，而 `vue3` 指 `vue3.x版本`**

## 项目初始化

一般来说有两种方式来创建项目。

### 通过 `vue-cli` 来创建项目
一个是以 `vue2` 的方式通过 `vue-cli` 来创建。 
```bash
# 使用npm
npm install -g @vue/cli 

# 使用yarn
# yarn global add @vue/cli

# vue create [project-name]
vue create vue3-project
```
输入命令后按下回车， 会出现让你选择预设，但是可以看到第二个选项是 `Default (Vue 3 Preview) ([Vue 3] babel, eslint)` ，采用 `vue3` 的默认模板。我们就可以选择它。
```bash
? Please pick a preset: (Use arrow keys)
> Default ([Vue 2] babel, eslint)
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)
  Manually select features
```
接下来就会开始自动安装了。然后我们进去这个目录， 并运行项目。
```bash
cd vue3-project
yarn serve
```
等待项目编译完成后， 我们就可以在浏览器输入 `http://localhost:8080/`（如果你的8080端口没被占用的话，就算被占用了，`vue-cli` 也会给你分配一个未被占用的端口） 来访问你的项目了。

### 通过 `vite` 来创建项目

`vite` 是一个通过原生 `ES Module` 提供服务的。理论上这个会比使用 `webpack` 构建来的块， 但是兼容性也是一个问题，所以暂时不使用它。
```bash
# 使用npm
npm init vite-app hello-vue3

# 使用yarn
# yarn create vite-app hello-vue3
```

### 这里将列出 `vue3` 现在的所有新功能或新特性或重大改动

#### 1. 最重要的当然是 **组合式 API**, 也就是 `composition API`。

为啥要将原先的 `options API` 可选项 API，更改为 `composition API` 组合式 API。

刚实验使用 `composition API` 的时候我也想过，因为真的太麻烦了。创建响应式数据我需要引入函数，使用生命周期我需要引入函数，使用计算属性我需要引入函数。但是在真的熟练使用后我觉得真的不错，因为相比于原先的数据与这条数据相关的逻辑是分离，现在的 `composition API` 可以使得数据与这条数据相关的逻辑是在一起的，这将更好维护代码。

假设有这样一段代码：
```js
// 这是 vue2 的代码
export default {
  data () {
    return {
      // 查询列表
      tableData: [],
      // 新增行
      isAddSucess: false,
      // 删除行
      isDeleteSucess: false
    }
  },

  created () {
    this.queryData()
  },

  methods: {
    // 查询列表
    queryData () {
      this.tableData = [1, 2, 3]
    },

    // 新增方法
    addTable () {
      this.isAddSucess = false
      setTimeout(() => {
         this.tableData.push(...[4, 5, 6])
         this.isAddSucess = true
      }, 300)
    },

    // 删除方法
    deleteTbale (index) {
      this.isDeleteSucess = false
      setTimeout(() => {
        this.tableData.splice(0 ,1)
        this.isDeleteSucess = true
      }, 300)
    }
  }
}
```

这个时候我们就会发现一个很严重的问题， 数据在上面， 而跟数据相关的逻辑代码在下面，当整个组件很复杂的时候会发现整个代码是难以维护的。

**而 `composition API` 就是来解决这个问题的**

```js
// 这是 vue3 的代码
import { reactive, ref, isReactive } from 'vue'
export default {
  name: 'App',
  setup () {
    let tableData = reactive([])
    let isAddSucess = ref(true)
    let isDeleteSucess = ref(true)
    queryData(tableData)

    return {
      tableData,
      isAddSucess,
      isDeleteSucess,
      add: () => addTable(tableData, isAddSucess),
      deleted: () => deleteTable(tableData, isDeleteSucess)
    }
  }
}

// 查询列表
function queryData (tableData) {
  tableData = reactive([1, 2, 3])
}
// 新增方法
function addTable (tableData, isAddSucess) {
  isAddSucess.value = false

  setTimeout(() => {
    const addData =[4, 5, 6]
    tableData.push(...addData)
    isAddSucess.value = true
  }, 300)
}
// 删除方法
function deleteTable (tableData, isDeleteSucess) {
  isDeleteSucess.value = false

  setTimeout(() => {
    tableData.splice(0, 1)
    isDeleteSucess.value = true
  }, 300)
}
```

**好吧，代码写的并不是很好， 因为我不太会。所以确实有一定的学习成本，并不是一开始就能写一个很好地代码的。**

#### 2. 新增了一个 `Teleport` 组件， 传送组件

在 `Vue` 中， 我们需要将所有 `dom` 都放置在 `<div id="app"></div>` 中。这样并不好， 这样会增加 `dom` 得到层级，而层级越深则性能越差。而且当我们想将某个组件创建在 `body` 下时就犯难了。

原来的我们会这样做：

这样我们将将一个组件插入到了 `body` 下了
```js
import Message from './Message.vue'
import Vue from 'vue'

// 创建一个基于 Vue 的子类， 并将其挂载， 通过原生 DOM API 把它插入文档中
let MessageConstructor = Vue.extend(Message)
let instance = new MessageConstructor()
instance.$mount()
document.body.appendChild(instance.$el)
```

现在我们可以这样做了：

使用这个组件，它将自动将组件内容插入到 `to` 属性中的 `dom` 节点下

```html
<teleport to="body">
 /*  消息组件内容 */
</teleport>
```

#### 3. 每个组件将不再只能有一个根节点了， `vue3` 允许你写多个根节点。

#### 4. 全局 `Vue API` 已更改为使用应用程序实例

这句话啥意思呢？ 可以看到下面 `vue2` 和 `vue3` 通过不同的方式创建了实例。
在 `vue2` 中，是通过同一个构造函数来创建实例的， 并且是通过这个构造函数来设置全局配置的。这样对于多个实例来说， 这些全局配置是共享的。
```js
// vue2 的写法
import Vue from 'vue'
import App from './App.vue'
const a = new Vue({
  el: '#app',
  render: h => h(App)
})

const b = new Vue()

Vue.prototype.$http = http

// $http 方法是共享的
console.log(a) // 能找到 $http 方法
console.log(b) // 能找到 $http 方法
```


```js
// vue3 的写法
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
const b = createApp(App)
app.mount('#app')
app.config.globalProperties.$http = http

// $http 方法不是共享的
console.log(app) // 能找到 $http 方法
console.log(b) // 不能找到 $http 方法
```

#### 5. 全局和内部 `API` 已经被重构为可 `tree-shakable`

什么叫 `tree-shakable` ？

如下 `utils.js` 文件中有 `a`,`b`,`c` 三个方法， 但是在 `main.js` 中我们只用到了 `a`,`b`方法。

**那么最终的打包文件中， `c` 方法将会被剔除出去，只留下了被使用过的`a`,`b`方法。这就叫`tree-shakable`，留下用过的，没用过的剔除出去。**
```js
// utils.js
export const a = () => {}
export const b = () => {}
export const c = () => {}

// main.js
import { a, b } from './utils.js'
a()
b()
```
为什么说是重构为可`tree-shakable`？

在 `vue2` 中，我们使用了一些方法

然后发现了一个问题，所有的方法都是绑定到 `this` 上，导致打包后不管它们是否使用， 都将包含在最终代码中。
```js
// vue2 写法
this.$set(this, 'count', 99)
this.$nexTick(() => {
  // todo
})
this.$router.push()
this.$store.commit()
```
而在 `vue3` 中，都是作为 ES 模块构建的命名导出进行访问。如：
```js
// vue3 写法
import { nextTick } from 'vue'

nextTick(() => {
  // 一些和DOM有关的东西
})
```

#### 6. 组件上 `v-model` 用法已更改

在 `vue2` 中使用自定义组件时：

```html
<table-component v-model="tableData"></table-component>

<!-- 是以下的简写: -->

<table-component :value="tableData" @input="tableData = $event"></table-component>
```
```js
// table-component.vue
// vue2 写法
export default {
  props: {
    value: Array,
    default: () => []
  },

  methods: {
    deleteData () {
      // ...todo
      this.$emit('input', this.value)
    }
  }
}
```
可以发现， 我们必须按照文档上的方式写成属性名为 `value`， 和 事件名为 `input`。

并且当属性名 `value` 和 事件名 `input` 被占用的时候，这时候将非常麻烦，幸好在 `vue 2.2` 中引入了 `model` 组件选项，允许组件自定义用于 `v-model` 的 `prop` 和事件。但是，这仍然只允许在组件上使用一个 `model`。

更改属性或事件名称，需要在 `table-component` 组件中添加 `model` 选项：
```js
// table-component.vue
// vue2 写法
export default {
  model: {
    prop: 'data',
    event: 'dataChange'
  },

  props: {
     // 使用 `data` 代替 `value` 作为 model 的 prop
    data: Array
  },

  data () {
    return {
      // 这将允许 value 用做其他作用
      value: null,
    }
  },

  methods: {
    deleteData () {
      // ...todo
      this.$emit('dataChange', this.value)
    }
  }
}
```

现在让我们用 `vue3` 的方式写一个组件：

* 现在自定义一个组件，`v-model` prop 和事件默认名称已更改：
  * prop：`value` -> `modelValue`
  * event：`input` -> `update:modelValue`

(我们将不再受到 `value`属性 和 `input` 事件名冲突的困扰了)
* `v-bind` 的 `.sync` 修饰符和组件的 `model` 选项已移除

(当我们使用 `.sync` 时，`vue` 会给我们抛出一个错误， `error  '.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead`， 它告诉我们，`.sync` 已被移除， 请使用 `v-model:propName` 方式 )
(而使用 `model` 选项时， 它已经不生效了， 但是也没有错误。)

* 现在可以在同一个组件上使用多个 `v-model` 进行双向绑定

```html
<loading v-model="isloading" v-model:text="loadingText"></loading>
// this.isloading = true
// this.loadingText = 'loading...'
```
```js
// vue3 写法
// loading.vue
export default {
  props: {
    modelValue: Boolean,
    text: String
  },
  emits: ['update:modelValue'],
  setup (props) {
    console.log(props) // Proxy {modelValue: true}
  }
}
```

#### 7. 使用 `<template></template>` 元素进行循环输出时，`key` 属性现在可以绑定在 `template` 元素上了

`vue2` 中我们只能将 `key` 属性绑定在真实的节点上，如下就是 `div` 上， 如果绑定在 `template` 元素上则会报错：

`<template> cannot be keyed. Place the key on real elements instead`
```html
<!-- vue2 写法 -->
<template v-for="(item, index) in arr">
  <div :key="index"></div>
</template>
```

而在 `vue3` 中，我们可以绑定在 `template` 元素上。如果绑定在 `div` 标签上则会报错：

`<template v-for> key should be placed on the <template> tag`
```html
<!-- vue3 写法 -->
<template v-for="(item, index) in arr" :key="index">
  <div></div>
</template>
```


### 8. `v-bind` 排序问题

在平常写一个组件的时候，我们可能需要将用户传递过来的 `v-bind` 进行覆盖组件的属性。

```html
<!-- vue2 写法 -->
<div id="a" v-bind="{ id: 'b' }">

<!-- 或者这种写法 -->
<div v-bind="{ id: 'b' }" id="a">
```

最终渲染出来的结果都是：
```html
<div id="a">
```

而我们期待的是，`id` b 覆盖 `id` a。

而在 `vue3` 中修改了这种写法的逻辑， 将渲染最后出现的属性：
```html
<!-- vue3 写法 -->

<div id="a" v-bind="{ id: 'b' }">
<!-- 渲染结果 ↓ -->
<!-- <div id="b"></div> -->

<div v-bind="{ id: 'b' }" id="a">
<!-- 渲染结果 ↓ -->
<!-- <div id="a"></div> -->
```

### 9. `vue3` 移除了 `v-on.native` 修饰符

在 `vue2` 中， 我们想在父组件监听子组件的根节点事件， 我们就需要使用 `v-on.native` 修饰符。如下：
```html
<!-- vue2 写法 -->
<!--parent.vue 父组件 -->
<child @click.native="handleClick"></child>
```
```html
<!-- vue2 写法 -->
<!--child.vue 子组件 -->
<tempalte>
  <div class="child"></div>
</tempalte>
```

这时 `@click.native` 就是监听 `class` 等于 `child` 节点的点击事件了。

在 `vue3` 中移除了该修饰符 （`v-on.native` 修饰符）。

如果仅仅这样写，那将相当于 `@click.native` 。
```html
<!-- vue3 写法 -->
<!--parent.vue 父组件 -->
<child @click="handleClick"></child>
```

如果加上下面的代码, `handleClick` 函数将不会触发， 因为它会被认定为 `child.vue` 的回调函数，而下面的代码中没有定义 `click` 回调：
```js
// vue3 写法
// child.vue 子组件
export default {
  emits: ['click']
}
```

最后我们加上 `click` 回调, 这样触发 `aa` 函数的时候， `handleClick` 也会触发， 但是他不是 `click` 原生点击事件，只是子组件的回调：

```js
// vue3 写法
// child.vue 子组件
import { getCurrentInstance } from 'vue'
export default {
  emits: ['click'],
  setup (props) {
    const { emit } = getCurrentInstance()

    return {
      aa: () => aa(emit)
    }
  }
}

function aa (emit) {
  emit('click')
}
```

### 10. `vue3` 中 `ref=""` 更改

在 `vue2` 中，我们可以通过往元素标签上添加 `ref` 属性来获取相应的标签 `dom` 值。如下：
```html
<!-- vue2 写法 -->
<div ref="div"></div>
<ul>
  <li v-for="(item, index) in [1, 2, 3]" :key="index" ref="li">{{ item }}</li>  
</ul>  
```

```js
// vue2 写法
export default {
  mounted () {
    console.log(this.$refs.div)
    // div 元素
    console.log(this.$refs.li)
    // [li ,li ,li] li元素的数组
  }
}
```
而在 `vue3` 中， `ref` 接收一个函数，函数的参数就是他的 `dom` 元素。

```html
<!-- vue3 写法 -->
<div :ref="divFn"></div>
<ul>
  <li v-for="(item, index) in [1, 2, 3]" :key="index" :ref="liFn">{{ item }}</li>  
</ul>  
```

```js
// vue3 写法
export default {
  setup () {
    const divFn = (el) => {
      console.log(el)
      // 输出 div 元素
    }
    const liFn = (el) => {
      console.log(el)
      // 输出每一个 li 元素
    }

    return {
      divFn,
      liFn
    }
  }
}
```

### 11. 渲染函数更改

在 `vue2` 中， 我们可以这样使用渲染函数， 这样我们不需要 `html` 结构了。
```js
// Vue 2 渲染函数示例
// child.vue
export default {
  render(h) {
    return h('div')
  }
}
```
从 `vue3` 开始， `h` 将是全局导入， 而不是作为参数传递给渲染函数。

```js
// Vue 3 渲染函数示例
// child.vue
import { h } from 'vue'
export default {
  render() {
    return h('div')
  }
}
```
使用 `h` 函数我们可以轻易的将Vue组件转为 `dom`。
```js
import { h, render } from 'vue'
// 传入 Message 组件
import Message from './components/Message.vue'

function createEl (Component, props, children) {
  const vnode = h(Component, { ...props }, children)
  render(vnode, document.createElement('div'))
  return vnode.el
}


const el = createEl(Message)

document.body.appendChild(el)
```


### 12. 自定义指令的生命周期进行了更改

这样一来，指令的生命周期和组件的生命周期 是相似的， 也是更加好理解的。

| Vue2.X指令生命周期        | Vue3.X对应的指令生命周期            |
| ------------- |:-------------:|
| bind          | beforeMount   |
| inserted           | mounted   |
| 新的          | <span style="font-weight: 600;color: #d73a49;">beforeUpdate</span>   |
| <span style="text-decoration: line-through;">update</span>           | 移除了   |
| componentUpdated           | updated   |
| 新的          | <span style="font-weight: 600;color: #d73a49;">beforeUnmount</span>   |
| unbind           | unmounted   |

**当然， `vue3.x` 的更改不止这些，还有很多很多细节的东西。之后会详细记录我学习这些细节的东西。**

