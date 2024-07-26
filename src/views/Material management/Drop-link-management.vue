<template>
  <div class="drop" style="padding: 16px">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="margin-top: 16px"
    >
      <el-form-item label="域名地址">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 链接录入 -->

    <el-button
      @click="dialogVisible = true"
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
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="域名地址">
              <el-input v-model="form.name" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="归属平台">
              <el-select v-model="form.platform" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
              <el-select v-model="form.reclassify" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <!-- <el-button type="primary" @click="onSubmit1">立即创建</el-button> -->
              <!-- <el-button>取消</el-button> -->
            </el-form-item>
          </el-form></el-tab-pane
        >
        <!-- 多链 -->
        <el-tab-pane label="多链" name="second"
          ><div>漏斗信息：</div>
          <el-form ref="form1" :model="form1" label-width="80px">
            <el-form-item label="域名地址">
              <el-input v-model="form1.name" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="归属平台">
              <el-select v-model="form1.platform" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
              <el-select v-model="form1.reclassify" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <!-- <el-button type="primary" @click="onSubmit1">立即创建</el-button> -->
              <!-- <el-button>取消</el-button> -->
            </el-form-item>
          </el-form>
          </el-tab-pane
        >
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible = false;
            onSubmit1();
          "
          >添 加</el-button
        >
      </span>
    </el-dialog>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- ADS -->
      <el-tab-pane label="ADS" name="first">
        <!-- table表格 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="投放链接" width="240">
          </el-table-column>
          <el-table-column prop="name" label="关联域名" width="160">
          </el-table-column>
          <el-table-column prop="province" label="推广方式" width="120">
          </el-table-column>
          <el-table-column prop="city" label="变现平台" width="120">
          </el-table-column>
          <el-table-column prop="address" label="国家" width="90">
          </el-table-column>
          <el-table-column prop="people" label="创建人" width="90">
          </el-table-column>
          <el-table-column prop="uptime" label="更新时间" width="120">
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="240">
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
          </el-table-column>
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
export default {
  data() {
    return {
      activeName1: "first",
      dialogVisible: false,
      activeName: "first",
      formInline: {
        user: "",
      },
      tableData: [
      {
            "id": 21,
            "domainId": "79080947",
            "domain": "auto-mechanic365.store",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-02T00:00:00",
            "userId": 0
        },
        {
            "id": 22,
            "domainId": "78890828",
            "domain": "badcredit-housingfinancing.xyz",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-06-25T00:00:00",
            "userId": 0
        },
        {
            "id": 23,
            "domainId": "79483781",
            "domain": "bathroom-remodel-ideas.store",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-16T00:00:00",
            "userId": 0
        },
        {
            "id": 24,
            "domainId": "79112971",
            "domain": "bathroom-remodeling1.store",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-03T00:00:00",
            "userId": 0
        },
        {
            "id": 25,
            "domainId": "79286074",
            "domain": "bathroom-remodeling24.site",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-09T00:00:00",
            "userId": 0
        },
        {
            "id": 26,
            "domainId": "79253366",
            "domain": "beauty-school22.shop",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-08T00:00:00",
            "userId": 0
        },
        {
            "id": 27,
            "domainId": "78940862",
            "domain": "best-counsel.xyz",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-06-27T00:00:00",
            "userId": 0
        },
        {
            "id": 28,
            "domainId": "78944787",
            "domain": "best-divorce-lawyer.xyz",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-06-27T00:00:00",
            "userId": 0
        },
        {
            "id": 29,
            "domainId": "79050961",
            "domain": "besthouseholdgeneratorstop1.click",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-01T00:00:00",
            "userId": 0
        },
        {
            "id": 30,
            "domainId": "79055089",
            "domain": "blacklistedloans.site",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-01T00:00:00",
            "userId": 0
        },
        {
            "id": 31,
            "domainId": "79076732",
            "domain": "blacklistedloans.store",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-02T00:00:00",
            "userId": 0
        },
        {
            "id": 32,
            "domainId": "79601102",
            "domain": "black-loan11.rest",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-20T00:00:00",
            "userId": 0
        },
        {
            "id": 33,
            "domainId": "79348076",
            "domain": "breast-lift.sbs",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-11T00:00:00",
            "userId": 0
        },
        {
            "id": 34,
            "domainId": "79645864",
            "domain": "buy-car-in-installments.shop",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-22T00:00:00",
            "userId": 0
        },
        {
            "id": 35,
            "domainId": "78868533",
            "domain": "carbuyingandselling.xyz",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-06-25T00:00:00",
            "userId": 0
        },
        {
            "id": 36,
            "domainId": "78942506",
            "domain": "car-deals1.store",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-06-27T00:00:00",
            "userId": 0
        },
        {
            "id": 37,
            "domainId": "79054728",
            "domain": "car-deals12.store",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-01T00:00:00",
            "userId": 0
        },
        {
            "id": 38,
            "domainId": "79246007",
            "domain": "car-transport-job.store",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-08T00:00:00",
            "userId": 0
        },
        {
            "id": 39,
            "domainId": "79209825",
            "domain": "cartransportjob1.shop",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-06T00:00:00",
            "userId": 0
        },
        {
            "id": 40,
            "domainId": "79343808",
            "domain": "cartransportjobs.store",
            "domainStatus": 1,
            "status": 0,
            "updateTime": "2024-07-24T16:03:15",
            "expires": "2024-07-24T16:03:15",
            "createTime": "2024-07-11T00:00:00",
            "userId": 0
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市",
          zip: 200333,
        },
      ],
      form: {
        name: "",
        platform: "",
        reclassify: "",
      },
      form1: {
        name: "",
        platform: "",
        reclassify: "",
      },
    };
  },
  methods: {
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
  },
};
</script>


<style lang="less" scoped>
</style>
