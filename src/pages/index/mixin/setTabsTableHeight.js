var myMixin = {
  updated () {
    this.setTabsTableHeight()
  },
  created () {
    this.setTabsTableHeight()
  },
  mounted () {
    // 表格高度随浏览器窗口改变
    window.onresize = () => {
      return (() => {
        this.setTabsTableHeight()
      })()
    }
  },
  data () {
    return {
      tabsTableHeight: 200
    }
  },
  methods: {
    setTabsTableHeight () {
      this.$nextTick(() => {
        if (this.$refs.tableWrap === undefined) {
          return
        }
        window.tableHeight = window.innerHeight
        if (this.$refs.btmWrap !== undefined) {
          this.tabsTableHeight = window.tableHeight - this.$refs.tableWrap.offsetTop - this.$refs.btmWrap.offsetHeight - 110
        } else {
          this.tabsTableHeight = window.tableHeight - this.$refs.tableWrap.offsetTop - 110
        }
      })
    }
  }
}
export default myMixin
