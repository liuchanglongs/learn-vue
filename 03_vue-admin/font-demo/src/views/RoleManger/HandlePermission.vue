<template>
  <div class="handle-permission-dialog">
    <el-dialog v-model="dialogVisible" title="SetPermission" :before-close="handleClose">
      <el-form ref="dialogForm">
        <el-form-item label="RoleName：">
          <span>{{props.treeShowData.roleName}}</span>
        </el-form-item>
        <el-form-item label="OptionPermission：">
          <el-tree :data="treeData" default-expand-all node-key="_id" ref="permissionTree" :props="defaultProps"
            show-checkbox />
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
  name: "HandlePermissionDialog"
});

const { proxy } = getCurrentInstance();
// props
const props = defineProps({
  treeShowData: {
    type: Object,
    default: () => { }
  }
});

const emit = defineEmits(["refreshList"]);
const defaultProps = {
  children: 'children',
  label: 'menuName',
  disabled: 'disabled',
};

const treeData = ref([]);

// control dialog  isShow
const dialogVisible = ref(false);
const getMenuList = async () => {
  const getMenuList = await proxy.$api.menuList({});
  treeData.value = getMenuList;
}
// tabledata：initialzation、search
getMenuList();

//  close dialog
const handleClose = () => {
  proxy.$refs.permissionTree.setCheckedKeys([]);
  dialogVisible.value = false;
};
// determine dialog
const handleSubmit = async () => {
  const checkedKeys = proxy.$refs.permissionTree.getCheckedKeys(true);
  const halfCheckedKeys = () => {
    const data = proxy.$refs.permissionTree.getCheckedNodes(false, true);
    const handleData = [];
    data.map(item => {
      if (!checkedKeys.includes(item._id)) {
        handleData.push(item._id);
      };
    });
    return handleData
  };
  const data = {
    "_id": props.treeShowData._id,
    "permissionList": {
      "checkedKeys": checkedKeys,//选中的子菜单
      "halfCheckedKeys": halfCheckedKeys(),//半选中的父菜单
    },//权限列表
  }
  await proxy.$api.updateRolePermission(data);
  emit("refreshList");
  ElMessage({
    message: 'Success!',
    type: 'success',
  });
  handleClose();
};

watch(dialogVisible, (newV, oldV) => {
  if (newV) {
    proxy.$nextTick(() => {
      proxy.$refs.permissionTree.setCheckedKeys(props.treeShowData.permissionList.checkedKeys);
    });
  }
});
// expose data to parent 
defineExpose({ dialogVisible });
</script>

<style lang="scss" scoped>
</style>