<template>
  <div id="main" style="width: 100%;height:400px;"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "bar-graph",
  data() {
    return {
      chart: '',
    }
  },
  props: {
    title: {type: String, default: '未赋值的标题'},
    x: {type: Array},
    data: {type: Array},
    option: {
      type: Object,
      default() {
        return {
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
            left: "right",
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            name: '赫兹/Hz',
            data: this.x,
          },
          yAxis: {
            name: '幅度'
          },
          series: [
            {
              name: "dB",
              smooth: true,
              type: "line",
              data: this.data,
            },
          ],
        };
      },
    },
  },
  methods: {
    init() {
      this.chart = echarts.init(document.getElementById("main"));
      window.addEventListener('resize', this.chart.resize)
      this.chart.setOption(this.option);
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    data: {
      handler() {
        this.option.series[0].data = this.data;
        this.option.xAxis.data = this.x;
        this.chart.setOption(this.option);
      },
      deep: true,
      immediate: true,
    }
  }
};
</script>

<style scoped>

</style>