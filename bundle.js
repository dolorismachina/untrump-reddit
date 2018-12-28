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
/******/ 	return __webpack_require__(__webpack_require__.s = "./untrump.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dom-query.js":
/*!**********************!*\
  !*** ./dom-query.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  getEntries() {\r\n    return document.querySelectorAll('.thing')\r\n  },\r\n\r\n  getEntryTitle(entry) {\r\n    return entry.querySelector('a.title').textContent\r\n  },\r\n\r\n  // Subreddit the entry is from\r\n  getEntryOrigin(entry) {\r\n    return entry.querySelector('a.subreddit').textContent\r\n  }\r\n});\n\n//# sourceURL=webpack:///./dom-query.js?");

/***/ }),

/***/ "./untrump.js":
/*!********************!*\
  !*** ./untrump.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_query_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-query.js */ \"./dom-query.js\");\n\r\n\r\n(function() {\r\n  console.clear()\r\n  console.log(_dom_query_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n\r\n  const keywords = [\r\n    'facebook',\r\n    'trump',\r\n    'mueller',\r\n    'verizon',\r\n    'windows',\r\n    'google',\r\n    'amazon'\r\n  ]\r\n\r\n  let entriesMatched = 0 // Entries matching keywords.\r\n\r\n  const matchData = {\r\n    entriesMatched: 0,\r\n    matches: {}\r\n  }\r\n\r\n  function prepareMatchArray() {\r\n    keywords.forEach(word => {\r\n      matchData.matches[word] = []\r\n    })\r\n  }\r\n\r\n  function findMatches() {\r\n    const entries = _dom_query_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getEntries()\r\n    entries.forEach(entry => {\r\n      match(entry)\r\n    })\r\n  }\r\n\r\n  function updateBadge() {\r\n    // Update browser_action with number of matches.\r\n    browser.runtime.sendMessage({\r\n      removed: entriesMatched,\r\n      entries: getMatchCount(matchData.matches)\r\n    })\r\n  }\r\n\r\n  function getMatchCount(matches) {\r\n    const o = {}\r\n    Object.keys(matches).forEach(key => {\r\n      o[key] = matches[key].length\r\n    })\r\n\r\n    return o\r\n  }\r\n\r\n  function match(entry) {\r\n    if (isPromoted(entry)) return\r\n\r\n    keywords.forEach(word => {\r\n      filter(entry, word)\r\n    })\r\n  }\r\n\r\n  \r\n\r\n  function isPromoted(entry) {\r\n    return entry.classList.contains('promoted')\r\n  }\r\n\r\n  function filter(entry, keyword) {\r\n    const title = _dom_query_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getEntryTitle(entry).toLowerCase()\r\n\r\n    if (title.includes(keyword.toLowerCase())) {\r\n      // entry.parentNote.removeChild(entry)\r\n      entry.classList.add('untrumped')\r\n      console.log(`%cRemoved ${title}`, \"color: red\")\r\n      entriesMatched++\r\n\r\n      matchData.matches[keyword].push(entry)\r\n    }\r\n  }\r\n\r\n  function handleToggle(keyword) {\r\n    matchData.matches[keyword].forEach(el => {\r\n      el.classList.toggle('untrumped')\r\n    })\r\n  }\r\n\r\n  browser.runtime.onMessage.addListener(message => {\r\n    switch (message.action) {\r\n      case 'toggle':\r\n        handleToggle(message.keyword)\r\n    }\r\n  })\r\n\r\n  prepareMatchArray()\r\n  findMatches()\r\n  updateBadge()\r\n\r\n  console.log(matchData.matches)\r\n})()\n\n//# sourceURL=webpack:///./untrump.js?");

/***/ })

/******/ });