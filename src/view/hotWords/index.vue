<template>
  <div class="hotWords">
    <div class="hotWords-filter">
      <el-select
        v-model="numValue"
        filterable
        allow-create
        default-first-option
        size="mini"
        placeholder="请选择"
        @change="selectChange"
      >
        <el-option
          v-for="item in numOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        size="mini"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="selectChangeDate"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-select v-model="value" size="mini" @change="selectChange" clearable placeholder="默认全部">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="hotWords-echarts" id="hotWords-echarts"></div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/graph");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "hotWords",
  data() {
    return {
      dataList: [],
      value: "",
      numValue: 100,
      options: [],
      numOptions: [
        {
          value: 50,
          label: "top50",
        },
        {
          value: 100,
          label: "top100",
        },
        {
          value: 300,
          label: "top300",
        },
        {
          value: 500,
          label: "top500",
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "三个月内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "半年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "一年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "两年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 720);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "三年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1080);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "四年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1440);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "五年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1800);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value2: "",
    };
  },
  created() {
    this.getWordCloudDetailMessage();
  },
  mounted() {},
  methods: {
    selectChange(val) {
      this.getWordCloudDetailMessage();
    },
    selectChangeDate(val) {
      let start = "",
        end = "";
      if (val) {
        val.map((item, index) => {
          if (index == 0) {
            start = new Date(item).pattern("yyyy-MM-dd");
          } else {
            end = new Date(item).pattern("yyyy-MM-dd");
          }
        });
      }
      this.getWordCloudDetailMessage(start, end);
    },
    getWordCloudDetailMessage(start = "", end = "") {
      this.$loadingOpen();
      this.options = [];
      let formData = new FormData();
      formData.append("tops", this.numValue);
      formData.append("department", this.value);
      formData.append("createTime", start);
      formData.append("lastTime", end);
      this.$axios
        .post("/hssp/head/getWordCloudDetailMessage", formData)
        .then((res) => {
          this.$loadingClose();
          let obj = {};
          res.data.departmentList.map((item) => {
            obj = {
              value: item,
              label: item,
            };
            this.options.push(obj);
          });
          this.dataList = res.data.wordCloudListJson;
          this.infoEcharts();
        });
    },
    // 随机颜色
    getRandomColorString() {
      return (
        "#" +
        ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
      );
    },
    randomNum(maxNum, minNum, decimalNum) {
      // 获取指定范围内的随机数, decimalNum指小数保留多少位
      var max = 0,
        min = 0;
      minNum <= maxNum
        ? ((min = minNum), (max = maxNum))
        : ((min = maxNum), (max = minNum));
      switch (arguments.length) {
        case 1:
          return Math.floor(Math.random() * (max + 1));
          break;
        case 2:
          return Math.floor(Math.random() * (max - min + 1) + min);
          break;
        case 3:
          return (Math.random() * (max - min) + min).toFixed(decimalNum);
          break;
        default:
          return Math.random();
          break;
      }
    },

    infoEcharts() {
      let hotWordsEcharts = echarts.init(
        document.getElementById("hotWords-echarts")
      );

      hotWordsEcharts.setOption(
        {
          title: {
            text: "热词统计图",
            left: "right",
          },
          tooltip: {
            formatter: function (info) {
              return [
                '<div class="tooltip-title">' +
                  "字段: " +
                  info.data.name +
                  "</div>",
                "计数: " + info.data.num,
              ].join("");
            },
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              type: "graph",
              layout: "none",
              progressiveThreshold: 700,
              data: this.dataList.map((node) => {
                let num = 0;
                if (node.weight > 80) {
                  num = 80;
                } else {
                  num = node.weight;
                }
                return {
                  x: this.randomNum(2500, 10, 4),
                  y: this.randomNum(1000, 10, 4),
                  name: node.name,
                  symbolSize: num,
                  itemStyle: {
                    color: this.getRandomColorString(),
                  },
                  num: node.weight,
                };
              }),
              // edges: json.edges.map(function (edge) {
              //     return {
              //         source: edge.sourceID,
              //         target: edge.targetID
              //     };
              // }),
              // emphasis: {
              //   label: {
              //     position: "right",
              //     show: true
              //   }
              // },
              label: {
                show: true,
                formatter: "{b}",
              },
              roam: true,
              // focusNodeAdjacency: true
              // lineStyle: {
              //   width: 0.5,
              //   curveness: 0.3,
              //   opacity: 0.7
              // }
            },
          ],
        },
        true
      );
      hotWordsEcharts.on("click", (params) => {
        this.$router.push({
          name: "searchDataView",
          query: { searchField: params.name },
        });
      });
    },
  },
};
</script>
<style lang="scss">
.hotWords {
  height: 100%;
  padding: 10px;
  position: relative;
  .hotWords-echarts {
    height: 100%;
    width: 100%;
    background: #ffffff;
    overflow: hidden;
  }
  .hotWords-filter {
    position: absolute;
    z-index: 10000;
    .el-input__inner {
      width: 100px;
    }
    .el-range-editor {
      width: 300px;
    }
  }
}
</style>