<template>
  <div>
    <div class="HomeFooter">
      <img :src="img" alt />
      <span>© 2013-2020 clinbrain 上海柯林布瑞信息技术有限公司 All Rights Reserved</span>
    </div>
  </div>
</template>

<script>
import imglogo from "../../../public/img/logo_clinbrain.png";
export default {
  name: "HomeFooter",
  data() {
    return {
      img: imglogo
    };
  }
};
</script>

<style lang="scss" scoped>
.HomeFooter{
  height: 30px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background: rgba($color: #000000, $alpha: 0.7);
  align-items: center;
  img{
    height: 26px;
  }
  span{
    line-height: 30px;
    font-size: 12px;
    color: #fff;
  }
}
</style>