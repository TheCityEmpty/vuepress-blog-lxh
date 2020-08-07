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
    this.items = this.filterSortPage(pages)
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
      let r = Math.floor(Math.random() * 150 + 50)
      let g = Math.floor(Math.random() * 150 + 50)
      let b = Math.floor(Math.random() * 150 + 50)
      let a = Math.random() * 0.5 + 0.1
      return `background: rgba(${r}, ${g}, ${b}, ${a})`
    }
  }
}
</script>

<style scoped>
.category .header {
  padding: 15px;
  color: #fff;
  border-radius: 4px;
}

.aitem-date {
  font-size: 12px;
  color: #ccc;
}
</style>