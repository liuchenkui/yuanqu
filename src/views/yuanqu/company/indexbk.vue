<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="企业名称" prop="baseCompanyName">
        <el-input
          v-model="queryParams.baseCompanyName"
          placeholder="请输入企业名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="企业简称" prop="baseShortName">
        <el-input
          v-model="queryParams.baseShortName"
          placeholder="请输入企业简称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="行业" prop="baseIndustry">
        <el-select v-model="queryParams.baseIndustry" placeholder="请选择行业" clearable>
          <el-option
            v-for="dict in dict.type.hangye_qiye"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="环境风险等级" prop="baseReskLever">
        <el-select v-model="queryParams.baseReskLever" placeholder="请选择环境风险等级" clearable>
          <el-option
            v-for="dict in dict.type.huanjing_fengxiandenji"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="中心经度" prop="baseLongitude">
        <el-input
          v-model="queryParams.baseLongitude"
          placeholder="请输入中心经度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="中心维度" prop="baseLatitude">
        <el-input
          v-model="queryParams.baseLatitude"
          placeholder="请输入中心维度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年产值" prop="baseOutputValue">
        <el-input
          v-model="queryParams.baseOutputValue"
          placeholder="请输入年产值"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产状态" prop="baseProductionStatus">
        <el-select v-model="queryParams.baseProductionStatus" placeholder="请选择生产状态" clearable>
          <el-option
            v-for="dict in dict.type.shengchanzhuangtai_qiye"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="投产日期" prop="baseInitDate">
        <el-date-picker clearable
          v-model="queryParams.baseInitDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择投产日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="人员规模" prop="baseEmployNum">
        <el-input
          v-model="queryParams.baseEmployNum"
          placeholder="请输入人员规模"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="占地面积" prop="baseArea">
        <el-input
          v-model="queryParams.baseArea"
          placeholder="请输入占地面积"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="监控企业" prop="baseJkStatus">
        <el-select v-model="queryParams.baseJkStatus" placeholder="请选择监控企业" clearable>
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="businessCode">
        <el-input
          v-model="queryParams.businessCode"
          placeholder="请输入统一社会信用代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="企业种类" prop="businessCompanyType">
        <el-input
          v-model="queryParams.businessCompanyType"
          placeholder="请输入企业种类"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="法人代表" prop="businessLayerPerson">
        <el-input
          v-model="queryParams.businessLayerPerson"
          placeholder="请输入法人代表"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="法人联系电话" prop="businessLayerPhone">
        <el-input
          v-model="queryParams.businessLayerPhone"
          placeholder="请输入法人联系电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="注册地址" prop="businessInitAddr">
        <el-input
          v-model="queryParams.businessInitAddr"
          placeholder="请输入注册地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="固定电话" prop="contactTel">
        <el-input
          v-model="queryParams.contactTel"
          placeholder="请输入固定电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="
移动电话" prop="contactPhone">
        <el-input
          v-model="queryParams.contactPhone"
          placeholder="请输入
移动电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="传真" prop="contactFax">
        <el-input
          v-model="queryParams.contactFax"
          placeholder="请输入传真"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="
电子邮件" prop="contactEmail">
        <el-input
          v-model="queryParams.contactEmail"
          placeholder="请输入
电子邮件"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮政编码" prop="contactPostCode">
        <el-input
          v-model="queryParams.contactPostCode"
          placeholder="请输入邮政编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="
企业网址" prop="contactWww">
        <el-input
          v-model="queryParams.contactWww"
          placeholder="请输入
企业网址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系地址" prop="contactAddr">
        <el-input
          v-model="queryParams.contactAddr"
          placeholder="请输入联系地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="环保部门名称" prop="envPartName">
        <el-input
          v-model="queryParams.envPartName"
          placeholder="请输入环保部门名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="环保部门人数" prop="envPartNum">
        <el-input
          v-model="queryParams.envPartNum"
          placeholder="请输入环保部门人数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="环保负责人" prop="envTopPerson">
        <el-input
          v-model="queryParams.envTopPerson"
          placeholder="请输入环保负责人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="环保负责人电话" prop="envTopPersonTel">
        <el-input
          v-model="queryParams.envTopPersonTel"
          placeholder="请输入环保负责人电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="环保安全员" prop="envSafePerson">
        <el-input
          v-model="queryParams.envSafePerson"
          placeholder="请输入环保安全员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="环保安全员电话" prop="envSafePersonTel">
        <el-input
          v-model="queryParams.envSafePersonTel"
          placeholder="请输入环保安全员电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品名称" prop="vocProductName">
        <el-input
          v-model="queryParams.vocProductName"
          placeholder="请输入产品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品产量" prop="vocProductValue">
        <el-input
          v-model="queryParams.vocProductValue"
          placeholder="请输入产品产量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="副产物名称" prop="vocProductOName">
        <el-input
          v-model="queryParams.vocProductOName"
          placeholder="请输入副产物名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="
副产物产生量" prop="vocProductOValue">
        <el-input
          v-model="queryParams.vocProductOValue"
          placeholder="请输入
副产物产生量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原料名称" prop="vocOrigName">
        <el-input
          v-model="queryParams.vocOrigName"
          placeholder="请输入原料名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原料用量" prop="vocOrigValue">
        <el-input
          v-model="queryParams.vocOrigValue"
          placeholder="请输入原料用量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="辅料名称" prop="vocOrigOName">
        <el-input
          v-model="queryParams.vocOrigOName"
          placeholder="请输入辅料名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="辅料用量" prop="vocOrigOValue">
        <el-input
          v-model="queryParams.vocOrigOValue"
          placeholder="请输入辅料用量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="VOCs产生量" prop="vocVocsOutputValue">
        <el-input
          v-model="queryParams.vocVocsOutputValue"
          placeholder="请输入VOCs产生量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="VOCs排放量" prop="vocVocsOutValue">
        <el-input
          v-model="queryParams.vocVocsOutValue"
          placeholder="请输入VOCs排放量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="脱VOCs工艺名称" prop="vocDelVocsCraft">
        <el-input
          v-model="queryParams.vocDelVocsCraft"
          placeholder="请输入脱VOCs工艺名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="重点因子" prop="vocImportFactor">
        <el-input
          v-model="queryParams.vocImportFactor"
          placeholder="请输入重点因子"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="边界" prop="mapValue">
        <el-input
          v-model="queryParams.mapValue"
          placeholder="请输入边界"
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
          v-hasPermi="['yuanqu:company:add']"
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
          v-hasPermi="['yuanqu:company:edit']"
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
          v-hasPermi="['yuanqu:company:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yuanqu:company:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="companyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="企业名称" align="center" prop="baseCompanyName" />
      <el-table-column label="企业简称" align="center" prop="baseShortName" />
      <el-table-column label="行业" align="center" prop="baseIndustry">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.hangye_qiye" :value="scope.row.baseIndustry"/>
        </template>
      </el-table-column>
      <el-table-column label="环境风险等级" align="center" prop="baseReskLever">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.huanjing_fengxiandenji" :value="scope.row.baseReskLever"/>
        </template>
      </el-table-column>
      <el-table-column label="中心经度" align="center" prop="baseLongitude" />
      <el-table-column label="中心维度" align="center" prop="baseLatitude" />
      <el-table-column label="年产值" align="center" prop="baseOutputValue" />
      <el-table-column label="生产状态" align="center" prop="baseProductionStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shengchanzhuangtai_qiye" :value="scope.row.baseProductionStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="投产日期" align="center" prop="baseInitDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.baseInitDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人员规模" align="center" prop="baseEmployNum" />
      <el-table-column label="占地面积" align="center" prop="baseArea" />
      <el-table-column label="监控企业" align="center" prop="baseJkStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.baseJkStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="统一社会信用代码" align="center" prop="businessCode" />
      <el-table-column label="企业种类" align="center" prop="businessCompanyType" />
      <el-table-column label="法人代表" align="center" prop="businessLayerPerson" />
      <el-table-column label="法人联系电话" align="center" prop="businessLayerPhone" />
      <el-table-column label="注册地址" align="center" prop="businessInitAddr" />
      <el-table-column label="经营范围" align="center" prop="businessRange" />
      <el-table-column label="固定电话" align="center" prop="contactTel" />
      <el-table-column label="
移动电话" align="center" prop="contactPhone" />
      <el-table-column label="传真" align="center" prop="contactFax" />
      <el-table-column label="
电子邮件" align="center" prop="contactEmail" />
      <el-table-column label="邮政编码" align="center" prop="contactPostCode" />
      <el-table-column label="
企业网址" align="center" prop="contactWww" />
      <el-table-column label="联系地址" align="center" prop="contactAddr" />
      <el-table-column label="环保部门名称" align="center" prop="envPartName" />
      <el-table-column label="环保部门人数" align="center" prop="envPartNum" />
      <el-table-column label="环保负责人" align="center" prop="envTopPerson" />
      <el-table-column label="环保负责人电话" align="center" prop="envTopPersonTel" />
      <el-table-column label="环保安全员" align="center" prop="envSafePerson" />
      <el-table-column label="环保安全员电话" align="center" prop="envSafePersonTel" />
      <el-table-column label="产品名称" align="center" prop="vocProductName" />
      <el-table-column label="产品产量" align="center" prop="vocProductValue" />
      <el-table-column label="副产物名称" align="center" prop="vocProductOName" />
      <el-table-column label="
副产物产生量" align="center" prop="vocProductOValue" />
      <el-table-column label="原料名称" align="center" prop="vocOrigName" />
      <el-table-column label="原料用量" align="center" prop="vocOrigValue" />
      <el-table-column label="辅料名称" align="center" prop="vocOrigOName" />
      <el-table-column label="辅料用量" align="center" prop="vocOrigOValue" />
      <el-table-column label="VOCs产生量" align="center" prop="vocVocsOutputValue" />
      <el-table-column label="VOCs排放量" align="center" prop="vocVocsOutValue" />
      <el-table-column label="脱VOCs工艺名称" align="center" prop="vocDelVocsCraft" />
      <el-table-column label="重点因子" align="center" prop="vocImportFactor" />
      <el-table-column label="厂区平面图" align="center" prop="archivesCqpmtImg" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.archivesCqpmtImg" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="装置工艺流程图" align="center" prop="archivesZzgylctImg" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.archivesZzgylctImg" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="应急救援线路图" align="center" prop="archivesYjjyxlt" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.archivesYjjyxlt" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="紧急疏散线路图" align="center" prop="archivesJjsslxtImg" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.archivesJjsslxtImg" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="边界" align="center" prop="mapValue" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yuanqu:company:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yuanqu:company:remove']"
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
            <el-option
              v-for="dict in dict.type.hangye_qiye"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="环境风险等级" prop="baseReskLever">
          <el-select v-model="form.baseReskLever" placeholder="请选择环境风险等级">
            <el-option
              v-for="dict in dict.type.huanjing_fengxiandenji"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
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
            <el-option
              v-for="dict in dict.type.shengchanzhuangtai_qiye"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投产日期" prop="baseInitDate">
          <el-date-picker clearable
            v-model="form.baseInitDate"
            type="date"
            value-format="yyyy-MM-dd"
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
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
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
          <image-upload v-model="form.archivesCqpmtImg"/>
        </el-form-item>
        <el-form-item label="装置工艺流程图" prop="archivesZzgylctImg">
          <image-upload v-model="form.archivesZzgylctImg"/>
        </el-form-item>
        <el-form-item label="应急救援线路图" prop="archivesYjjyxlt">
          <image-upload v-model="form.archivesYjjyxlt"/>
        </el-form-item>
        <el-form-item label="紧急疏散线路图" prop="archivesJjsslxtImg">
          <image-upload v-model="form.archivesJjsslxtImg"/>
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
</template>

<script>
import { listCompany, getCompany, delCompany, addCompany, updateCompany } from "@/api/yuanqu/company";

export default {
  name: "Company",
  dicts: ['hangye_qiye', 'sys_yes_no', 'huanjing_fengxiandenji', 'shengchanzhuangtai_qiye'],
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
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询一企一档列表 */
    getList() {
      this.loading = true;
      listCompany(this.queryParams).then(response => {
        this.companyList = response.rows;
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
      this.title = "添加一企一档";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCompany(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改一企一档";
      });
    },
    /** 提交按钮 */
    submitForm() {
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
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除一企一档编号为"' + ids + '"的数据项？').then(function() {
        return delCompany(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yuanqu/company/export', {
        ...this.queryParams
      }, `company_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
