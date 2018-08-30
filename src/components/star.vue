<template>
  <div class='star' :class='"star-"+size'>
    <span class='star-item' :class="item" v-for='(item,i) in kps' :key='i'></span>
  </div>
</template>
<script>
export default {
  name: 'star',
  computed: {
    kps () {
      let arr = []
      // 获取整数部分 向下取整
      let num = Math.floor(this.score)
      // 获取小数部分
      let xiaoshu = this.score - num
      for (let i = 0; i < num; i++) {
        arr.push('on')
      }
      if (xiaoshu >= 0.5) {
        arr.push('half')
      }
      while (arr.length < 5) {
        arr.push('off')
      }
      return arr
    }
  },
  props: ['score', 'size']
}
</script>
<style scoped>

</style>
