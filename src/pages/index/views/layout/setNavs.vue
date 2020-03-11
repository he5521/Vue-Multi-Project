<template>
  <div>
    <div class="collectWrap" v-for="(item, index) in navArr" :key="index">
      <h2><span>{{item.sysTitle}}</span></h2>
      <div class="collectCnt">
        <div class="collectList" v-for="(subItem, index2) in item.children" :key="index2">
          <p class="ttl">{{subItem.meta.title}}</p>
          <div class="collectItem">
            <ul v-for="(subNavs, index) in dimensionalArrs(subItem.children)" :key="index">
              <template v-for="(nav, i) in subNavs">
                <li :key="i"><el-checkbox v-model="nav.meta.collect" :label="nav.meta.title" @change="check"></el-checkbox></li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'navList'
    ])
  },
  data () {
    return {
      navArr: []
    }
  },
  created () {
    this.navArr = JSON.parse(JSON.stringify(this.navList))
  },
  methods: {
    check () {
      // 上传变更数据
      this.$emit('listenToNavs', this.navArr)
    },
    dimensionalArrs (arr) {
      const arrs = []
      arr.forEach((item, index) => {
        const i = Math.floor(index / 5)
        if (!arrs[i]) {
          arrs[i] = []
        }
        arrs[i].push(item)
      })
      return arrs
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss"></style>

