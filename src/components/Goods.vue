<template>
  <div class='goods'>
    <div class="menu-wrapper" ref='menuWrapper'>
      <ul>
        <li class='menu-item' v-for='(item,i) in datas.goods' :key='i'>
          <span class='text'>
            <span class='iconMap' v-show='item.type > 0' :class='icon[item.type]'></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='foodsWrapper'>
      <ul>
        <li class='food-list food-list-hook' v-for='(item,i) in datas.goods' :key='i'>
          <h1 class='title'>{{ item.name }}</h1>
          <ul>
            <li class='food-item' v-for='(foodItem,index) in item.foods' :key='index' @click='showdd(foodItem)'>
              <div class='icon'>
                <img :src="foodItem.icon" alt="" width='57' height='57'>
              </div>
              <div class='content'>
                <h2 class='name'>{{foodItem.name}}</h2>
                <p class='description'>{{foodItem.description}}</p>
                <div class='sell-info'>
                  <span class='sellCount'>月售{{foodItem.sellCount}}份</span>
                  <span class='rating'>好评率{{foodItem.rating}}%</span>
                  <div class='price'>
                    <span class='newPrice'>
                      <span class='unit'>¥</span>{{foodItem.price}}
                    </span>
                    <span style='display: none;'></span>
                  </div>
                  <calculate :num='foodItem'></calculate>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :mesg='datas.seller' :arr='food'></shopcart>
    <foodDetail ref='foodDetail' :foodetail='foodd'></foodDetail>
  </div>
</template>
<script>
import Icon from '@/assets/icon.js'
import Scroll from 'better-scroll'
import shopcart from './shopcart'
import calculate from './calculate'
import foodDetail from './foodDetail'
export default {
  props: ['datas'],
  data () {
    return {
      icon: Icon,
      foodd: {}
    }
  },
  computed: {
    food () {
      let arr = []
      // 1 value 2 index
      this.datas.goods.forEach(value => {
        value.foods.forEach(val => {
          if (val.count > 0) {
            arr.push(val)
          }
        })
      })
      return arr
    }
  },
  methods: {
    scroll () {
      // dom更新完之后
      /* eslint-disable no-new */
      new Scroll(this.$refs.foodsWrapper, {
        click: true
      })
      new Scroll(this.$refs.menuWrapper, {
        click: true
      })
    },
    showdd (val) {
      this.$refs.foodDetail.foodshow()
      this.foodd = val
    }
  },
  components: {
    shopcart,
    calculate,
    foodDetail
  }
}
</script>
