<template>
  <div class="Handle-apply-dialog">
    <el-dialog v-model="dialogVisible" title="Check" :before-close="handleClose">
      <el-form ref="dialogForm" :model="detail" label-width="160px">
        <el-form-item label="ApplyName：">
          <div>{{ detail.applyName }}</div>
        </el-form-item>
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
          <el-input type="textarea" :row="2" v-model=" detail.reasons" />
        </el-form-item>
        <el-form-item label="ApprovalState：">
          <div>{{ detail.applyStateName }}</div>
        </el-form-item>
        <el-form-item label="CurrentAuditName：">
          <div>{{ detail.curAuditUserName }}</div>
        </el-form-item>
        <el-form-item label="Remark:" required prop="remark">
          <el-input type="textarea" :row="2" placeholder="Please Input Remark" v-model=" detail.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleSubmit('Checked')" size="small" type="primary">Checked</el-button>
          <el-button @click="handleSubmit('Cancel')" size="small">Cancel</el-button>
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
  name: "CheckDialog"
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

const handleSubmit = async (type) => {
  proxy.$refs.dialogForm.validate(async (val) => {
    if (val) {
      let data = {
        _id: props.detail._id,
        remark: props.detail.remark
      };
      if (type === "Checked") {
        data.action = "";
      } else {
        data.action = "refuse";
      };
      try {
        await proxy.$api.CheckLeaveList(data);
        emit("refreshList")
        handleClose();
        ElMessage({
          message: 'Success!',
          type: 'success',
        });
      } catch (error) {
        console.log("🚀 ~ file: CheckDialog.vue ~ line 81 ~ handleSubmit ~ error", error)
      }
    }
  })


}

// expose data to parent 
defineExpose({ dialogVisible });
</script>

<style lang="scss" scoped>
</style>