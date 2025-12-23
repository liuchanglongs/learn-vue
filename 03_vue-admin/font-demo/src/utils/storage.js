import config from "../config/envApi.js"

export default {
  getStorage(){
    return JSON.parse(window.localStorage.getItem(config.nameSpace) || "{}")
  },

  setItem(key, val){
    let storage = this.getStorage();
    storage[key] = val;
    window.localStorage.setItem(config.nameSpace, JSON.stringify(storage));
  },

  getItem(key){
    return this.getStorage()[key]
  },

  clearItem(key){
    let storage = this.getStorage();
    delete storage[key];
    window.localStorage.setItem(config.nameSpace, JSON.stringify(storage));
  },

  clearAll(){
    window.localStorage.removeItem(config.nameSpace);
  },

  clearStorgae(){
    window.localStorage.clear();
  }

}