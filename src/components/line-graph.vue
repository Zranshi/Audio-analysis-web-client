<template>
  <div id="main" style="width: 100%;height: 400px;"></div>
</template>


<script>
import * as echarts from "echarts";

export default {
  name: "line-graph",
  data() {
    return {
      chart: '',
    }
  },
  props: {
    title: {
      type: String,
      default: '未赋值的标题'
    },
    x: {
      type: Array,
    },
    data_l: {
      type: Array
    },
    data_r: {
      type: Array
    },
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
          dataZoom: [{
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
          legend: {
            data: ['dB(左声道)', 'dB(右声道)']
          },
          xAxis: {
            name: "时间/ms",
            data: this.x,
          },
          yAxis: {
            name: '幅度'
          },
          series: [{
            name: "dB(左声道)",
            smooth: true,
            type: "line",
            data: this.data_l,
          }, {
            name: "dB(右声道)",
            smooth: true,
            type: "line",
            data: this.data_r,
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
    data_l: {
      handler() {
        this.option.series[0].data = this.data_l;
        this.option.series[1].data = this.data_r;
        this.option.xAxis.data = this.x;
        this.chart.setOption(this.option);
      },
      deep: true,
      immediate: true
    },
  },
};
</script>

<style scoped>

</style>