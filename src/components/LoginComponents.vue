
<template>
  <div class="denglu">
    <div class="left">
      <!-- <img class="erweima" src="../assets/erweima.png" alt=""> -->
      <p class="denglu_title">系统登录</p>
      <p class="denglu_smalltitle">欢迎进入系统</p>
      <br /><br />
      <el-form ref="form" :model="loginForm" label-width="40px">
        <el-form-item label="账号" prop="username">
          <el-input
            placeholder="请输入账号"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"
          ><el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
          ></el-input
        ></el-form-item>

        <el-form-item>
          <el-button class="button" type="primary" @click="login"
            >登录</el-button
          >
          <!-- <el-button class="button" type="primary" @click="login">飞书登录</el-button>  -->
          <p style="text-align: right; font-size: 12px; color: #409eff">
            立即注册
          </p>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <!-- <div style="text-align: center;margin-top: 24px;">飞书扫码登录</div>
      <div
        id="fslogin"
        style="margin-left: calc(50% - 130px); width: 260px; height: 260px"
      ></div>
      <el-button @click="handleFeishu" class="shengcheng"
        >点击生成二维码</el-button
      > -->


      <div>
    <h1>飞书扫码登录</h1>
    <hr />

    <div id="login_container"></div>

    <div v-if="userInfo.picture" class="result-box">
      <div>
        <img v-if="userInfo.picture" :src="userInfo.picture" width="60px" />
      </div>
      <p>{{ userInfo.name }}</p>
      <p>登录成功！</p>
    </div>
  </div>
    </div>
  </div>
</template>
<!-- <script src="https://lf-package-cn.feishucdn.com/obj/feishu-static/lark/passport/qrcode/LarkSSOSDKWebQRCode-1.0.3.js"></script> -->

<script src="https://lf-package-cn.feishucdn.com/obj/feishu-static/lark/passport/qrcode/LarkSSOSDKWebQRCode-1.0.3.js"></script>

<script>
var domain = "https://lingjulidigital.com/api/feishu/callback";  // 这里要改：这个飞书等下要重定向的地址，要改成你的
var backUrl = domain;
var config = {
  client_id: "cli_a61d85652ffad00e", // 用你的App ID替换
  client_secret: "1mbqbWoVjM4x8aqUrPJWi0X68zg2P017", // 用你的App Secret
  redirect_uri: backUrl,
};
let origin = window.location.origin;




import { loginAPI } from "@/api";
export default {
  data() {
    return {
      
      userInfo: {
        picture: "",
        name: "sdf",
      },
      //飞书数据
      feishu: {
        dialogVisible: false,
        QRLoginObj: "", // 是否生成了二维码
        client_id: "cli_a61d85652ffad00e", // 应用的AppID
        redirect_uri: "https://lingjulidigital.com/api/feishu/callback", // 应用配置重定向的地址
        fs_url: "",
        tmp_code: "",
      },
      // 表单数据对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单数据验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户昵称:)", trigger: "blur" },
          {
            min: 2,
            max: 25,
            message: "长度在 2 到 25 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码~~", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },
  components: {},
  

  mounted() {
    let params = this.getUrlParams();
    console.log("params", params);
    // 如果url上面有code参数，就表示用户扫码成功了
    if (params && params.code) {
      // 获取token https://open.feishu.cn/document/common-capabilities/sso/api/get-access_token
      let form = {
        grant_type: "authorization_code",
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: params.code,
        redirect_uri: config.redirect_uri,
      };
      this.getToken(form);
    } else {
      // 页面刚进来，url上面还没有code参数，就要拉起二维码
      this.getQrCode();
    }




    // // 在组件挂载后监听消息事件
    // if (typeof window.addEventListener !== "undefined") {
    //   window.addEventListener("message", this.handleMessage, false);
    // } else if (typeof window.attachEvent !== "undefined") {
    //   window.attachEvent("onmessage", this.handleMessage);
    // }
  },
  methods: {

    getQrCode() {
      console.log("-------调起扫码----");

      // 调起扫码
      var goto = `https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&response_type=code&state=state123456`;

      // 利用前端网页跳转
      // window.location.href = url;
      var QRLoginObj = QRLogin({
        id: "login_container",
        goto,
        // goto: "https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=cli_a03f23493d39d00e&redirect_uri=https%3A%2F%2Fwww.baidu.com&response_type=code&state=STATE",
        width: "300",
        height: "300",
      });
      var handleMessage = function (event) {
        console.error("event", event);
        var origin = event.origin;
        // 使用 matchOrigin 方法来判断 message 是否来自飞书页面
        if (QRLoginObj.matchOrigin(origin)) {
          var loginTmpCode = event.data;
          // 在授权页面地址上拼接上参数 tmp_code，并跳转
          window.location.href = `${goto}&tmp_code=${loginTmpCode}`;
          console.log(loginTmpCode);
        }
      };
      if (typeof window.addEventListener != "undefined") {
        window.addEventListener("message", handleMessage, false);
      } else if (typeof window.attachEvent != "undefined") {
        window.attachEvent("onmessage", handleMessage);
      }
      // 原文链接：https://blog.csdn.net/xutongbao/article/details/123278795
    },
    get_userinfo(access_token) {
      let url = "https://passport.feishu.cn/suite/passport/oauth/userinfo";
      $.ajax({
        type: "get",
        url,
        cache: false,
        async: true,
        beforeSend: function (XHR) {
          // 功能：添加自定义 HTTP 头 Authorization。
          XHR.setRequestHeader("Authorization", `Bearer ${access_token}`);
        },
        dataType: "json",
        // dataType: ($.browser.msie) ? "text" : "xml",
        success: function (data) {
          console.log("get_userinfo-成功--", data);
        },
        fail: function (err) {
          console.log("get_userinfo-err--", err);
        },
      });
    },
    getToken(form) {
      let url = origin + "/api/getfsToken";
      let that = this;
      $.ajax({
        type: "post",
        url,
        data: form,
        cache: false,
        async: true,
        beforeSend: function () {
          //等待延迟的函数
        },
        dataType: "json",
        // dataType: ($.browser.msie) ? "text" : "xml",
        success: function (data) {
          console.log("getfsToken-成功--", data);
          // 更新页面数据
          that.userInfo.picture = data.picture;
          that.userInfo.name = data.name;

          // get_userinfo(data.access_token) // 前端访问会跨域，还是需要通过后台访问
        },
        fail: function (err) {
          console.log("getfsToken-err--", err);
        },
      });
    },
    // 获取url的参数
    getUrlParams() {
      let str = window.location.search;
      console.log("str", str);
      // ?code=051YCH000vmCDN1EmM200Bdl0f3YCH0w:77 str ?
      if (str && str.includes("?") && str.includes("=")) {
        let obj = {};
        str = str.slice(1);
        console.log("str", str);
        if (str.includes("&")) {
          let arr = str.split("&");
          console.log("arr", arr);
          for (let i = 0; i < arr.length; i++) {
            let one = arr[i].split("=");
            obj[one[0]] = one[1];
          }
        } else {
          let one = str.split("=");
          obj[one[0]] = one[1];
        }
        return obj;
      }
    },
  









    // // 点击按钮，生成二维码
    // handleFeishu() {
    //   if (this.feishu.QRLoginObj !== "") return false; // 避免重复点击

    //   this.feishu.fs_url = `https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=${this.feishu.client_id}&redirect_uri=${this.feishu.redirect_uri}&response_type=code&state=STATE`;

    //   // 使用 window.QRLogin 创建二维码实例，这里的 QRLogin 是你自定义的方法或者库
    //   this.feishu.QRLoginObj = window.QRLogin({
    //     id: "fslogin", // 二维码展示区域的元素id
    //     goto: this.feishu.fs_url, // 授权页面地址
    //     width: "80", // 二维码展示区域的宽
    //     height: "80", // 二维码展示区域的高
    //     style: "width:260px;height:260px;border:none", // 可选的，二维码html标签的style属性
    //   });

    //   // 监听消息事件
    //   if (typeof window.addEventListener !== "undefined") {
    //     window.addEventListener("message", this.handleMessage, false);
    //   } else if (typeof window.attachEvent !== "undefined") {
    //     window.attachEvent("onmessage", this.handleMessage);
    //   }
    //   console.log(this.client_id);
    // },
    // // 处理接收到的消息
    // handleMessage(event) {
    //   if (
    //     this.feishu.QRLoginObj &&
    //     this.feishu.QRLoginObj.matchOrigin(event.origin) &&
    //     this.feishu.QRLoginObj.matchData(event.data)
    //   ) {
    //     this.feishu.tmp_code = event.data.tmp_code;
    //     // 拼接授权页面地址并跳转
    //     console.log(this.feishu.tmp_code);
    //     window.location.href = `${this.feishu.fs_url}&tmp_code=${this.feishu.tmp_code}`;
    //     // 如果需要执行其他操作，可以在这里处理
    //   }
    // },

    //登录方法 再次校验-------------------------------
    login() {
      this.$refs.LoginFormRef.validate(async (result) => {
        if (!result) return;
        const loginData = { ...this.loginForm };
        //发起请求
        const { data: res } = await loginAPI(loginData);
        console.log(res);

        // 显示提示信息
        this.$message(res.meta.msg);
        // 如果失败  则停止执行
        if (res.meta.status !== 200) {
          return;
        } else {
          // 如果成功
          // 将返回的token 保存到 sessionStorage
          console.log(11);
          window.sessionStorage.setItem("token", res.data.token);
          // 跳转到home页面
          this.$router.push("/home");
        }
      });
    },
    //添加表单重置方法
    resetForm() {
      this.$refs.LoginFormRef.resetFields();
    },
  },
  beforeDestroy() {
    // 组件销毁时移除事件监听，防止内存泄漏
    window.removeEventListener("message", this.handleMessage);
  },
};
</script>

<style  scoped>
.denglu {
  position: relative;
  width: 50%;
  height: 400px;
  color: black;
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  margin-left: 20%;
  margin-top: 74px;
}
.denglu_title {
  text-align: center;
  font-weight: 800;
  font-size: 36px;
}
.denglu_smalltitle {
  text-align: center;
}
.button {
  width: 60%;
  margin-left: 15%;
}
/* .erweima{
  width: 16%;
  position: absolute;
  right: 0;
  top: 0;
} */
.left {
  float: left;
  width: 50%;
}
.right {
  float: left;
  margin-left: 9%;
  width: 40%;
  height: 300px;
}
.shengcheng {
  /* margin-top: 24px; */
  margin-left: calc(50% - 70px);
}
</style>
