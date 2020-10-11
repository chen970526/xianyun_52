<template>
  <div class="comment-row">
    <h4 class="comments-hd">{{ data.all_remarks }}条真实用户评论</h4>
    <el-row class="scores-row" type="flex">
      <el-col :span="4">
        <p>总评数：{{ data.all_remarks }}</p>
        <p>好评数：{{ data.good_remarks }}</p>
        <p>差评数：{{ data.bad_remarks }}</p>
      </el-col>
      <el-col :span="5" class="recomment-score">
        <div class="comment-star">
          <el-rate
            v-model="data.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
        </div>
        <div class="x-large height-light stamp">推荐</div>
      </el-col>
      <el-col :span="3" v-for="(value, key, index) in data.scores" :key="index">
        <div class="rate-box">
          <div class="circle-rate">
            <svg viewBox="0 0 74 74">
              <path
                d="M 35 2, A 35,35 0 1 1 2.0651179618670383,37.07208714446733"
                fill="none"
                stroke="#f90"
                stroke-width="2"
              ></path>
            </svg>
            <span class="text" style="color: rgb(255, 153, 0)">
              <span>环境</span>
              <span class="value">{{ value }}</span>
            </span>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="3">
        <div class="rate-box">
          <div class="circle-rate">
            <svg viewBox="0 0 74 74">
              <path
                d="M 35 2, A 35,35 0 1 1 2.0651179618670383,37.07208714446733"
                fill="none"
                stroke="#f90"
                stroke-width="2"
              ></path>
            </svg>
            <span class="text" style="color: rgb(255, 153, 0)">
              <span>环境</span>
              <span class="value">7.4</span>
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="rate-box">
          <div class="circle-rate">
            <svg viewBox="0 0 74 74">
              <path
                d="M 35 2, A 35,35 0 1 1 2.0651179618670383,37.07208714446733"
                fill="none"
                stroke="#f90"
                stroke-width="2"
              ></path>
            </svg>
            <span class="text" style="color: rgb(255, 153, 0)">
              <span>环境</span>
              <span class="value">7.4</span>
            </span>
          </div>
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
    };
  }
};
</script>

<style lang="less" scoped>
.comment-row {
  .comments-hd {
  }
  .scores-row {
    color: #666;
    padding: 20px 0;
    .recomment-score {
      position: relative;
      display: flex;
      align-content: center;
      .comment-star {
        margin-top: 20px;
      }
      .stamp {
        position: absolute;
        left: 20px;
        border: 2px solid #fa3;
        text-align: center;
        line-height: 70px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        opacity: 0.25;
        transform: rotate(-30deg);
      }
      .x-large {
        font-size: x-large;
      }
      .height-light {
        color: #f90;
      }
    }
    .rate-box {
      width: 70px;
      .circle-rate {
        position: relative;
        .text {
          position: absolute;
          top: 50%;
          left: 50%;
          text-align: center;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
