<template>
  <div class="use-option">
    <h4 class="browser-header">
      <slot />
    </h4>

    <div class="released-versions">
      <div class="versions-box" v-for="(item, index) in versionsArr" :key="index">
        <span class="stat-cell" :style="setFont(item)">{{ item && item.split('|')[0] || '' }}</span>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    versions: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      versionsArr: []
    }
  },

  computed: {
    splitStr (str) {
      return str.split('|')
    }
  },

  created () {
    const diff = 4 - this.versions.length
    this.versionsArr = this.fillArr(this.versions, false, 0, diff < 1 ? 0 : diff)
  },
  methods: {
    fillArr (arr, fill, start, end) {
      const a = JSON.parse(JSON.stringify(arr))
      let i = end -start
      while (i--) {
        a.unshift(fill)
      }

      return a
    },

    setFont (item) {
      const fontMap = {
        'false':  'background-color: #DB5600;color: #fff;',
        'true':  'background-color: #2A8436;color: #fff;'
      }
      return item && fontMap[item.split('|')[1]] || ''
    }
  }
}
</script>

<style scoped>
.browser-header {
  position: relative;
  display: flex;
  align-items: center;
  align-self: end;
  justify-content: center;
  min-height: 40px;
  border-bottom-width: 4px;
  border-bottom-style: solid;
  padding-bottom: 2px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #000;
  line-height: 1.2;
  margin: 0px 2px;
  border-color: rgb(56, 88, 132);
}

.released-versions {
  background: rgba(0, 0, 0, 0.03);
  margin: 0px 2px;
}
.versions-box {
  margin: 2px 0;
}

.stat-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
}

</style>