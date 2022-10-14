---
description: '详细了解学习 vue3 的 compositon api'
isHot: false
types: ['vue3', 'composition api']
endTime: '2020/12/18'
isPages: false

---
# 1.1之详细了解学习 vue3 的 composition api

上篇文章我了解了下 `vue3` 对比与 `vue2` 有些什么样的改动。这篇文章将详细的学习 `vue3` 最大的改动 `compostion api`。

我将通过将 `vue2` 中的写法来对比 `vue3` 中写法来学习如何更好的使用 `vue3`。

## 为什么要将 `vue2` 的 `options api` 改成 `vue3` 的 `composition api` ?

原因就是为了代码的维护，重用等方面。

总结起来就是 `composition api` 对大量代码， 将更加好维护，重用代码也更好。

**下面开始我们将不再使用 `vue2` 的语法了（`vue3`对`vue2`做了兼容处理），将全部使用 `vue3` 的语法。**

## 生命周期与执行顺序

在 `vue3` 的语法中，将不再出现 `data`, `created`, `mounted`, `computed`,`watch` 等了。

它只有一个简单整洁的 `setup` 入口函数。下面是个 `app.vue` 组件，程序将组件加载后，首先执行 `setup` 函数。可以说 `setup` 函数的入口函数。

```js
// vue3 写法
// app.vue
export default {
  setup () {
    // todo
  }
}
```
让我们来对比下 `vue2` 和 `vue3` 的声明周期，这也是生命周期函数的执行顺序：
| Vue2.X生命周期        | Vue3.X对应的生命周期            |
| ------------- |:-------------:|
|  <span style="text-decoration: line-through;">beforeCreate</span>          | setup   |
| <span style="text-decoration: line-through;">created</span>           | setup   |
| beforeMount          |  onBeforeMount |
| mounted          | onMounted   |
| beforeUpdate           | onBeforeUpdate   |
| updated          | onUpdated  |
|  beforeDestroy           | beforeUnmount   |
|  destroyed          | unmounted   |

可以看到 `beforeCreate` 和 `created` 被 `setup` 函数替代了。我们之前在 `vue2` 中`beforeCreate` 和 `created`函数中写的内容可以移植到 `setup` 函数了。

## 使用 `vue3` 实现 `data` 选项

下面我们先使用 `vue2` 来初始化一系列的数据，有各种类型的。
```js
// vue2写法
export default {
  data () {
    return {
      flag: true,
      count: 0,
      name: '',
      list: [],
      userInfo: {
        age: null,
        sex: ''
      }
    }
  }
}
```

然后看看在 `vue3` 我们该如何定义响应式数据。我们使用 `ref` 函数来包装基础类型数据， 使用 `reactive` 来包装引用类型数据。

注意点:
* 1. 定义完数据， 对于需要在模板中使用的数据，你需要在 `setup` 函数中 return 出来。

下面 `name` 变量未 return 出来， 将无法使用，并且 `vue3` 会给你一个警告： 

`[Vue warn]: Property "name" was accessed during render but is not defined on instance. 
  at <App>`

* 2. 你可以在 `<script></script>` 内任意地方去定义响应式变量。例如下面的 `age` 变量。
```html
<template>
  <div>
    {{ flag }}
    {{ count }}
    {{ name }}
    {{ list }}
    {{ userinfo }}

    ++ {{ age }}
  </div>
</template>
```
```js
// vue3 写法
import { ref, reactive } from 'vue'

++ let age = ref(18) // age 也是一个响应式变量了
export default {
  setup () {
    let flag  = ref(false) // 已在下面 return出去
    let count = ref(0) // 已在下面 return出去
    let name = ref('') // 没在下面 return 出去
    let list = reactive([]) // 已在下面 return出去
    let userinfo = reactive({ // 已在下面 return出去
      age: null,
      sex: ''
    })

    return {
      flag,
      count,
      list,
      userinfo,
      ++ age
    }
  }
}
```

**小技巧： 我们将之前定义在 `data` 中的数据通过 `reactive` 定义在一个对象上。**

例如：
```js
// vue3 写法
import { ref, reactive } from 'vue'

export default {
  setup () {
    let state = reactive({
      age: 18,
      flag: false,
      count: 0,
      name: '',
      list: [],
      userinfo: {
        age: null,
        sex: ''
      }
    })

    return {
      state
    }
  }
}
```

是不是很棒！

## 修改 `vue3` 中的响应式数据

先来看看 `vue2` 中我们如何来了修改响应式数据的吧？

```js
// vue2 写法
export default {
  data () {
    return {
      count: 0,
      list: [1, 2, 3],
      userInfo: {
        name: 'lxh',
        age: 18,
        sex: '男'
      }
    }
  },

  created () {
    // 对于基础数据的修改

    // 1. 直接重新赋值
    this.count = 1

    // 2.再原基础上 + 1
    this.count++ // 等于 this.count = this.count + 1

    // 对于引用类型数据的修改

    // 1. 直接赋值
    this.list = [4, 5, 6]
    this.userInfo = {
      name: 'lxh',
      age: 19,
      sex: '男'
    }

    // 2. 通过 数组方法来
    this.list.push(4)

    // 3. 通过 vue 中 $set 方法来
    this.$set(this.list, 3, 4)
    this.$set(this.userInfo, 'age', 19)

    // 4. 通过属性值来赋值
    this.list[3] = 4
    this.userInfo.age = 19
  }
  
}
```

现在我们使用  `vue3` 的方式来试试吧：

注意点：
* 1. 对于通过 `ref` 来定义的数据， 我们需要修改 他的 `.value` 值。原因我们可以往后面看 ↓。

```js
// vue3 写法
import { reactive, ref } from 'vue'

export default {
  setup () {
      let count = ref(0)
      let list = reactive([1, 2, 3])
      let userInfo = reactive({
        name: 'lxh',
        age: 18,
        sex: '男'
      })

      // 我们需要修改他的 .value 值
      count.value = 2
      count.value++

      // 依旧可以
      list[0] = 2
      list.push(4)
      userInfo.age = 19

      // 当我们想重新赋值的时候 会发现这是无效的操作
      list = [4, 5, 6] // 不起作用
      userInfo = { // 不起作用
        name: 'lwx',
        age: 20,
        sex: '女'
      }
      // 这样更加不行, reactive 返回 源数据的代理，这样把源数据都修改了， 和之前的 list 不是一个数据了
      list = reactive([4, 5, 6])
      userInfo = reactive({
        name: 'lwx',
        age: 20,
        sex: '女'
      })

      return {
        count,
        list,
        userInfo
      }
  }
}
```

可以看到修改响应式数据时， 重新赋值是个比较麻烦的事。不管是 `list = [4, 5, 6]` 还是 `list = reactive([4, 5, 6])` 都是无效的， 原因是 `reactive` 返回的是对源数据的代理（映射） ，而这两种方法都是修改了源数据。

所以建议还是定义一个总对象来存储你的状态（你的数据），然后通过修改这个总对象的属性来实现逻辑。如下:

```html
<template>
  <div>
    {{ data.userInfo }}
    {{ data.list }}
  </div>
</template>
```
```js
// vue3 写法
import { reactive } from 'vue'

export default {
  setup () {
    const data = reactive({
      list: [1, 2, 3],
      count: 0,
      userInfo: {
        name: 'lxh',
        age: 18,
        sex: '男'
      }
    })

    // 这样不仅清晰很多，还很管用, 上面的 模板里 就需要 采用 data.[attr] 的方式来书写了
    data.list = [4, 5, 6]
    data.userInfo = {
      name: 'asd'
    }

    return {
      data
    }
  }
}
```

## 使用 `vue3` 实现 `computed` 选项

首先我们需要导入 `computed`, 然后我们来做一个显示价格的组件吧。

`computed` 接受一个 `getter` 函数，返回一个**默认不可手动修改**的 `ref` 对象。和 `vue2` 是很相像的吧。

```html
<template>
  <div>
    价格：<input type="text" :value="price" @input="priceInput" /> 元 <br>
    数量：<input type="text" :value="count" @input="countInput" /> 个 <br>
    总价：{{ totalPrice }} 元 <br>
    数组对象： {{ tableData }}
  </div>
</template>
```

```js
// vue3 写法
import { ref, computed, reactive } from 'vue'

export default {
  setup () {

    const price = ref(18)
    const count = ref(1)
    const totalPrice = computed(() => price.value * count.value)

    // 这是会报错的， 因为 computed 默认返回不可修改对象
    totalPrice++

    const countInput = (e) => {
      count.value = e.target.value
    }
    const priceInput = (e) => {
      price.value = e.target.value
    }

    const tableData = reactive({
      price,
      count,
      totalPrice
    })

    return {
      price,
      count,
      totalPrice,
      countInput,
      priceInput,
      tableData
    }
  }
}
```

现在看看我们书写一个可被修改的计算属性吧。

传入一个拥有 `get` 和 `set` 函数的对象，创建一个可手动修改的计算属性。
```js
import { computed } from 'vue'

export default {
  setup () {
    const rmb = computed({
      get: () => '我很帅',
      set: (val) => {
        alert('我被修改了')
      }
    })

    setTimeout(() => {
      rmb.value = '999'
    }, 1000)
    return {
      rmb
    }
  }
}
```

## 使用  `vue3` 实现只读的数据--> `readonly`

首先我们需要导入 `readonly`。

可以看到下面三种情况都是修改无效的。我们用这个函数来实现真正意义上的只读，而不是以前的浅层只读。

针对 `const` 定义的函数， 只是浅层只读， 而他的属性都是可修改的。

针对 `readonly` 定义的函数，是深层只读，对象内部任何嵌套的属性也都是只读的。

```js
import { readonly, ref, reactive } from 'vue'

export default {
  setup () {
    const config = readonly(reactive({
      timeout: 6000,
      api: 'http://ww.baidu.com'
    }))
    // 修改无效 Set operation on key "timeout" failed: target is readonly. 
    config.timeout = 7000

    const count = ref(0)
    let readonlyCount = readonly(count)
    // 修改无效 Set operation on key "value" failed: target is readonly. 
    readonlyCount.value++

    const config2 = readonly({
      timeout: 6000,
      api: 'http://ww.baidu.com'
    })
    // 修改无效 Set operation on key "api" failed: target is readonly.
    config2.api = 'http'
    return {
      config,
      count,
      readonlyCount
    }
  }
}
```

## 使用  `vue3` 实现 `watch` 监听函数

首先我们需要导入 `watch`。

然后我们分别实现下 `ref` 类型监听， `reactive` 类型整体监听， `reactive` 类型属性监听，多源监听， 以及如何停止监听。
```js
import { watch, ref, reactive } from 'vue'

export default {
  setup () {
    // 监听 ref 类型的值
    const count = ref(0)
    watch(count, (newVal, oldVal) => {
      console.log(`新值：${newVal}, 老值:${oldVal}`)
    })
    setTimeout(() => {
      count.value++
    }, 1000)

    // 监听 reactive 类型的值
    const state = reactive({
      name: 'lxh',
      age: 18
    })
    watch(state, (newVal, oldVal) => {
      console.log(`新值：`, newVal)
      console.log(`老值:`, oldVal)
    })
    setTimeout(() => {
      state.name = '哈哈哈'
    }, 1000)

    // 监听 reactive 类型 的属性, 这个时候 watch 函数接受一个 getter 函数
    // watch(state.name, () => {}) -> 这样写是错误的
    watch(() => state.name, (newVal, oldVal) => {
      console.log(`新值：`, newVal)
      console.log(`老值:`, oldVal)
    })

    // 监听多个源, 某一个源修改了就会触发回调函数（也叫副作用函数）
    const name = ref('lxh')
    const age = ref(18)
    watch([name, age], ([nameNewVal, ageNewVal], [nameOldVal, ageOldVal]) => {
      console.log('name新值：' + nameNewVal)
      console.log('name老值：' + nameOldVal)
      console.log('age新值：' + ageNewVal)
      console.log('age老值：' + ageOldVal)
    })
    setTimeout(() => {
      name.value = 'lwx'
    }, 1000)

    // 主动停止监听, watch 函数返回一个 停止监听函数， 主动调用这个停止函数即会停止对源的监听
    const price = ref(0)
    const stopWatch = watch(price, (newVal, oldVal) => {
      console.log(`新值：`, newVal)
      console.log(`老值:`, oldVal)
    })
    let timer = setInterval(() => {
      if (price.value > 2) {
        stopWatch()
        clearInterval(timer)
        timer = null
      }
      price.value++
    }, 1000)

    // 通过 watch 的三个参数来主动停止监听
    const price = ref(0)
    let timer = null
    watch(price, (newVal, oldVal, onvaild) => {
      console.log(`新值：`, newVal)
      console.log(`老值:`, oldVal)

      if (newVal > 2) {
        onvaild() // 和上面 stopWatch() 函数一模一样
        clearInterval(timer)
        timer = null
      }
    })
    timer = setInterval(() => {
      price.value++
    }, 1000)
    return {
      count,
      state,
      price
    }
  }
}
```

## 接下来我们看看 `composition api` 的其他函数吧


### `watchEffect` 函数

在我看来就是 `watch` 和 `computed` 的结合体。

`watchEffect` 函数接受一个立即执行函数，并追踪其内部依赖。在其依赖变更时重新运行该函数。

如下面代码， `watchEffect` 函数的内部依赖就是 `totalPrice`,`count` 和 `price`。这三个变量哪一个变化了， 都会重新运行匿名函数。

当然 `watchEffect` 函数返回一个可停止监听的函数。
```js
import { watchEffect, ref, onUnmounted } from 'vue'

export default {
  setup () {
    const count = ref(0)
    const totalPrice = ref(0)
    const price = ref(18)
    const stop = watchEffect(() => {
      totalPrice.value = count.value * price.value
    })
    setTimeout(() => {
      count.value++
    }, 1000)

    onUnmounted(() => {
      // 当组件销毁时， 停止监听
      // 当 watchEffect 在组件的 setup() 函数或生命周期钩子被调用时， 侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。
      stop()
    })
    return {
      count,
      totalPrice,
      price
    }
  }
}
```

### 依赖注入

`provide/inject` 在 `vue2` 中就存在了。但是我们也可以在组合式 API 中使用它。这两者都只能在当前活动实例的 `setup()` 期间使用。

`vue2` 中的 `provide/inject` 可以在这篇文章查看使用技巧： 

[剑走偏锋之Vue组件通讯（二）——利用provide / inject属性构建全局状态管理](https://juejin.cn/post/6844903813782962184)

#### 使用 `provide`

`provide` 函数第一个参数为 键， 第二个参数为 值。称之为 键值对 。

下面我们往父组件中注入了一个对象 `{ size: 'middle' }`
```js
// 父组件 parent.vue
import { provide } from 'vue'
import children from './components/children.vue'

export default {
  components: { children },
  setup () {
    provide('size', 'middle')

    return {
    }
  }
}
```

#### 使用 `inject`

`inject` 函数第一个参数为 键， 第二个参数为 当取不到值的时候的默认值， 如果取不到值并且没有默认值， 则取出来的值为 `undefined` 。

下面我们在子组件中取 `size` 的值。
```js
// 子组件 children.vue
import { inject } from 'vue'
export default {
  setup () {
    const componentSize = inject('size', 'middle')
    console.log(componentSize) // middle
  }
}
```

#### 响应式的使用 `provide/inject`

只需要将传入的值通过 `ref` 或者 `recative` 包装下就可以了。
```js
// 父组件 parent.vue
import { provide, ref } from 'vue'
import children from './components/children.vue'

export default {
  components: { children },
  setup () {
    const size = ref('middle')
    provide('size', size)
    
    setTimeout(() => {
      size.value = 'small'
    }, 2000)
    return {
    }
  }
}
```


```js
// 子组件 children.vue
import { inject, watchEffect } from 'vue'
export default {
  setup () {
    const componentSize = inject('size', 'middle')

    watchEffect(() => {
      // 两秒 过完将会再次打印
      console.log(componentSize.value)
    })

    return {
      componentSize
    }
  }
}
```

### 模板 `refs`

在 `vue2` 中我们通过 `this.$refs.root` 来获取对应的元素 `dom`。

下面我们看看在组合式 API 中如何获取。

我们只需要将模板中 `ref` 的属性值和 在 `setup()` 函数中命名的变量名一样即可，那这个变量就代表着这个 `dom` 元素。

可以看到下面的代码， `p` 首先被定义为 `0`， 然后在 `mounted` 阶段发现模板中有存在 `ref` 和变量名一样，则这个 `dom` 赋值给变量。

```html
template>
  <div>
    <p ref="p"></p>
  </div>
</template>
```

```js
import { ref } from 'vue'

export default {
  setup () {
    const p = ref(null)
    console.log(p)

    return {
      p
    }
  }
}
```

**在 `v-for` 中使用**

在 `v-for` 使用， vue 没有做特殊处理， 需要使用 **函数型的 ref** 来处理。当然在单个 `dom` 上使用也是没有问题的。

```html
<div :ref="divFn"></div>
<ul>
  <li v-for="(item, index) in [1, 2, 3]" :key="index" :ref="liFn">{{ item }}</li>  
</ul>  
```

```js
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