<template>
  <div class="treebox">
    <div class="head">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <div>
        <el-tooltip
          v-if="JSON.stringify(data) !== '[]'"
          :enterable="false"
          class="item"
          effect="dark"
          content="新增分类"
          placement="bottom"
        >
          <i class="fa el-icon-plus" @click="addOneLevel"></i>
        </el-tooltip>
        <el-tooltip
          v-else
          :enterable="false"
          class="item"
          effect="dark"
          content="刷新"
          placement="bottom"
        >
          <i class="fa el-icon-refresh" @click="refresh"></i>
        </el-tooltip>
      </div>
    </div>
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :props="defaultProps"
      :filter-node-method="filterNode"
      @node-click="onNodeClick"
      ref="tree"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="custom-tree-node-title">
          <i v-if="node.level === 1" class="fa" :class="labelIocn.one" aria-hidden="true"></i>
          <span v-else>
            <i class="fa" :class="labelIocn.two"></i>
            <!-- <i v-if="data.type == '1'" class="fa" :class="labelIocn.two"></i> -->
            <!-- <i v-else class="fa" :class="labelIocn.three"></i> -->
          </span>
          {{ node.label }}
        </span>
        <span class="operation">
          <span v-for="item in operationBtn" :key="item.type">
            <span class="operation-btn" v-if="item.condition(item,node,data)">
              <el-tooltip
                :enterable="false"
                class="item"
                effect="dark"
                :content="item.tooltip"
                placement="bottom"
              >
                <i
                  class="fa"
                  :class="item.iocn"
                  @click.stop="() => onOperation({type:item.type,data,node})"
                ></i>
              </el-tooltip>
            </span>
          </span>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
let id = 1000;
export default {
  name: "dynamicTree",
  props: {
    // 树数据
    treeData: {
      type: Array,
      default: () => []
    },
    /*
     * 按钮
     *
     *   iocn: "el-icon-plus", iocn,必须参数
     *   tooltip: "新增子类", 提示字段必须参数
     *   type: "addChild", 按钮类型必须字段
     *   limit: 5 , 层级限制，选填字段
     *   condition , v-if 判断按钮是否显示， 必填
     */
    operationBtn: {
      type: Array,
      default: () => []
    },

    // label的iocn 图标， 为了增加组件复用，不能固定死，可以父组件传
    labelIocn: {
      type: Object,
      default: () => {
        return {
          one: "el-icon-folder-opened",
          two: "el-icon-monitor",
          three: "el-icon-s-grid"
        };
      }
    },
    // callback => {} this.$emit 父级回调

    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "label"
        };
      }
    }
  },
  components: {},
  data() {
    return {
      filterText: "",
      data: []
    };
  },

  computed: {},

  mounted() {
    this.data = this.treeData;
  },
  watch: {
    treeData(val) {
      this.changePropsData(val);
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    changePropsData(val) {
      this.data = val;
    },

    onOperation(obj) {
      this.$emit("callback", obj);
    },

    addOneLevel() {
      this.$emit("callback", { type: "addClass", id: id++ });
    },

    refresh() {
      this.$emit("callback", { type: "refresh" });
    },

    onNodeClick(data, node) {
      this.$emit("callback", { type: "nodeClick", data, node });
    }
  }
};
</script>

<style lang="scss">
.treebox {
  .custom-tree-node {
    margin-right: 85px;
  }
  padding-top: 10px;
  background: #39436a;
  .el-input__inner {
    background: #0f183f;
    border: 1px solid #39436a;
  }
  .el-tree {
    color: #e0e1e7;
    background: #39436a;
    .operation {
      display: none;
      position: absolute;
      right: 10px;
    }
    .el-tree-node {
      .custom-tree-node-title {
        .fa:before {
          color: #8de567;
        }
      }
      &.is-current {
        & > .el-tree-node__content {
          background-color: #313a61;
          color: #8de567;
        }
      }

      .el-tree-node__content {
        background: #39436a;
        &:hover {
          background-color: #313a61;
          .operation {
            display: inline;
          }
        }
      }
    }
    .el-tree-node__expand-icon {
      color: #e0e1e7;
      &.is-leaf {
        color: transparent;
        cursor: default;
      }
    }
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #39436a;
    padding: 0 10px 0;
    .fa {
      margin-left: 10px;
      font-size: 16px;
      color: #3b87d9;
    }
    .fa:hover {
      color: #3b6aaa;
      cursor: pointer;
    }
  }
  .operation-btn {
    margin-left: 10px;
    .fa:hover {
      color: #3b87d9;
    }
  }
}
</style>