<script setup lang="ts">
import {ArrowDown, Upload} from '@element-plus/icons-vue'
import {computed, ref,} from "vue";
import {ElMessage, ElMessageBox, type TableColumnCtx} from "element-plus";
import * as XLSX from 'xlsx';

const emit = defineEmits(['update-data', 'delete-data'])
import {isEqual} from 'lodash';

interface Props {
  headers: string[],
  idField: string,
  data: object[]
}

const props = defineProps<Props>();

const selectFieldList = ref([...props.headers])
const isCanUpdate = ref(false)
const tableUploadData = ref([])
const tableDataList = computed(() => {
  if (isCanUpdate.value) {
    return tableUploadData.value
  } else {
    return props.data
  }
})

const extraFieldList = computed(() => {
  if (tableDataList.value.length > 0) {
    const keys: string[] = Object.keys(tableDataList.value[0]);
    return keys.filter(key => props.headers.indexOf(key) === -1)
  }
  return []
})


function getFieldValueList(field): Array<{ text: string, value: string }> {
  if (tableDataList.value.length > 0) {
    const unique = [...new Set(tableDataList.value.map(item => item[field]))]
    return unique.map(obj => {
      return {text: obj, value: obj}
    })
  }
  return []
}

const filterHandler = (
  value: string,
  row: object,
  column: TableColumnCtx<object>
) => {
  const property = column['property']
  return row[property] === value
}


const multipleSelection = ref([])

function handleSelectionChange(lineData) {
  multipleSelection.value = lineData
}


// editable table
const editState = ref({
  row: -1,
  raw: {}
})

function handleUpdateRaw(raw) {
  console.log(raw)
  console.log(editState.value.raw)
  if (!isEqual(raw, editState.value.raw)) {
    emit('update-data', {raw: raw})
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
        selectFieldList.value = [...props.headers, ...Object.keys(jsonData[0])]
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
      emit('delete-data', {dataList: tableUploadData.value})
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

</script>

<template>
  <div class="dynamic-add-field-table">
    <div class="select-bar-list">
      <el-dropdown trigger="click">
        <el-button>
          <el-icon class="el-icon--left">
            <arrow-down/>
          </el-icon>
          Field
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in headers" :key="item">
              <el-checkbox :label="item" disabled/>
            </el-dropdown-item>
            <el-dropdown-item v-for="item in extraFieldList" :key="item">
              <el-checkbox-group v-model="selectFieldList">
                <el-checkbox :label="item"/>
              </el-checkbox-group>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-upload
        class="upload-demo"
        action=""
        :auto-upload="true"
        :before-upload="handleBeforeUpload"
        accept=".xlsx"
      >
        <template #trigger>
          <el-button>select file</el-button>
        </template>
        <el-button v-if="isCanUpdate" type="success" @click="updateDataHandler">
          Upload
          <el-icon class="el-icon--right">
            <Upload/>
          </el-icon>
        </el-button>
      </el-upload>

      <slot name="toolbar"></slot>
    </div>

    <div class="add-field-table">
      <el-table ref="tableRef"
                :data="tableDataList"
                :height="600"
                highlight-current-row
                stripe
                size="large"
                @selection-change="handleSelectionChange"
                style="width: 100%"
      >
        <el-table-column type="selection" width="55"/>

        <el-table-column
          v-for="item in selectFieldList"
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

        <el-table-column fixed="right" width="180">
          <template #header>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete"
              v-if="multipleSelection.length > 0"
            >
              Delete
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
                       @click="editState.row=scope.$index;editState.raw=JSON.parse(JSON.stringify(scope.row))">
              Edit
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
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
