<template>
  <div class="footer-box">
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

<style scoped>
.footer-box {
  padding: 40px 0;
  display: flex;
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