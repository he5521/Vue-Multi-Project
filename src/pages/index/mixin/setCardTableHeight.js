var myMixin = {
  updated () {
    this.setTableHeight()
  },
  created () {
    this.setTableHeight()
  },
  mounted () {
    // 表格高度随浏览器窗口改变
    window.onresize = () => {
      return (() => {
        this.setTableHeight()
      })()
    }
  },
  data () {
    return {
      xxxxxxxxxxxxxxl: 200
    }
  },
  methods: {
    setTableHeight () {
      this.$nextTick(() => {
        if (this.$refs.tableWrap === undefined) {
          return
        }
        window.tableHeight = window.innerHeight
        if (this.$refs.btmWrap !== undefined) {
          this.cardTableHeight = window.tableHeight - this.$refs.tableWrap.offsetTop - this.$refs.btmWrap.offsetHeight - 60
        } else {
          this.cardTableHeight = window.tableHeight - this.$refs.tableWrap.offsetTop - 60
        }
      })
    }
  }
}
export default myMixin
