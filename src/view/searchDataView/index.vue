<template>
  <div class="searchDataView">
    <search-filter ref="filter" />
    <searchTable class="searchDataView-table" :topheight="topheight" />
  </div>
</template>

<script>
import searchFilter from "./searchFilter";
import searchTable from "./searchTable";
export default {
  name: "searchDataView",
  components: {
    searchFilter,
    searchTable
  },
  data() {
    return {
      topheight: 0
    };
  },
  mounted() {
    // 获取高度，高度没有算上border所以需要加3
    this.topheight = this.$refs.filter.$el.clientHeight + 3;

  }
};
</script>

<style lang="scss" scoped>
// .searchDataView{
//   display: flex;
//   flex-direction: column;
//   .searchDataView-table{
//     flex: auto;
//     overflow: hidden;
//   }
// }
</style>