<template>
  <div class="app-container">
    <div class="header">

      <el-row>
        <!-- 左侧 -->
        <el-col :span="14" class="col-flex">

          <div class="col-item">
            <span class="label">
              中文名称
            </span>
            <span class="ipt">
              <el-input size="mini" v-model="queryParams.baseChName" placeholder="请输入"></el-input>
            </span>
          </div>

          <div class="col-item">
            <span class="label">
              危险性类别
            </span>
            <span class="ipt">
              <el-select v-model="queryParams.dangerHazardousChemicalsType" style="width:100%" placeholder="请选择危险性类别"
                clearable>
                <el-option v-for="dict in dict.type.weihuapinleibie_weixianpin" :key="dict.value" :label="dict.label"
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
              CAS编号
            </span>
            <span class="ipt">
              <el-input size="mini" v-model="queryParams.baseCasCode" placeholder="请输入"></el-input>
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
        <el-table v-loading="loading" :data="chemicalsList" @selection-change="handleSelectionChange">
          <el-table-column label="序号" width="65" align="center" prop="id" />
          <el-table-column label="中文名称" width="100" prop="baseChName" />
          <el-table-column label="英文名称" width="100" prop="baseEnName" />
          <el-table-column label="危险性类别" width="300" prop="dangerHazardousChemicalsType">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.weihuapinleibie_weixianpin" :value="scope.row.dangerHazardousChemicalsType" />
            </template>
          </el-table-column>
          <el-table-column label="分子式" prop="physicalMolecularFormula" />
          <el-table-column label="分子量" prop="physicalMolecularWeight" />
          <el-table-column label="CAS编号" prop="baseCasCode" />
          <el-table-column label="操作" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="text" @click="handleUpdate(scope.row)"
                v-hasPermi="['yuanqu:chemicals:edit']">查询详情</el-button>
              <el-button type="text" @click="handleUpdate(scope.row)"
                v-hasPermi="['yuanqu:chemicals:edit']">编辑</el-button>

              <el-popover placement="bottom-start" width="60" trigger="click">
                <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                  v-hasPermi="['yuanqu:chemicals:remove']">删除</el-button>
                <i slot="reference" class="el-icon-arrow-down dels"></i>
              </el-popover>

            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
          @pagination="getList" />

        <!-- 添加或修改危化品库对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>

          <el-tabs tab-position="left" style="height: 500px;">
            <el-tab-pane label="基本信息">

              <div class="tab-head">
                基本信息
              </div>

              <el-form :inline="true" ref="form1" :rules="rules" label-position="top" :model="form"
                class="demo-form-inline">
                <el-form-item label="中文名" style="width:46%" prop="baseChName">
                  <el-input size="mini" v-model="form.baseChName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="别名" style="width:46%" prop="baseOName">
                  <el-input size="mini" v-model="form.baseOName" placeholder="请输入"></el-input>

                </el-form-item>
                <el-form-item label="英文名" style="width:46%" prop="baseEnName">
                  <el-input size="mini" v-model="form.baseEnName" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="CAS号" style="width:46%" prop="baseCasCode">
                  <el-input size="mini" v-model="form.baseCasCode" placeholder="请输入"></el-input>
                </el-form-item>
              </el-form>

            </el-tab-pane>

            <el-tab-pane label="危险性概述">
              <div class="tab-head">
                危险性概述
              </div>

              <el-form :inline="true" ref="form2" :rules="rules" label-position="top" :model="form"
                class="demo-form-inline">
                <el-form-item label="危险性类别" style="width:46%" prop="dangerHazardousChemicalsType">
                  <el-select v-model="form.dangerHazardousChemicalsType" style="width:100%" size="mini"
                    placeholder="请选择危险性类别">
                    <el-option v-for="dict in dict.type.weihuapinleibie_weixianpin" :key="dict.value" :label="dict.label"
                      :value="dict.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="侵入途径" style="width:46%" prop="dangerInvasionRoute">
                  <el-input size="mini" v-model="form.dangerInvasionRoute" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="健康危害" style="width:100%" prop="dangerHealthHazards">
                  <el-input v-model="form.dangerHealthHazards"></el-input>
                </el-form-item>
                <el-form-item label="环境危害" style="width:100%" prop="dangerEnvHazards">
                  <el-input type="textarea" v-model="form.dangerEnvHazards"></el-input>
                </el-form-item>
                <el-form-item label="燃爆危害" style="width:100%" prop="dangerExplosionHazard">
                  <el-input type="textarea" v-model="form.dangerExplosionHazard"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="理化特性">
              <div class="tab-head">
                理化特性
              </div>

              <el-form :inline="true" :rules="rules" ref="form3" label-position="top" :model="form"
                class="demo-form-inline">
                <el-form-item label="外观与性状" style="width:46%" prop="physicalAppearCharacter">
                  <el-select v-model="form.dangerHazardousChemicalsType" style="width:100%" size="mini"
                    placeholder="请选择危险性类别">
                    <el-option v-for="dict in dict.type.weihuapinleibie_weixianpin" :key="dict.value" :label="dict.label"
                      :value="dict.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="PH" style="width:46%" prop="physicalPh">
                  <el-input size="mini" v-model="form.physicalPh" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="相对密度(水=1)" style="width:46%" prop="physicalRelativeDensity">
                  <el-input size="mini" v-model="form.physicalRelativeDensity" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="熔点(℃)" style="width:46%" prop="physicalMeltingPoint">
                  <el-input size="mini" v-model="form.physicalMeltingPoint" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="相对蒸气密度(空气=1)" style="width:46%" prop="physicalRelativeVaporDensity">
                  <el-input size="mini" v-model="form.physicalRelativeVaporDensity" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="沸点(℃)" style="width:46%" prop="physicalBoilingPoint">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalBoilingPoint"></el-input>
                </el-form-item>
                <el-form-item label="分子式" style="width:46%" prop="physicalMolecularFormula">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalMolecularFormula"></el-input>
                </el-form-item>
                <el-form-item label="主要成分" style="width:46%" prop="physicalMainComponents">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalMainComponents"></el-input>
                </el-form-item>
                <el-form-item label="分子量" style="width:46%" prop="physicalMolecularWeight">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalMolecularWeight"></el-input>
                </el-form-item>
                <el-form-item label="蒸汽热容(J/(kg·K))" style="width:46%" prop="physicalSteamHeatCapacity">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalSteamHeatCapacity"></el-input>
                </el-form-item>
                <el-form-item label="液体热容(J/(kg·K))" style="width:46%" prop="physicalLiquidHeatCapacity">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalLiquidHeatCapacity"></el-input>
                </el-form-item>
                <el-form-item label="汽化热(J/kg)" style="width:46%" prop="physicalHeatVap">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalHeatVap"></el-input>
                </el-form-item>
                <el-form-item label="液体密度(kg/m³)" style="width:46%" prop="physicalLiquidDensity">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalLiquidDensity"></el-input>
                </el-form-item>
                <el-form-item label="饱和蒸气压(kPa)" style="width:46%" prop="physicalSaturatedVapor">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalSaturatedVapor"></el-input>
                </el-form-item>
                <el-form-item label="蒸气压常数SPB" style="width:46%" prop="physicalSpb">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalSpb"></el-input>
                </el-form-item>
                <el-form-item label="燃烧热(kJ/mol)" style="width:46%" prop="physicalHeatOfCombustion">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalHeatOfCombustion"></el-input>
                </el-form-item>
                <el-form-item label="临界温度(℃)" style="width:46%" prop="physicalCriticalTemp">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalCriticalTemp"></el-input>
                </el-form-item>
                <el-form-item label="临界压力(MPa)" style="width:46%" prop="physicalCriticalPressure">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalCriticalPressure"></el-input>
                </el-form-item>
                <el-form-item label="闪点(℃)" style="width:46%" prop="physicalFlashPoint">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalFlashPoint"></el-input>
                </el-form-item>
                <el-form-item label="爆炸上限%(V/V)" style="width:46%" prop="physicalUpperExplosion">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalUpperExplosion"></el-input>
                </el-form-item>
                <el-form-item label="引燃温度(℃)" style="width:46%" prop="physicalIgnition">
                  <el-input size="mini" placeholder="请输入" v-model="form.physicalIgnition"></el-input>
                </el-form-item>
                <el-form-item label="爆炸下限%(V/V)" style="width:46%" prop="physicalLowerExplosive">
                  <el-input size="mini" placeholder="请输入" prop="physicalLowerExplosive"></el-input>
                </el-form-item>
                <el-form-item label="溶解性" style="width:98%" prop="physicalSolubility">
                  <el-input size="mini" type="textarea" placeholder="请输入" v-model="form.physicalSolubility"></el-input>
                </el-form-item>
                <el-form-item label="主要用途" style="width:98%" prop="physicalMainPurpose">
                  <el-input size="mini" type="textarea" placeholder="请输入" v-model="form.physicalMainPurpose"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="毒理学信息">
              <div class="tab-head">
                毒理学信息
              </div>
              <el-form :inline="true" ref="form4" label-position="top" :rules="rules" :model="form"
                class="demo-form-inline">
                <el-form-item label="急性毒性" style="width:46%" prop="poisonAcuteToxicity">
                  <el-input type="textarea" v-model="form.poisonAcuteToxicity"></el-input>
                </el-form-item>
                <el-form-item label="毒性终点浓度1(mg/m³)" style="width:46%" prop="poisonEndPoint1">
                  <el-input size="mini" placeholder="请输入" v-model="form.poisonEndPoint1"></el-input>
                </el-form-item>
                <el-form-item label="毒性终点浓度2(mg/m³)" style="width:100%" prop="poisonEndPoint2">
                  <el-input size="mini" placeholder="请输入" v-model="form.poisonEndPoint2"></el-input>
                </el-form-item>

              </el-form>

            </el-tab-pane>

          </el-tabs>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">保 存</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { listChemicals, getChemicals, delChemicals, addChemicals, updateChemicals } from "@/api/yuanqu/chemicals";

export default {
  name: "Chemicals",
  dicts: ['weihuapinleibie_weixianpin'],
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
      // 危化品库表格数据
      chemicalsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        baseChName: null,
        baseEnName: null,
        baseOName: null,
        baseCasCode: null,
        dangerHazardousChemicalsType: null,
        dangerInvasionRoute: null,
        dangerHealthHazards: null,
        dangerEnvHazards: null,
        dangerExplosionHazard: null,
        physicalAppearCharacter: null,
        physicalPh: null,
        physicalRelativeDensity: null,
        physicalMeltingPoint: null,
        physicalRelativeVaporDensity: null,
        physicalBoilingPoint: null,
        physicalMolecularFormula: null,
        physicalMolecularWeight: null,
        physicalMainComponents: null,
        physicalSteamHeatCapacity: null,
        physicalLiquidHeatCapacity: null,
        physicalHeatVap: null,
        physicalLiquidDensity: null,
        physicalSaturatedVapor: null,
        physicalSpb: null,
        physicalSpc: null,
        physicalHeatOfCombustion: null,
        physicalCriticalTemp: null,
        physicalCriticalPressure: null,
        physicalFlashPoint: null,
        physicalUpperExplosion: null,
        physicalIgnition: null,
        physicalLowerExplosive: null,
        physicalSolubility: null,
        physicalMainPurpose: null,
        poisonAcuteToxicity: null,
        poisonEndPoint1: null,
        poisonEndPoint2: null
      },
      // 表单参数
      form: {

      },
      // 表单校验
      rules: {
        baseChName: [
          { required: true, message: "中文名称不能为空", trigger: "blur" }
        ],
        baseCasCode: [
          { required: true, message: "CAS编号不能为空", trigger: "blur" }
        ],
        dangerHazardousChemicalsType: [
          { required: true, message: "危险性类别不能为空", trigger: "change" }
        ],
        physicalBoilingPoint: [
          { required: true, message: "沸点(℃)不能为空", trigger: "blur" }
        ],
        physicalMolecularFormula: [
          { required: true, message: "分子式不能为空", trigger: "blur" }
        ],
        physicalMolecularWeight: [
          { required: true, message: "分子量不能为空", trigger: "blur" }
        ],
        physicalSteamHeatCapacity: [
          { required: true, message: "蒸汽热容(J/(kg·K))不能为空", trigger: "blur" }
        ],
        physicalLiquidHeatCapacity: [
          { required: true, message: "液体热容(J/(kg·K))不能为空", trigger: "blur" }
        ],
        physicalHeatVap: [
          { required: true, message: "汽化热(J/kg)不能为空", trigger: "blur" }
        ],
        physicalSpb: [
          { required: true, message: "蒸气压常数SPB不能为空", trigger: "blur" }
        ],
        physicalSpc: [
          { required: true, message: "蒸气压常数SPC不能为空", trigger: "blur" }
        ],
        poisonEndPoint1: [
          { required: true, message: "毒性终点浓度1(mg/m³)不能为空", trigger: "blur" }
        ],
        poisonEndPoint2: [
          { required: true, message: "毒性终点浓度2(mg/m³)不能为空", trigger: "blur" }
        ]
      },
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
    /** 查询危化品库列表 */
    getList () {
      this.loading = true;
      listChemicals(this.queryParams).then(response => {
        this.chemicalsList = response.rows;
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
        baseChName: null,
        baseEnName: null,
        baseOName: null,
        baseCasCode: null,
        dangerHazardousChemicalsType: null,
        dangerInvasionRoute: null,
        dangerHealthHazards: null,
        dangerEnvHazards: null,
        dangerExplosionHazard: null,
        physicalAppearCharacter: null,
        physicalPh: null,
        physicalRelativeDensity: null,
        physicalMeltingPoint: null,
        physicalRelativeVaporDensity: null,
        physicalBoilingPoint: null,
        physicalMolecularFormula: null,
        physicalMolecularWeight: null,
        physicalMainComponents: null,
        physicalSteamHeatCapacity: null,
        physicalLiquidHeatCapacity: null,
        physicalHeatVap: null,
        physicalLiquidDensity: null,
        physicalSaturatedVapor: null,
        physicalSpb: null,
        physicalSpc: null,
        physicalHeatOfCombustion: null,
        physicalCriticalTemp: null,
        physicalCriticalPressure: null,
        physicalFlashPoint: null,
        physicalUpperExplosion: null,
        physicalIgnition: null,
        physicalLowerExplosive: null,
        physicalSolubility: null,
        physicalMainPurpose: null,
        poisonAcuteToxicity: null,
        poisonEndPoint1: null,
        poisonEndPoint2: null
      };
      // this.resetForm("form");
      this.delQuery()
    },
    // 清空搜索表单
    delQuery () {
      this.queryParams = {
        id: null,
        baseChName: null,
        baseEnName: null,
        baseOName: null,
        baseCasCode: null,
        dangerHazardousChemicalsType: null,
        dangerInvasionRoute: null,
        dangerHealthHazards: null,
        dangerEnvHazards: null,
        dangerExplosionHazard: null,
        physicalAppearCharacter: null,
        physicalPh: null,
        physicalRelativeDensity: null,
        physicalMeltingPoint: null,
        physicalRelativeVaporDensity: null,
        physicalBoilingPoint: null,
        physicalMolecularFormula: null,
        physicalMolecularWeight: null,
        physicalMainComponents: null,
        physicalSteamHeatCapacity: null,
        physicalLiquidHeatCapacity: null,
        physicalHeatVap: null,
        physicalLiquidDensity: null,
        physicalSaturatedVapor: null,
        physicalSpb: null,
        physicalSpc: null,
        physicalHeatOfCombustion: null,
        physicalCriticalTemp: null,
        physicalCriticalPressure: null,
        physicalFlashPoint: null,
        physicalUpperExplosion: null,
        physicalIgnition: null,
        physicalLowerExplosive: null,
        physicalSolubility: null,
        physicalMainPurpose: null,
        poisonAcuteToxicity: null,
        poisonEndPoint1: null,
        poisonEndPoint2: null
      };
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.delQuery()
      // this.resetForm("queryForm");
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
      this.title = "添加危化品库";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const id = row.id || this.ids
      getChemicals(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改危化品库";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form1"].validate(valid => {
        if (valid) {
          this.$refs["form2"].validate(valid => {
            if (valid) {
              this.$refs["form3"].validate(valid => {
                if (valid) {
                  this.$refs["form4"].validate(valid => {
                    if (valid) {
                      if (this.form.id != null) {
                        updateChemicals(this.form).then(response => {
                          this.$modal.msgSuccess("修改成功");
                          this.open = false;
                          this.getList();
                        });
                      } else {
                        addChemicals(this.form).then(response => {
                          this.$modal.msgSuccess("新增成功");
                          this.open = false;
                          this.getList();
                        });
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });


    },
    /** 删除按钮操作 */
    handleDelete (row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除危化品库编号为"' + ids + '"的数据项？').then(function () {
        return delChemicals(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      this.download('yuanqu/chemicals/export', {
        ...this.queryParams
      }, `chemicals_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style lang="scss" scoped>
.tab-head {
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, .06);
  margin-bottom: 20px;
}

.tab-head::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 2px;
  bottom: -1px;
  left: 0;
  background-color: #17bcbf;
}

::v-deep .el-dialog__body {
  .el-tabs--left .el-tabs__item.is-left {
    text-align: left;
  }

  .el-tab-pane {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .el-form-item__label {
    line-height: 10px;
    font-size: 12px;
    font-weight: normal;
  }

  .is-active {
    color: #17bcbf;
    background: linear-gradient(90deg, rgba(28, 179, 255, .06), rgba(40, 217, 157, .06));
  }
}


::v-deep .table-box {
  thead tr th {
    background-color: #f7f8fa !important;
    font-weight: normal;
    // font-size: 16px;
  }
}

.el-popover__reference-wrapper i {
  color: #17bcbf;
  margin-left: 5px;
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
