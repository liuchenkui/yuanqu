<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="风险区域id" prop="reskId">
        <el-input
          v-model="queryParams.reskId"
          placeholder="请输入风险区域id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="风险单元名称" prop="riskUnitName">
        <el-input
          v-model="queryParams.riskUnitName"
          placeholder="请输入风险单元名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="风险单元类型" prop="tiskUnitType">
        <el-select v-model="queryParams.tiskUnitType" placeholder="请选择风险单元类型" clearable>
          <el-option
            v-for="dict in dict.type.type_fengxiandanyuan"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="装置容积" prop="unitVolume">
        <el-input
          v-model="queryParams.unitVolume"
          placeholder="请输入装置容积"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="装置底面积" prop="unitVolumeBottom">
        <el-input
          v-model="queryParams.unitVolumeBottom"
          placeholder="请输入装置底面积"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="化学品中文名称" prop="chemicalChinese">
        <el-input
          v-model="queryParams.chemicalChinese"
          placeholder="请输入化学品中文名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="化学品CAS号" prop="chemicalCas">
        <el-input
          v-model="queryParams.chemicalCas"
          placeholder="请输入化学品CAS号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="相态" prop="phaseState">
        <el-select v-model="queryParams.phaseState" placeholder="请选择相态" clearable>
          <el-option
            v-for="dict in dict.type.xiangtai_fengxiandanyuan"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="浓度" prop="concentration">
        <el-input
          v-model="queryParams.concentration"
          placeholder="请输入浓度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="容器内物料温度" prop="containerTemperature">
        <el-input
          v-model="queryParams.containerTemperature"
          placeholder="请输入容器内物料温度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="容器内物料压力" prop="containerPa">
        <el-input
          v-model="queryParams.containerPa"
          placeholder="请输入容器内物料压力"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="贮存量/在线量" prop="storageOnlineQuantity">
        <el-input
          v-model="queryParams.storageOnlineQuantity"
          placeholder="请输入贮存量/在线量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="罐区围堰面积" prop="tankFarmArea">
        <el-input
          v-model="queryParams.tankFarmArea"
          placeholder="请输入罐区围堰面积"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="罐区围堰高度" prop="tankFarmHight">
        <el-input
          v-model="queryParams.tankFarmHight"
          placeholder="请输入罐区围堰高度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="罐区地表类型" prop="tankFarmSurfaceType">
        <el-select v-model="queryParams.tankFarmSurfaceType" placeholder="请选择罐区地表类型" clearable>
          <el-option
            v-for="dict in dict.type.type_guanqudibiao"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['yuanqu:unit:add']"
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
          v-hasPermi="['yuanqu:unit:edit']"
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
          v-hasPermi="['yuanqu:unit:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yuanqu:unit:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="unitList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="风险区域id" align="center" prop="reskId" />
      <el-table-column label="风险单元名称" align="center" prop="riskUnitName" />
      <el-table-column label="风险单元类型" align="center" prop="tiskUnitType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.type_fengxiandanyuan" :value="scope.row.tiskUnitType"/>
        </template>
      </el-table-column>
      <el-table-column label="装置容积" align="center" prop="unitVolume" />
      <el-table-column label="装置底面积" align="center" prop="unitVolumeBottom" />
      <el-table-column label="化学品中文名称" align="center" prop="chemicalChinese" />
      <el-table-column label="化学品CAS号" align="center" prop="chemicalCas" />
      <el-table-column label="相态" align="center" prop="phaseState">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.xiangtai_fengxiandanyuan" :value="scope.row.phaseState"/>
        </template>
      </el-table-column>
      <el-table-column label="浓度" align="center" prop="concentration" />
      <el-table-column label="容器内物料温度" align="center" prop="containerTemperature" />
      <el-table-column label="容器内物料压力" align="center" prop="containerPa" />
      <el-table-column label="贮存量/在线量" align="center" prop="storageOnlineQuantity" />
      <el-table-column label="罐区围堰面积" align="center" prop="tankFarmArea" />
      <el-table-column label="罐区围堰高度" align="center" prop="tankFarmHight" />
      <el-table-column label="罐区地表类型" align="center" prop="tankFarmSurfaceType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.type_guanqudibiao" :value="scope.row.tankFarmSurfaceType"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yuanqu:unit:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yuanqu:unit:remove']"
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

    <!-- 添加或修改风险单元对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="风险区域id" prop="reskId">
          <el-input v-model="form.reskId" placeholder="请输入风险区域id" />
        </el-form-item>
        <el-form-item label="风险单元名称" prop="riskUnitName">
          <el-input v-model="form.riskUnitName" placeholder="请输入风险单元名称" />
        </el-form-item>
        <el-form-item label="风险单元类型" prop="tiskUnitType">
          <el-select v-model="form.tiskUnitType" placeholder="请选择风险单元类型">
            <el-option
              v-for="dict in dict.type.type_fengxiandanyuan"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="装置容积" prop="unitVolume">
          <el-input v-model="form.unitVolume" placeholder="请输入装置容积" />
        </el-form-item>
        <el-form-item label="装置底面积" prop="unitVolumeBottom">
          <el-input v-model="form.unitVolumeBottom" placeholder="请输入装置底面积" />
        </el-form-item>
        <el-form-item label="化学品中文名称" prop="chemicalChinese">
          <el-input v-model="form.chemicalChinese" placeholder="请输入化学品中文名称" />
        </el-form-item>
        <el-form-item label="化学品CAS号" prop="chemicalCas">
          <el-input v-model="form.chemicalCas" placeholder="请输入化学品CAS号" />
        </el-form-item>
        <el-form-item label="相态" prop="phaseState">
          <el-select v-model="form.phaseState" placeholder="请选择相态">
            <el-option
              v-for="dict in dict.type.xiangtai_fengxiandanyuan"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="浓度" prop="concentration">
          <el-input v-model="form.concentration" placeholder="请输入浓度" />
        </el-form-item>
        <el-form-item label="容器内物料温度" prop="containerTemperature">
          <el-input v-model="form.containerTemperature" placeholder="请输入容器内物料温度" />
        </el-form-item>
        <el-form-item label="容器内物料压力" prop="containerPa">
          <el-input v-model="form.containerPa" placeholder="请输入容器内物料压力" />
        </el-form-item>
        <el-form-item label="贮存量/在线量" prop="storageOnlineQuantity">
          <el-input v-model="form.storageOnlineQuantity" placeholder="请输入贮存量/在线量" />
        </el-form-item>
        <el-form-item label="罐区围堰面积" prop="tankFarmArea">
          <el-input v-model="form.tankFarmArea" placeholder="请输入罐区围堰面积" />
        </el-form-item>
        <el-form-item label="罐区围堰高度" prop="tankFarmHight">
          <el-input v-model="form.tankFarmHight" placeholder="请输入罐区围堰高度" />
        </el-form-item>
        <el-form-item label="罐区地表类型" prop="tankFarmSurfaceType">
          <el-select v-model="form.tankFarmSurfaceType" placeholder="请选择罐区地表类型">
            <el-option
              v-for="dict in dict.type.type_guanqudibiao"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
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
import { listUnit, getUnit, delUnit, addUnit, updateUnit } from "@/api/yuanqu/unit";

export default {
  name: "Unit",
  dicts: ['xiangtai_fengxiandanyuan', 'type_guanqudibiao', 'type_fengxiandanyuan'],
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
      // 风险单元表格数据
      unitList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        reskId: null,
        riskUnitName: null,
        tiskUnitType: null,
        unitVolume: null,
        unitVolumeBottom: null,
        chemicalChinese: null,
        chemicalCas: null,
        phaseState: null,
        concentration: null,
        containerTemperature: null,
        containerPa: null,
        storageOnlineQuantity: null,
        tankFarmArea: null,
        tankFarmHight: null,
        tankFarmSurfaceType: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询风险单元列表 */
    getList() {
      this.loading = true;
      listUnit(this.queryParams).then(response => {
        this.unitList = response.rows;
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
        reskId: null,
        riskUnitName: null,
        tiskUnitType: null,
        unitVolume: null,
        unitVolumeBottom: null,
        chemicalChinese: null,
        chemicalCas: null,
        phaseState: null,
        concentration: null,
        containerTemperature: null,
        containerPa: null,
        storageOnlineQuantity: null,
        tankFarmArea: null,
        tankFarmHight: null,
        tankFarmSurfaceType: null
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
      this.title = "添加风险单元";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getUnit(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改风险单元";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateUnit(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUnit(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除风险单元编号为"' + ids + '"的数据项？').then(function() {
        return delUnit(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yuanqu/unit/export', {
        ...this.queryParams
      }, `unit_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
