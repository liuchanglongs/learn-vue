<template>
  <div class="welcome">
    <h5>组件双向绑定：{{namess}}</h5>
    <ll v-model:name="namess"></ll>
    <h5>自定义组件表单：</h5>
    <LFrom :formData="formData" :formConfig="formConfig" @submitForm="submitForm"></LFrom>
    <h5>自定义组件table：</h5>
    <Ltable :tableColumns="tableColumns" :tableData="tableData" :paginationData="paginationData"
      @currentPage="submitForm">
      <template #opration="{ row }">
        <el-button size="small" @click="handleEditOrAdd(row)" v-permission="'user-edit'">Edit
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)" v-permission="'user-delete'">Delete</el-button>
      </template>
    </Ltable>
  </div>
</template>

<script setup>
import ll from '../components/publicComponents/LFrom/components/Ll.vue'
const { proxy } = getCurrentInstance();
import formatTime from '@/utils/data.js'

const namess = ref("123123");

const formData = reactive({
  userId: null,
  userName: null,
  state: null,
  pageNum: 1,
  pageSize: 10
});
const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100
})
const formConfig = reactive([
  {
    type: "input",
    label: "UserID",
    prop: "userId",
    model: "userId",
    placeholder: "please input userId",
  },
  {
    type: "input",
    label: "Name",
    prop: "userName",
    model: "userName",
    placeholder: "Please Input Name",
  },
  {
    type: "select",
    options: [
      {
        label: "All",
        value: "0",
      },
      {
        label: "Job",
        value: "1",
      },
      {
        label: "Quit",
        value: "2",
      },
      {
        label: "Probation",
        value: "3",
      }
    ],
    label: "State",
    prop: "state",
    model: "state",
    placeholder: "please option state",
  },
]);
const tableColumns = [
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
  {
    slotName: "opration",
    label: "Opration"
  }
];
const tableData = ref([]);

const getTableList = async (val) => {
  const data = val || { ...formData }
  const { list, page } = await proxy.$api.userList(data);
  tableData.value = list;
  paginationData.total = page.total;
}
// tabledata：initialzation、search
getTableList();

const submitForm = (val) => {
  const data = {
    userId: val.userId || formData.userId,
    userName: val.userName || formData.userName,
    state: val.state || formData.state,
    pageNum: val.pageNum || formData.pageNum,
    pageSize: val.pageSize || formData.pageSize,
  }
  getTableList({ ...data });
}

const handleDelete = (row) => {
  console.log(row.userId);
}
const handleEditOrAdd = (row) => {
  console.log(row);
}
</script>

<style lang="scss" scoped>
</style>