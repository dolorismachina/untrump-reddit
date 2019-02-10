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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
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

/***/ "./filter.js":
/*!*******************!*\
  !*** ./filter.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Filter; });\n/* harmony import */ var _dom_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-query */ \"./dom-query.js\");\n\r\n\r\n\r\nclass Filter {\r\n  constructor() {\r\n    this.matches = {}\r\n    this.matchCount = 0\r\n  }\r\n\r\n\r\n  async run() {\r\n    this.reset()\r\n    await this.getFilters()\r\n      .then(this.processFilters.bind(this), err => console.log(err))\r\n      .then(this.updateState.bind(this))\r\n      \r\n    this.attachTagsToTitles()\r\n  }\r\n\r\n\r\n  // Reset DOM listing to their default state.\r\n  // Clear the matches object.\r\n  reset() {\r\n    Object.keys(this.matches).forEach(key => {\r\n      matchData.matches[key].forEach(match => {\r\n        match.classList.remove('untrumped')\r\n      })\r\n    }) \r\n\r\n    this.matchCount = 0\r\n    this.matches = {}\r\n  }\r\n\r\n\r\n  getFilters() {\r\n    const message = {\r\n      action: 'keywords'\r\n    }\r\n\r\n    return browser.runtime.sendMessage(message)\r\n  }\r\n\r\n\r\n  processFilters(filters) {\r\n    const listings = _dom_query__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getEntries()\r\n    listings.forEach(listing => {\r\n      filters.forEach(filter => {\r\n        this.compare(listing, filter)\r\n      })\r\n    })\r\n\r\n    return true\r\n  }\r\n\r\n\r\n  // Check if listing's title contains \r\n  // user-defined filter word.\r\n  compare(listing, word) {\r\n    if (listing.classList.contains('promoted')) \r\n      return\r\n\r\n    const title = _dom_query__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getEntryTitle(listing).toLowerCase()\r\n\r\n    if (title.includes(word.toLowerCase())) {\r\n      console.log(`%cRemoved ${title}`, \"color: red\")\r\n      this.applyFilter(listing)\r\n      this.matchCount++\r\n      if (!this.matches[word]) {\r\n        this.matches[word] = []\r\n      }\r\n\r\n      this.matches[word].push(listing)\r\n    }\r\n  }\r\n\r\n\r\n  applyFilter(targetListing) {\r\n    targetListing.classList.add('untrumped')\r\n  }\r\n\r\n\r\n  // Send filter data to background script\r\n  // to update the badge and create a popup menu.\r\n  updateState() {\r\n    const options = {\r\n      action: 'newmatches',\r\n      removed: this.matchCount,\r\n      entries: this.countMatchesByWord()\r\n    }\r\n    \r\n    browser.runtime.sendMessage(options)\r\n      .then(res => console.log(res), \r\n            err => console.log(err))\r\n  }\r\n\r\n  \r\n  attachTagsToTitles() {\r\n    const filters = Object.keys(this.matches)\r\n    filters.forEach(this.attachTag.bind(this))\r\n  }\r\n\r\n\r\n  attachTag(key) {\r\n    this.matches[key].forEach(listing => {\r\n      const titleElement = listing.querySelector('p.title')\r\n      const flairElement = titleElement.querySelector('.linkflairlabel')\r\n\r\n      const span = document.createElement('span')\r\n      span.classList.add('linkflairlabel', 'trumptag')\r\n      span.textContent = key.toUpperCase()\r\n      titleElement.parentNode.insertBefore(span, titleElement)\r\n    })\r\n  }\r\n\r\n\r\n  // Count how many listings are matched for each filter.\r\n  countMatchesByWord() {\r\n    const o = {}\r\n\r\n    Object.keys(this.matches)\r\n      .forEach(key => {\r\n        o[key] = this.matches[key].length\r\n      })\r\n\r\n    return o\r\n  }\r\n\r\n\r\n  toggle(word) {\r\n    this.matches[word]\r\n      .forEach(el => {\r\n        el.classList.toggle('untrumped')\r\n      })\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./filter.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter */ \"./filter.js\");\n\r\n\r\n(function() {\r\n  const f = new _filter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\n\r\n  f.run()\r\n\r\n\r\n  browser.runtime.onMessage.addListener(message => {\r\n    switch (message.action) {\r\n      case 'toggle':\r\n        f.toggle(message.keyword)\r\n        break\r\n      \r\n      case 'refresh':\r\n        f.run()\r\n        break\r\n    }\r\n  })\r\n})()\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });