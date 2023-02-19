<template>
  <div class="app-container">
    <div class="header">

      <el-row>
        <!-- 左侧 -->
        <el-col :span="14" class="col-flex">

          <div class="col-item">
            <span class="label">
              风险区域名称
            </span>
            <span class="ipt">
              <el-input size="mini" v-model="queryParams.riskArea" placeholder="请输入"></el-input>
            </span>
          </div>

          <div class="col-item">
            <span class="label">
              企业名称
            </span>
            <span class="ipt">
              <el-input size="mini" v-model="queryParams.companyName" placeholder="请输入"></el-input>
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
              风险区域类型
            </span>
            <span class="ipt">
              <!-- <el-input size="mini" v-model="queryParams.riskAreaType" placeholder="请输入"></el-input> -->
              <el-select v-model="queryParams.riskAreaType" style="width:100%" placeholder="请选择风险区域类型" clearable>
                <el-option v-for="dict in dict.type.type_fengxianquyu" :key="dict.value" :label="dict.label"
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
        <el-table v-loading="loading" :data="areaList" height="450">
          <el-table-column fixed label="序号" width="35" align="center" prop="id" />
          <el-table-column label="企业名称" align="center" prop="companyName" />
          <el-table-column label="统一社会信用代码" width="300" align="center" prop="companyId" />
          <el-table-column label="风险区域名称" width="170" prop="riskArea" />
          <el-table-column label="风险区域类型" width="170" prop="riskAreaType">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.type_fengxianquyu" :value="scope.row.riskAreaType" />
            </template>
          </el-table-column>
          <el-table-column label="位置" prop="location" />
          <el-table-column label="经度" prop="longitude" />
          <el-table-column label="维度" width="100" prop="latitude" />
          <el-table-column label="备注" width="100" prop="remark" />
          <el-table-column label="操作" width="200" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="text" @click="handleUpdate(scope.row)" v-hasPermi="['yuanqu:area:edit']">修改</el-button>
              <el-button type="text" @click="handleDelete(scope.row)" v-hasPermi="['yuanqu:area:remove']">删除</el-button>
              <el-button type="text" @click="handleDelete(scope.row)">风险单元</el-button>
              <el-button type="text" @click="handleDelete(scope.row)">边界</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize" @pagination="getList" />

        <!-- 添加或修改风险区域对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
          <el-form ref="form" label-position="top" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="企业名称" prop="companyName">
              <el-input v-model="form.companyName" placeholder="请输入企业名称" />
            </el-form-item>
            <el-form-item label="风险区域名称" prop="riskArea">
              <el-input v-model="form.riskArea" placeholder="请输入风险区域名称" />
            </el-form-item>
            <el-form-item label="风险区域类型" prop="riskAreaType">
              <el-select v-model="form.riskAreaType" style="width:100%" placeholder="请选择风险区域类型">
                <el-option v-for="dict in dict.type.type_fengxianquyu" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="位置" prop="location">
              <el-input v-model="form.location" placeholder="请输入位置" />
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="form.longitude" placeholder="请输入经度" />
            </el-form-item>
            <el-form-item label="维度" prop="latitude">
              <el-input v-model="form.latitude" placeholder="请输入维度" />
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
import { listArea, getArea, delArea, addArea, updateArea } from "@/api/yuanqu/area";

export default {
  name: "Area",
  dicts: ['type_fengxianquyu'],
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
      // 风险区域表格数据
      areaList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyId: null,
        companyName: null,
        riskArea: null,
        riskAreaType: null,
        location: null,
        longitude: null,
        latitude: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        companyName: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        riskArea: [
          { required: true, message: "风险区域名称不能为空", trigger: "blur" }
        ],
        riskAreaType: [
          { required: true, message: "风险区域类型不能为空", trigger: "change" }
        ],
        longitude: [
          { required: true, message: "经度不能为空", trigger: "blur" }
        ],
        latitude: [
          { required: true, message: "维度不能为空", trigger: "blur" }
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
    /** 查询风险区域列表 */
    getList () {
      this.loading = true;
      listArea(this.queryParams).then(response => {
        this.areaList = response.rows;
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
        companyId: null,
        companyName: null,
        riskArea: null,
        riskAreaType: null,
        location: null,
        longitude: null,
        latitude: null,
        remark: null
      };
      // this.resetForm("form");
      this.queryParams = {
        id: null,
        companyId: null,
        companyName: null,
        riskArea: null,
        riskAreaType: null,
        location: null,
        longitude: null,
        latitude: null,
        remark: null
      };
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery () {
      // this.resetForm("queryForm");
      this.queryParams = {
        id: null,
        companyId: null,
        companyName: null,
        riskArea: null,
        riskAreaType: null,
        location: null,
        longitude: null,
        latitude: null,
        remark: null
      };
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
      this.title = "新增风险区域";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const id = row.id || this.ids
      getArea(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改风险区域";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateArea(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addArea(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除风险区域编号为"' + ids + '"的数据项？').then(function () {
        return delArea(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      this.download('yuanqu/area/export', {
        ...this.queryParams
      }, `area_${new Date().getTime()}.xlsx`)
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

::v-deep .el-dialog {
  .el-dialog__header {
    background-color: #17bcbf;

    .el-dialog__title {
      color: #fff !important;
    }
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
    text-align: left;
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
