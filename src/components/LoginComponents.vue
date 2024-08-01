
<template>
  <div class="denglu">
    <p class="denglu_title">系统登录</p>
    <p class="denglu_smalltitle">欢迎进入系统</p>
    <br /><br /><br />
    <div class="left">
      <!-- <img class="erweima" src="../assets/erweima.png" alt=""> -->

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
      <p style="text-align: center">飞书扫码登录</p>
      <div id="fslogin"></div>
      <el-button @click="handleFeishu">点击生成二维码</el-button>
    </div>
  </div>
</template>
<script src="https://lf-package-cn.feishucdn.com/obj/feishu-static/lark/passport/qrcode/LarkSSOSDKWebQRCode-1.0.3.js"></script>

<script>

import { loginAPI } from "@/api";
export default {
  data() {
    return {
      //飞书数据
      feishu: {
        dialogVisible: false,
        QRLoginObj: "", // 是否生成了二维码
        client_id: "xxxx", // 应用的AppID
        redirect_uri: "http://xxx", // 应用配置重定向的地址
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
    // 在组件挂载后监听消息事件
    if (typeof window.addEventListener !== "undefined") {
      window.addEventListener("message", this.handleMessage, false);
    } else if (typeof window.attachEvent !== "undefined") {
      window.attachEvent("onmessage", this.handleMessage);
    }
  },
  methods: {
    // 点击按钮，生成二维码
    handleFeishu() {
      if (this.feishu.QRLoginObj !== "") return false; // 避免重复点击

      this.feishu.fs_url = `https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=${this.feishu.client_id}&redirect_uri=${this.feishu.redirect_uri}&response_type=code&state=STATE`;

      // 使用 window.QRLogin 创建二维码实例，这里的 QRLogin 是你自定义的方法或者库
      this.feishu.QRLoginObj = window.QRLogin({
        id: "fslogin", // 二维码展示区域的元素id
        goto: this.feishu.fs_url, // 授权页面地址
        width: "260", // 二维码展示区域的宽
        height: "260", // 二维码展示区域的高
        style: "width:260px;height:260px;border:none", // 可选的，二维码html标签的style属性
      });

      // 监听消息事件
      if (typeof window.addEventListener !== "undefined") {
        window.addEventListener("message", this.handleMessage, false);
      } else if (typeof window.attachEvent !== "undefined") {
        window.attachEvent("onmessage", this.handleMessage);
      }
    },
    // 处理接收到的消息
    handleMessage(event) {
      if (
        this.feishu.QRLoginObj &&
        this.feishu.QRLoginObj.matchOrigin(event.origin) &&
        this.feishu.QRLoginObj.matchData(event.data)
      ) {
        this.feishu.tmp_code = event.data.tmp_code;
        // 拼接授权页面地址并跳转
        window.location.href = `${this.feishu.fs_url}&tmp_code=${this.feishu.tmp_code}`;
        // 如果需要执行其他操作，可以在这里处理
      }
    },

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
  border: 1px solid red;
}
</style>
