<template>
  <div class="role-manger">
    <div class="query-form">
      <el-form :model="roleFrom" inline>
        <el-form-item label="RoleName">
          <el-input v-model="roleFrom.roleName" placeholder="Please Input RoleName" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">Search</el-button>
          <el-button @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleEditOrAdd('add')" v-permission="'role-create'">Create</el-button>
      </div>
      <el-table :data="tableData" stripe>
        <el-table-column v-for="item in columns" :key="item.label" :label="item.label" :prop="item.prop"
          :formatter="item.formatter">
        </el-table-column>
        <el-table-column label="Operation" width="260px">
          <template #default="scope">
            <el-button size="small" @click="handleEditOrAdd(scope.$index, scope.row)" v-permission="'role-edit'">Edit
            </el-button>
            <el-button size="small" type="primary" @click="setPermission(scope.row)"
              v-permission="'role-setPermission'">SetPermission</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
              v-permission="'role-delete'">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="base-pagination">
        <el-pagination class="pagination" small background @current-change="handleCurrentChange"
          layout="prev, pager, next" :total="total" />
      </div>
    </div>
    <HandleRoleDialog @refreshList="refreshList" :editeRole="editeRole" ref="handleRoleDialog" :title="title">
    </HandleRoleDialog>
    <HandlePermission @refreshList="refreshList" ref="handlePermission" :treeShowData="treeData"></HandlePermission>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"
import formatTime from '@/utils/data.js'
import HandleRoleDialog from './HandleRoleDialog.vue'
import HandlePermission from './HandlePermission.vue'

defineOptions({
  name: 'RoleManger',
});
// get Vue proxy
const { proxy } = getCurrentInstance();
// search all data
const { roleName, pageNum, pageSize } = toRefs(reactive({
  roleName: null,			// 0:所有 1：在职 2：离职 3：试用期
  pageNum: 1, 		// 当前页码
  pageSize: 10 // 每页条数，默认10
}));
// search data
let roleFrom = reactive({ roleName });
// table data
let tableData = ref([]);
// pagination data
let { total } = toRefs(reactive({ total: 0 })); //const  total = ref(0);
let editeRole = ref({});
let treeData = ref({});
// table-colums data
const menuList = await proxy.$api.menuList({});
const menuListMap = () => {
  const obj = {};
  const deep = (data) => {
    data.map(item => {
      if (item.children && item.children.length > 0) {
        if (item.parentId.length == 1 && item.parentId[0] != null) {
          obj[item._id] = item.menuName;
        };
        deep(item.children, obj);
      };
    });
  };
  deep(menuList);
  return obj;
};

const columns = reactive([
  {
    label: "RoleName",
    prop: "roleName",
  },
  {
    label: "Remark",
    prop: "remark",
  },
  {
    label: "PermissionList",
    prop: "permissionList",
    formatter: (row, column, value) => {
      const halfCheckedKeys = value.halfCheckedKeys;
      const content = [];
      const mapObj = menuListMap();
      halfCheckedKeys.map(item => {
        if (mapObj[item]) content.push(mapObj[item]);
      });
      return content.join('、');
    }
  },

  {
    label: "UpdateTime",
    prop: "updateTime",
    formatter: (row, column, value) => {
      return formatTime(value);
    },
  },
  {
    label: "CreateTime",
    prop: "createTime",
    formatter: (row, column, value) => {
      return formatTime(value);
    },
  },
]);
//title of add and edite 
const title = ref("");

// role list
const getRoleList = async () => {
  const { list, page } = await proxy.$api.getRoleList({
    roleName: roleName.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value
  });
  tableData.value = list;
  total.value = page.total;
}
// tabledata：initialzation、search
getRoleList();

// search method
const search = () => {
  getRoleList();
};
// reset from method
const reset = () => {
  roleFrom.roleName = null;
  getRoleList();
};
// edite and add user method
const handleEditOrAdd = (index, row) => {
  if (index === "add") {
    title.value = "Add";
    proxy.$nextTick(() => {
      proxy.$refs.handleRoleDialog.dialogVisible = true;
    });
  } else {
    title.value = "Edit";
    proxy.$nextTick(() => {
      proxy.$refs.handleRoleDialog.dialogVisible = true;
      editeRole.value = row;
    });

  }
};

let multipleSelection = [];
// delete and multiple delete user  method
const handleDelete = async (index, row) => {
  console.log(row);
  await proxy.$api.submitRoleInfo({ _id: row._id, action: "delete" });
  getRoleList();
  ElMessage({
    message: 'OK !',
    type: 'success',
  });
};
// table mutilation select method
const handleSelectionChange = (val) => {
  multipleSelection = val;
};
// page change method
const handleCurrentChange = (val) => {
  pageSize.value = val;
  getRoleList();
};
const setPermission = (row) => {
  proxy.$nextTick(() => {
    treeData.value = row;
    proxy.$refs.handlePermission.dialogVisible = true;
  });
}
const refreshList = () => {
  getRoleList();
}
</script>

<style lang="scss">
</style>