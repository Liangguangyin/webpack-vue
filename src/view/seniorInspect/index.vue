<template>
  <div class="seniorInspect">
    <div class="seniorInspect-header">
      <span>集合选择:</span>
      <el-select v-model="seletValue" size="small" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="seniorInspect-experss">
      <div class="seniorInspect-experss-selet">
        <h3>字段:</h3>
        <el-input v-model="filedValue" size="small" placeholder="请输入内容"></el-input>
        <ul class="seniorInspect-experss-selet-ul">
          <li
            class="seniorInspect-experss-selet-ul-li"
            v-for="(item,index) in fieldList"
            :key="index"
            @click="onClickField(item)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="seniorInspect-experss-field">
        <ul class="seniorInspect-experss-field-ul">
          <li>
            <h3>运算符:</h3>
            <el-select v-model="computedSunby" size="small" placeholder="请选择">
              <el-option
                v-for="item in computedOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li>
            <h3>检索值:</h3>
            <el-input v-model="computedValue" size="small" placeholder="请输入内容"></el-input>
          </li>
          <li>
            <h3>与前一检索条件关系:</h3>
            <el-select v-model="relationship" size="small" placeholder="请选择">
              <el-option
                v-for="item in relationshipOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li>
            <el-button type="primary" size="small" @click="onSubmitCondition">新增条件</el-button>
            <el-button type="primary" size="small">追加（</el-button>
            <el-button type="primary" size="small">追加 ）</el-button>
          </li>
        </ul>
      </div>
      <div class="seniorInspect-experss-sbumitField">
        <h3>已选检索条件:</h3>
        <div class="seniorInspect-experss-sbumitField-content">{{totalValue}}</div>
      </div>
      <div class="seniorInspect-experss-view">
        <h3>预览检索条件:</h3>
        <div>{{totalValue}}</div>
      </div>
    </div>
    <div class="seniorInspect-button">
      <el-button type="warning" size="mini">删除条件</el-button>
      <el-button type="warning" size="mini">删除所有条件</el-button>
      <el-button type="primary" size="mini" @click="onDetermine">确定并检索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "seniorInspect",
  components: {},
  data() {
    return {
      options: [
        {
          value: "检验明细",
          label: "检验明细"
        },
        {
          value: "诊断",
          label: "诊断"
        },
        {
          value: "药品医嘱",
          label: "药品医嘱"
        },
        {
          value: "门诊药品处方明细",
          label: "门诊药品处方明细"
        },
        {
          value: "病例",
          label: "病例"
        }
      ],
      seletValue: "",
      filedValue: "",
      fieldList: [
        {
          name: "检验数字结果"
        },
        {
          name: "检验项目"
        },
        {
          name: "参考值"
        },
        {
          name: "检验项目EN"
        },
        {
          name: "检验日期"
        },
        {
          name: "异常标记"
        },
        {
          name: "检验结果"
        }
      ],
      computedOptions: [
        {
          value: "=",
          label: "等于"
        },
        {
          value: ">",
          label: "大于"
        },
        {
          value: "<",
          label: "小于"
        },
        {
          value: ">=",
          label: "大于或等于"
        },
        {
          value: "<=",
          label: "小于或等于"
        }
      ],
      computedSunby: "",
      computedValue: "",
      relationshipOptions: [
        {
          value: "and",
          label: "and"
        },
        {
          value: "or",
          label: "or"
        },
        {
          value: "not",
          label: "not"
        }
      ],
      relationship: "",
      totalValue: ""
    };
  },
  methods: {
    onClickField(item) {
      this.filedValue = item.name;
    },
    onSubmitCondition() {
      if (this.computedValue) {
        this.totalValue = `[${this.seletValue}.${this.filedValue}]${this.computedSunby}${this.computedValue}`;
      } else {
         this.$message({
          showClose: true,
          message: "检索值!!!不能为空哦",
          type: "warning"
        });
      }
    },
    onDetermine() {
      if (this.totalValue) {
        this.$router.push({
          name: "searchDataView",
          query: { searchField: this.totalValue }
        });
      } else {
        this.$message({
          showClose: true,
          message: "请您添加检索条件在点击确定",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.seniorInspect {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .seniorInspect-header {
    height: 60px;
    background: #ffffff;
    line-height: 60px;
    min-height: 60px;
    padding-left: 10px;
    border-bottom: 1px solid #dedede;
    .el-select {
      width: 200px;
    }
    span {
      font-size: 14px;
      color: #666666;
    }
  }
  .seniorInspect-experss {
    flex: auto;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    .seniorInspect-experss-selet {
      width: 30%;
      border-right: 1px solid #dedede;
      padding: 0 10px 0 10px;
      display: flex;
      flex-direction: column;
      height: 60%;
      h3 {
        line-height: 40px;
        font-weight: 600;
      }
      .seniorInspect-experss-selet-ul {
        border: 1px solid #dedede;
        border-radius: 5px;
        flex: auto;
        overflow-y: auto;
        .seniorInspect-experss-selet-ul-li {
          text-indent: 14px;
          line-height: 20px;
          font-size: 14px;
          color: #666666;
          cursor: pointer;
        }
        .seniorInspect-experss-selet-ul-li:hover {
          color: #ffffff;
          background: rgba($color: #000000, $alpha: 0.7);
        }
      }
    }
    .seniorInspect-experss-field {
      border-right: 1px solid #dedede;
      width: 30%;
      padding: 0 10px 0 10px;
      height: 60%;
      .seniorInspect-experss-field-ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .el-select {
          width: 100%;
        }
        h3 {
          line-height: 30px;
          font-size: 16px;
          color: #666666;
        }
      }
    }
    .seniorInspect-experss-sbumitField {
      padding: 0 10px 0 10px;
      width: 30%;
      height: 60%;
      display: flex;
      flex-direction: column;
      h3 {
        line-height: 40px;
        font-weight: 600;
      }
      .seniorInspect-experss-sbumitField-content {
        flex: auto;
        border: 1px solid #dedede;
        border-radius: 5px;
      }
    }
    .seniorInspect-experss-view {
      width: 100%;
      height: 40%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      h3 {
        line-height: 40px;
        font-weight: 600;
      }
      div {
        width: 100%;
        flex: auto;
        border: 1px solid #dedede;
        background: #fafafa;
        overflow-y: auto;
        padding: 10px;
        border-radius: 5px;
      }
    }
  }
  .seniorInspect-button {
    height: 40px;
    line-height: 40px;
    min-height: 40px;
    border-top: 1px solid #dedede;
    background: #ffffff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>