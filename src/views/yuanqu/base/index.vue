<template>
  <div class="app-container">
    <el-row>
      <div class="top-title">
        <p class="title">基本信息</p>
        <el-button type="primary" @click="submitForm">保 存</el-button>
      </div>
    </el-row>

    <!-- 表单内容 -->
    <div class="cnt">
      <el-row>
        <el-col :span="12" class="col-item">
          <span class="col-label">园区名称</span>
          <span class="col-ipt">
            <el-form :model="form" :rules="rules" ref="form">
              <el-input size="mini" v-model="form.yqName" @blur="isNull1"
                :class="{ 'required': true, 'falseBor': !nameFlag }" placeholder="请输入"></el-input>
            </el-form>

          </span>
        </el-col>

        <el-col :span="12" class="col-item">
          <span class="col-label">所属城市</span>
          <span class="col-ipt">
            <el-input size="mini" v-model="form.yqCity" placeholder="请输入"></el-input>
          </span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" class="col-item">
          <span class="col-label">成立时间</span>
          <span class="col-ipt">
            <!-- <el-input size="mini" v-model="form.yqInitTime" placeholder="请输入"></el-input> -->
            <el-date-picker style="width:100%" v-model="form.yqInitTime" type="date" placeholder="请输入">
            </el-date-picker>
          </span>
        </el-col>

        <el-col :span="12" class="col-item">
          <span class="col-label">规划面积</span>
          <span class="col-ipt">
            <el-input size="mini" v-model="form.yqGhmj" placeholder="请输入"></el-input>
          </span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" class="col-item">
          <span class="col-label">园区机构管理</span>
          <span class="col-ipt">
            <el-input size="mini" v-model="form.yqGljg" placeholder="请输入"></el-input>
          </span>
        </el-col>

        <el-col :span="12" class="col-item">
          <span class="col-label">园区负责人</span>
          <span class="col-ipt">
            <el-input size="mini" v-model="form.yqFzr" placeholder="请输入"></el-input>
          </span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" class="col-item">
          <span class="col-label">中心经度</span>
          <span class="col-ipt">
            <el-input size="mini" v-model="form.yqLongitude" @blur="isNull2"
              :class="{ 'required': true, 'falseBor': !jingFlag }" placeholder="请输入"></el-input>
          </span>
        </el-col>

        <el-col :span="12" class="col-item">
          <span class="col-label">中心纬度</span>
          <span class="col-ipt">
            <el-input size="mini" v-model="form.yqLatitude" @blur="isNull3"
              :class="{ 'required': true, 'falseBor': !weiFlag }" placeholder="请输入"></el-input>
          </span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" class="col-item text-start">
          <span class="col-label" :style="`margin-top:5px`">园区简介</span>
          <span class="col-ipt">
            <el-input type="textarea" v-model="form.yqIntroduce" rows="5" size="mini" class="textarea"
              placeholder="请输入"></el-input>
          </span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" class="col-item text-start">
          <span class="col-label" :style="`margin-top:5px`">产业介绍</span>
          <span class="col-ipt">
            <el-input type="textarea" v-model="form.yqIndustryIntroduction" rows="5" size="mini" class="textarea"
              placeholder="请输入"></el-input>
          </span>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import { listBase, getBase, delBase, addBase, updateBase } from "@/api/yuanqu/base";

export default {
  name: "Base",
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
      // 一园一档表格数据
      baseList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        yqName: null,
        yqCity: null,
        yqInitTime: null,
        yqGhmj: null,
        yqGljg: null,
        yqFzr: null,
        yqLongitude: null,
        yqLatitude: null,
        yqIntroduce: null,
        yqIndustryIntroduction: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      nameFlag: true,
      jingFlag: true,
      weiFlag: true
    };
  },
  created () {
    this.getList();
  },
  methods: {
    /** 查询一园一档列表 */
    getList () {
      this.loading = true;
      listBase(this.queryParams).then(response => {
        this.baseList = response.rows;
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
        yqName: null,
        yqCity: null,
        yqInitTime: null,
        yqGhmj: null,
        yqGljg: null,
        yqFzr: null,
        yqLongitude: null,
        yqLatitude: null,
        yqIntroduce: null,
        yqIndustryIntroduction: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };

      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        yqName: null,
        yqCity: null,
        yqInitTime: null,
        yqGhmj: null,
        yqGljg: null,
        yqFzr: null,
        yqLongitude: null,
        yqLatitude: null,
        yqIntroduce: null,
        yqIndustryIntroduction: null,
      }
      // this.resetForm("form");
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
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加一园一档";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const id = row.id || this.ids
      getBase(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改一园一档";
      });
    },
    /** 提交按钮 */
    submitForm () {
      if (!this.form.yqName) {
        this.$message.error('请先完善信息!');
        return this.nameFlag = false
      } else {
        this.nameFlag = true
      }

      if (!this.form.yqLatitude) {
        this.$message.error('请先完善信息!');
        return this.jingFlag = false
      } else {
        this.jingFlag = true
      }

      if (!this.form.yqLatitude) {
        this.$message.error('请先完善信息!');
        return this.weiFlag = false
      } else {
        this.weiFlag = true
      }
      if (this.form.id != null) {
        updateBase(this.form).then(response => {
          this.$modal.msgSuccess("修改成功");
          this.open = false;
          this.getList();
        });
      } else {
        addBase(this.form).then(response => {
          this.$modal.msgSuccess("保存成功");
          this.open = false;
          this.getList();
        });
      }
    },
    /** 判空校验 */
    isNull1 () {
      if (!this.form.yqName) {
        return this.nameFlag = false
      } else {
        this.nameFlag = true
      }
    },
    isNull2 () {
      if (!this.form.yqLatitude) {
        return this.jingFlag = false
      } else {
        this.jingFlag = true
      }
    },
    isNull3 () {
      if (!this.form.yqLatitude) {
        return this.weiFlag = false
      } else {
        this.weiFlag = true
      }
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除一园一档编号为"' + ids + '"的数据项？').then(function () {
        return delBase(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      this.download('yuanqu/base/export', {
        ...this.queryParams
      }, `base_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

<style lang="scss" scoped>
.text-start {
  align-items: flex-start !important;
}

::v-deep .falseBor {

  .el-input__inner {
    border: 1px solid #ff4d4f;
  }

}

.required::after {
  position: absolute;
  display: inline-block;
  margin-right: 4px;
  color: #ff4d4f;
  font-size: 14px;
  font-family: SimSun, sans-serif;
  line-height: 1;
  content: "*";
  top: 22%;
  right: -15px;
}

.cnt {
  width: 70%;
  padding: 5px;
  margin: 20px auto;

  .el-row {
    margin-bottom: 25px;
  }

  .col-item {
    display: flex;
    align-items: center;
    justify-content: center;

    .col-label {
      display: inline-block;
      min-width: 95px;
      padding-right: 10px;
      font-size: 14px;
      color: #000000d9;
      text-align: right;
    }

    .col-ipt {
      position: relative;
      display: inline-block;
      flex: 1;
      padding-right: 30px;
    }
  }
}

.top-title {
  width: 100%;
  margin-top: -10px;
  border-bottom: 1px solid rgba(0, 0, 0, .06);
  color: #363e45;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-weight: 650;
    font-size: 16px;
  }
}

.app-container {
  background-color: #fff;
}
</style>
