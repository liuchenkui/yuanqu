<template>
  <div class="app-container">
    <div class="header">

      <el-row>
        <!-- 左侧 -->
        <el-col :span="14" class="col-flex">

          <div class="col-item">
            <span class="label">
              企业名称
            </span>
            <span class="ipt">
              <el-input size="mini" v-model="queryParams.baseCompanyName" placeholder="请输入"></el-input>
            </span>
          </div>

          <div class="col-item">
            <span class="label">
              行业
            </span>
            <span class="ipt">
              <el-select v-model="queryParams.baseIndustry" style="width:100%" placeholder="请选择行业" clearable>
                <el-option v-for="dict in dict.type.hangye_qiye" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </span>
          </div>

        </el-col>

        <!-- 右侧 -->
        <el-col style="text-align:right" :span="10">
          <el-button type="primary" plain @click="resetQuery" size="small">重 置</el-button>
          <el-button type="primary" @click="handleQuery" size="small">查 询</el-button>
          <small @click="toggleIpt" v-if="!showIpt">展开 <i class="el-icon-arrow-down"></i></small>
          <small @click="toggleIpt" v-else>收起 <i class="el-icon-arrow-up"></i></small>
        </el-col>
      </el-row>

      <el-row style="margin-top:20px" v-if="showIpt">
        <!-- 左侧 -->
        <el-col :span="14" class="col-flex">

          <div class="col-item">
            <span class="label">
              环境风险等级
            </span>
            <span class="ipt">
              <el-select v-model="queryParams.baseReskLever" style="width:100%" placeholder="请选择环境风险等级" clearable>
                <el-option v-for="dict in dict.type.huanjing_fengxiandenji" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </span>
          </div>

          <div class="col-item">
            <span class="label">
              生产状态
            </span>
            <span class="ipt">
              <el-select v-model="queryParams.baseProductionStatus" style="width:100%" placeholder="请选择生产状态" clearable>
                <el-option v-for="dict in dict.type.shengchanzhuangtai_qiye" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </span>
          </div>

        </el-col>
      </el-row>

      <el-row style="margin-top:20px" v-if="showIpt">
        <!-- 左侧 -->
        <el-col :span="14" class="col-flex">

          <div class="col-item">
            <span class="label">
              监控企业
            </span>
            <span class="ipt">
              <el-select style="width:100%" v-model="queryParams.baseJkStatus" placeholder="请选择监控企业" clearable>
                <el-option v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </span>
          </div>

        </el-col>
      </el-row>

    </div>

    <div class="table-box">
      <div class="table-head">
        <p>查询列表</p>
        <div class="right-btn">
          <el-button type="primary" plain icon="el-icon-download" size="small"
            v-hasPermi="['yuanqu:area:export']">导入</el-button>
          <el-button type="primary" plain icon="el-icon-upload2" size="small" @click="handleExport"
            v-hasPermi="['yuanqu:area:export']">导出</el-button>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd"
            v-hasPermi="['yuanqu:area:export']">新增</el-button>
        </div>
      </div>

      <div class="table-cnt">
        <el-table v-loading="loading" :data="companyList" style="width:1470px">
          <el-table-column label="序号" width="80" align="center" prop="id" />
          <el-table-column label="企业名称" width="250" prop="baseCompanyName" />
          <el-table-column label="企业简称" width="200" prop="baseShortName" />
          <el-table-column label="统一社会信用代码" width="320" prop="businessCode" />
          <el-table-column label="行业" width="200" prop="baseIndustry">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.hangye_qiye" :value="scope.row.baseIndustry" />
            </template>
          </el-table-column>
          <el-table-column label="环境风险等级" width="200" prop="baseReskLever">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.huanjing_fengxiandenji" :value="scope.row.baseReskLever" />
            </template>
          </el-table-column>
          <el-table-column label="生产状态" width="100" prop="baseProductionStatus">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.shengchanzhuangtai_qiye" :value="scope.row.baseProductionStatus" />
            </template>
          </el-table-column>
          <el-table-column label="监控企业" width="100" prop="baseJkStatus">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.baseJkStatus" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="text" @click="handleUpdate(scope.row)"
                v-hasPermi="['yuanqu:company:edit']">查看</el-button>
              <el-button type="text" @click="handleUpdate(scope.row)"
                v-hasPermi="['yuanqu:company:edit']">修改</el-button>
              <el-button type="text" @click="handleDelete(scope.row)"
                v-hasPermi="['yuanqu:company:remove']">删除</el-button>
              <el-button type="text">边界</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize" @pagination="getList" />

        <!-- 添加或修改一企一档对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="企业名称" prop="baseCompanyName">
              <el-input v-model="form.baseCompanyName" placeholder="请输入企业名称" />
            </el-form-item>
            <el-form-item label="企业简称" prop="baseShortName">
              <el-input v-model="form.baseShortName" placeholder="请输入企业简称" />
            </el-form-item>
            <el-form-item label="行业" prop="baseIndustry">
              <el-select v-model="form.baseIndustry" placeholder="请选择行业">
                <el-option v-for="dict in dict.type.hangye_qiye" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="环境风险等级" prop="baseReskLever">
              <el-select v-model="form.baseReskLever" placeholder="请选择环境风险等级">
                <el-option v-for="dict in dict.type.huanjing_fengxiandenji" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="中心经度" prop="baseLongitude">
              <el-input v-model="form.baseLongitude" placeholder="请输入中心经度" />
            </el-form-item>
            <el-form-item label="中心维度" prop="baseLatitude">
              <el-input v-model="form.baseLatitude" placeholder="请输入中心维度" />
            </el-form-item>
            <el-form-item label="年产值" prop="baseOutputValue">
              <el-input v-model="form.baseOutputValue" placeholder="请输入年产值" />
            </el-form-item>
            <el-form-item label="生产状态" prop="baseProductionStatus">
              <el-select v-model="form.baseProductionStatus" placeholder="请选择生产状态">
                <el-option v-for="dict in dict.type.shengchanzhuangtai_qiye" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投产日期" prop="baseInitDate">
              <el-date-picker clearable v-model="form.baseInitDate" type="date" value-format="yyyy-MM-dd"
                placeholder="请选择投产日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="人员规模" prop="baseEmployNum">
              <el-input v-model="form.baseEmployNum" placeholder="请输入人员规模" />
            </el-form-item>
            <el-form-item label="占地面积" prop="baseArea">
              <el-input v-model="form.baseArea" placeholder="请输入占地面积" />
            </el-form-item>
            <el-form-item label="监控企业" prop="baseJkStatus">
              <el-select v-model="form.baseJkStatus" placeholder="请选择监控企业">
                <el-option v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="businessCode">
              <el-input v-model="form.businessCode" placeholder="请输入统一社会信用代码" />
            </el-form-item>
            <el-form-item label="企业种类" prop="businessCompanyType">
              <el-input v-model="form.businessCompanyType" placeholder="请输入企业种类" />
            </el-form-item>
            <el-form-item label="法人代表" prop="businessLayerPerson">
              <el-input v-model="form.businessLayerPerson" placeholder="请输入法人代表" />
            </el-form-item>
            <el-form-item label="法人联系电话" prop="businessLayerPhone">
              <el-input v-model="form.businessLayerPhone" placeholder="请输入法人联系电话" />
            </el-form-item>
            <el-form-item label="注册地址" prop="businessInitAddr">
              <el-input v-model="form.businessInitAddr" placeholder="请输入注册地址" />
            </el-form-item>
            <el-form-item label="经营范围" prop="businessRange">
              <el-input v-model="form.businessRange" type="textarea" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item label="固定电话" prop="contactTel">
              <el-input v-model="form.contactTel" placeholder="请输入固定电话" />
            </el-form-item>
            <el-form-item label="
        移动电话" prop="contactPhone">
              <el-input v-model="form.contactPhone" placeholder="请输入
        移动电话" />
            </el-form-item>
            <el-form-item label="传真" prop="contactFax">
              <el-input v-model="form.contactFax" placeholder="请输入传真" />
            </el-form-item>
            <el-form-item label="
        电子邮件" prop="contactEmail">
              <el-input v-model="form.contactEmail" placeholder="请输入
        电子邮件" />
            </el-form-item>
            <el-form-item label="邮政编码" prop="contactPostCode">
              <el-input v-model="form.contactPostCode" placeholder="请输入邮政编码" />
            </el-form-item>
            <el-form-item label="
        企业网址" prop="contactWww">
              <el-input v-model="form.contactWww" placeholder="请输入
        企业网址" />
            </el-form-item>
            <el-form-item label="联系地址" prop="contactAddr">
              <el-input v-model="form.contactAddr" placeholder="请输入联系地址" />
            </el-form-item>
            <el-form-item label="环保部门名称" prop="envPartName">
              <el-input v-model="form.envPartName" placeholder="请输入环保部门名称" />
            </el-form-item>
            <el-form-item label="环保部门人数" prop="envPartNum">
              <el-input v-model="form.envPartNum" placeholder="请输入环保部门人数" />
            </el-form-item>
            <el-form-item label="环保负责人" prop="envTopPerson">
              <el-input v-model="form.envTopPerson" placeholder="请输入环保负责人" />
            </el-form-item>
            <el-form-item label="环保负责人电话" prop="envTopPersonTel">
              <el-input v-model="form.envTopPersonTel" placeholder="请输入环保负责人电话" />
            </el-form-item>
            <el-form-item label="环保安全员" prop="envSafePerson">
              <el-input v-model="form.envSafePerson" placeholder="请输入环保安全员" />
            </el-form-item>
            <el-form-item label="环保安全员电话" prop="envSafePersonTel">
              <el-input v-model="form.envSafePersonTel" placeholder="请输入环保安全员电话" />
            </el-form-item>
            <el-form-item label="产品名称" prop="vocProductName">
              <el-input v-model="form.vocProductName" placeholder="请输入产品名称" />
            </el-form-item>
            <el-form-item label="产品产量" prop="vocProductValue">
              <el-input v-model="form.vocProductValue" placeholder="请输入产品产量" />
            </el-form-item>
            <el-form-item label="副产物名称" prop="vocProductOName">
              <el-input v-model="form.vocProductOName" placeholder="请输入副产物名称" />
            </el-form-item>
            <el-form-item label="
        副产物产生量" prop="vocProductOValue">
              <el-input v-model="form.vocProductOValue" placeholder="请输入
        副产物产生量" />
            </el-form-item>
            <el-form-item label="原料名称" prop="vocOrigName">
              <el-input v-model="form.vocOrigName" placeholder="请输入原料名称" />
            </el-form-item>
            <el-form-item label="原料用量" prop="vocOrigValue">
              <el-input v-model="form.vocOrigValue" placeholder="请输入原料用量" />
            </el-form-item>
            <el-form-item label="辅料名称" prop="vocOrigOName">
              <el-input v-model="form.vocOrigOName" placeholder="请输入辅料名称" />
            </el-form-item>
            <el-form-item label="辅料用量" prop="vocOrigOValue">
              <el-input v-model="form.vocOrigOValue" placeholder="请输入辅料用量" />
            </el-form-item>
            <el-form-item label="VOCs产生量" prop="vocVocsOutputValue">
              <el-input v-model="form.vocVocsOutputValue" placeholder="请输入VOCs产生量" />
            </el-form-item>
            <el-form-item label="VOCs排放量" prop="vocVocsOutValue">
              <el-input v-model="form.vocVocsOutValue" placeholder="请输入VOCs排放量" />
            </el-form-item>
            <el-form-item label="脱VOCs工艺名称" prop="vocDelVocsCraft">
              <el-input v-model="form.vocDelVocsCraft" placeholder="请输入脱VOCs工艺名称" />
            </el-form-item>
            <el-form-item label="重点因子" prop="vocImportFactor">
              <el-input v-model="form.vocImportFactor" placeholder="请输入重点因子" />
            </el-form-item>
            <el-form-item label="厂区平面图" prop="archivesCqpmtImg">
              <image-upload v-model="form.archivesCqpmtImg" />
            </el-form-item>
            <el-form-item label="装置工艺流程图" prop="archivesZzgylctImg">
              <image-upload v-model="form.archivesZzgylctImg" />
            </el-form-item>
            <el-form-item label="应急救援线路图" prop="archivesYjjyxlt">
              <image-upload v-model="form.archivesYjjyxlt" />
            </el-form-item>
            <el-form-item label="紧急疏散线路图" prop="archivesJjsslxtImg">
              <image-upload v-model="form.archivesJjsslxtImg" />
            </el-form-item>
            <el-form-item label="边界" prop="mapValue">
              <el-input v-model="form.mapValue" placeholder="请输入边界" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { listCompany, getCompany, delCompany, addCompany, updateCompany } from "@/api/yuanqu/company";

export default {
  name: "Company",
  dicts: ['hangye_qiye', 'sys_yes_no', 'huanjing_fengxiandenji', 'shengchanzhuangtai_qiye'],
  data () {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 一企一档表格数据
      companyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        baseCompanyName: null,
        baseShortName: null,
        baseIndustry: null,
        baseReskLever: null,
        baseLongitude: null,
        baseLatitude: null,
        baseOutputValue: null,
        baseProductionStatus: null,
        baseInitDate: null,
        baseEmployNum: null,
        baseArea: null,
        baseJkStatus: null,
        businessCode: null,
        businessCompanyType: null,
        businessLayerPerson: null,
        businessLayerPhone: null,
        businessInitAddr: null,
        businessRange: null,
        contactTel: null,
        contactPhone: null,
        contactFax: null,
        contactEmail: null,
        contactPostCode: null,
        contactWww: null,
        contactAddr: null,
        envPartName: null,
        envPartNum: null,
        envTopPerson: null,
        envTopPersonTel: null,
        envSafePerson: null,
        envSafePersonTel: null,
        vocProductName: null,
        vocProductValue: null,
        vocProductOName: null,
        vocProductOValue: null,
        vocOrigName: null,
        vocOrigValue: null,
        vocOrigOName: null,
        vocOrigOValue: null,
        vocVocsOutputValue: null,
        vocVocsOutValue: null,
        vocDelVocsCraft: null,
        vocImportFactor: null,
        archivesCqpmtImg: null,
        archivesZzgylctImg: null,
        archivesYjjyxlt: null,
        archivesJjsslxtImg: null,
        mapValue: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        baseCompanyName: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        baseShortName: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        baseIndustry: [
          { required: true, message: "行业不能为空", trigger: "change" }
        ],
        baseReskLever: [
          { required: true, message: "环境风险等级不能为空", trigger: "change" }
        ],
        baseJkStatus: [
          { required: true, message: "监控企业不能为空", trigger: "change" }
        ],
        businessCode: [
          { required: true, message: "统一社会信用代码不能为空", trigger: "blur" }
        ],
      },
      // 展示隐藏
      showIpt: false
    };
  },
  created () {
    this.getList();
  },
  methods: {
    // 切换表单
    toggleIpt () {
      this.showIpt = !this.showIpt
    },
    /** 查询一企一档列表 */
    getList () {
      this.loading = true;
      listCompany(this.queryParams).then(response => {
        this.companyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset () {
      this.form = {
        id: null,
        baseCompanyName: null,
        baseShortName: null,
        baseIndustry: null,
        baseReskLever: null,
        baseLongitude: null,
        baseLatitude: null,
        baseOutputValue: null,
        baseProductionStatus: null,
        baseInitDate: null,
        baseEmployNum: null,
        baseArea: null,
        baseJkStatus: null,
        businessCode: null,
        businessCompanyType: null,
        businessLayerPerson: null,
        businessLayerPhone: null,
        businessInitAddr: null,
        businessRange: null,
        contactTel: null,
        contactPhone: null,
        contactFax: null,
        contactEmail: null,
        contactPostCode: null,
        contactWww: null,
        contactAddr: null,
        envPartName: null,
        envPartNum: null,
        envTopPerson: null,
        envTopPersonTel: null,
        envSafePerson: null,
        envSafePersonTel: null,
        vocProductName: null,
        vocProductValue: null,
        vocProductOName: null,
        vocProductOValue: null,
        vocOrigName: null,
        vocOrigValue: null,
        vocOrigOName: null,
        vocOrigOValue: null,
        vocVocsOutputValue: null,
        vocVocsOutValue: null,
        vocDelVocsCraft: null,
        vocImportFactor: null,
        archivesCqpmtImg: null,
        archivesZzgylctImg: null,
        archivesYjjyxlt: null,
        archivesJjsslxtImg: null,
        mapValue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    // handleSelectionChange (selection) {
    //   this.ids = selection.map(item => item.id)
    //   this.single = selection.length !== 1
    //   this.multiple = !selection.length
    // },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加一企一档";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const id = row.id || this.ids
      getCompany(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改一企一档";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCompany(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCompany(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除一企一档编号为"' + ids + '"的数据项？').then(function () {
        return delCompany(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      this.download('yuanqu/company/export', {
        ...this.queryParams
      }, `company_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .table-box {
  thead tr th {
    background-color: #f7f8fa !important;
    font-weight: normal;
  }
}

.table-box {
  width: 100%;
  padding: 10px 20px;
  background-color: #fff;
  margin-top: 20px;

  .table-head {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
}

.header {
  width: 100%;
  background-color: #fff;
  padding: 24px;

  .label {
    min-width: 100px;
    font-size: 14px;
    text-align: right;
    padding-right: 10px;
  }

  small {
    color: #17bcbf;
    margin-left: 10px;
  }

  .ipt {
    display: inline-block;
    flex: 1;
  }

  .el-col {
    display: inline-block;
  }

  .col-flex {
    display: flex;
    justify-content: space-between;

    .col-item {
      width: 48%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

  }
}
</style>

