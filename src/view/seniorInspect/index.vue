<template>
  <div class="seniorInspect">
    <div class="seniorInspect-header">
      <span>集合选择:</span>
      <el-select v-model="seletValue" @change="onSeletValueChange" size="small" placeholder="请选择">
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
            <!-- <el-button type="primary" size="small">追加（</el-button>
            <el-button type="primary" size="small">追加 ）</el-button>-->
          </li>
        </ul>
      </div>
      <div class="seniorInspect-experss-sbumitField">
        <h3>已选检索条件:</h3>
        <div class="seniorInspect-experss-sbumitField-content">
          <textarea
            class="seniorInspect-experss-sbumitField-content-brard"
            v-model="totalValueText"
          ></textarea>
        </div>
      </div>
      <div class="seniorInspect-experss-view">
        <h3>预览检索条件:</h3>
        <div>
          <span>{{totalValueText}}</span>
          <!-- <span v-for="(item,index) in totalValueList" :key="index">{{item}}</span> -->
        </div>
      </div>
    </div>
    <div class="seniorInspect-button">
      <!-- <el-button type="warning" size="mini">删除条件</el-button> -->
      <el-button type="warning" size="mini" @click="onDelete">删除所有条件</el-button>
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
      options: [], // 集合数据
      seletValue: "",
      filedValue: "",
      fieldList: [], // 字段数据
      computedOptions: [], // 运算符数据
      computedSunby: "",
      computedValue: "",
      relationshipOptions: [
        {
          value: "and",
          label: "and",
        },
        {
          value: "or",
          label: "or",
        },
        {
          value: "not",
          label: "not",
        },
      ],
      relationship: "and",
      totalValueText: "",
    };
  },
  created() {
    this.getSearchSet();
  },

  methods: {
    getSearchSet() {
      let url = "/hssp/head/getSearchSet";
      this.$axios.post(url).then((res) => {
        let arr = [];
        res.data.searchSet.map((item) => {
          arr.push({
            label: item,
            value: item,
          });
        });
        this.options = arr;
        this.seletValue = res.data.searchSet[0];
        this.getSearchField(res.data.searchSet[0]);
      });
    },

    // onClickEvent(e) {
    //   if (e.keyCode == 13) {
    //     e.preventDefault();
    //     // 下面写你的发送消息的代码
    //   } else {
    //     let element = e.target;
    //     let value = element.value;
    //     let num = null;
    //     if (e.type == "keyup") {
    //       if (e.code == "ArrowLeft" || e.code == "ArrowRight") {
    //         num = element.selectionStart;
    //       }
    //     } else {
    //       num = element.selectionStart;
    //     }

    //     // console.log(num);
    //     // this.totalValueList.map((item, index) => {
    //     //   console.log(item.length);
    //     //   if (item.length > num) {
    //     //     console.log(index);
    //     //   }
    //     // });
    //     let total = 0;
    //     let index = null;
    //     for (let i = 0; i < this.totalValueList.length; i++) {
    //       total = total + this.totalValueList[i].length;
    //       // console.log(total, num);
    //       if (total >= num) {
    //         index = i;
    //         break;
    //       }
    //       // if (this.totalValueList[i].length > num) {
    //       //   console.log(i);
    //       // }
    //     }
    //     index = index == null ? this.totalValueList.length - 1 : index;
    //     console.log(index);
    //   }
    // },

    onSeletValueChange(val) {
      this.getSearchField(val);
    },

    getSearchField(val) {
      let formData = new FormData();
      formData.append("searchSet", val);
      this.$axios.post("/hssp/head/getSearchField", formData).then((res) => {
        let arr = [];
        res.data.searchField.map((item) => {
          arr.push({
            name: item,
          });
        });
        this.fieldList = arr;
        this.filedValue = res.data.searchField[0];
        this.getSearchOperator(val, res.data.searchField[0]);
      });
    },

    getSearchOperator(val, field) {
      let formData = new FormData();
      formData.append("searchSet", val);
      formData.append("searchField", field);
      this.$axios.post("/hssp/head/getSearchOperator", formData).then((res) => {
        const type = res.data.searchOperator[0];
        if (type == 0 || type == 1 || type == 3) {
          this.computedOptions = [
            {
              value: "等于",
              label: "等于",
            },
            {
              value: "大于",
              label: "大于",
            },
            {
              value: "小于",
              label: "小于",
            },
            {
              value: "大于或等于",
              label: "大于或等于",
            },
            {
              value: "小于或等于",
              label: "小于或等于",
            },
          ];
        } else if (type == 2 || type == 9) {
          this.computedOptions = [
            {
              value: "同义包含",
              label: "同义包含",
            },
            {
              value: "绝对包含",
              label: "绝对包含",
            },
            {
              value: "等于",
              label: "等于",
            },
            {
              value: "以XXX开头",
              label: "以XXX开头",
            },
            {
              value: "以XXX结尾",
              label: "以XXX结尾",
            },
          ];
        } else if (type == 4) {
          this.computedOptions = [
            {
              value: "绝对包含",
              label: "绝对包含",
            },
            {
              value: "等于",
              label: "等于",
            },
            {
              value: "以XXX开头",
              label: "以XXX开头",
            },
            {
              value: "以XXX结尾",
              label: "以XXX结尾",
            },
          ];
        }
        this.computedSunby = this.computedOptions[0].label;
      });
    },
    onClickField(item) {
      this.filedValue = item.name;
      this.getSearchOperator(this.seletValue, item.name);
    },
    onSubmitCondition() {
      if (this.computedValue) {
        let text = "";
        text = `[${this.seletValue}.${this.filedValue}]`;
        switch (this.computedSunby) {
          case "等于":
            text = text + "=" + this.computedValue;
            break;
          case "大于":
            text = text + ">" + this.computedValue;
            break;
          case "小于":
            text = text + "<" + this.computedValue;
            break;
          case "大于或等于":
            text = text + ">=" + this.computedValue;
            break;
          case "小于或等于":
            text = text + "<=" + this.computedValue;
            break;
          //
          case "以XXX开头":
            text = this.computedValue + "*" + text;
            break;
          case "以XXX结尾":
            text = "*" + this.computedValue + text;
            break;
          case "同义包含":
            text = this.computedValue + text;
            break;
          case "绝对包含":
            text = "*" + this.computedValue + "*" + text;
            break;
        }
        if (this.totalValueText && this.totalValueText.length > 4) {
          text = this.relationship + " " + text;
        }
        this.$nextTick(() => {
          this.totalValueText = this.totalValueText + text + "\n";
        });
        this.computedValue = "";
      } else {
        this.$message({
          showClose: true,
          message: "检索值!!!不能为空哦",
          type: "warning",
        });
      }
    },
    onDetermine() {
      if (this.totalValueText) {
        let str = JSON.parse(JSON.stringify(this.totalValueText));

        this.$router.push({
          name: "searchDataView",
          query: { searchField: str.replace(/\n/gm, "") },
        });
      } else {
        this.$message({
          showClose: true,
          message: "请您添加检索条件在点击确定",
          type: "warning",
        });
      }
    },
    onDelete() {
      this.totalValueText = "";
    },
  },
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
        padding: 10px;
        .seniorInspect-experss-sbumitField-content-brard {
          width: 100%;
          height: 100%;
          border: none;
          resize: none;
          outline: none;
        }
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
        span {
          padding: 0 5px;
        }
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