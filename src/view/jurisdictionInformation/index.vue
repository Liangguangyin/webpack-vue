<template>
  <div class="jurisdictionInformation" v-loadmore="load">
    <!-- <div class="input">
      <i class="el-icon-search"></i>
      <input type="text">
    </div>-->
    <div class="el-select-dropdown">
      <ul class="el-select-dropdown__wrap123123123">
        <li v-for="(item,index) in arr" :key="index">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
Vue.directive("loadmore", {
  bind(el, binding) {
    const SELECTWRAP_DOM = el.querySelector(".el-select-dropdown");
    SELECTWRAP_DOM.addEventListener("scroll", function () {
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;
      if (CONDITION) {
        binding.value();
      }
    });
  },
});
export default {
  name: "jurisdictionInformation",
  data() {
    return {
      arr: [],
    };
  },
  mounted() {
    this.arr = [
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
      {
        name: 1123,
      },
    ];
  },
  methods: {
    load() {
      console.log(111111111);
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  width: 500px;
  padding: 0 20px;
  margin: 10px;
  position: relative;
  display: flex;
  align-items: center;
  input {
    width: 100%;
  }
  .el-icon-search {
    position: absolute;
    right: 30px;
    z-index: 1000;
    cursor: pointer;
  }

  .el-icon-search:hover {
    color: #4395ff;
  }
}
.el-select-dropdown {
  height: 500px;
  overflow-y: auto;
}
</style>