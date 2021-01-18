<template>
  <div class="home">
    <el-container>
      <el-header class="el-header" height="10" style="text-align: right; font-size: 20px">
        <span>wit音频分析平台</span>
      </el-header>

      <el-main>
        <el-row>
          <el-col :span="5">
            <template>
              <p></p>
              <el-radio v-model="radio" label="1">波形图</el-radio>
              <el-radio v-model="radio" label="2">频谱图</el-radio>
            </template>
          </el-col>
          <el-col :span="14" style="display: flex; justify-content: center;">
            <el-upload
                class="upload-demo"
                drag
                ref="upload"
                multiple
                action="http://127.0.0.1:8000/get_wav/"
                accept=".wav"
                name="file"
                :limit="1"
                :file-list="fileList"
                :auto-upload="true"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传 1 个wav文件,若要重新上传,请删除当前文件或刷新页面！
              </div>
            </el-upload>
          </el-col>
          <el-col :span="5">
            <div>
              <el-button type="primary" round @click="show_data">上传文件<i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </div>
            <br><br>
            <div>
              <el-card class="card">
                <b style="display: flex; justify-content: center">wav文件信息</b>
                <p>声道数量 : {{ audio_parmas[0] }}</p>
                <p>量化位数 : {{ audio_parmas[1] }}</p>
                <p>采样频率 : {{ audio_parmas[2] }}</p>
                <p>采样点数 : {{ audio_parmas[3] }}</p>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <br/>
        <div>
          <el-card class="box-card">
            <!--波形图，横轴为时间，纵轴为幅度-->
            <line-graph title="音频分析波形图" :data_l="wave_data_l" :data_r="wave_data_r" :x="x" v-if="radio === '1'">
            </line-graph>
            <!--频谱图，横轴为频率，纵轴为幅度-->
            <bar-graph title="音频分析频谱图" :data="xfp" :x="freq" v-if="radio === '2'"></bar-graph>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import line from "@/components/line-graph";
import bar from "@/components/bar-graph";
import axios from 'axios'


// //生成递增数组
// function generateArray(start, end) {
//   return Array.from(new Array(end + 1).keys()).slice(start);
// }

export default {
  name: 'Upload',
  data() {
    return {
      fileList: [],
      x: [],
      wave_data_l: [],
      wave_data_r: [],
      radio: '1',
      audio_parmas: [],
      freq: [],
      xfp: [],
    };
  },
  components: {
    "line-graph": line,
    "bar-graph": bar,
  },
  methods: {
    open() {
      this.$message({
        message: 'this is a message',
        type: 'success',
      })
    },
    show_data() {
      axios
          .get('http://127.0.0.1:8000/show_data/')
          .then(response => {
            const res = response.data;

            // wav音频文件信息部分
            this.audio_parmas = res['audio_params']

            // 波形图部分
            this.wave_data_l = res['data'][0];
            this.wave_data_r = res['data'][1];
            this.x = res['time'];

            // 频谱图部分
            this.xfp = res['xfp']
            this.freq = res['freq']
          })
          .catch(error => console.log(error));
    }
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
}

.el-header {
  background-color: #b3c0d1;
  color: #333333;
  line-height: 50px;
}

.card {
  width: 100%;
}
</style>
