<template>
  <div class="use" :style="{'grid-template-columns': `repeat(${slotArr.length}, 78px)`}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    slotArr () {
      return this.$slots.default.filter(slot => slot.tag)
    }
  }
}
</script>

<style scoped>
.use {
  display: inline-grid;
  position: relative;
  padding-top: 0.5em;
  margin-bottom: 20px;
}
</style>