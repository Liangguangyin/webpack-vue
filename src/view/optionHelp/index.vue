<template>
  <div class="optionHelp">
    <div class="optionHelp-tree">
      <dynamicTree @callback="callBack" :treeData="treeData" :defaultProps="defaultProps" />
    </div>
    <div class="optionHelp-view">
      <video
        class="optionHelp-view-video"
        muted="true"
        preload="auto"
        poster="http://192.168.0.24:8081/hssp/resources/images/hssp_video.png"
        src="http://192.168.0.24:8081/hssp/resources/mp4/Video_Export_1-2-1.mp4"
      ></video>
    </div>
  </div>
</template>
<script>
export default {
  name: "optionHelp",
  data() {
    return {
      defaultProps: {
        label: "label",
        children: "children"
      },
      treeData: [
        {
          label: "视屏",
          children: [
            {
              label: "检索"
            },
            {
              label: "导出"
            }
          ]
        },
        {
          label: "文档",
          children: [
            {
              label: "检索式功能列表"
            },
            {
              label: "检索用户指南"
            },
            {
              label: "常见问题解答"
            }
          ]
        }
      ]
    };
  },
  methods: {
    callBack(obj) {
      console.log(obj);
    }
  }
};
</script>
<style lang="scss" scoped>
.optionHelp {
  width: 100%;
  height: 100%;
  display: flex;
  .optionHelp-tree {
    width: 300px;
    height: 100%;
    .treebox {
      height: 100%;
    }
  }
  .optionHelp-view {
    flex: auto;
    border: 1px solid #dedede;
    padding: 10px;
    background: #dedede;
    .optionHelp-view-video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>