<template>
  <div class="menu-manger">
    <div class="query-form">
      <el-form :model="userFrom" inline>
        <el-form-item label="MenuName">
          <el-input v-model="userFrom.menuName" placeholder="Please Input MenuName"></el-input>
        </el-form-item>
        <el-form-item label="MenuState">
          <el-select v-model="userFrom.menuState" placeholder="Please Option MenuState">
            <el-option :value="1" label="Use"></el-option>
            <el-option :value="2" label="Disable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">Search</el-button>
          <el-button @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleEditOrAdd('Add1')" v-permission="'menu-create'">Add</el-button>
      </div>
      <el-table :data="tableData" stripe row-key="_id">
        <el-table-column v-for="item in columns" :width="item.width" :key="item.label" :label="item.label"
          :prop="item.prop" :formatter="item.formatter">
        </el-table-column>
        <el-table-column label="Operation" width="200px">
          <template #default="scope">
            <el-button size="small" @click="handleEditOrAdd('Add', scope, scope.row)" v-permission="'menu-create'">Add
            </el-button>
            <el-button size="small" @click="handleEditOrAdd('Edit', scope.$index, scope.row)"
              v-permission="'menu-edite'">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
              v-permission="'menu-delete'">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <HandleMenuDialog @refreshList="refreshList" :AddMenu="AddMenu" :editeMenu="editeMenu" ref="handleUserDialog"
      :title="title">
    </HandleMenuDialog>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"
import formatTime from '@/utils/data.js'
import HandleMenuDialog from './HandleMenuDialog.vue'

defineOptions({
  name: 'UserManger',
});
// get Vue proxy
const { proxy } = getCurrentInstance();
// search all data
const { menuName, menuState, pageNum, pageSize } = toRefs(reactive({
  menuName: null,
  menuState: null,
  pageNum: 1, 		// 当前页码
  pageSize: 10 // 每页条数，默认10
}));
// search data
let userFrom = reactive({ menuName, menuState });
// table data
let tableData = ref([]);
// pagination data
let editeMenu = ref({});
// table-colums data
const columns = reactive([
  {
    label: "MenuName",
    prop: "menuName",
    width: "200px"
  },
  {
    label: "Icon",
    prop: "icon",
  },
  {
    label: "MenuType",
    prop: "menuType",
    formatter (row, column, value) {
      return {
        1: "Menu",
        2: "Button",
      }[value];
    },
  },
  {
    label: "PermissionId",
    prop: "menuCode",
  },
  {
    label: "RouteUrl",
    prop: "path",
  },
  {
    label: "ComponentUrl",
    prop: "component",
  },
  {
    label: "MenuState",
    prop: "menuState",
    width: 100,
    formatter (row, column, value) {
      return {
        1: "Use",
        2: "Disable",
      }[value];
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

const getMenuList = async () => {
  const getMenuList = await proxy.$api.menuList(
    {
      menuName: menuName.value,
      menuState: menuState.value,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    }
  );
  tableData.value = getMenuList;
}
// tabledata：initialzation、search
getMenuList();

// search method
const search = () => {
  getMenuList();
};
// reset from method
const reset = () => {
  userFrom.menuName = null;
  userFrom.menuState = null;
  getMenuList();
};
// edite and add user method
const AddMenu = reactive({});
const handleEditOrAdd = (type, index, row) => {
  if (type === "Edit" || type === "Add") {
    proxy.$nextTick(() => {
      editeMenu.value = row;
    });
  };
  title.value = type;
  proxy.$nextTick(() => {
    proxy.$refs.handleUserDialog.dialogVisible = true;
  });
};

let multipleSelection = [];
// delete and multiple delete user  method
const handleDelete = async (index, row) => {
  await proxy.$api.submitmenuInfo({ action: "delete", _id: row._id });
  getMenuList();
  ElMessage({
    message: 'OK !',
    type: 'success',
  });
};


const refreshList = () => {
  getMenuList();
}
</script>


<style lang="scss" scoped>
</style>