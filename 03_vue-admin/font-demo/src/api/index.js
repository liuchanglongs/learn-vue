import request from "@/utils/request.js"


export default {
  login (data) {
    return request({
      method: 'post',
      url: "/users/login",
      data: data,
      isMock: false
    })
  },

  notice () {
    return request({
      method: 'get',
      url: "/leave/count",
      params: {},
      isMock: false
    })
  },

  menuList (data) {
    return request({
      method: 'get',
      url: "/menu/list",
      params: data,
      isMock: false
    })
  },

  userList (data) {
    return request({
      method: 'get',
      url: "/users/list",
      params: data,
      isMock: false
    })
  },
  userAllList (data) {
    return request({
      method: 'get',
      url: "/users/all/list",
      isMock: false
    })
  },
  userDelete (data) {
    return request({
      method: 'post',
      url: "/users/delete",
      data: data,
      isMock: false
    })
  },
  getPermissionList (data) {
    return request({
      method: 'get',
      url: "/users/getPermissionList",
      isMock: false
    })
  },
  roleList () {
    return request({
      method: 'get',
      url: "/roles/allList",
      isMock: false
    })
  },

  depList (data) {
    return request({
      method: 'get',
      url: "/dept/list",
      params: data,
      isMock: false
    })
  },

  submitDeptInfo (data) {
    return request({
      method: 'post',
      url: "/dept/operate",
      data: data,
      isMock: false
    })
  },

  submitUserInfo (data) {
    return request({
      method: 'post',
      url: "/users/operate",
      data: data,
      isMock: false
    })
  },

  submitmenuInfo (data) {
    return request({
      method: 'post',
      url: "/menu/operate",
      data: data,
      isMock: false
    })
  },

  getRoleList (data) {
    return request({
      method: 'get',
      url: "/roles/list",
      params: data,
      isMock: false
    })
  },

  updateRolePermission (data) {
    return request({
      method: 'post',
      url: "/roles/update/permission",
      data: data,
      isMock: false
    })
  },

  submitRoleInfo (data) {
    return request({
      method: 'post',
      url: "/roles/operate",
      data: data,
      isMock: false
    })
  },

  leaveOperate (data) {
    return request({
      url: '/leave/operate',
      method: 'post',
      data: data,
      mock: false
    })
  },

  leaveList (data) {
    return request({
      url: '/leave/list',
      method: 'get',
      params: data,
      mock: false
    })
  },

  CheckLeaveList (data) {
    return request({
      url: '/leave/approve',
      method: 'post',
      data: data,
      mock: false
    })
  },
}