<script setup lang="ts">
import {ArrowDown, Upload, Plus, CloseBold, Refresh} from '@element-plus/icons-vue'
import {computed, onMounted, reactive, ref, toRaw,} from "vue";
import {ElMessage, ElMessageBox, type TableColumnCtx} from "element-plus";
import * as XLSX from 'xlsx';
import {isEqual} from 'lodash';
import {PageQuery, UploadEntry} from "@/types/vortexa-type-common.ts";
import {PAGINATION_PAGE_SIZES} from "@/config/vortexa-config.ts";
import VortexaIcon from "@/components/vortexa-icon.vue";

const emit = defineEmits(['page-query', 'update-data', 'delete-data'])

interface Props {
  headers: string[],
  idField: string,
  data: object[]
}

const props = defineProps<Props>();

// 是否更新状态
const isCanUpdate = ref(false)
// 更新数据
const tableUploadData = ref([])

// 表显示的全字段
const tableFieldList = computed(() => {
  return Array.from(new Set([...props.headers, ...selectFieldList.value, ...appendFieldList.value]))
})

// 新增的一行数据
const isInAddLine = ref(false)
const newRawData = ref({})

// 表展示的全数据
const tableDataList = computed(() => {
  const list = []
  if (isInAddLine.value) {
    list.push(newRawData.value)
  }
  if (isCanUpdate.value) {
    list.push(...tableUploadData.value)
  } else {
    list.push(...props.data)
  }
  return list;
})

// 选择展示的额外字段列表
const selectFieldList = ref([])

const newFieldDialogVisible = ref(false)
const newFieldValue = ref(null)
const appendFieldList = ref([])

// 额外字段列表
const extraFieldList = computed(() => {
  const extraField = new Set<string>()
  tableDataList.value.forEach(item => {
    const keys: string[] = Object.keys(item);
    keys.forEach(key => extraField.add(key))
  })
  props.headers.forEach(key => {
    extraField.delete(key)
  })
  return [...extraField]
})

// 获取field字段下所有值
function getFieldValueList(field): Array<{ text: string, value: string }> {
  if (tableDataList.value.length > 0) {
    const unique = [...new Set(tableDataList.value.map(item => item[field]))]
    return unique.map(obj => {
      return {text: obj, value: obj}
    })
  }
  return []
}

// 列过滤
const filterHandler = (
  value: string,
  row: object,
  column: TableColumnCtx<object>
) => {
  const property = column['property']
  return row[property] === value
}

// 分页参数
const pageQuery = reactive(new PageQuery({
  page: 1,
  limit: PAGINATION_PAGE_SIZES[0],
  filterMap: new Map()
}))
const pageTotal = ref(0)

// 分页查询表数据
const pageQueryTableData = () => {
  emit('page-query', toRaw(pageQuery))
}

const pageChangeHandler = () => {
  pageQueryTableData()
}

// 定义方法
function updatePageInfo(total) {
  pageTotal.value = total
}


// 选择的行
const multipleSelection = ref([])

// 选择行改变处理
function handleSelectionChange(lineData) {
  multipleSelection.value = lineData
}

// editable table
const editState = ref({
  row: -1,
  raw: {}
})

// 新增列
const newFieldHandler = () => {
  if (newFieldValue.value != ''
    && props.headers.indexOf(newFieldValue.value) == -1
    && extraFieldList.value.indexOf(newFieldValue.value) == -1
  ) {
    appendFieldList.value.push(newFieldValue.value)
    newFieldDialogVisible.value = false
  } else {
    ElMessage({
      type: 'warning',
      message: 'Field exist',
    })
  }
}

// 更新单行
function handleUpdateRaw(raw) {
  if (!isEqual(raw, editState.value.raw)) {
    emit('update-data', new UploadEntry([raw]))
  }
  editState.value.row = -1
  editState.value.raw = {}
}

// upload
const handleBeforeUpload = (file) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, {type: 'array'});

      // 假设读取第一个 Sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // 解析成数组
      const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 0});

      if (jsonData.length > 0) {
        tableUploadData.value = jsonData
        isCanUpdate.value = true
        const selected = []
        Object.keys(jsonData[0]).forEach(key => {
          key = key.trim()
          if (selected.indexOf(key) == -1) {
            selected.push(key)
          }
        })
        selectFieldList.value = selected
      } else {
        ElMessage.warning('文件不含数据')
      }
    } catch (error) {
      ElMessage.error('文件解析失败', error);
    }
  };

  reader.readAsArrayBuffer(file);
  return false; // 阻止自动上传
};

const updateDataHandler = () => {
  ElMessageBox.confirm(
    'confirm upload data?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      emit('update-data', new UploadEntry(tableUploadData.value))
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'upload canceled',
      })
    })
}

//delete
const handleDelete = () => {
  ElMessageBox.confirm(
    'confirm delete data?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      if (isCanUpdate.value) {
        for (const selected of multipleSelection.value) {
          const index = tableUploadData.value.indexOf(selected);
          tableUploadData.value.splice(index, 1)
        }
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
      } else {
        const ids = multipleSelection.value.map(item => item[props.idField])
        emit('delete-data', {ids: ids})
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

// 根据表头和内容自适应宽度
const getColumnWidth = (col) => {
  const fontSize = 14; // 字体大小
  const padding = 20; // 表格左右边距
  let width = col.length * fontSize + padding;
  width = Math.max(width, 120)
  return width + 'px';
};

const reload = () => {
  tableUploadData.value = []
  pageQuery.page = 1
  pageQuery.limit = PAGINATION_PAGE_SIZES[0]
  pageTotal.value = 0
  selectFieldList.value = []
  editState.value.raw = {}
  editState.value.row = -1
  multipleSelection.value = []
  isCanUpdate.value = false
  isInAddLine.value = false
  newRawData.value = {}

  pageQueryTableData()
}

onMounted(() => {
  pageQueryTableData()
})

defineExpose({updatePageInfo, reload})
</script>

<template>
  <div class="dynamic-add-field-table">
    <div class="select-bar-list">
      <el-dropdown trigger="click" :hide-on-click="false">
        <el-button>
          <el-icon class="el-icon--left">
            <arrow-down/>
          </el-icon>
          Field
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in headers" :key="item">
              <el-checkbox :value="item" disabled>{{ item }}</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item v-for="item in extraFieldList" :key="item">
              <el-checkbox-group v-model="selectFieldList">
                <el-checkbox :value="item">{{ item }}</el-checkbox>
              </el-checkbox-group>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-upload
        v-if="!isCanUpdate"
        class="upload-demo"
        action=""
        :auto-upload="true"
        :before-upload="handleBeforeUpload"
        accept=".xlsx"
      >
        <template #trigger>
          <el-button class="button-morandi">
            <VortexaIcon name="excel" size="14"/>
            Select File
          </el-button>
        </template>
      </el-upload>
      <div v-if="isCanUpdate">
        <el-button
          type="info"
          @click="isCanUpdate = false"
          :disabled="tableUploadData.length < 1"
        >
          <el-icon>
            <CloseBold/>
          </el-icon>
          Cancel
        </el-button>
        <el-button
          style="margin-left: 0"
          type="success"
          @click="updateDataHandler"
          :disabled="tableUploadData.length < 1"
        >
          <el-icon class="el-icon--right">
            <Upload/>
          </el-icon>
          Upload
        </el-button>
      </div>

      <el-button
        class="button-gray"
        @click="isInAddLine = true"
      >
        <el-icon>
          <Plus/>
        </el-icon>
        Add One
      </el-button>

      <div style="flex: 1">
        <slot name="toolbar"></slot>
      </div>

      <span style="font-weight: 700">Total:{{ pageTotal }}</span>
    </div>

    <div class="add-field-table">
      <el-table ref="tableRef"
                :data="tableDataList"
                :height="600"
                highlight-current-row
                stripe
                size="large"
                table-layout="fixed"
                @selection-change="handleSelectionChange"
                style="width: 100%"
      >
        <el-table-column type="selection" width="55"/>

        <el-table-column
          v-for="item in tableFieldList"
          :key="item"
          :prop="item"
          :label="item"
          show-overflow-tooltip
          :filters="getFieldValueList(item)"
          :filter-method="filterHandler"
          :min-width="getColumnWidth(item)"
        >
          <template #default="scope">
            <el-input
              v-if="editState.row==scope.$index"
              v-model="scope.row[item]"
              size="small"
            />
            <div v-else>
              {{ scope.row[item] }}
            </div>
          </template>
        </el-table-column>

        <el-table-column fixed="right" width="120">
          <template #header>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete"
              v-if="multipleSelection.length > 0"
            >
              Delete
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="newFieldDialogVisible = true"
              v-else
            >
              <el-icon>
                <Plus/>
              </el-icon>
            </el-button>
            <el-button
              size="small"
              type="info"
              @click="pageQueryTableData"
            >
              <el-icon>
                <Refresh/>
              </el-icon>
            </el-button>
          </template>

          <template #default="scope">
            <el-button
              v-if="editState.row==scope.$index"
              size="small"
              type="success"
              @click="handleUpdateRaw(scope.row)">
              Save
            </el-button>
            <el-button v-else size="small"
                       type="info"
                       @click="editState.row=scope.$index;editState.raw=JSON.parse(JSON.stringify(scope.row))">
              Edit
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        style="margin-top: 8px; float: right; margin-right: 20px"
        v-model:current-page="pageQuery.page"
        v-model:page-size="pageQuery.limit"
        :page-sizes="PAGINATION_PAGE_SIZES"
        :background="false"
        layout="sizes, prev, pager, next, jumper"
        :total="pageTotal"
        @size-change="pageChangeHandler"
        @current-change="pageChangeHandler"
      />
    </div>
  </div>


  <el-dialog
    v-model="newFieldDialogVisible"
    title="New Data Field"
    width="420"
    align-center
  >
    <el-input v-model="newFieldValue" autocomplete="off" placeholder="Enter new field name"/>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="newFieldDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="newFieldHandler">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.dynamic-add-field-table {
}

.select-bar-list {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.add-field-table {
  position: relative;
  height: 600px;
  background-color: #fff;
  border-radius: 10px;
}

.add-field-table > .el-table {
  position: absolute;
}


:deep(.el-table, .el-table__expanded-cell) {
  padding: 20px !important;
  background-color: transparent !important;
}

:deep(.el-table th) {
  background-color: transparent !important;
  border-bottom: 1px solid rgba(100, 100, 100, 0.3) !important;
}

:deep(.el-table tr) {
  background-color: transparent !important;
}

:deep(.el-table--enable-row-transition .el-table__body td),
:deep(.el-table .cell) {
  //background-color: transparent !important;
  border: none !important;
}

:deep(.select-bar-list .el-button:hover) {
  background-color: azure !important;
}

:deep(.select-bar-list .el-button:active) {
  background-color: azure !important;
}

:deep(.el-table .el-table__cell) {
  padding: 0 !important;
  height: 30px;
}

:deep(.el-table .el-input__inner ) {
  height: 30px;
  font-size: 16px;
}

</style>
