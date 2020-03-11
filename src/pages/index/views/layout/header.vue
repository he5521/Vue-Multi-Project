<template>
  <div class="navList">
    <div class="navItem collect">
          <span @click="handleDrawer">
            <i v-if="!isCollect" class="fa el-icon-fa-folder-o"></i>
            <i v-else class="fa el-icon-fa-folder-open-o"></i>
            <i class="el-icon-fa-angle-down el-icon--right"></i>
          </span>
    </div>
    <div class="navItem nav line">
      <ul>
        <li :class="routeName === 'home' ? 'active' : ''"><router-link :to="{path: '/home'}">首页</router-link></li>
        <li :class="routeName === 'apply' ? 'active' : ''"><router-link :to="{path: '/apply'}">应用</router-link></li>
      </ul>
    </div>
    <div class="navItem nav">
      <ul>
        <li :class="isActive(tag[0])?'active':''" v-for="(tag, index) in visitedViews" :key="index"><router-link :to="{path: goHisPath(tag)}">{{tag[0].meta.ptitle}}</router-link></li>
      </ul>
    </div>
    <div class="navItem rightNav">
      <ul class="line">
        <li>财务系统</li>
        <li>资金系统</li>
      </ul>
      <el-popover
        popper-class="userWrap"
        placement="bottom"
        width="200"
        trigger="hover">
        <div class="userInfo"><el-tag>{{username}} ({{empcode}})</el-tag></div>
        <el-divider></el-divider>
        <div class="logout" @click="logout"><i class="el-icon-fa-sign-out"></i> 退出</div>
        <el-avatar size="small" icon="el-icon-fa-user-o" slot="reference"></el-avatar>
      </el-popover>
    </div>
    <!-- 常用菜单 -->
    <el-collapse-transition>
      <div class="collectWrap" v-show="isCollect">
        <h2>常用菜单<el-button type="text" class="setBtn" @click="openCollect"><i class="el-icon-fa-cog"></i></el-button></h2>
        <div class="collectCnt">
          <collect-navs v-for="(item, index) in collectNavList" :item="item" :key="index"></collect-navs>
        </div>
      </div>
    </el-collapse-transition>
    <!-- 配置常用菜单 弹窗 -->
    <eaDialog v-if="isDialogFolder" :visible="dialogVisible" :appendToBody="true" size="middle" title="配置常用菜单" @handleClose="dialogClose('dialogVisible', 'isDialogFolder')">
      <template slot="body">
        <set-navs @listenToNavs="listenNavs"></set-navs>
      </template>
      <template slot="footer">
        <el-button @click="dialogClose('dialogVisible', 'isDialogFolder')">取 消</el-button>
        <el-button type="primary" @click="setNavList">确 定</el-button>
      </template>
    </eaDialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import collectNavs from './collectNavs'
import setNavs from './setNavs'
import eaDialog from '@/components/eaDialog'
export default {
  components: { collectNavs, setNavs, eaDialog },
  data () {
    return {
      navs: [],
      dialogVisible: false,
      isDialogFolder: false,
      isCollect: false,
      reloadCollectNav: true
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'navList'
    ]),
    visitedViews () {
      let arr = this.$store.state.tagsView.visitedViews
      let obj = {};
      arr.forEach((e)=>{
        if(typeof obj[e['meta']['pname']]=='undefined'){
          obj[e['meta']['pname']] = []
        }
        obj[e['meta']['pname']].push(e)
      });
      return Object.values(obj)
    },
    collectNavList () {
      let navArr = []
      for (let i in this.navList) {
        let items = this.navList[i].children
        for (let k in items) {
          navArr.push(items[k])
        }
      }
      return navArr
    },
    username () {
      if (this.userInfo.employee) {
        return this.userInfo.employee.name
      } else {
        return ''
      }
    },
    empcode () {
      if (this.userInfo.employee) {
        return this.userInfo.employee.empcode
      } else {
        return ''
      }
    },
    routeName () {
      return this.$route.name
    }
  },
  watch: {
    $route () {
      this.addViewTags()
    },
    routeName () {  // 路由变更的时候关闭 常用菜单弹出层
      this.isCollect = false
    }
  },
  mounted () {
    this.addViewTags()
  },
  methods: {
    isActive (route) {
      return route.meta.pname === this.$route.meta.pname || route.meta.ptitle === this.$route.meta.ptitle
    },
    goHisPath (routes) {
      let path = routes[0].path
      routes.forEach(item => {
        console.log(item)
        if (item.isCur === true) {
          path = item.path
        }
      })
      console.log(path)
      return path
    },
    generateRoute () {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    addViewTags () {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    listenNavs (arr) {
      this.navs = arr
    },
    setNavList () {
      this.$store.dispatch('setNavList', this.navs).then(() => {
        this.isDialogFolder = false
        this.reloadCollectNav = false
        this.$nextTick(() => {
          this.dialogVisible = false
          this.reloadCollectNav = true
        })
      })
    },
    openCollect () {
      this.isDialogFolder = true
      this.$nextTick(() => {
        this.dialogVisible = true
      })
    },
    dialogClose (visible, folder) {
      this[visible] = false
      this.$nextTick(() => {
        this[folder] = false
      })
    },
    handleDrawer () {
      this.isCollect = !this.isCollect
    },
    logout () {
      const empno = {
        empno: this.userInfo.employee.empno
      }
      this.$store.dispatch('LogOut', empno).then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss"></style>
