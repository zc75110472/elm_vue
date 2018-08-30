<template>
  <div class='ratingsWrapper' ref='lill'>
    <div class='ratings-content'>
      <div class='info'>
        <div class='mark'>
          <div class='num'>{{datas.seller.score}}</div>
          <div class='text'>综合评分</div>
          <div class='contrast'>{{datas.seller.rankRate}}</div>
        </div>
        <div class='stars'>
          <div class='serviceScore'>
            <span class='text'>服务态度</span>
            <star :score='datas.seller.serviceScore' :size='36'></star>
            <span class='num'>{{datas.seller.serviceScore}}</span>
          </div>
          <div class='foodScore'>
            <span class='text'>商品评分</span>
            <star :score='datas.seller.foodScore' :size='36'></star>
            <span class='num'>{{datas.seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="text">送达时间</span>
            <span class="time">{{datas.seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class='divider'></div>
      <div class='evaluation'>
        <div class='classify'>
          <span v-for='(item, i) in classify' :key='i' class='item' :class='{active: item.active, bad: i === 2, badActive: i === 2 && item.active}' @click='changeon(item)'>
            {{item.name}}({{item.count}})
          </span>
        </div>
        <div class='switch'>
          <span class='icon-check_circle' :class='{on: flag}' @click='flag = !flag'></span>
          <span class='text'>只看有内容的评价</span>
        </div>
        <div class='evel-list'>
          <ul>
            <li v-for='(itt, i) in commm' class='evel' :key='i'>
              <div class='avatar'>
                <img :src="itt.avatar" alt="" width='28' height='28'>
              </div>
              <div class='content'>
                <div class='user'>
                  <span class='name'>{{itt.username}}</span>
                  <span class='rateTime'>{{itt.rateTime | getDateDiff}}</span>
                </div>
                <div class='star-wrapper'>
                  <star :size='24' :score='itt.score'></star>
                  <span class="deliveryTime">{{itt.deliveryTime | filterss}}分钟送达</span>
                </div>
                <div class='text'>{{itt.text}}</div>
                <div class='recommend'>
                  <span class='icon' :class='itt.rateType?"icon-thumb_down":"icon-thumb_up"'></span>
                  <span class='dish' v-for='(dish,ii) in itt.recommend' :key='ii'>{{dish}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import star from './star'
import Scroll from 'better-scroll'
export default {
  name: 'ratings',
  props: ['datas'],
  filters: {
    filterss (val) {
      if (val) {
        return val
      } else {
        return 0
      }
    },
    getDateDiff (dateTimeStamp) {
      var result = ''
      var minute = 1000 * 60
      var hour = minute * 60
      var day = hour * 24
      var month = day * 30
      var year = month * 12
      var now = new Date().getTime()
      var diffValue = now - dateTimeStamp
      if (diffValue < 0) { return }
      var yearC = diffValue / year
      var monthC = diffValue / month
      var weekC = diffValue / (7 * day)
      var dayC = diffValue / day
      var hourC = diffValue / hour
      var minC = diffValue / minute
      if (yearC >= 1) {
        result = '' + parseInt(yearC) + '年前'
      } else if (monthC >= 1) {
        result = '' + parseInt(monthC) + '月前'
      } else if (weekC >= 1) {
        result = '' + parseInt(weekC) + '周前'
      } else if (dayC >= 1) {
        result = '' + parseInt(dayC) + '天前'
      } else if (hourC >= 1) {
        result = '' + parseInt(hourC) + '小时前'
      } else if (minC >= 1) {
        result = '' + parseInt(minC) + '分钟前'
      } else result = '刚刚'
      return result
    }
  },
  data () {
    return {
      ratings: [],
      classify: [
        {name: '全部', active: true, count: 0, comonent: []},
        {name: '推荐', active: false, count: 0, comonent: []},
        {name: '吐槽', active: false, count: 0, comonent: []}
      ],
      flag: true,
      commonts: []
    }
  },
  computed: {
    commm () {
      if (this.flag) {
        let arrs = []
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
  mounted () {
    this.$http.get('/static/data.json').then(res => {
      this.ratings = res.data.ratings
      this.commonts = this.ratings
      this.ratings.forEach(val => {
        this.classify[0].count++
        this.classify[0].comonent.push(val)
        if (val.rateType) {
          this.classify[2].count++
          this.classify[2].comonent.push(val)
        } else {
          this.classify[1].count++
          this.classify[1].comonent.push(val)
        }
      })
      this.$nextTick(() => {
        if (!this.cs) {
          this.cs = new Scroll(this.$refs.lill, {
            click: true
          })
        } else {
          this.cs.refresh()
        }
      })
    })
  },
  // 每次加载这个组件就会执行
  activated () {
  },
  components: {
    star
  },
  methods: {
    changeon (item) {
      this.classify.forEach(val => {
        val.active = false
      })
      this.commonts = item.comonent
      item.active = true
    }
  }
}
</script>
<style>

</style>
