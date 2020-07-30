<template>
  <div class="login">
    <div class="login-logo">
      <img :src="imgUrl" />
    </div>
    <div class="login-form">
      <div class="login-form-totle">
        <h1>健康医疗大数据</h1>
        <h1>统一工作平台</h1>
      </div>
      <div class="login-form-content">
        <ul>
          <li>
            <el-autocomplete
              class="inline-input"
              v-model="username"
              :fetch-suggestions="querySearch"
              placeholder="请输入账号"
              @select="handleSelect"
            ></el-autocomplete>
          </li>
          <li>
            <el-input
              v-model="password"
              placeholder="请输入密码"
              @keyup.enter.native="login"
              show-password
            ></el-input>
          </li>
          <li>
            <dt>
              <el-checkbox v-model="checked">记住账号</el-checkbox>
            </dt>
            <dd>
              <el-button type="text" @click="changePassword">修改密码</el-button>
            </dd>
          </li>
          <li>
            <el-button type="primary" @click="login">登陆</el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import hxlogin from "../../../public/img/hxlogo.png";
const Base64 = require("js-base64").Base64;
export default {
  name: "login",
  data() {
    return {
      imgUrl: hxlogin,
      username: "",
      password: "",
      checked: false,
      restaurants: []
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  watch: {
    username(val) {
      if (!val) {
        this.password = "";
        this.checked = false;
      }
    }
  },
  methods: {
    changePassword() {
      console.log("修改密码");
    },
    login() {
      if ((this.username, this.password)) {
        this.$store.commit("setToken", JSON.stringify(this.username));
        let arr = JSON.parse(localStorage.getItem("userpass"))
          ? JSON.parse(localStorage.getItem("userpass"))
          : [];
        if (this.checked) {
          let boo = true;
          // 判断当前账号是否存在，如果存在就修改密码

          for (let i = 0; i < arr.length; i++) {
            if (Base64.decode(arr[i].user) == this.username) {
              arr[i].pass = Base64.encode(this.password);
              boo = false;
              break;
            }
          }
          // 如果不存在就添加账号
          if (boo) {
            arr.push({
              user: Base64.encode(this.username),
              pass: Base64.encode(this.password)
            });
          }
          localStorage.setItem("userpass", JSON.stringify(arr));
        } else {
          // 如果没有勾选记住密码就删除该账号
          arr = arr.filter(item => item.user !== Base64.encode(this.username));
          localStorage.setItem("userpass", JSON.stringify(arr));
        }
        this.$router.push("/");
      } else {
        this.$message({
          message: "请输入用户名或密码",
          type: "warning"
        });
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

    loadAll() {
      let data = [];
      const arr = JSON.parse(localStorage.getItem("userpass"));
      if (arr) {
        arr.map((item, index) => {
          data[index] = {
            value: Base64.decode(item.user),
            pass: Base64.decode(item.pass),
            user: Base64.decode(item.user)
          };
        });
      }
      return data;
    },
    handleSelect(item) {
      this.username = item.user;
      this.password = item.pass;
      this.checked = true;
    }
  }
};
</script>

<style lang="scss">
.login {
  background-image: url("../../../public/img/hxbg.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: relative;
  .login-logo {
    width: 33.3%;
    height: 65%;
    position: absolute;
    left: -19%;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .login-form {
    // height: ;
    width: 29%;
    height: 65%;
    position: absolute;
    left: 50%;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 40px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(53, 69, 144, 1);
    .login-form-totle {
      height: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      h1 {
        font-size: 30px;
        color: #fff;
        font-weight: 800;
        text-align: center;
        line-height: 40px;
      }
    }
    .login-form-content {
      height: 70%;

      ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        li {
          color: #fff;
          display: flex;
          justify-content: space-between;
          .el-button--primary {
            width: 100%;
          }
          .el-checkbox__label {
            color: #fff;
          }
          .el-button--text {
            color: #fff;
          }
          .el-autocomplete {
            width: 100%;
          }
          .el-checkbox__label {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>