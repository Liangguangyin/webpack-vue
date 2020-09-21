<template>
  <el-dialog title="数据导出信息" :visible.sync="dialogVisible" width="40%">
    <el-form
      v-show="showType == 'home'"
      label-position="right"
      label-width="100px"
      :model="formLabelAlign"
      ref="validateForm"
    >
      <el-form-item
        label="名称:"
        prop="name"
        :rules="[
          { required: true, message: '名称不能为空'}
        ]"
      >
        <div class="dialogModel-name">
          <el-select v-model="formLabelAlign.name" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-plus" @click="onAddName">新增</el-button>
        </div>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input type="textarea" v-model="formLabelAlign.region"></el-input>
      </el-form-item>
    </el-form>
    <el-form
      v-show="showType == 'add'"
      label-position="right"
      label-width="100px"
      :model="formAddName"
      ref="validateFormTwo"
    >
      <el-form-item
        label="导出名称:"
        prop="name"
        :rules="[
          { required: true, message: '导出名称不能为空'}
        ]"
      >
        <div class="dialogModel-addName">
          <el-input v-model="formAddName.name"></el-input>
          <span>{{specialCharacters}}</span>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onDetermine" :loading="loading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "dialogModel",
  props: {
    selectionDataList: {
      type: Array,
      default: () => [],
    },
    deselectDataList: {
      type: Array,
      default: () => [],
    },
    expression: {
      type: String,
      default: () => "",
    },
    requestID: {
      type: String | Number,
      default: () => "",
    },
  },
  data() {
    return {
      dialogVisible: false,
      formLabelAlign: {
        name: "",
        region: "",
      },
      options: [],
      formAddName: {
        name: "",
      },
      specialCharacters: `禁止含特殊符号(/ \ : * " <  > | ？-)`,
      showType: "home",
      seletStatus: "all", // single
      sortObj: {},
      loading: false,
    };
  },
  mounted() {
    this.getDiseaseDBNameListLocal();
  },
  methods: {
    getDiseaseDBNameListLocal() {
      this.options = [];
      let formData = new FormData();
      formData.append("USERID", "kpi");
      this.$axios
        .post("/hssp/tail/getDiseaseDBNameListLocal", formData)
        .then((res) => {
          for (let i = 0; i < res.data.diseaseDBName.length; i++) {
            this.options.push({
              name: res.data.diseaseDBName[i],
              id: res.data.diseaseIDList[i],
            });
          }
          this.formLabelAlign.name = this.options[0] ? this.options[0].id : "";
        });
    },
    onVisible(type, SortBy, SortOrderBy) {
      this.sortObj = {
        SortBy,
        SortOrderBy,
      };
      if (type == "默认全部选中") {
        this.seletStatus = "all";
      } else {
        this.seletStatus = "single";
      }
      this.dialogVisible = true;
    },
    onHide() {
      this.dialogVisible = false;
    },
    onAddName() {
      this.showType = "add";
    },
    onClose() {
      if (this.showType == "add") {
        this.showType = "home";
      } else {
        this.onHide();
      }
    },
    onDetermine() {
      //validateFormTwo
      if (this.showType == "add") {
        this.$refs["validateFormTwo"].validate((valid) => {
          if (valid) {
            let formData = new FormData();
            formData.append("jurisdiction", "0");
            formData.append("USERID", "kpi");
            formData.append("DISEASECLASSIFYID", "0");
            formData.append("DISEASECLASSIFYCHIIDID", "0");
            formData.append("SubCategoryName", this.formAddName.name);
            formData.append("Description", "");
            this.$axios
              .post("/hssp/tail/saveDiseaseNameLocal", formData)
              .then((res) => {
                if (res.data == "error") {
                  this.$notify.error({
                    title: "添加错误",
                    message: "新建导出表名称错误！！！",
                  });
                }
                this.showType = "home";
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        console.log(this.selectionDataList);
        this.loading = true;
        this.$refs["validateForm"].validate((valid) => {
          if (valid) {
            let type = this.seletStatus == "all" ? "1" : "2";
            let arr =
              this.seletStatus == "all"
                ? this.deselectDataList
                : this.selectionDataList;
            let text = "";
            arr.map((item) => {
              text = text + item.a + ";;,";
            });
            let formData = new FormData();
            formData.append("SubCategoryName", this.formLabelAlign.name);
            formData.append("RequestID", this.requestID);
            formData.append("Expression", this.expression);
            formData.append("SortBy", this.sortObj.SortBy);
            formData.append("SortOrderBy", this.sortObj.SortOrderBy);
            formData.append("Description", this.formLabelAlign.region);
            formData.append("diseaseFilter", text);
            formData.append("USERID", "kpi");
            formData.append("diseaseFilterMode", type);
            this.$axios
              .post("/hssp/tail/saveDiseaseDBLocalNew", formData)
              .then((res) => {
                this.loading = false;
                if (res.data == "success") {
                  this.dialogVisible = false;
                  this.$notify({
                    title: "到出提示",
                    message: "数据到处成功",
                    type: "success",
                  });
                  this.getDiseaseDBNameListLocal();
                }
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
        // this.onHide();
      }
    },
  },
};
</script>

<style lang="scss">
.dialogModel-name {
  display: flex;
  .el-select {
    flex: auto;
  }
  .el-button {
    width: 86px;
  }
}
</style>