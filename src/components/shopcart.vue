<template>
  <div class='shopCart'>
      <div class='content'>
        <div class='content-left' @click='showa'>
          <div class='logo-wrapper'>
            <div class='logo active'>
              <i class='icon-shopping_cart'></i>
            </div>
            <div class='badge' v-show='totalPrice > 0'>{{totalCount}}</div>
          </div>
          <div class='price' :class='{active: totalPrice}'>¥{{totalPrice}}</div>
          <div class='desc' v-show='totalPrice < 99'>另需配送费¥{{mesg.deliveryPrice}}元</div>
        </div>
        <div class='content-right' :class='{enough: totalPrice >= mesg.minPrice}'>
          <div class='pay'>{{chaa}}</div>
        </div>
      </div>
      <transition name='transHeight'>
        <div class='shopcart-list' v-show='totalPrice > 0 && show'>
          <div class='list-header'>
            <h1 class='title'>购物车</h1>
            <span class='empty' @click='empty'>清空</span>
          </div>
          <div class='list-content' ref='listContent'>
            <ul>
              <li class='food' v-for='(item,i) in arr' :key='i'>
                <span class='name'>{{item.name}}</span>
                <div class='price'>
                  <span>¥{{item.price}}</span>
                </div>
                <calculate :num='item'></calculate>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import calculate from './calculate'
import Scroll from 'better-scroll'
export default {
  name: 'shopcart',
  props: ['mesg', 'arr'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    empty () {
      this.arr.forEach(val => {
        val.count = 0
      })
      this.show = false
    },
    showa () {
      this.show = !this.show
      if (!this.ccc) {
        this.$nextTick(() => {
          this.ccc = new Scroll(this.$refs.listContent, {
            click: true
          })
        })
      } else {
        this.ccc.refresh()
      }
    }
  },
  components: {
    calculate
  },
  computed: {
    totalPrice () {
      let tP = 0
      this.arr.forEach(val => {
        tP += val.price * val.count
      })
      return tP
    },
    totalCount () {
      let cc = 0
      this.arr.forEach(val => {
        cc += val.count
      })
      return cc
    },
    chaa () {
      let cha = this.totalPrice
      if (cha < 20) {
        cha = this.mesg.minPrice - this.totalPrice
        return `还差¥${cha}元起送`
      } else {
        return '去结算'
      }
    }
  }
}
</script>

<style scoped>

</style>
