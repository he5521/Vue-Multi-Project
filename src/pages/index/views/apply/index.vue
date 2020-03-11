<template>
  <div class="applyWrap">
    <div class="applyItem" v-for="(item, index) in navList" :key="index">
      <div class="applyTtl"><p>{{item.sysTitle}}</p></div>
      <div class="applyList">
        <div class="applySubCnt">
          <div class="applySubList" v-for="(subItem, index2) in item.children" :key="index2">
            <p class="ttl">{{subItem.meta.title}}</p>
            <div class="applySubItem">
              <div class="item" v-for="(nav, index3) in subItem.children" :key="index3">
                <div :class="`icon ${nav.meta.colorClass}`" @click="toRoute(nav.path)">
                  <!--<i v-if="nav.meta.collect" class="star starShow el-icon-fa-star" @click="cannlCollect(item)"></i>-->
                  <!--<i v-else class="star el-icon-fa-star-o" @click="saveCollect(item)"></i>-->
                  <i :class="`${nav.meta.icon}`"></i></div>
                <div class="navTtl">{{nav.meta.title}}</div>
              </div>
            </div>
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
  methods: {
    toRoute(path) {
      this.$router.push({path: path})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss"></style>
