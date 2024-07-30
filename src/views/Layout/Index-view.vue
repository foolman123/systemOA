<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside
      class="menu_left"
      width="200px"
      style="background-color: rgb(238, 241, 246)"
    >
      <p class="houtai">后台管理系统</p>
      <el-menu :default-openeds="['1', '2']">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>数据分析</template
          >
          <el-menu-item-group>
            <el-menu-item index="1-1"
              ><i class="el-icon-pie-chart"></i
              ><router-link to="/statistical"
                >数据统计表</router-link
              ></el-menu-item
            >
            <el-menu-item index="1-2"
              ><i class="el-icon-pie-chart"></i
              ><router-link to="/real">实时数据统计</router-link></el-menu-item
            >
            <el-menu-item index="1-3"
              ><i class="el-icon-pie-chart"></i
              ><router-link to="/materral"
                >素材数据分析</router-link
              ></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>物料管理</template>
          <el-menu-item-group>
            <el-menu-item index="2-1"
              ><i class="el-icon-document"></i
              ><router-link to="/domain">域名管理</router-link></el-menu-item
            >
            <el-menu-item index="2-4"
              ><i class="el-icon-document"></i
              ><router-link to="/drop">投放链接管理</router-link></el-menu-item
            >
            <el-menu-item index="2-2"
              ><i class="el-icon-document"></i
              ><router-link to="/tonic">Tonic管理</router-link></el-menu-item
            >
            <el-menu-item index="2-3"
              ><i class="el-icon-document"></i>pixel管理</el-menu-item
            >

            <el-menu-item index="2-5"
              ><i class="el-icon-document"></i>流量源配置</el-menu-item
            >
            <el-menu-item index="2-6"
              ><i class="el-icon-document"></i>变现源配置</el-menu-item
            >
            <el-menu-item index="2-7"
              ><i class="el-icon-document"></i>offer配置</el-menu-item
            >
            <el-menu-item index="2-8"
              ><i class="el-icon-document"></i>域名申请</el-menu-item
            >
            <el-menu-item index="2-9"
              ><i class="el-icon-document"></i>投放链接配置</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container class="menu_right">
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main class="mianbao"> 这是面包屑 </el-main>
      <!-- <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </el-main> -->
      <router-view />
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(10).fill(item),
    };
  },
};
</script>


<style scoped>
.houtai {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 60px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.menu_left {
  position: absolute;
  top: 0;
}
.menu_right {
  margin-left: 200px;
}
.mianbao {
  background-color: skyblue;
  text-align: center;
}
* {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.router-link-active {
  color: #409eff;
  font-size: 18px;
  /* font-style: italic;  */
}
</style>
