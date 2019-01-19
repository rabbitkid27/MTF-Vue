<template>
    <div class="user-container">
        <!-- 顶部面包屑 -->
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <myBreadcrumb :LV2="LV2" :LV3="LV3"></myBreadcrumb>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <!-- 饿了吗-ui的Card卡片 - 卡片阴影 -->
                <el-card shadow="always">
                    <!-- 准备echart容器 , ref的目的是为了获取dom元素-->
                    <div class="echarts-container" ref="echarts"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// echarts官方的
// var echarts = require('echarts');
// 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementById('main'));
import echarts from 'echarts'

export default {
  data() {
    return {
      LV2: '数据统计',
      LV3: '数据报表',
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  },
  //   生命周期函数 回调函数
  // 在mounted中 才可以访问到dom元素
  async mounted() {
    // 直接获取dom元素 不是Vue推荐的方式
    // let myChart =echarts.init(document.querySelector(".echarts-container"));
    // 通过[refs]this.$refs.xx 获取标记的dom元素
    let myChart = echarts.init(this.$refs.echarts)
    console.log(document.querySelector('.echarts-container'))
    // 获取接口数据 ↓  使用服务器返回的数据 生成图标, 记得通过await 等待代码执行;用异步请求async await
    let res = await this.$axios.get('reports/type/1')
    for (const key in res.data.data) {
      // for in遍历数据,依次的取出同名的字段,并替换掉. 也可以理解为:使用服务器返回的数据跟本地合并;
      this.options[key] = res.data.data[key]
    }
    // 设置表格的两边留白,设置为不留白
    this.options.xAxis[0].boundaryGap = false
    // 初始化echarts
    myChart.setOption(this.options)
  }
}
</script>

<style lang="scss" scoped>
// 准备echarts的容器
.echarts-container {
  width: 800px;
  height: 500px;
}
</style>
