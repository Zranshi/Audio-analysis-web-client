<template>
  <div id="main" style="width: 100%;height:400px;"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "bar-graph",
  props: {
    title: {type: String, default: '未赋值的标题'},
    x: {type: Array},
    data: {type: Array},
  },
  methods: {
    myEcharts() {
      const myChart = echarts.init(document.getElementById("main"));
      const option = {
        title: {
          text: this.title,
        },
        tooltip: {
          trigger: "axis",
        },
        dataZoom: [
          {
            startValue: "0",
          }, {
            type: "inside",
          },
        ],
        toolbox: {
          left: "center",
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          name: '赫兹',
          data: this.x,
        },
        yAxis: {
          name: '幅度'
        },
        series: [
          {
            //显示数据的名称
            name: "dB",
            type: "bar",
            data: this.data,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.myEcharts();
  },
};
</script>

<style scoped></style>