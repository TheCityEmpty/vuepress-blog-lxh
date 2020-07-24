<template>
  <div class="list-box">
    <div class="list" title="点击查看文章详情" v-for="(item, index) in currentItems" :key="index" @click="gotoDesc(item)">
      <span class="dev-tag" v-if="item.devHot">置顶</span>
      <span class="dev-avatar">
        <img src="../public/avatar.png" alt="">
      </span>
      <span class="dev-time">{{ item.devTime }}</span>
      <p class="dev-title">{{ item.devTitle }}</p>
      <div class="dev-desc">{{ item.devDesc }}</div>
      <div class="footer-tag">
        <span v-for="(titem, tindex) in item.devTypes" :key="tindex" class="tag-type">{{ titem }}</span>  
      </div>
    </div>

    <!-- pageing -->
    <div class="pageing" v-if="pages > 1">
      <div class="pageing-box">
        <span
          class="prev pageing-icon"
          title="上一页"
          :class="{ 'pageing-disable': disablePrev }"
          @click="prev">
          <img :src="prevIcon" />
        </span>
        <div class="pageing-list">
          <span
            class="pageing-item"
            :class="{ 'pageing-active': pageParam.currentPage === (index + 1) }"
            v-for="(item, index) in pages"
            @click="changePage(index + 1)">
            {{ index + 1 }}
          </span>
        </div>
        <span
          class="next pageing-icon"
          title="下一页"
          :class="{ 'pageing-disable': disableNext }"
          @click="next">
          <img :src="nextIcon" />
        </span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      items: [],
      pageParam: {
        currentPage: 1,
        size: 10,
        count: 0
      },

      nextIcon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk1NTczMjU3NzY5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwNzYiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTMyMC42NCA4NDguMDVjLTExLjU4LTEzLjM1LTEwLjE0LTMzLjU2IDMuMjItNDUuMTRsMzMxLjM4LTI4Mi4xYzQuNjEtNCA0LjYtMTEuMTctMC4wNC0xNS4xNEwzMjMuODEgMjIxLjE5Yy0xMy40MS0xMS41MS0xNC45NS0zMS43MS0zLjQ0LTQ1LjEyIDExLjUxLTEzLjQxIDMxLjcxLTE0Ljk1IDQ1LjEyLTMuNDRsMzc4Ljg4IDMyNS4yNWM5LjI3IDcuOTYgOS4zIDIyLjI5IDAuMDcgMzAuMjlsLTM3OC42OCAzMjMuMWMtMTMuMzQgMTEuNTctMzMuNTUgMTAuMTMtNDUuMTItMy4yMnoiIHAtaWQ9IjIwNzciIGZpbGw9IiM1MTUxNTEiPjwvcGF0aD48L3N2Zz4=',
      prevIcon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk1NTczMjMzMTAzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3MTAiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTcwMy4zNiAxNzUuOTVjMTEuNTggMTMuMzUgMTAuMTQgMzMuNTYtMy4yMiA0NS4xNGwtMzMxLjM4IDI4Mi4xYy00LjYxIDQtNC42IDExLjE3IDAuMDQgMTUuMTRsMzMxLjM5IDI4NC40OGMxMy40MSAxMS41MSAxNC45NSAzMS43MSAzLjQ0IDQ1LjEyLTExLjUxIDEzLjQxLTMxLjcxIDE0Ljk1LTQ1LjEyIDMuNDRMMjc5LjYyIDUyNi4xMmMtOS4yNy03Ljk2LTkuMy0yMi4yOS0wLjA3LTMwLjI5bDM3OC42OC0zMjMuMWMxMy4zNS0xMS41NyAzMy41Ni0xMC4xMyA0NS4xMyAzLjIyeiIgcC1pZD0iMTcxMSIgZmlsbD0iIzUxNTE1MSI+PC9wYXRoPjwvc3ZnPg=='
    }
  },
  
  computed: {
    pages () {
      return Math.floor(this.pageParam.count / this.pageParam.size)
    },
    disablePrev () {
      return this.pageParam.currentPage === 1
    },
    disableNext () {
      return this.pageParam.currentPage === this.pages
    },
    currentItems () {
      const { currentPage, size } = this.pageParam
      const start = (currentPage - 1) * size
      return this.items.slice(start, start + size)
    }
  },

  created () {
    const { pages } = this.$site
    console.log(pages)

    this.items = this.filterHome(pages)
    this.sortHotAndTime()

    this.setPageing()
  },

  methods: {
    gotoDesc (item) {
      this.$router.push(item.path)
    },

    filterHome (pages) {
      return pages.filter(i => !i.frontmatter.isPages).map(i => {
        const lastDate = i.lastUpdated && new Date(i.lastUpdated).getTime()
        return {
          timeStamp: lastDate || Infinity,
          devTime: i.lastUpdated || '最新文章',
          devTitle: i.title,
          devDesc: i.frontmatter.description,
          devHot: i.frontmatter.isHot,
          devTypes: i.frontmatter.types || [],
          path: i.path
        }
      })
    },

    sortHotAndTime () {
      const hotItem = this.items.filter(i => i.devHot)
      const unHotTime = this.items.filter(i => !i.devHot)

      this.items = [
        ...hotItem.sort((a, b) => { return b.timeStamp - a.timeStamp }),
        ...unHotTime.sort((a, b) => { return a.timeStamp - b.timeStamp })
      ]
    },

    setPageing () {
      this.$set(this.pageParam, 'count', (this.items || []).length)
    },

    prev () {
      if (this.disablePrev) return
      this.currentPageChange(--this.pageParam.currentPage)
    },

    next () {
      if (this.disableNext) return
      this.currentPageChange(++this.pageParam.currentPage)
    },

    changePage (val) {
      this.currentPageChange(val)
    },

    currentPageChange (val) {
      this.$set(this.pageParam, 'currentPage', val)
    }
  }
}
</script>

<style scoped>
.list-box {
  padding-bottom: 100px;
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
.list:hover {
  box-shadow: 0 5px 5px 0 rgba(0,0,0,.3);
  cursor: pointer;
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

.footer-tag {
  margin-top: 12px;
}
.tag-type {
  display: inline-block;
  margin: 2px 4px 2px 0;
  padding: 0 8px;
  border: 1px solid #e8eaec;
  border-radius: 3px;
  font-size: 12px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  cursor: pointer;
  height: 24px;
  line-height: 24px;
  border: 1px solid #e8eaec;
  color: #515a6e;
  background: #fff;
  position: relative;
}

.pageing {
  padding: 20px 0;
}
.pageing, .pageing-list {
  display: flex;
  justify-content: center;
  align-items: center;
}
.pageing-list {
  padding: 0 20px;
}
.pageing-box {
  display: flex;
}
.pageing-item {
  color: #515151;
  padding: 0 15px;
  margin: 0 10px;
  font-size: 20px;
  transition: all .2s ease-in-out;
}
.pageing-item:hover {
  cursor: pointer;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
}
.pageing-item.pageing-active {
  font-size: 24px;
  color: #19be6b;
}
.pageing-icon {
  width: 40px;
  height: 40px;
  padding: 6px;
  border: 2px solid #515151;
  border-radius: 100%;
  cursor: pointer;
}

.pageing-disable.pageing-icon {
  background: #ccc;
  border-color: #ccc;
  cursor: not-allowed;
}

</style>