<template>
  <div class="handle-menu-dialog">
    <el-dialog v-model="dialogVisible" :title="props.title === 'Edit'?'Edit':'Add'" :before-close="handleClose">
      <el-form ref="dialogForm" :model="deptForm" label-width="140px" :rules="rules">
        <el-form-item label="DeptBefore" prop="parentId">
          <el-cascader :options="deptLists" :props="{checkStrictly: true, label:'deptName', value:'_id'}" clearable
            placeholder="Please Option DeptBefore" v-model="deptForm.parentId"></el-cascader>
        </el-form-item>
        <el-form-item label="DeptName" prop="deptName">
          <el-input placeholder="Please Option DeptName" v-model="deptForm.deptName"></el-input>
        </el-form-item>
        <el-form-item label="DeptUser" prop="user">
          <el-select placeholder="Please Option DeptUser" v-model="deptForm.user" @change="handleUser">
            <el-option v-for="item in userList" :key="item.userId"
              :value="`${item.userId}/${item.userName}/${item.userEmail}`" :label="item.userName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="UserEmail" prop="userEmail">
          <el-input placeholder="Please Option UserEmail" v-model="deptForm.userEmail" disabled></el-input>
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
  name: "HandleMenuDialog"
});

const { proxy } = getCurrentInstance();
// props
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  editeDept: {
    type: Object,
    default: () => { }
  },

  deptLists: {
    type: Array,
    default: () => []
  },
});
const emit = defineEmits(["refreshList"]);

const menuList = ref([]);
const userList = ref([]);
const getMenuList = await proxy.$api.menuList();
menuList.value = getMenuList;

const UserAllList = await proxy.$api.userAllList();
userList.value = UserAllList;

// control dialog  isShow
const dialogVisible = ref(false);

let deptForm = reactive({
  parentId: [null],
  deptName: null,
  user: null,
  userEmail: null,
  userId: null,
  userName: null
});
// define form rule
const rules = reactive({
  parentId: [
    {
      required: true,
      message: "Please Option DeptBefore",
      trigger: "blur",
    },
  ],
  deptName: [
    {
      required: true,
      message: "Please Option DeptName",
      trigger: "blur",
    },
  ],
  user: [
    {
      required: true,
      message: "Please Option DeptUser",
      trigger: "blur",
    },
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
      const data = { ...deptForm };
      const action = {
        "Add": "create",
        "Edit": "edit"
      };
      data.action = action[props.title];
      await proxy.$api.submitDeptInfo(data);
      emit("refreshList")
      handleClose();
      ElMessage({
        message: 'Success!',
        type: 'success',
      });
    }
  })
  // dialogVisible.value = false;
};

const handleUser = (val) => {
  const [userId, userName, userEmail] = val.split("/");
  deptForm.userId = userId;
  deptForm.userName = userName;
  deptForm.userEmail = userEmail;
}

watch(dialogVisible, (newV, oldV) => {
  proxy.$nextTick(() => {
    if (props.title === "Edit" && newV) {
      deptForm = Object.assign(deptForm, props.editeDept);
      // deptForm.menuState = Number(deptForm.menuState);
      // deptForm.menuType = Number(deptForm.menuType);
    };
  });
});

// expose data to parent 
defineExpose({ dialogVisible });
</script>

<style lang="scss" scoped>
</style>