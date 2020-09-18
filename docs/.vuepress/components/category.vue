<template>
  <div class="category">
    <div class="box" v-for="item in items">
      <div class="header" :style="`${randomRgbaColor()}`">
        {{ item.type }}
      </div>

      <ul class="content">
        <li class="aitem" v-for="aitem in item.children">
          <a :href="aitem.path">{{ aitem.title }}</a>
          <div class="aitem-date">{{ aitem.lastUpdated }}</div>
        </li>
      </ul> 
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  created () {
    const { pages } = this.$site
    this.items = this.filterSortPage(pages).map(item => {
      let child = item.children
      child = child.sort((a, b) => {
        const at = a.frontmatter.endTime && new Date(a.frontmatter.endTime).getTime() || Infinity
        const bt = b.frontmatter.endTime && new Date(b.frontmatter.endTime).getTime() || Infinity
        return bt - at
      })
      return {
        type: item.type,
        children: child
      }
    })
  },
  methods: {
    filterSortPage (arr) {
      let filterPage = arr.filter(i => !i.frontmatter.isPages)
      let resArr = []

      filterPage.forEach(item => {
        const type = item.path.match(/^\/\w+\//g)[0].replace(/\//g, '')
        const index = resArr.findIndex(i => i.type === type)
        if (index === -1) {
          resArr.push({
            type,
            children: [item]
          })
        } else {
          resArr[index].children.push(item)
        }
      })

      return resArr
    },
    randomRgbaColor (){
      let r = this.getRandom(200, 50)
      let g = this.getRandom(200, 50)
      let b = this.getRandom(200, 50)
      let a = this.getRandom(0.6, 0.1)
      let deg = this.getRandom(3, -3)
      return `background: rgba(${r}, ${g}, ${b}, ${a});transform: rotate(${deg}deg);`
    },

    getRandom (max, min) {
      return Math.random() * (max - min) + min
    }
  }
}
</script>

<style scoped>
.category .header {
  padding: 15px;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 8px 4px 0 rgba(0,0,0,.04);
}

.aitem-date {
  font-size: 12px;
  color: #ccc;
}
</style>