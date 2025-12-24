<template>
  <div class="Handle-apply-dialog">
    <el-dialog v-model="dialogVisible" title="Apply-For-leave" :before-close="handleClose">
      <el-form ref="dialogForm" :model="leaveForm" label-width="160px" :rules="rules">
        <el-form-item label="LeaveVacationType" prop="applyType" required>
          <el-select v-model="leaveForm.applyType" label="LeaveType" placeholder="please Option applyType">
            <el-option :value="1" label="VacationThing"></el-option>
            <el-option :value="2" label="TiaoXiu"></el-option>
            <el-option :value="3" label="winterVacation"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="LeaveVacationType">
          <el-row>
            <el-col :span="11">
              <el-form-item prop="startTime" required>
                <el-date-picker v-model="leaveForm.startTime" @change="optionTime('start')" type="date"
                  placeholder="Please Option Begin Time" />
              </el-form-item>
            </el-col>
            <el-col :span="1" style="text-align:center">
              —
            </el-col>
            <el-col :span="11">
              <el-form-item prop="endTime" required>
                <el-date-picker v-model="leaveForm.endTime" type="date" @change="optionTime('end')"
                  placeholder="Please Option End Time" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="LeaveTime">
          {{ leaveForm.leaveTime }}
        </el-form-item>
        <el-form-item label="Reason" prop="reasons" required>
          <el-input type="textarea" :row="3" placeholder="Please Input Reasons" v-model="leaveForm.reasons" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose" size="small">Cancel</el-button>
          <el-button type="primary" size="small" @click="handleSubmit">Determine</el-button>
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
  name: "HandleApplyDialog"
});

const { proxy } = getCurrentInstance();

const emit = defineEmits(["refreshList"]);

// control dialog  isShow
const dialogVisible = ref(false);
let leaveForm = reactive({
  applyType: null,
  leaveTime: 0 + "天",
  startTime: null,
  endTime: null,
  reasons: null,
});

// define form rule
const rules = reactive({
  startTime: [
    {
      type: "date",
      required: true,
      message: "Please Option StartTime",
      trigger: "change",
    },
  ],
  endTime: [
    {
      type: "date",
      required: true,
      message: "Please Option EndTime",
      trigger: "change",
    },
  ],
  reasons: [
    {
      required: true,
      message: "Please Input Reason",
      trigger: ["change", "blur"],
    },
  ],
});


//  close dialog
const handleClose = () => {
  proxy.$refs.dialogForm.resetFields();
  dialogVisible.value = false;
};

const optionTime = (value) => {
  let { startTime, endTime } = leaveForm
  let time1 = new Date(startTime).getTime();
  let time2 = new Date(endTime).getTime();
  let now = new Date(moment().startOf("day")._d).getTime();
  if (time1 < now && time1 != 0) {
    ElMessage({
      message: 'StartTime is not less than nowTime',
      type: 'warning',
    });
    leaveForm.startTime = null;
    leaveForm.endTime = null;
    leaveForm.leaveTime = 0 + "天";
    return;
  }
  if (time2 < now && time2 != 0) {
    ElMessage({
      message: 'EndTime is not less than nowTime',
      type: 'warning',
    });
    leaveForm.endTime = null;
    leaveForm.leaveTime = 0 + "天";
    return;
  }
  if (startTime == null || endTime == null) {
    return
  }

  if (time1 > time2 && time1 > 0 && time2 > 0) {
    ElMessage({
      message: 'StartTime must be less than endTime',
      type: 'warning',
    });
    if (value == "end") {
      leaveForm.endTime = null;
    } else {
      leaveForm.startTime = null;
      leaveForm.endTime = null;
    }
    leaveForm.leaveTime = 0 + "天";
  } else {
    leaveForm.leaveTime = Math.ceil((time2 - time1) / (24 * 60 * 60 * 1000)) + 1 + "天";
  }
}
// determine dialog
const handleSubmit = () => {
  proxy.$refs.dialogForm.validate(async (val) => {
    if (val) {
      try {
        await proxy.$api.leaveOperate({ ...leaveForm, action: "create" });
        emit("refreshList")
        handleClose();
        ElMessage({
          message: 'Success!',
          type: 'success',
        });
      } catch (error) {
        console.log(error);
      }
    }
  })
}


// expose data to parent 
defineExpose({ dialogVisible });
</script>

<style lang="scss" scoped>
</style>