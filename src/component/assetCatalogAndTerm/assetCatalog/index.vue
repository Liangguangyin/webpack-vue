<template>
  <div class="assetCatalog" ref="modelBox">
    <div class="assetCatalog-top" @mousedown="move">资产目录</div>
    <div class="assetCatalog-content">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="searchInput"></el-input>
      <div class="assetCatalog-content-tree">
        <vue-drag-tree
          v-if="treeData.length>0"
          :data="treeData"
          :allowDrag="allowDrag"
          :allowDrop="allowDrop"
          :disableDBClick="true"
          :defaultText="'New Node'"
          @current-node-clicked="curNodeClicked"
          :defaultProps="defaultProps"
        ></vue-drag-tree>
        <div class="assetCatalog-content-tree-text" v-else>暂无数据</div>
      </div>
      <div class="assetCatalog-content-loading" v-show="Loading">
        <span class="assetCatalog-content-loading-span">
          <i class="el-icon-loading"></i>
        </span>
      </div>
    </div>

    <div class="assetCatalog-bottom">
      <el-button type="primary" size="mini" @click="getProjectView">重 载</el-button>
      <el-button type="primary" size="mini" @click="onClose">关 闭</el-button>
    </div>
  </div>
</template>
<script>
import vueDragTree from "./vueDragTree/VueDragTree.vue";
export default {
  name: "assetCatalog",
  components: {
    vueDragTree,
  },
  data() {
    return {
      searchInput: "",
      treeData: [],
      Loading: false,
      defaultProps: {
        name: "title",
        children: "children",
        type: "资产目录",
      },
    };
  },
  mounted() {
    this.getProjectView();
    this.initialization();
  },
  methods: {
    allowDrag() {
      return false;
    },
    allowDrop() {
      return false;
    },
    curNodeClicked(model, component) {
      console.log("assetCatalogModel");
      if (!model.children) {
        model.children = [];
      }
    },
    initialization() {
      this.$store.commit("setzIndex");
      this.$refs.modelBox.style["z-index"] = this.$store.state.zIndex;
    },
    onClose() {
      this.$emit("close");
    },
    getProjectView() {
      this.Loading = true;
      this.$axios.post("/hssp/project/getProjectView").then((res) => {
        console.log(res);
        this.Loading = false;
        if (res.data.status == "succeed") {
          this.treeData = res.data.metaDataList;
        }
      });
    },
    move(e) {
      this.$store.commit("setzIndex");
      let odiv = e.path[1]; //获取目标元素
      odiv.style["z-index"] = this.$store.state.zIndex;
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //绑定元素位置到positionX和positionY上面
        this.positionX = top;
        this.positionY = left;
        if (left <= 0) {
          left = 0;
        } else if (
          left >=
          document.documentElement.clientWidth - odiv.offsetWidth
        ) {
          //document.documentElement.clientWidth 屏幕的可视宽度
          left = document.documentElement.clientWidth - odiv.offsetWidth;
        }

        if (top <= 0) {
          top = 0;
        } else if (
          top >=
          document.documentElement.clientHeight - odiv.offsetHeight
        ) {
          // document.documentElement.clientHeight 屏幕的可视高度
          top = document.documentElement.clientHeight - odiv.offsetHeight;
        }

        //移动当前元素
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>
<style lang="scss">
.assetCatalog {
  background: #fff;
  z-index: 100;
  width: 30%;
  min-width: 362px;
  position: fixed;
  top: 60px;
  // right: 30%;
  border: 1px solid #dedede;
  height: 90%;
  display: flex;
  flex-direction: column;
  .assetCatalog-top {
    height: 40px;
    background: #dee1e6;
    font-weight: 600;
    color: #303133;
    font-size: 20px;
    line-height: 40px;
    padding: 0 15px;
    cursor: move;
    // border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
  }
  .assetCatalog-content {
    flex: auto;
    overflow-y: auto;
    padding: 20px;
    position: relative;
    .assetCatalog-content-tree {
      width: 100%;
      height: 90%;
      overflow-y: auto;
      .assetCatalog-content-tree-text {
        // margin: 0 auto;
        font-size: 14px;
        width: 100%;
        text-align: center;
        line-height: 50px;
        color: #999999;
      }
    }
    .assetCatalog-content-loading {
      position: absolute;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
      background: rgba($color: #000000, $alpha: 0.7);
      .assetCatalog-content-loading-span {
        position: absolute;
        width: 30px;
        height: 300px;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
        font-size: 30px;
        color: #409eff;
      }
    }
  }
  .assetCatalog-bottom {
    border-top: 1px solid #dedede;
    height: 40px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
  }
}
</style>