<template>
  <div class="bigDataSelect">
    <div class="bigDataSelect-box" @click="onOpenSelect">
      {{title}}
      <span class="bigDataSelect-box-icon" :class="dynamicClass">
        <i class="el-icon-arrow-down"></i>
      </span>
      <transition name="select">
        <div class="bigDataSelect-box-downBox" v-show="dynamicClass == 'onOpenSelect'">
          <slot name="content"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "bigDataSelect",
  props: {
    title: {
      type: String,
      default: () => "请选择"
    }
  },
  data() {
    return {
      dynamicClass: "",
      openCass: ""
    };
  },
  methods: {
    onOpenSelect() {
      if (this.dynamicClass == "onOpenSelect") {
        this.dynamicClass = "closeSelect";
      } else {
        this.dynamicClass = "onOpenSelect";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bigDataSelect-box {
  border: 1px solid #dededd;
  position: relative;
  min-width: 50px;
  height: 28px;
  display: inline-block;
  border-radius: 5px;
  padding: 0 30px 0 10px;
  font-size: 14px;
  line-height: 28px;
  color: #666666;
  .bigDataSelect-box-downBox {
    position: absolute;
    // bottom: 0px;
  }
  .bigDataSelect-box-icon {
    position: absolute;
    right: 10px;
    top: 20%;
    font-size: 16px;
    color: #999999;
    height: 16px;
    width: 16px;
    .el-icon-arrow-down {
      position: absolute;
    }
  }
  .onOpenSelect {
    animation: 0.3s rainbow forwards;
  }
  @keyframes rainbow {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-180deg);
    }
  }
  .closeSelect {
    animation: 0.3s closeSelect forwards;
  }
  @keyframes closeSelect {
    0% {
      transform: rotate(-180deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  .select-enter-active {
    transition: all 0.5s ease;
  }
  .select-enter,
  .select-leave-to {
    transform: translatey(0px);
    opacity: 0;
  }
}
</style>