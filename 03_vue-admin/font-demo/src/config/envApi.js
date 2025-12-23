// 环境配置
const env = import.meta.env.MODE || "prod"; 
const envConfig = {
  dev:{
    baseApi:"/api",
    mockApi:"https://www.fastmock.site/mock/3df3734293ee828e14cedc9fdc6e89a7/api"
  },
  prod:{
    baseApi:"",
    mockApi:"https://www.fastmock.site/mock/3df3734293ee828e14cedc9fdc6e89a7/api"
  },
  test:{
    baseApi:"",
    mockApi:"https://www.fastmock.site/mock/3df3734293ee828e14cedc9fdc6e89a7/api"
  }
};

export default {
  env,
  mock:false,
  nameSpace:"LclV3demo",
  ...envConfig[env]
}