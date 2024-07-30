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
            <el-form-item label="ref_keyword">
              <!-- <span>{{ ad.name }}</span> -->
              <!-- <el-input
                v-model="form.ref_keyword"
                style="width: 300px"
              ></el-input> -->
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
            <el-form-item label="subid1">
              <!-- <el-input v-model="form.subids" style="width: 300px"></el-input> -->
              <!-- <span>{{campaign.name}}</span> -->
            </el-form-item>
            <el-form-item label="subid2">
              <!-- <el-input v-model="form.subids" style="width: 300px"></el-input> -->
              <!-- <span>{{adset.name}}</span> -->
            </el-form-item>
            <el-form-item label="subid3">
              <!-- <el-input v-model="form.subids" style="width: 300px"></el-input> -->
              <!-- <span>{{campaign.id}}|{{adset.id}}|{{ad.id}}</span> -->
            </el-form-item>
            <el-form-item label="click_id">
              <!-- <el-input v-model="form.click_id" style="width: 300px"></el-input> -->
              <!-- <span>{{ external_id }}</span> -->
            </el-form-item>
            <el-form-item label="s2s_event_id">
              <el-input
                v-model="form.s2s_event_id"
                style="width: 300px"
              ></el-input>
            </el-form-item>

            <!-- <el-form-item label="二级分类">
              <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item> -->

            <el-form-item>
              <!-- <el-button type="primary" @click="onSubmit1">立即创建</el-button> -->
              <!-- <el-button>取消</el-button> -->
            </el-form-item>
          </el-form></el-tab-pane
        >
        <!-- 多链 -->
        <!-- <el-tab-pane label="多链" name="second"
          ><div>漏斗信息：</div>
          <el-form ref="form1" :model="form1" label-width="80px">
            <el-form-item label="域名地址">
              <el-input v-model="form1.name" style="width: 300px"></el-input>
            </el-form-item>
            <el-select v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-form-item label="二级分类">
              <el-select v-model="form1.reclassify" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit1">立即创建</el-button> 
               <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane> -->
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
          </el-table-column>
          <!-- <el-table-column prop="subids" label="不知道" width="180">
          </el-table-column> -->
          <!-- <el-table-column prop="address" label="国家" width="90">
          </el-table-column>
          <el-table-column prop="people" label="创建人" width="90">
          </el-table-column>
          <el-table-column prop="uptime" label="更新时间" width="120">
          </el-table-column> -->

          <!-- <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small"> 详情查看 </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >
                编辑
              </el-button>
            </template>
          </el-table-column> -->
        </el-table></el-tab-pane
      >
      <!-- S1 -->
      <el-tab-pane label="S1" name="second">S1</el-tab-pane>
      <!-- TONIC -->
      <el-tab-pane label="TONIC" name="third">TONIC</el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import axios from "@/utils/request";
export default {
  data() {
    return {
      searchTerm: "", //查询条件
      filteredUsers: [], //查询结果
      activeName1: "first",
      dialogVisible: false,
      activeName: "first",
      formInline: {
        user: "",
      },
      options: [],
      value: "",
      list: [],
      form: {
        link: "",
        ref_adnetwork: "",
        ref_pubsite: "",
        ref_keyword: "",
        keywords: "",
        subids: "",
        subid1: "",
        subid2: "",
        subid3: "",
        click_id: "",
        s2s_event_id: "search.",
      },
      form1: {
        name: "",
        platform: "",
        reclassify: "",
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    //  加载数据列表
    load() {
      let requestData = {
        // 请求参数
        pageNum: 1,
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
          console.log(res);
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

      this.filteredUsers = this.list.filter((item) => {
  // 假设数据对象中有一个 domain 属性用于搜索
  const itemDomain = item.domain ? item.domain : "";

  // 创建不区分大小写的正则表达式对象
  const regex = new RegExp(searchTerm, "i");

  // 使用正则表达式测试 domain 是否匹配搜索条件
  return regex.test(itemDomain);
});
    },

    //链接生成
    linkGeneration() {
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
            // console.log(JSON.stringify(this.form));
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

    //获取ref_adnetwork
    load_ref_adnetwork() {
      axios
        .get("/ads/source")
        .then((res) => {
          if (res.status == 200) {
            this.options = res.data.data;
            console.log(this.options);
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

    //可以输入十个关键字
    handleKeywords() {
      let keywordsInput = document.getElementById("keywordsInput").value.trim();
      let keywords = keywordsInput.split(/[,\s]+/); // 使用正则表达式来分割逗号或空格
      // 移除空字符串元素
      keywords = keywords.filter((keyword) => keyword !== "");

      // 输出到控制台
      console.log("Entered Keywords:", keywords);

      // 可以在这里进行进一步的处理，比如验证、保存到数据库等操作
    },

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
