<template>
  <div class='seller-wrapper' ref='sellerWraper'>
    <div class='seller-content'>
      <div class='info'>
        <div class='title'>
          <div class='text'>{{datas.seller.name}}</div>
          <div class='star-wrapper'>
            <star :score='datas.seller.score' :size='36'></star>
            <div class='rate-count'>{{datas.seller.ratingCount}}</div>
            <div class='sell-count'>月售{{datas.seller.sellCount}}单</div>
          </div>
          <div class='collect' @click='show = !show'>
            <span class='icon-favorite' :class='{active: show}'></span>
            <span class='text'>{{show? '已收藏': '收藏'}}</span>
          </div>
          <div class='remark'>
            <div class='block'>
              <h2>起送价</h2>
              <div class='content'>
                <span class='num'>{{datas.seller.minPrice}}</span>元
              </div>
            </div>
            <div class='block'>
              <h2>商家配送</h2>
              <div class='content'>
                <span class='num'>{{datas.seller.deliveryPrice}}</span>元
              </div>
            </div>
            <div class='block'>
              <h2>平均配送时间</h2>
              <div class='content'>
                <span class='num'>{{datas.seller.deliveryTime}}</span>分钟
              </div>
            </div>
          </div>
          <div class='activities'>
            <div class='bulletin'>
              <h1>公告与活动</h1>
              <div class='content'>{{datas.seller.bulletin}}</div>
            </div>
          </div>
          <div class='supports'>
            <ul>
              <li v-for='(item, i) in datas.seller.supports' :key='i' class='item'>
                <span class='iconMap' :class='icon[item.type]'></span>
                <span class='text'>{{item.description}}</span>
              </li>
            </ul>
          </div>
          <div class='divider'></div>
          <div class='seller-info'>
            <h1>商家信息</h1>
            <ul class='info-list'>
              <li v-for='(itt, i) in datas.seller.infos' :key='i' class='info'>
                {{itt}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from './star'
import Icon from '@/assets/icon'
import Scroll from 'better-scroll'
export default {
  name: 'Seller',
  props: ['datas'],
  data () {
    return {
      show: false,
      icon: Icon
    }
  },
  mounted () {
    /* eslint-disable no-new */
    new Scroll(this.$refs.sellerWraper, {
      click: true
    })
  },
  components: {
    star
  }
}
</script>

<style scoped>

</style>
