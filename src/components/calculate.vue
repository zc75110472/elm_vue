<template>
  <div class='cartcontrol-wrapper'>
    <div class='cartcontrol'>
      <transition name='fadeRotate'>
        <div class='cart-decrease' v-show='num.count > 0' @click.stop='decreaseCart'>
          <span class='icon-remove_circle_outline inner'></span>
        </div>
      </transition>
      <div class='cart-count' v-show='num.count > 0'>{{num.count}}</div>
      <div class='cart-add' @click.stop='addCart($event)'>
        <i class='icon-add_circle'></i>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'calculate',
  props: ['num'],
  methods: {
    addCart (event) {
      console.log(event)
      if (typeof this.num.count === 'undefined') {
        Vue.set(this.num, 'count', 0)
        Vue.set(this.num, 'active', true)
      }
      this.num.count++
      if (this.num.active) {
        this.vxaddCart(this.num)
        this.num.active = !this.num.active
      }
    },
    decreaseCart () {
      this.num.count--
      this.vxdecreaseCart(this.num)
    },
    ...mapMutations(['vxaddCart', 'vxdecreaseCart'])
  },
  computed: {
    ...mapState([
      'vxfood'
    ])
  }
}
</script>

<style scoped>

</style>
