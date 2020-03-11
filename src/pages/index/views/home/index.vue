<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>费用</span>
          </div>
          <div class="numBox">
            <p class="num">56</p>
            <p>待审批</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>发货</span>
          </div>
          <div class="numBox">
            <p class="num">32</p>
            <p>待发货</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>费用</span>
          </div>
          <div class="numBox">
            <p class="num">163</p>
            <p>待审批</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>费用</span>
          </div>
          <div class="numBox">
            <p class="num">78</p>
            <p>待审批</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="16">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>快速发起</span>
            <el-button type="text" class="setBtn"><i class="el-icon-fa-cog"></i></el-button>
          </div>
          <div class="quickBox">
            <div class="item" v-for="(item, index) in speedList" :key="index"><div :class="`icon ${item.meta.colorClass}`"><i :class="`${item.meta.icon}`"></i></div><div class="navTtl">{{item.meta.title}}</div></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>新功能上线提醒</span>
            <el-button type="text" class="more">更多</el-button>
          </div>
          <div class="funList">
            <ul>
              <li><i class="el-icon-fa-square-o"></i> 报表功能上线</li>
              <li><i class="el-icon-fa-square-o"></i> 报表功能上线报表功能上线</li>
              <li><i class="el-icon-fa-square-o"></i> 报表功能上线报表功能</li>
              <li><i class="el-icon-fa-square-o"></i> 报表功能上线报表功能报表功能</li>
              <li><i class="el-icon-fa-square-o"></i> 报表功能上线</li>
              <li><i class="el-icon-fa-square-o"></i> 报表功能上线报表功能报表功能</li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover" class="chartBox">
          <div slot="header" class="clearfix">
            <span>当月费用分析</span>
          </div>
          <div id="myChart2" class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="chartBox">
          <div slot="header" class="clearfix">
            <span>销售趋势</span>
          </div>
          <div id="myChart3" class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="chartBox">
          <div slot="header" class="clearfix">
            <span>订单金额</span>
          </div>
          <div id="myChart" class="chart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSpeedItem } from '@/utils'
export default {
  data () {
    return {
      speedList: []
    }
  },
  computed: {
    ...mapGetters([
      'navList'
    ])
  },
  mounted(){
    this.drawLine()
    this.drawLine2()
    this.drawLine3()
    this.speedList = getSpeedItem(this.navList)
  },
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: ["酒水","电子产品","美妆","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    },
    drawLine2 () {
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:135, name:'视频广告'},
              {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
    drawLine3 () {
      let myChart = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      });
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss"></style>
