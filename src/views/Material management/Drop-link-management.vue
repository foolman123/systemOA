<template>
  <div class="drop" style="padding: 16px">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="margin-top: 16px"
    >
      <el-form-item label="域名地址">
        <el-input v-model="searchTerm" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="clicksearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 链接录入 -->

    <el-button
      @click="
        dialogVisible = true;
        linkGeneration();
        load_ref_adnetwork();
      "
      style="margin-bottom: 16px; background-color: #66b1ff; color: white"
    >
      链接生成
    </el-button>

    <el-dialog
      title="链接生成"
      :visible.sync="dialogVisible"
      width="64%"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeName1" @tab-click="handleClick1">
        <!-- 单链 -->
        <el-tab-pane label="单链" name="first">
          <!-- 域名录入表单 -->
          <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="link">
              <el-input v-model="form.link" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="ref_adnetwork">
              <el-select
                v-model="form.ref_adnetwork"
                filterable
                style="width: 300px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="ref_adnetwork">
              <el-input
                v-model="form.ref_adnetwork"
                style="width: 300px"
              ></el-input>
            </el-form-item> -->
            <el-form-item label="ref_pubsite">
              <el-input
                v-model="form.ref_adnetwork"
                style="width: 300px"
              ></el-input>
            </el-form-item>

            <el-form-item label="keywords1">
              <el-input
                v-model="keywords1"
                style="width: 300px"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>
            <el-form-item label="keywords2">
              <el-input
                v-model="keywords2"
                style="width: 300px"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>
            <el-form-item label="keywords3">
              <el-input
                v-model="keywords3"
                style="width: 300px"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>
            <el-form-item label="keywords4">
              <el-input
                v-model="keywords4"
                style="width: 300px"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>
            <el-form-item label="keywords5">
              <el-input
                v-model="keywords5"
                style="width: 300px"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>
            <el-form-item label="keywords6">
              <el-input
                v-model="keywords6"
                style="width: 300px"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>
            <el-form-item label="keywords7">
              <el-input
                v-model="keywords7"
                style="width: 300px"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>
            <el-form-item label="keywords8">
              <el-input
                v-model="keywords8"
                style="width: 300px"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>
            <el-form-item label="keywords9">
              <el-input
                v-model="keywords9"
                style="width: 300px"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>
            <el-form-item label="keywords10">
              <el-input
                v-model="keywords10"
                style="width: 300px"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>

            <el-form-item label="s2s_event_id">
              <el-input
                v-model="form.s2s_event_id"
                style="width: 300px"
              ></el-input>
            </el-form-item> </el-form
        ></el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible = false;
            linkGeneration();
            handleKeywords();
          "
          >添 加</el-button
        >
      </span>
    </el-dialog>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- ADS -->
      <el-tab-pane label="ADS" name="first">
        <!-- table表格 -->
        <el-table
          :data="filteredUsers.length > 0 ? filteredUsers : list"
          style="width: 100%"
        >
          <el-table-column prop="link" label="投放链接" width="340">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="120" class="left">
            <template slot-scope="scope">
              <i
                :class="getStatusIconClass(scope.row.status)"
                :style="getStatusIconStyle(scope.row.status)"
              ></i>
              <span :style="getStatusIconStyle(scope.row.status)">{{
                getStatusText(scope.row.status)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="180">
          </el-table-column>
          <el-table-column prop="keywords" label="关键字" width="180">
          </el-table-column> </el-table
      ></el-tab-pane>
      <!-- S1 -->
      <el-tab-pane label="S1" name="second">S1</el-tab-pane>
      <!-- TONIC -->
      <el-tab-pane label="TONIC" name="third">TONIC</el-tab-pane>
    </el-tabs>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>


<script>
import axios from "@/utils/request";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      total: 0,
      currentPage: 1,
      searchTerm: "", //查询条件
      filteredUsers: [], //查询结果
      // maxLength: 30, //link显示长度
      activeName1: "first",
      dialogVisible: false,
      activeName: "first",
      formInline: {
        user: "",
      },
      domains: [],
      options: [],
      value: "",
      list: [],
      keywords1: "",
      keywords2: "",
      keywords3: "",
      keywords4: "",
      keywords5: "",
      keywords6: "",
      keywords7: "",
      keywords8: "",
      keywords9: "",
      keywords10: "",
      form: {
        link: "",
        ref_adnetwork: "",
        ref_pubsite: "",
        ref_keyword: "{{ad.name}}",
        keywords: "",
        subids:
          '{"subid1":"{{campaign.name}}","subid2":"{{adset.name}}","subid3":"{{campaign.id}}|{{adset.id}}|{{ad.id}}","subid4":"7bcc891c-53bd-4217-8af5-9e07f8f51686"}',
        subid1: "{{campaign.name}}",
        subid2: "{{adset.name}}",
        subid3: "{{campaign.id}}|{{adset.id}}|{{ad.id}}",
        subid4: "",
        click_id: "{external_id}",
        s2s_event_id: "search.",
      },
    };
  },
  computed: {},
  created() {
    // this.truncatedUrl();
    this.load();

    this.createLink();
  },
  methods: {
    // truncatedUrl() {

    // },
    // 如果域名太长则用省略号代替
    truncate(value, maxLength) {
      return value.substring(0, maxLength) + "...";
    },
    //分页组件
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.load();
    },
    //  加载数据列表
    load() {
      let requestData = {
        // 请求参数
        pageNum: this.currentPage,
        pageSize: 10,
      };

      // console.log("加载");
      axios
        .post("/ads/urlList", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log("获取后端数据");
          this.list = res.data.data.records;

          this.total = res.data.data.total;
          // 处理数据，根据需要截断文本,link数据长的省略
          this.list = res.data.data.records.map((item) => ({
            ...item,
            link:
              item.link.length > 40
                ? item.link.substring(0, 40) + "..."
                : item.link,
          }));

          // console.log(res.data.data.pages);
        });
    },
    handleClick1(tab, event) {
      console.log(tab, event);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {
          // 可以直接省略 catch 中的参数，因为不使用
          console.error("关闭确认失败");
        });
    },
    //根据状态更改数据的图标
    getStatusIconClass(status) {
      return status === 1 ? "el-icon-sunny" : "el-icon-moon";
    },
    getStatusIconStyle(status) {
      return {
        color: status === 1 ? "green" : "red",
      };
    },
    getStatusText(status) {
      return status === 1 ? "闲置" : "使用";
    },
    // 搜索查询
    clicksearch() {
      // 清空过滤结果数组
      // console.log(this.filteredUsers);
      this.filteredUsers = [];

      // 获取搜索条件并进行空值检查
      const searchTerm = this.searchTerm
        ? this.searchTerm.toLowerCase().trim()
        : "";
      // console.log(searchTerm);
      // 如果搜索条件为空，直接返回所有数据
      if (!searchTerm) {
        this.filteredUsers = this.list;
        return;
      }
      console.log("Original list:", this.list);

      // 根据搜索条件过滤数据
      this.filteredUsers = this.list.filter((item) => {
        const itemLink = item.link ? item.link.toLowerCase() : "";
        return itemLink.includes(searchTerm);
      });

      console.log("Filtered users:", this.filteredUsers);
    },

    //链接生成
    linkGeneration() {
      // this.form.link = "";
      this.form.subid4 = uuidv4();
      if (
        !this.form.link.startsWith("https://") &&
        !this.form.link.startsWith("http://")
      ) {
        this.form.link = "https://" + this.form.link;
      }
      this.form.ref_pubsite = this.form.ref_adnetwork;

      let keywordsArray = [];
      if (this.keywords1) {
        keywordsArray.push(this.keywords1);
      }
      if (this.keywords2) {
        keywordsArray.push(this.keywords2);
      }
      if (this.keywords3) {
        keywordsArray.push(this.keywords3);
      }
      if (this.keywords4) {
        keywordsArray.push(this.keywords4);
      }
      if (this.keywords5) {
        keywordsArray.push(this.keywords5);
      }
      if (this.keywords6) {
        keywordsArray.push(this.keywords6);
      }
      if (this.keywords7) {
        keywordsArray.push(this.keywords7);
      }
      if (this.keywords8) {
        keywordsArray.push(this.keywords8);
      }
      if (this.keywords9) {
        keywordsArray.push(this.keywords9);
      }
      if (this.keywords10) {
        keywordsArray.push(this.keywords10);
      }
      this.form.keywords = keywordsArray.join(",");
      let data = {
        // 请求参数
        link: this.form.link,
        ref_adnetwork: this.form.ref_adnetwork,
        ref_pubsite: this.form.ref_pubsite,
        ref_keyword: this.form.ref_keyword,
        keywords: this.form.keywords,
        subids: this.form.subids,
        click_id: this.form.click_id,
        s2s_event_id: this.form.s2s_event_id,
      };
      axios
        .post("/ads/urlBuilder", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.load();
            console.log(res);
            console.log(JSON.stringify(this.form));
            // console.log("添加成功");
          }
        })
        .catch((err) => {
          alert("添加失败");
          console.log(err.message);
          console.log(222);
        });
      // console.log(this.adddomain);
      // this.adddomain = "";
    },
    //增加域名接口
    createLink() {
      let data = {
        // 请求参数
        domains: this.domains,
      };
      axios
        .post("/ads/insertDomain", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.load();
            console.log(res);
            // console.log(JSON.stringify(this.form));
            console.log("加载成功", data);
          }
        })
        .catch((err) => {
          alert("加载失败");
          console.log(err.message);
          console.log(222);
        });
      // console.log(this.adddomain);
      // this.adddomain = "";
    },

    //获取ref_adnetwork
    load_ref_adnetwork() {
      axios
        .get("/ads/source")
        .then((res) => {
          if (res.status == 200) {
            this.options = res.data.data;
            // console.log(this.options);
            // console.log(JSON.stringify(this.form));
            console.log("加载成功");
          }
        })
        .catch((err) => {
          alert("加载失败");
          console.log(err.message);
          // console.log(222);
        });
    },

    //十个关键字整理到keywords
    handleKeywords() {},

    //network是啥pubsite也是啥，填了上面下面自动出现
    getpubsiteClass(pubsite) {
      switch (pubsite) {
        case 0:
          return "正常";
        case 1:
          return "锁定";
        case 2:
          return "过期";
        default:
          return "未知状态";
      }
    },
  },
};
</script>


<style  scoped>
</style>
