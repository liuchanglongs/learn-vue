<template>
  <div class="handle-menu-dialog">
    <el-dialog v-model="dialogVisible" :title="props.title === 'Edit'?'Edit':'Add'" :before-close="handleClose">
      <el-form ref="dialogForm" :model="menuForm" label-width="140px" :rules="rules">
        <el-form-item label="ParentMenu" prop="parentId">
          <el-cascader v-model="menuForm.parentId" :options="menuList"
            :props="{checkStrictly: true, value:'_id',label:'menuName'}" placeholder="Please Select ParentMenu"
            clearable style="width: 80%" />
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>

        <el-form-item label="MeunType" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="MenuName" prop="menuName">
          <el-input v-model="menuForm.menuName" placeholder="Please Input MenuName">
          </el-input>
        </el-form-item>
        <el-form-item label="Icon" prop="icon" v-show="menuForm.menuType == 1">
          <el-input v-model="menuForm.icon" placeholder="Please Input IconName" />
        </el-form-item>
        <el-form-item label="RouterPath" prop="path" v-show="menuForm.menuType == 1">
          <el-input v-model="menuForm.path" placeholder="Please Input RouterPath" />
        </el-form-item>

        <el-form-item label="MenuCode" prop="menuCode" v-show="menuForm.menuType == 2">
          <el-input v-model="menuForm.menuCode" placeholder="Please Input 权限标识" />
        </el-form-item>
        <el-form-item label="ComponentPath" prop="component" v-show="menuForm.menuType == 1">
          <el-input v-model="menuForm.component" placeholder="Please Input ComponentPath" />
        </el-form-item>
        <el-form-item label="menuState" prop="menuState">
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :label="1">Use</el-radio>
            <el-radio :label="2">Disabled</el-radio>
          </el-radio-group>
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
  editeMenu: {
    type: Object,
    default: () => { }
  },

  AddMenu: {
    type: Object,
    default: () => { }
  },
});
const emit = defineEmits(["refreshList"]);

const menuList = ref([]);
const getMenuList = await proxy.$api.menuList();
menuList.value = getMenuList;

// control dialog  isShow
const dialogVisible = ref(false);

let menuForm = reactive({
  parentId: [null],
  menuType: 1,
  menuName: null,
  icon: null,
  path: null,
  menuCode: null,
  component: null,
  menuState: 1
});
// define form rule
const rules = reactive({
  menuName: [
    {
      required: true,
      message: "Please Option MenuName",
      trigger: "blur",
    },
    {
      min: 2,
      max: 30,
      message: "2-8 characters in length",
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
      const data = { ...menuForm };
      const action = {
        "Add1": "create",
        "Add": "create",
        "Edit": "edit"
      };
      data.action = action[props.title];
      await proxy.$api.submitmenuInfo(data);
      emit("refreshList")
      handleClose();
      ElMessage({
        message: 'Success!',
        type: 'success',
      });
    }
  })
  // dialogVisible.value = false;
}

watch(dialogVisible, (newV, oldV) => {
  proxy.$nextTick(() => {
    if (props.title === "Edit" && newV) {
      menuForm = Object.assign(menuForm, props.editeMenu);
      menuForm.menuState = Number(menuForm.menuState);
      menuForm.menuType = Number(menuForm.menuType);
    };
    if (props.title === "Add" && newV) {
      menuForm.parentId = props.editeMenu.parentId;
    };
  });
});

// expose data to parent 
defineExpose({ dialogVisible });
</script>

<style lang="scss" scoped>
</style>