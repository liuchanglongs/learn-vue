// 获取后端返回的menuList, 拿到路由名字
const configRouter = (menuList = [], allRouter = []) => {
  const routerName = [];
  const copy = JSON.parse(JSON.stringify(menuList));
  const deep = (menuList = []) => {
    while (menuList.length) {
      let item = menuList.pop();
      if (item.children && item.action) {
        routerName.push(item.menuName.toLowerCase());
      } else {
        deep(item.children);
      }
    }
    return routerName
  };
  deep(copy);

  // 根据拿到路由名字，动态加载本地路由
  const arry = [];
  allRouter.map(v => {
    if (routerName.includes(v.name.toLowerCase())) {
      arry.push(v);
    }
  });
  return arry
};


export default configRouter
