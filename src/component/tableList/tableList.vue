<template>
  <div style="position:relative;">
    <div class="bottom-button">
      <slot name="bottom-button"></slot>
    </div>
    <el-table
      :data="dataList"
      border
      :max-height="height ? height : null"
      v-loading="showLoading"
      size="mini"
      style="width: 100%;"
      :row-key="setKeys"
      :fit="true"
      @header-click="headerClick"
      @selection-change="selectionChange"
      :span-method="spanMethod"
      ref="multipleTable"
    >
      <template>
        <slot name="checkBox"></slot>
      </template>
      <template v-for="(item,index ) in field">
        <!-- 这个hide有点抽象，因为需要配前端显示和隐藏，真的才不显示 -->
        <el-table-column
          v-if="!item.render && (!item.config['hide'] || item.config['hide'] == false)"
          :key="index"
          v-bind.sync="item['config']"
        ></el-table-column>
        <el-table-column
          v-if="item.render && (!item.config['hide'] || item.config['hide'] == false)"
          :key="index"
          v-bind.sync="item['config']"
        >
          <template slot-scope="scope">
            <expand-item :column="item" :row="scope.row" :render="item.render"></expand-item>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div style="height: 40px; background:#fff;" v-if="pagination"></div>
    <div class="pagination" v-if="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        size="mini"
        @current-change="handleCurrentChange"
        :current-page="pagination['currentPage']"
        :page-sizes="pageSizes"
        :page-size="pagination['pageSize']"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination['pageTotal']"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "tableList",
  components: {
    expandItem: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        column: {
          type: Object,
          default: () => null,
        },
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      },
    },
  },
  props: {
    fieldList: {
      type: Array,
      default: () => [],
    },

    dataList: {
      type: Array,
      default: () => [],
    },

    showLoading: {
      type: Boolean,
      default: () => false,
    },

    height: {
      type: String | Number,
      default: () => "",
    },

    pagination: {
      type: Object,
      default: () => null,
    },

    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50],
    },

    // 设置合并行的方法
    spanMethod: {
      type: Function,
      default: () => {
        () => {};
      },
    },

    // 设置key值方法，用法和官网都是一样的，只是把方法暴露给引用组件
    setKeys: {
      type: Function,
      default: () => {
        () => {};
      },
    },
  },
  data() {
    return {
      field: [],
      isRouterAlive: true,
    };
  },

  watch: {
    fieldList(val) {
      if (val.length !== 0) {
        this.field = val;
      }
    },
  },

  mounted() {
    if (this.fieldList.length !== 0) {
      this.field = this.fieldList;
    }
  },

  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      this.$emit("paginationEvent", { pageSize: val });
    },
    handleCurrentChange(val) {
      this.$emit("paginationEvent", { page: val });
    },
    headerClick(column, event) {
      try {
        this.$emit("header-click", column);
      } catch (err) {
        console.log(err);
      }
    },
    selectionChange(selection) {
      try {
        this.$emit("selection-change", selection);
      } catch (err) {
        console.log(err);
      }
    },
    getTableRefs() {
      return this.$refs.multipleTable;
    },
  },
};
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  height: 100%;
}
.pagination {
  position: absolute;
  bottom: 0;
  right: 2px;
  background-color: #fff;
  height: 40px;
  display: flex;
  align-items: center;
}
.bottom-button {
  position: absolute;
  bottom: 0;
  left: 2px;
  background-color: #fff;
  height: 40px;
  display: flex;
  align-items: center;
}
</style>