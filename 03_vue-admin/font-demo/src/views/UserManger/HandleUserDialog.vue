<template>
  <div class="handle-user-dialog">
    <el-dialog v-model="dialogVisible" :title="props.title" :before-close="handleClose">
      <el-form ref="dialogForm" :model="userForm" label-width="120px" :rules="rules">
        <el-form-item label="Name" prop="userName">
          <el-input v-model="userForm.userName" :disabled="props.title==='Edit'?true:false"
            placeholder="Please Input Name" />
        </el-form-item>
        <el-form-item label="Email" prop="userEmail">
          <el-input v-model="userForm.userEmail" :disabled="props.title==='Edit'?true:false"
            placeholder="Please Input Email">
            <template #append>@imooc.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Mobile" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="Please Input PhoneNumber" />
        </el-form-item>
        <el-form-item label="Jon" prop="job">
          <el-input v-model="userForm.job" placeholder="Please Input Position" />
        </el-form-item>
        <el-form-item label="State" prop="state">
          <el-select v-model="userForm.state" placeholder="Please Option State" style="width: 80%">
            <!-- <el-option label="All" value="0"></el-option> -->
            <el-option label="Job" value="1"></el-option>
            <el-option label="Quit" value="2"></el-option>
            <el-option label="Probation" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Role" prop="roleList">
          <el-select v-model="userForm.roleList" placeholder="Please Select System Role" multiple style="width: 80%">
            <el-option v-for="role in roleList" :key="role._id" :label="role.roleName" :value="role._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Department" prop="deptId">
          <el-cascader v-model="userForm.deptId" :options="depList"
            :props="{checkStrictly: true, label:'deptName', value:'_id'}" placeholder="Please Select System Department"
            clearable style="width: 80%" />
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
import { watch } from "vue-demi";

defineOptions({
  name: "HandleUserDialog"
});

const { proxy } = getCurrentInstance();
// props
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  editeUser: {
    type: Object,
    default: () => { }
  }
});
const emit = defineEmits(["refreshList"]);

const depList = ref([]);
const roleList = ref([]);

// control dialog  isShow
const dialogVisible = ref(false);
let userForm = reactive({
  userName: null,
  userEmail: null,
  mobile: null,
  job: null,
  state: null,
  roleList: null,
  deptId: null,
});
let userFormCopy = reactive({});
// define form rule
const rules = reactive({
  userName: [
    { required: true, message: "Please Input Name", trigger: "blur", },
  ],
  userEmail: [
    { required: true, message: "Please Input Email", trigger: "blur" },
  ],
  mobile: [{ pattern: /1[3-9]\d{9}/, message: "Please Input form of Mobile Number", trigger: "blur" },
  ],
  deptId: [{ required: true, message: "Please Option Department", trigger: "blur", },
  ],
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
      const data = { ...userForm };
      data.userEmail = data.userEmail + "@imooc.com";
      const action = {
        "Add": "add",
        "Edit": "edit"
      };
      data.action = action[props.title];
      const stateConfig = {
        "Job": "1",
        "Quit": "2",
        "Probation": "3"
      };
      data.state = stateConfig[data.state] || data.state;
      //默认普通用户
      data.role = 1;
      const res = await proxy.$api.submitUserInfo(data);
      if (res.state) {
        emit("refreshList")
        handleClose();
        ElMessage({
          message: 'Success!',
          type: 'success',
        });
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
      userForm = Object.assign(userForm, props.editeUser);
      const state = {
        "1": "Job",
        "2": "Quit",
        "3": "Probation"
      };
      userForm.state = state[userForm.state];
    })
  };
})
// expose data to parent 
defineExpose({ dialogVisible });
</script>

<style lang="scss" scoped>
</style>