<template>
  <div class="feedback">
    <div class="feedback-box">
      <div class="feedback-box-content">
        <el-form
          :label-position="labelPosition"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          :model="formLabelAlign"
        >
          <el-form-item label="反馈类型:">
            <el-select v-model="formLabelAlign.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="formLabelAlign.phone"></el-input>
          </el-form-item>
          <el-form-item label="附件:">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :on-change="fileChange"
              :file-list="fileList"
            >
              <el-button size="small" plain>选择文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="反馈内容:" prop="content">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="formLabelAlign.content"
              maxlength="100"
              show-word-limit
            ></el-input>
            <!-- <bigDataSelect /> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import bigDataSelect from "@/component/bigDataSelect/bigDataSelect";
export default {
  name: "feedback",
  components: {
    bigDataSelect,
  },
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        phone: "",
        type: "同义词",
        file: "",
        content: "",
      },
      options: [
        {
          label: "同义词",
          value: "同义词",
        },
        {
          label: "搜索数据疑问",
          value: "搜索数据疑问",
        },
        {
          label: "功能使用疑问",
          value: "功能使用疑问",
        },
        {
          label: "功能拓展建议",
          value: "功能拓展建议",
        },
        {
          label: "其他",
          value: "其他",
        },
      ],
      rules: {
        content: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      this.formLabelAlign.file = file.raw;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$loadingOpen();
          let formData = new FormData();
          formData.append("annex", this.formLabelAlign.file);
          formData.append("types", this.formLabelAlign.type);
          formData.append("feedbackContent", this.formLabelAlign.content);
          formData.append("contactPhone", this.formLabelAlign.phone);
          this.$axios.post("/hssp/head/addFeedback", formData).then((res) => {
            this.$loadingClose();
            if (res.data.status == "succeed") {
              this.$notify({
                title: "反馈提示",
                message: "你的反馈也成功提交，我们会尽快完善",
                type: "success",
              });
              this.formLabelAlign = {
                phone: "",
                type: "同义词",
                file: "",
                content: "",
              };
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.feedback {
  padding: 10px;
  width: 100%;
  height: 100%;
  .feedback-box {
    width: 100%;
    height: 100%;
    background: #ffffff;
    position: relative;
    .feedback-box-content {
      width: 50%;
      height: 80%;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      padding: 10px;
    }
  }
}
</style>