<template>
  <div class="hotWords">
    <div class="hotWords-filter">
      <el-select v-model="value" size="mini" placeholder="请选择">
        <el-option
          v-for="item in options"
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
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-select v-model="value" size="mini" placeholder="请选择">
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
      dataList: [
        {
          label: "男",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "男",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "只能",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "只能",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "登上",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "登上",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "巅峰",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "巅峰",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "weao",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "weao",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "zhinanai",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "zhinanai",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "fuk",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "fuk",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "nank",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "nank",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "男",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "男",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "只能",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "只能",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "登上",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "登上",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "巅峰",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "巅峰",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "weao",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "weao",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "zhinanai",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "zhinanai",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "fuk",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "fuk",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "nank",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "nank",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "男",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "男",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "只能",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "只能",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "登上",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "登上",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "巅峰",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "巅峰",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "weao",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "weao",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "zhinanai",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "zhinanai",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "fuk",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "fuk",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "nank",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "nank",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "男",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "男",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "只能",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "只能",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "登上",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "登上",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "巅峰",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "巅峰",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "weao",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "weao",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "zhinanai",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "zhinanai",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "fuk",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "fuk",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "nank",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "nank",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "男",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "男",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "只能",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "只能",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "登上",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "登上",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "巅峰",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "巅峰",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "weao",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "weao",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "zhinanai",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "zhinanai",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "fuk",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "fuk",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "nank",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "nank",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "男",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "男",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "只能",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "只能",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "登上",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "登上",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "巅峰",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "巅峰",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "weao",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "weao",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "zhinanai",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "zhinanai",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "fuk",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "fuk",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "nank",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "nank",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "男",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "男",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "只能",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "只能",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "登上",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "登上",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "巅峰",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "巅峰",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "weao",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "weao",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "zhinanai",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "zhinanai",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "fuk",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "fuk",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "nank",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "nank",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "男",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "男",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "只能",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "只能",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "登上",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "登上",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "巅峰",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "巅峰",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "weao",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "weao",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "zhinanai",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "zhinanai",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "fuk",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "fuk",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "nank",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "nank",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "男",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "男",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "只能",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "只能",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "登上",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "登上",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "巅峰",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "巅峰",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "weao",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "weao",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "zhinanai",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "zhinanai",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "fuk",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "fuk",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        },
        {
          label: "nank",
          size: this.randomNum(10000, 1),
          id: this.randomNum(500, 10, 4),
          // id: "nank",
          color: this.getRandomColorString(),
          x: this.randomNum(2500, 10, 4),
          y: this.randomNum(1000, 10, 4)
        }
      ],
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
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
            }
          },
          {
            text: "半年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "一年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "两年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 720);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "三年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1080);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "四年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1440);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "五年内统计",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1800);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
    };
  },
  mounted() {
    this.infoEcharts();
  },
  methods: {
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
            left: "right"
          },
          tooltip: {
            formatter: function(info) {
              return [
                '<div class="tooltip-title">' + info.data.name + "</div>",
                "计数: " + info.data.symbolSize * 100
              ].join("");
            }
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              type: "graph",
              layout: "none",
              progressiveThreshold: 700,
              data: this.dataList.map(function(node) {
                return {
                  x: node.x,
                  y: node.y,
                  id: node.id,
                  name: node.label,
                  symbolSize: node.size / 100,
                  itemStyle: {
                    color: node.color
                  }
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
                formatter: "{b}"
              },
              roam: true,
              focusNodeAdjacency: true
              // lineStyle: {
              //   width: 0.5,
              //   curveness: 0.3,
              //   opacity: 0.7
              // }
            }
          ]
        },
        true
      );
      hotWordsEcharts.on("click", params => {
        this.$router.push({
          name: "searchDataView",
          query: { searchField: params.name }
        });
      });
    }
  }
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