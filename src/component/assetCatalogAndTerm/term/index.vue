<template>
  <div class="term" ref="tModelBox">
    <div class="term-top" @mousedown="move">术语</div>
    <div class="term-content">
      <el-input placeholder="请输入内容" v-model="searchInput" size="mini" class="input-with-select">
        <el-select v-model="select" @change="selectChange" slot="prepend" placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
        <el-button slot="append" @click="searach" icon="el-icon-search"></el-button>
      </el-input>
      <div class="term-content-tree" :style="{'height': searchType==0 ? '90%' : '57%'}">
        <vue-drag-tree
          v-if="data.length>0"
          :data="data"
          :allowDrag="allowDrag"
          :allowDrop="allowDrop"
          :defaultText="'New Node'"
          :disableDBClick="true"
          @current-node-clicked="curNodeClicked"
          :defaultProps="defaultProps"
        ></vue-drag-tree>
        <div class="term-content-tree-text" v-else>暂无数据</div>
      </div>
      <div class="term-content-tree-page" v-if="searchType == 1">
        <el-pagination layout="prev, pager, next" :total="20"></el-pagination>
      </div>
      <div class="term-content-structure" v-if="searchType == 1">
        <vue-drag-tree
          v-if="data.length>0"
          :data="structureData"
          :allowDrag="allowDrag"
          :allowDrop="allowDrop"
          :defaultText="'New Node'"
          :disableDBClick="false"
          @current-node-clicked="curNodeClicked"
          :defaultProps="defaultProps"
        ></vue-drag-tree>

        <div class="term-content-tree-text" v-else>暂无结构</div>
      </div>
      <div class="term-content-loading" v-show="Loading">
        <span class="term-content-loading-span">
          <i class="el-icon-loading"></i>
        </span>
      </div>
    </div>
    <div class="term-bottom">
      <el-button type="primary" size="mini" @click="()=>this.getTerminologyFancytreeListById()">重 载</el-button>
      <el-button type="primary" size="mini" @click="onClose">关 闭</el-button>
    </div>
  </div>
</template>
<script>
import vueDragTree from "./vueDragTree/VueDragTree.vue";
export default {
  name: "term",
  components: {
    vueDragTree,
  },
  data() {
    return {
      searchInput: "",
      treeData: [],
      select: "",
      options: [],
      data: [],
      structureData: [],
      defaultProps: {
        name: "title",
        children: "children",
        type: "术语",
      },
      Loading: false,
      searchType: 0,
    };
  },
  created() {
    this.getTerminologyFancytreeListById();
  },
  mounted() {
    this.initialization();
  },
  methods: {
    allowDrag(model, component) {
      return true;
    },
    allowDrop(model, component) {
      return false;
    },
    curNodeClicked(model, component) {
      console.log("termModel", model);
      if (!model.children && this.searchType == 0) {
        this.getTerminologyFancytreeListById(
          model.id,
          model["term"].sab,
          "",
          "click",
          model
        );
      } else if (
        this.searchType == 1 &&
        (!model.children || model.children.length == 0)
      ) {
        this.Loading = true;
        let formData = new FormData();
        formData.append("conceptId", model["term"].aui);
        formData.append("sab", model["term"].sab);
        formData.append("type", this.searchType);
        this.$axios
          .post("/hssp/rest/getTerminologyFancytreeListById", formData)
          .then((res) => {
            this.Loading = false;
            if (res.status == 200) {
              model.children = [];
              this.structureData = res.data;
              if (res.data.length == 0) {
                this.$notify.info({
                  title: "提示消息",
                  message: "暂无此节点的数据结构",
                });
              }
            }
          });
      }
    },
    searach() {
      this.Loading = true;
      let obj = this.options.filter((item) => item.id == this.select)[0];
      if (this.searchInput) {
        let formData = new FormData();
        formData.append("conceptId", obj.id);
        formData.append("pageNum", 1);
        formData.append("searchText", this.searchInput);
        formData.append("sab", obj["term"].sab);
        this.$axios
          .post("/hssp/rest/getTerminologyFancytreeListByIdSearch", formData)
          .then((res) => {
            console.log(res);
            this.Loading = false;
            this.data = res.data;
            this.searchType = 1;
          });
      } else {
        this.getTerminologyFancytreeListById(obj.id, obj["term"].sab);
      }
    },
    selectChange(val) {
      let obj = this.options.filter((item) => item.id == val)[0];
      this.getTerminologyFancytreeListById(obj.id, obj["term"].sab);
    },
    getTerminologyFancytreeListById(
      conceptId = "",
      sab = "",
      searchText = "",
      type = "",
      model
    ) {
      this.Loading = true;
      let formData = new FormData();
      formData.append("conceptId", conceptId);
      formData.append("pageNum", 1);
      formData.append("searchText", searchText);
      formData.append("sab", sab);
      this.$axios
        .post("/hssp/rest/getTerminologyFancytreeListById", formData)
        .then((res) => {
          this.Loading = false;
          if (res.status == 200) {
            this.searchType = 0;
            if (!conceptId) {
              this.options = res.data;
              this.select = res.data[0].id;
              this.getTerminologyFancytreeListById(
                res.data[0].id,
                res.data[0]["term"].sab
              );
            } else {
              if (type == "click") {
                this.$set(model, "children", res.data);
              } else {
                this.data = res.data;
              }
            }
          }
        });
    },

    initialization() {
      this.$store.commit("setzIndex");
      this.$refs.tModelBox.style["z-index"] = this.$store.state.zIndex;
    },
    onClose() {
      this.$emit("close");
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
.term {
  background: #fff;
  z-index: 100;
  width: 30%;
  min-width: 362px;
  position: fixed;
  top: 60px;
  right: 0px;
  border: 1px solid #dedede;
  height: 90%;
  display: flex;
  flex-direction: column;
  .term-top {
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
  .term-content {
    flex: auto;
    overflow-y: auto;
    padding: 20px;
    position: relative;
    .el-input-group__prepend {
      width: 110px;
    }
    .term-content-tree {
      height: 60%;
      overflow: auto;
      position: relative;
    }
    .term-content-tree-page {
      display: flex;
      justify-content: center;
    }
    .term-content-tree-text {
      // margin: 0 auto;
      font-size: 14px;
      width: 100%;
      text-align: center;
      line-height: 50px;
      color: #999999;
    }
    .term-content-structure {
      height: 30%;
      border: 1px solid #dedede;
      overflow: auto;
    }
    .term-content-loading {
      position: absolute;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
      background: rgba($color: #000000, $alpha: 0.7);
      .term-content-loading-span {
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
  .term-bottom {
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