<template>
  <div class="user-manger">
    <div class="query-form">
      <el-form :model="userFrom" inline>
        <el-form-item label="UserID">
          <el-input v-model="userFrom.userId" placeholder="please input userId"></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="userFrom.userName" placeholder="Please Input Name"></el-input>
        </el-form-item>
        <el-form-item label="State">
          <el-select v-model="userFrom.state" placeholder="please option state">
            <el-option label="All" value="0"></el-option>
            <el-option label="Job" value="1"></el-option>
            <el-option label="Quit" value="2"></el-option>
            <el-option label="Probation" value="3"></el-option>
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
        <el-button type="primary" @click="handleEditOrAdd('add')" v-permission="'user-create'">Add</el-button>
        <el-button type="danger" @click="handleDelete('DeleteBatch')" v-permission="'user-batchDelete'">DeleteBatch
        </el-button>
      </div>
      <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="item in columns" :key="item.label" :label="item.label" :prop="item.prop"
          :formatter="item.formatter">
        </el-table-column>
        <el-table-column label="Operation">
          <template #default="scope">
            <el-button size="small" @click="handleEditOrAdd(scope.$index, scope.row)" v-permission="'user-edit'">Edit
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
              v-permission="'user-delete'">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="base-pagination">
        <el-pagination class="pagination" small background @current-change="handleCurrentChange"
          layout="prev, pager, next" :total="total" />
      </div>
    </div>
    <HandleUserDialog @refreshList="refreshList" :editeUser="editeUser" ref="handleUserDialog" :title="title">
    </HandleUserDialog>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"
import formatTime from '@/utils/data.js'
import HandleUserDialog from './HandleUserDialog.vue'

defineOptions({
  name: 'UserManger',
});
// get Vue proxy
const { proxy } = getCurrentInstance();
// search all data
const { userId, userName, state, pageNum, pageSize } = toRefs(reactive({
  userId: null,
  userName: null,
  state: null, 			// 0:所有 1：在职 2：离职 3：试用期
  pageNum: 1, 		// 当前页码
  pageSize: 10 // 每页条数，默认10
}));
// search data
let userFrom = reactive({ userId, userName, state });
// table data
let tableData = ref([]);
// pagination data
let { total } = toRefs(reactive({ total: 0 })); //const  total = ref(0);
let editeUser = ref({});
// table-colums data
const columns = reactive([
  {
    label: "UserId",
    prop: "userId",
  },
  {
    label: "UserName",
    prop: "userName",
  },
  {
    label: "UserEmail",
    prop: "userEmail",
  },
  {
    label: "Role",
    prop: "role",
    formatter: (row, column, value) => {
      return {
        0: "Admin",
        1: "CommonUser",
      }[value];
    },
  },
  {
    label: "State",
    prop: "state",
    formatter: (row, column, value) => {
      return {
        0: "All",
        1: "Job",
        2: "Quit",
        3: "Probation",
      }[value];
    },
  },
  {
    label: "RegisterTime",
    prop: "createTime",
    width: 180,
    formatter: (row, column, value) => {
      return formatTime(value);
    },
  },
  {
    label: "LastLoginTime",
    prop: "lastLoginTime",
    width: 180,
    formatter: (row, column, value) => {
      return formatTime(value);
    },
  },
]);
//title of add and edite 
const title = ref("")

const getUserList = async () => {
  const { list, page } = await proxy.$api.userList({
    userId: userId.value,
    userName: userName.value,
    state: state.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value
  });
  tableData.value = list;
  total.value = page.total;
}
// tabledata：initialzation、search
getUserList();

// search method
const search = () => {
  getUserList();
};
// reset from method
const reset = () => {
  userFrom.userId = null;
  userFrom.userName = null;
  userFrom.state = null;
  getUserList();
};
// edite and add user method
const handleEditOrAdd = (index, row) => {
  if (index === "add") {
    title.value = "Add";
    proxy.$nextTick(() => {
      proxy.$refs.handleUserDialog.dialogVisible = true;
    });
  } else {
    title.value = "Edit";
    proxy.$nextTick(() => {
      editeUser.value = row;
      proxy.$refs.handleUserDialog.dialogVisible = true;
    });
  }
};

let multipleSelection = [];
// delete and multiple delete user  method
const handleDelete = async (index, row) => {
  if (index === "DeleteBatch") {
    if (multipleSelection.length > 0) {
      let userIds = [];
      multipleSelection.map((v) => {
        userIds.push(v.userId)
      })
      const { state } = await proxy.$api.userDelete({ userIds });
      if (state) {
        userIds = [];
        getUserList();
        ElMessage({
          message: 'Success!',
          type: 'success',
        });
      };

    }
  } else {
    const { state } = await proxy.$api.userDelete({ userIds: [row.userId] });
    if (state) {
      getUserList();
      ElMessage({
        message: 'OK !',
        type: 'success',
      });
    };
  }
};
// table mutilation select method
const handleSelectionChange = (val) => {
  multipleSelection = val;
};
// page change method
const handleCurrentChange = (val) => {
  pageSize.value = val;
  getUserList();
}
const refreshList = () => {
  getUserList();
}
</script>

<style lang="scss">
</style>