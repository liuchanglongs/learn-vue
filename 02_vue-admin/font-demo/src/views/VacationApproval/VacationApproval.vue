<template>
  <div class="vacation-approval">
    <div class="query-form">
      <el-form :model="queryForm" inline>
        <el-form-item label="applyState">
          <el-select v-model="queryForm.applyState" placeholder="please Option applyState">
            <el-option value="" label="All"></el-option>
            <el-option :value="1" label="ApprovalPending"></el-option>
            <el-option :value="2" label="InApproval"></el-option>
            <el-option :value="3" label="ApprovalRejected"></el-option>
            <el-option :value="4" label="ApprovalApprove"></el-option>
            <el-option :value="5" label="Cancel"></el-option>
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
        <el-button type="primary" @click="handleApplys" v-permission="'leave-create'">HandleApply
        </el-button>
      </div>
      <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column v-for="item in columns" :key="item.label" :label="item.label" :prop="item.prop"
          :formatter="item.formatter" :width="item.width">
        </el-table-column>
        <el-table-column label="Operation" width="160px">
          <template #default="scope">
            <el-button size="small" @click="handleDetail(scope.row)">Look</el-button>
            <el-button size="small" type="danger" v-if="[1,2].includes(scope.row.applyState)"
              @click="handleDelete(scope.row)">Cancel</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="base-pagination">
        <el-pagination class="pagination" small background @current-change="handleCurrentChange"
          layout="prev, pager, next" :total="total" />
      </div>
    </div>
    <HandleApply @refreshList="refreshList" ref="handleApply">
    </HandleApply>
    <ScanApplyDialog ref="scanApplyDialog" :detail="currentData"></ScanApplyDialog>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"
import formatTime from '@/utils/data.js'
import HandleApply from './HandleApplyDialog.vue'
import ScanApplyDialog from './ScanApplyDialog.vue'

defineOptions({
  name: 'VacationApproval',
});
// get Vue proxy
const { proxy } = getCurrentInstance();
// search all data
const { applyState, pageNum, pageSize } = toRefs(reactive({
  applyState: 1,
  pageNum: 1, 		// 当前页码
  pageSize: 10 // 每页条数，默认10
}));
// search data
let queryForm = reactive({ applyState });
// table data
let tableData = ref([]);
// pagination data
let { total } = toRefs(reactive({ total: 0 })); //const  total = ref(0);
let editeUser = ref({});
// table-colums data
const columns = reactive([
  {
    label: "orderId",
    prop: "orderNo",
  },
  {
    label: "Time",
    prop: "",
    formatter (row) {
      return (
        formatTime(row.startTime).split(" ")[0] +
        "-" +
        formatTime(row.endTime).split(" ")[0]
      );
    },
    width: "200px"
  },
  {
    label: "LeaveTime",
    prop: "leaveTime",

  },
  {
    label: "LeaveType",
    prop: "applyType",
    formatter: (row, column, value) => {
      return {
        1: "ThingOfAbsence",
        2: "TiaoXiu",
        3: "winterVacation",
      }[value];
    },
  },
  {
    label: "Reasons",
    prop: "reasons",
  },
  {
    label: "CreateTime",
    prop: "createTime",
    width: 180,
    formatter: (row, column, value) => {
      return formatTime(value);
    },
  },
  {
    label: "Approver",
    prop: "auditUsers",
  },
  {
    label: "CurrentApprover",
    prop: "curAuditUserName",
  },
  {
    label: "ApplyState",
    prop: "applyState",
    formatter: (row, column, value) => {
      // 1:待审批 2:审批中 3:审批拒绝 4:审批通过 5:作废
      return {
        1: "ApprovalPending",
        2: "InApproval",
        3: "ApprovalRejected",
        4: "ApprovalApprove",
        5: "Cancel",
      }[value];
    },
  },
]);
//title of add and edite 
const title = ref("")
const currentData = ref({});

const getUserList = async () => {
  const { list, page } = await proxy.$api.leaveList({
    applyState: applyState.value,
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
  queryForm.applyState = null;
  getUserList();
};


let multipleSelection = [];
// delete and multiple delete user  method
const handleDelete = async (row) => {
  try {
    await proxy.$api.leaveOperate({ _id: row._id, action: "delete" });
    getUserList();
    ElMessage({
      message: 'Success!',
      type: 'success',
    });
  } catch (error) {
    console.log("🚀 ~ file: VacationApproval.vue ~ line 176 ~ handleDelete ~ error", error)

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

const handleDetail = (row) => {
  const data = JSON.parse(JSON.stringify(row));
  data.applyTypeName = {
    1: "VacationThing",
    2: "TiaoXiu",
    3: "WinterVacation",
  }[data.applyType];

  // 1:待审批 2:审批中 3:审批拒绝 4:审批通过 5:作废
  data.applyStateName = {
    1: "ApprovalPending",
    2: "InApproval",
    3: "ApprovalReject",
    4: "ApprovalArrprve",
    5: "Cancel",
  }[data.applyState];
  data.time = formatTime(row.startTime).split(" ")[0] +
    "-" +
    formatTime(row.endTime).split(" ")[0]
  currentData.value = data;
  proxy.$nextTick(() => {
    proxy.$refs.scanApplyDialog.dialogVisible = true;
  });
}
const handleApplys = () => {
  proxy.$refs.handleApply.dialogVisible = true;
}
const refreshList = () => {
  getUserList();
}
</script>

<style lang="scss">
</style>