var myMixin = {
  updated () {
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
      tableHeight: 200
    }
  },
  methods: {
    setTableHeight () {
      this.$nextTick(() => {
        window.tableHeight = window.innerHeight
        if (this.$refs.btmWrap !== undefined) {
          this.tableHeight = window.tableHeight - this.$refs.tableWrap.offsetTop - this.$refs.btmWrap.offsetHeight - 90
        } else {
          this.tableHeight = window.tableHeight - this.$refs.tableWrap.offsetTop - 90
        }
      })
    }
  }
}
export default myMixin
