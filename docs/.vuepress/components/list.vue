<template>
  <div class="list-box">
    <div class="list" v-for="(item, index) in items" :key="index" @click="gotoDesc(item)">
      <span class="dev-tag" v-if="item.devHot">置顶</span>
      <span class="dev-avatar">
        <img src="/avatar.png" alt="">
      </span>
      <span class="dev-time">更新时间 : {{ item.devTime }}</span>
      <p class="dev-title">{{ item.devTitle }}</p>
      <div class="dev-desc">{{ item.devDesc }}</div>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      items: [
        {},{},{}
      ]
    }
  },

  created () {
    const { pages } = this.$site
    console.log(pages)
    this.items = pages.filter(i => i.path !== '/').map(i => {
      return {
        devTime:   i.lastUpdated || '最新的文章',
        devTitle: i.title,
        devDesc: i.frontmatter.description,
        devHot: i.frontmatter.isHot,
        path: i.path
      }
    })

    const hotItem = this.items.filter(i => i.devHot)
    hotItem.sort()
    const unHotTime = this.items.filter(i => !i.devHot)
    console.log(this)
    console.log(this.items)
  },

  methods: {
    gotoDesc (item) {
      this.$router.push(item.path)
    }
  }
}
</script>

<style scoped>
.list-box {
  
}

.list {
  margin-bottom: 16px;
  position: relative;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  transition: all .2s ease-in-out;
  padding: 16px;
}
.dev-time {
  font-size: 12px;
  vertical-align: middle;
  color: #808695;
}
.dev-title {
  margin: 12px 0;
  font-weight: 700;
  font-size: 16px;
}
.dev-desc {
  display: block;
  color: #616776;
  overflow: hidden;
  text-align: justify;
}

.dev-avatar {
  width: 24px;
  height: 24px;
  line-height: 24px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 15px;
}
.dev-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
.dev-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  line-height: 20px;
  background: #f6ffed;
  border-color: #b7eb8f;
  display: inline-block;
  height: 22px;
  margin: 2px 4px 2px 0;
  padding: 0 8px;
  border: 1px solid #e8eaec;
  border-radius: 3px;
  background: #f7f7f7;
  font-size: 12px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  cursor: pointer;
  color: #52c41a!important;
}
</style>