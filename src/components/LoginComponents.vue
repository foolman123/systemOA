
<template>
  <div class="denglu">
    <p class="denglu_title">系统登录</p>
    <p class="denglu_smalltitle">欢迎进入系统</p><br><br>
    <el-form ref="form" :model="loginForm" label-width="40px">
      <el-form-item label="账号" prop="username">
        <el-input placeholder="请输入账号" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password"
        ><el-input
          placeholder="请输入密码"
          v-model="loginForm.password"
          show-password
        ></el-input
      ></el-form-item>

      <el-form-item>
        <el-button class="button" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>

import { loginAPI } from "@/api";
export default {
  
  data() {
    return {
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
  components: {  },
  methods: {
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
},};
</script>

<style  scoped>
.denglu {
  width: 24%;
  color: black;
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  margin-left: 34%;
  margin-top: 74px;
}
.denglu_title{
  text-align: center;
  font-weight: 800;
  font-size: 36px;
}
.denglu_smalltitle{
  text-align: center;
}
.button{
  width: 60%;
  margin-left: 15%;
}
</style>
