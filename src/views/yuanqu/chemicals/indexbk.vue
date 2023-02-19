<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="中文名称" prop="baseChName">
        <el-input
          v-model="queryParams.baseChName"
          placeholder="请输入中文名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="英文名称" prop="baseEnName">
        <el-input
          v-model="queryParams.baseEnName"
          placeholder="请输入英文名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="别名" prop="baseOName">
        <el-input
          v-model="queryParams.baseOName"
          placeholder="请输入别名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="CAS编号" prop="baseCasCode">
        <el-input
          v-model="queryParams.baseCasCode"
          placeholder="请输入CAS编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="危险性类别" prop="dangerHazardousChemicalsType">
        <el-select v-model="queryParams.dangerHazardousChemicalsType" placeholder="请选择危险性类别" clearable>
          <el-option
            v-for="dict in dict.type.weihuapinleibie_weixianpin"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="侵入途径" prop="dangerInvasionRoute">
        <el-input
          v-model="queryParams.dangerInvasionRoute"
          placeholder="请输入侵入途径"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="外观与性状" prop="physicalAppearCharacter">
        <el-input
          v-model="queryParams.physicalAppearCharacter"
          placeholder="请输入外观与性状"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="PH" prop="physicalPh">
        <el-input
          v-model="queryParams.physicalPh"
          placeholder="请输入PH"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="相对密度(水=1)" prop="physicalRelativeDensity">
        <el-input
          v-model="queryParams.physicalRelativeDensity"
          placeholder="请输入相对密度(水=1)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="熔点(℃)" prop="physicalMeltingPoint">
        <el-input
          v-model="queryParams.physicalMeltingPoint"
          placeholder="请输入熔点(℃)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="相对蒸气密度(空气=1)" prop="physicalRelativeVaporDensity">
        <el-input
          v-model="queryParams.physicalRelativeVaporDensity"
          placeholder="请输入相对蒸气密度(空气=1)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="沸点(℃)" prop="physicalBoilingPoint">
        <el-input
          v-model="queryParams.physicalBoilingPoint"
          placeholder="请输入沸点(℃)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分子式" prop="physicalMolecularFormula">
        <el-input
          v-model="queryParams.physicalMolecularFormula"
          placeholder="请输入分子式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分子量" prop="physicalMolecularWeight">
        <el-input
          v-model="queryParams.physicalMolecularWeight"
          placeholder="请输入分子量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主要成分" prop="physicalMainComponents">
        <el-input
          v-model="queryParams.physicalMainComponents"
          placeholder="请输入主要成分"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="蒸汽热容(J/(kg·K))" prop="physicalSteamHeatCapacity">
        <el-input
          v-model="queryParams.physicalSteamHeatCapacity"
          placeholder="请输入蒸汽热容(J/(kg·K))"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="液体热容(J/(kg·K))" prop="physicalLiquidHeatCapacity">
        <el-input
          v-model="queryParams.physicalLiquidHeatCapacity"
          placeholder="请输入液体热容(J/(kg·K))"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="汽化热(J/kg)" prop="physicalHeatVap">
        <el-input
          v-model="queryParams.physicalHeatVap"
          placeholder="请输入汽化热(J/kg)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="液体密度(kg/m³)" prop="physicalLiquidDensity">
        <el-input
          v-model="queryParams.physicalLiquidDensity"
          placeholder="请输入液体密度(kg/m³)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="饱和蒸气压(kPa)" prop="physicalSaturatedVapor">
        <el-input
          v-model="queryParams.physicalSaturatedVapor"
          placeholder="请输入饱和蒸气压(kPa)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="蒸气压常数SPB" prop="physicalSpb">
        <el-input
          v-model="queryParams.physicalSpb"
          placeholder="请输入蒸气压常数SPB"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="蒸气压常数SPC" prop="physicalSpc">
        <el-input
          v-model="queryParams.physicalSpc"
          placeholder="请输入蒸气压常数SPC"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="燃烧热(kJ/mol)" prop="physicalHeatOfCombustion">
        <el-input
          v-model="queryParams.physicalHeatOfCombustion"
          placeholder="请输入燃烧热(kJ/mol)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="临界温度(℃)" prop="physicalCriticalTemp">
        <el-input
          v-model="queryParams.physicalCriticalTemp"
          placeholder="请输入临界温度(℃)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="临界压力(MPa)" prop="physicalCriticalPressure">
        <el-input
          v-model="queryParams.physicalCriticalPressure"
          placeholder="请输入临界压力(MPa)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="闪点(℃)" prop="physicalFlashPoint">
        <el-input
          v-model="queryParams.physicalFlashPoint"
          placeholder="请输入闪点(℃)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="爆炸上限%(V/V)" prop="physicalUpperExplosion">
        <el-input
          v-model="queryParams.physicalUpperExplosion"
          placeholder="请输入爆炸上限%(V/V)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="引燃温度(℃)" prop="physicalIgnition">
        <el-input
          v-model="queryParams.physicalIgnition"
          placeholder="请输入引燃温度(℃)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="爆炸下限%(V/V)" prop="physicalLowerExplosive">
        <el-input
          v-model="queryParams.physicalLowerExplosive"
          placeholder="请输入爆炸下限%(V/V)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="急性毒性" prop="poisonAcuteToxicity">
        <el-input
          v-model="queryParams.poisonAcuteToxicity"
          placeholder="请输入急性毒性"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="毒性终点浓度1(mg/m³)" prop="poisonEndPoint1">
        <el-input
          v-model="queryParams.poisonEndPoint1"
          placeholder="请输入毒性终点浓度1(mg/m³)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="毒性终点浓度2(mg/m³)" prop="poisonEndPoint2">
        <el-input
          v-model="queryParams.poisonEndPoint2"
          placeholder="请输入毒性终点浓度2(mg/m³)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['yuanqu:chemicals:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['yuanqu:chemicals:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['yuanqu:chemicals:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yuanqu:chemicals:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="chemicalsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="中文名称" align="center" prop="baseChName" />
      <el-table-column label="英文名称" align="center" prop="baseEnName" />
      <el-table-column label="别名" align="center" prop="baseOName" />
      <el-table-column label="CAS编号" align="center" prop="baseCasCode" />
      <el-table-column label="危险性类别" align="center" prop="dangerHazardousChemicalsType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.weihuapinleibie_weixianpin" :value="scope.row.dangerHazardousChemicalsType"/>
        </template>
      </el-table-column>
      <el-table-column label="侵入途径" align="center" prop="dangerInvasionRoute" />
      <el-table-column label="健康危害" align="center" prop="dangerHealthHazards" />
      <el-table-column label="环境危害" align="center" prop="dangerEnvHazards" />
      <el-table-column label="燃爆危害
" align="center" prop="dangerExplosionHazard" />
      <el-table-column label="外观与性状" align="center" prop="physicalAppearCharacter" />
      <el-table-column label="PH" align="center" prop="physicalPh" />
      <el-table-column label="相对密度(水=1)" align="center" prop="physicalRelativeDensity" />
      <el-table-column label="熔点(℃)" align="center" prop="physicalMeltingPoint" />
      <el-table-column label="相对蒸气密度(空气=1)" align="center" prop="physicalRelativeVaporDensity" />
      <el-table-column label="沸点(℃)" align="center" prop="physicalBoilingPoint" />
      <el-table-column label="分子式" align="center" prop="physicalMolecularFormula" />
      <el-table-column label="分子量" align="center" prop="physicalMolecularWeight" />
      <el-table-column label="主要成分" align="center" prop="physicalMainComponents" />
      <el-table-column label="蒸汽热容(J/(kg·K))" align="center" prop="physicalSteamHeatCapacity" />
      <el-table-column label="液体热容(J/(kg·K))" align="center" prop="physicalLiquidHeatCapacity" />
      <el-table-column label="汽化热(J/kg)" align="center" prop="physicalHeatVap" />
      <el-table-column label="液体密度(kg/m³)" align="center" prop="physicalLiquidDensity" />
      <el-table-column label="饱和蒸气压(kPa)" align="center" prop="physicalSaturatedVapor" />
      <el-table-column label="蒸气压常数SPB" align="center" prop="physicalSpb" />
      <el-table-column label="蒸气压常数SPC" align="center" prop="physicalSpc" />
      <el-table-column label="燃烧热(kJ/mol)" align="center" prop="physicalHeatOfCombustion" />
      <el-table-column label="临界温度(℃)" align="center" prop="physicalCriticalTemp" />
      <el-table-column label="临界压力(MPa)" align="center" prop="physicalCriticalPressure" />
      <el-table-column label="闪点(℃)" align="center" prop="physicalFlashPoint" />
      <el-table-column label="爆炸上限%(V/V)" align="center" prop="physicalUpperExplosion" />
      <el-table-column label="引燃温度(℃)" align="center" prop="physicalIgnition" />
      <el-table-column label="爆炸下限%(V/V)" align="center" prop="physicalLowerExplosive" />
      <el-table-column label="溶解性" align="center" prop="physicalSolubility" />
      <el-table-column label="主要用途" align="center" prop="physicalMainPurpose" />
      <el-table-column label="急性毒性" align="center" prop="poisonAcuteToxicity" />
      <el-table-column label="毒性终点浓度1(mg/m³)" align="center" prop="poisonEndPoint1" />
      <el-table-column label="毒性终点浓度2(mg/m³)" align="center" prop="poisonEndPoint2" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yuanqu:chemicals:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yuanqu:chemicals:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改危化品库对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="中文名称" prop="baseChName">
          <el-input v-model="form.baseChName" placeholder="请输入中文名称" />
        </el-form-item>
        <el-form-item label="英文名称" prop="baseEnName">
          <el-input v-model="form.baseEnName" placeholder="请输入英文名称" />
        </el-form-item>
        <el-form-item label="别名" prop="baseOName">
          <el-input v-model="form.baseOName" placeholder="请输入别名" />
        </el-form-item>
        <el-form-item label="CAS编号" prop="baseCasCode">
          <el-input v-model="form.baseCasCode" placeholder="请输入CAS编号" />
        </el-form-item>
        <el-form-item label="危险性类别" prop="dangerHazardousChemicalsType">
          <el-select v-model="form.dangerHazardousChemicalsType" placeholder="请选择危险性类别">
            <el-option
              v-for="dict in dict.type.weihuapinleibie_weixianpin"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="侵入途径" prop="dangerInvasionRoute">
          <el-input v-model="form.dangerInvasionRoute" placeholder="请输入侵入途径" />
        </el-form-item>
        <el-form-item label="健康危害" prop="dangerHealthHazards">
          <el-input v-model="form.dangerHealthHazards" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="环境危害" prop="dangerEnvHazards">
          <el-input v-model="form.dangerEnvHazards" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="燃爆危害
" prop="dangerExplosionHazard">
          <el-input v-model="form.dangerExplosionHazard" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="外观与性状" prop="physicalAppearCharacter">
          <el-input v-model="form.physicalAppearCharacter" placeholder="请输入外观与性状" />
        </el-form-item>
        <el-form-item label="PH" prop="physicalPh">
          <el-input v-model="form.physicalPh" placeholder="请输入PH" />
        </el-form-item>
        <el-form-item label="相对密度(水=1)" prop="physicalRelativeDensity">
          <el-input v-model="form.physicalRelativeDensity" placeholder="请输入相对密度(水=1)" />
        </el-form-item>
        <el-form-item label="熔点(℃)" prop="physicalMeltingPoint">
          <el-input v-model="form.physicalMeltingPoint" placeholder="请输入熔点(℃)" />
        </el-form-item>
        <el-form-item label="相对蒸气密度(空气=1)" prop="physicalRelativeVaporDensity">
          <el-input v-model="form.physicalRelativeVaporDensity" placeholder="请输入相对蒸气密度(空气=1)" />
        </el-form-item>
        <el-form-item label="沸点(℃)" prop="physicalBoilingPoint">
          <el-input v-model="form.physicalBoilingPoint" placeholder="请输入沸点(℃)" />
        </el-form-item>
        <el-form-item label="分子式" prop="physicalMolecularFormula">
          <el-input v-model="form.physicalMolecularFormula" placeholder="请输入分子式" />
        </el-form-item>
        <el-form-item label="分子量" prop="physicalMolecularWeight">
          <el-input v-model="form.physicalMolecularWeight" placeholder="请输入分子量" />
        </el-form-item>
        <el-form-item label="主要成分" prop="physicalMainComponents">
          <el-input v-model="form.physicalMainComponents" placeholder="请输入主要成分" />
        </el-form-item>
        <el-form-item label="蒸汽热容(J/(kg·K))" prop="physicalSteamHeatCapacity">
          <el-input v-model="form.physicalSteamHeatCapacity" placeholder="请输入蒸汽热容(J/(kg·K))" />
        </el-form-item>
        <el-form-item label="液体热容(J/(kg·K))" prop="physicalLiquidHeatCapacity">
          <el-input v-model="form.physicalLiquidHeatCapacity" placeholder="请输入液体热容(J/(kg·K))" />
        </el-form-item>
        <el-form-item label="汽化热(J/kg)" prop="physicalHeatVap">
          <el-input v-model="form.physicalHeatVap" placeholder="请输入汽化热(J/kg)" />
        </el-form-item>
        <el-form-item label="液体密度(kg/m³)" prop="physicalLiquidDensity">
          <el-input v-model="form.physicalLiquidDensity" placeholder="请输入液体密度(kg/m³)" />
        </el-form-item>
        <el-form-item label="饱和蒸气压(kPa)" prop="physicalSaturatedVapor">
          <el-input v-model="form.physicalSaturatedVapor" placeholder="请输入饱和蒸气压(kPa)" />
        </el-form-item>
        <el-form-item label="蒸气压常数SPB" prop="physicalSpb">
          <el-input v-model="form.physicalSpb" placeholder="请输入蒸气压常数SPB" />
        </el-form-item>
        <el-form-item label="蒸气压常数SPC" prop="physicalSpc">
          <el-input v-model="form.physicalSpc" placeholder="请输入蒸气压常数SPC" />
        </el-form-item>
        <el-form-item label="燃烧热(kJ/mol)" prop="physicalHeatOfCombustion">
          <el-input v-model="form.physicalHeatOfCombustion" placeholder="请输入燃烧热(kJ/mol)" />
        </el-form-item>
        <el-form-item label="临界温度(℃)" prop="physicalCriticalTemp">
          <el-input v-model="form.physicalCriticalTemp" placeholder="请输入临界温度(℃)" />
        </el-form-item>
        <el-form-item label="临界压力(MPa)" prop="physicalCriticalPressure">
          <el-input v-model="form.physicalCriticalPressure" placeholder="请输入临界压力(MPa)" />
        </el-form-item>
        <el-form-item label="闪点(℃)" prop="physicalFlashPoint">
          <el-input v-model="form.physicalFlashPoint" placeholder="请输入闪点(℃)" />
        </el-form-item>
        <el-form-item label="爆炸上限%(V/V)" prop="physicalUpperExplosion">
          <el-input v-model="form.physicalUpperExplosion" placeholder="请输入爆炸上限%(V/V)" />
        </el-form-item>
        <el-form-item label="引燃温度(℃)" prop="physicalIgnition">
          <el-input v-model="form.physicalIgnition" placeholder="请输入引燃温度(℃)" />
        </el-form-item>
        <el-form-item label="爆炸下限%(V/V)" prop="physicalLowerExplosive">
          <el-input v-model="form.physicalLowerExplosive" placeholder="请输入爆炸下限%(V/V)" />
        </el-form-item>
        <el-form-item label="溶解性" prop="physicalSolubility">
          <el-input v-model="form.physicalSolubility" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="主要用途" prop="physicalMainPurpose">
          <el-input v-model="form.physicalMainPurpose" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="急性毒性" prop="poisonAcuteToxicity">
          <el-input v-model="form.poisonAcuteToxicity" placeholder="请输入急性毒性" />
        </el-form-item>
        <el-form-item label="毒性终点浓度1(mg/m³)" prop="poisonEndPoint1">
          <el-input v-model="form.poisonEndPoint1" placeholder="请输入毒性终点浓度1(mg/m³)" />
        </el-form-item>
        <el-form-item label="毒性终点浓度2(mg/m³)" prop="poisonEndPoint2">
          <el-input v-model="form.poisonEndPoint2" placeholder="请输入毒性终点浓度2(mg/m³)" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listChemicals, getChemicals, delChemicals, addChemicals, updateChemicals } from "@/api/yuanqu/chemicals";

export default {
  name: "Chemicals",
  dicts: ['weihuapinleibie_weixianpin'],
  data() {
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
      form: {},
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
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询危化品库列表 */
    getList() {
      this.loading = true;
      listChemicals(this.queryParams).then(response => {
        this.chemicalsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
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
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加危化品库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getChemicals(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改危化品库";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
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
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除危化品库编号为"' + ids + '"的数据项？').then(function() {
        return delChemicals(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yuanqu/chemicals/export', {
        ...this.queryParams
      }, `chemicals_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
