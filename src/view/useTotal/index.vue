<template>
  <div class="useTotal">
    <header class="useTotal-header">
      <div>
        <span class="useTotal-header-imformmation">
          总使用数:
          <span>{{totalNum}}</span>次 使用科室:
          <span>{{useSection}}</span>个
        </span>
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          size="mini"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="datePickerChange"
        ></el-date-picker>
        <span class="useTotal-header-search">
          <el-input size="mini" v-model="input" placeholder="搜索"></el-input>
        </span>
      </div>
    </header>
    <main class="useTotal-main">
      <table-list :fieldList="fieldList" :dataList="dataList" :height="'100%'" />
    </main>
  </div>
</template>

<script>
export default {
  name: "useTotal",
  data() {
    return {
      value2: "",
      input: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "三个月数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "半年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "一年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "两年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 720);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "三年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1080);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "四年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1440);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "五年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1800);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      fieldList: [
        {
          config: {
            label: "序号",
            type: "index",
          },
        },
        {
          config: {
            label: "科室",
            prop: "b",
          },
        },
        {
          config: {
            label: "总记录数",
            prop: "c",
          },
        },
      ],
      dataList: [],
      dataListCopy: [],
      totalNum: 0,
      useSection: 0,
    };
  },
  created() {
    this.getDiseaseCountDetailMessage();
  },
  watch: {
    input(val) {
      if (val) {
        this.dataList = this.dataListCopy.filter(
          (item) => JSON.stringify(item).indexOf(val) !== -1
        );
      } else {
        this.dataList = this.dataListCopy;
      }
    },
  },
  methods: {
    getDiseaseCountDetailMessage(start = "1", end = "") {
      this.$loadingOpen();
      this.dataList = [];
      let formData = new FormData();
      formData.append("createTime", start);
      formData.append("lastTime", end);
      this.$axios
        .post("/hssp/head/getDiseaseCountDetailMessage", formData)
        .then((res) => {
          this.$loadingClose();
          this.totalNum = res.data.totalCount;
          this.useSection = res.data.departmentList.length;
          let obj = {};
          for (let i = 0; i < res.data.departmentList.length; i++) {
            obj = {
              b: res.data.departmentList[i],
              c: res.data.countsList[i],
            };
            this.dataList.push(obj);
            this.dataListCopy = this.dataList;
          }
        });
    },
    datePickerChange(val) {
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
      this.getDiseaseCountDetailMessage(start, end);
    },
  },
};
</script>

<style lang="scss">
.useTotal {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .useTotal-header {
    height: 60px;
    line-height: 60px;
    min-height: 60px;
    background: #ffffff;
    padding: 0 10px;
    .useTotal-header-imformmation {
      color: #666666;
      font-size: 14px;
      span {
        color: #3385ff;
      }
      margin-right: 10px;
    }
    .useTotal-header-search {
      float: right;
    }
  }
  .useTotal-main {
    flex: auto;
    background: #ffffff;
  }
}
</style>