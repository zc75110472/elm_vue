<template>
  <div id="app">
    <Headert :selmesg='datas.seller'></Headert>
    <div id='tab'>
      <ul class='tab'>
        <li class='tab-item'>
          <router-link to='/goods'>商品</router-link>
        </li>
        <li class='tab-item'>
          <router-link to='/ratings'>评论</router-link>
        </li>
        <li class='tab-item'>
          <router-link to='/seller'>商家</router-link>
        </li>
      </ul>
    </div>
    <!-- 把加载过的组件缓存起来 -->
    <keep-alive>
      <router-view :datas='datas' ref='abc'></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Headert from './components/headert'
export default {
  name: 'App',
  data () {
    return {
      datas: {
        seller: {},
        ratings: [],
        goods: []
      }
    }
  },
  methods: {
    getData () {
      this.$http.get('/static/data.json').then(result => {
        this.datas = result.data
        console.log(this.datas)
        this.$nextTick(() => {
          this.$refs.abc.scroll()
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getData()
  },
  components: {
    Headert
  }
}
</script>
<!-- 当前这个模板和当前模板下的字模板都用这个样 -->
<style>
.tab-item a.router-link-active {
  color: #f01414;
}
</style>
