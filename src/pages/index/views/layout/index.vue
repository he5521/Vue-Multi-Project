<template>
<div class="wrapper">
  <el-container>
    <el-header height="50px">
      <ea-header></ea-header>
    </el-header>
    <el-container :class="isSubHeader ? 'is-vertical' : ''">
      <el-header v-if="isSubHeader" class="el-sub-header" height="40px">
        <ea-sub-header></ea-sub-header>
      </el-header>
      <div class="ea-container" ref="container" :style="`height: ${containerHeight}px`">
        <el-main>
          <keep-alive :include="cachedViews">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </div>
    </el-container>
  </el-container>
</div>
</template>
<script>
import eaHeader from './header.vue'
import eaSubHeader from './subHeader.vue'
export default {
  components: {
    eaHeader, eaSubHeader
  },
  data () {
    return {
      containerHeight: 400
    }
  },
  computed: {
    cachedViews () {
      console.log(this.$store.state.tagsView.cachedViews)
      return this.$store.state.tagsView.cachedViews
    },
    isSubHeader () {
      return this.$route.name !== 'home' && this.$route.name !== 'apply'
    }
  },
  mounted () {
    this.setContainerHeight()
    window.onresize = () => {
      return (() => {
        this.setContainerHeight()
      })()
    }
  },
  methods: {
    setContainerHeight () {
      this.$nextTick(() => {
        this.containerHeight = window.innerHeight - this.$refs.container.offsetTop
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss"></style>
