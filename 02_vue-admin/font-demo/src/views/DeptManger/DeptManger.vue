<template>
  <div class="dept-manger">
    <div class="query-form">
      <el-form :model="deptFrom" inline>
        <el-form-item label="DeptName">
          <el-input v-model="deptFrom.deptName" placeholder="Please Input DeptName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">Search</el-button>
          <el-button @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleEditOrAdd()" v-permission="'dept-create'">Create</el-button>
      </div>
      <el-table :data="tableData" stripe row-key="_id">
        <el-table-column v-for="item in columns" :width="item.width" :key="item.label" :label="item.label"
          :prop="item.prop" :formatter="item.formatter">
        </el-table-column>
        <el-table-column label="Operation" width="200px">
          <template #default="scope">
            <el-button size="small" @click="handleEditOrAdd(scope.$index, scope.row)" v-permission="'dept-edit'"
              v-if="scope.row.deptName!=='SG' && scope.row.deptName!=='FH'">
              Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
              v-permission="'dept-delete'" v-if="scope.row.deptName!='SG' && scope.row.deptName!='FH'">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <HandleDeptDialog @refreshList="refreshList" :deptLists="tableData" :editeDept="editeDept" ref="handleDeptDialog"
      :title="title">
    </HandleDeptDialog>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"
import formatTime from '@/utils/data.js'
import HandleDeptDialog from './HandleDeptDialog.vue'

defineOptions({
  name: 'DeptManger',
});
// get Vue proxy
const { proxy } = getCurrentInstance();
// search all data
const { deptName, pageNum, pageSize } = toRefs(reactive({
  deptName: null,
  pageNum: 1, 		// 当前页码
  pageSize: 10 // 每页条数，默认10
}));
// search data
let deptFrom = reactive({ deptName });
// table data
let tableData = ref([]);
// pagination data
let editeDept = ref({});
// table-colums data
const columns = reactive([
  {
    label: "DeptName",
    prop: "deptName",
  },
  {
    label: "UserName",
    prop: "userName",
  },
  {
    label: "UpdateTime",
    prop: "updateTime",
    formatter (row, column, value) {
      return formatTime(value);
    },
  },
  {
    label: "CreateTime",
    prop: "createTime",
    formatter (row, column, value) {
      return formatTime(value);
    },
  },
],
);
//title of add and edite 
const title = ref("")

const getDeptList = async () => {
  const getDeptList = await proxy.$api.depList(
    {
      deptName: deptName.value,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    }
  );
  tableData.value = getDeptList;
}
// tabledata：initialzation、search
getDeptList();

// search method
const search = () => {
  getDeptList();
};
// reset from method
const reset = () => {
  deptFrom.deptName = null;
  getDeptList();
};
// edite and add user method
const AddMenu = reactive({});
const handleEditOrAdd = (index, row) => {
  if (row) {
    title.value = "Edit";
    proxy.$nextTick(() => {
      editeDept.value = row;
    });
  } else {
    title.value = "Add";
  };
  proxy.$nextTick(() => {
    proxy.$refs.handleDeptDialog.dialogVisible = true;
  });
};

let multipleSelection = [];
// delete and multiple delete user  method
const handleDelete = async (index, row) => {
  await proxy.$api.submitDeptInfo({ action: "delete", _id: row._id });
  getDeptList();
  ElMessage({
    message: 'OK !',
    type: 'success',
  });
};


const refreshList = () => {
  getDeptList();
}
</script>


<style lang="scss" scoped>
</style>