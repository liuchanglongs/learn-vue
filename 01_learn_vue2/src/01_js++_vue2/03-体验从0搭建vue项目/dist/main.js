/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./modules/vue/index.js":
/*!******************************!*\
  !*** ./modules/vue/index.js ***!
  \******************************/
/*! exports provided: createApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createApp\", function() { return createApp; });\n/*\r\n * @Autor: lcl\r\n * @Version: 2.0\r\n * @Date: 2023-04-28 16:22:13\r\n * @LastEditors: lcl\r\n * @LastEditTime: 2023-04-28 16:41:18\r\n * @Description: lcl\r\n */\r\nfunction createApp(component) {\r\n  const vm = {};\r\n  vm.mount = mount;\r\n  return vm;\r\n}\r\n\r\nfunction mount(el) {\r\n  console.log(el);\r\n}\r\n\n\n//# sourceURL=webpack:///./modules/vue/index.js?");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (2:12)\\nFile was processed with these loaders:\\n * ./modules/vue-loader/index.js\\nYou may need an additional loader to handle the result of these loaders.\\n| \\n>     import(E:\\\\learn-project\\\\29_vue3\\\\src\\\\03-体验从0搭建vue项目\\\\_temp\\\\css\\\\_1683166634007.css);\\n|     export default {template:   <div class=\\\"boxs\\\">    <h1 v-if=\\\"isIf\\\">v-if</h1>    <h1 v-show=\\\"isShow\\\">v-show</h1>    <button @click=\\\"changeShow\\\">v-show</button>    <button @click=\\\"changeIf\\\">v-if</button>  </div>,  data() {    return {      isShow: true,      isIf: false,    };  },  methods: {    changeShow() {      this.isShow = !this.isShow;    },    changeIf() {      this.isIf = !this.isIf;    },  },  beforeCreate() {    console.log('beforeCreate');  },  created() {    console.log('created');  },  beforeMounted() {    console.log('beforeMounted');  },  mounted() {    this.isIf = true;    console.log('mounted');  },  beforeUpdate() {    console.log('beforeUpdate');  },  updated() {    console.log('updated');  },};\\n|   \");\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/vue */ \"./modules/vue/index.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_App_vue__WEBPACK_IMPORTED_MODULE_1__);\n/*\n * @Autor: lcl\n * @Version: 2.0\n * @Date: 2023-04-28 15:26:56\n * @LastEditors: lcl\n * @LastEditTime: 2023-04-28 16:25:08\n * @Description: lcl\n */\n\n\n\nObject(_modules_vue__WEBPACK_IMPORTED_MODULE_0__[\"createApp\"])(_App_vue__WEBPACK_IMPORTED_MODULE_1___default.a).mount('#app');\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });