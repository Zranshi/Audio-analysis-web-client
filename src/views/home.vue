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
              <p> </p>
<!--              <el-radio v-model="radio" label="1">波形图</el-radio>-->
<!--              <el-radio v-model="radio" label="2">频谱图</el-radio>-->
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
                <p>声道数量 : {{ nchannels }}</p>
                <p>量化位数 : {{ sampwidth }}</p>
                <p>采样频率 : {{ framerate }}</p>
                <p>采样点数 : {{ nframes }}</p>
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
            <!--            <bar-graph title="音频分析频谱图" :data="data" :x="x" v-if="radio === '2'"></bar-graph>-->
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import line from "@/components/line-graph";
// import bar from "@/components/bar-graph";
import axios from 'axios'


// // 成品中需要删除的部分
// const length = 1000;

//生成递增数组
function generateArray(start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start);
}

// //生成随机数组
// function randArray(len, min, max) {
//   return Array.from(
//       {length: len,},
//       () => Math.floor(Math.random() * (max - min)) + min
//   );
// }


export default {
  name: 'Upload',
  data() {
    return {
      //传递x轴、表格数据
      fileList: [],
      x: [],
      wave_data_l: [],
      wave_data_r: [],
      radio: '1',
      nchannels: 0,
      sampwidth: 0,
      framerate: 0,
      nframes: 0,
    };
  },
  components: {
    "line-graph": line,
    // "bar-graph": bar,
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
            this.nchannels = res['nchannels'];
            this.sampwidth = res['sampwidth'];
            this.framerate = res['framerate'];
            this.nframes = res['nframes'];
            this.wave_data_l = res['data'][0];
            this.wave_data_r = res['data'][1];
            this.x = generateArray(1,this.wave_data_l.length);
          })
          .catch(error => console.log(error));
    }
  },
  // beforeMount() {
  //   //在此处给横坐标和表格数据赋值
  //   this.x = generateArray(1, length)
  //   this.wave_data_r = randArray(length, 0, 1000)
  //   this.wave_data_l = randArray(length, 0, 1000)
  // }
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
