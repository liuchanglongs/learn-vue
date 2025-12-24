<template>
  <div class="handle-user-dialog">
    <el-dialog v-model="dialogVisible" :title="props.title" :before-close="handleClose">
      <el-form ref="dialogForm" :model="roleForm" label-width="120px" :rules="rules">
        <el-form-item label="RoleName" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="Please Input RoleName" />
        </el-form-item>
        <el-form-item label="Remark" prop="remark">
          <el-input v-model="roleForm.remark" placeholder="Please Input Remark">
          </el-input>
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

defineOptions({
  name: "HandleRoleDialog"
});

const { proxy } = getCurrentInstance();
// props
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  editeRole: {
    type: Object,
    default: () => { }
  }
});
const emit = defineEmits(["refreshList"]);

const depList = ref([]);
const roleList = ref([]);

// control dialog  isShow
const dialogVisible = ref(false);
let roleForm = reactive({
  roleName: null,
  remark: null,
});
let roleFormCopy = reactive({});
// define form rule
const rules = reactive({
  roleName: [
    {
      required: true,
      message: "Please Input RoleName",
    },
  ]
});


//  close dialog
const handleClose = () => {
  proxy.$refs.dialogForm.resetFields();
  dialogVisible.value = false;
};
// determine dialog
const handleSubmit = () => {
  proxy.$refs.dialogForm.validate(async (val) => {
    if (val) {
      const data = { ...roleForm };
      if (val) {
        if (props.title === "Add") {
          data.action = "create";
        } else {
          data.action = "edit";
          data._id = roleForm._id;
        }
        await proxy.$api.submitRoleInfo(data);
        emit("refreshList");
        ElMessage({
          message: 'Success!',
          type: 'success',
        });
        handleClose();
      }
    }
  })
}
// initial department list
const getDepList = await proxy.$api.depList();
depList.value = getDepList
// initial role list
const getRoleList = await proxy.$api.roleList();
roleList.value = getRoleList

watch(dialogVisible, (newV, oldV) => {
  if (props.title === "Edit" && newV) {
    proxy.$nextTick(() => {
      roleForm = Object.assign(roleForm, props.editeRole);
    })
  };
})
// expose data to parent 
defineExpose({ dialogVisible });
</script>

<style lang="scss" scoped>
</style>