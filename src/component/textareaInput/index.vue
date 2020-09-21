<template>
  <div class="textareaInput">
    <div
      class="textareaInput-content"
      :style="{'box-shadow': status ? '0 1px 5px 0 rgba(245,108,108,1)' : null}"
    >
      <div class="textareaInput-content-box" v-if="showAndHide">
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
          >{{item}}</li>
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
      default: () => "",
    },
  },
  components: {},
  data() {
    return {
      searchData: [],
      searchDataCopy: [],
      textarea: "",
      searchDataShow: false,
      status: false,
      showAndHide: true,
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
    },
  },
  methods: {
    webSearch(val, field = "") {
      // searchType 提示词检索方式0.均提示，1，只提示医疗，2，只提示运营
      // type 类型为0的时候在搜索普通text， 类型为1的时候搜索【】里面的类型
      let type = 0;
      if (val) {
        if (field) {
          type = 1;
        }
        let url = "/hssp/body/getSearchTip";
        let formData = new FormData();
        formData.append("expression", val);
        formData.append("type", type);
        formData.append("field", field);
        formData.append("searchType", 0);
        this.$axios.post(url, formData).then((res) => {
          this.searchDataCopy = res.data.searchTipList;
        });
      }
    },
    onClickSearchData(val) {
      this.textarea = val;
    },
    onFocusEvent(val) {
      this.searchDataShow = true;
    },

    // 获取光标所在位置的文字 发送下拉列表请求
    // 逻辑有点多复杂， 不懂可以慢慢看注释
    onClickEvent(e) {
      if (e.keyCode == 13) {
        e.preventDefault();
        // 下面写你的发送消息的代码
      } else {
        let element = e.target;
        let value = element.value;
        let num = null;
        if (e.type == "keyup") {
          if (e.code == "ArrowLeft" || e.code == "ArrowRight") {
            num = element.selectionStart;
          }
        } else {
          num = element.selectionStart;
        }
        // num是当前光标所在位置，如果为null 说明没有内容，不需要任何操作
        if (num) {
          let i = 1;
          let front = [],
            last = [],
            currentText;
          for (const key of this.textarea) {
            // 判断是否有特殊检索
            if (key == "[") {
              front.push(i);
            } else if (key == "]") {
              last.push(i);
            } else if (i == num) {
              currentText = key;
            }
            i++;
          }
          // 特殊检索不止一个的情况准确查找是第几个
          for (let j = 0; j < last.length; j++) {
            if (last[j] > num) {
              i = j;
              break;
            }
          }
          // 第一种情况type是1，特殊内容检索
          if (front[i] && last[i]) {
            let index = 0,
              newValue = "";
            if (num > front[i] && last[i] > num) {
              let agr = value.split("]")[i].match(/\[(\S*)/)[1]; // 把需要的特殊内容切下来
              for (const text of agr) {
                // 获取当前光标在新string里面的位置
                if (index < num - front[i]) {
                  newValue = newValue + text;
                }
                index++;
              }
              this.webSearch(value, newValue);
              // 第二种就是普通检索
            } else {
              for (const text of value) {
                if (index < num) {
                  newValue = newValue + text;
                }
                index++;
              }
              this.webSearch(newValue);
            }
            // 第二种就是普通检索并且没有特殊符号的
          } else {
            this.webSearch(currentText);
          }
        }
      }
    },
    onBlurEvent() {
      this.searchDataShow = false;
      // 失去焦点重新渲染输入框，要不然不能拖拽粘贴
      (this.showAndHide = false),
        this.$nextTick(() => {
          this.showAndHide = true;
        });
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
    },
    // getSearchTip(val) {
    //   let url =
    //     "/hssp/body/getSearchTip?tk=45c25e97-333f-4d87-926e-ddb856f7e503";
    //   let params = {
    //     expression: val,
    //     type: 0,
    //     field: null,
    //     searchType: 0,
    //     Identity: null,
    //   };
    //   this.$axios.post(url, params).then((res) => {
    //     console.log(res);
    //   });
    // },
  },
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
    z-index: 80;
    ul {
      padding: 15px;
      max-height: 200px;
      overflow-y: auto;
      background: #ffffff;
      li {
        line-height: 30px;
        color: #666666;
        font-size: 14px;
        cursor: pointer;
      }
      li:hover {
        color: #999999;
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
    z-index: 99;
  }
  .textareaInput-content-btn:hover {
    background: #66b1ff;
  }
}
</style>