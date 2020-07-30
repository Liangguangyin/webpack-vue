<template>
  <div style="height:100%; position:relative;">
    <div class="bottom-button">
      <slot name="bottom-button"></slot>
    </div>
    <el-table
      :data="dataList"
      border
      :height="height ? height : null"
      v-loading="showLoading"
      size="mini"
      style="width: 100%;"
      :fit="true"
      @header-click="headerClick"
    >
      <template v-for="(item,index ) in fieldList">
        <el-table-column v-if="!item.render" :key="index" v-bind.sync="item['config']"></el-table-column>
        <el-table-column v-else :key="index" v-bind.sync="item['config']">
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
        :page-sizes="[10, 20, 30, 40, 50]"
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
          default: () => null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      }
    }
  },
  props: {
    fieldList: {
      type: Array,
      default: () => []
    },

    dataList: {
      type: Array,
      default: () => []
    },

    showLoading: {
      type: Boolean,
      default: () => false
    },

    height: {
      type: String | Number,
      default: () => ""
    },

    pagination: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {};
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
    }
  }
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