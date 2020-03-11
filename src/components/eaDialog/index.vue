<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :width="width"
    :top="top"
    custom-class="eaDialog"
    :before-close="handleClose"
    :append-to-body="toBody">
    <span slot="title" class="dialog-header">
      <span class="el-dialog__title">{{title}}</span>
    </span>
    <div class="scrollWrap" ref="scrollWrap" :style="autoHeight ? '' : 'height:' + dialogScrollHeight + 'px'">
    <slot name="body">
      <!-- 内容区 -->
    </slot>
    </div>
    <div slot="footer" class="dialog-footer">
      <slot name="footer"><!-- 底部按钮区域 --></slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'eaDialog',
  props: ['visible', 'title', 'size', 'appendToBody'],
  computed: {
    toBody () {
      if (this.appendToBody) {
        return this.appendToBody
      }
      return false
    },
    autoHeight () {
      if (this.size === 'small' || this.size === 'middle' || this.size === 'mini') {
        return true
      }
      return false
    },
    width () {
      if (this.size === 'mini') {
        return '40%'
      }
      if (this.size === 'small') {
        return '60%'
      }
      if (this.size === 'middle') {
        return '80%'
      }
      return '96%'
    },
    top () {
      if (this.size === 'small' || this.size === 'middle' || this.size === 'mini') {
        return '8vh'
      }
      return '15px'
    }
  },
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
    },
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>
