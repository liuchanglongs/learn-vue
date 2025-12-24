// home路由下面的子路由 
const allRouter = [
  {
    path: "system/user",
    name: "userManage",
    component: () => import('@/views/UserManger/UserManger.vue'),
    meta: {
      title: "userManage",
      isAuthorization: true
    },
  },
  {
    path: "system/menu",
    name: "menuManage",
    component: () => import('@/views/MenuManger/MenuManger.vue'),
    meta: {
      title: "menuManage",
      isAuthorization: true
    },
  },
  {
    path: "system/role",
    name: "roleManage",
    component: () => import('@/views/RoleManger/RoleManger.vue'),
    meta: {
      title: "roleManage",
      isAuthorization: true
    },
  },
  {
    path: "system/dept",
    name: "deptManage",
    component: () => import('@/views/DeptManger/DeptManger.vue'),
    meta: {
      title: "deptManage",
      isAuthorization: true
    },
  },
  {
    path: "audit/leave",
    name: "vacationApproval",
    component: () => import('@/views/VacationApproval/VacationApproval.vue'),
    meta: {
      title: "vacationApproval",
      isAuthorization: true
    },
  },
  {
    path: "audit/approve",
    name: "approvalCondition",
    component: () => import('@/views/ApprovalCondition/ApprovalCondition.vue'),
    meta: {
      title: "approvalCondition",
      isAuthorization: true
    },
  }
]
export default allRouter