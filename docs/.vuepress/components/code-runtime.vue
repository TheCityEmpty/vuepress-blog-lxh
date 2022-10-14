<template>
  <div class="code-runtime-box">

  </div>
</template>

<script>
export default {
  mounted () {
    // setTimeout(() => {
      // const codeBlock = document.querySelectorAll('div.language-js')
      // console.log(codeBlock)
      // for (let dom of codeBlock) {
      //   console.log(0)
      //   const cbChildren = dom.getElementsByClassName('language-js')[0]
      //   const btn = document.createElement('button')
      //   btn.innerText = '点击运行代码'
      //   btn.style= 'position: absolute; top: 2px;right: 50px;'
      //   btn.setAttribute('code', cbChildren.getAttribute('data-code'))
      //   dom.append(btn)
      // }
    // }, 2000)
  }
  
}
</script>

<style scoped>
.code-runtime-box {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>