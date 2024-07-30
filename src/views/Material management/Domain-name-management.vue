<template>
  <div class="domain">
    <!-- 查询 -->

    <el-form :inline="true" class="demo-form-inline">
      <!-- 域名输入 -->
      <el-form-item label="域名" class="yumingshuru">
        <el-input
          v-model="searchTerm"
          placeholder="请输入"
          @keyup.enter="clicksearch"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clicksearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 域名录入 -->

    <el-button
      @click="dialogVisible = true"
      style="margin-left: 40px; background-color: #66b1ff; color: white"
    >
      域名录入
    </el-button>

    <el-dialog
      title="域名录入"
      :visible.sync="dialogVisible"
      width="64%"
      :before-close="handleClose"
    >
      <!-- 域名录入表单 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="域名地址">
          <el-input
            v-model="adddomain"
            @keyup.enter="addlist()"
            style="width: 300px"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <!-- <el-button type="primary" @click="onSubmit1">立即创建</el-button> -->
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible = false;
            addlist();
          "
          >添 加</el-button
        >
      </span>
    </el-dialog>
    <!-- table表格 -->
    <el-table
      :data="filteredUsers.length > 0 ? filteredUsers : list"
      style="width: 100%; margin-left: 40px; margin-top: 30px"
    >
      <el-table-column prop="domain" label="域名" width="300">
      </el-table-column>
      <!-- 域名状态 -->
      <el-table-column prop="domainStatus" label="域名状态" width="120">
        <template slot-scope="scope">
          <i
            :class="getdomainStatusIconClass(scope.row.domainStatus)"
            :style="getdomainStatusIconStyle(scope.row.domainStatus)"
          ></i>
          <span :style="getdomainStatusIconStyle(scope.row.domainStatus)">{{
            getdomainStatusspanClass(scope.row.domainStatus)
          }}</span>
        </template>
      </el-table-column>
      <!-- 状态闲置或使用 -->
      <el-table-column prop="status" label="状态" width="120">
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
      <el-table-column prop="updateTime" label="更新时间" width="220">
      </el-table-column>
      <el-table-column prop="expires" label="过期时间" width="220">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="price" label="费用" width="180"> </el-table-column>

      <!-- <el-table-column label="操作" width="80">
        //修改域名状态的按钮
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="
              dialogFormVisible = true;
              handleEdit(scope.row);
            "
          >
            编辑
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 修改的表单 -->
    <el-dialog title="修改操作" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="域名" :label-width="formLabelWidth">{{
          form.domain
        }}</el-form-item>
        <el-form-item label="域名状态" :label-width="formLabelWidth">
          <el-select v-model="form.domainStatus" placeholder="请选择域名状态">
            <el-option label="正常" :value="0"></el-option>
            <el-option label="锁定" :value="1"></el-option>
            <el-option label="过期" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="闲置" :value="1"></el-option>
            <el-option label="使用中" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            handleEditConfirm();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-pagination background layout="prev, pager, next" :total="total"  @current-change="handleCurrentChange"  >
    </el-pagination>
  </div>
</template>


<script>
import axios from "@/utils/request";
export default {
  data() {
    return {
      total: 0,
      currentPage:1,
      dialogFormVisible: false,
      dialogVisible: false,

      list: [],
      searchTerm: "", //查询条件
      filteredUsers: [], //查询结果
      adddomain: "",
      form: {
        domainId: "",
        expires: "",
        createTime: "",
        userId: "",
        domain: "",
        status: "",
        domainStatus: "",
        updateTime: "",
        id: "",
        brand: "",
        price: "",
        // userId: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.load();
  },

  methods: {
     //分页组件
     handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.load();
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
    //  加载数据列表
    load() {
      let requestData = {
        // 请求参数
        pageNum: this.currentPage,
        pageSize: 10,
      };
      // console.log("加载");
      axios
        .post("/domain/domainList", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log("获取后端数据");
          this.list = res.data.data.records;
          this.total = res.data.data.total;
          console.log(res.data.data.records);
        });
    },
    // 搜索查询
    clicksearch() {
      // 清空过滤结果数组
      this.filteredUsers = [];

      // 获取搜索条件并进行空值检查
      const searchTerm = this.searchTerm
        ? this.searchTerm.toLowerCase().trim()
        : "";

      // 如果搜索条件为空，直接返回所有数据
      if (!searchTerm) {
        this.filteredUsers = this.list;
        return;
      }

      // 根据搜索条件过滤数据
      this.filteredUsers = this.list.filter((item) => {
        // 假设数据对象中有一个 domain 属性用于搜索
        const itemDomain = item.domain ? item.domain.toLowerCase() : "";

        return itemDomain.includes(searchTerm);
      });
    },

    // 增加数据
    addlist() {
      let data = {
        // 请求参数
        domain: this.adddomain,
      };
      axios
        .post("/domain/create", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.load();
            console.log(res.data);
            // console.log("添加成功");
            console.log(JSON.stringify(data));
          }
        })
        .catch((err) => {
          alert("添加失败");
          console.log(err.message);
          console.log(222);
        });
      console.log(this.adddomain);
      // this.adddomain = "";
    },

    // 修改数据以及域名状态
    handleEdit(row) {
      // console.log(row);
      this.form.brand = row.brand;
      this.form.createTime = row.createTime;
      this.form.domain = row.domain;
      this.form.domainId = row.domainId;
      this.form.domainStatus = row.domainStatus;
      this.form.expires = row.expires;
      this.form.id = row.id;
      this.form.price = row.price;
      this.form.status = row.status;
      this.form.updateTime = new Date();
      this.form.userId = row.userId;
    },
    // 确认编辑
    handleEditConfirm() {
      // console.log(res);
      // 发送PUT请求更新数据
      axios
        .post(`/domain/domainList/${this.form.id}`, this.form)
        .then((response) => {
          console.log("数据更新成功:", response);
          // 可以根据需要处理成功后的操作，比如重新加载数据列表等
          this.dialogFormVisible = false; // 关闭对话框
          this.load(); // 重新加载数据列表
        })
        .catch((error) => {
          console.error("数据更新失败:", error);
          // 处理错误情况，比如提示用户失败信息等
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

    //根据域名状态更改图标样式
    getdomainStatusIconClass(domainStatus) {
      switch (domainStatus) {
        case 0:
          return "el-icon-check";
        case 1:
          return "el-icon-lock";
        case 2:
          return "el-icon-close";
        default:
          return "未知状态";
      }
    },
    getdomainStatusIconStyle(domainStatus) {
      switch (domainStatus) {
        case 0:
          return { color: "green" };
        case 1:
          return { color: "orange" };
        case 2:
          return { color: "red" };
        default:
          return "未知状态";
      }
    },
    getdomainStatusspanClass(domainStatus) {
      switch (domainStatus) {
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
.demo-form-inline {
  padding-left: 40px;
  padding-top: 20px;
}
</style>
