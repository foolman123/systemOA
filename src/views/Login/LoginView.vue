<template>
  <div class="login_index">
    <div class="logo">
      <div class="logo_1">
        <img src="../../assets/20240716-114619.png" alt="" />
      </div>
      搜索OA系统
    </div>
    <Login_ComponentsVue />
  </div>
</template>


<script>
import Login_ComponentsVue from "@/components/LoginComponents.vue";

export default {
  name: "LoginView",
  data() {
    return {};
  },
  components: { Login_ComponentsVue },
};
</script>


<style scoped>
.login_index {
  background-image: url(../../assets/wallhaven-131r3g.jpg);
  width: 100%;
  height: 700px;
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
  padding-top: 36px;
  padding-left: 24px;
}
.logo {
  height: 48px;
  color: white;
  font-size: 36px;
  line-height: 48px;
  font-weight: 700;
}
.logo_1 {
  float: left;
}
.logo_1 > img {
  margin-right: 12px;
  width: 48px;
  height: 48px;
}
</style>
