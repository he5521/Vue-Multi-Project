<template>
  <div class="collectList" v-if="item.children && item.children.length" v-show="isTtlVis">
    <p class="ttl">{{item.meta.title}}</p>
    <div class="collectItem">
    <ul v-for="(subNavs,index) in navs" :key="index">
      <template v-for="(subItem,i) in subNavs">
        <nav-item :key="i" :item="subItem" v-show="subItem.meta.collect"></nav-item>
      </template>
    </ul>
    </div>
  </div>
  <li v-else><router-link :to="{path: item.path}">{{item.meta.title}}</router-link></li>
</template>
<script>
export default {
  name: 'navItem',
  props: ['item'],
  computed: {
    isTtlVis () {
      let flag = false
      this.item.children.forEach((item) => {
        if (item.meta.collect) {
          flag = true
        }
      })
      return flag
    },
    navs () {
      const navs = []
      this.item.children.forEach((item, index) => {
        if (item.meta.collect) {
          const nav = Math.floor(index / 5)
          if (!navs[nav]) {
            navs[nav] = []
          }
          navs[nav].push(item)
        }
      })
      return navs
    }
  }
}
</script>
