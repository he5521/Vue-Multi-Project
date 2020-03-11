<template>
  <div class="navList">
    <div class="navItem hamburger"><i class="el-icon-fa-bars" @click="handleSideDrawer" :class="{'active':isSide}"></i></div>
    <div class="navItem nav">
      <ul>
        <li :class="isActive(tag)?'active':''" v-for="(tag, index) in visitedSubViews" :key="index"><router-link :to="{path: tag.path}">{{tag.meta.title}}</router-link></li>
      </ul>
    </div>

    <transition name="side">
      <div class="side-nav" v-show="isSide">
        <div class="side-nav-scroll" ref="sideNavScroll" :style="{ height: `${sideHeight}px` }">
          <el-menu router :default-active="onRoutes">
            <el-menu-item v-for="(tag, i) in subNavs" :index="tag.path" :key="i" :route="{path: tag.path}" :class="onRoutes===tag.path?'is-active':''">
              <i :class="tag.meta.icon"></i>
              <span slot="title">{{tag.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      sideHeight: 400,
      isSide: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'navList'
    ]),
    visitedSubViews () {
      let arr = this.$store.state.tagsView.visitedViews
      let curpRoute = this.$route.meta.pname
      let subViews = [];
      arr.forEach((item)=>{
        if(item.meta.pname === curpRoute){
          subViews.push(item)
        }
      });
      return subViews
    },
    subNavs () {
      let navList = this.navList
      let curRp = this.$route.meta.pname
      let subNavs = [];
      navList.forEach((item)=>{
        if (item.children.length > 1) {
          let child = item.children
          child.forEach((s) => {
            if (curRp === s.name) {
              subNavs = subNavs.concat(s.children)
            }
          })
        } else {
          if (curRp === item.children[0].name) {
            subNavs.push(item.children[0].children[0])
          }
        }
      });
      return subNavs
    },
    onRoutes () {
      return this.$route.path
    }
  },
  mounted () {
    this.setHeight()
    window.onresize = () => {
      return (() => {
        this.setHeight()
      })()
    }
  },
  methods: {
    isActive (route) {
      return route.name === this.$route.name || route.path === this.$route.path
    },
    handleSideDrawer () {
      this.isSide = !this.isSide
    },
    setHeight () {
      window.sideNavHeight = window.innerHeight
      this.sideHeight = window.sideNavHeight - 90
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss"></style>
