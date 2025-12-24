<template>
  <div class="Handle-apply-dialog">
    <el-dialog v-model="dialogVisible" title="ApplyDtail" :before-close="handleClose">
      <el-steps :active="detail.applyState > 2 ? 3 : detail.applyState" align-center>
        <el-step title="ApprovalPending"></el-step>
        <el-step title="InApproval"></el-step>
        <el-step title="ApprovalApprove/ApprovalRejected"></el-step>
      </el-steps>
      <el-form ref="dialogForm" :model="detail">
        <el-form-item label="ApplyType：">
          <div>{{ detail.applyTypeName }}</div>
        </el-form-item>
        <el-form-item label="Time：">
          <div>{{ detail.time }}</div>
        </el-form-item>
        <el-form-item label="LeaveTime：">
          <div>{{ detail.leaveTime }}</div>
        </el-form-item>
        <el-form-item label="Reasons：">
          <el-input type="textarea" :row="2" placeholder="请输入休假原因" v-model=" detail.reasons" />
        </el-form-item>
        <el-form-item label="ApprovalState：">
          <div>{{ detail.applyStateName }}</div>
        </el-form-item>
        <el-form-item label="CurrentAuditUserName：">
          <div>{{ detail.curAuditUserName }}</div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose" size="small">Close</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"
import { watch } from "vue";
import moment from 'moment'
defineOptions({
  name: "ScanApplyDialog"
});
// props
const props = defineProps({
  detail: {
    type: Object,
    default: () => { }
  }
});
const { proxy } = getCurrentInstance();

const emit = defineEmits(["refreshList"]);

// control dialog  isShow
const dialogVisible = ref(false);
// define form rule
const rules = reactive({
});


//  close dialog
const handleClose = () => {
  proxy.$refs.dialogForm.resetFields();
  dialogVisible.value = false;
};

// expose data to parent 
defineExpose({ dialogVisible });
</script>

<style lang="scss" scoped>
</style>