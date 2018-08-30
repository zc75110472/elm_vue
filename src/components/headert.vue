<template>
  <div id='headert' class='header'>
    <div class='content-wrapper' v-if='selmesg.supports'>
      <div class="avatar">
        <img :src="selmesg.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <p class="title">
          <span class="brand"></span>
          <span class="name">{{selmesg.name}}</span>
        </p>
        <div class="description">{{selmesg.description}} / {{selmesg.deliveryTime}}分钟送达</div>
        <div class='supports'>
          <div class="supports_desc">
            <span class='icon decrease'></span>
            <span class='text' v-if='selmesg.supports'>{{selmesg.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div class='support-count' @click='flag = !flag'>
        <span class='count'>{{selmesg.supports.length + '个'}}</span>
        <i class='icon-keyboard_arrow_right'></i>
      </div>
    </div>
    <div class='bulletin-wrapper' @click='flag = !flag'>
      <span class='bulletin-title'></span>
      <span class='bulletin-text'>{{selmesg.bulletin}}</span>
      <i class='icon-keyboard_arrow_right'></i>
    </div>
    <div class='background'>
      <img :src="selmesg.avatar" alt="" width="100%" height="100%">
    </div>
    <transition name='fade' mode="out-in">
      <div class='detail' v-show='flag'>
        <div class='detail-wrapper clearfix'>
          <div class="detail-main">
            <h2 class='name'>{{selmesg.name}}</h2>
            <div class='star-wrapper'>
              <!-- 评分 -->
              <Star :score='selmesg.score' :size='48'></Star>
            </div>
            <div class='title'>
              <div class='line'></div>
              <div class='text'>优惠信息</div>
              <div class='line'></div>
            </div>
            <ul class='supports'>
              <li class='support-item' v-for='(item,i) in selmesg.supports' :key='i'>
                <span class='icon' :class='icon[item.type]'></span>
                <span class='text'>{{item.description}}</span>
              </li>
            </ul>
            <div class='title'>
              <div class='line'></div>
              <div class='text'>商家公告</div>
              <div class='line'></div>
            </div>
            <div class='bulletin'>{{selmesg.bulletin}}</div>
          </div>
        </div>
        <div class='detail-close' @click='flag = false'>
          <i class='icon-close'></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Star from './star'
import Icon from '@/assets/icon'
export default {
  name: 'headert',
  data () {
    return {
      icon: Icon,
      flag: false
    }
  },
  props: ['selmesg'],
  components: {
    Star
  }
}
</script>
<style scoped>

</style>
