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
                name="file"
                :auto-upload="true"
                :on-remove="handle_remove"
                :before-upload="before_upload"
                :on-success="handle_success"
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
              <el-button type="primary" round @click="get_data">上传文件<i class="el-icon-upload el-icon--right"></i>
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
            <waveform title="音频分析波形图" :data_l="wave_data_l" :data_r="wave_data_r" :x="x"
                      v-if="radio === '1'"></waveform>
            <!--频谱图，横轴为频率，纵轴为幅度-->
            <spectrogram title="音频分析频谱图" :data="xfp" :x="freq" v-if="radio === '2'"></spectrogram>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Waveform from "@/components/waveform";
import Spectrogram from "@/components/spectrogram";
import {show_data} from '@/api/data'

export default {
  name: 'Upload',
  data() {
    return {
      // 文件上传列表
      fileDict: {},
      // 单选框
      radio: '1',
      // 文件信息
      audio_parmas: [],
      // 波形图
      x: [],
      wave_data_l: [],
      wave_data_r: [],
      // 频谱图
      freq: [],
      xfp: [],
    };
  },
  components: {
    "waveform": Waveform,
    "spectrogram": Spectrogram,
  },
  methods: {
    async get_data() {
      let res = await show_data()
      res = res['data']
      // wav音频文件信息部分
      this.audio_parmas = res['audio_params'];
      // 波形图部分
      this.wave_data_l = res['data'][0];
      this.wave_data_r = res['data'][1];
      this.x = res['time'];
      // 频谱图部分
      this.xfp = res['xfp'];
      this.freq = res['freq'];
    },
    before_upload(file) {
      const isMav = file.type === 'audio/x-wav' || file.type === 'audio/wav';
      const isLt30M = file.size / 1024 / 1024 < 30;
      const isNum = Object.keys(this.fileDict).length < 1;
      if (!isMav) {
        this.$message.error('上传文件只能是wav音频文件格式！');
      } else if (!isLt30M) {
        this.$message.error('最大上传30MB大小的文件！');
      } else if (!isNum) {
        this.$message.error(`最多上传 1 个文件`);
      }
      return isMav && isLt30M && isNum;
    },
    handle_remove(file) {
      delete this.fileDict[`${file.name}`]
    },
    handle_success(file) {
      this.fileDict[`${file.name}`] = file.name;
    },
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
