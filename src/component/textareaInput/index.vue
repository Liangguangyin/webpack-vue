<template>
  <div class="textareaInput">
    <div
      class="textareaInput-content"
      :style="{'box-shadow': status ? '0 1px 5px 0 rgba(245,108,108,1)' : null}"
    >
      <div class="textareaInput-content-box">
        <textarea
          class="textareaInput-content-input"
          v-model="textarea"
          type="textarea"
          placeholder="搜索内容"
          @focus.prevent="onFocusEvent"
          @blur.prevent="onBlurEvent"
          @click="onClickEvent"
          @keyup="onClickEvent"
        />
        <ul v-show="textarea && searchDataShow">
          <li
            v-for="(item,index) in searchDataCopy"
            :key="index"
            @mousedown="onClickSearchData(item)"
          >{{item.text}}</li>
        </ul>
      </div>
      <div class="textareaInput-content-seize"></div>
      <button class="textareaInput-content-btn" @click="onSearch">搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "textareaInput",
  props: {
    searchValue: {
      type: String | Number,
      default: () => ""
    }
  },
  components: {},
  data() {
    return {
      searchData: [
        {
          text: "123123123123"
        },
        {
          text: "textareaInputcontent"
        },
        {
          text: "textareaInput"
        },
        {
          text: "textareaInput-content"
        },
        {
          text: "123123123123"
        },
        {
          text: "textareaInputcontent"
        },
        {
          text: "textareaInput"
        },
        {
          text: "textareaInput-content"
        },
        {
          text: "123123123123"
        },
        {
          text: "textareaInputcontent"
        },
        {
          text: "textareaInput"
        },
        {
          text: "textareaInput-content"
        },
        {
          text: "123123123123"
        },
        {
          text: "textareaInputcontent"
        },
        {
          text: "textareaInput"
        },
        {
          text: "textareaInput-content"
        },
        {
          text: "123123123123"
        },
        {
          text: "textareaInputcontent"
        },
        {
          text: "textareaInput"
        },
        {
          text: "textareaInput-content"
        }
      ],
      searchDataCopy: [],
      textarea: "",
      searchDataShow: false,
      status: false,
      currentText: ""
    };
  },
  mounted() {
    this.textarea = this.searchValue;
  },
  watch: {
    searchValue(val) {
      this.textarea = val;
    },
    textarea(val) {
      this.webSearch(val);
    }
  },
  methods: {
    webSearch(val) {
      let arr = [];
      this.searchData.map(item => {
        if (item.text.indexOf(val) !== -1) {
          arr.push(item);
        }
      });
      this.searchDataCopy = arr;
    },
    onClickSearchData(obj) {
      this.textarea = obj.text;
    },
    onFocusEvent(val) {
      this.searchDataShow = true;
    },
    // 获取光标所在位置的文字
    onClickEvent(e) {
      let element = e.target;
      let num = null;
      if (e.type == "keyup") {
        if (e.code == "ArrowLeft" || e.code == "ArrowRight") {
          num = element.selectionStart;
        }
      } else {
        num = element.selectionStart;
      }
      if (num) {
        let i = 1;
        for (const key of this.textarea) {
          if (i == num) {
            this.currentText = key;
            break;
          }
          i++;
        }
      }
    },
    onBlurEvent() {
      this.searchDataShow = false;
    },
    onSearch() {
      if (this.textarea) {
        this.$emit("search-event", this.textarea);
      } else {
        this.status = true;
        setTimeout(() => {
          this.status = false;
        }, 500);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.textareaInput-content {
  border: 1px solid #dedede;
  display: flex;
  border-radius: 3px;
  // width: 500px;
  // margin: auto;
  position: relative;
  .textareaInput-content-seize {
    width: 80%;
    height: 38px;
  }
  .textareaInput-content-box {
    position: absolute;
    width: 100%;
    z-index: 100;
    ul {
      padding: 15px;
      max-height: 200px;
      overflow-y: auto;
      background: rgba($color: black, $alpha: 0.7);
      li {
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
      }
      li:hover {
        color: #666666;
        background: #fff;
      }
    }
  }
  .textareaInput-content-input {
    width: 80%;
    border: 1px solid transparent;
    min-height: 38px;
    height: 38px;
    line-height: 38px;
    outline: none;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    font-size: 14px;
    text-indent: 28px;
    color: #666666;
    resize: vertical;
    max-height: 120px;
    padding: 0px;
    border: none;
  }
  .textareaInput-content-btn {
    border: 1px solid transparent;
    outline: none;
    width: 20%;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    background: #409eff;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    float: right;
    z-index: 1000;
  }
  .textareaInput-content-btn:hover {
    background: #66b1ff;
  }
}
</style>