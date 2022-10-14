<template>
  <div class="footer-box" :style="styles">
    <div class="footer-left">
      <h2 class="footer-title">
        <span class="logo-icon">
          <img src="../public/logo.svg" />
        </span>
        江湖录 | <span class="small-tip">孤独的人的江湖路</span>
      </h2>
      <p>本站点所有图片图标资源尽皆都是百度来的， 如有侵权，立删！</p>
      <p>联系email: lxhaweb@163.com</p>
    </div>
    <div class="footer-right"></div>
  </div>
</template>

<script>
export default {
  computed: {
    styles () {
      return this.$frontmatter.isPages ? '' : 'padding-left: 20rem;'
    }
  }
}
</script>

<style scoped>
.footer-box {
  display: flex;
  padding-top: 3.6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 3.6em;
  max-width: 960px;
  margin: 0px auto;
  display: block;
}
.footer-title {
  color: #515151;
  display: inline;
}
.footer-title .logo-icon {
  width: 40px;
  height: 40px;
  overflow: hidden;
  display: inline-block;
}
.footer-title .logo-icon img {
  width: 100%;
  height: 100%;
  transform: scale(1.9);
}
.footer-title .small-tip {
  font-size: 16px;
}
</style>