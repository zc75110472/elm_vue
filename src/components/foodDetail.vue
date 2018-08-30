<template>
  <transition name='move'>
    <div class='detailWrapper' v-show='showDetail' ref='detailWrapper'>
      <div class='foodDetail'>
        <div class='back' @click='showDetail = !showDetail'>
          <i class='icon-arrow_lift'></i>
        </div>
        <img :src='foodetail.image' alt='' height='400' width='100%'>
        <div class='info'>
          <div class='title'>{{foodetail.name}}</div>
          <div class='desc'>
            <span>月售{{foodetail.sellCount}}</span>
            <span>好评率{{foodetail.rating}}%</span>
          </div>
          <div class='price'>¥{{foodetail.price}}</div>
          <div class='shopCart' @click='add' v-show='foodetail.count === 0 || foodetail.count === undefined'>
            <div class='text'>加入购物车</div>
          </div>
          <calculate :num='foodetail' ref='cartcontrol'></calculate>
        </div>
        <div class='divider'></div>
        <div class='desc'>
          <div class='title'>商品介绍</div>
          <div class='content'>{{foodetail.info}}</div>
        </div>
        <div class='divider'></div>
        <div class='evaluation'>
          <div class='title'>商品评价</div>
          <div class='classify'>
            <span v-for='(item, i) in classify' :key='i' class='item' :class='{active: item.active, bad: i === 2, badActive: item.active === true && i === 2}' @click='changeact(item)'>{{item.name}}({{item.count}})</span>
          </div>
          <div class='switch'>
            <span class='icon-check_circle' @click='flag = !flag' :class='{on: flag}'></span>
            <span class='text'>只看有内容的评价</span>
          </div>
          <div class='evel-list'>
            <ul>
              <li class='evel' v-for='(pitem,pi) in comm' :key='pi'>
                <div class='userInfo'>
                  <div class='time'>{{pitem.rateTime}}</div>
                  <div class='user'>
                    <span>{{pitem.user}}</span>
                    <img :src="pitem.avatar" alt="" width='12' height='12'>
                  </div>
                </div>
                <div class='content'>
                  <span class='icon' :class='pitem.rateType ? "icon-thumb_down" : "icon-thumb_up"'></span>
                  <span class='text'>{{pitem.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from 'better-scroll'
import calculate from './calculate'
export default {
  name: 'foodDetail',
  props: ['foodetail'],
  data () {
    return {
      showDetail: false,
      classify: [
        {name: '全部', count: 0, active: true, commont: []},
        {name: '推荐', count: 0, active: false, commont: []},
        {name: '吐槽', count: 0, active: false, commont: []}
      ],
      commonts: [],
      flag: true
    }
  },
  computed: {
    comm () {
      this.updatesc()
      let arrs = []
      if (this.flag) {
        this.commonts.forEach(val => {
          if (val.text.length > 0) {
            arrs.push(val)
          }
        })
        return arrs
      } else {
        return this.commonts
      }
    }
  },
  methods: {
    add () {
      this.$refs.cartcontrol.addCart()
    },
    foodshow () {
      this.showDetail = true
      this.$nextTick(() => {
        if (!this.cs) {
          this.cs = new Scroll(this.$refs.detailWrapper, {
            click: true
          })
        } else {
          this.cs.refresh()
        }
        this.commonts = this.foodetail.ratings
        this.foodetail.ratings.forEach(val => {
          this.classify[0].count++
          this.classify[0].commont.push(val)
          if (val.rateType) {
            this.classify[2].count++
            this.classify[2].commont.push(val)
          } else {
            this.classify[1].count++
            this.classify[1].commont.push(val)
          }
        })
      })
    },
    changeact (canshu) {
      this.commonts = canshu.commont
      this.classify.forEach((val) => {
        val.active = false
      })
      canshu.active = true
    },
    updatesc () {
      this.$nextTick(() => {
        this.cs.refresh()
      })
    }
  },
  components: {
    calculate
  }
}
</script>

<style scoped>

</style>
