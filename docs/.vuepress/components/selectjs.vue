<template>
  <div class="code-box">
    <div class="code-box-left">
      <div class="code-html">
        <div :id="id"></div>
        <div :class="[{ [`${this.id}-code-actions`]: true }]" style="margin-top: 20px;"></div>
      </div>
      
    </div>
    <div class="code-box-right">
      <div :class="setDesc"></div>
    </div>

    <div class="alert-code">示例代码</div>
  </div>
</template>

<script>
import __Select__ from './select.js'
export default {
  props: {
    id: String,
    datas: Array,
    clear: Boolean,
    type: String,
    maxTagCount: Number,
    maxTagPlaceholder: Function
  },

  data() {
    return {
      tagClassNameMap: {
        code: {
          tag: 'code',
          className: 'code-hljs-me'
        },
        br: {
          tag: 'div',
          className: 'br-hljs-me'
        },
        button: {
          tag: 'button',
          className: 'button-hljs-me'
        }
      }
    }
  },

  computed: {
    setDesc () {
      return ['code-desc', { [`${this.id}-code-desc`]: true }]
    }
  },

  mounted() {
    this.handleDesc()
    this.handleActions()
    this.initSelect()
  },

  methods: {
    handleSlot (nameSlotArr = []) {
      let innerHtml = ''
      let descArr = nameSlotArr.map(i => {
        let text = ''
        if (i.tag && i.children) {
          text = i['children'][0].text
        } else if (i.tag && !i.children) {
          text = ''
        } else {
          text = i.text
        }
        return {
          text: text,
          tag: i.tag,
          target: i
        }
      })

      const Map = this.tagClassNameMap
      descArr.forEach(i => {
        const t = i.tag
        const target = i.target
        const attrObj = target.data && target.data.attrs
        let attrsStr = ''

        if (attrObj) {
          attrsStr = Object.keys(attrObj).map(i => `${i}="${attrObj[i]}"`).join(' ')
        }
        innerHtml += t ? `<${Map[t].tag} ${attrsStr} class="${Map[t].className}">${i.text}</${Map[t].tag}>` : `${i.text}`
      })


      return innerHtml
    },
    handleActions () {
      document.querySelector(`.${this.id}-code-actions`).innerHTML = this.handleSlot(this.$slots.actions)
    },
    handleDesc () {
      document.querySelector(`.${this.id}-code-desc`).innerHTML = this.handleSlot(this.$slots.desc)
    },
    initSelect(instanceCode) {
      const arr = [];
      for (let i = 1; i < 10000; i++) {
        arr.push({
          id: i,
          text: `头条${i}号`,
          coed: "SCOSD" + i,
        });
      }
      window[`$${this.id}`] = new __Select__({
        id: this.id,
        data: this.datas ? this.datas : arr,
        queryKey: 'id',
        clear: this.clear,
        type: this.type,
        maxTagCount: this.maxTagCount,
        maxTagPlaceholder: this.maxTagPlaceholder
      })

      
    }
  }
}
</script>

<style scoped>
.code-box {
  position: relative;
  z-index: 10;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 20px;
  display: flex;
  background: #fff;
}

.code-box:hover {
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
  border-color: transparent;
}

.code-box-left {
  padding: 20px 0;
  border-right: 1px dashed #eee;
}

.code-html {
  padding: 16px;
}

.code-desc {
  padding: 16px;
}

.code-box-right {
  padding: 16px;
  border-left: 1px dashed #eee;
  margin-left: 2px;
}

.alert-code {
  position: absolute;
  z-index: -1;
  bottom: -23px;
  left: 56px;
  padding: 3px 8px;
  border-radius: 2px;
  color: #fff;
  background: #fa795e;
  font-size: 14px;
}

</style>

<style>
.code-hljs-me{
  padding: .2em .4em !important;
  margin: 0 !important;
  font-size: 85% !important;
  background-color: #fff5f5 !important;
  border-radius: 3px !important;
  color: #fa795e !important; 
  font-style: normal !important;
  margin: 0 .2em !important;
}

.br-hljs-me {
  display: block;
  width: 100%;
  height: .5em;
}
.button-hljs-me {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
  color: #515a6e;
  background-color: #fff;
  border-color: #dcdee2;
  color: #fff;
  background-color: #2d8cf0;
  border-color: #2d8cf0;
  outline: #fff;
  margin-bottom: 10px;
}

.button-hljs-me:focus {
  box-shadow: 0 0 0 2px rgba(45,140,240,.2);
}
.button-hljs-me:hover {
  background: #55a2f3;
}
</style>