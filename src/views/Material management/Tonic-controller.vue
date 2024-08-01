<template>
  <div class="tonic" style="padding: 16px">
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
        // linkGeneration();

        getCountry();
        getoffername();
      "
      style="margin-bottom: 16px; background-color: #66b1ff; color: white"
    >
      添加域名
    </el-button>

    <el-dialog
      title="添加域名"
      :visible.sync="dialogVisible"
      width="64%"
      :before-close="handleClose"
      ><el-steps :active="currentStep" align-center style="margin-bottom: 36px">
        <el-step title="步骤1" description="请完成增加域名"></el-step>
        <el-step title="步骤2" description="请完成添加像素"></el-step>
        <el-step title="步骤3" description="请完成设置关键字"></el-step>
      </el-steps>
      <el-tabs v-model="activeName1" @tab-click="handleClick1">
        <!-- 单链 -->
        <!-- 增加域名 -->
        <el-tab-pane label="添加域名" name="tab1">
          <!-- 域名录入表单 -->
          <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="Name">
              <el-input v-model="form.name" style="width: 300px"></el-input>
              <!-- <el-select
                v-model="form.name"
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
                </el-option> -->
              <!-- </el-select> -->
            </el-form-item>
            <el-form-item label="Offer">
              <el-select
                v-model="form.offer"
                filterable
                style="width: 300px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in offerOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Country">
              <el-select
                v-model="form.country"
                filterable
                style="width: 300px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in countryOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Domain">
              <el-input v-model="form.domain" style="width: 300px"></el-input>
            </el-form-item>

            <!-- <el-form-item label="OfferId">
              <el-input
                v-model="form.s2s_event_id"
                style="width: 300px"
              ></el-input>
            </el-form-item> -->
          </el-form>

          <!-- 跳转到下一页 -->
          <!-- <button @click="goToNextTab();nextStep()">Go to Next Tab</button> -->
        
            <el-button @click="dialogVisible = false" style="margin-left: 60%;">取 消</el-button>
            <el-button type="primary" @click="createCampaign()"
              >下一步</el-button
            >
         
        </el-tab-pane>

        <!-- 设置像素 -->
        <el-tab-pane label="添加像素" name="tab2">
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

            <el-form-item label="ref_pubsite">
              <el-input
                v-model="form.ref_adnetwork"
                style="width: 300px"
              ></el-input>
            </el-form-item>

            <el-form-item label="keywords">
              <el-input
                v-model="form.s2s_event_id"
                style="width: 300px"
              ></el-input>
            </el-form-item>

            <el-form-item label="offerId">
              <el-input
                v-model="form.s2s_event_id"
                style="width: 300px"
              ></el-input>
            </el-form-item> 
            </el-form
        >
        <el-button @click="dialogVisible = false" style="margin-left: 60%;">取 消</el-button>
            <el-button type="primary" @click="createCampaign()"
              >下一步</el-button
            >
      </el-tab-pane>

        <!-- 设置关键字 -->
        <el-tab-pane label="设置关键字" name="tab3">
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

            <el-form-item label="ref_pubsite">
              <el-input
                v-model="form.ref_adnetwork"
                style="width: 300px"
              ></el-input>
            </el-form-item>

            <el-form-item label="keywords">
              <el-input
                v-model="form.keywords"
                style="width: 300px"
                type="text"
                id="keywordsInput"
                placeholder="空格或逗号隔开"
              ></el-input>
            </el-form-item>

            <el-form-item label="s2s_event_id">
              <el-input
                v-model="form.s2s_event_id"
                style="width: 300px"
              ></el-input>
            </el-form-item> </el-form
        >
        <el-button @click="dialogVisible = false" style="margin-left: 60%;">取 消</el-button>
            <el-button type="primary" @click="
            dialogVisible = false;
            createCampaign()
          "
              >完成</el-button
            ></el-tab-pane>
        
      </el-tabs>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            // dialogVisible = false;
            createCampaign()
          "
          >添 加</el-button
        >
      </span> -->
    </el-dialog>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- ADS -->
      <el-tab-pane label="ADS" name="first">
        <!-- table表格 -->
        <el-table
          :data="filteredUsers.length > 0 ? filteredUsers : list"
          style="width: 100%"
        >
          <el-table-column prop="offer" label="Offer" width="240">
          </el-table-column>
          <el-table-column prop="target" label="目标" width="160">
          </el-table-column>
          <el-table-column prop="name" label="名称" width="120">
          </el-table-column>
          <el-table-column prop="country" label="国家" width="120">
          </el-table-column>
          <el-table-column prop="imprint" label="Imprint" width="120">
          </el-table-column>
          <el-table-column prop="type" label="Type" width="120">
          </el-table-column>
          <!-- <el-table-column prop="name" label="名称" width="120" class="left">
            <template slot-scope="scope">
              <i
                :class="getStatusIconClass(scope.row.status)"
                :style="getStatusIconStyle(scope.row.status)"
              ></i>
              <span :style="getStatusIconStyle(scope.row.status)">{{
                getStatusText(scope.row.status)
              }}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="createTime" label="创建时间" width="180">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="180">
          </el-table-column>
          <!-- <el-table-column prop="keywords" label="关键字" width="180">
          </el-table-column> -->
        </el-table>
      </el-tab-pane>
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
// import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      total: 0,
      currentPage: 1,
      searchTerm: "", //查询条件
      filteredUsers: [], //查询结果
      activeName1: "tab1",
      tabs: [{ name: "tab1" }, { name: "tab2" }, { name: "tab3" }], //tab跳转
      currentStep: 1, //进度条加载
      dialogVisible: false,
      activeName: "first",
      formInline: {
        user: "",
      },
      domains: [],
      countryOptions: [],
      offerOptions: [],
      options: [],
      value: "",
      list: [],
      form: {
        name: "",
        offer: "",
        offerId: 0,
        country: "",
        domain: "",
      },
    };
  },
  created() {
    this.load();
    // this.createLink();
  },
  methods: {
    //进度条加载
    nextStep() {
      if (this.currentStep < 3) {
        // 假设总共有三步，索引从0到2
        this.currentStep++;
      }
    },
    //点击跳转到下一个标签页
    goToNextTab() {
      const index = this.tabs.findIndex((tab) => tab.name === this.activeName1);

      if (index !== -1 && index < this.tabs.length - 1) {
        console.log("函数执行了");
        this.activeName1 = this.tabs[index + 1].name;
      }
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
        .post("/tonic/campaignList", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log("获取后端数据");
          this.list = res.data.data.records;
          this.total = res.data.data.total;
          // console.log(res);
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
        const itemLink = item.offer ? item.offer.toLowerCase() : "";
        return itemLink.includes(searchTerm);
      });

      console.log("Filtered users:", this.filteredUsers);
    },
    //获得国家信息
    getCountry() {
      axios
        .get("/tonic/queryCountryList")
        .then((res) => {
          if (res.status == 200) {
            this.countryOptions = res.data.data;
          }
        })
        .catch((err) => {
          alert("加载失败");
          console.log(err.message);
          console.log(222);
        });
    },
    //获取offer
    getoffername() {
      axios
        .get("/tonic/queryOfferList")
        .then((res) => {
          if (res.status == 200) {
            this.offerOptions = res.data.data;
            // console.log(res);
          }
        })
        .catch((err) => {
          alert("加载失败");
          console.log(err.message);
          console.log(222);
        });
    },
    //链接生成
    // linkGeneration() {
    //   // this.form.link = "";
    //   this.form.subid4 = uuidv4();
    //   if (
    //     !this.form.link.startsWith("https://") &&
    //     !this.form.link.startsWith("http://")
    //   ) {
    //     this.form.link = "https://" + this.form.link;
    //   }
    //   this.form.ref_pubsite = this.form.ref_adnetwork;
    //   let data = {
    //     // 请求参数
    //     link: this.form.link,
    //     ref_adnetwork: this.form.ref_adnetwork,
    //     ref_pubsite: this.form.ref_pubsite,
    //     ref_keyword: this.form.ref_keyword,
    //     keywords: this.form.keywords,
    //     subids: this.form.subids,
    //     click_id: this.form.click_id,
    //     s2s_event_id: this.form.s2s_event_id,
    //   };
    //   axios
    //     .post("/ads/urlBuilder", data, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //     .then((res) => {
    //       if (res.status == 200) {
    //         this.load();
    //         console.log(res);
    //         console.log(JSON.stringify(this.form));
    //         // console.log("添加成功");
    //       }
    //     })
    //     .catch((err) => {
    //       alert("添加失败");
    //       console.log(err.message);
    //       console.log(222);
    //     });
    //   // console.log(this.adddomain);
    //   // this.adddomain = "";
    // },
    //增加域名接口
    // createLink() {
    //   let data = {
    //     // 请求参数
    //     domains: this.domains,
    //   };
    //   axios
    //     .post("/ads/insertDomain", data, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //     .then((res) => {
    //       if (res.status == 200) {
    //         this.load();
    //         // console.log(res);
    //         // console.log(JSON.stringify(this.form));
    //         // console.log("加载成功", data);
    //       }
    //     })
    //     .catch((err) => {
    //       alert("加载失败");
    //       console.log(err.message);
    //       console.log(222);
    //     });
    //   // console.log(this.adddomain);
    //   // this.adddomain = "";
    // },

    //添加域名
    createCampaign() {
      let data = {
        // 请求参数
        name: this.form.name,
        offer: this.form.offer,
        offerId: this.form.offerId,
        country: this.form.country,
        domain: this.form.domain,
      };
      axios
        .get("/tonic/createCampaign", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            // this.options = res.data.data;
            // console.log(res);
            // console.log(data);
            // console.log(JSON.stringify(data));
            console.log("加载成功");
            this.nextStep();
            this.goToNextTab();
          }
        })
        .catch((err) => {
          alert("加载失败");
          console.log(err.message);
          // console.log(222);
        });
    },
  },
};
</script>


<style lang="less" scoped>
</style>
