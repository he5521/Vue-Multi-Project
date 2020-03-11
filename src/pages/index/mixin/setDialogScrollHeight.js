var myMixin = {
  updated () {
    this.setDialogScrollHeight()
  },
  created () {
    this.setDialogScrollHeight()
  },
  mounted () {
    // 表格高度随浏览器窗口改变
    window.onresize = () => {
      return (() => {
        this.setDialogScrollHeight()
      })()
    }
  },
  data () {
    return {
      dialogScrollHeight: 200
    }
  },
  methods: {
    setDialogScrollHeight () {
      this.$nextTick(() => {
        if (this.$refs.scrollWrap === undefined) {
          return
        }
        window.dialogHeight = window.innerHeight
        if (this.$refs.btmWrap !== undefined) {
          this.dialogScrollHeight = window.dialogHeight - this.$refs.scrollWrap.offsetTop - this.$refs.btmWrap.offsetHeight - 35
        } else {
          this.dialogScrollHeight = window.dialogHeight - this.$refs.scrollWrap.offsetTop - 35
        }
      })
    }
  }
}
export default myMixin
