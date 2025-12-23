/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-25 15:04:59
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-26 16:48:11
 * @Description: lcl
 */
/**
 * VM驱动: 挂载dom->收集依赖，数据劫持 -> 解析模板，绑定事件 -> 解析模板，绑定数据，更新视图
 * 主要依赖收集、事件绑定、数据绑定、视图变更
 * M:  数据保存与处理数据的逻辑
 * V:  视图管理
 * ref->访问dom
 * rect :也可以拿dom
 * mvvm：彻底分离vm与m跟v层
 * vue: 是一个视图渲染工具。它有很多集成的三方库，所以说时渐进式框架
 *
 * mvc\mvvc时设计思想和方案（架构上的），不是设计模式（逻辑上）。
 * vue、react都没有完全安按照mvvm架构
 * */
import { mount, useReactive } from '../mvvm';

// 根组件：模板
function App() {
  const data = useReactive({
    name: 'lcl',
    count: 0,
  });
  const add = number => {
    data.count += number;
  };
  const mins = number => {
    data.count -= number;
  };
  const changeName = name => {
    data.name = new Date().getTime();
  };
  return {
    data,
    template: `
      <h1>{{count}}</h1>  
      <h2>{{name}}</h2>  
      <button onClick="add(2)">+</button>
      <button onClick="mins(2)">-</button>
      <button onClick="changeName('-----')">change name</button>
  `,
    methods: {
      add,
      mins,
      changeName,
    },
  };
}

mount(App(), document.querySelector('#app'));
