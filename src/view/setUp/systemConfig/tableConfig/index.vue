<template>
  <div>
    <table-list
      :fieldList="fieldList"
      :dataList="dataList"
      :pagination="pagination"
      :height="height"
    >
      <template slot="bottom-button">
        <el-button type="primary" size="mini">回收站</el-button>
      </template>
    </table-list>
    <modelForm ref="model">
      <template slot="modleChildren">
        <!-- 加密创建模态框 -->
        <div>
          <el-form
            :model="tableForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            size="mini"
          >
            <el-form-item label="id" prop="id">
              <el-input v-model="tableForm.id"></el-input>
            </el-form-item>
            <el-form-item label="库名" prop="library">
              <el-input v-model="tableForm.library"></el-input>
            </el-form-item>
            <el-form-item label="表名" prop="tableName">
              <el-input v-model="tableForm.tableName"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describe">
              <el-input v-model="tableForm.describe"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template slot="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="preservation">保 存</el-button>
      </template>
    </modelForm>
  </div>
</template>

<script>
import modelForm from "./modelForm";
export default {
  name: "tableConfig",
  components: {
    modelForm
  },
  data() {
    return {
      fieldList: [
        {
          config: {
            label: "编码",
            prop: "a",
            align: "center"
          }
        },
        {
          config: {
            label: "库名",
            prop: "b",
            align: "center"
          }
        },
        {
          config: {
            label: "表名",
            prop: "c",
            align: "center"
          }
        },
        {
          config: {
            label: "描述",
            prop: "d",
            align: "center"
          }
        },
        {
          config: {
            label: "排序",
            prop: "e",
            align: "center"
          }
        },
        {
          config: {
            label: "操作",
            prop: "f",
            align: "center"
          },
          render: (h, scope) => {
            return (
              <div>
                <a
                  href="javascript:;"
                  style="margin-right: 10px"
                  onClick={() => {
                    this.showDetails(scope.row);
                  }}
                >
                  查看详情
                </a>
                <a
                  href="javascript:;"
                  style="margin-right: 10px"
                  onClick={() => {
                    this.onEdit(scope.row);
                  }}
                >
                  修改
                </a>
                <a
                  href="javascript:;"
                  onClick={() => {
                    this.delete(scope.row);
                  }}
                >
                  删除
                </a>
              </div>
            );
          }
        }
      ],
      dataList: [
        {
          a: 1,
          b: "SOLR_DM",
          c: "PatinfoVisitRecord",
          d: "就诊记录",
          e: "1",
          f: "1"
        },
        {
          a: 2,
          b: "SOLR_DM",
          c: "PatinfoVisitRecord",
          d: "就诊记录",
          e: "2",
          f: "1"
        },
        {
          a: 1,
          b: "SOLR_DM",
          c: "PatinfoVisitRecord",
          d: "就诊记录",
          e: "1",
          f: "1"
        },
        {
          a: 2,
          b: "SOLR_DM",
          c: "PatinfoVisitRecord",
          d: "就诊记录",
          e: "2",
          f: "1"
        },
        {
          a: 1,
          b: "SOLR_DM",
          c: "PatinfoVisitRecord",
          d: "就诊记录",
          e: "1",
          f: "1"
        },
        {
          a: 2,
          b: "SOLR_DM",
          c: "PatinfoVisitRecord",
          d: "就诊记录",
          e: "2",
          f: "1"
        }
      ],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageTotal: 20
      },
      rules: [],
      tableForm: {
        id: "",
        library: "",
        tableName: "",
        describe: ""
      }
    };
  },
  computed: {
    height() {
      return this.$store.state.setUpRightHeight;
    }
  },
  mounted() {},
  methods: {
    // 查看详情
    showDetails(val) {
      this.$refs.model.onVisible({ type: "details" });
    },
    // 修改
    onEdit(obj) {
      this.$refs.model.onVisible({ type: "edit" });
    },
    // 删除
    delete(obj) {
      console.log(obj);
      this.$confirm("此操作将永久删除, 是否继续?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 关闭弹出框
    closeModel() {
      this.$refs.model.onHideModle();
    },
    // 取消
    cancel() {
      this.closeModel();
    },
    // 保存
    preservation() {
      this.closeModel();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>