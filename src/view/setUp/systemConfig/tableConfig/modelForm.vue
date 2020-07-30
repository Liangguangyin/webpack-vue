<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <slot name="modleChildren"></slot>
    <div slot="footer" class="dialog-footer">
      <slot name="footer"></slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "modelForm",
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      title: "修改配置"
    };
  },
  methods: {
    onVisible(obj = { type: "edit" }) {
      this.title = obj.type === "edit" ? "修改配置" : "查看详情";
      this.dialogFormVisible = true;
    },
    onHideModle() {
      this.dialogFormVisible = false;
    }
  }
};
</script>