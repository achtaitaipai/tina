/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/anims.js":
/*!**********************!*\
  !*** ./src/anims.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "floating": () => (/* binding */ floating)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");

function floating(scrollEl, rot, trans, direction) {
  var progress = scrollEl.progress;
  var rotInit = parseInt(scrollEl.el.getAttribute('data-rot')) || 0;
  var rotationVal = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.map)(progress, 0, 1, -rot, rot);
  var translationVal = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.map)(progress, 0, 1, -trans, trans);

  if (direction === 'horizontal') {
    scrollEl.el.style.setProperty('transform', "translateY(".concat(translationVal, "%) rotate(").concat(rotationVal + rotInit, "deg)"));
  } else {
    scrollEl.el.style.setProperty('transform', "translateX(".concat(translationVal, "%) rotate(").concat(rotationVal + rotInit, "deg)"));
  }
}

/***/ }),

/***/ "./src/audioPlayer.js":
/*!****************************!*\
  !*** ./src/audioPlayer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioPlayer": () => (/* binding */ AudioPlayer)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AudioPlayer = /*#__PURE__*/function () {
  function AudioPlayer(el) {
    _classCallCheck(this, AudioPlayer);

    this.element = el;
    this.playBtn = this.element.querySelector('.playBtn');
    this.playIcon = this.element.querySelector('.play');
    this.pauseIcon = this.element.querySelector('.pause');
    this.nextBtn = this.element.querySelector('.nextBtn');
    this.prevBtn = this.element.querySelector('.prevBtn');
    this.title = this.element.querySelector('.titre');
    this.duree = this.element.querySelector('.duree');
    this.progressBar = this.element.querySelector('.progressBar');
    this.progressBarContainer = this.element.querySelector('.progressBarContainer');
    this.audios = Array.from(this.element.querySelectorAll('audio'));
    this.handlePlayer = this.element.querySelector('.player__handle');
    this.idx = 0;
    this.currentAudio = this.audios[this.idx];
    this.title.textContent = this.currentAudio.getAttribute('data-title');
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.showPlayer = this.showPlayer.bind(this);
    this.hidePlayer = this.hidePlayer.bind(this);
    this.timeUpdate = this.timeUpdate.bind(this);
    this.setTime = this.setTime.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.playBtn.addEventListener('click', this.play);
    this.nextBtn.addEventListener('click', this.next);
    this.prevBtn.addEventListener('click', this.prev);
    this.handlePlayer.addEventListener('click', this.showPlayer);
  }

  _createClass(AudioPlayer, [{
    key: "next",
    value: function next() {
      this.pause();
      this.currentAudio.currentTime = 0;
      this.idx = (this.idx + 1) % this.audios.length;
      this.currentAudio = this.audios[this.idx];
      this.title.textContent = this.currentAudio.getAttribute('data-title');
      this.play();
    }
  }, {
    key: "prev",
    value: function prev() {
      this.pause();
      this.currentAudio.currentTime = 0;
      this.idx = this.idx > 0 ? this.idx - 1 : this.audios.length - 1;
      this.currentAudio = this.audios[this.idx];
      this.title.textContent = this.currentAudio.getAttribute('data-title');
      this.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.currentAudio.pause();
      this.playBtn.querySelector('.play').style.display = 'inline';
      this.playBtn.querySelector('.pause').style.display = 'none';
      this.playBtn.removeEventListener('click', this.pause);
      this.playBtn.addEventListener('click', this.play);
      this.currentAudio.removeEventListener('timeupdate', this.timeUpdate);
      this.currentAudio.removeEventListener('ended', this.next);
    }
  }, {
    key: "play",
    value: function play() {
      this.currentAudio.play();
      this.playBtn.querySelector('.play').style.display = 'none';
      this.playBtn.querySelector('.pause').style.display = 'inline';
      this.playBtn.removeEventListener('click', this.play);
      this.playBtn.addEventListener('click', this.pause);
      this.currentAudio.addEventListener('timeupdate', this.timeUpdate);
      this.currentAudio.addEventListener('ended', this.next);
      this.progressBarContainer.addEventListener('click', this.setTime);
    }
  }, {
    key: "timeUpdate",
    value: function timeUpdate() {
      var t = this.calculateTime(this.currentAudio.currentTime);
      var tt = this.calculateTime(this.currentAudio.duration);
      var progress = this.currentAudio.currentTime / this.currentAudio.duration * 100;
      this.duree.textContent = "".concat(t, " / ").concat(tt);
      this.progressBar.style.width = progress + '%';
    }
  }, {
    key: "calculateTime",
    value: function calculateTime(secs) {
      var minutes = Math.floor(secs / 60);
      var seconds = Math.floor(secs % 60);
      var returnedSeconds = seconds < 10 ? "0".concat(seconds) : "".concat(seconds);
      return "".concat(minutes, ":").concat(returnedSeconds);
    }
  }, {
    key: "setTime",
    value: function setTime(e) {
      var x = e.clientX - this.progressBarContainer.getBoundingClientRect().x;
      var w = this.progressBarContainer.getBoundingClientRect().width;
      this.currentAudio.currentTime = x / w * this.currentAudio.duration;
      this.timeUpdate();
    }
  }, {
    key: "showPlayer",
    value: function showPlayer(e) {
      e.preventDefault();
      this.element.classList.add('visible');
      this.handlePlayer.removeEventListener('click', this.showPlayer);
      this.element.addEventListener('mousemove', this.resetTimer);
      document.addEventListener('click', this.hidePlayer);
      this.resetTimer();
    }
  }, {
    key: "hidePlayer",
    value: function hidePlayer(e) {
      var targetElement = e.target; // clicked element

      do {
        if (targetElement === this.element) {
          this.resetTimer();
          return;
        } // Go up the DOM


        targetElement = targetElement.parentNode;
      } while (targetElement);

      this.element.classList.remove('visible');
      this.handlePlayer.addEventListener('click', this.showPlayer);
      document.removeEventListener('click', this.hidePlayer);
      if (this.t) clearTimeout(this.t); // this.element.removeEventListener('mousemove', this.resetTimer)
    }
  }, {
    key: "resetTimer",
    value: function resetTimer() {
      var _this = this;

      if (this.t) clearTimeout(this.t);
      this.t = window.setTimeout(function () {
        _this.element.classList.remove('visible');

        _this.handlePlayer.addEventListener('click', _this.showPlayer);

        document.removeEventListener('click', _this.hidePlayer);
      }, 4000);
    }
  }]);

  return AudioPlayer;
}();

/***/ }),

/***/ "./src/draggableBox.js":
/*!*****************************!*\
  !*** ./src/draggableBox.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DraggableBox": () => (/* binding */ DraggableBox)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*
TODO : 
    ajouter gestion des z-index https://www.willmaster.com/blog/javascript/z-index-range.php
    ajouter des evenements au drag et au dédrag

*/
var DraggableBox = /*#__PURE__*/function (_HTMLDivElement) {
  _inherits(DraggableBox, _HTMLDivElement);

  var _super = _createSuper(DraggableBox);

  function DraggableBox() {
    var _this;

    _classCallCheck(this, DraggableBox);

    _this = _super.call(this);
    _this.container = document.querySelector(_this.getAttribute('container')) || document.body;
    _this.handle = _this.querySelector(_this.getAttribute('handle')) || _assertThisInitialized(_this);
    _this.closeBtn = _toConsumableArray(_this.querySelectorAll('.closeBtn'));
    _this.handle.style.userSelect = 'none';
    _this.x = 0;
    _this.y = 0;
    _this.dx = 0;
    _this.dy = 0;
    _this.translateX = 0;
    _this.translateY = 0;
    _this.rot = _this.getCurrentRotation();
    _this.handle.style.cursor = 'grab';

    var shadow = _this.attachShadow({
      mode: 'open'
    });

    shadow.innerHTML =
    /* html */
    "\n            <style> \n            :host{\n              position : relative;\n            }\n            </style>\n            <slot name=\"content\"></slot>\n        ";
    return _this;
  }

  _createClass(DraggableBox, [{
    key: "getCurrentRotation",
    value: function getCurrentRotation() {
      var st = window.getComputedStyle(this, null);
      var tm = st.getPropertyValue('-webkit-transform') || st.getPropertyValue('-moz-transform') || st.getPropertyValue('-ms-transform') || st.getPropertyValue('-o-transform') || st.getPropertyValue('transform') || 'none';

      if (tm !== 'none') {
        var values = tm.split('(')[1].split(')')[0].split(',');
        var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
        return angle < 0 ? angle + 360 : angle;
      }

      return 0;
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.onDragStart = this.onDragStart.bind(this);
      this.handle.addEventListener('touchstart', this.onDragStart, {
        passive: false
      });
      this.handle.addEventListener('mousedown', this.onDragStart, {
        passive: false
      });
      this.closeBtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
          return _this2.style.setProperty('display', 'none');
        });
      });
    }
  }, {
    key: "onDragStart",
    value: function onDragStart(e) {
      this.handle.style.cursor = 'grabbing';
      this.style.zIndex = this.findMaxZindex() + 1;
      console.log('~ this.style.zIndex', this.style.zIndex);
      this.onDrag = this.onDrag.bind(this);
      document.addEventListener('touchmove', this.onDrag, {
        passive: false
      });
      document.addEventListener('mousemove', this.onDrag, {
        passive: false
      });
      this.onDragEnd = this.onDragEnd.bind(this);
      document.addEventListener('touchend', this.onDragEnd, {
        passive: false
      });
      document.addEventListener('mouseup', this.onDragEnd, {
        passive: false
      });
      var screenX = e.clientX || e.touches[0].pageX || this.x;
      var screenY = e.clientY || e.touches[0].pageY || this.y;
      this.x = screenX;
      this.y = screenY;
      e.preventDefault();
    }
  }, {
    key: "findMaxZindex",
    value: function findMaxZindex() {
      var max = 0;
      var box = this.container.querySelectorAll('div[is="draggable-box"]');
      box.forEach(function (b) {
        max = Math.max(max, parseInt(b.style.zIndex) || 0);
      });
      return max;
    }
  }, {
    key: "onDrag",
    value: function onDrag(e) {
      // const screenX = e.clientX || e.touches[0].pageX || this.x
      var screenX = e.clientX || (e.touches ? e.touches[0].pageX : this.x);
      var screenY = e.clientY || (e.touches ? e.touches[0].pageY : this.y);
      this.dx = this.x - screenX;
      this.dy = this.y - screenY;
      this.collide();
      this.x = screenX;
      this.y = screenY;
      this.translateX -= this.dx;
      this.translateY -= this.dy;
      this.style.transform = "translate(".concat(this.translateX, "px,").concat(this.translateY, "px) rotate(").concat(this.rot, "deg)");
      e.preventDefault();
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd(e) {
      this.handle.style.cursor = 'grab';
      document.removeEventListener('touchmove', this.onDrag);
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('touchend', this.onDragEnd);
      document.removeEventListener('mouseup', this.onDragEnd);
      e.preventDefault();
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.handle.removeEventListener('touchstart', this.onDragStart);
      this.handle.removeEventListener('mousedown', this.onDragStart);
      document.removeEventListener('touchmove', this.onDrag);
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('touchend', this.onDragEnd);
      document.removeEventListener('mouseup', this.onDragEnd);
    }
  }, {
    key: "collide",
    value: function collide() {
      if (this.getBoundingClientRect().right - this.dx >= this.container.getBoundingClientRect().right) this.dx = 0;
      if (this.getBoundingClientRect().top - this.dy <= this.container.getBoundingClientRect().top) this.dy = 0;
      if (this.getBoundingClientRect().left - this.dx <= this.container.getBoundingClientRect().left) this.dx = 0;
      if (this.getBoundingClientRect().bottom - this.dy >= this.container.getBoundingClientRect().bottom) this.dy = 0;
    }
  }]);

  return DraggableBox;
}( /*#__PURE__*/_wrapNativeSuper(HTMLDivElement));

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "randomNumber": () => (/* binding */ randomNumber),
/* harmony export */   "randItem": () => (/* binding */ randItem),
/* harmony export */   "getCurrentRotation": () => (/* binding */ getCurrentRotation)
/* harmony export */ });
var map = function map(x, a, b, c, d) {
  return (x - a) * (d - c) / (b - a) + c;
};
var clamp = function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
};
var randomNumber = function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
var randItem = function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
function getCurrentRotation(el) {
  var st = window.getComputedStyle(el, null);
  var tm = st.getPropertyValue('-webkit-transform') || st.getPropertyValue('-moz-transform') || st.getPropertyValue('-ms-transform') || st.getPropertyValue('-o-transform') || st.getPropertyValue('transform') || 'none';

  if (tm !== 'none') {
    var values = tm.split('(')[1].split(')')[0].split(',');
    var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
  }

  return 0;
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \***********************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@-webkit-keyframes rebond {\n  0% {\n    opacity: 0;\n    transform: translateY(-500px);\n  }\n  1% {\n    opacity: 1;\n  }\n  16% {\n    transform: translateY(160px);\n  }\n  28% {\n    transform: translateY(-65px);\n  }\n  44% {\n    transform: translateY(25px);\n  }\n  59% {\n    transform: translateY(-10px);\n  }\n  73% {\n    transform: translateY(5px);\n  }\n  88% {\n    transform: translateY(0px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0px);\n  }\n}\n@keyframes rebond {\n  0% {\n    opacity: 0;\n    transform: translateY(-500px);\n  }\n  1% {\n    opacity: 1;\n  }\n  16% {\n    transform: translateY(160px);\n  }\n  28% {\n    transform: translateY(-65px);\n  }\n  44% {\n    transform: translateY(25px);\n  }\n  59% {\n    transform: translateY(-10px);\n  }\n  73% {\n    transform: translateY(5px);\n  }\n  88% {\n    transform: translateY(0px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0px);\n  }\n}\n@-webkit-keyframes rot {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes rot {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@-webkit-keyframes float {\n  0% {\n    filter: drop-shadow(0 5px 14px rgba(0, 0, 0, 0.3));\n    transform: translatey(0px) scale(1);\n  }\n  50% {\n    filter: drop-shadow(0 35px 14px rgba(0, 0, 0, 0.5));\n    transform: translatey(-30px) scale(1.03);\n  }\n  100% {\n    filter: drop-shadow(0 5px 14px rgba(0, 0, 0, 0.3));\n    transform: translatey(0px) scale(1);\n  }\n}\n@keyframes float {\n  0% {\n    filter: drop-shadow(0 5px 14px rgba(0, 0, 0, 0.3));\n    transform: translatey(0px) scale(1);\n  }\n  50% {\n    filter: drop-shadow(0 35px 14px rgba(0, 0, 0, 0.5));\n    transform: translatey(-30px) scale(1.03);\n  }\n  100% {\n    filter: drop-shadow(0 5px 14px rgba(0, 0, 0, 0.3));\n    transform: translatey(0px) scale(1);\n  }\n}\n@-webkit-keyframes blop {\n  0% {\n    opacity: 0;\n    transform: scale(2);\n  }\n  1% {\n    opacity: 1;\n  }\n  16% {\n    transform: scale(0.68);\n  }\n  28% {\n    transform: scale(1.13);\n  }\n  44% {\n    transform: scale(0.95);\n  }\n  59% {\n    transform: scale(1.02);\n  }\n  73% {\n    transform: scale(0.99);\n  }\n  88% {\n    transform: scale(1);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes blop {\n  0% {\n    opacity: 0;\n    transform: scale(2);\n  }\n  1% {\n    opacity: 1;\n  }\n  16% {\n    transform: scale(0.68);\n  }\n  28% {\n    transform: scale(1.13);\n  }\n  44% {\n    transform: scale(0.95);\n  }\n  59% {\n    transform: scale(1.02);\n  }\n  73% {\n    transform: scale(0.99);\n  }\n  88% {\n    transform: scale(1);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n/*! locomotive-scroll v4.1.1 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */\nhtml.has-scroll-smooth {\n  overflow: hidden;\n}\n\nhtml.has-scroll-dragging {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.has-scroll-smooth body {\n  overflow: hidden;\n}\n\n.has-scroll-smooth [data-scroll-container] {\n  min-height: 100vh;\n}\n\n[data-scroll-direction=horizontal] [data-scroll-container] {\n  height: 100vh;\n  display: inline-block;\n  white-space: nowrap;\n}\n\n[data-scroll-direction=horizontal] [data-scroll-section] {\n  display: inline-block;\n  vertical-align: top;\n  white-space: nowrap;\n  height: 100%;\n}\n\n.c-scrollbar {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 11px;\n  height: 100%;\n  transform-origin: center right;\n  transition: transform 0.3s, opacity 0.3s;\n  opacity: 0;\n}\n\n.c-scrollbar:hover {\n  transform: scaleX(1.45);\n}\n\n.c-scrollbar:hover,\n.has-scroll-scrolling .c-scrollbar,\n.has-scroll-dragging .c-scrollbar {\n  opacity: 1;\n}\n\n[data-scroll-direction=horizontal] .c-scrollbar {\n  width: 100%;\n  height: 10px;\n  top: auto;\n  bottom: 0;\n  transform: scaleY(1);\n}\n\n[data-scroll-direction=horizontal] .c-scrollbar:hover {\n  transform: scaleY(1.3);\n}\n\n.c-scrollbar_thumb {\n  position: absolute;\n  top: 0;\n  right: 0;\n  background-color: black;\n  opacity: 0.5;\n  width: 7px;\n  border-radius: 10px;\n  margin: 2px;\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n\n.has-scroll-dragging .c-scrollbar_thumb {\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n}\n\n[data-scroll-direction=horizontal] .c-scrollbar_thumb {\n  right: auto;\n  bottom: 0;\n}\n\n*,\n*::before,\n*::after {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n  background-color: blueviolet;\n  background: linear-gradient(plum, blueviolet);\n  overflow: hidden;\n}\n\n.distort {\n  display: none;\n}\n\n.panel {\n  width: 100vw;\n  height: 100vh;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  white-space: normal;\n}\n\na,\na:visited {\n  color: blue;\n}\n\n.postit > div {\n  padding: 1.5rem 1.5rem 0 1.5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  text-align: justify;\n  box-shadow: 5px -5px 10px 2px rgba(0, 0, 0, 0.7);\n}\n.postit__closeBtn {\n  background: none;\n  border: none;\n  font-weight: 800;\n  cursor: pointer;\n  position: absolute;\n  right: 0.3rem;\n  top: 0.3rem;\n}\n.postit::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: calc(100% - 1px);\n  width: calc(100% - 1.5rem);\n  height: 1.5rem;\n  background: inherit;\n}\n.postit::after {\n  content: \"\";\n  position: absolute;\n  right: 0;\n  top: 100%;\n  height: 0;\n  width: 0;\n  border-top: 1.5rem solid #f1d600;\n  border-right: 1.5rem solid transparent;\n}\n\n.accueil {\n  height: 100vh;\n  display: grid;\n  place-items: center;\n}\n.accueil__title {\n  position: absolute;\n  left: 1rem;\n  top: 85vh;\n  font-size: 4rem;\n  font-weight: 800;\n  font-family: Georgia, \"Times New Roman\", Times, serif;\n  color: black;\n  font-style: italic;\n  -webkit-text-decoration: underline wavy #ffec58;\n          text-decoration: underline wavy #ffec58;\n  transform-origin: center;\n  text-transform: uppercase;\n  z-index: 1;\n}\n.accueil__title span {\n  display: inline-block;\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  color: transparent;\n  text-align: justify;\n}\n.accueil__title span::after {\n  content: \"\";\n  display: inline-block;\n  width: 100%;\n}\n.accueil__title span::-moz-selection {\n  background: red;\n  color: white;\n}\n.accueil__title span::selection {\n  background: red;\n  color: white;\n}\n.accueil img {\n  -webkit-animation: rebond 1s linear 0.1s 1 both;\n          animation: rebond 1s linear 0.1s 1 both;\n}\n.accueil .postit {\n  z-index: 10;\n  max-width: 20%;\n  position: absolute;\n  right: 2rem;\n  top: 2rem;\n  background: #ffec58;\n  font-family: Georgia, \"Times New Roman\", Times, serif;\n}\n.accueil .postit > div {\n  padding: 1rem 1rem 5rem 1rem;\n}\n.accueil .postit h3 {\n  font-size: 1.5rem;\n  font-style: italic;\n  text-align: center;\n  margin-top: 0.5rem;\n}\n.accueil .postit ul {\n  text-align: left;\n  font-style: italic;\n  list-style: none;\n}\n.accueil .postit span {\n  -webkit-text-decoration: line-through 1px black;\n          text-decoration: line-through 1px black;\n}\n\n.intro {\n  position: relative;\n  grid-template-columns: repeat(12, 1fr);\n}\n.intro__critique {\n  grid-column: 2/span 6;\n  grid-row: 1;\n  transform: rotate(10deg);\n}\n.intro__critique img {\n  max-width: 100%;\n}\n.intro .postit--fanny {\n  position: relative;\n  background-color: #ffec58;\n  max-width: 300px;\n  z-index: 1;\n  grid-column: 6/span 3;\n  grid-row: 1;\n}\n.intro .postit--fanny::after {\n  border-top-color: #f1d600;\n}\n.intro .postit--tristan {\n  background-color: #bff5e6;\n  grid-column: 7/span 4;\n  grid-row: 1;\n  transform: rotate(-5deg);\n  font-size: 0.8rem;\n  width: 90%;\n}\n.intro .postit--tristan::after {\n  border-top-color: #6883a1;\n}\n\n.album {\n  grid-template-columns: repeat(12, 1fr);\n}\n.album .pochette {\n  grid-row: 1;\n  grid-column: 3/span 4;\n  transform: rotate(5deg);\n}\n.album .pochette img {\n  max-width: 100%;\n}\n.album .cd {\n  grid-row: 1;\n  grid-column: 7/span 3;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 1;\n}\n.album .cd__imgContainer {\n  width: 100%;\n}\n.album .cd__imgContainer img {\n  max-width: 100%;\n}\n.album .cd__infos {\n  text-align: center;\n  line-height: 1.2;\n}\n.album .cd__infos b {\n  font-size: 1.2rem;\n}\n.album .cd__infos p {\n  text-align: justify;\n}\n.album .cd__infos a,\n.album .cd__infos a:visited {\n  color: blue;\n  font-weight: 600;\n  font-size: 1.5rem;\n  font-style: italic;\n}\n\n.clips {\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(2, 1fr);\n  place-content: center;\n}\n.clips .clip {\n  position: relative;\n  width: 100%;\n  display: grid;\n  place-items: center;\n  border-radius: 5px;\n  overflow: hidden;\n  background: linear-gradient(black, white 90%);\n}\n.clips .clip__player {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -75%);\n  background: black;\n  opacity: 0.8;\n  border-radius: 50%/10%;\n  font-size: 1rem;\n  /* change this to change size */\n  height: 3em;\n  margin: 20px auto;\n  padding: 0;\n  text-align: center;\n  text-indent: 0.1em;\n  transition: all 150ms ease-out;\n  width: 4em;\n  cursor: pointer;\n}\n.clips .clip__player::before {\n  background: inherit;\n  border-radius: 5%/50%;\n  bottom: 9%;\n  content: \"\";\n  left: -5%;\n  position: absolute;\n  right: -5%;\n  top: 9%;\n}\n.clips .clip__player::after {\n  border-style: solid;\n  border-width: 1em 0 1em 1.732em;\n  border-color: transparent transparent transparent white;\n  content: \" \";\n  font-size: 0.75em;\n  height: 0;\n  margin: -1em 0 0 -0.75em;\n  top: 50%;\n  position: absolute;\n  width: 0;\n}\n.clips .clip img {\n  -o-object-fit: cover;\n     object-fit: cover;\n  width: 100%;\n  display: block;\n}\n.clips .clip:nth-child(1) {\n  grid-column: 3/span 4;\n  grid-row: 1;\n  align-self: flex-end;\n}\n.clips .clip:nth-child(2) {\n  grid-column: 7/span 4;\n  grid-row: 1;\n  align-self: flex-end;\n}\n.clips .clip:nth-child(3) {\n  grid-column: 2/span 4;\n  grid-row: 2;\n  align-self: flex-start;\n}\n.clips .clip:nth-child(4) {\n  grid-column: 8/span 4;\n  grid-row: 2;\n  align-self: flex-start;\n}\n.clips .clip:nth-child(5) {\n  grid-column: 5/span 4;\n  grid-row: 2;\n  align-self: flex-start;\n}\n.clips .clip:hover {\n  z-index: 10;\n}\n.clips .clip:hover img {\n  opacity: 0.4;\n}\n.clips .clip:hover .clip__player {\n  background: red;\n}\n\n.vin {\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(12, 1fr);\n}\n.vin__paroles:nth-child(1) {\n  grid-row: 3/span 8;\n  grid-column: 2/span 3;\n  transform: rotate(-5deg);\n}\n.vin__paroles:nth-child(2) {\n  grid-row: 4/span 8;\n  grid-column: 4/span 3;\n  transform: rotate(-5deg);\n}\n.vin__paroles:nth-child(3) {\n  grid-row: 3/span 8;\n  grid-column: 5/span 3;\n  transform: rotate(10deg);\n}\n.vin__paroles:nth-child(4) {\n  grid-row: 2/span 8;\n  grid-column: 8/span 3;\n  transform: rotate(10deg);\n}\n.vin__paroles img {\n  max-width: 100%;\n}\n.vin__bouteille {\n  grid-column: 7/span 2;\n  grid-row: 3/span 8;\n  z-index: 1;\n}\n.vin__bouteille img {\n  max-width: 100%;\n}\n.vin__texte {\n  grid-column: 9/span 2;\n  grid-row: 10/span 2;\n  font-weight: 800;\n  font-style: italic;\n}\n\n.photos {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(6, 1fr);\n}\n.photos__imgContainer {\n  background: black;\n  position: relative;\n  width: 100%;\n  max-height: 100%;\n  border-radius: 5px;\n  overflow: hidden;\n  cursor: pointer;\n}\n.photos__imgContainer:nth-child(1) {\n  grid-column: 2/span 4;\n  grid-row: 2/span 3;\n}\n.photos__imgContainer:nth-child(2) {\n  grid-column: 8/span 4;\n  grid-row: 3/span 3;\n  z-index: 1;\n}\n.photos__imgContainer:nth-child(3) {\n  grid-column: 6/span 3;\n  grid-row: 1/span 5;\n}\n.photos__imgContainer img {\n  transition: opacity 0.3s ease-out;\n  -o-object-fit: cover;\n     object-fit: cover;\n  width: 100%;\n  display: block;\n}\n.photos__imgContainer:hover, .photos__imgContainer:focus {\n  z-index: 10;\n}\n.photos__imgContainer:hover img, .photos__imgContainer:focus img {\n  opacity: 0.4;\n}\n.photos__imgContainer figcaption {\n  position: absolute;\n  display: block;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 1;\n  color: white;\n  font-family: Georgia, \"Times New Roman\", Times, serif;\n  display: grid;\n  place-items: center;\n  text-align: justify;\n  transform-origin: center center;\n  transform: scale(0);\n  transition: transform 0.3s ease-out;\n}\n.photos__imgContainer figcaption p {\n  width: 70%;\n  aspect-ratio: 1;\n  padding: 1rem;\n  display: grid;\n  place-items: center;\n}\n.photos__imgContainer:hover figcaption, .photos__imgContainer:focus figcaption {\n  transform: scale(1);\n}\n\n.tapis {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.tapis__card {\n  height: 80%;\n  display: flex;\n  flex-direction: column;\n}\n.tapis__imgContainer {\n  height: 100%;\n  -webkit-animation: float 6s ease-in-out infinite;\n          animation: float 6s ease-in-out infinite;\n}\n.tapis__infos {\n  font-family: Georgia, \"Times New Roman\", Times, serif;\n  font-style: italic;\n}\n.tapis__infos span {\n  -webkit-text-decoration: line-through 1px black;\n          text-decoration: line-through 1px black;\n}\n\n.promo {\n  display: grid;\n  grid-template-rows: repeat(6, 1fr);\n  grid-template-rows: repeat(6, 1fr);\n  justify-content: center;\n  padding: 1rem 0;\n}\n.promo__imgContainer {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.promo__imgContainer img {\n  -o-object-fit: cover;\n     object-fit: cover;\n  max-width: 100%;\n  height: 100%;\n}\n.promo__imgContainer:nth-child(1) {\n  grid-column: 2/span 4;\n  grid-row: 1/span 3;\n  z-index: 1;\n}\n.promo__imgContainer:nth-child(1) img {\n  display: block;\n  margin-left: auto;\n  opacity: 0;\n}\n.promo__imgContainer:nth-child(1) img.is-inview {\n  -webkit-animation: blop 1s linear 0.5s 1 both;\n          animation: blop 1s linear 0.5s 1 both;\n}\n.promo__imgContainer:nth-child(2) {\n  grid-column: 1/span 4;\n  grid-row: 2/span 6;\n  align-self: center;\n  height: 80%;\n}\n.promo__imgContainer:nth-child(2) img {\n  transform: rotate(-5deg);\n}\n.promo__code {\n  position: absolute;\n  left: 0;\n  top: 0;\n  background: red;\n}\n\n.contact {\n  font-family: Georgia, \"Times New Roman\", Times, serif;\n}\n.contact__form {\n  position: relative;\n}\n.contact__form input,\n.contact__form label,\n.contact__form textarea {\n  display: block;\n  line-height: 2;\n}\n.contact__form [type=text],\n.contact__form [type=email],\n.contact__form textarea {\n  width: 100%;\n  background: #b9b8b8;\n  border: none;\n  outline: none;\n  resize: none;\n  padding: 0.3rem;\n}\n.contact__form label {\n  font-style: italic;\n}\n.contact__form [type=submit] {\n  float: right;\n  margin-top: 1rem;\n  padding: 0 0.3rem;\n  border-radius: 3px;\n  font-family: Georgia, \"Times New Roman\", Times, serif;\n  font-style: italic;\n  border: none;\n  outline: none;\n  cursor: pointer;\n  background: #d7d7d7;\n  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.3);\n}\n.contact__timbre {\n  position: absolute;\n  top: -2rem;\n  right: 0;\n  max-height: 7rem;\n  transform: translate(200px, -50px) rotate(-80deg);\n  opacity: 0;\n  transition: transform 1.6s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.contact__timbre.is-inview {\n  opacity: 1;\n  transform: translate(0, 0) rotate(0);\n}\n\n.footer__container {\n  position: relative;\n  padding: 1rem;\n  height: 90%;\n  text-align: justify;\n  aspect-ratio: 1/1;\n  display: grid;\n  place-items: center;\n}\n.footer__text {\n  position: relative;\n  max-width: 70%;\n  font-family: Georgia, \"Times New Roman\", Times, serif;\n}\n.footer__imgContainer {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  z-index: -1;\n  -webkit-animation: rot 10s ease-in-out 0.3s infinite both;\n          animation: rot 10s ease-in-out 0.3s infinite both;\n}\n.footer__imgContainer img {\n  -o-object-fit: cover;\n     object-fit: cover;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n\n.player {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: -3.4rem;\n  transform: translateY(0%);\n  background: #ece296;\n  display: flex;\n  align-items: stretch;\n  font-size: 0;\n  transition: transform 0.3s ease;\n}\n.player.visible {\n  transform: translateY(100%);\n}\n.player__handle {\n  position: absolute;\n  left: 50%;\n  top: 100%;\n  width: 2rem;\n  height: 2rem;\n  padding: 0.3rem;\n  border-radius: 0 0 50% 50%;\n  background: #ffec58;\n  text-align: center;\n  color: white;\n  cursor: pointer;\n}\n.player__handle img {\n  -o-object-fit: cover;\n     object-fit: cover;\n  width: 100%;\n  height: 100%;\n  transition: transform 0.3s;\n}\n.player__handle:hover svg {\n  transform: scale(1.2);\n}\n.player__handle::before {\n  content: \"\";\n  z-index: -1;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  transform: translateX(-50%);\n  height: 0.4rem;\n  background: #ffec58;\n}\n.player button {\n  display: inline-block;\n  background: #ffec58;\n  border: none;\n  outline: none;\n  min-height: 100%;\n  color: white;\n  margin: 0;\n  cursor: pointer;\n  padding: 0.3125rem;\n  transition: background-color 0.3s ease-out;\n}\n.player button:hover {\n  background: #ffd258;\n}\n.player button img {\n  -o-object-fit: cover;\n     object-fit: cover;\n  -o-object-position: center;\n     object-position: center;\n  height: 60%;\n}\n.player .pause {\n  display: none;\n}\n.player .progressBarContainer {\n  position: relative;\n  background: #f7f3f0;\n  min-height: 100%;\n  width: 100%;\n  cursor: pointer;\n}\n.player .progressBar {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 0%;\n  background: #ffec58;\n}\n.player .titre {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  color: black;\n  font-size: 1rem;\n  transform: translate(-50%, -50%);\n  font-style: italic;\n  mix-blend-mode: color-burn;\n}\n.player .duree {\n  position: absolute;\n  right: 1rem;\n  top: 50%;\n  color: black;\n  font-size: 1rem;\n  transform: translate(0, -50%);\n  mix-blend-mode: color-burn;\n}\n\n.window {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  max-width: 400px;\n  background: #f8f6e6;\n  border-radius: 5px 5px 0 0;\n  border: 1px solid #0050e0;\n  font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif;\n}\n.window__handle {\n  display: flex;\n  align-items: center;\n  height: 1.2rem;\n  padding: 0 0.2rem;\n  background: blue;\n  background-image: linear-gradient(45deg, #0050e0, #3890f8);\n  color: white;\n  cursor: move;\n}\n.window__title {\n  font-weight: normal;\n  font-size: 1rem;\n}\n.window__closeBtn {\n  margin-left: auto;\n  height: 1rem;\n  width: auto;\n  line-height: 1rem;\n  vertical-align: middle;\n  aspect-ratio: 1;\n  background: radial-gradient(#e66a4d, #b33615);\n  color: white;\n  border-radius: 2px;\n  font-weight: bolder;\n  border: 1px solid white;\n  cursor: pointer;\n}\n.window__content {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n}\n.window__confirmBtn {\n  padding: 0.2rem 1rem;\n  border-radius: 0;\n  border: 1px solid black;\n  outline: 1px solid grey;\n  outline-offset: -2px;\n  cursor: pointer;\n}", "",{"version":3,"sources":["webpack://./src/_animations.scss","webpack://./src/style.scss","webpack://./src/_locomotive.scss"],"names":[],"mappings":"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","sourcesContent":["@keyframes rebond {\r\n  0% {\r\n    opacity: 0;\r\n    transform: translateY(1 * -500px);\r\n  }\r\n  1% {\r\n    opacity: 1;\r\n  }\r\n\r\n  16% {\r\n    transform: translateY(-0.32 * -500px);\r\n  }\r\n\r\n  28% {\r\n    transform: translateY(0.13 * -500px);\r\n  }\r\n\r\n  44% {\r\n    transform: translateY(-0.05 * -500px);\r\n  }\r\n\r\n  59% {\r\n    transform: translateY(0.02 * -500px);\r\n  }\r\n\r\n  73% {\r\n    transform: translateY(-0.01 * -500px);\r\n  }\r\n\r\n  88% {\r\n    transform: translateY(0 * -500px);\r\n  }\r\n\r\n  100% {\r\n    opacity: 1;\r\n    transform: translateY(0 * -500px);\r\n  }\r\n}\r\n\r\n@keyframes rot {\r\n  0% {\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n@keyframes float {\r\n  0% {\r\n    filter: drop-shadow(0 5px 14px rgba(0, 0, 0, 0.3));\r\n    transform: translatey(0px) scale(1);\r\n  }\r\n  50% {\r\n    filter: drop-shadow(0 35px 14px rgba(0, 0, 0, 0.5));\r\n    transform: translatey(-30px) scale(1.03);\r\n  }\r\n  100% {\r\n    filter: drop-shadow(0 5px 14px rgba(0, 0, 0, 0.3));\r\n    transform: translatey(0px) scale(1);\r\n  }\r\n}\r\n\r\n@keyframes blop {\r\n  0% {\r\n    opacity: 0;\r\n    transform: scale(1 * 1 + 1);\r\n  }\r\n  1% {\r\n    opacity: 1;\r\n  }\r\n\r\n  16% {\r\n    transform: scale(-0.32 * 1 + 1);\r\n  }\r\n\r\n  28% {\r\n    transform: scale(0.13 * 1 + 1);\r\n  }\r\n\r\n  44% {\r\n    transform: scale(-0.05 * 1 + 1);\r\n  }\r\n\r\n  59% {\r\n    transform: scale(0.02 * 1 + 1);\r\n  }\r\n\r\n  73% {\r\n    transform: scale(-0.01 * 1 + 1);\r\n  }\r\n\r\n  88% {\r\n    transform: scale(0 * 1 + 1);\r\n  }\r\n\r\n  100% {\r\n    opacity: 1;\r\n    transform: scale(0 * 1 + 1);\r\n  }\r\n}\r\n","@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\r\n@import 'animations';\r\n@import 'locomotive';\r\n*,\r\n*::before,\r\n*::after {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\nbody {\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: sans-serif;\r\n  background-color: blueviolet;\r\n  // background: linear-gradient(blueviolet, #ff6767);\r\n  background: linear-gradient(plum, blueviolet);\r\n  overflow: hidden;\r\n}\r\n\r\n.distort {\r\n  display: none;\r\n}\r\n\r\n.panel {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  display: grid;\r\n  place-items: center;\r\n  overflow: hidden;\r\n  white-space: normal;\r\n}\r\na,\r\na:visited {\r\n  color: blue;\r\n}\r\n\r\n.postit {\r\n  & > div {\r\n    padding: 1.5rem 1.5rem 0 1.5rem;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: flex-end;\r\n    text-align: justify;\r\n    -webkit-box-shadow: 5px 5px 15px 5px #000000;\r\n    box-shadow: 5px -5px 10px 2px rgba(0, 0, 0, 0.7);\r\n  }\r\n  &__closeBtn {\r\n    background: none;\r\n    border: none;\r\n    font-weight: 800;\r\n    cursor: pointer;\r\n    position: absolute;\r\n    right: 0.3rem;\r\n    top: 0.3rem;\r\n  }\r\n  &::before {\r\n    content: '';\r\n    position: absolute;\r\n    left: 0;\r\n    top: calc(100% - 1px);\r\n    width: calc(100% - 1.5rem);\r\n    height: 1.5rem;\r\n    background: inherit;\r\n  }\r\n  &::after {\r\n    content: '';\r\n    position: absolute;\r\n    right: 0;\r\n    top: 100%;\r\n    height: 0;\r\n    width: 0;\r\n    border-top: 1.5rem solid #f1d600;\r\n    border-right: 1.5rem solid transparent;\r\n  }\r\n}\r\n\r\n.accueil {\r\n  height: 100vh;\r\n  &__title {\r\n    position: absolute;\r\n    left: 1rem;\r\n    top: 85vh;\r\n    font-size: 4rem;\r\n    font-weight: 800;\r\n    font-family: Georgia, 'Times New Roman', Times, serif;\r\n    color: rgb(0, 0, 0);\r\n    font-style: italic;\r\n    text-decoration: underline wavy #ffec58;\r\n    transform-origin: center;\r\n    text-transform: uppercase;\r\n    z-index: 1;\r\n    span {\r\n      display: inline-block;\r\n      position: absolute;\r\n      left: 0;\r\n      top: 0;\r\n      right: 0;\r\n      bottom: 0;\r\n      color: transparent;\r\n      text-align: justify;\r\n      &::after {\r\n        content: '';\r\n        display: inline-block;\r\n        width: 100%;\r\n      }\r\n      // pointer-events: none;\r\n      &::selection {\r\n        background: red;\r\n        color: white;\r\n      }\r\n    }\r\n  }\r\n  display: grid;\r\n  place-items: center;\r\n  img {\r\n    animation: rebond 1s linear 0.1s 1 both;\r\n  }\r\n  .postit {\r\n    z-index: 10;\r\n    max-width: 20%;\r\n    position: absolute;\r\n    right: 2rem;\r\n    top: 2rem;\r\n    background: #ffec58;\r\n    font-family: Georgia, 'Times New Roman', Times, serif;\r\n    & > div {\r\n      padding: 1rem 1rem 5rem 1rem;\r\n    }\r\n    h3 {\r\n      font-size: 1.5rem;\r\n      font-style: italic;\r\n      text-align: center;\r\n      margin-top: 0.5rem;\r\n    }\r\n    ul {\r\n      text-align: left;\r\n      font-style: italic;\r\n      list-style: none;\r\n      // margin: 1rem auto 0 auto;\r\n    }\r\n    span {\r\n      text-decoration: line-through 1px black;\r\n    }\r\n  }\r\n}\r\n\r\n.intro {\r\n  position: relative;\r\n  grid-template-columns: repeat(12, 1fr);\r\n  &__critique {\r\n    grid-column: 2 / span 6;\r\n    grid-row: 1;\r\n    transform: rotate(10deg);\r\n    img {\r\n      max-width: 100%;\r\n    }\r\n  }\r\n  .postit--fanny {\r\n    position: relative;\r\n    background-color: #ffec58;\r\n    max-width: 300px;\r\n    z-index: 1;\r\n    grid-column: 6 / span 3;\r\n    grid-row: 1;\r\n    &::after {\r\n      border-top-color: darken(#ffec58, 20%);\r\n    }\r\n  }\r\n  .postit--tristan {\r\n    background-color: #bff5e6;\r\n    grid-column: 7 / span 4;\r\n    grid-row: 1;\r\n    transform: rotate(-5deg);\r\n    font-size: 0.8rem;\r\n    width: 90%;\r\n    // max-height: 100%;\r\n    // overflow: hidden;\r\n    &::after {\r\n      border-top-color: #6883a1;\r\n    }\r\n  }\r\n}\r\n\r\n.album {\r\n  grid-template-columns: repeat(12, 1fr);\r\n  .pochette {\r\n    grid-row: 1;\r\n    grid-column: 3 / span 4;\r\n    transform: rotate(5deg);\r\n    img {\r\n      max-width: 100%;\r\n      // animation: rebond 0.8s ease-out 0.5s 1 both paused;\r\n    }\r\n  }\r\n\r\n  .cd {\r\n    grid-row: 1;\r\n    grid-column: 7 / span 3;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    z-index: 1;\r\n    &__imgContainer {\r\n      width: 100%;\r\n      img {\r\n        max-width: 100%;\r\n        // animation: rebond 0.8s ease-out 0s 1 both paused;\r\n      }\r\n    }\r\n    &__infos {\r\n      text-align: center;\r\n      line-height: 1.2;\r\n      b {\r\n        font-size: 1.2rem;\r\n      }\r\n      p {\r\n        text-align: justify;\r\n      }\r\n      a,\r\n      a:visited {\r\n        color: blue;\r\n        font-weight: 600;\r\n        font-size: 1.5rem;\r\n        font-style: italic;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.clips {\r\n  grid-template-columns: repeat(12, 1fr);\r\n  grid-template-rows: repeat(2, 1fr);\r\n  place-content: center;\r\n  .clip {\r\n    position: relative;\r\n    width: 100%;\r\n    display: grid;\r\n    place-items: center;\r\n    border-radius: 5px;\r\n    overflow: hidden;\r\n    background: linear-gradient(black, white 90%);\r\n    &__player {\r\n      position: absolute;\r\n      left: 50%;\r\n      top: 50%;\r\n      transform: translate(-50%, -75%);\r\n      background: black;\r\n      opacity: 0.8;\r\n      border-radius: 50% / 10%;\r\n      font-size: 1rem; /* change this to change size */\r\n      height: 3em;\r\n      margin: 20px auto;\r\n      padding: 0;\r\n      text-align: center;\r\n      text-indent: 0.1em;\r\n      transition: all 150ms ease-out;\r\n      width: 4em;\r\n      cursor: pointer;\r\n      &::before {\r\n        background: inherit;\r\n        border-radius: 5% / 50%;\r\n        bottom: 9%;\r\n        content: '';\r\n        left: -5%;\r\n        position: absolute;\r\n        right: -5%;\r\n        top: 9%;\r\n      }\r\n      &::after {\r\n        border-style: solid;\r\n        border-width: 1em 0 1em 1.732em;\r\n        border-color: transparent transparent transparent rgba(255, 255, 255, 1);\r\n        content: ' ';\r\n        font-size: 0.75em;\r\n        height: 0;\r\n        margin: -1em 0 0 -0.75em;\r\n        top: 50%;\r\n        position: absolute;\r\n        width: 0;\r\n      }\r\n    }\r\n    img {\r\n      object-fit: cover;\r\n      width: 100%;\r\n      display: block;\r\n    }\r\n    &:nth-child(1) {\r\n      grid-column: 3 / span 4;\r\n      grid-row: 1;\r\n      align-self: flex-end;\r\n    }\r\n    &:nth-child(2) {\r\n      grid-column: 7 / span 4;\r\n      grid-row: 1;\r\n      align-self: flex-end;\r\n    }\r\n    &:nth-child(3) {\r\n      grid-column: 2 / span 4;\r\n      grid-row: 2;\r\n      align-self: flex-start;\r\n    }\r\n    &:nth-child(4) {\r\n      grid-column: 8 / span 4;\r\n      grid-row: 2;\r\n      align-self: flex-start;\r\n    }\r\n    &:nth-child(5) {\r\n      grid-column: 5 / span 4;\r\n      grid-row: 2;\r\n      align-self: flex-start;\r\n    }\r\n    &:hover {\r\n      z-index: 10;\r\n      img {\r\n        opacity: 0.4;\r\n      }\r\n      .clip__player {\r\n        background: red;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.vin {\r\n  grid-template-columns: repeat(12, 1fr);\r\n  grid-template-rows: repeat(12, 1fr);\r\n  &__paroles {\r\n    &:nth-child(1) {\r\n      grid-row: 3 / span 8;\r\n      grid-column: 2 / span 3;\r\n      transform: rotate(-5deg);\r\n    }\r\n    &:nth-child(2) {\r\n      grid-row: 4 / span 8;\r\n      grid-column: 4 / span 3;\r\n      transform: rotate(-5deg);\r\n    }\r\n    &:nth-child(3) {\r\n      grid-row: 3 / span 8;\r\n      grid-column: 5 / span 3;\r\n      transform: rotate(10deg);\r\n    }\r\n    &:nth-child(4) {\r\n      grid-row: 2 / span 8;\r\n      grid-column: 8 / span 3;\r\n      transform: rotate(10deg);\r\n    }\r\n    img {\r\n      max-width: 100%;\r\n    }\r\n  }\r\n  &__bouteille {\r\n    grid-column: 7 / span 2;\r\n    grid-row: 3 / span 8;\r\n    z-index: 1;\r\n    img {\r\n      max-width: 100%;\r\n    }\r\n  }\r\n  &__texte {\r\n    grid-column: 9 / span 2;\r\n    grid-row: 10 / span 2;\r\n    font-weight: 800;\r\n    font-style: italic;\r\n  }\r\n}\r\n\r\n.photos {\r\n  display: grid;\r\n  grid-template-columns: repeat(12, 1fr);\r\n  grid-template-rows: repeat(6, 1fr);\r\n  &__imgContainer {\r\n    background: black;\r\n    position: relative;\r\n    width: 100%;\r\n    max-height: 100%;\r\n    border-radius: 5px;\r\n    overflow: hidden;\r\n    cursor: pointer;\r\n    &:nth-child(1) {\r\n      grid-column: 2 / span 4;\r\n      grid-row: 2 / span 3;\r\n      // transform: rotate(-8deg);\r\n    }\r\n    &:nth-child(2) {\r\n      grid-column: 8 / span 4;\r\n      grid-row: 3 / span 3;\r\n      // transform: rotate(5deg);\r\n      z-index: 1;\r\n    }\r\n    &:nth-child(3) {\r\n      grid-column: 6 / span 3;\r\n      grid-row: 1 / span 5;\r\n      // transform: rotate(6deg);\r\n    }\r\n    img {\r\n      transition: opacity 0.3s ease-out;\r\n      object-fit: cover;\r\n      width: 100%;\r\n      display: block;\r\n      // display: none;\r\n    }\r\n    &:hover,\r\n    &:focus {\r\n      z-index: 10;\r\n      img {\r\n        opacity: 0.4;\r\n      }\r\n    }\r\n    figcaption {\r\n      position: absolute;\r\n      display: block;\r\n      left: 0;\r\n      top: 0;\r\n      width: 100%;\r\n      height: 100%;\r\n      opacity: 1;\r\n      color: white;\r\n      font-family: Georgia, 'Times New Roman', Times, serif;\r\n      display: grid;\r\n      place-items: center;\r\n      text-align: justify;\r\n      transform-origin: center center;\r\n      transform: scale(0);\r\n      transition: transform 0.3s ease-out;\r\n      p {\r\n        width: 70%;\r\n        aspect-ratio: 1;\r\n        padding: 1rem;\r\n        // border: 1px solid white;\r\n        display: grid;\r\n        place-items: center;\r\n      }\r\n    }\r\n    &:hover,\r\n    &:focus {\r\n      figcaption {\r\n        transform: scale(1);\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.tapis {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  &__card {\r\n    height: 80%;\r\n    display: flex;\r\n    flex-direction: column;\r\n  }\r\n  &__imgContainer {\r\n    height: 100%;\r\n    animation: float 6s ease-in-out infinite;\r\n    // filter: drop-shadow(0 25px 14px rgba(0, 0, 0, 0.6));\r\n    // transform: translatey(-20px);\r\n  }\r\n  &__infos {\r\n    font-family: Georgia, 'Times New Roman', Times, serif;\r\n    font-style: italic;\r\n    span {\r\n      text-decoration: line-through 1px black;\r\n    }\r\n  }\r\n}\r\n\r\n.promo {\r\n  display: grid;\r\n  grid-template-rows: repeat(6, 1fr);\r\n  grid-template-rows: repeat(6, 1fr);\r\n  justify-content: center;\r\n  padding: 1rem 0;\r\n  &__imgContainer {\r\n    position: relative;\r\n    width: 100%;\r\n    height: 100%;\r\n    img {\r\n      object-fit: cover;\r\n      max-width: 100%;\r\n      height: 100%;\r\n    }\r\n    &:nth-child(1) {\r\n      grid-column: 2 / span 4;\r\n      grid-row: 1 / span 3;\r\n      z-index: 1;\r\n      img {\r\n        display: block;\r\n        margin-left: auto;\r\n        opacity: 0;\r\n        &.is-inview {\r\n          animation: blop 1s linear 0.5s 1 both;\r\n        }\r\n      }\r\n    }\r\n    &:nth-child(2) {\r\n      grid-column: 1 / span 4;\r\n      grid-row: 2 / span 6;\r\n      align-self: center;\r\n      height: 80%;\r\n      img {\r\n        transform: rotate(-5deg);\r\n      }\r\n    }\r\n  }\r\n  &__code {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    background: red;\r\n  }\r\n}\r\n\r\n.contact {\r\n  font-family: Georgia, 'Times New Roman', Times, serif;\r\n  &__form {\r\n    position: relative;\r\n    input,\r\n    label,\r\n    textarea {\r\n      display: block;\r\n      line-height: 2;\r\n    }\r\n    [type='text'],\r\n    [type='email'],\r\n    textarea {\r\n      width: 100%;\r\n      background: #b9b8b8;\r\n      border: none;\r\n      outline: none;\r\n      resize: none;\r\n      padding: 0.3rem;\r\n    }\r\n    label {\r\n      font-style: italic;\r\n    }\r\n    [type='submit'] {\r\n      float: right;\r\n      margin-top: 1rem;\r\n      padding: 0 0.3rem;\r\n      border-radius: 3px;\r\n      font-family: Georgia, 'Times New Roman', Times, serif;\r\n      font-style: italic;\r\n      border: none;\r\n      outline: none;\r\n      cursor: pointer;\r\n      background: #d7d7d7;\r\n      box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.3);\r\n    }\r\n  }\r\n  &__timbre {\r\n    position: absolute;\r\n    top: -2rem;\r\n    right: 0;\r\n    max-height: 7rem;\r\n    transform: translate(200px, -50px) rotate(-80deg);\r\n    opacity: 0;\r\n    transition: transform 1.6s cubic-bezier(0.34, 1.56, 0.64, 1);\r\n    &.is-inview {\r\n      opacity: 1;\r\n      transform: translate(0, 0) rotate(0);\r\n    }\r\n  }\r\n}\r\n\r\n.footer {\r\n  &__container {\r\n    position: relative;\r\n    padding: 1rem;\r\n    height: 90%;\r\n    text-align: justify;\r\n    aspect-ratio: 1/1;\r\n    display: grid;\r\n    place-items: center;\r\n  }\r\n  &__text {\r\n    position: relative;\r\n    max-width: 70%;\r\n    font-family: Georgia, 'Times New Roman', Times, serif;\r\n  }\r\n  &__imgContainer {\r\n    position: absolute;\r\n    left: 0;\r\n    right: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n    z-index: -1;\r\n    animation: rot 10s ease-in-out 0.3s infinite both;\r\n    img {\r\n      object-fit: cover;\r\n      width: 100%;\r\n      height: 100%;\r\n      pointer-events: none;\r\n    }\r\n  }\r\n}\r\n\r\n.player {\r\n  position: fixed;\r\n  left: 0;\r\n  right: 0;\r\n  top: -3.4rem;\r\n  transform: translateY(0%);\r\n  background: #ece296;\r\n  display: flex;\r\n  align-items: stretch;\r\n  font-size: 0;\r\n  transition: transform 0.3s ease;\r\n  &.visible {\r\n    transform: translateY(100%);\r\n  }\r\n  &__handle {\r\n    position: absolute;\r\n    left: 50%;\r\n    top: 100%;\r\n    width: 2rem;\r\n    height: 2rem;\r\n    padding: 0.3rem;\r\n    border-radius: 0 0 50% 50%;\r\n    background: #ffec58;\r\n    text-align: center;\r\n    color: white;\r\n    cursor: pointer;\r\n    img {\r\n      object-fit: cover;\r\n      width: 100%;\r\n      height: 100%;\r\n      transition: transform 0.3s;\r\n    }\r\n    &:hover {\r\n      svg {\r\n        transform: scale(1.2);\r\n      }\r\n    }\r\n    &::before {\r\n      content: '';\r\n      z-index: -1;\r\n      position: absolute;\r\n      left: 0;\r\n      top: 0;\r\n      width: 100vw;\r\n      transform: translateX(-50%);\r\n      height: 0.4rem;\r\n      background: #ffec58;\r\n    }\r\n  }\r\n  button {\r\n    display: inline-block;\r\n    background: #ffec58;\r\n    border: none;\r\n    outline: none;\r\n    min-height: 100%;\r\n    // width: 3rem;\r\n    color: white;\r\n    margin: 0;\r\n    cursor: pointer;\r\n    padding: 0.3125rem;\r\n    transition: background-color 0.3s ease-out;\r\n    &:hover {\r\n      background: #ffd258;\r\n    }\r\n    img {\r\n      object-fit: cover;\r\n      object-position: center;\r\n      height: 60%;\r\n    }\r\n  }\r\n  .pause {\r\n    display: none;\r\n  }\r\n  .progressBarContainer {\r\n    position: relative;\r\n    background: #f7f3f0;\r\n    min-height: 100%;\r\n    width: 100%;\r\n    cursor: pointer;\r\n  }\r\n  .progressBar {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n    width: 0%;\r\n    background: #ffec58;\r\n  }\r\n  .titre {\r\n    position: absolute;\r\n    left: 50%;\r\n    top: 50%;\r\n    color: black;\r\n    font-size: 1rem;\r\n    transform: translate(-50%, -50%);\r\n    font-style: italic;\r\n    mix-blend-mode: color-burn;\r\n  }\r\n  .duree {\r\n    position: absolute;\r\n    right: 1rem;\r\n    top: 50%;\r\n    color: black;\r\n    font-size: 1rem;\r\n    transform: translate(0, -50%);\r\n    mix-blend-mode: color-burn;\r\n  }\r\n}\r\n\r\n.window {\r\n  position: absolute;\r\n  left: 50%;\r\n  top: 50%;\r\n  max-width: 400px;\r\n  background: #f8f6e6;\r\n  border-radius: 5px 5px 0 0;\r\n  border: 1px solid #0050e0;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  &__handle {\r\n    display: flex;\r\n    align-items: center;\r\n    height: 1.2rem;\r\n    padding: 0 0.2rem;\r\n    background: blue;\r\n    background-image: linear-gradient(45deg, #0050e0, #3890f8);\r\n    color: white;\r\n    cursor: move;\r\n  }\r\n  &__title {\r\n    font-weight: normal;\r\n    font-size: 1rem;\r\n  }\r\n  &__closeBtn {\r\n    margin-left: auto;\r\n    height: 1rem;\r\n    width: auto;\r\n    line-height: 1rem;\r\n    vertical-align: middle;\r\n    aspect-ratio: 1;\r\n    background: radial-gradient(#e66a4d, #b33615);\r\n    color: white;\r\n    border-radius: 2px;\r\n    font-weight: bolder;\r\n    border: 1px solid white;\r\n    cursor: pointer;\r\n  }\r\n  &__content {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 1rem;\r\n    padding: 1rem;\r\n  }\r\n  &__confirmBtn {\r\n    padding: 0.2rem 1rem;\r\n    border-radius: 0;\r\n    border: 1px solid black;\r\n    outline: 1px solid grey;\r\n    outline-offset: -2px;\r\n    cursor: pointer;\r\n  }\r\n}\r\n","/*! locomotive-scroll v4.1.1 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */\r\nhtml.has-scroll-smooth {\r\n  overflow: hidden;\r\n}\r\n\r\nhtml.has-scroll-dragging {\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n}\r\n\r\n.has-scroll-smooth body {\r\n  overflow: hidden;\r\n}\r\n\r\n.has-scroll-smooth [data-scroll-container] {\r\n  min-height: 100vh;\r\n}\r\n\r\n[data-scroll-direction='horizontal'] [data-scroll-container] {\r\n  height: 100vh;\r\n  display: inline-block;\r\n  white-space: nowrap;\r\n}\r\n\r\n[data-scroll-direction='horizontal'] [data-scroll-section] {\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  white-space: nowrap;\r\n  height: 100%;\r\n}\r\n\r\n.c-scrollbar {\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  width: 11px;\r\n  height: 100%;\r\n  transform-origin: center right;\r\n  transition: transform 0.3s, opacity 0.3s;\r\n  opacity: 0;\r\n}\r\n.c-scrollbar:hover {\r\n  transform: scaleX(1.45);\r\n}\r\n.c-scrollbar:hover,\r\n.has-scroll-scrolling .c-scrollbar,\r\n.has-scroll-dragging .c-scrollbar {\r\n  opacity: 1;\r\n}\r\n[data-scroll-direction='horizontal'] .c-scrollbar {\r\n  width: 100%;\r\n  height: 10px;\r\n  top: auto;\r\n  bottom: 0;\r\n  transform: scaleY(1);\r\n}\r\n[data-scroll-direction='horizontal'] .c-scrollbar:hover {\r\n  transform: scaleY(1.3);\r\n}\r\n\r\n.c-scrollbar_thumb {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  background-color: black;\r\n  opacity: 0.5;\r\n  width: 7px;\r\n  border-radius: 10px;\r\n  margin: 2px;\r\n  cursor: -webkit-grab;\r\n  cursor: grab;\r\n}\r\n.has-scroll-dragging .c-scrollbar_thumb {\r\n  cursor: -webkit-grabbing;\r\n  cursor: grabbing;\r\n}\r\n[data-scroll-direction='horizontal'] .c-scrollbar_thumb {\r\n  right: auto;\r\n  bottom: 0;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var _i = 0; _i < this.length; _i++) {
        var id = this[_i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i2 = 0; _i2 < modules.length; _i2++) {
      var item = [].concat(modules[_i2]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/locomotive-scroll/dist/locomotive-scroll.esm.js":
/*!**********************************************************************!*\
  !*** ./node_modules/locomotive-scroll/dist/locomotive-scroll.esm.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "Native": () => (/* binding */ Native),
/* harmony export */   "Smooth": () => (/* binding */ Smooth)
/* harmony export */ });
/* locomotive-scroll v4.1.1 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var defaults = {
  el: document,
  name: 'scroll',
  offset: [0, 0],
  repeat: false,
  smooth: false,
  initPosition: {
    x: 0,
    y: 0
  },
  direction: 'vertical',
  gestureDirection: 'vertical',
  reloadOnContextChange: false,
  lerp: 0.1,
  "class": 'is-inview',
  scrollbarContainer: false,
  scrollbarClass: 'c-scrollbar',
  scrollingClass: 'has-scroll-scrolling',
  draggingClass: 'has-scroll-dragging',
  smoothClass: 'has-scroll-smooth',
  initClass: 'has-scroll-init',
  getSpeed: false,
  getDirection: false,
  scrollFromAnywhere: false,
  multiplier: 1,
  firefoxMultiplier: 50,
  touchMultiplier: 2,
  resetNativeScroll: true,
  tablet: {
    smooth: false,
    direction: 'vertical',
    gestureDirection: 'vertical',
    breakpoint: 1024
  },
  smartphone: {
    smooth: false,
    direction: 'vertical',
    gestureDirection: 'vertical'
  }
};

var _default = /*#__PURE__*/function () {
  function _default() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, _default);

    Object.assign(this, defaults, options);
    this.smartphone = defaults.smartphone;
    if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
    this.tablet = defaults.tablet;
    if (options.tablet) Object.assign(this.tablet, options.tablet);
    this.namespace = 'locomotive';
    this.html = document.documentElement;
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    this.windowMiddle = {
      x: this.windowWidth / 2,
      y: this.windowHeight / 2
    };
    this.els = {};
    this.currentElements = {};
    this.listeners = {};
    this.hasScrollTicking = false;
    this.hasCallEventSet = false;
    this.checkScroll = this.checkScroll.bind(this);
    this.checkResize = this.checkResize.bind(this);
    this.checkEvent = this.checkEvent.bind(this);
    this.instance = {
      scroll: {
        x: 0,
        y: 0
      },
      limit: {
        x: this.html.offsetWidth,
        y: this.html.offsetHeight
      },
      currentElements: this.currentElements
    };

    if (this.isMobile) {
      if (this.isTablet) {
        this.context = 'tablet';
      } else {
        this.context = 'smartphone';
      }
    } else {
      this.context = 'desktop';
    }

    if (this.isMobile) this.direction = this[this.context].direction;

    if (this.direction === 'horizontal') {
      this.directionAxis = 'x';
    } else {
      this.directionAxis = 'y';
    }

    if (this.getDirection) {
      this.instance.direction = null;
    }

    if (this.getDirection) {
      this.instance.speed = 0;
    }

    this.html.classList.add(this.initClass);
    window.addEventListener('resize', this.checkResize, false);
  }

  _createClass(_default, [{
    key: "init",
    value: function init() {
      this.initEvents();
    }
  }, {
    key: "checkScroll",
    value: function checkScroll() {
      this.dispatchScroll();
    }
  }, {
    key: "checkResize",
    value: function checkResize() {
      var _this = this;

      if (!this.resizeTick) {
        this.resizeTick = true;
        requestAnimationFrame(function () {
          _this.resize();

          _this.resizeTick = false;
        });
      }
    }
  }, {
    key: "resize",
    value: function resize() {}
  }, {
    key: "checkContext",
    value: function checkContext() {
      if (!this.reloadOnContextChange) return;
      this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 || this.windowWidth < this.tablet.breakpoint;
      this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint;
      var oldContext = this.context;

      if (this.isMobile) {
        if (this.isTablet) {
          this.context = 'tablet';
        } else {
          this.context = 'smartphone';
        }
      } else {
        this.context = 'desktop';
      }

      if (oldContext != this.context) {
        var oldSmooth = oldContext == 'desktop' ? this.smooth : this[oldContext].smooth;
        var newSmooth = this.context == 'desktop' ? this.smooth : this[this.context].smooth;
        if (oldSmooth != newSmooth) window.location.reload();
      }
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]"));
      this.setScrollTo = this.setScrollTo.bind(this);
      this.scrollToEls.forEach(function (el) {
        el.addEventListener('click', _this2.setScrollTo, false);
      });
    }
  }, {
    key: "setScrollTo",
    value: function setScrollTo(event) {
      event.preventDefault();
      this.scrollTo(event.currentTarget.getAttribute("data-".concat(this.name, "-href")) || event.currentTarget.getAttribute('href'), {
        offset: event.currentTarget.getAttribute("data-".concat(this.name, "-offset"))
      });
    }
  }, {
    key: "addElements",
    value: function addElements() {}
  }, {
    key: "detectElements",
    value: function detectElements(hasCallEventSet) {
      var _this3 = this;

      var scrollTop = this.instance.scroll.y;
      var scrollBottom = scrollTop + this.windowHeight;
      var scrollLeft = this.instance.scroll.x;
      var scrollRight = scrollLeft + this.windowWidth;
      Object.entries(this.els).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            i = _ref2[0],
            el = _ref2[1];

        if (el && (!el.inView || hasCallEventSet)) {
          if (_this3.direction === 'horizontal') {
            if (scrollRight >= el.left && scrollLeft < el.right) {
              _this3.setInView(el, i);
            }
          } else {
            if (scrollBottom >= el.top && scrollTop < el.bottom) {
              _this3.setInView(el, i);
            }
          }
        }

        if (el && el.inView) {
          if (_this3.direction === 'horizontal') {
            var width = el.right - el.left;
            el.progress = (_this3.instance.scroll.x - (el.left - _this3.windowWidth)) / (width + _this3.windowWidth);

            if (scrollRight < el.left || scrollLeft > el.right) {
              _this3.setOutOfView(el, i);
            }
          } else {
            var height = el.bottom - el.top;
            el.progress = (_this3.instance.scroll.y - (el.top - _this3.windowHeight)) / (height + _this3.windowHeight);

            if (scrollBottom < el.top || scrollTop > el.bottom) {
              _this3.setOutOfView(el, i);
            }
          }
        }
      }); // this.els = this.els.filter((current, i) => {
      //     return current !== null;
      // });

      this.hasScrollTicking = false;
    }
  }, {
    key: "setInView",
    value: function setInView(current, i) {
      this.els[i].inView = true;
      current.el.classList.add(current["class"]);
      this.currentElements[i] = current;

      if (current.call && this.hasCallEventSet) {
        this.dispatchCall(current, 'enter');

        if (!current.repeat) {
          this.els[i].call = false;
        }
      } // if (!current.repeat && !current.speed && !current.sticky) {
      //     if (!current.call || current.call && this.hasCallEventSet) {
      //        this.els[i] = null
      //     }
      // }

    }
  }, {
    key: "setOutOfView",
    value: function setOutOfView(current, i) {
      var _this4 = this;

      // if (current.repeat || current.speed !== undefined) {
      this.els[i].inView = false; // }

      Object.keys(this.currentElements).forEach(function (el) {
        el === i && delete _this4.currentElements[el];
      });

      if (current.call && this.hasCallEventSet) {
        this.dispatchCall(current, 'exit');
      }

      if (current.repeat) {
        current.el.classList.remove(current["class"]);
      }
    }
  }, {
    key: "dispatchCall",
    value: function dispatchCall(current, way) {
      this.callWay = way;
      this.callValue = current.call.split(',').map(function (item) {
        return item.trim();
      });
      this.callObj = current;
      if (this.callValue.length == 1) this.callValue = this.callValue[0];
      var callEvent = new Event(this.namespace + 'call');
      this.el.dispatchEvent(callEvent);
    }
  }, {
    key: "dispatchScroll",
    value: function dispatchScroll() {
      var scrollEvent = new Event(this.namespace + 'scroll');
      this.el.dispatchEvent(scrollEvent);
    }
  }, {
    key: "setEvents",
    value: function setEvents(event, func) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }

      var list = this.listeners[event];
      list.push(func);

      if (list.length === 1) {
        this.el.addEventListener(this.namespace + event, this.checkEvent, false);
      }

      if (event === 'call') {
        this.hasCallEventSet = true;
        this.detectElements(true);
      }
    }
  }, {
    key: "unsetEvents",
    value: function unsetEvents(event, func) {
      if (!this.listeners[event]) return;
      var list = this.listeners[event];
      var index = list.indexOf(func);
      if (index < 0) return;
      list.splice(index, 1);

      if (list.index === 0) {
        this.el.removeEventListener(this.namespace + event, this.checkEvent, false);
      }
    }
  }, {
    key: "checkEvent",
    value: function checkEvent(event) {
      var _this5 = this;

      var name = event.type.replace(this.namespace, '');
      var list = this.listeners[name];
      if (!list || list.length === 0) return;
      list.forEach(function (func) {
        switch (name) {
          case 'scroll':
            return func(_this5.instance);

          case 'call':
            return func(_this5.callValue, _this5.callWay, _this5.callObj);

          default:
            return func();
        }
      });
    }
  }, {
    key: "startScroll",
    value: function startScroll() {}
  }, {
    key: "stopScroll",
    value: function stopScroll() {}
  }, {
    key: "setScroll",
    value: function setScroll(x, y) {
      this.instance.scroll = {
        x: 0,
        y: 0
      };
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this6 = this;

      window.removeEventListener('resize', this.checkResize, false);
      Object.keys(this.listeners).forEach(function (event) {
        _this6.el.removeEventListener(_this6.namespace + event, _this6.checkEvent, false);
      });
      this.listeners = {};
      this.scrollToEls.forEach(function (el) {
        el.removeEventListener('click', _this6.setScrollTo, false);
      });
      this.html.classList.remove(this.initClass);
    }
  }]);

  return _default;
}();

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var smoothscroll = createCommonjsModule(function (module, exports) {
/* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {

  // polyfill
  function polyfill() {
    // aliases
    var w = window;
    var d = document;

    // return if scroll behavior is supported and polyfill is not forced
    if (
      'scrollBehavior' in d.documentElement.style &&
      w.__forceSmoothScrollPolyfill__ !== true
    ) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now =
      w.performance && w.performance.now
        ? w.performance.now.bind(w.performance)
        : Date.now;

    /**
     * indicates if a the current browser is made by Microsoft
     * @method isMicrosoftBrowser
     * @param {String} userAgent
     * @returns {Boolean}
     */
    function isMicrosoftBrowser(userAgent) {
      var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

      return new RegExp(userAgentPatterns.join('|')).test(userAgent);
    }

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (
        firstArg === null ||
        typeof firstArg !== 'object' ||
        firstArg.behavior === undefined ||
        firstArg.behavior === 'auto' ||
        firstArg.behavior === 'instant'
      ) {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError(
        'behavior member of ScrollOptions ' +
          firstArg.behavior +
          ' is not a valid value for enumeration ScrollBehavior.'
      );
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
      }

      if (axis === 'X') {
        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      while (el !== d.body && isScrollable(el) === false) {
        el = el.parentNode || el.host;
      }

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : w.scrollX || w.pageXOffset,
          // use top prop, second argument if present or fallback to scrollY
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
              ? arguments[1]
              : w.scrollY || w.pageYOffset
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : w.scrollX || w.pageXOffset,
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : w.scrollY || w.pageYOffset
      );
    };

    // w.scrollBy
    w.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object' ? arguments[0] : 0,
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined ? arguments[1] : 0
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value could not be converted');
        }

        original.elementScroll.call(
          this,
          // use left prop, first number argument or fallback to scrollLeft
          arguments[0].left !== undefined
            ? ~~arguments[0].left
            : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
          // use top prop, second argument or fallback to scrollTop
          arguments[0].top !== undefined
            ? ~~arguments[0].top
            : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
        );

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        this,
        this,
        typeof left === 'undefined' ? this.scrollLeft : ~~left,
        typeof top === 'undefined' ? this.scrollTop : ~~top
      );
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(
          this,
          arguments[0].left !== undefined
            ? ~~arguments[0].left + this.scrollLeft
            : ~~arguments[0] + this.scrollLeft,
          arguments[0].top !== undefined
            ? ~~arguments[0].top + this.scrollTop
            : ~~arguments[1] + this.scrollTop
        );

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(
          this,
          arguments[0] === undefined ? true : arguments[0]
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(
          this,
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  {
    // commonjs
    module.exports = { polyfill: polyfill };
  }

}());
});
var smoothscroll_1 = smoothscroll.polyfill;

var _default$1 = /*#__PURE__*/function (_Core) {
  _inherits(_default, _Core);

  var _super = _createSuper(_default);

  function _default() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, _default);

    _this = _super.call(this, options);

    if (_this.resetNativeScroll) {
      if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
      }

      window.scrollTo(0, 0);
    }

    window.addEventListener('scroll', _this.checkScroll, false);

    if (window.smoothscrollPolyfill === undefined) {
      window.smoothscrollPolyfill = smoothscroll;
      window.smoothscrollPolyfill.polyfill();
    }

    return _this;
  }

  _createClass(_default, [{
    key: "init",
    value: function init() {
      this.instance.scroll.y = window.pageYOffset;
      this.addElements();
      this.detectElements();

      _get(_getPrototypeOf(_default.prototype), "init", this).call(this);
    }
  }, {
    key: "checkScroll",
    value: function checkScroll() {
      var _this2 = this;

      _get(_getPrototypeOf(_default.prototype), "checkScroll", this).call(this);

      if (this.getDirection) {
        this.addDirection();
      }

      if (this.getSpeed) {
        this.addSpeed();
        this.speedTs = Date.now();
      }

      this.instance.scroll.y = window.pageYOffset;

      if (Object.entries(this.els).length) {
        if (!this.hasScrollTicking) {
          requestAnimationFrame(function () {
            _this2.detectElements();
          });
          this.hasScrollTicking = true;
        }
      }
    }
  }, {
    key: "addDirection",
    value: function addDirection() {
      if (window.pageYOffset > this.instance.scroll.y) {
        if (this.instance.direction !== 'down') {
          this.instance.direction = 'down';
        }
      } else if (window.pageYOffset < this.instance.scroll.y) {
        if (this.instance.direction !== 'up') {
          this.instance.direction = 'up';
        }
      }
    }
  }, {
    key: "addSpeed",
    value: function addSpeed() {
      if (window.pageYOffset != this.instance.scroll.y) {
        this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs);
      } else {
        this.instance.speed = 0;
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      if (Object.entries(this.els).length) {
        this.windowHeight = window.innerHeight;
        this.updateElements();
      }
    }
  }, {
    key: "addElements",
    value: function addElements() {
      var _this3 = this;

      this.els = {};
      var els = this.el.querySelectorAll('[data-' + this.name + ']');
      els.forEach(function (el, index) {
        var BCR = el.getBoundingClientRect();
        var cl = el.dataset[_this3.name + 'Class'] || _this3["class"];
        var id = typeof el.dataset[_this3.name + 'Id'] === 'string' ? el.dataset[_this3.name + 'Id'] : index;
        var top;
        var left;
        var offset = typeof el.dataset[_this3.name + 'Offset'] === 'string' ? el.dataset[_this3.name + 'Offset'].split(',') : _this3.offset;
        var repeat = el.dataset[_this3.name + 'Repeat'];
        var call = el.dataset[_this3.name + 'Call'];
        var target = el.dataset[_this3.name + 'Target'];
        var targetEl;

        if (target !== undefined) {
          targetEl = document.querySelector("".concat(target));
        } else {
          targetEl = el;
        }

        var targetElBCR = targetEl.getBoundingClientRect();
        top = targetElBCR.top + _this3.instance.scroll.y;
        left = targetElBCR.left + _this3.instance.scroll.x;
        var bottom = top + targetEl.offsetHeight;
        var right = left + targetEl.offsetWidth;

        if (repeat == 'false') {
          repeat = false;
        } else if (repeat != undefined) {
          repeat = true;
        } else {
          repeat = _this3.repeat;
        }

        var relativeOffset = _this3.getRelativeOffset(offset);

        top = top + relativeOffset[0];
        bottom = bottom - relativeOffset[1];
        var mappedEl = {
          el: el,
          targetEl: targetEl,
          id: id,
          "class": cl,
          top: top,
          bottom: bottom,
          left: left,
          right: right,
          offset: offset,
          progress: 0,
          repeat: repeat,
          inView: false,
          call: call
        };
        _this3.els[id] = mappedEl;

        if (el.classList.contains(cl)) {
          _this3.setInView(_this3.els[id], id);
        }
      });
    }
  }, {
    key: "updateElements",
    value: function updateElements() {
      var _this4 = this;

      Object.entries(this.els).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            i = _ref2[0],
            el = _ref2[1];

        var top = el.targetEl.getBoundingClientRect().top + _this4.instance.scroll.y;

        var bottom = top + el.targetEl.offsetHeight;

        var relativeOffset = _this4.getRelativeOffset(el.offset);

        _this4.els[i].top = top + relativeOffset[0];
        _this4.els[i].bottom = bottom - relativeOffset[1];
      });
      this.hasScrollTicking = false;
    }
  }, {
    key: "getRelativeOffset",
    value: function getRelativeOffset(offset) {
      var relativeOffset = [0, 0];

      if (offset) {
        for (var i = 0; i < offset.length; i++) {
          if (typeof offset[i] == 'string') {
            if (offset[i].includes('%')) {
              relativeOffset[i] = parseInt(offset[i].replace('%', '') * this.windowHeight / 100);
            } else {
              relativeOffset[i] = parseInt(offset[i]);
            }
          } else {
            relativeOffset[i] = offset[i];
          }
        }
      }

      return relativeOffset;
    }
    /**
     * Scroll to a desired target.
     *
     * @param  Available options :
     *          target {node, string, "top", "bottom", int} - The DOM element we want to scroll to
     *          options {object} - Options object for additionnal settings.
     * @return {void}
     */

  }, {
    key: "scrollTo",
    value: function scrollTo(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Parse options
      var offset = parseInt(options.offset) || 0; // An offset to apply on top of given `target` or `sourceElem`'s target

      var callback = options.callback ? options.callback : false; // function called when scrollTo completes (note that it won't wait for lerp to stabilize)

      if (typeof target === 'string') {
        // Selector or boundaries
        if (target === 'top') {
          target = this.html;
        } else if (target === 'bottom') {
          target = this.html.offsetHeight - window.innerHeight;
        } else {
          target = document.querySelector(target); // If the query fails, abort

          if (!target) {
            return;
          }
        }
      } else if (typeof target === 'number') {
        // Absolute coordinate
        target = parseInt(target);
      } else if (target && target.tagName) ; else {
        console.warn('`target` parameter is not valid');
        return;
      } // We have a target that is not a coordinate yet, get it


      if (typeof target !== 'number') {
        offset = target.getBoundingClientRect().top + offset + this.instance.scroll.y;
      } else {
        offset = target + offset;
      }

      var isTargetReached = function isTargetReached() {
        return parseInt(window.pageYOffset) === parseInt(offset);
      };

      if (callback) {
        if (isTargetReached()) {
          callback();
          return;
        } else {
          var onScroll = function onScroll() {
            if (isTargetReached()) {
              window.removeEventListener('scroll', onScroll);
              callback();
            }
          };

          window.addEventListener('scroll', onScroll);
        }
      }

      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.addElements();
      this.detectElements();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);

      window.removeEventListener('scroll', this.checkScroll, false);
    }
  }]);

  return _default;
}(_default);

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

var tinyEmitter = E;

var lethargy = createCommonjsModule(function (module, exports) {
// Generated by CoffeeScript 1.9.2
(function() {
  var root;

  root =  exports !== null ? exports : this;

  root.Lethargy = (function() {
    function Lethargy(stability, sensitivity, tolerance, delay) {
      this.stability = stability != null ? Math.abs(stability) : 8;
      this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
      this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
      this.delay = delay != null ? delay : 150;
      this.lastUpDeltas = (function() {
        var i, ref, results;
        results = [];
        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
          results.push(null);
        }
        return results;
      }).call(this);
      this.lastDownDeltas = (function() {
        var i, ref, results;
        results = [];
        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
          results.push(null);
        }
        return results;
      }).call(this);
      this.deltasTimestamp = (function() {
        var i, ref, results;
        results = [];
        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
          results.push(null);
        }
        return results;
      }).call(this);
    }

    Lethargy.prototype.check = function(e) {
      var lastDelta;
      e = e.originalEvent || e;
      if (e.wheelDelta != null) {
        lastDelta = e.wheelDelta;
      } else if (e.deltaY != null) {
        lastDelta = e.deltaY * -40;
      } else if ((e.detail != null) || e.detail === 0) {
        lastDelta = e.detail * -40;
      }
      this.deltasTimestamp.push(Date.now());
      this.deltasTimestamp.shift();
      if (lastDelta > 0) {
        this.lastUpDeltas.push(lastDelta);
        this.lastUpDeltas.shift();
        return this.isInertia(1);
      } else {
        this.lastDownDeltas.push(lastDelta);
        this.lastDownDeltas.shift();
        return this.isInertia(-1);
      }
    };

    Lethargy.prototype.isInertia = function(direction) {
      var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
      lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
      if (lastDeltas[0] === null) {
        return direction;
      }
      if (this.deltasTimestamp[(this.stability * 2) - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[(this.stability * 2) - 1]) {
        return false;
      }
      lastDeltasOld = lastDeltas.slice(0, this.stability);
      lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
      oldSum = lastDeltasOld.reduce(function(t, s) {
        return t + s;
      });
      newSum = lastDeltasNew.reduce(function(t, s) {
        return t + s;
      });
      oldAverage = oldSum / lastDeltasOld.length;
      newAverage = newSum / lastDeltasNew.length;
      if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && (this.sensitivity < Math.abs(newAverage))) {
        return direction;
      } else {
        return false;
      }
    };

    Lethargy.prototype.showLastUpDeltas = function() {
      return this.lastUpDeltas;
    };

    Lethargy.prototype.showLastDownDeltas = function() {
      return this.lastDownDeltas;
    };

    return Lethargy;

  })();

}).call(commonjsGlobal);
});

var support = (function getSupport() {
    return {
        hasWheelEvent: 'onwheel' in document,
        hasMouseWheelEvent: 'onmousewheel' in document,
        hasTouch: ('ontouchstart' in window) || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
        hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
        hasPointer: !!window.navigator.msPointerEnabled,
        hasKeyDown: 'onkeydown' in document,
        isFirefox: navigator.userAgent.indexOf('Firefox') > -1
    };
})();

var toString = Object.prototype.toString,
    hasOwnProperty$1 = Object.prototype.hasOwnProperty;

var bindallStandalone = function(object) {
    if(!object) return console.warn('bindAll requires at least one argument.');

    var functions = Array.prototype.slice.call(arguments, 1);

    if (functions.length === 0) {

        for (var method in object) {
            if(hasOwnProperty$1.call(object, method)) {
                if(typeof object[method] == 'function' && toString.call(object[method]) == "[object Function]") {
                    functions.push(method);
                }
            }
        }
    }

    for(var i = 0; i < functions.length; i++) {
        var f = functions[i];
        object[f] = bind(object[f], object);
    }
};

/*
    Faster bind without specific-case checking. (see https://coderwall.com/p/oi3j3w).
    bindAll is only needed for events binding so no need to make slow fixes for constructor
    or partial application.
*/
function bind(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
}

var Lethargy = lethargy.Lethargy;



var EVT_ID = 'virtualscroll';

var src = VirtualScroll;

var keyCodes = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32
};

function VirtualScroll(options) {
    bindallStandalone(this, '_onWheel', '_onMouseWheel', '_onTouchStart', '_onTouchMove', '_onKeyDown');

    this.el = window;
    if (options && options.el) {
        this.el = options.el;
        delete options.el;
    }
    this.options = objectAssign({
        mouseMultiplier: 1,
        touchMultiplier: 2,
        firefoxMultiplier: 15,
        keyStep: 120,
        preventTouch: false,
        unpreventTouchClass: 'vs-touchmove-allowed',
        limitInertia: false,
        useKeyboard: true,
        useTouch: true
    }, options);

    if (this.options.limitInertia) this._lethargy = new Lethargy();

    this._emitter = new tinyEmitter();
    this._event = {
        y: 0,
        x: 0,
        deltaX: 0,
        deltaY: 0
    };
    this.touchStartX = null;
    this.touchStartY = null;
    this.bodyTouchAction = null;

    if (this.options.passive !== undefined) {
        this.listenerOptions = {passive: this.options.passive};
    }
}

VirtualScroll.prototype._notify = function(e) {
    var evt = this._event;
    evt.x += evt.deltaX;
    evt.y += evt.deltaY;

   this._emitter.emit(EVT_ID, {
        x: evt.x,
        y: evt.y,
        deltaX: evt.deltaX,
        deltaY: evt.deltaY,
        originalEvent: e
   });
};

VirtualScroll.prototype._onWheel = function(e) {
    var options = this.options;
    if (this._lethargy && this._lethargy.check(e) === false) return;
    var evt = this._event;

    // In Chrome and in Firefox (at least the new one)
    evt.deltaX = e.wheelDeltaX || e.deltaX * -1;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;

    // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
    // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
    if(support.isFirefox && e.deltaMode == 1) {
        evt.deltaX *= options.firefoxMultiplier;
        evt.deltaY *= options.firefoxMultiplier;
    }

    evt.deltaX *= options.mouseMultiplier;
    evt.deltaY *= options.mouseMultiplier;

    this._notify(e);
};

VirtualScroll.prototype._onMouseWheel = function(e) {
    if (this.options.limitInertia && this._lethargy.check(e) === false) return;

    var evt = this._event;

    // In Safari, IE and in Chrome if 'wheel' isn't defined
    evt.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
    evt.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

    this._notify(e);
};

VirtualScroll.prototype._onTouchStart = function(e) {
    var t = (e.targetTouches) ? e.targetTouches[0] : e;
    this.touchStartX = t.pageX;
    this.touchStartY = t.pageY;
};

VirtualScroll.prototype._onTouchMove = function(e) {
    var options = this.options;
    if(options.preventTouch
        && !e.target.classList.contains(options.unpreventTouchClass)) {
        e.preventDefault();
    }

    var evt = this._event;

    var t = (e.targetTouches) ? e.targetTouches[0] : e;

    evt.deltaX = (t.pageX - this.touchStartX) * options.touchMultiplier;
    evt.deltaY = (t.pageY - this.touchStartY) * options.touchMultiplier;

    this.touchStartX = t.pageX;
    this.touchStartY = t.pageY;

    this._notify(e);
};

VirtualScroll.prototype._onKeyDown = function(e) {
    var evt = this._event;
    evt.deltaX = evt.deltaY = 0;
    var windowHeight = window.innerHeight - 40;

    switch(e.keyCode) {
        case keyCodes.LEFT:
        case keyCodes.UP:
            evt.deltaY = this.options.keyStep;
            break;

        case keyCodes.RIGHT:
        case keyCodes.DOWN:
            evt.deltaY = - this.options.keyStep;
            break;
        case  e.shiftKey:
            evt.deltaY = windowHeight;
            break;
        case keyCodes.SPACE:
            evt.deltaY = - windowHeight;
            break;
        default:
            return;
    }

    this._notify(e);
};

VirtualScroll.prototype._bind = function() {
    if(support.hasWheelEvent) this.el.addEventListener('wheel', this._onWheel, this.listenerOptions);
    if(support.hasMouseWheelEvent) this.el.addEventListener('mousewheel', this._onMouseWheel, this.listenerOptions);

    if(support.hasTouch && this.options.useTouch) {
        this.el.addEventListener('touchstart', this._onTouchStart, this.listenerOptions);
        this.el.addEventListener('touchmove', this._onTouchMove, this.listenerOptions);
    }

    if(support.hasPointer && support.hasTouchWin) {
        this.bodyTouchAction = document.body.style.msTouchAction;
        document.body.style.msTouchAction = 'none';
        this.el.addEventListener('MSPointerDown', this._onTouchStart, true);
        this.el.addEventListener('MSPointerMove', this._onTouchMove, true);
    }

    if(support.hasKeyDown && this.options.useKeyboard) document.addEventListener('keydown', this._onKeyDown);
};

VirtualScroll.prototype._unbind = function() {
    if(support.hasWheelEvent) this.el.removeEventListener('wheel', this._onWheel);
    if(support.hasMouseWheelEvent) this.el.removeEventListener('mousewheel', this._onMouseWheel);

    if(support.hasTouch) {
        this.el.removeEventListener('touchstart', this._onTouchStart);
        this.el.removeEventListener('touchmove', this._onTouchMove);
    }

    if(support.hasPointer && support.hasTouchWin) {
        document.body.style.msTouchAction = this.bodyTouchAction;
        this.el.removeEventListener('MSPointerDown', this._onTouchStart, true);
        this.el.removeEventListener('MSPointerMove', this._onTouchMove, true);
    }

    if(support.hasKeyDown && this.options.useKeyboard) document.removeEventListener('keydown', this._onKeyDown);
};

VirtualScroll.prototype.on = function(cb, ctx) {
  this._emitter.on(EVT_ID, cb, ctx);

  var events = this._emitter.e;
  if (events && events[EVT_ID] && events[EVT_ID].length === 1) this._bind();
};

VirtualScroll.prototype.off = function(cb, ctx) {
  this._emitter.off(EVT_ID, cb, ctx);

  var events = this._emitter.e;
  if (!events[EVT_ID] || events[EVT_ID].length <= 0) this._unbind();
};

VirtualScroll.prototype.reset = function() {
    var evt = this._event;
    evt.x = 0;
    evt.y = 0;
};

VirtualScroll.prototype.destroy = function() {
    this._emitter.off();
    this._unbind();
};

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function getTranslate(el) {
  var translate = {};
  if (!window.getComputedStyle) return;
  var style = getComputedStyle(el);
  var transform = style.transform || style.webkitTransform || style.mozTransform;
  var mat = transform.match(/^matrix3d\((.+)\)$/);

  if (mat) {
    translate.x = mat ? parseFloat(mat[1].split(', ')[12]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[13]) : 0;
  } else {
    mat = transform.match(/^matrix\((.+)\)$/);
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;
  }

  return translate;
}

/**
 * Returns an array containing all the parent nodes of the given node
 * @param  {object} node
 * @return {array} parent nodes
 */
function getParents(elem) {
  // Set up a parent array
  var parents = []; // Push each parent element to the array

  for (; elem && elem !== document; elem = elem.parentNode) {
    parents.push(elem);
  } // Return our parent array


  return parents;
} // https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function LinearEasing (x) {
  return x;
}

var src$1 = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};

var keyCodes$1 = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
  TAB: 9,
  PAGEUP: 33,
  PAGEDOWN: 34,
  HOME: 36,
  END: 35
};

var _default$2 = /*#__PURE__*/function (_Core) {
  _inherits(_default, _Core);

  var _super = _createSuper(_default);

  function _default() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, _default);

    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
    _this = _super.call(this, options);
    if (_this.inertia) _this.lerp = _this.inertia * 0.1;
    _this.isScrolling = false;
    _this.isDraggingScrollbar = false;
    _this.isTicking = false;
    _this.hasScrollTicking = false;
    _this.parallaxElements = {};
    _this.stop = false;
    _this.scrollbarContainer = options.scrollbarContainer;
    _this.checkKey = _this.checkKey.bind(_assertThisInitialized(_this));
    window.addEventListener('keydown', _this.checkKey, false);
    return _this;
  }

  _createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.html.classList.add(this.smoothClass);
      this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction);
      this.instance = _objectSpread2({
        delta: {
          x: this.initPosition.x,
          y: this.initPosition.y
        },
        scroll: {
          x: this.initPosition.x,
          y: this.initPosition.y
        }
      }, this.instance);
      this.vs = new src({
        el: this.scrollFromAnywhere ? document : this.el,
        mouseMultiplier: navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
        firefoxMultiplier: this.firefoxMultiplier,
        touchMultiplier: this.touchMultiplier,
        useKeyboard: false,
        passive: true
      });
      this.vs.on(function (e) {
        if (_this2.stop) {
          return;
        }

        if (!_this2.isDraggingScrollbar) {
          requestAnimationFrame(function () {
            _this2.updateDelta(e);

            if (!_this2.isScrolling) _this2.startScrolling();
          });
        }
      });
      this.setScrollLimit();
      this.initScrollBar();
      this.addSections();
      this.addElements();
      this.checkScroll(true);
      this.transformElements(true, true);

      _get(_getPrototypeOf(_default.prototype), "init", this).call(this);
    }
  }, {
    key: "setScrollLimit",
    value: function setScrollLimit() {
      this.instance.limit.y = this.el.offsetHeight - this.windowHeight;

      if (this.direction === 'horizontal') {
        var totalWidth = 0;
        var nodes = this.el.children;

        for (var i = 0; i < nodes.length; i++) {
          totalWidth += nodes[i].offsetWidth;
        }

        this.instance.limit.x = totalWidth - this.windowWidth;
      }
    }
  }, {
    key: "startScrolling",
    value: function startScrolling() {
      this.startScrollTs = Date.now(); // Record timestamp

      this.isScrolling = true;
      this.checkScroll();
      this.html.classList.add(this.scrollingClass);
    }
  }, {
    key: "stopScrolling",
    value: function stopScrolling() {
      cancelAnimationFrame(this.checkScrollRaf); // Prevent checkScroll to continue looping

      if (this.scrollToRaf) {
        cancelAnimationFrame(this.scrollToRaf);
        this.scrollToRaf = null;
      }

      this.isScrolling = false;
      this.instance.scroll.y = Math.round(this.instance.scroll.y);
      this.html.classList.remove(this.scrollingClass);
    }
  }, {
    key: "checkKey",
    value: function checkKey(e) {
      var _this3 = this;

      if (this.stop) {
        // If we are stopped, we don't want any scroll to occur because of a keypress
        // Prevent tab to scroll to activeElement
        if (e.keyCode == keyCodes$1.TAB) {
          requestAnimationFrame(function () {
            // Make sure native scroll is always at top of page
            _this3.html.scrollTop = 0;
            document.body.scrollTop = 0;
            _this3.html.scrollLeft = 0;
            document.body.scrollLeft = 0;
          });
        }

        return;
      }

      switch (e.keyCode) {
        case keyCodes$1.TAB:
          // Do not remove the RAF
          // It allows to override the browser's native scrollTo, which is essential
          requestAnimationFrame(function () {
            // Make sure native scroll is always at top of page
            _this3.html.scrollTop = 0;
            document.body.scrollTop = 0;
            _this3.html.scrollLeft = 0;
            document.body.scrollLeft = 0; // Request scrollTo on the focusedElement, putting it at the center of the screen

            _this3.scrollTo(document.activeElement, {
              offset: -window.innerHeight / 2
            });
          });
          break;

        case keyCodes$1.UP:
          this.instance.delta[this.directionAxis] -= 240;
          break;

        case keyCodes$1.DOWN:
          this.instance.delta[this.directionAxis] += 240;
          break;

        case keyCodes$1.PAGEUP:
          this.instance.delta[this.directionAxis] -= window.innerHeight;
          break;

        case keyCodes$1.PAGEDOWN:
          this.instance.delta[this.directionAxis] += window.innerHeight;
          break;

        case keyCodes$1.HOME:
          this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis];
          break;

        case keyCodes$1.END:
          this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis];
          break;

        case keyCodes$1.SPACE:
          if (!(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)) {
            if (e.shiftKey) {
              this.instance.delta[this.directionAxis] -= window.innerHeight;
            } else {
              this.instance.delta[this.directionAxis] += window.innerHeight;
            }
          }

          break;

        default:
          return;
      }

      if (this.instance.delta[this.directionAxis] < 0) this.instance.delta[this.directionAxis] = 0;
      if (this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis]) this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis];
      this.stopScrolling(); // Stop any movement, allows to kill any other `scrollTo` still happening

      this.isScrolling = true;
      this.checkScroll();
      this.html.classList.add(this.scrollingClass);
    }
  }, {
    key: "checkScroll",
    value: function checkScroll() {
      var _this4 = this;

      var forced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (forced || this.isScrolling || this.isDraggingScrollbar) {
        if (!this.hasScrollTicking) {
          this.checkScrollRaf = requestAnimationFrame(function () {
            return _this4.checkScroll();
          });
          this.hasScrollTicking = true;
        }

        this.updateScroll();
        var distance = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]);
        var timeSinceStart = Date.now() - this.startScrollTs; // Get the time since the scroll was started: the scroll can be stopped again only past 100ms

        if (!this.animatingScroll && timeSinceStart > 100 && (distance < 0.5 && this.instance.delta[this.directionAxis] != 0 || distance < 0.5 && this.instance.delta[this.directionAxis] == 0)) {
          this.stopScrolling();
        }

        Object.entries(this.sections).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              i = _ref2[0],
              section = _ref2[1];

          if (section.persistent || _this4.instance.scroll[_this4.directionAxis] > section.offset[_this4.directionAxis] && _this4.instance.scroll[_this4.directionAxis] < section.limit[_this4.directionAxis]) {
            if (_this4.direction === 'horizontal') {
              _this4.transform(section.el, -_this4.instance.scroll[_this4.directionAxis], 0);
            } else {
              _this4.transform(section.el, 0, -_this4.instance.scroll[_this4.directionAxis]);
            }

            if (!section.inView) {
              section.inView = true;
              section.el.style.opacity = 1;
              section.el.style.pointerEvents = 'all';
              section.el.setAttribute("data-".concat(_this4.name, "-section-inview"), '');
            }
          } else {
            if (section.inView || forced) {
              section.inView = false;
              section.el.style.opacity = 0;
              section.el.style.pointerEvents = 'none';
              section.el.removeAttribute("data-".concat(_this4.name, "-section-inview"));
            }

            _this4.transform(section.el, 0, 0);
          }
        });

        if (this.getDirection) {
          this.addDirection();
        }

        if (this.getSpeed) {
          this.addSpeed();
          this.speedTs = Date.now();
        }

        this.detectElements();
        this.transformElements();

        if (this.hasScrollbar) {
          var scrollBarTranslation = this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis] * this.scrollBarLimit[this.directionAxis];

          if (this.direction === 'horizontal') {
            this.transform(this.scrollbarThumb, scrollBarTranslation, 0);
          } else {
            this.transform(this.scrollbarThumb, 0, scrollBarTranslation);
          }
        }

        _get(_getPrototypeOf(_default.prototype), "checkScroll", this).call(this);

        this.hasScrollTicking = false;
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      this.checkContext();
      this.windowMiddle = {
        x: this.windowWidth / 2,
        y: this.windowHeight / 2
      };
      this.update();
    }
  }, {
    key: "updateDelta",
    value: function updateDelta(e) {
      var delta;
      var gestureDirection = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection;

      if (gestureDirection === 'both') {
        delta = e.deltaX + e.deltaY;
      } else if (gestureDirection === 'vertical') {
        delta = e.deltaY;
      } else if (gestureDirection === 'horizontal') {
        delta = e.deltaX;
      } else {
        delta = e.deltaY;
      }

      this.instance.delta[this.directionAxis] -= delta * this.multiplier;
      if (this.instance.delta[this.directionAxis] < 0) this.instance.delta[this.directionAxis] = 0;
      if (this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis]) this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis];
    }
  }, {
    key: "updateScroll",
    value: function updateScroll(e) {
      if (this.isScrolling || this.isDraggingScrollbar) {
        this.instance.scroll[this.directionAxis] = lerp(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp);
      } else {
        if (this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis]) {
          this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis]);
        } else if (this.instance.scroll.y < 0) {
          this.setScroll(this.instance.scroll[this.directionAxis], 0);
        } else {
          this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis]);
        }
      }
    }
  }, {
    key: "addDirection",
    value: function addDirection() {
      if (this.instance.delta.y > this.instance.scroll.y) {
        if (this.instance.direction !== 'down') {
          this.instance.direction = 'down';
        }
      } else if (this.instance.delta.y < this.instance.scroll.y) {
        if (this.instance.direction !== 'up') {
          this.instance.direction = 'up';
        }
      }

      if (this.instance.delta.x > this.instance.scroll.x) {
        if (this.instance.direction !== 'right') {
          this.instance.direction = 'right';
        }
      } else if (this.instance.delta.x < this.instance.scroll.x) {
        if (this.instance.direction !== 'left') {
          this.instance.direction = 'left';
        }
      }
    }
  }, {
    key: "addSpeed",
    value: function addSpeed() {
      if (this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis]) {
        this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs);
      } else {
        this.instance.speed = 0;
      }
    }
  }, {
    key: "initScrollBar",
    value: function initScrollBar() {
      this.scrollbar = document.createElement('span');
      this.scrollbarThumb = document.createElement('span');
      this.scrollbar.classList.add("".concat(this.scrollbarClass));
      this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb"));
      this.scrollbar.append(this.scrollbarThumb);

      if (this.scrollbarContainer) {
        this.scrollbarContainer.append(this.scrollbar);
      } else {
        document.body.append(this.scrollbar);
      } // Scrollbar Events


      this.getScrollBar = this.getScrollBar.bind(this);
      this.releaseScrollBar = this.releaseScrollBar.bind(this);
      this.moveScrollBar = this.moveScrollBar.bind(this);
      this.scrollbarThumb.addEventListener('mousedown', this.getScrollBar);
      window.addEventListener('mouseup', this.releaseScrollBar);
      window.addEventListener('mousemove', this.moveScrollBar); // Set scrollbar values

      this.hasScrollbar = false;

      if (this.direction == 'horizontal') {
        if (this.instance.limit.x + this.windowWidth <= this.windowWidth) {
          return;
        }
      } else {
        if (this.instance.limit.y + this.windowHeight <= this.windowHeight) {
          return;
        }
      }

      this.hasScrollbar = true;
      this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
      this.scrollbarHeight = this.scrollbarBCR.height;
      this.scrollbarWidth = this.scrollbarBCR.width;

      if (this.direction === 'horizontal') {
        this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px");
      } else {
        this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px");
      }

      this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
      this.scrollBarLimit = {
        x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
        y: this.scrollbarHeight - this.scrollbarThumbBCR.height
      };
    }
  }, {
    key: "reinitScrollBar",
    value: function reinitScrollBar() {
      this.hasScrollbar = false;

      if (this.direction == 'horizontal') {
        if (this.instance.limit.x + this.windowWidth <= this.windowWidth) {
          return;
        }
      } else {
        if (this.instance.limit.y + this.windowHeight <= this.windowHeight) {
          return;
        }
      }

      this.hasScrollbar = true;
      this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
      this.scrollbarHeight = this.scrollbarBCR.height;
      this.scrollbarWidth = this.scrollbarBCR.width;

      if (this.direction === 'horizontal') {
        this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px");
      } else {
        this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px");
      }

      this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
      this.scrollBarLimit = {
        x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
        y: this.scrollbarHeight - this.scrollbarThumbBCR.height
      };
    }
  }, {
    key: "destroyScrollBar",
    value: function destroyScrollBar() {
      this.scrollbarThumb.removeEventListener('mousedown', this.getScrollBar);
      window.removeEventListener('mouseup', this.releaseScrollBar);
      window.removeEventListener('mousemove', this.moveScrollBar);
      this.scrollbar.remove();
    }
  }, {
    key: "getScrollBar",
    value: function getScrollBar(e) {
      this.isDraggingScrollbar = true;
      this.checkScroll();
      this.html.classList.remove(this.scrollingClass);
      this.html.classList.add(this.draggingClass);
    }
  }, {
    key: "releaseScrollBar",
    value: function releaseScrollBar(e) {
      this.isDraggingScrollbar = false;
      this.html.classList.add(this.scrollingClass);
      this.html.classList.remove(this.draggingClass);
    }
  }, {
    key: "moveScrollBar",
    value: function moveScrollBar(e) {
      var _this5 = this;

      if (this.isDraggingScrollbar) {
        requestAnimationFrame(function () {
          var x = (e.clientX - _this5.scrollbarBCR.left) * 100 / _this5.scrollbarWidth * _this5.instance.limit.x / 100;
          var y = (e.clientY - _this5.scrollbarBCR.top) * 100 / _this5.scrollbarHeight * _this5.instance.limit.y / 100;

          if (y > 0 && y < _this5.instance.limit.y) {
            _this5.instance.delta.y = y;
          }

          if (x > 0 && x < _this5.instance.limit.x) {
            _this5.instance.delta.x = x;
          }
        });
      }
    }
  }, {
    key: "addElements",
    value: function addElements() {
      var _this6 = this;

      this.els = {};
      this.parallaxElements = {}; // this.sections.forEach((section, y) => {

      var els = this.el.querySelectorAll("[data-".concat(this.name, "]"));
      els.forEach(function (el, index) {
        // Try and find the target's parent section
        var targetParents = getParents(el);
        var section = Object.entries(_this6.sections).map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              key = _ref4[0],
              section = _ref4[1];

          return section;
        }).find(function (section) {
          return targetParents.includes(section.el);
        });
        var cl = el.dataset[_this6.name + 'Class'] || _this6["class"];
        var id = typeof el.dataset[_this6.name + 'Id'] === 'string' ? el.dataset[_this6.name + 'Id'] : 'el' + index;
        var top;
        var left;
        var repeat = el.dataset[_this6.name + 'Repeat'];
        var call = el.dataset[_this6.name + 'Call'];
        var position = el.dataset[_this6.name + 'Position'];
        var delay = el.dataset[_this6.name + 'Delay'];
        var direction = el.dataset[_this6.name + 'Direction'];
        var sticky = typeof el.dataset[_this6.name + 'Sticky'] === 'string';
        var speed = el.dataset[_this6.name + 'Speed'] ? parseFloat(el.dataset[_this6.name + 'Speed']) / 10 : false;
        var offset = typeof el.dataset[_this6.name + 'Offset'] === 'string' ? el.dataset[_this6.name + 'Offset'].split(',') : _this6.offset;
        var target = el.dataset[_this6.name + 'Target'];
        var targetEl;

        if (target !== undefined) {
          targetEl = document.querySelector("".concat(target));
        } else {
          targetEl = el;
        }

        var targetElBCR = targetEl.getBoundingClientRect();

        if (section === null) {
          top = targetElBCR.top + _this6.instance.scroll.y - getTranslate(targetEl).y;
          left = targetElBCR.left + _this6.instance.scroll.x - getTranslate(targetEl).x;
        } else {
          if (!section.inView) {
            top = targetElBCR.top - getTranslate(section.el).y - getTranslate(targetEl).y;
            left = targetElBCR.left - getTranslate(section.el).x - getTranslate(targetEl).x;
          } else {
            top = targetElBCR.top + _this6.instance.scroll.y - getTranslate(targetEl).y;
            left = targetElBCR.left + _this6.instance.scroll.x - getTranslate(targetEl).x;
          }
        }

        var bottom = top + targetEl.offsetHeight;
        var right = left + targetEl.offsetWidth;
        var middle = {
          x: (right - left) / 2 + left,
          y: (bottom - top) / 2 + top
        };

        if (sticky) {
          var elBCR = el.getBoundingClientRect();
          var elTop = elBCR.top;
          var elLeft = elBCR.left;
          var elDistance = {
            x: elLeft - left,
            y: elTop - top
          };
          top += window.innerHeight;
          left += window.innerWidth;
          bottom = elTop + targetEl.offsetHeight - el.offsetHeight - elDistance[_this6.directionAxis];
          right = elLeft + targetEl.offsetWidth - el.offsetWidth - elDistance[_this6.directionAxis];
          middle = {
            x: (right - left) / 2 + left,
            y: (bottom - top) / 2 + top
          };
        }

        if (repeat == 'false') {
          repeat = false;
        } else if (repeat != undefined) {
          repeat = true;
        } else {
          repeat = _this6.repeat;
        }

        var relativeOffset = [0, 0];

        if (offset) {
          if (_this6.direction === 'horizontal') {
            for (var i = 0; i < offset.length; i++) {
              if (typeof offset[i] == 'string') {
                if (offset[i].includes('%')) {
                  relativeOffset[i] = parseInt(offset[i].replace('%', '') * _this6.windowWidth / 100);
                } else {
                  relativeOffset[i] = parseInt(offset[i]);
                }
              } else {
                relativeOffset[i] = offset[i];
              }
            }

            left = left + relativeOffset[0];
            right = right - relativeOffset[1];
          } else {
            for (var i = 0; i < offset.length; i++) {
              if (typeof offset[i] == 'string') {
                if (offset[i].includes('%')) {
                  relativeOffset[i] = parseInt(offset[i].replace('%', '') * _this6.windowHeight / 100);
                } else {
                  relativeOffset[i] = parseInt(offset[i]);
                }
              } else {
                relativeOffset[i] = offset[i];
              }
            }

            top = top + relativeOffset[0];
            bottom = bottom - relativeOffset[1];
          }
        }

        var mappedEl = {
          el: el,
          id: id,
          "class": cl,
          section: section,
          top: top,
          middle: middle,
          bottom: bottom,
          left: left,
          right: right,
          offset: offset,
          progress: 0,
          repeat: repeat,
          inView: false,
          call: call,
          speed: speed,
          delay: delay,
          position: position,
          target: targetEl,
          direction: direction,
          sticky: sticky
        };
        _this6.els[id] = mappedEl;

        if (el.classList.contains(cl)) {
          _this6.setInView(_this6.els[id], id);
        }

        if (speed !== false || sticky) {
          _this6.parallaxElements[id] = mappedEl;
        }
      }); // });
    }
  }, {
    key: "addSections",
    value: function addSections() {
      var _this7 = this;

      this.sections = {};
      var sections = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));

      if (sections.length === 0) {
        sections = [this.el];
      }

      sections.forEach(function (section, index) {
        var id = typeof section.dataset[_this7.name + 'Id'] === 'string' ? section.dataset[_this7.name + 'Id'] : 'section' + index;
        var sectionBCR = section.getBoundingClientRect();
        var offset = {
          x: sectionBCR.left - window.innerWidth * 1.5 - getTranslate(section).x,
          y: sectionBCR.top - window.innerHeight * 1.5 - getTranslate(section).y
        };
        var limit = {
          x: offset.x + sectionBCR.width + window.innerWidth * 2,
          y: offset.y + sectionBCR.height + window.innerHeight * 2
        };
        var persistent = typeof section.dataset[_this7.name + 'Persistent'] === 'string';
        section.setAttribute('data-scroll-section-id', id);
        var mappedSection = {
          el: section,
          offset: offset,
          limit: limit,
          inView: false,
          persistent: persistent,
          id: id
        };
        _this7.sections[id] = mappedSection;
      });
    }
  }, {
    key: "transform",
    value: function transform(element, x, y, delay) {
      var transform;

      if (!delay) {
        transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(x, ",").concat(y, ",0,1)");
      } else {
        var start = getTranslate(element);
        var lerpX = lerp(start.x, x, delay);
        var lerpY = lerp(start.y, y, delay);
        transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(lerpX, ",").concat(lerpY, ",0,1)");
      }

      element.style.webkitTransform = transform;
      element.style.msTransform = transform;
      element.style.transform = transform;
    }
  }, {
    key: "transformElements",
    value: function transformElements(isForced) {
      var _this8 = this;

      var setAllElements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var scrollRight = this.instance.scroll.x + this.windowWidth;
      var scrollBottom = this.instance.scroll.y + this.windowHeight;
      var scrollMiddle = {
        x: this.instance.scroll.x + this.windowMiddle.x,
        y: this.instance.scroll.y + this.windowMiddle.y
      };
      Object.entries(this.parallaxElements).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            i = _ref6[0],
            current = _ref6[1];

        var transformDistance = false;

        if (isForced) {
          transformDistance = 0;
        }

        if (current.inView || setAllElements) {
          switch (current.position) {
            case 'top':
              transformDistance = _this8.instance.scroll[_this8.directionAxis] * -current.speed;
              break;

            case 'elementTop':
              transformDistance = (scrollBottom - current.top) * -current.speed;
              break;

            case 'bottom':
              transformDistance = (_this8.instance.limit[_this8.directionAxis] - scrollBottom + _this8.windowHeight) * current.speed;
              break;

            case 'left':
              transformDistance = _this8.instance.scroll[_this8.directionAxis] * -current.speed;
              break;

            case 'elementLeft':
              transformDistance = (scrollRight - current.left) * -current.speed;
              break;

            case 'right':
              transformDistance = (_this8.instance.limit[_this8.directionAxis] - scrollRight + _this8.windowHeight) * current.speed;
              break;

            default:
              transformDistance = (scrollMiddle[_this8.directionAxis] - current.middle[_this8.directionAxis]) * -current.speed;
              break;
          }
        }

        if (current.sticky) {
          if (current.inView) {
            if (_this8.direction === 'horizontal') {
              transformDistance = _this8.instance.scroll.x - current.left + window.innerWidth;
            } else {
              transformDistance = _this8.instance.scroll.y - current.top + window.innerHeight;
            }
          } else {
            if (_this8.direction === 'horizontal') {
              if (_this8.instance.scroll.x < current.left - window.innerWidth && _this8.instance.scroll.x < current.left - window.innerWidth / 2) {
                transformDistance = 0;
              } else if (_this8.instance.scroll.x > current.right && _this8.instance.scroll.x > current.right + 100) {
                transformDistance = current.right - current.left + window.innerWidth;
              } else {
                transformDistance = false;
              }
            } else {
              if (_this8.instance.scroll.y < current.top - window.innerHeight && _this8.instance.scroll.y < current.top - window.innerHeight / 2) {
                transformDistance = 0;
              } else if (_this8.instance.scroll.y > current.bottom && _this8.instance.scroll.y > current.bottom + 100) {
                transformDistance = current.bottom - current.top + window.innerHeight;
              } else {
                transformDistance = false;
              }
            }
          }
        }

        if (transformDistance !== false) {
          if (current.direction === 'horizontal' || _this8.direction === 'horizontal' && current.direction !== 'vertical') {
            _this8.transform(current.el, transformDistance, 0, isForced ? false : current.delay);
          } else {
            _this8.transform(current.el, 0, transformDistance, isForced ? false : current.delay);
          }
        }
      });
    }
    /**
     * Scroll to a desired target.
     *
     * @param  Available options :
     *          target {node, string, "top", "bottom", int} - The DOM element we want to scroll to
     *          options {object} - Options object for additionnal settings.
     * @return {void}
     */

  }, {
    key: "scrollTo",
    value: function scrollTo(target) {
      var _this9 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Parse options
      var offset = parseInt(options.offset) || 0; // An offset to apply on top of given `target` or `sourceElem`'s target

      var duration = !isNaN(parseInt(options.duration)) ? parseInt(options.duration) : 1000; // Duration of the scroll animation in milliseconds

      var easing = options.easing || [0.25, 0.0, 0.35, 1.0]; // An array of 4 floats between 0 and 1 defining the bezier curve for the animation's easing. See http://greweb.me/bezier-easing-editor/example/

      var disableLerp = options.disableLerp ? true : false; // Lerp effect won't be applied if set to true

      var callback = options.callback ? options.callback : false; // function called when scrollTo completes (note that it won't wait for lerp to stabilize)

      easing = src$1.apply(void 0, _toConsumableArray(easing));

      if (typeof target === 'string') {
        // Selector or boundaries
        if (target === 'top') {
          target = 0;
        } else if (target === 'bottom') {
          target = this.instance.limit.y;
        } else if (target === 'left') {
          target = 0;
        } else if (target === 'right') {
          target = this.instance.limit.x;
        } else {
          target = document.querySelector(target); // If the query fails, abort

          if (!target) {
            return;
          }
        }
      } else if (typeof target === 'number') {
        // Absolute coordinate
        target = parseInt(target);
      } else if (target && target.tagName) ; else {
        console.warn('`target` parameter is not valid');
        return;
      } // We have a target that is not a coordinate yet, get it


      if (typeof target !== 'number') {
        // Verify the given target belongs to this scroll scope
        var targetInScope = getParents(target).includes(this.el);

        if (!targetInScope) {
          // If the target isn't inside our main element, abort any action
          return;
        } // Get target offset from top


        var targetBCR = target.getBoundingClientRect();
        var offsetTop = targetBCR.top;
        var offsetLeft = targetBCR.left; // Try and find the target's parent section

        var targetParents = getParents(target);
        var parentSection = targetParents.find(function (candidate) {
          return Object.entries(_this9.sections) // Get sections associative array as a regular array
          .map(function (_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2),
                key = _ref8[0],
                section = _ref8[1];

            return section;
          }) // map to section only (we dont need the key here)
          .find(function (section) {
            return section.el == candidate;
          }); // finally find the section that matches the candidate
        });
        var parentSectionOffset = 0;

        if (parentSection) {
          parentSectionOffset = getTranslate(parentSection)[this.directionAxis]; // We got a parent section, store it's current offset to remove it later
        } else {
          // if no parent section is found we need to use instance scroll directly
          parentSectionOffset = -this.instance.scroll[this.directionAxis];
        } // Final value of scroll destination : offsetTop + (optional offset given in options) - (parent's section translate)


        if (this.direction === 'horizontal') {
          offset = offsetLeft + offset - parentSectionOffset;
        } else {
          offset = offsetTop + offset - parentSectionOffset;
        }
      } else {
        offset = target + offset;
      } // Actual scrollto
      // ==========================================================================
      // Setup


      var scrollStart = parseFloat(this.instance.delta[this.directionAxis]);
      var scrollTarget = Math.max(0, Math.min(offset, this.instance.limit[this.directionAxis])); // Make sure our target is in the scroll boundaries

      var scrollDiff = scrollTarget - scrollStart;

      var render = function render(p) {
        if (disableLerp) {
          if (_this9.direction === 'horizontal') {
            _this9.setScroll(scrollStart + scrollDiff * p, _this9.instance.delta.y);
          } else {
            _this9.setScroll(_this9.instance.delta.x, scrollStart + scrollDiff * p);
          }
        } else {
          _this9.instance.delta[_this9.directionAxis] = scrollStart + scrollDiff * p;
        }
      }; // Prepare the scroll


      this.animatingScroll = true; // This boolean allows to prevent `checkScroll()` from calling `stopScrolling` when the animation is slow (i.e. at the beginning of an EaseIn)

      this.stopScrolling(); // Stop any movement, allows to kill any other `scrollTo` still happening

      this.startScrolling(); // Restart the scroll
      // Start the animation loop

      var start = Date.now();

      var loop = function loop() {
        var p = (Date.now() - start) / duration; // Animation progress

        if (p > 1) {
          // Animation ends
          render(1);
          _this9.animatingScroll = false;
          if (duration == 0) _this9.update();
          if (callback) callback();
        } else {
          _this9.scrollToRaf = requestAnimationFrame(loop);
          render(easing(p));
        }
      };

      loop();
    }
  }, {
    key: "update",
    value: function update() {
      this.setScrollLimit();
      this.addSections();
      this.addElements();
      this.detectElements();
      this.updateScroll();
      this.transformElements(true);
      this.reinitScrollBar();
      this.checkScroll(true);
    }
  }, {
    key: "startScroll",
    value: function startScroll() {
      this.stop = false;
    }
  }, {
    key: "stopScroll",
    value: function stopScroll() {
      this.stop = true;
    }
  }, {
    key: "setScroll",
    value: function setScroll(x, y) {
      this.instance = _objectSpread2(_objectSpread2({}, this.instance), {}, {
        scroll: {
          x: x,
          y: y
        },
        delta: {
          x: x,
          y: y
        },
        speed: 0
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);

      this.stopScrolling();
      this.html.classList.remove(this.smoothClass);
      this.vs.destroy();
      this.destroyScrollBar();
      window.removeEventListener('keydown', this.checkKey, false);
    }
  }]);

  return _default;
}(_default);

var Smooth = /*#__PURE__*/function () {
  function Smooth() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Smooth);

    this.options = options; // Override default options with given ones

    Object.assign(this, defaults, options);
    this.smartphone = defaults.smartphone;
    if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
    this.tablet = defaults.tablet;
    if (options.tablet) Object.assign(this.tablet, options.tablet);
    if (!this.smooth && this.direction == 'horizontal') console.warn('🚨 `smooth:false` & `horizontal` direction are not yet compatible');
    if (!this.tablet.smooth && this.tablet.direction == 'horizontal') console.warn('🚨 `smooth:false` & `horizontal` direction are not yet compatible (tablet)');
    if (!this.smartphone.smooth && this.smartphone.direction == 'horizontal') console.warn('🚨 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)');
    this.init();
  }

  _createClass(Smooth, [{
    key: "init",
    value: function init() {
      this.options.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 || window.innerWidth < this.tablet.breakpoint;
      this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint;

      if (this.smooth && !this.options.isMobile || this.tablet.smooth && this.options.isTablet || this.smartphone.smooth && this.options.isMobile && !this.options.isTablet) {
        this.scroll = new _default$2(this.options);
      } else {
        this.scroll = new _default$1(this.options);
      }

      this.scroll.init();

      if (window.location.hash) {
        // Get the hash without the '#' and find the matching element
        var id = window.location.hash.slice(1, window.location.hash.length);
        var target = document.getElementById(id); // If found, scroll to the element

        if (target) this.scroll.scrollTo(target);
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.scroll.update();
    }
  }, {
    key: "start",
    value: function start() {
      this.scroll.startScroll();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.scroll.stopScroll();
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(target, options) {
      this.scroll.scrollTo(target, options);
    }
  }, {
    key: "setScroll",
    value: function setScroll(x, y) {
      this.scroll.setScroll(x, y);
    }
  }, {
    key: "on",
    value: function on(event, func) {
      this.scroll.setEvents(event, func);
    }
  }, {
    key: "off",
    value: function off(event, func) {
      this.scroll.unsetEvents(event, func);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.scroll.destroy();
    }
  }]);

  return Smooth;
}();

var Native = /*#__PURE__*/function () {
  function Native() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Native);

    this.options = options; // Override default options with given ones

    Object.assign(this, defaults, options);
    this.smartphone = defaults.smartphone;
    if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
    this.tablet = defaults.tablet;
    if (options.tablet) Object.assign(this.tablet, options.tablet);
    this.init();
  }

  _createClass(Native, [{
    key: "init",
    value: function init() {
      this.scroll = new _default$1(this.options);
      this.scroll.init();

      if (window.location.hash) {
        // Get the hash without the '#' and find the matching element
        var id = window.location.hash.slice(1, window.location.hash.length);
        var target = document.getElementById(id); // If found, scroll to the element

        if (target) this.scroll.scrollTo(target);
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.scroll.update();
    }
  }, {
    key: "start",
    value: function start() {
      this.scroll.startScroll();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.scroll.stopScroll();
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(target, options) {
      this.scroll.scrollTo(target, options);
    }
  }, {
    key: "setScroll",
    value: function setScroll(x, y) {
      this.scroll.setScroll(x, y);
    }
  }, {
    key: "on",
    value: function on(event, func) {
      this.scroll.setEvents(event, func);
    }
  }, {
    key: "off",
    value: function off(event, func) {
      this.scroll.unsetEvents(event, func);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.scroll.destroy();
    }
  }]);

  return Native;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Smooth);



/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _anims__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./anims */ "./src/anims.js");
/* harmony import */ var _draggableBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./draggableBox */ "./src/draggableBox.js");
/* harmony import */ var _audioPlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./audioPlayer */ "./src/audioPlayer.js");
/* harmony import */ var locomotive_scroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! locomotive-scroll */ "./node_modules/locomotive-scroll/dist/locomotive-scroll.esm.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





 // import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

 // eslint-disable-next-line no-unused-vars

var player = new _audioPlayer__WEBPACK_IMPORTED_MODULE_4__.AudioPlayer(document.querySelector('.player'));
var lscroll = new locomotive_scroll__WEBPACK_IMPORTED_MODULE_5__["default"]({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  direction: 'horizontal',
  multiplier: 1,
  repeat: true
});
customElements.define('draggable-box', _draggableBox__WEBPACK_IMPORTED_MODULE_3__.DraggableBox, {
  extends: 'div'
});

var elems = _toConsumableArray(document.querySelectorAll('.floating'));

var rotationsArr = Array.from({
  length: elems.length
}, function () {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(-30, 30);
});
var translationArr = Array.from({
  length: elems.length
}, function () {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(25, 50) * (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randItem)([-1, 1]);
});
elems.forEach(function (el, i) {
  el.style.setProperty('transform', "translateY(".concat(-translationArr[i], "%) rotate(").concat(-rotationsArr[i], "deg)"));
});
var scroll = {
  cache: 0,
  current: 0
};
lscroll.on('scroll', function (obj) {
  for (var _i = 0, _Object$keys = Object.keys(obj.currentElements); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var el = obj.currentElements[key].el;
    var idx = elems.indexOf(el);

    if (obj.currentElements[key].el.classList.contains('floating')) {
      (0,_anims__WEBPACK_IMPORTED_MODULE_2__.floating)(obj.currentElements[key], rotationsArr[idx], translationArr[idx], lscroll.direction);
    } else if (obj.currentElements[key].el.classList.contains('tapis__card')) {
      scroll.current = obj.scroll.x > 0 ? obj.scroll.x : obj.scroll.y;
      var distance = scroll.current - scroll.cache;
      scroll.cache = scroll.current;
      var turb = document.querySelector('#noise feDisplacementMap');
      var Sc = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.map)(distance, -50, 50, -100, 100);
      turb.setAttribute('scale', Sc);
    }
  }
});
lscroll.update();
var vignettes = Array.from(document.querySelectorAll('.accueil__link'));
vignettes.forEach(function (vign) {
  vign.addEventListener('click', function (e) {
    console.log(e.currentTarget);
    var link = e.currentTarget.getAttribute('data-link');
    lscroll.scrollTo(link);
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VyxXQUFXLEtBQUssS0FBSyxLQUFLLEtBQUssV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxLQUFLLFVBQVUsV0FBVyxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLE1BQU0sV0FBVyxLQUFLLE1BQU0sVUFBVSxXQUFXLEtBQUssS0FBSyxNQUFNLEtBQUssVUFBVSxXQUFXLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLEtBQUssTUFBTSxXQUFXLEtBQUssTUFBTSxVQUFVLFdBQVcsS0FBSyxLQUFLLFlBQVksS0FBSyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLE9BQU8sUUFBUSxVQUFVLE9BQU8sTUFBTSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLFdBQVcsVUFBVSxXQUFXLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLE9BQU8sUUFBUSxVQUFVLFVBQVUsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLE9BQU8sT0FBTyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFVBQVUsVUFBVSxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE9BQU8sVUFBVSxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxZQUFZLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLFFBQVEsVUFBVSxVQUFVLE1BQU0sUUFBUSxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSw2Q0FBNkMsVUFBVSxtQkFBbUIsMENBQTBDLE9BQU8sVUFBVSxtQkFBbUIsT0FBTyxlQUFlLDhDQUE4QyxPQUFPLGVBQWUsNkNBQTZDLE9BQU8sZUFBZSw4Q0FBOEMsT0FBTyxlQUFlLDZDQUE2QyxPQUFPLGVB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Q0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QywrQkFBK0I7QUFDN0U7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlDQUF5QyxTQUFTOztBQUVsRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLEdBQUc7QUFDVjtBQUNBLFVBQVU7O0FBRVY7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQzs7QUFFbEM7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRCxzSEFBc0gscUJBQU0sbUJBQW1CLHFCQUFNOztBQUVySjtBQUNBLG1CQUFtQixhQUFhO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQixlQUFlLFFBQVE7QUFDdkIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckIsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUIsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QjtBQUN2Qjs7QUFFQSxDQUFDO0FBQ0QsQ0FBQztBQUNEOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFROzs7QUFHUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFOztBQUVoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLG1CQUFtQjtBQUMvQztBQUNBO0FBQ0E7QUFDQSxr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TUFBTSxDQUFDRSxPQUF0QjtBQUNBLFVBQU1VLElBQUksR0FBR2hHLFFBQVEsQ0FBQ25ELGFBQVQsQ0FBdUIsMEJBQXZCLENBQWI7QUFDQSxVQUFNb0osRUFBRSxHQUFHdEssMkNBQUcsQ0FBQ29LLFFBQUQsRUFBVyxDQUFDLEVBQVosRUFBZ0IsRUFBaEIsRUFBb0IsQ0FBQyxHQUFyQixFQUEwQixHQUExQixDQUFkO0FBQ0FDLE1BQUFBLElBQUksQ0FBQ0UsWUFBTCxDQUFrQixPQUFsQixFQUEyQkQsRUFBM0I7QUFDRDtBQUNGO0FBQ0YsQ0FwQkQ7QUFzQkF4QixPQUFPLENBQUMwQixNQUFSO0FBRUEsSUFBTUMsU0FBUyxHQUFHN0ksS0FBSyxDQUFDQyxJQUFOLENBQVd3QyxRQUFRLENBQUN2QyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBWCxDQUFsQjtBQUVBMkksU0FBUyxDQUFDL0QsT0FBVixDQUFrQixVQUFDZ0UsSUFBRCxFQUFVO0FBQzFCQSxFQUFBQSxJQUFJLENBQUM3SCxnQkFBTCxDQUFzQixPQUF0QixFQUErQixVQUFDZ0IsQ0FBRCxFQUFPO0FBQ3BDaUQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlsRCxDQUFDLENBQUM4RyxhQUFkO0FBQ0EsUUFBTUMsSUFBSSxHQUFHL0csQ0FBQyxDQUFDOEcsYUFBRixDQUFnQmpLLFlBQWhCLENBQTZCLFdBQTdCLENBQWI7QUFDQW9JLElBQUFBLE9BQU8sQ0FBQytCLFFBQVIsQ0FBaUJELElBQWpCO0FBQ0QsR0FKRDtBQUtELENBTkQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stcHJvamVjdC8uL3NyYy9hbmltcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3QvLi9zcmMvYXVkaW9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1wcm9qZWN0Ly4vc3JjL2RyYWdnYWJsZUJveC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3QvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1wcm9qZWN0Ly4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vd2VicGFjay1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbG9jb21vdGl2ZS1zY3JvbGwvZGlzdC9sb2NvbW90aXZlLXNjcm9sbC5lc20uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1wcm9qZWN0Ly4vc3JjL3N0eWxlLnNjc3M/NDBmNyIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYnBhY2stcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYnBhY2stcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYnBhY2stcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmbG9hdGluZyhzY3JvbGxFbCwgcm90LCB0cmFucywgZGlyZWN0aW9uKSB7XHJcbiAgY29uc3QgcHJvZ3Jlc3MgPSBzY3JvbGxFbC5wcm9ncmVzc1xyXG4gIGNvbnN0IHJvdEluaXQgPSBwYXJzZUludChzY3JvbGxFbC5lbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm90JykpIHx8IDBcclxuICBjb25zdCByb3RhdGlvblZhbCA9IG1hcChwcm9ncmVzcywgMCwgMSwgLXJvdCwgcm90KVxyXG4gIGNvbnN0IHRyYW5zbGF0aW9uVmFsID0gbWFwKHByb2dyZXNzLCAwLCAxLCAtdHJhbnMsIHRyYW5zKVxyXG4gIGlmIChkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgc2Nyb2xsRWwuZWwuc3R5bGUuc2V0UHJvcGVydHkoXHJcbiAgICAgICd0cmFuc2Zvcm0nLFxyXG4gICAgICBgdHJhbnNsYXRlWSgke3RyYW5zbGF0aW9uVmFsfSUpIHJvdGF0ZSgke3JvdGF0aW9uVmFsICsgcm90SW5pdH1kZWcpYFxyXG4gICAgKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBzY3JvbGxFbC5lbC5zdHlsZS5zZXRQcm9wZXJ0eShcclxuICAgICAgJ3RyYW5zZm9ybScsXHJcbiAgICAgIGB0cmFuc2xhdGVYKCR7dHJhbnNsYXRpb25WYWx9JSkgcm90YXRlKCR7cm90YXRpb25WYWwgKyByb3RJbml0fWRlZylgXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBBdWRpb1BsYXllciB7XHJcbiAgY29uc3RydWN0b3IoZWwpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsXHJcbiAgICB0aGlzLnBsYXlCdG4gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXlCdG4nKVxyXG4gICAgdGhpcy5wbGF5SWNvbiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucGxheScpXHJcbiAgICB0aGlzLnBhdXNlSWNvbiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucGF1c2UnKVxyXG4gICAgdGhpcy5uZXh0QnRuID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0QnRuJylcclxuICAgIHRoaXMucHJldkJ0biA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldkJ0bicpXHJcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRyZScpXHJcbiAgICB0aGlzLmR1cmVlID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kdXJlZScpXHJcbiAgICB0aGlzLnByb2dyZXNzQmFyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzc0JhcicpXHJcbiAgICB0aGlzLnByb2dyZXNzQmFyQ29udGFpbmVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcucHJvZ3Jlc3NCYXJDb250YWluZXInXHJcbiAgICApXHJcbiAgICB0aGlzLmF1ZGlvcyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2F1ZGlvJykpXHJcbiAgICB0aGlzLmhhbmRsZVBsYXllciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyX19oYW5kbGUnKVxyXG5cclxuICAgIHRoaXMuaWR4ID0gMFxyXG4gICAgdGhpcy5jdXJyZW50QXVkaW8gPSB0aGlzLmF1ZGlvc1t0aGlzLmlkeF1cclxuICAgIHRoaXMudGl0bGUudGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRBdWRpby5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKVxyXG5cclxuICAgIHRoaXMucGxheSA9IHRoaXMucGxheS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLnBhdXNlID0gdGhpcy5wYXVzZS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLm5leHQgPSB0aGlzLm5leHQuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5wcmV2ID0gdGhpcy5wcmV2LmJpbmQodGhpcylcclxuICAgIHRoaXMuc2hvd1BsYXllciA9IHRoaXMuc2hvd1BsYXllci5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmhpZGVQbGF5ZXIgPSB0aGlzLmhpZGVQbGF5ZXIuYmluZCh0aGlzKVxyXG4gICAgdGhpcy50aW1lVXBkYXRlID0gdGhpcy50aW1lVXBkYXRlLmJpbmQodGhpcylcclxuICAgIHRoaXMuc2V0VGltZSA9IHRoaXMuc2V0VGltZS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLnJlc2V0VGltZXIgPSB0aGlzLnJlc2V0VGltZXIuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wbGF5KVxyXG4gICAgdGhpcy5uZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5uZXh0KVxyXG4gICAgdGhpcy5wcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wcmV2KVxyXG4gICAgdGhpcy5oYW5kbGVQbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNob3dQbGF5ZXIpXHJcbiAgfVxyXG5cclxuICBuZXh0KCkge1xyXG4gICAgdGhpcy5wYXVzZSgpXHJcbiAgICB0aGlzLmN1cnJlbnRBdWRpby5jdXJyZW50VGltZSA9IDBcclxuICAgIHRoaXMuaWR4ID0gKHRoaXMuaWR4ICsgMSkgJSB0aGlzLmF1ZGlvcy5sZW5ndGhcclxuICAgIHRoaXMuY3VycmVudEF1ZGlvID0gdGhpcy5hdWRpb3NbdGhpcy5pZHhdXHJcbiAgICB0aGlzLnRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5jdXJyZW50QXVkaW8uZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJylcclxuICAgIHRoaXMucGxheSgpXHJcbiAgfVxyXG5cclxuICBwcmV2KCkge1xyXG4gICAgdGhpcy5wYXVzZSgpXHJcbiAgICB0aGlzLmN1cnJlbnRBdWRpby5jdXJyZW50VGltZSA9IDBcclxuICAgIHRoaXMuaWR4ID0gdGhpcy5pZHggPiAwID8gdGhpcy5pZHggLSAxIDogdGhpcy5hdWRpb3MubGVuZ3RoIC0gMVxyXG4gICAgdGhpcy5jdXJyZW50QXVkaW8gPSB0aGlzLmF1ZGlvc1t0aGlzLmlkeF1cclxuICAgIHRoaXMudGl0bGUudGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRBdWRpby5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKVxyXG4gICAgdGhpcy5wbGF5KClcclxuICB9XHJcblxyXG4gIHBhdXNlKCkge1xyXG4gICAgdGhpcy5jdXJyZW50QXVkaW8ucGF1c2UoKVxyXG4gICAgdGhpcy5wbGF5QnRuLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5Jykuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnXHJcbiAgICB0aGlzLnBsYXlCdG4ucXVlcnlTZWxlY3RvcignLnBhdXNlJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgdGhpcy5wbGF5QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wYXVzZSlcclxuICAgIHRoaXMucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucGxheSlcclxuICAgIHRoaXMuY3VycmVudEF1ZGlvLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aGlzLnRpbWVVcGRhdGUpXHJcbiAgICB0aGlzLmN1cnJlbnRBdWRpby5yZW1vdmVFdmVudExpc3RlbmVyKCdlbmRlZCcsIHRoaXMubmV4dClcclxuICB9XHJcblxyXG4gIHBsYXkoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRBdWRpby5wbGF5KClcclxuICAgIHRoaXMucGxheUJ0bi5xdWVyeVNlbGVjdG9yKCcucGxheScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIHRoaXMucGxheUJ0bi5xdWVyeVNlbGVjdG9yKCcucGF1c2UnKS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSdcclxuICAgIHRoaXMucGxheUJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucGxheSlcclxuICAgIHRoaXMucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucGF1c2UpXHJcbiAgICB0aGlzLmN1cnJlbnRBdWRpby5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGhpcy50aW1lVXBkYXRlKVxyXG4gICAgdGhpcy5jdXJyZW50QXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCB0aGlzLm5leHQpXHJcbiAgICB0aGlzLnByb2dyZXNzQmFyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZXRUaW1lKVxyXG4gIH1cclxuXHJcbiAgdGltZVVwZGF0ZSgpIHtcclxuICAgIGNvbnN0IHQgPSB0aGlzLmNhbGN1bGF0ZVRpbWUodGhpcy5jdXJyZW50QXVkaW8uY3VycmVudFRpbWUpXHJcbiAgICBjb25zdCB0dCA9IHRoaXMuY2FsY3VsYXRlVGltZSh0aGlzLmN1cnJlbnRBdWRpby5kdXJhdGlvbilcclxuICAgIGNvbnN0IHByb2dyZXNzID1cclxuICAgICAgKHRoaXMuY3VycmVudEF1ZGlvLmN1cnJlbnRUaW1lIC8gdGhpcy5jdXJyZW50QXVkaW8uZHVyYXRpb24pICogMTAwXHJcbiAgICB0aGlzLmR1cmVlLnRleHRDb250ZW50ID0gYCR7dH0gLyAke3R0fWBcclxuICAgIHRoaXMucHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBwcm9ncmVzcyArICclJ1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlVGltZShzZWNzKSB7XHJcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNzIC8gNjApXHJcbiAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5mbG9vcihzZWNzICUgNjApXHJcbiAgICBjb25zdCByZXR1cm5lZFNlY29uZHMgPSBzZWNvbmRzIDwgMTAgPyBgMCR7c2Vjb25kc31gIDogYCR7c2Vjb25kc31gXHJcbiAgICByZXR1cm4gYCR7bWludXRlc306JHtyZXR1cm5lZFNlY29uZHN9YFxyXG4gIH1cclxuXHJcbiAgc2V0VGltZShlKSB7XHJcbiAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gdGhpcy5wcm9ncmVzc0JhckNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54XHJcbiAgICBjb25zdCB3ID0gdGhpcy5wcm9ncmVzc0JhckNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxyXG4gICAgdGhpcy5jdXJyZW50QXVkaW8uY3VycmVudFRpbWUgPSAoeCAvIHcpICogdGhpcy5jdXJyZW50QXVkaW8uZHVyYXRpb25cclxuICAgIHRoaXMudGltZVVwZGF0ZSgpXHJcbiAgfVxyXG5cclxuICBzaG93UGxheWVyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKVxyXG4gICAgdGhpcy5oYW5kbGVQbGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNob3dQbGF5ZXIpXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5yZXNldFRpbWVyKVxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGVQbGF5ZXIpXHJcbiAgICB0aGlzLnJlc2V0VGltZXIoKVxyXG4gIH1cclxuXHJcbiAgaGlkZVBsYXllcihlKSB7XHJcbiAgICBsZXQgdGFyZ2V0RWxlbWVudCA9IGUudGFyZ2V0IC8vIGNsaWNrZWQgZWxlbWVudFxyXG5cclxuICAgIGRvIHtcclxuICAgICAgaWYgKHRhcmdldEVsZW1lbnQgPT09IHRoaXMuZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMucmVzZXRUaW1lcigpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgLy8gR28gdXAgdGhlIERPTVxyXG4gICAgICB0YXJnZXRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudC5wYXJlbnROb2RlXHJcbiAgICB9IHdoaWxlICh0YXJnZXRFbGVtZW50KVxyXG5cclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJylcclxuICAgIHRoaXMuaGFuZGxlUGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zaG93UGxheWVyKVxyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGVQbGF5ZXIpXHJcbiAgICBpZiAodGhpcy50KSBjbGVhclRpbWVvdXQodGhpcy50KVxyXG4gICAgLy8gdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMucmVzZXRUaW1lcilcclxuICB9XHJcblxyXG4gIHJlc2V0VGltZXIoKSB7XHJcbiAgICBpZiAodGhpcy50KSBjbGVhclRpbWVvdXQodGhpcy50KVxyXG4gICAgdGhpcy50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpXHJcbiAgICAgIHRoaXMuaGFuZGxlUGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zaG93UGxheWVyKVxyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZVBsYXllcilcclxuICAgIH0sIDQwMDApXHJcbiAgfVxyXG59XHJcbiIsIi8qXHJcblRPRE8gOiBcclxuICAgIGFqb3V0ZXIgZ2VzdGlvbiBkZXMgei1pbmRleCBodHRwczovL3d3dy53aWxsbWFzdGVyLmNvbS9ibG9nL2phdmFzY3JpcHQvei1pbmRleC1yYW5nZS5waHBcclxuICAgIGFqb3V0ZXIgZGVzIGV2ZW5lbWVudHMgYXUgZHJhZyBldCBhdSBkw6lkcmFnXHJcblxyXG4qL1xyXG5cclxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZUJveCBleHRlbmRzIEhUTUxEaXZFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuY29udGFpbmVyID1cclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmdldEF0dHJpYnV0ZSgnY29udGFpbmVyJykpIHx8IGRvY3VtZW50LmJvZHlcclxuICAgIHRoaXMuaGFuZGxlID0gdGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0QXR0cmlidXRlKCdoYW5kbGUnKSkgfHwgdGhpc1xyXG4gICAgdGhpcy5jbG9zZUJ0biA9IFsuLi50aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbG9zZUJ0bicpXVxyXG4gICAgdGhpcy5oYW5kbGUuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJ1xyXG4gICAgdGhpcy54ID0gMFxyXG4gICAgdGhpcy55ID0gMFxyXG4gICAgdGhpcy5keCA9IDBcclxuICAgIHRoaXMuZHkgPSAwXHJcbiAgICB0aGlzLnRyYW5zbGF0ZVggPSAwXHJcbiAgICB0aGlzLnRyYW5zbGF0ZVkgPSAwXHJcbiAgICB0aGlzLnJvdCA9IHRoaXMuZ2V0Q3VycmVudFJvdGF0aW9uKClcclxuICAgIHRoaXMuaGFuZGxlLnN0eWxlLmN1cnNvciA9ICdncmFiJ1xyXG4gICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSlcclxuICAgIHNoYWRvdy5pbm5lckhUTUwgPSAvKiBodG1sICovIGBcclxuICAgICAgICAgICAgPHN0eWxlPiBcclxuICAgICAgICAgICAgOmhvc3R7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb24gOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L3N0eWxlPlxyXG4gICAgICAgICAgICA8c2xvdCBuYW1lPVwiY29udGVudFwiPjwvc2xvdD5cclxuICAgICAgICBgXHJcbiAgfVxyXG5cclxuICBnZXRDdXJyZW50Um90YXRpb24oKSB7XHJcbiAgICBjb25zdCBzdCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMsIG51bGwpXHJcbiAgICBjb25zdCB0bSA9XHJcbiAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJy13ZWJraXQtdHJhbnNmb3JtJykgfHxcclxuICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLW1vei10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctbXMtdHJhbnNmb3JtJykgfHxcclxuICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLW8tdHJhbnNmb3JtJykgfHxcclxuICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgndHJhbnNmb3JtJykgfHxcclxuICAgICAgJ25vbmUnXHJcbiAgICBpZiAodG0gIT09ICdub25lJykge1xyXG4gICAgICBjb25zdCB2YWx1ZXMgPSB0bS5zcGxpdCgnKCcpWzFdLnNwbGl0KCcpJylbMF0uc3BsaXQoJywnKVxyXG4gICAgICBjb25zdCBhbmdsZSA9IE1hdGgucm91bmQoXHJcbiAgICAgICAgTWF0aC5hdGFuMih2YWx1ZXNbMV0sIHZhbHVlc1swXSkgKiAoMTgwIC8gTWF0aC5QSSlcclxuICAgICAgKVxyXG4gICAgICByZXR1cm4gYW5nbGUgPCAwID8gYW5nbGUgKyAzNjAgOiBhbmdsZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDBcclxuICB9XHJcblxyXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgdGhpcy5vbkRyYWdTdGFydCA9IHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5oYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25EcmFnU3RhcnQsIHtcclxuICAgICAgcGFzc2l2ZTogZmFsc2UsXHJcbiAgICB9KVxyXG4gICAgdGhpcy5oYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbkRyYWdTdGFydCwge1xyXG4gICAgICBwYXNzaXZlOiBmYWxzZSxcclxuICAgIH0pXHJcbiAgICB0aGlzLmNsb3NlQnRuLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxyXG4gICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnbm9uZScpXHJcbiAgICAgIClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBvbkRyYWdTdGFydChlKSB7XHJcbiAgICB0aGlzLmhhbmRsZS5zdHlsZS5jdXJzb3IgPSAnZ3JhYmJpbmcnXHJcbiAgICB0aGlzLnN0eWxlLnpJbmRleCA9IHRoaXMuZmluZE1heFppbmRleCgpICsgMVxyXG4gICAgY29uc29sZS5sb2coJ34gdGhpcy5zdHlsZS56SW5kZXgnLCB0aGlzLnN0eWxlLnpJbmRleClcclxuXHJcbiAgICB0aGlzLm9uRHJhZyA9IHRoaXMub25EcmFnLmJpbmQodGhpcylcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25EcmFnLCB7IHBhc3NpdmU6IGZhbHNlIH0pXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uRHJhZywgeyBwYXNzaXZlOiBmYWxzZSB9KVxyXG4gICAgdGhpcy5vbkRyYWdFbmQgPSB0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMub25EcmFnRW5kLCB7IHBhc3NpdmU6IGZhbHNlIH0pXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbkRyYWdFbmQsIHsgcGFzc2l2ZTogZmFsc2UgfSlcclxuICAgIGNvbnN0IHNjcmVlblggPSBlLmNsaWVudFggfHwgZS50b3VjaGVzWzBdLnBhZ2VYIHx8IHRoaXMueFxyXG4gICAgY29uc3Qgc2NyZWVuWSA9IGUuY2xpZW50WSB8fCBlLnRvdWNoZXNbMF0ucGFnZVkgfHwgdGhpcy55XHJcbiAgICB0aGlzLnggPSBzY3JlZW5YXHJcbiAgICB0aGlzLnkgPSBzY3JlZW5ZXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICB9XHJcblxyXG4gIGZpbmRNYXhaaW5kZXgoKSB7XHJcbiAgICBsZXQgbWF4ID0gMFxyXG4gICAgY29uc3QgYm94ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnZGl2W2lzPVwiZHJhZ2dhYmxlLWJveFwiXScpXHJcbiAgICBib3guZm9yRWFjaCgoYikgPT4ge1xyXG4gICAgICBtYXggPSBNYXRoLm1heChtYXgsIHBhcnNlSW50KGIuc3R5bGUuekluZGV4KSB8fCAwKVxyXG4gICAgfSlcclxuICAgIHJldHVybiBtYXhcclxuICB9XHJcblxyXG4gIG9uRHJhZyhlKSB7XHJcbiAgICAvLyBjb25zdCBzY3JlZW5YID0gZS5jbGllbnRYIHx8IGUudG91Y2hlc1swXS5wYWdlWCB8fCB0aGlzLnhcclxuICAgIGNvbnN0IHNjcmVlblggPSBlLmNsaWVudFggfHwgKGUudG91Y2hlcyA/IGUudG91Y2hlc1swXS5wYWdlWCA6IHRoaXMueClcclxuICAgIGNvbnN0IHNjcmVlblkgPSBlLmNsaWVudFkgfHwgKGUudG91Y2hlcyA/IGUudG91Y2hlc1swXS5wYWdlWSA6IHRoaXMueSlcclxuICAgIHRoaXMuZHggPSB0aGlzLnggLSBzY3JlZW5YXHJcbiAgICB0aGlzLmR5ID0gdGhpcy55IC0gc2NyZWVuWVxyXG4gICAgdGhpcy5jb2xsaWRlKClcclxuICAgIHRoaXMueCA9IHNjcmVlblhcclxuICAgIHRoaXMueSA9IHNjcmVlbllcclxuICAgIHRoaXMudHJhbnNsYXRlWCAtPSB0aGlzLmR4XHJcbiAgICB0aGlzLnRyYW5zbGF0ZVkgLT0gdGhpcy5keVxyXG4gICAgdGhpcy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy50cmFuc2xhdGVYfXB4LCR7dGhpcy50cmFuc2xhdGVZfXB4KSByb3RhdGUoJHt0aGlzLnJvdH1kZWcpYFxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgfVxyXG5cclxuICBvbkRyYWdFbmQoZSkge1xyXG4gICAgdGhpcy5oYW5kbGUuc3R5bGUuY3Vyc29yID0gJ2dyYWInXHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uRHJhZylcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25EcmFnKVxyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uRHJhZ0VuZClcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uRHJhZ0VuZClcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gIH1cclxuXHJcbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICB0aGlzLmhhbmRsZS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vbkRyYWdTdGFydClcclxuICAgIHRoaXMuaGFuZGxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25EcmFnU3RhcnQpXHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uRHJhZylcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25EcmFnKVxyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uRHJhZ0VuZClcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uRHJhZ0VuZClcclxuICB9XHJcblxyXG4gIGNvbGxpZGUoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQgLSB0aGlzLmR4ID49XHJcbiAgICAgIHRoaXMuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0XHJcbiAgICApXHJcbiAgICAgIHRoaXMuZHggPSAwXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdGhpcy5keSA8PVxyXG4gICAgICB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcclxuICAgIClcclxuICAgICAgdGhpcy5keSA9IDBcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gdGhpcy5keCA8PVxyXG4gICAgICB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XHJcbiAgICApXHJcbiAgICAgIHRoaXMuZHggPSAwXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIC0gdGhpcy5keSA+PVxyXG4gICAgICB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b21cclxuICAgIClcclxuICAgICAgdGhpcy5keSA9IDBcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IG1hcCA9ICh4LCBhLCBiLCBjLCBkKSA9PiAoKHggLSBhKSAqIChkIC0gYykpIC8gKGIgLSBhKSArIGNcclxuZXhwb3J0IGNvbnN0IGNsYW1wID0gKG51bSwgbWluLCBtYXgpID0+XHJcbiAgbnVtIDw9IG1pbiA/IG1pbiA6IG51bSA+PSBtYXggPyBtYXggOiBudW1cclxuZXhwb3J0IGNvbnN0IHJhbmRvbU51bWJlciA9IChtaW4sIG1heCkgPT5cclxuICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXHJcblxyXG5leHBvcnQgY29uc3QgcmFuZEl0ZW0gPSAoYXJyKSA9PiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFJvdGF0aW9uKGVsKSB7XHJcbiAgY29uc3Qgc3QgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbClcclxuICBjb25zdCB0bSA9XHJcbiAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctd2Via2l0LXRyYW5zZm9ybScpIHx8XHJcbiAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctbW96LXRyYW5zZm9ybScpIHx8XHJcbiAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctbXMtdHJhbnNmb3JtJykgfHxcclxuICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJy1vLXRyYW5zZm9ybScpIHx8XHJcbiAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCd0cmFuc2Zvcm0nKSB8fFxyXG4gICAgJ25vbmUnXHJcbiAgaWYgKHRtICE9PSAnbm9uZScpIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IHRtLnNwbGl0KCcoJylbMV0uc3BsaXQoJyknKVswXS5zcGxpdCgnLCcpXHJcbiAgICBjb25zdCBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5hdGFuMih2YWx1ZXNbMV0sIHZhbHVlc1swXSkgKiAoMTgwIC8gTWF0aC5QSSkpXHJcbiAgICByZXR1cm4gYW5nbGUgPCAwID8gYW5nbGUgKyAzNjAgOiBhbmdsZVxyXG4gIH1cclxuICByZXR1cm4gMFxyXG59XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyByZWJvbmQge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwMHB4KTtcXG4gIH1cXG4gIDElIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDE2JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxNjBweCk7XFxuICB9XFxuICAyOCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTY1cHgpO1xcbiAgfVxcbiAgNDQlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDI1cHgpO1xcbiAgfVxcbiAgNTklIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMHB4KTtcXG4gIH1cXG4gIDczJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg1cHgpO1xcbiAgfVxcbiAgODglIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgcmVib25kIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MDBweCk7XFxuICB9XFxuICAxJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAxNiUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTYwcHgpO1xcbiAgfVxcbiAgMjglIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02NXB4KTtcXG4gIH1cXG4gIDQ0JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyNXB4KTtcXG4gIH1cXG4gIDU5JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTBweCk7XFxuICB9XFxuICA3MyUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KTtcXG4gIH1cXG4gIDg4JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwcHgpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwcHgpO1xcbiAgfVxcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgcm90IHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gIH1cXG59XFxuQGtleWZyYW1lcyByb3Qge1xcbiAgMCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgfVxcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgZmxvYXQge1xcbiAgMCUge1xcbiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgNXB4IDE0cHggcmdiYSgwLCAwLCAwLCAwLjMpKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGV5KDBweCkgc2NhbGUoMSk7XFxuICB9XFxuICA1MCUge1xcbiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgMzVweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC41KSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRleSgtMzBweCkgc2NhbGUoMS4wMyk7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDVweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC4zKSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRleSgwcHgpIHNjYWxlKDEpO1xcbiAgfVxcbn1cXG5Aa2V5ZnJhbWVzIGZsb2F0IHtcXG4gIDAlIHtcXG4gICAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDVweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC4zKSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRleSgwcHgpIHNjYWxlKDEpO1xcbiAgfVxcbiAgNTAlIHtcXG4gICAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDM1cHggMTRweCByZ2JhKDAsIDAsIDAsIDAuNSkpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZXkoLTMwcHgpIHNjYWxlKDEuMDMpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMCA1cHggMTRweCByZ2JhKDAsIDAsIDAsIDAuMykpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZXkoMHB4KSBzY2FsZSgxKTtcXG4gIH1cXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIGJsb3Age1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIpO1xcbiAgfVxcbiAgMSUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMTYlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjY4KTtcXG4gIH1cXG4gIDI4JSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xMyk7XFxuICB9XFxuICA0NCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xcbiAgfVxcbiAgNTklIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjAyKTtcXG4gIH1cXG4gIDczJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45OSk7XFxuICB9XFxuICA4OCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgYmxvcCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMik7XFxuICB9XFxuICAxJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAxNiUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNjgpO1xcbiAgfVxcbiAgMjglIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEzKTtcXG4gIH1cXG4gIDQ0JSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7XFxuICB9XFxuICA1OSUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDIpO1xcbiAgfVxcbiAgNzMlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk5KTtcXG4gIH1cXG4gIDg4JSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gIH1cXG59XFxuLyohIGxvY29tb3RpdmUtc2Nyb2xsIHY0LjEuMSB8IE1JVCBMaWNlbnNlIHwgaHR0cHM6Ly9naXRodWIuY29tL2xvY29tb3RpdmVtdGwvbG9jb21vdGl2ZS1zY3JvbGwgKi9cXG5odG1sLmhhcy1zY3JvbGwtc21vb3RoIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmh0bWwuaGFzLXNjcm9sbC1kcmFnZ2luZyB7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG4uaGFzLXNjcm9sbC1zbW9vdGggYm9keSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uaGFzLXNjcm9sbC1zbW9vdGggW2RhdGEtc2Nyb2xsLWNvbnRhaW5lcl0ge1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxufVxcblxcbltkYXRhLXNjcm9sbC1kaXJlY3Rpb249aG9yaXpvbnRhbF0gW2RhdGEtc2Nyb2xsLWNvbnRhaW5lcl0ge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxufVxcblxcbltkYXRhLXNjcm9sbC1kaXJlY3Rpb249aG9yaXpvbnRhbF0gW2RhdGEtc2Nyb2xsLXNlY3Rpb25dIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uYy1zY3JvbGxiYXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMTFweDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciByaWdodDtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzLCBvcGFjaXR5IDAuM3M7XFxuICBvcGFjaXR5OiAwO1xcbn1cXG5cXG4uYy1zY3JvbGxiYXI6aG92ZXIge1xcbiAgdHJhbnNmb3JtOiBzY2FsZVgoMS40NSk7XFxufVxcblxcbi5jLXNjcm9sbGJhcjpob3ZlcixcXG4uaGFzLXNjcm9sbC1zY3JvbGxpbmcgLmMtc2Nyb2xsYmFyLFxcbi5oYXMtc2Nyb2xsLWRyYWdnaW5nIC5jLXNjcm9sbGJhciB7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG5cXG5bZGF0YS1zY3JvbGwtZGlyZWN0aW9uPWhvcml6b250YWxdIC5jLXNjcm9sbGJhciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTBweDtcXG4gIHRvcDogYXV0bztcXG4gIGJvdHRvbTogMDtcXG4gIHRyYW5zZm9ybTogc2NhbGVZKDEpO1xcbn1cXG5cXG5bZGF0YS1zY3JvbGwtZGlyZWN0aW9uPWhvcml6b250YWxdIC5jLXNjcm9sbGJhcjpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHNjYWxlWSgxLjMpO1xcbn1cXG5cXG4uYy1zY3JvbGxiYXJfdGh1bWIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIG9wYWNpdHk6IDAuNTtcXG4gIHdpZHRoOiA3cHg7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgbWFyZ2luOiAycHg7XFxuICBjdXJzb3I6IC13ZWJraXQtZ3JhYjtcXG4gIGN1cnNvcjogZ3JhYjtcXG59XFxuXFxuLmhhcy1zY3JvbGwtZHJhZ2dpbmcgLmMtc2Nyb2xsYmFyX3RodW1iIHtcXG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiYmluZztcXG4gIGN1cnNvcjogZ3JhYmJpbmc7XFxufVxcblxcbltkYXRhLXNjcm9sbC1kaXJlY3Rpb249aG9yaXpvbnRhbF0gLmMtc2Nyb2xsYmFyX3RodW1iIHtcXG4gIHJpZ2h0OiBhdXRvO1xcbiAgYm90dG9tOiAwO1xcbn1cXG5cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHBsdW0sIGJsdWV2aW9sZXQpO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLmRpc3RvcnQge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnBhbmVsIHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xcbn1cXG5cXG5hLFxcbmE6dmlzaXRlZCB7XFxuICBjb2xvcjogYmx1ZTtcXG59XFxuXFxuLnBvc3RpdCA+IGRpdiB7XFxuICBwYWRkaW5nOiAxLjVyZW0gMS41cmVtIDAgMS41cmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcbiAgYm94LXNoYWRvdzogNXB4IC01cHggMTBweCAycHggcmdiYSgwLCAwLCAwLCAwLjcpO1xcbn1cXG4ucG9zdGl0X19jbG9zZUJ0biB7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwLjNyZW07XFxuICB0b3A6IDAuM3JlbTtcXG59XFxuLnBvc3RpdDo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogY2FsYygxMDAlIC0gMXB4KTtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxLjVyZW0pO1xcbiAgaGVpZ2h0OiAxLjVyZW07XFxuICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xcbn1cXG4ucG9zdGl0OjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgdG9wOiAxMDAlO1xcbiAgaGVpZ2h0OiAwO1xcbiAgd2lkdGg6IDA7XFxuICBib3JkZXItdG9wOiAxLjVyZW0gc29saWQgI2YxZDYwMDtcXG4gIGJvcmRlci1yaWdodDogMS41cmVtIHNvbGlkIHRyYW5zcGFyZW50O1xcbn1cXG5cXG4uYWNjdWVpbCB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5hY2N1ZWlsX190aXRsZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAxcmVtO1xcbiAgdG9wOiA4NXZoO1xcbiAgZm9udC1zaXplOiA0cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCBcXFwiVGltZXMgTmV3IFJvbWFuXFxcIiwgVGltZXMsIHNlcmlmO1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSB3YXZ5ICNmZmVjNTg7XFxuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIHdhdnkgI2ZmZWM1ODtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4uYWNjdWVpbF9fdGl0bGUgc3BhbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBjb2xvcjogdHJhbnNwYXJlbnQ7XFxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcbn1cXG4uYWNjdWVpbF9fdGl0bGUgc3Bhbjo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmFjY3VlaWxfX3RpdGxlIHNwYW46Oi1tb3otc2VsZWN0aW9uIHtcXG4gIGJhY2tncm91bmQ6IHJlZDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuLmFjY3VlaWxfX3RpdGxlIHNwYW46OnNlbGVjdGlvbiB7XFxuICBiYWNrZ3JvdW5kOiByZWQ7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbi5hY2N1ZWlsIGltZyB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogcmVib25kIDFzIGxpbmVhciAwLjFzIDEgYm90aDtcXG4gICAgICAgICAgYW5pbWF0aW9uOiByZWJvbmQgMXMgbGluZWFyIDAuMXMgMSBib3RoO1xcbn1cXG4uYWNjdWVpbCAucG9zdGl0IHtcXG4gIHotaW5kZXg6IDEwO1xcbiAgbWF4LXdpZHRoOiAyMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMnJlbTtcXG4gIHRvcDogMnJlbTtcXG4gIGJhY2tncm91bmQ6ICNmZmVjNTg7XFxuICBmb250LWZhbWlseTogR2VvcmdpYSwgXFxcIlRpbWVzIE5ldyBSb21hblxcXCIsIFRpbWVzLCBzZXJpZjtcXG59XFxuLmFjY3VlaWwgLnBvc3RpdCA+IGRpdiB7XFxuICBwYWRkaW5nOiAxcmVtIDFyZW0gNXJlbSAxcmVtO1xcbn1cXG4uYWNjdWVpbCAucG9zdGl0IGgzIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG4uYWNjdWVpbCAucG9zdGl0IHVsIHtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG4uYWNjdWVpbCAucG9zdGl0IHNwYW4ge1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaCAxcHggYmxhY2s7XFxuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoIDFweCBibGFjaztcXG59XFxuXFxuLmludHJvIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbn1cXG4uaW50cm9fX2NyaXRpcXVlIHtcXG4gIGdyaWQtY29sdW1uOiAyL3NwYW4gNjtcXG4gIGdyaWQtcm93OiAxO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTBkZWcpO1xcbn1cXG4uaW50cm9fX2NyaXRpcXVlIGltZyB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxufVxcbi5pbnRybyAucG9zdGl0LS1mYW5ueSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlYzU4O1xcbiAgbWF4LXdpZHRoOiAzMDBweDtcXG4gIHotaW5kZXg6IDE7XFxuICBncmlkLWNvbHVtbjogNi9zcGFuIDM7XFxuICBncmlkLXJvdzogMTtcXG59XFxuLmludHJvIC5wb3N0aXQtLWZhbm55OjphZnRlciB7XFxuICBib3JkZXItdG9wLWNvbG9yOiAjZjFkNjAwO1xcbn1cXG4uaW50cm8gLnBvc3RpdC0tdHJpc3RhbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmZmNWU2O1xcbiAgZ3JpZC1jb2x1bW46IDcvc3BhbiA0O1xcbiAgZ3JpZC1yb3c6IDE7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtNWRlZyk7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG4gIHdpZHRoOiA5MCU7XFxufVxcbi5pbnRybyAucG9zdGl0LS10cmlzdGFuOjphZnRlciB7XFxuICBib3JkZXItdG9wLWNvbG9yOiAjNjg4M2ExO1xcbn1cXG5cXG4uYWxidW0ge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxufVxcbi5hbGJ1bSAucG9jaGV0dGUge1xcbiAgZ3JpZC1yb3c6IDE7XFxuICBncmlkLWNvbHVtbjogMy9zcGFuIDQ7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg1ZGVnKTtcXG59XFxuLmFsYnVtIC5wb2NoZXR0ZSBpbWcge1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG4uYWxidW0gLmNkIHtcXG4gIGdyaWQtcm93OiAxO1xcbiAgZ3JpZC1jb2x1bW46IDcvc3BhbiAzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgei1pbmRleDogMTtcXG59XFxuLmFsYnVtIC5jZF9faW1nQ29udGFpbmVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4uYWxidW0gLmNkX19pbWdDb250YWluZXIgaW1nIHtcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuLmFsYnVtIC5jZF9faW5mb3Mge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbGluZS1oZWlnaHQ6IDEuMjtcXG59XFxuLmFsYnVtIC5jZF9faW5mb3MgYiB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG59XFxuLmFsYnVtIC5jZF9faW5mb3MgcCB7XFxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcbn1cXG4uYWxidW0gLmNkX19pbmZvcyBhLFxcbi5hbGJ1bSAuY2RfX2luZm9zIGE6dmlzaXRlZCB7XFxuICBjb2xvcjogYmx1ZTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLmNsaXBzIHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTtcXG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLmNsaXBzIC5jbGlwIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KGJsYWNrLCB3aGl0ZSA5MCUpO1xcbn1cXG4uY2xpcHMgLmNsaXBfX3BsYXllciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0b3A6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC03NSUpO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBvcGFjaXR5OiAwLjg7XFxuICBib3JkZXItcmFkaXVzOiA1MCUvMTAlO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgLyogY2hhbmdlIHRoaXMgdG8gY2hhbmdlIHNpemUgKi9cXG4gIGhlaWdodDogM2VtO1xcbiAgbWFyZ2luOiAyMHB4IGF1dG87XFxuICBwYWRkaW5nOiAwO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC1pbmRlbnQ6IDAuMWVtO1xcbiAgdHJhbnNpdGlvbjogYWxsIDE1MG1zIGVhc2Utb3V0O1xcbiAgd2lkdGg6IDRlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmNsaXBzIC5jbGlwX19wbGF5ZXI6OmJlZm9yZSB7XFxuICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xcbiAgYm9yZGVyLXJhZGl1czogNSUvNTAlO1xcbiAgYm90dG9tOiA5JTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgbGVmdDogLTUlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IC01JTtcXG4gIHRvcDogOSU7XFxufVxcbi5jbGlwcyAuY2xpcF9fcGxheWVyOjphZnRlciB7XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLXdpZHRoOiAxZW0gMCAxZW0gMS43MzJlbTtcXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgd2hpdGU7XFxuICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICBmb250LXNpemU6IDAuNzVlbTtcXG4gIGhlaWdodDogMDtcXG4gIG1hcmdpbjogLTFlbSAwIDAgLTAuNzVlbTtcXG4gIHRvcDogNTAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDA7XFxufVxcbi5jbGlwcyAuY2xpcCBpbWcge1xcbiAgLW8tb2JqZWN0LWZpdDogY292ZXI7XFxuICAgICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5jbGlwcyAuY2xpcDpudGgtY2hpbGQoMSkge1xcbiAgZ3JpZC1jb2x1bW46IDMvc3BhbiA0O1xcbiAgZ3JpZC1yb3c6IDE7XFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG59XFxuLmNsaXBzIC5jbGlwOm50aC1jaGlsZCgyKSB7XFxuICBncmlkLWNvbHVtbjogNy9zcGFuIDQ7XFxuICBncmlkLXJvdzogMTtcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcbn1cXG4uY2xpcHMgLmNsaXA6bnRoLWNoaWxkKDMpIHtcXG4gIGdyaWQtY29sdW1uOiAyL3NwYW4gNDtcXG4gIGdyaWQtcm93OiAyO1xcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG59XFxuLmNsaXBzIC5jbGlwOm50aC1jaGlsZCg0KSB7XFxuICBncmlkLWNvbHVtbjogOC9zcGFuIDQ7XFxuICBncmlkLXJvdzogMjtcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxufVxcbi5jbGlwcyAuY2xpcDpudGgtY2hpbGQoNSkge1xcbiAgZ3JpZC1jb2x1bW46IDUvc3BhbiA0O1xcbiAgZ3JpZC1yb3c6IDI7XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cXG4uY2xpcHMgLmNsaXA6aG92ZXIge1xcbiAgei1pbmRleDogMTA7XFxufVxcbi5jbGlwcyAuY2xpcDpob3ZlciBpbWcge1xcbiAgb3BhY2l0eTogMC40O1xcbn1cXG4uY2xpcHMgLmNsaXA6aG92ZXIgLmNsaXBfX3BsYXllciB7XFxuICBiYWNrZ3JvdW5kOiByZWQ7XFxufVxcblxcbi52aW4ge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTtcXG59XFxuLnZpbl9fcGFyb2xlczpudGgtY2hpbGQoMSkge1xcbiAgZ3JpZC1yb3c6IDMvc3BhbiA4O1xcbiAgZ3JpZC1jb2x1bW46IDIvc3BhbiAzO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTVkZWcpO1xcbn1cXG4udmluX19wYXJvbGVzOm50aC1jaGlsZCgyKSB7XFxuICBncmlkLXJvdzogNC9zcGFuIDg7XFxuICBncmlkLWNvbHVtbjogNC9zcGFuIDM7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtNWRlZyk7XFxufVxcbi52aW5fX3Bhcm9sZXM6bnRoLWNoaWxkKDMpIHtcXG4gIGdyaWQtcm93OiAzL3NwYW4gODtcXG4gIGdyaWQtY29sdW1uOiA1L3NwYW4gMztcXG4gIHRyYW5zZm9ybTogcm90YXRlKDEwZGVnKTtcXG59XFxuLnZpbl9fcGFyb2xlczpudGgtY2hpbGQoNCkge1xcbiAgZ3JpZC1yb3c6IDIvc3BhbiA4O1xcbiAgZ3JpZC1jb2x1bW46IDgvc3BhbiAzO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTBkZWcpO1xcbn1cXG4udmluX19wYXJvbGVzIGltZyB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxufVxcbi52aW5fX2JvdXRlaWxsZSB7XFxuICBncmlkLWNvbHVtbjogNy9zcGFuIDI7XFxuICBncmlkLXJvdzogMy9zcGFuIDg7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4udmluX19ib3V0ZWlsbGUgaW1nIHtcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuLnZpbl9fdGV4dGUge1xcbiAgZ3JpZC1jb2x1bW46IDkvc3BhbiAyO1xcbiAgZ3JpZC1yb3c6IDEwL3NwYW4gMjtcXG4gIGZvbnQtd2VpZ2h0OiA4MDA7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi5waG90b3Mge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTtcXG59XFxuLnBob3Rvc19faW1nQ29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtaGVpZ2h0OiAxMDAlO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnBob3Rvc19faW1nQ29udGFpbmVyOm50aC1jaGlsZCgxKSB7XFxuICBncmlkLWNvbHVtbjogMi9zcGFuIDQ7XFxuICBncmlkLXJvdzogMi9zcGFuIDM7XFxufVxcbi5waG90b3NfX2ltZ0NvbnRhaW5lcjpudGgtY2hpbGQoMikge1xcbiAgZ3JpZC1jb2x1bW46IDgvc3BhbiA0O1xcbiAgZ3JpZC1yb3c6IDMvc3BhbiAzO1xcbiAgei1pbmRleDogMTtcXG59XFxuLnBob3Rvc19faW1nQ29udGFpbmVyOm50aC1jaGlsZCgzKSB7XFxuICBncmlkLWNvbHVtbjogNi9zcGFuIDM7XFxuICBncmlkLXJvdzogMS9zcGFuIDU7XFxufVxcbi5waG90b3NfX2ltZ0NvbnRhaW5lciBpbWcge1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2Utb3V0O1xcbiAgLW8tb2JqZWN0LWZpdDogY292ZXI7XFxuICAgICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5waG90b3NfX2ltZ0NvbnRhaW5lcjpob3ZlciwgLnBob3Rvc19faW1nQ29udGFpbmVyOmZvY3VzIHtcXG4gIHotaW5kZXg6IDEwO1xcbn1cXG4ucGhvdG9zX19pbWdDb250YWluZXI6aG92ZXIgaW1nLCAucGhvdG9zX19pbWdDb250YWluZXI6Zm9jdXMgaW1nIHtcXG4gIG9wYWNpdHk6IDAuNDtcXG59XFxuLnBob3Rvc19faW1nQ29udGFpbmVyIGZpZ2NhcHRpb24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBvcGFjaXR5OiAxO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIFxcXCJUaW1lcyBOZXcgUm9tYW5cXFwiLCBUaW1lcywgc2VyaWY7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIHRleHQtYWxpZ246IGp1c3RpZnk7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0O1xcbn1cXG4ucGhvdG9zX19pbWdDb250YWluZXIgZmlnY2FwdGlvbiBwIHtcXG4gIHdpZHRoOiA3MCU7XFxuICBhc3BlY3QtcmF0aW86IDE7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5waG90b3NfX2ltZ0NvbnRhaW5lcjpob3ZlciBmaWdjYXB0aW9uLCAucGhvdG9zX19pbWdDb250YWluZXI6Zm9jdXMgZmlnY2FwdGlvbiB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbn1cXG5cXG4udGFwaXMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnRhcGlzX19jYXJkIHtcXG4gIGhlaWdodDogODAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi50YXBpc19faW1nQ29udGFpbmVyIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBmbG9hdCA2cyBlYXNlLWluLW91dCBpbmZpbml0ZTtcXG4gICAgICAgICAgYW5pbWF0aW9uOiBmbG9hdCA2cyBlYXNlLWluLW91dCBpbmZpbml0ZTtcXG59XFxuLnRhcGlzX19pbmZvcyB7XFxuICBmb250LWZhbWlseTogR2VvcmdpYSwgXFxcIlRpbWVzIE5ldyBSb21hblxcXCIsIFRpbWVzLCBzZXJpZjtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuLnRhcGlzX19pbmZvcyBzcGFuIHtcXG4gIC13ZWJraXQtdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2ggMXB4IGJsYWNrO1xcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaCAxcHggYmxhY2s7XFxufVxcblxcbi5wcm9tbyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDFyZW0gMDtcXG59XFxuLnByb21vX19pbWdDb250YWluZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcbi5wcm9tb19faW1nQ29udGFpbmVyIGltZyB7XFxuICAtby1vYmplY3QtZml0OiBjb3ZlcjtcXG4gICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4ucHJvbW9fX2ltZ0NvbnRhaW5lcjpudGgtY2hpbGQoMSkge1xcbiAgZ3JpZC1jb2x1bW46IDIvc3BhbiA0O1xcbiAgZ3JpZC1yb3c6IDEvc3BhbiAzO1xcbiAgei1pbmRleDogMTtcXG59XFxuLnByb21vX19pbWdDb250YWluZXI6bnRoLWNoaWxkKDEpIGltZyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgb3BhY2l0eTogMDtcXG59XFxuLnByb21vX19pbWdDb250YWluZXI6bnRoLWNoaWxkKDEpIGltZy5pcy1pbnZpZXcge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGJsb3AgMXMgbGluZWFyIDAuNXMgMSBib3RoO1xcbiAgICAgICAgICBhbmltYXRpb246IGJsb3AgMXMgbGluZWFyIDAuNXMgMSBib3RoO1xcbn1cXG4ucHJvbW9fX2ltZ0NvbnRhaW5lcjpudGgtY2hpbGQoMikge1xcbiAgZ3JpZC1jb2x1bW46IDEvc3BhbiA0O1xcbiAgZ3JpZC1yb3c6IDIvc3BhbiA2O1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgaGVpZ2h0OiA4MCU7XFxufVxcbi5wcm9tb19faW1nQ29udGFpbmVyOm50aC1jaGlsZCgyKSBpbWcge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTVkZWcpO1xcbn1cXG4ucHJvbW9fX2NvZGUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIGJhY2tncm91bmQ6IHJlZDtcXG59XFxuXFxuLmNvbnRhY3Qge1xcbiAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIFxcXCJUaW1lcyBOZXcgUm9tYW5cXFwiLCBUaW1lcywgc2VyaWY7XFxufVxcbi5jb250YWN0X19mb3JtIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmNvbnRhY3RfX2Zvcm0gaW5wdXQsXFxuLmNvbnRhY3RfX2Zvcm0gbGFiZWwsXFxuLmNvbnRhY3RfX2Zvcm0gdGV4dGFyZWEge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBsaW5lLWhlaWdodDogMjtcXG59XFxuLmNvbnRhY3RfX2Zvcm0gW3R5cGU9dGV4dF0sXFxuLmNvbnRhY3RfX2Zvcm0gW3R5cGU9ZW1haWxdLFxcbi5jb250YWN0X19mb3JtIHRleHRhcmVhIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZDogI2I5YjhiODtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICByZXNpemU6IG5vbmU7XFxuICBwYWRkaW5nOiAwLjNyZW07XFxufVxcbi5jb250YWN0X19mb3JtIGxhYmVsIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuLmNvbnRhY3RfX2Zvcm0gW3R5cGU9c3VibWl0XSB7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgcGFkZGluZzogMCAwLjNyZW07XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBmb250LWZhbWlseTogR2VvcmdpYSwgXFxcIlRpbWVzIE5ldyBSb21hblxcXCIsIFRpbWVzLCBzZXJpZjtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kOiAjZDdkN2Q3O1xcbiAgYm94LXNoYWRvdzogMCAwIDVweCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbn1cXG4uY29udGFjdF9fdGltYnJlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogLTJyZW07XFxuICByaWdodDogMDtcXG4gIG1heC1oZWlnaHQ6IDdyZW07XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgyMDBweCwgLTUwcHgpIHJvdGF0ZSgtODBkZWcpO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxLjZzIGN1YmljLWJlemllcigwLjM0LCAxLjU2LCAwLjY0LCAxKTtcXG59XFxuLmNvbnRhY3RfX3RpbWJyZS5pcy1pbnZpZXcge1xcbiAgb3BhY2l0eTogMTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApIHJvdGF0ZSgwKTtcXG59XFxuXFxuLmZvb3Rlcl9fY29udGFpbmVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBoZWlnaHQ6IDkwJTtcXG4gIHRleHQtYWxpZ246IGp1c3RpZnk7XFxuICBhc3BlY3QtcmF0aW86IDEvMTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1pdGVtczogY2VudGVyO1xcbn1cXG4uZm9vdGVyX190ZXh0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1heC13aWR0aDogNzAlO1xcbiAgZm9udC1mYW1pbHk6IEdlb3JnaWEsIFxcXCJUaW1lcyBOZXcgUm9tYW5cXFwiLCBUaW1lcywgc2VyaWY7XFxufVxcbi5mb290ZXJfX2ltZ0NvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICB6LWluZGV4OiAtMTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiByb3QgMTBzIGVhc2UtaW4tb3V0IDAuM3MgaW5maW5pdGUgYm90aDtcXG4gICAgICAgICAgYW5pbWF0aW9uOiByb3QgMTBzIGVhc2UtaW4tb3V0IDAuM3MgaW5maW5pdGUgYm90aDtcXG59XFxuLmZvb3Rlcl9faW1nQ29udGFpbmVyIGltZyB7XFxuICAtby1vYmplY3QtZml0OiBjb3ZlcjtcXG4gICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLnBsYXllciB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IC0zLjRyZW07XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgYmFja2dyb3VuZDogI2VjZTI5NjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcXG4gIGZvbnQtc2l6ZTogMDtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XFxufVxcbi5wbGF5ZXIudmlzaWJsZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwJSk7XFxufVxcbi5wbGF5ZXJfX2hhbmRsZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0b3A6IDEwMCU7XFxuICB3aWR0aDogMnJlbTtcXG4gIGhlaWdodDogMnJlbTtcXG4gIHBhZGRpbmc6IDAuM3JlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAgMCA1MCUgNTAlO1xcbiAgYmFja2dyb3VuZDogI2ZmZWM1ODtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnBsYXllcl9faGFuZGxlIGltZyB7XFxuICAtby1vYmplY3QtZml0OiBjb3ZlcjtcXG4gICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcztcXG59XFxuLnBsYXllcl9faGFuZGxlOmhvdmVyIHN2ZyB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XFxufVxcbi5wbGF5ZXJfX2hhbmRsZTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgei1pbmRleDogLTE7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbiAgaGVpZ2h0OiAwLjRyZW07XFxuICBiYWNrZ3JvdW5kOiAjZmZlYzU4O1xcbn1cXG4ucGxheWVyIGJ1dHRvbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBiYWNrZ3JvdW5kOiAjZmZlYzU4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBtYXJnaW46IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwYWRkaW5nOiAwLjMxMjVyZW07XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZS1vdXQ7XFxufVxcbi5wbGF5ZXIgYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6ICNmZmQyNTg7XFxufVxcbi5wbGF5ZXIgYnV0dG9uIGltZyB7XFxuICAtby1vYmplY3QtZml0OiBjb3ZlcjtcXG4gICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgLW8tb2JqZWN0LXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgICBvYmplY3QtcG9zaXRpb246IGNlbnRlcjtcXG4gIGhlaWdodDogNjAlO1xcbn1cXG4ucGxheWVyIC5wYXVzZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4ucGxheWVyIC5wcm9ncmVzc0JhckNvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kOiAjZjdmM2YwO1xcbiAgbWluLWhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4ucGxheWVyIC5wcm9ncmVzc0JhciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDAlO1xcbiAgYmFja2dyb3VuZDogI2ZmZWM1ODtcXG59XFxuLnBsYXllciAudGl0cmUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogNTAlO1xcbiAgdG9wOiA1MCU7XFxuICBjb2xvcjogYmxhY2s7XFxuICBmb250LXNpemU6IDFyZW07XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIG1peC1ibGVuZC1tb2RlOiBjb2xvci1idXJuO1xcbn1cXG4ucGxheWVyIC5kdXJlZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMXJlbTtcXG4gIHRvcDogNTAlO1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTUwJSk7XFxuICBtaXgtYmxlbmQtbW9kZTogY29sb3ItYnVybjtcXG59XFxuXFxuLndpbmRvdyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0b3A6IDUwJTtcXG4gIG1heC13aWR0aDogNDAwcHg7XFxuICBiYWNrZ3JvdW5kOiAjZjhmNmU2O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4IDVweCAwIDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMDA1MGUwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJTZWdvZSBVSVxcXCIsIFRhaG9tYSwgR2VuZXZhLCBWZXJkYW5hLCBzYW5zLXNlcmlmO1xcbn1cXG4ud2luZG93X19oYW5kbGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEuMnJlbTtcXG4gIHBhZGRpbmc6IDAgMC4ycmVtO1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwNTBlMCwgIzM4OTBmOCk7XFxuICBjb2xvcjogd2hpdGU7XFxuICBjdXJzb3I6IG1vdmU7XFxufVxcbi53aW5kb3dfX3RpdGxlIHtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXNpemU6IDFyZW07XFxufVxcbi53aW5kb3dfX2Nsb3NlQnRuIHtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgaGVpZ2h0OiAxcmVtO1xcbiAgd2lkdGg6IGF1dG87XFxuICBsaW5lLWhlaWdodDogMXJlbTtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBhc3BlY3QtcmF0aW86IDE7XFxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoI2U2NmE0ZCwgI2IzMzYxNSk7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi53aW5kb3dfX2NvbnRlbnQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDFyZW07XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG4ud2luZG93X19jb25maXJtQnRuIHtcXG4gIHBhZGRpbmc6IDAuMnJlbSAxcmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgb3V0bGluZTogMXB4IHNvbGlkIGdyZXk7XFxuICBvdXRsaW5lLW9mZnNldDogLTJweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL19hbmltYXRpb25zLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvX2xvY29tb3RpdmUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDZCQUFBO0VDRUY7RURBQTtJQUNFLFVBQUE7RUNFRjtFRENBO0lBQ0UsNEJBQUE7RUNDRjtFREVBO0lBQ0UsNEJBQUE7RUNBRjtFREdBO0lBQ0UsMkJBQUE7RUNERjtFRElBO0lBQ0UsNEJBQUE7RUNGRjtFREtBO0lBQ0UsMEJBQUE7RUNIRjtFRE1BO0lBQ0UsMEJBQUE7RUNKRjtFRE9BO0lBQ0UsVUFBQTtJQUNBLDBCQUFBO0VDTEY7QUFDRjtBRC9C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Q0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0FBb0pKO0FBbEpFO0VBQ0Usb0JBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQkFBQTtFQUNBLGVBQUE7QUFvSkpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGtleWZyYW1lcyByZWJvbmQge1xcclxcbiAgMCUge1xcclxcbiAgICBvcGFjaXR5OiAwO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMSAqIC01MDBweCk7XFxyXFxuICB9XFxyXFxuICAxJSB7XFxyXFxuICAgIG9wYWNpdHk6IDE7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAxNiUge1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTAuMzIgKiAtNTAwcHgpO1xcclxcbiAgfVxcclxcblxcclxcbiAgMjglIHtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAuMTMgKiAtNTAwcHgpO1xcclxcbiAgfVxcclxcblxcclxcbiAgNDQlIHtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0wLjA1ICogLTUwMHB4KTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDU5JSB7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwLjAyICogLTUwMHB4KTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDczJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMC4wMSAqIC01MDBweCk7XFxyXFxuICB9XFxyXFxuXFxyXFxuICA4OCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCAqIC01MDBweCk7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAxMDAlIHtcXHJcXG4gICAgb3BhY2l0eTogMTtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAgKiAtNTAwcHgpO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHJvdCB7XFxyXFxuICAwJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcclxcbiAgfVxcclxcbiAgMTAwJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgZmxvYXQge1xcclxcbiAgMCUge1xcclxcbiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgNXB4IDE0cHggcmdiYSgwLCAwLCAwLCAwLjMpKTtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGV5KDBweCkgc2NhbGUoMSk7XFxyXFxuICB9XFxyXFxuICA1MCUge1xcclxcbiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgMzVweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC41KSk7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRleSgtMzBweCkgc2NhbGUoMS4wMyk7XFxyXFxuICB9XFxyXFxuICAxMDAlIHtcXHJcXG4gICAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDVweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC4zKSk7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRleSgwcHgpIHNjYWxlKDEpO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIGJsb3Age1xcclxcbiAgMCUge1xcclxcbiAgICBvcGFjaXR5OiAwO1xcclxcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEgKiAxICsgMSk7XFxyXFxuICB9XFxyXFxuICAxJSB7XFxyXFxuICAgIG9wYWNpdHk6IDE7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAxNiUge1xcclxcbiAgICB0cmFuc2Zvcm06IHNjYWxlKC0wLjMyICogMSArIDEpO1xcclxcbiAgfVxcclxcblxcclxcbiAgMjglIHtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjEzICogMSArIDEpO1xcclxcbiAgfVxcclxcblxcclxcbiAgNDQlIHtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgtMC4wNSAqIDEgKyAxKTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDU5JSB7XFxyXFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC4wMiAqIDEgKyAxKTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDczJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogc2NhbGUoLTAuMDEgKiAxICsgMSk7XFxyXFxuICB9XFxyXFxuXFxyXFxuICA4OCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAgKiAxICsgMSk7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAxMDAlIHtcXHJcXG4gICAgb3BhY2l0eTogMTtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwICogMSArIDEpO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIixcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90byZkaXNwbGF5PXN3YXAnKTtcXHJcXG5AaW1wb3J0ICdhbmltYXRpb25zJztcXHJcXG5AaW1wb3J0ICdsb2NvbW90aXZlJztcXHJcXG4qLFxcclxcbio6OmJlZm9yZSxcXHJcXG4qOjphZnRlciB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xcclxcbiAgLy8gYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KGJsdWV2aW9sZXQsICNmZjY3NjcpO1xcclxcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHBsdW0sIGJsdWV2aW9sZXQpO1xcclxcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmRpc3RvcnQge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLnBhbmVsIHtcXHJcXG4gIHdpZHRoOiAxMDB2dztcXHJcXG4gIGhlaWdodDogMTAwdmg7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xcclxcbn1cXHJcXG5hLFxcclxcbmE6dmlzaXRlZCB7XFxyXFxuICBjb2xvcjogYmx1ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnBvc3RpdCB7XFxyXFxuICAmID4gZGl2IHtcXHJcXG4gICAgcGFkZGluZzogMS41cmVtIDEuNXJlbSAwIDEuNXJlbTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcclxcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcclxcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDVweCA1cHggMTVweCA1cHggIzAwMDAwMDtcXHJcXG4gICAgYm94LXNoYWRvdzogNXB4IC01cHggMTBweCAycHggcmdiYSgwLCAwLCAwLCAwLjcpO1xcclxcbiAgfVxcclxcbiAgJl9fY2xvc2VCdG4ge1xcclxcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xcclxcbiAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA4MDA7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICByaWdodDogMC4zcmVtO1xcclxcbiAgICB0b3A6IDAuM3JlbTtcXHJcXG4gIH1cXHJcXG4gICY6OmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHRvcDogY2FsYygxMDAlIC0gMXB4KTtcXHJcXG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDEuNXJlbSk7XFxyXFxuICAgIGhlaWdodDogMS41cmVtO1xcclxcbiAgICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xcclxcbiAgfVxcclxcbiAgJjo6YWZ0ZXIge1xcclxcbiAgICBjb250ZW50OiAnJztcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICByaWdodDogMDtcXHJcXG4gICAgdG9wOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDA7XFxyXFxuICAgIHdpZHRoOiAwO1xcclxcbiAgICBib3JkZXItdG9wOiAxLjVyZW0gc29saWQgI2YxZDYwMDtcXHJcXG4gICAgYm9yZGVyLXJpZ2h0OiAxLjVyZW0gc29saWQgdHJhbnNwYXJlbnQ7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5hY2N1ZWlsIHtcXHJcXG4gIGhlaWdodDogMTAwdmg7XFxyXFxuICAmX190aXRsZSB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgbGVmdDogMXJlbTtcXHJcXG4gICAgdG9wOiA4NXZoO1xcclxcbiAgICBmb250LXNpemU6IDRyZW07XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA4MDA7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgVGltZXMsIHNlcmlmO1xcclxcbiAgICBjb2xvcjogcmdiKDAsIDAsIDApO1xcclxcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIHdhdnkgI2ZmZWM1ODtcXHJcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xcclxcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgICB6LWluZGV4OiAxO1xcclxcbiAgICBzcGFuIHtcXHJcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgIGxlZnQ6IDA7XFxyXFxuICAgICAgdG9wOiAwO1xcclxcbiAgICAgIHJpZ2h0OiAwO1xcclxcbiAgICAgIGJvdHRvbTogMDtcXHJcXG4gICAgICBjb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTtcXHJcXG4gICAgICAmOjphZnRlciB7XFxyXFxuICAgICAgICBjb250ZW50OiAnJztcXHJcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICAvLyBwb2ludGVyLWV2ZW50czogbm9uZTtcXHJcXG4gICAgICAmOjpzZWxlY3Rpb24ge1xcclxcbiAgICAgICAgYmFja2dyb3VuZDogcmVkO1xcclxcbiAgICAgICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBpbWcge1xcclxcbiAgICBhbmltYXRpb246IHJlYm9uZCAxcyBsaW5lYXIgMC4xcyAxIGJvdGg7XFxyXFxuICB9XFxyXFxuICAucG9zdGl0IHtcXHJcXG4gICAgei1pbmRleDogMTA7XFxyXFxuICAgIG1heC13aWR0aDogMjAlO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHJpZ2h0OiAycmVtO1xcclxcbiAgICB0b3A6IDJyZW07XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmVjNTg7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgVGltZXMsIHNlcmlmO1xcclxcbiAgICAmID4gZGl2IHtcXHJcXG4gICAgICBwYWRkaW5nOiAxcmVtIDFyZW0gNXJlbSAxcmVtO1xcclxcbiAgICB9XFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXHJcXG4gICAgfVxcclxcbiAgICB1bCB7XFxyXFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gICAgICAvLyBtYXJnaW46IDFyZW0gYXV0byAwIGF1dG87XFxyXFxuICAgIH1cXHJcXG4gICAgc3BhbiB7XFxyXFxuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2ggMXB4IGJsYWNrO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5pbnRybyB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXHJcXG4gICZfX2NyaXRpcXVlIHtcXHJcXG4gICAgZ3JpZC1jb2x1bW46IDIgLyBzcGFuIDY7XFxyXFxuICAgIGdyaWQtcm93OiAxO1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxMGRlZyk7XFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuICAucG9zdGl0LS1mYW5ueSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZWM1ODtcXHJcXG4gICAgbWF4LXdpZHRoOiAzMDBweDtcXHJcXG4gICAgei1pbmRleDogMTtcXHJcXG4gICAgZ3JpZC1jb2x1bW46IDYgLyBzcGFuIDM7XFxyXFxuICAgIGdyaWQtcm93OiAxO1xcclxcbiAgICAmOjphZnRlciB7XFxyXFxuICAgICAgYm9yZGVyLXRvcC1jb2xvcjogZGFya2VuKCNmZmVjNTgsIDIwJSk7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG4gIC5wb3N0aXQtLXRyaXN0YW4ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmZmNWU2O1xcclxcbiAgICBncmlkLWNvbHVtbjogNyAvIHNwYW4gNDtcXHJcXG4gICAgZ3JpZC1yb3c6IDE7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC01ZGVnKTtcXHJcXG4gICAgZm9udC1zaXplOiAwLjhyZW07XFxyXFxuICAgIHdpZHRoOiA5MCU7XFxyXFxuICAgIC8vIG1heC1oZWlnaHQ6IDEwMCU7XFxyXFxuICAgIC8vIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAgICY6OmFmdGVyIHtcXHJcXG4gICAgICBib3JkZXItdG9wLWNvbG9yOiAjNjg4M2ExO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5hbGJ1bSB7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXHJcXG4gIC5wb2NoZXR0ZSB7XFxyXFxuICAgIGdyaWQtcm93OiAxO1xcclxcbiAgICBncmlkLWNvbHVtbjogMyAvIHNwYW4gNDtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNWRlZyk7XFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICAgIC8vIGFuaW1hdGlvbjogcmVib25kIDAuOHMgZWFzZS1vdXQgMC41cyAxIGJvdGggcGF1c2VkO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuY2Qge1xcclxcbiAgICBncmlkLXJvdzogMTtcXHJcXG4gICAgZ3JpZC1jb2x1bW46IDcgLyBzcGFuIDM7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHotaW5kZXg6IDE7XFxyXFxuICAgICZfX2ltZ0NvbnRhaW5lciB7XFxyXFxuICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgaW1nIHtcXHJcXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIC8vIGFuaW1hdGlvbjogcmVib25kIDAuOHMgZWFzZS1vdXQgMHMgMSBib3RoIHBhdXNlZDtcXHJcXG4gICAgICB9XFxyXFxuICAgIH1cXHJcXG4gICAgJl9faW5mb3Mge1xcclxcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgICBsaW5lLWhlaWdodDogMS4yO1xcclxcbiAgICAgIGIge1xcclxcbiAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICAgICAgfVxcclxcbiAgICAgIHAge1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgYSxcXHJcXG4gICAgICBhOnZpc2l0ZWQge1xcclxcbiAgICAgICAgY29sb3I6IGJsdWU7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5jbGlwcyB7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDIsIDFmcik7XFxyXFxuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAuY2xpcCB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KGJsYWNrLCB3aGl0ZSA5MCUpO1xcclxcbiAgICAmX19wbGF5ZXIge1xcclxcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICBsZWZ0OiA1MCU7XFxyXFxuICAgICAgdG9wOiA1MCU7XFxyXFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTc1JSk7XFxyXFxuICAgICAgYmFja2dyb3VuZDogYmxhY2s7XFxyXFxuICAgICAgb3BhY2l0eTogMC44O1xcclxcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJSAvIDEwJTtcXHJcXG4gICAgICBmb250LXNpemU6IDFyZW07IC8qIGNoYW5nZSB0aGlzIHRvIGNoYW5nZSBzaXplICovXFxyXFxuICAgICAgaGVpZ2h0OiAzZW07XFxyXFxuICAgICAgbWFyZ2luOiAyMHB4IGF1dG87XFxyXFxuICAgICAgcGFkZGluZzogMDtcXHJcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgdGV4dC1pbmRlbnQ6IDAuMWVtO1xcclxcbiAgICAgIHRyYW5zaXRpb246IGFsbCAxNTBtcyBlYXNlLW91dDtcXHJcXG4gICAgICB3aWR0aDogNGVtO1xcclxcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAmOjpiZWZvcmUge1xcclxcbiAgICAgICAgYmFja2dyb3VuZDogaW5oZXJpdDtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUlIC8gNTAlO1xcclxcbiAgICAgICAgYm90dG9tOiA5JTtcXHJcXG4gICAgICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICAgICAgbGVmdDogLTUlO1xcclxcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgcmlnaHQ6IC01JTtcXHJcXG4gICAgICAgIHRvcDogOSU7XFxyXFxuICAgICAgfVxcclxcbiAgICAgICY6OmFmdGVyIHtcXHJcXG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XFxyXFxuICAgICAgICBib3JkZXItd2lkdGg6IDFlbSAwIDFlbSAxLjczMmVtO1xcclxcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xcclxcbiAgICAgICAgY29udGVudDogJyAnO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAwLjc1ZW07XFxyXFxuICAgICAgICBoZWlnaHQ6IDA7XFxyXFxuICAgICAgICBtYXJnaW46IC0xZW0gMCAwIC0wLjc1ZW07XFxyXFxuICAgICAgICB0b3A6IDUwJTtcXHJcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICAgIHdpZHRoOiAwO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgICBpbWcge1xcclxcbiAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcbiAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB9XFxyXFxuICAgICY6bnRoLWNoaWxkKDEpIHtcXHJcXG4gICAgICBncmlkLWNvbHVtbjogMyAvIHNwYW4gNDtcXHJcXG4gICAgICBncmlkLXJvdzogMTtcXHJcXG4gICAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXHJcXG4gICAgfVxcclxcbiAgICAmOm50aC1jaGlsZCgyKSB7XFxyXFxuICAgICAgZ3JpZC1jb2x1bW46IDcgLyBzcGFuIDQ7XFxyXFxuICAgICAgZ3JpZC1yb3c6IDE7XFxyXFxuICAgICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxyXFxuICAgIH1cXHJcXG4gICAgJjpudGgtY2hpbGQoMykge1xcclxcbiAgICAgIGdyaWQtY29sdW1uOiAyIC8gc3BhbiA0O1xcclxcbiAgICAgIGdyaWQtcm93OiAyO1xcclxcbiAgICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxyXFxuICAgIH1cXHJcXG4gICAgJjpudGgtY2hpbGQoNCkge1xcclxcbiAgICAgIGdyaWQtY29sdW1uOiA4IC8gc3BhbiA0O1xcclxcbiAgICAgIGdyaWQtcm93OiAyO1xcclxcbiAgICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxyXFxuICAgIH1cXHJcXG4gICAgJjpudGgtY2hpbGQoNSkge1xcclxcbiAgICAgIGdyaWQtY29sdW1uOiA1IC8gc3BhbiA0O1xcclxcbiAgICAgIGdyaWQtcm93OiAyO1xcclxcbiAgICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxyXFxuICAgIH1cXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgei1pbmRleDogMTA7XFxyXFxuICAgICAgaW1nIHtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDAuNDtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLmNsaXBfX3BsYXllciB7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kOiByZWQ7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi52aW4ge1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTtcXHJcXG4gICZfX3Bhcm9sZXMge1xcclxcbiAgICAmOm50aC1jaGlsZCgxKSB7XFxyXFxuICAgICAgZ3JpZC1yb3c6IDMgLyBzcGFuIDg7XFxyXFxuICAgICAgZ3JpZC1jb2x1bW46IDIgLyBzcGFuIDM7XFxyXFxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTVkZWcpO1xcclxcbiAgICB9XFxyXFxuICAgICY6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgICBncmlkLXJvdzogNCAvIHNwYW4gODtcXHJcXG4gICAgICBncmlkLWNvbHVtbjogNCAvIHNwYW4gMztcXHJcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNWRlZyk7XFxyXFxuICAgIH1cXHJcXG4gICAgJjpudGgtY2hpbGQoMykge1xcclxcbiAgICAgIGdyaWQtcm93OiAzIC8gc3BhbiA4O1xcclxcbiAgICAgIGdyaWQtY29sdW1uOiA1IC8gc3BhbiAzO1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEwZGVnKTtcXHJcXG4gICAgfVxcclxcbiAgICAmOm50aC1jaGlsZCg0KSB7XFxyXFxuICAgICAgZ3JpZC1yb3c6IDIgLyBzcGFuIDg7XFxyXFxuICAgICAgZ3JpZC1jb2x1bW46IDggLyBzcGFuIDM7XFxyXFxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTBkZWcpO1xcclxcbiAgICB9XFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuICAmX19ib3V0ZWlsbGUge1xcclxcbiAgICBncmlkLWNvbHVtbjogNyAvIHNwYW4gMjtcXHJcXG4gICAgZ3JpZC1yb3c6IDMgLyBzcGFuIDg7XFxyXFxuICAgIHotaW5kZXg6IDE7XFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuICAmX190ZXh0ZSB7XFxyXFxuICAgIGdyaWQtY29sdW1uOiA5IC8gc3BhbiAyO1xcclxcbiAgICBncmlkLXJvdzogMTAgLyBzcGFuIDI7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiA4MDA7XFxyXFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLnBob3RvcyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg2LCAxZnIpO1xcclxcbiAgJl9faW1nQ29udGFpbmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZDogYmxhY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1heC1oZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAmOm50aC1jaGlsZCgxKSB7XFxyXFxuICAgICAgZ3JpZC1jb2x1bW46IDIgLyBzcGFuIDQ7XFxyXFxuICAgICAgZ3JpZC1yb3c6IDIgLyBzcGFuIDM7XFxyXFxuICAgICAgLy8gdHJhbnNmb3JtOiByb3RhdGUoLThkZWcpO1xcclxcbiAgICB9XFxyXFxuICAgICY6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgICBncmlkLWNvbHVtbjogOCAvIHNwYW4gNDtcXHJcXG4gICAgICBncmlkLXJvdzogMyAvIHNwYW4gMztcXHJcXG4gICAgICAvLyB0cmFuc2Zvcm06IHJvdGF0ZSg1ZGVnKTtcXHJcXG4gICAgICB6LWluZGV4OiAxO1xcclxcbiAgICB9XFxyXFxuICAgICY6bnRoLWNoaWxkKDMpIHtcXHJcXG4gICAgICBncmlkLWNvbHVtbjogNiAvIHNwYW4gMztcXHJcXG4gICAgICBncmlkLXJvdzogMSAvIHNwYW4gNTtcXHJcXG4gICAgICAvLyB0cmFuc2Zvcm06IHJvdGF0ZSg2ZGVnKTtcXHJcXG4gICAgfVxcclxcbiAgICBpbWcge1xcclxcbiAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlLW91dDtcXHJcXG4gICAgICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG4gICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICAvLyBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuICAgICY6aG92ZXIsXFxyXFxuICAgICY6Zm9jdXMge1xcclxcbiAgICAgIHotaW5kZXg6IDEwO1xcclxcbiAgICAgIGltZyB7XFxyXFxuICAgICAgICBvcGFjaXR5OiAwLjQ7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICAgIGZpZ2NhcHRpb24ge1xcclxcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICBsZWZ0OiAwO1xcclxcbiAgICAgIHRvcDogMDtcXHJcXG4gICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgICAgb3BhY2l0eTogMTtcXHJcXG4gICAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBUaW1lcywgc2VyaWY7XFxyXFxuICAgICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcclxcbiAgICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XFxyXFxuICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGNlbnRlcjtcXHJcXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xcclxcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0O1xcclxcbiAgICAgIHAge1xcclxcbiAgICAgICAgd2lkdGg6IDcwJTtcXHJcXG4gICAgICAgIGFzcGVjdC1yYXRpbzogMTtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDFyZW07XFxyXFxuICAgICAgICAvLyBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgICAmOmhvdmVyLFxcclxcbiAgICAmOmZvY3VzIHtcXHJcXG4gICAgICBmaWdjYXB0aW9uIHtcXHJcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi50YXBpcyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgJl9fY2FyZCB7XFxyXFxuICAgIGhlaWdodDogODAlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgfVxcclxcbiAgJl9faW1nQ29udGFpbmVyIHtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBhbmltYXRpb246IGZsb2F0IDZzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xcclxcbiAgICAvLyBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgMjVweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC42KSk7XFxyXFxuICAgIC8vIHRyYW5zZm9ybTogdHJhbnNsYXRleSgtMjBweCk7XFxyXFxuICB9XFxyXFxuICAmX19pbmZvcyB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgVGltZXMsIHNlcmlmO1xcclxcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICAgIHNwYW4ge1xcclxcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoIDFweCBibGFjaztcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4ucHJvbW8ge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg2LCAxZnIpO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBwYWRkaW5nOiAxcmVtIDA7XFxyXFxuICAmX19pbWdDb250YWluZXIge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgfVxcclxcbiAgICAmOm50aC1jaGlsZCgxKSB7XFxyXFxuICAgICAgZ3JpZC1jb2x1bW46IDIgLyBzcGFuIDQ7XFxyXFxuICAgICAgZ3JpZC1yb3c6IDEgLyBzcGFuIDM7XFxyXFxuICAgICAgei1pbmRleDogMTtcXHJcXG4gICAgICBpbWcge1xcclxcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxyXFxuICAgICAgICAmLmlzLWludmlldyB7XFxyXFxuICAgICAgICAgIGFuaW1hdGlvbjogYmxvcCAxcyBsaW5lYXIgMC41cyAxIGJvdGg7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICAgICY6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgICBncmlkLWNvbHVtbjogMSAvIHNwYW4gNDtcXHJcXG4gICAgICBncmlkLXJvdzogMiAvIHNwYW4gNjtcXHJcXG4gICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxyXFxuICAgICAgaGVpZ2h0OiA4MCU7XFxyXFxuICAgICAgaW1nIHtcXHJcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC01ZGVnKTtcXHJcXG4gICAgICB9XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG4gICZfX2NvZGUge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgYmFja2dyb3VuZDogcmVkO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4uY29udGFjdCB7XFxyXFxuICBmb250LWZhbWlseTogR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcXHJcXG4gICZfX2Zvcm0ge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGlucHV0LFxcclxcbiAgICBsYWJlbCxcXHJcXG4gICAgdGV4dGFyZWEge1xcclxcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICAgIGxpbmUtaGVpZ2h0OiAyO1xcclxcbiAgICB9XFxyXFxuICAgIFt0eXBlPSd0ZXh0J10sXFxyXFxuICAgIFt0eXBlPSdlbWFpbCddLFxcclxcbiAgICB0ZXh0YXJlYSB7XFxyXFxuICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgYmFja2dyb3VuZDogI2I5YjhiODtcXHJcXG4gICAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgICAgb3V0bGluZTogbm9uZTtcXHJcXG4gICAgICByZXNpemU6IG5vbmU7XFxyXFxuICAgICAgcGFkZGluZzogMC4zcmVtO1xcclxcbiAgICB9XFxyXFxuICAgIGxhYmVsIHtcXHJcXG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICAgIH1cXHJcXG4gICAgW3R5cGU9J3N1Ym1pdCddIHtcXHJcXG4gICAgICBmbG9hdDogcmlnaHQ7XFxyXFxuICAgICAgbWFyZ2luLXRvcDogMXJlbTtcXHJcXG4gICAgICBwYWRkaW5nOiAwIDAuM3JlbTtcXHJcXG4gICAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgICAgZm9udC1mYW1pbHk6IEdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBUaW1lcywgc2VyaWY7XFxyXFxuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbiAgICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgICBvdXRsaW5lOiBub25lO1xcclxcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOiAjZDdkN2Q3O1xcclxcbiAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHggM3B4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbiAgJl9fdGltYnJlIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IC0ycmVtO1xcclxcbiAgICByaWdodDogMDtcXHJcXG4gICAgbWF4LWhlaWdodDogN3JlbTtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMjAwcHgsIC01MHB4KSByb3RhdGUoLTgwZGVnKTtcXHJcXG4gICAgb3BhY2l0eTogMDtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDEuNnMgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNTYsIDAuNjQsIDEpO1xcclxcbiAgICAmLmlzLWludmlldyB7XFxyXFxuICAgICAgb3BhY2l0eTogMTtcXHJcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSByb3RhdGUoMCk7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLmZvb3RlciB7XFxyXFxuICAmX19jb250YWluZXIge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHBhZGRpbmc6IDFyZW07XFxyXFxuICAgIGhlaWdodDogOTAlO1xcclxcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcclxcbiAgICBhc3BlY3QtcmF0aW86IDEvMTtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXHJcXG4gIH1cXHJcXG4gICZfX3RleHQge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIG1heC13aWR0aDogNzAlO1xcclxcbiAgICBmb250LWZhbWlseTogR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcXHJcXG4gIH1cXHJcXG4gICZfX2ltZ0NvbnRhaW5lciB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgcmlnaHQ6IDA7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgYm90dG9tOiAwO1xcclxcbiAgICB6LWluZGV4OiAtMTtcXHJcXG4gICAgYW5pbWF0aW9uOiByb3QgMTBzIGVhc2UtaW4tb3V0IDAuM3MgaW5maW5pdGUgYm90aDtcXHJcXG4gICAgaW1nIHtcXHJcXG4gICAgICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG4gICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllciB7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICBsZWZ0OiAwO1xcclxcbiAgcmlnaHQ6IDA7XFxyXFxuICB0b3A6IC0zLjRyZW07XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcclxcbiAgYmFja2dyb3VuZDogI2VjZTI5NjtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcXHJcXG4gIGZvbnQtc2l6ZTogMDtcXHJcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XFxyXFxuICAmLnZpc2libGUge1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwJSk7XFxyXFxuICB9XFxyXFxuICAmX19oYW5kbGUge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDUwJTtcXHJcXG4gICAgdG9wOiAxMDAlO1xcclxcbiAgICB3aWR0aDogMnJlbTtcXHJcXG4gICAgaGVpZ2h0OiAycmVtO1xcclxcbiAgICBwYWRkaW5nOiAwLjNyZW07XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDAgMCA1MCUgNTAlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZmZlYzU4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICBpbWcge1xcclxcbiAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcbiAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcztcXHJcXG4gICAgfVxcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBzdmcge1xcclxcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgICAmOjpiZWZvcmUge1xcclxcbiAgICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICAgIHotaW5kZXg6IC0xO1xcclxcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICBsZWZ0OiAwO1xcclxcbiAgICAgIHRvcDogMDtcXHJcXG4gICAgICB3aWR0aDogMTAwdnc7XFxyXFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcclxcbiAgICAgIGhlaWdodDogMC40cmVtO1xcclxcbiAgICAgIGJhY2tncm91bmQ6ICNmZmVjNTg7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG4gIGJ1dHRvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgYmFja2dyb3VuZDogI2ZmZWM1ODtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBvdXRsaW5lOiBub25lO1xcclxcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcclxcbiAgICAvLyB3aWR0aDogM3JlbTtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgcGFkZGluZzogMC4zMTI1cmVtO1xcclxcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZS1vdXQ7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ICNmZmQyNTg7XFxyXFxuICAgIH1cXHJcXG4gICAgaW1nIHtcXHJcXG4gICAgICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG4gICAgICBvYmplY3QtcG9zaXRpb246IGNlbnRlcjtcXHJcXG4gICAgICBoZWlnaHQ6IDYwJTtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbiAgLnBhdXNlIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gIH1cXHJcXG4gIC5wcm9ncmVzc0JhckNvbnRhaW5lciB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogI2Y3ZjNmMDtcXHJcXG4gICAgbWluLWhlaWdodDogMTAwJTtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIH1cXHJcXG4gIC5wcm9ncmVzc0JhciB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBib3R0b206IDA7XFxyXFxuICAgIHdpZHRoOiAwJTtcXHJcXG4gICAgYmFja2dyb3VuZDogI2ZmZWM1ODtcXHJcXG4gIH1cXHJcXG4gIC50aXRyZSB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgbGVmdDogNTAlO1xcclxcbiAgICB0b3A6IDUwJTtcXHJcXG4gICAgY29sb3I6IGJsYWNrO1xcclxcbiAgICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcclxcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICAgIG1peC1ibGVuZC1tb2RlOiBjb2xvci1idXJuO1xcclxcbiAgfVxcclxcbiAgLmR1cmVlIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICByaWdodDogMXJlbTtcXHJcXG4gICAgdG9wOiA1MCU7XFxyXFxuICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtNTAlKTtcXHJcXG4gICAgbWl4LWJsZW5kLW1vZGU6IGNvbG9yLWJ1cm47XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi53aW5kb3cge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgbGVmdDogNTAlO1xcclxcbiAgdG9wOiA1MCU7XFxyXFxuICBtYXgtd2lkdGg6IDQwMHB4O1xcclxcbiAgYmFja2dyb3VuZDogI2Y4ZjZlNjtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweCA1cHggMCAwO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwNTBlMDtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcXHJcXG4gICZfX2hhbmRsZSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGhlaWdodDogMS4ycmVtO1xcclxcbiAgICBwYWRkaW5nOiAwIDAuMnJlbTtcXHJcXG4gICAgYmFja2dyb3VuZDogYmx1ZTtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjMDA1MGUwLCAjMzg5MGY4KTtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBjdXJzb3I6IG1vdmU7XFxyXFxuICB9XFxyXFxuICAmX190aXRsZSB7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxyXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIH1cXHJcXG4gICZfX2Nsb3NlQnRuIHtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuICAgIGhlaWdodDogMXJlbTtcXHJcXG4gICAgd2lkdGg6IGF1dG87XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxcmVtO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgICBhc3BlY3QtcmF0aW86IDE7XFxyXFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudCgjZTY2YTRkLCAjYjMzNjE1KTtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICB9XFxyXFxuICAmX19jb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGdhcDogMXJlbTtcXHJcXG4gICAgcGFkZGluZzogMXJlbTtcXHJcXG4gIH1cXHJcXG4gICZfX2NvbmZpcm1CdG4ge1xcclxcbiAgICBwYWRkaW5nOiAwLjJyZW0gMXJlbTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxyXFxuICAgIG91dGxpbmU6IDFweCBzb2xpZCBncmV5O1xcclxcbiAgICBvdXRsaW5lLW9mZnNldDogLTJweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIixcIi8qISBsb2NvbW90aXZlLXNjcm9sbCB2NC4xLjEgfCBNSVQgTGljZW5zZSB8IGh0dHBzOi8vZ2l0aHViLmNvbS9sb2NvbW90aXZlbXRsL2xvY29tb3RpdmUtc2Nyb2xsICovXFxyXFxuaHRtbC5oYXMtc2Nyb2xsLXNtb290aCB7XFxyXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sLmhhcy1zY3JvbGwtZHJhZ2dpbmcge1xcclxcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmhhcy1zY3JvbGwtc21vb3RoIGJvZHkge1xcclxcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmhhcy1zY3JvbGwtc21vb3RoIFtkYXRhLXNjcm9sbC1jb250YWluZXJdIHtcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcbn1cXHJcXG5cXHJcXG5bZGF0YS1zY3JvbGwtZGlyZWN0aW9uPSdob3Jpem9udGFsJ10gW2RhdGEtc2Nyb2xsLWNvbnRhaW5lcl0ge1xcclxcbiAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxufVxcclxcblxcclxcbltkYXRhLXNjcm9sbC1kaXJlY3Rpb249J2hvcml6b250YWwnXSBbZGF0YS1zY3JvbGwtc2VjdGlvbl0ge1xcclxcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcXHJcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi5jLXNjcm9sbGJhciB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICByaWdodDogMDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIHdpZHRoOiAxMXB4O1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHJpZ2h0O1xcclxcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MsIG9wYWNpdHkgMC4zcztcXHJcXG4gIG9wYWNpdHk6IDA7XFxyXFxufVxcclxcbi5jLXNjcm9sbGJhcjpob3ZlciB7XFxyXFxuICB0cmFuc2Zvcm06IHNjYWxlWCgxLjQ1KTtcXHJcXG59XFxyXFxuLmMtc2Nyb2xsYmFyOmhvdmVyLFxcclxcbi5oYXMtc2Nyb2xsLXNjcm9sbGluZyAuYy1zY3JvbGxiYXIsXFxyXFxuLmhhcy1zY3JvbGwtZHJhZ2dpbmcgLmMtc2Nyb2xsYmFyIHtcXHJcXG4gIG9wYWNpdHk6IDE7XFxyXFxufVxcclxcbltkYXRhLXNjcm9sbC1kaXJlY3Rpb249J2hvcml6b250YWwnXSAuYy1zY3JvbGxiYXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDEwcHg7XFxyXFxuICB0b3A6IGF1dG87XFxyXFxuICBib3R0b206IDA7XFxyXFxuICB0cmFuc2Zvcm06IHNjYWxlWSgxKTtcXHJcXG59XFxyXFxuW2RhdGEtc2Nyb2xsLWRpcmVjdGlvbj0naG9yaXpvbnRhbCddIC5jLXNjcm9sbGJhcjpob3ZlciB7XFxyXFxuICB0cmFuc2Zvcm06IHNjYWxlWSgxLjMpO1xcclxcbn1cXHJcXG5cXHJcXG4uYy1zY3JvbGxiYXJfdGh1bWIge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgdG9wOiAwO1xcclxcbiAgcmlnaHQ6IDA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG4gIG9wYWNpdHk6IDAuNTtcXHJcXG4gIHdpZHRoOiA3cHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgbWFyZ2luOiAycHg7XFxyXFxuICBjdXJzb3I6IC13ZWJraXQtZ3JhYjtcXHJcXG4gIGN1cnNvcjogZ3JhYjtcXHJcXG59XFxyXFxuLmhhcy1zY3JvbGwtZHJhZ2dpbmcgLmMtc2Nyb2xsYmFyX3RodW1iIHtcXHJcXG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiYmluZztcXHJcXG4gIGN1cnNvcjogZ3JhYmJpbmc7XFxyXFxufVxcclxcbltkYXRhLXNjcm9sbC1kaXJlY3Rpb249J2hvcml6b250YWwnXSAuYy1zY3JvbGxiYXJfdGh1bWIge1xcclxcbiAgcmlnaHQ6IGF1dG87XFxyXFxuICBib3R0b206IDA7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCB0aGlzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW19pXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IG1vZHVsZXMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaTJdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIi8qIGxvY29tb3RpdmUtc2Nyb2xsIHY0LjEuMSB8IE1JVCBMaWNlbnNlIHwgaHR0cHM6Ly9naXRodWIuY29tL2xvY29tb3RpdmVtdGwvbG9jb21vdGl2ZS1zY3JvbGwgKi9cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTtcbiAgICBpZiAoZW51bWVyYWJsZU9ubHkpIHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTtcbiAgICB9KTtcbiAgICBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7XG4gIH1cblxuICByZXR1cm4ga2V5cztcbn1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZDIodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG5cbiAgICBpZiAoaSAlIDIpIHtcbiAgICAgIG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTtcbiAgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTtcblxuICB0cnkge1xuICAgIERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoRGF0ZSwgW10sIGZ1bmN0aW9uICgpIHt9KSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkge1xuICB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTtcblxuICByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7XG4gICAgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLFxuICAgICAgICByZXN1bHQ7XG5cbiAgICBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkge1xuICAgICAgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjtcblxuICAgICAgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gX3N1cGVyUHJvcEJhc2Uob2JqZWN0LCBwcm9wZXJ0eSkge1xuICB3aGlsZSAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkge1xuICAgIG9iamVjdCA9IF9nZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICAgIGlmIChvYmplY3QgPT09IG51bGwpIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgIT09IFwidW5kZWZpbmVkXCIgJiYgUmVmbGVjdC5nZXQpIHtcbiAgICBfZ2V0ID0gUmVmbGVjdC5nZXQ7XG4gIH0gZWxzZSB7XG4gICAgX2dldCA9IGZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgIHZhciBiYXNlID0gX3N1cGVyUHJvcEJhc2UodGFyZ2V0LCBwcm9wZXJ0eSk7XG5cbiAgICAgIGlmICghYmFzZSkgcmV0dXJuO1xuICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIHByb3BlcnR5KTtcblxuICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgIHJldHVybiBkZXNjLmdldC5jYWxsKHJlY2VpdmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyIHx8IHRhcmdldCk7XG59XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KGFycik7XG59XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuXG4gIHJldHVybiBhcnIyO1xufVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGVsOiBkb2N1bWVudCxcbiAgbmFtZTogJ3Njcm9sbCcsXG4gIG9mZnNldDogWzAsIDBdLFxuICByZXBlYXQ6IGZhbHNlLFxuICBzbW9vdGg6IGZhbHNlLFxuICBpbml0UG9zaXRpb246IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfSxcbiAgZGlyZWN0aW9uOiAndmVydGljYWwnLFxuICBnZXN0dXJlRGlyZWN0aW9uOiAndmVydGljYWwnLFxuICByZWxvYWRPbkNvbnRleHRDaGFuZ2U6IGZhbHNlLFxuICBsZXJwOiAwLjEsXG4gIFwiY2xhc3NcIjogJ2lzLWludmlldycsXG4gIHNjcm9sbGJhckNvbnRhaW5lcjogZmFsc2UsXG4gIHNjcm9sbGJhckNsYXNzOiAnYy1zY3JvbGxiYXInLFxuICBzY3JvbGxpbmdDbGFzczogJ2hhcy1zY3JvbGwtc2Nyb2xsaW5nJyxcbiAgZHJhZ2dpbmdDbGFzczogJ2hhcy1zY3JvbGwtZHJhZ2dpbmcnLFxuICBzbW9vdGhDbGFzczogJ2hhcy1zY3JvbGwtc21vb3RoJyxcbiAgaW5pdENsYXNzOiAnaGFzLXNjcm9sbC1pbml0JyxcbiAgZ2V0U3BlZWQ6IGZhbHNlLFxuICBnZXREaXJlY3Rpb246IGZhbHNlLFxuICBzY3JvbGxGcm9tQW55d2hlcmU6IGZhbHNlLFxuICBtdWx0aXBsaWVyOiAxLFxuICBmaXJlZm94TXVsdGlwbGllcjogNTAsXG4gIHRvdWNoTXVsdGlwbGllcjogMixcbiAgcmVzZXROYXRpdmVTY3JvbGw6IHRydWUsXG4gIHRhYmxldDoge1xuICAgIHNtb290aDogZmFsc2UsXG4gICAgZGlyZWN0aW9uOiAndmVydGljYWwnLFxuICAgIGdlc3R1cmVEaXJlY3Rpb246ICd2ZXJ0aWNhbCcsXG4gICAgYnJlYWtwb2ludDogMTAyNFxuICB9LFxuICBzbWFydHBob25lOiB7XG4gICAgc21vb3RoOiBmYWxzZSxcbiAgICBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsXG4gICAgZ2VzdHVyZURpcmVjdGlvbjogJ3ZlcnRpY2FsJ1xuICB9XG59O1xuXG52YXIgX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBfZGVmYXVsdCgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgX2RlZmF1bHQpO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5zbWFydHBob25lID0gZGVmYXVsdHMuc21hcnRwaG9uZTtcbiAgICBpZiAob3B0aW9ucy5zbWFydHBob25lKSBPYmplY3QuYXNzaWduKHRoaXMuc21hcnRwaG9uZSwgb3B0aW9ucy5zbWFydHBob25lKTtcbiAgICB0aGlzLnRhYmxldCA9IGRlZmF1bHRzLnRhYmxldDtcbiAgICBpZiAob3B0aW9ucy50YWJsZXQpIE9iamVjdC5hc3NpZ24odGhpcy50YWJsZXQsIG9wdGlvbnMudGFibGV0KTtcbiAgICB0aGlzLm5hbWVzcGFjZSA9ICdsb2NvbW90aXZlJztcbiAgICB0aGlzLmh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMud2luZG93TWlkZGxlID0ge1xuICAgICAgeDogdGhpcy53aW5kb3dXaWR0aCAvIDIsXG4gICAgICB5OiB0aGlzLndpbmRvd0hlaWdodCAvIDJcbiAgICB9O1xuICAgIHRoaXMuZWxzID0ge307XG4gICAgdGhpcy5jdXJyZW50RWxlbWVudHMgPSB7fTtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgIHRoaXMuaGFzU2Nyb2xsVGlja2luZyA9IGZhbHNlO1xuICAgIHRoaXMuaGFzQ2FsbEV2ZW50U2V0ID0gZmFsc2U7XG4gICAgdGhpcy5jaGVja1Njcm9sbCA9IHRoaXMuY2hlY2tTY3JvbGwuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNoZWNrUmVzaXplID0gdGhpcy5jaGVja1Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hlY2tFdmVudCA9IHRoaXMuY2hlY2tFdmVudC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaW5zdGFuY2UgPSB7XG4gICAgICBzY3JvbGw6IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfSxcbiAgICAgIGxpbWl0OiB7XG4gICAgICAgIHg6IHRoaXMuaHRtbC5vZmZzZXRXaWR0aCxcbiAgICAgICAgeTogdGhpcy5odG1sLm9mZnNldEhlaWdodFxuICAgICAgfSxcbiAgICAgIGN1cnJlbnRFbGVtZW50czogdGhpcy5jdXJyZW50RWxlbWVudHNcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcbiAgICAgIGlmICh0aGlzLmlzVGFibGV0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9ICd0YWJsZXQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gJ3NtYXJ0cGhvbmUnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSAnZGVza3RvcCc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUpIHRoaXMuZGlyZWN0aW9uID0gdGhpc1t0aGlzLmNvbnRleHRdLmRpcmVjdGlvbjtcblxuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB0aGlzLmRpcmVjdGlvbkF4aXMgPSAneCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlyZWN0aW9uQXhpcyA9ICd5JztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXREaXJlY3Rpb24pIHtcbiAgICAgIHRoaXMuaW5zdGFuY2UuZGlyZWN0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXREaXJlY3Rpb24pIHtcbiAgICAgIHRoaXMuaW5zdGFuY2Uuc3BlZWQgPSAwO1xuICAgIH1cblxuICAgIHRoaXMuaHRtbC5jbGFzc0xpc3QuYWRkKHRoaXMuaW5pdENsYXNzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jaGVja1Jlc2l6ZSwgZmFsc2UpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKF9kZWZhdWx0LCBbe1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2hlY2tTY3JvbGxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2hlY2tTY3JvbGwoKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoU2Nyb2xsKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNoZWNrUmVzaXplXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrUmVzaXplKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKCF0aGlzLnJlc2l6ZVRpY2spIHtcbiAgICAgICAgdGhpcy5yZXNpemVUaWNrID0gdHJ1ZTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy5yZXNpemUoKTtcblxuICAgICAgICAgIF90aGlzLnJlc2l6ZVRpY2sgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlc2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNpemUoKSB7fVxuICB9LCB7XG4gICAga2V5OiBcImNoZWNrQ29udGV4dFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGVja0NvbnRleHQoKSB7XG4gICAgICBpZiAoIXRoaXMucmVsb2FkT25Db250ZXh0Q2hhbmdlKSByZXR1cm47XG4gICAgICB0aGlzLmlzTW9iaWxlID0gL0FuZHJvaWR8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxIHx8IHRoaXMud2luZG93V2lkdGggPCB0aGlzLnRhYmxldC5icmVha3BvaW50O1xuICAgICAgdGhpcy5pc1RhYmxldCA9IHRoaXMuaXNNb2JpbGUgJiYgdGhpcy53aW5kb3dXaWR0aCA+PSB0aGlzLnRhYmxldC5icmVha3BvaW50O1xuICAgICAgdmFyIG9sZENvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG5cbiAgICAgIGlmICh0aGlzLmlzTW9iaWxlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVGFibGV0KSB7XG4gICAgICAgICAgdGhpcy5jb250ZXh0ID0gJ3RhYmxldCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb250ZXh0ID0gJ3NtYXJ0cGhvbmUnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSAnZGVza3RvcCc7XG4gICAgICB9XG5cbiAgICAgIGlmIChvbGRDb250ZXh0ICE9IHRoaXMuY29udGV4dCkge1xuICAgICAgICB2YXIgb2xkU21vb3RoID0gb2xkQ29udGV4dCA9PSAnZGVza3RvcCcgPyB0aGlzLnNtb290aCA6IHRoaXNbb2xkQ29udGV4dF0uc21vb3RoO1xuICAgICAgICB2YXIgbmV3U21vb3RoID0gdGhpcy5jb250ZXh0ID09ICdkZXNrdG9wJyA/IHRoaXMuc21vb3RoIDogdGhpc1t0aGlzLmNvbnRleHRdLnNtb290aDtcbiAgICAgICAgaWYgKG9sZFNtb290aCAhPSBuZXdTbW9vdGgpIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5pdEV2ZW50c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0RXZlbnRzKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuc2Nyb2xsVG9FbHMgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1cIi5jb25jYXQodGhpcy5uYW1lLCBcIi10b11cIikpO1xuICAgICAgdGhpcy5zZXRTY3JvbGxUbyA9IHRoaXMuc2V0U2Nyb2xsVG8uYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuc2Nyb2xsVG9FbHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfdGhpczIuc2V0U2Nyb2xsVG8sIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZXRTY3JvbGxUb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTY3JvbGxUbyhldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2Nyb2xsVG8oZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiLmNvbmNhdCh0aGlzLm5hbWUsIFwiLWhyZWZcIikpIHx8IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJyksIHtcbiAgICAgICAgb2Zmc2V0OiBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtXCIuY29uY2F0KHRoaXMubmFtZSwgXCItb2Zmc2V0XCIpKVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZEVsZW1lbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEVsZW1lbnRzKCkge31cbiAgfSwge1xuICAgIGtleTogXCJkZXRlY3RFbGVtZW50c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRlY3RFbGVtZW50cyhoYXNDYWxsRXZlbnRTZXQpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgc2Nyb2xsVG9wID0gdGhpcy5pbnN0YW5jZS5zY3JvbGwueTtcbiAgICAgIHZhciBzY3JvbGxCb3R0b20gPSBzY3JvbGxUb3AgKyB0aGlzLndpbmRvd0hlaWdodDtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gdGhpcy5pbnN0YW5jZS5zY3JvbGwueDtcbiAgICAgIHZhciBzY3JvbGxSaWdodCA9IHNjcm9sbExlZnQgKyB0aGlzLndpbmRvd1dpZHRoO1xuICAgICAgT2JqZWN0LmVudHJpZXModGhpcy5lbHMpLmZvckVhY2goZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgdmFyIF9yZWYyID0gX3NsaWNlZFRvQXJyYXkoX3JlZiwgMiksXG4gICAgICAgICAgICBpID0gX3JlZjJbMF0sXG4gICAgICAgICAgICBlbCA9IF9yZWYyWzFdO1xuXG4gICAgICAgIGlmIChlbCAmJiAoIWVsLmluVmlldyB8fCBoYXNDYWxsRXZlbnRTZXQpKSB7XG4gICAgICAgICAgaWYgKF90aGlzMy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgaWYgKHNjcm9sbFJpZ2h0ID49IGVsLmxlZnQgJiYgc2Nyb2xsTGVmdCA8IGVsLnJpZ2h0KSB7XG4gICAgICAgICAgICAgIF90aGlzMy5zZXRJblZpZXcoZWwsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsQm90dG9tID49IGVsLnRvcCAmJiBzY3JvbGxUb3AgPCBlbC5ib3R0b20pIHtcbiAgICAgICAgICAgICAgX3RoaXMzLnNldEluVmlldyhlbCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsICYmIGVsLmluVmlldykge1xuICAgICAgICAgIGlmIChfdGhpczMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IGVsLnJpZ2h0IC0gZWwubGVmdDtcbiAgICAgICAgICAgIGVsLnByb2dyZXNzID0gKF90aGlzMy5pbnN0YW5jZS5zY3JvbGwueCAtIChlbC5sZWZ0IC0gX3RoaXMzLndpbmRvd1dpZHRoKSkgLyAod2lkdGggKyBfdGhpczMud2luZG93V2lkdGgpO1xuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsUmlnaHQgPCBlbC5sZWZ0IHx8IHNjcm9sbExlZnQgPiBlbC5yaWdodCkge1xuICAgICAgICAgICAgICBfdGhpczMuc2V0T3V0T2ZWaWV3KGVsLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGhlaWdodCA9IGVsLmJvdHRvbSAtIGVsLnRvcDtcbiAgICAgICAgICAgIGVsLnByb2dyZXNzID0gKF90aGlzMy5pbnN0YW5jZS5zY3JvbGwueSAtIChlbC50b3AgLSBfdGhpczMud2luZG93SGVpZ2h0KSkgLyAoaGVpZ2h0ICsgX3RoaXMzLndpbmRvd0hlaWdodCk7XG5cbiAgICAgICAgICAgIGlmIChzY3JvbGxCb3R0b20gPCBlbC50b3AgfHwgc2Nyb2xsVG9wID4gZWwuYm90dG9tKSB7XG4gICAgICAgICAgICAgIF90aGlzMy5zZXRPdXRPZlZpZXcoZWwsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7IC8vIHRoaXMuZWxzID0gdGhpcy5lbHMuZmlsdGVyKChjdXJyZW50LCBpKSA9PiB7XG4gICAgICAvLyAgICAgcmV0dXJuIGN1cnJlbnQgIT09IG51bGw7XG4gICAgICAvLyB9KTtcblxuICAgICAgdGhpcy5oYXNTY3JvbGxUaWNraW5nID0gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNldEluVmlld1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRJblZpZXcoY3VycmVudCwgaSkge1xuICAgICAgdGhpcy5lbHNbaV0uaW5WaWV3ID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnQuZWwuY2xhc3NMaXN0LmFkZChjdXJyZW50W1wiY2xhc3NcIl0pO1xuICAgICAgdGhpcy5jdXJyZW50RWxlbWVudHNbaV0gPSBjdXJyZW50O1xuXG4gICAgICBpZiAoY3VycmVudC5jYWxsICYmIHRoaXMuaGFzQ2FsbEV2ZW50U2V0KSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDYWxsKGN1cnJlbnQsICdlbnRlcicpO1xuXG4gICAgICAgIGlmICghY3VycmVudC5yZXBlYXQpIHtcbiAgICAgICAgICB0aGlzLmVsc1tpXS5jYWxsID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gaWYgKCFjdXJyZW50LnJlcGVhdCAmJiAhY3VycmVudC5zcGVlZCAmJiAhY3VycmVudC5zdGlja3kpIHtcbiAgICAgIC8vICAgICBpZiAoIWN1cnJlbnQuY2FsbCB8fCBjdXJyZW50LmNhbGwgJiYgdGhpcy5oYXNDYWxsRXZlbnRTZXQpIHtcbiAgICAgIC8vICAgICAgICB0aGlzLmVsc1tpXSA9IG51bGxcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyB9XG5cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0T3V0T2ZWaWV3XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldE91dE9mVmlldyhjdXJyZW50LCBpKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgLy8gaWYgKGN1cnJlbnQucmVwZWF0IHx8IGN1cnJlbnQuc3BlZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5lbHNbaV0uaW5WaWV3ID0gZmFsc2U7IC8vIH1cblxuICAgICAgT2JqZWN0LmtleXModGhpcy5jdXJyZW50RWxlbWVudHMpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGVsID09PSBpICYmIGRlbGV0ZSBfdGhpczQuY3VycmVudEVsZW1lbnRzW2VsXTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY3VycmVudC5jYWxsICYmIHRoaXMuaGFzQ2FsbEV2ZW50U2V0KSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDYWxsKGN1cnJlbnQsICdleGl0Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50LnJlcGVhdCkge1xuICAgICAgICBjdXJyZW50LmVsLmNsYXNzTGlzdC5yZW1vdmUoY3VycmVudFtcImNsYXNzXCJdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGlzcGF0Y2hDYWxsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc3BhdGNoQ2FsbChjdXJyZW50LCB3YXkpIHtcbiAgICAgIHRoaXMuY2FsbFdheSA9IHdheTtcbiAgICAgIHRoaXMuY2FsbFZhbHVlID0gY3VycmVudC5jYWxsLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnRyaW0oKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jYWxsT2JqID0gY3VycmVudDtcbiAgICAgIGlmICh0aGlzLmNhbGxWYWx1ZS5sZW5ndGggPT0gMSkgdGhpcy5jYWxsVmFsdWUgPSB0aGlzLmNhbGxWYWx1ZVswXTtcbiAgICAgIHZhciBjYWxsRXZlbnQgPSBuZXcgRXZlbnQodGhpcy5uYW1lc3BhY2UgKyAnY2FsbCcpO1xuICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KGNhbGxFdmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRpc3BhdGNoU2Nyb2xsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc3BhdGNoU2Nyb2xsKCkge1xuICAgICAgdmFyIHNjcm9sbEV2ZW50ID0gbmV3IEV2ZW50KHRoaXMubmFtZXNwYWNlICsgJ3Njcm9sbCcpO1xuICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KHNjcm9sbEV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0RXZlbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEV2ZW50cyhldmVudCwgZnVuYykge1xuICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgICB9XG5cbiAgICAgIHZhciBsaXN0ID0gdGhpcy5saXN0ZW5lcnNbZXZlbnRdO1xuICAgICAgbGlzdC5wdXNoKGZ1bmMpO1xuXG4gICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKHRoaXMubmFtZXNwYWNlICsgZXZlbnQsIHRoaXMuY2hlY2tFdmVudCwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQgPT09ICdjYWxsJykge1xuICAgICAgICB0aGlzLmhhc0NhbGxFdmVudFNldCA9IHRydWU7XG4gICAgICAgIHRoaXMuZGV0ZWN0RWxlbWVudHModHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVuc2V0RXZlbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuc2V0RXZlbnRzKGV2ZW50LCBmdW5jKSB7XG4gICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW2V2ZW50XSkgcmV0dXJuO1xuICAgICAgdmFyIGxpc3QgPSB0aGlzLmxpc3RlbmVyc1tldmVudF07XG4gICAgICB2YXIgaW5kZXggPSBsaXN0LmluZGV4T2YoZnVuYyk7XG4gICAgICBpZiAoaW5kZXggPCAwKSByZXR1cm47XG4gICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgIGlmIChsaXN0LmluZGV4ID09PSAwKSB7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLm5hbWVzcGFjZSArIGV2ZW50LCB0aGlzLmNoZWNrRXZlbnQsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2hlY2tFdmVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGVja0V2ZW50KGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgdmFyIG5hbWUgPSBldmVudC50eXBlLnJlcGxhY2UodGhpcy5uYW1lc3BhY2UsICcnKTtcbiAgICAgIHZhciBsaXN0ID0gdGhpcy5saXN0ZW5lcnNbbmFtZV07XG4gICAgICBpZiAoIWxpc3QgfHwgbGlzdC5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICBjYXNlICdzY3JvbGwnOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmMoX3RoaXM1Lmluc3RhbmNlKTtcblxuICAgICAgICAgIGNhc2UgJ2NhbGwnOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmMoX3RoaXM1LmNhbGxWYWx1ZSwgX3RoaXM1LmNhbGxXYXksIF90aGlzNS5jYWxsT2JqKTtcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZnVuYygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3RhcnRTY3JvbGxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnRTY3JvbGwoKSB7fVxuICB9LCB7XG4gICAga2V5OiBcInN0b3BTY3JvbGxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcFNjcm9sbCgpIHt9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0U2Nyb2xsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFNjcm9sbCh4LCB5KSB7XG4gICAgICB0aGlzLmluc3RhbmNlLnNjcm9sbCA9IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVzdHJveVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmNoZWNrUmVzaXplLCBmYWxzZSk7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgX3RoaXM2LmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoX3RoaXM2Lm5hbWVzcGFjZSArIGV2ZW50LCBfdGhpczYuY2hlY2tFdmVudCwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgICAgdGhpcy5zY3JvbGxUb0Vscy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF90aGlzNi5zZXRTY3JvbGxUbywgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmh0bWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmluaXRDbGFzcyk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIF9kZWZhdWx0O1xufSgpO1xuXG52YXIgY29tbW9uanNHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB7fTtcblxuZnVuY3Rpb24gY3JlYXRlQ29tbW9uanNNb2R1bGUoZm4sIG1vZHVsZSkge1xuXHRyZXR1cm4gbW9kdWxlID0geyBleHBvcnRzOiB7fSB9LCBmbihtb2R1bGUsIG1vZHVsZS5leHBvcnRzKSwgbW9kdWxlLmV4cG9ydHM7XG59XG5cbnZhciBzbW9vdGhzY3JvbGwgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlLCBleHBvcnRzKSB7XG4vKiBzbW9vdGhzY3JvbGwgdjAuNC40IC0gMjAxOSAtIER1c3RhbiBLYXN0ZW4sIEplcmVtaWFzIE1lbmljaGVsbGkgLSBNSVQgTGljZW5zZSAqL1xuKGZ1bmN0aW9uICgpIHtcblxuICAvLyBwb2x5ZmlsbFxuICBmdW5jdGlvbiBwb2x5ZmlsbCgpIHtcbiAgICAvLyBhbGlhc2VzXG4gICAgdmFyIHcgPSB3aW5kb3c7XG4gICAgdmFyIGQgPSBkb2N1bWVudDtcblxuICAgIC8vIHJldHVybiBpZiBzY3JvbGwgYmVoYXZpb3IgaXMgc3VwcG9ydGVkIGFuZCBwb2x5ZmlsbCBpcyBub3QgZm9yY2VkXG4gICAgaWYgKFxuICAgICAgJ3Njcm9sbEJlaGF2aW9yJyBpbiBkLmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJlxuICAgICAgdy5fX2ZvcmNlU21vb3RoU2Nyb2xsUG9seWZpbGxfXyAhPT0gdHJ1ZVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGdsb2JhbHNcbiAgICB2YXIgRWxlbWVudCA9IHcuSFRNTEVsZW1lbnQgfHwgdy5FbGVtZW50O1xuICAgIHZhciBTQ1JPTExfVElNRSA9IDQ2ODtcblxuICAgIC8vIG9iamVjdCBnYXRoZXJpbmcgb3JpZ2luYWwgc2Nyb2xsIG1ldGhvZHNcbiAgICB2YXIgb3JpZ2luYWwgPSB7XG4gICAgICBzY3JvbGw6IHcuc2Nyb2xsIHx8IHcuc2Nyb2xsVG8sXG4gICAgICBzY3JvbGxCeTogdy5zY3JvbGxCeSxcbiAgICAgIGVsZW1lbnRTY3JvbGw6IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbCB8fCBzY3JvbGxFbGVtZW50LFxuICAgICAgc2Nyb2xsSW50b1ZpZXc6IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEludG9WaWV3XG4gICAgfTtcblxuICAgIC8vIGRlZmluZSB0aW1pbmcgbWV0aG9kXG4gICAgdmFyIG5vdyA9XG4gICAgICB3LnBlcmZvcm1hbmNlICYmIHcucGVyZm9ybWFuY2Uubm93XG4gICAgICAgID8gdy5wZXJmb3JtYW5jZS5ub3cuYmluZCh3LnBlcmZvcm1hbmNlKVxuICAgICAgICA6IERhdGUubm93O1xuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGEgdGhlIGN1cnJlbnQgYnJvd3NlciBpcyBtYWRlIGJ5IE1pY3Jvc29mdFxuICAgICAqIEBtZXRob2QgaXNNaWNyb3NvZnRCcm93c2VyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVzZXJBZ2VudFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzTWljcm9zb2Z0QnJvd3Nlcih1c2VyQWdlbnQpIHtcbiAgICAgIHZhciB1c2VyQWdlbnRQYXR0ZXJucyA9IFsnTVNJRSAnLCAnVHJpZGVudC8nLCAnRWRnZS8nXTtcblxuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodXNlckFnZW50UGF0dGVybnMuam9pbignfCcpKS50ZXN0KHVzZXJBZ2VudCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBJRSBoYXMgcm91bmRpbmcgYnVnIHJvdW5kaW5nIGRvd24gY2xpZW50SGVpZ2h0IGFuZCBjbGllbnRXaWR0aCBhbmRcbiAgICAgKiByb3VuZGluZyB1cCBzY3JvbGxIZWlnaHQgYW5kIHNjcm9sbFdpZHRoIGNhdXNpbmcgZmFsc2UgcG9zaXRpdmVzXG4gICAgICogb24gaGFzU2Nyb2xsYWJsZVNwYWNlXG4gICAgICovXG4gICAgdmFyIFJPVU5ESU5HX1RPTEVSQU5DRSA9IGlzTWljcm9zb2Z0QnJvd3Nlcih3Lm5hdmlnYXRvci51c2VyQWdlbnQpID8gMSA6IDA7XG5cbiAgICAvKipcbiAgICAgKiBjaGFuZ2VzIHNjcm9sbCBwb3NpdGlvbiBpbnNpZGUgYW4gZWxlbWVudFxuICAgICAqIEBtZXRob2Qgc2Nyb2xsRWxlbWVudFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNjcm9sbEVsZW1lbnQoeCwgeSkge1xuICAgICAgdGhpcy5zY3JvbGxMZWZ0ID0geDtcbiAgICAgIHRoaXMuc2Nyb2xsVG9wID0geTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHJlc3VsdCBvZiBhcHBseWluZyBlYXNlIG1hdGggZnVuY3Rpb24gdG8gYSBudW1iZXJcbiAgICAgKiBAbWV0aG9kIGVhc2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0ga1xuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZWFzZShrKSB7XG4gICAgICByZXR1cm4gMC41ICogKDEgLSBNYXRoLmNvcyhNYXRoLlBJICogaykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluZGljYXRlcyBpZiBhIHNtb290aCBiZWhhdmlvciBzaG91bGQgYmUgYXBwbGllZFxuICAgICAqIEBtZXRob2Qgc2hvdWxkQmFpbE91dFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gZmlyc3RBcmdcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzaG91bGRCYWlsT3V0KGZpcnN0QXJnKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGZpcnN0QXJnID09PSBudWxsIHx8XG4gICAgICAgIHR5cGVvZiBmaXJzdEFyZyAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgZmlyc3RBcmcuYmVoYXZpb3IgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICBmaXJzdEFyZy5iZWhhdmlvciA9PT0gJ2F1dG8nIHx8XG4gICAgICAgIGZpcnN0QXJnLmJlaGF2aW9yID09PSAnaW5zdGFudCdcbiAgICAgICkge1xuICAgICAgICAvLyBmaXJzdCBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0L251bGxcbiAgICAgICAgLy8gb3IgYmVoYXZpb3IgaXMgYXV0bywgaW5zdGFudCBvciB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZmlyc3RBcmcgPT09ICdvYmplY3QnICYmIGZpcnN0QXJnLmJlaGF2aW9yID09PSAnc21vb3RoJykge1xuICAgICAgICAvLyBmaXJzdCBhcmd1bWVudCBpcyBhbiBvYmplY3QgYW5kIGJlaGF2aW9yIGlzIHNtb290aFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gYmVoYXZpb3IgaXMgbm90IHN1cHBvcnRlZFxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ2JlaGF2aW9yIG1lbWJlciBvZiBTY3JvbGxPcHRpb25zICcgK1xuICAgICAgICAgIGZpcnN0QXJnLmJlaGF2aW9yICtcbiAgICAgICAgICAnIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciBlbnVtZXJhdGlvbiBTY3JvbGxCZWhhdmlvci4nXG4gICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluZGljYXRlcyBpZiBhbiBlbGVtZW50IGhhcyBzY3JvbGxhYmxlIHNwYWNlIGluIHRoZSBwcm92aWRlZCBheGlzXG4gICAgICogQG1ldGhvZCBoYXNTY3JvbGxhYmxlU3BhY2VcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF4aXNcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNTY3JvbGxhYmxlU3BhY2UoZWwsIGF4aXMpIHtcbiAgICAgIGlmIChheGlzID09PSAnWScpIHtcbiAgICAgICAgcmV0dXJuIGVsLmNsaWVudEhlaWdodCArIFJPVU5ESU5HX1RPTEVSQU5DRSA8IGVsLnNjcm9sbEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgaWYgKGF4aXMgPT09ICdYJykge1xuICAgICAgICByZXR1cm4gZWwuY2xpZW50V2lkdGggKyBST1VORElOR19UT0xFUkFOQ0UgPCBlbC5zY3JvbGxXaWR0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbmRpY2F0ZXMgaWYgYW4gZWxlbWVudCBoYXMgYSBzY3JvbGxhYmxlIG92ZXJmbG93IHByb3BlcnR5IGluIHRoZSBheGlzXG4gICAgICogQG1ldGhvZCBjYW5PdmVyZmxvd1xuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXhpc1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNhbk92ZXJmbG93KGVsLCBheGlzKSB7XG4gICAgICB2YXIgb3ZlcmZsb3dWYWx1ZSA9IHcuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbClbJ292ZXJmbG93JyArIGF4aXNdO1xuXG4gICAgICByZXR1cm4gb3ZlcmZsb3dWYWx1ZSA9PT0gJ2F1dG8nIHx8IG92ZXJmbG93VmFsdWUgPT09ICdzY3JvbGwnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluZGljYXRlcyBpZiBhbiBlbGVtZW50IGNhbiBiZSBzY3JvbGxlZCBpbiBlaXRoZXIgYXhpc1xuICAgICAqIEBtZXRob2QgaXNTY3JvbGxhYmxlXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBheGlzXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTY3JvbGxhYmxlKGVsKSB7XG4gICAgICB2YXIgaXNTY3JvbGxhYmxlWSA9IGhhc1Njcm9sbGFibGVTcGFjZShlbCwgJ1knKSAmJiBjYW5PdmVyZmxvdyhlbCwgJ1knKTtcbiAgICAgIHZhciBpc1Njcm9sbGFibGVYID0gaGFzU2Nyb2xsYWJsZVNwYWNlKGVsLCAnWCcpICYmIGNhbk92ZXJmbG93KGVsLCAnWCcpO1xuXG4gICAgICByZXR1cm4gaXNTY3JvbGxhYmxlWSB8fCBpc1Njcm9sbGFibGVYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGZpbmRzIHNjcm9sbGFibGUgcGFyZW50IG9mIGFuIGVsZW1lbnRcbiAgICAgKiBAbWV0aG9kIGZpbmRTY3JvbGxhYmxlUGFyZW50XG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEByZXR1cm5zIHtOb2RlfSBlbFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRTY3JvbGxhYmxlUGFyZW50KGVsKSB7XG4gICAgICB3aGlsZSAoZWwgIT09IGQuYm9keSAmJiBpc1Njcm9sbGFibGUoZWwpID09PSBmYWxzZSkge1xuICAgICAgICBlbCA9IGVsLnBhcmVudE5vZGUgfHwgZWwuaG9zdDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNlbGYgaW52b2tlZCBmdW5jdGlvbiB0aGF0LCBnaXZlbiBhIGNvbnRleHQsIHN0ZXBzIHRocm91Z2ggc2Nyb2xsaW5nXG4gICAgICogQG1ldGhvZCBzdGVwXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0ZXAoY29udGV4dCkge1xuICAgICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHZhciBjdXJyZW50WDtcbiAgICAgIHZhciBjdXJyZW50WTtcbiAgICAgIHZhciBlbGFwc2VkID0gKHRpbWUgLSBjb250ZXh0LnN0YXJ0VGltZSkgLyBTQ1JPTExfVElNRTtcblxuICAgICAgLy8gYXZvaWQgZWxhcHNlZCB0aW1lcyBoaWdoZXIgdGhhbiBvbmVcbiAgICAgIGVsYXBzZWQgPSBlbGFwc2VkID4gMSA/IDEgOiBlbGFwc2VkO1xuXG4gICAgICAvLyBhcHBseSBlYXNpbmcgdG8gZWxhcHNlZCB0aW1lXG4gICAgICB2YWx1ZSA9IGVhc2UoZWxhcHNlZCk7XG5cbiAgICAgIGN1cnJlbnRYID0gY29udGV4dC5zdGFydFggKyAoY29udGV4dC54IC0gY29udGV4dC5zdGFydFgpICogdmFsdWU7XG4gICAgICBjdXJyZW50WSA9IGNvbnRleHQuc3RhcnRZICsgKGNvbnRleHQueSAtIGNvbnRleHQuc3RhcnRZKSAqIHZhbHVlO1xuXG4gICAgICBjb250ZXh0Lm1ldGhvZC5jYWxsKGNvbnRleHQuc2Nyb2xsYWJsZSwgY3VycmVudFgsIGN1cnJlbnRZKTtcblxuICAgICAgLy8gc2Nyb2xsIG1vcmUgaWYgd2UgaGF2ZSBub3QgcmVhY2hlZCBvdXIgZGVzdGluYXRpb25cbiAgICAgIGlmIChjdXJyZW50WCAhPT0gY29udGV4dC54IHx8IGN1cnJlbnRZICE9PSBjb250ZXh0LnkpIHtcbiAgICAgICAgdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcC5iaW5kKHcsIGNvbnRleHQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzY3JvbGxzIHdpbmRvdyBvciBlbGVtZW50IHdpdGggYSBzbW9vdGggYmVoYXZpb3JcbiAgICAgKiBAbWV0aG9kIHNtb290aFNjcm9sbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE5vZGV9IGVsXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKGVsLCB4LCB5KSB7XG4gICAgICB2YXIgc2Nyb2xsYWJsZTtcbiAgICAgIHZhciBzdGFydFg7XG4gICAgICB2YXIgc3RhcnRZO1xuICAgICAgdmFyIG1ldGhvZDtcbiAgICAgIHZhciBzdGFydFRpbWUgPSBub3coKTtcblxuICAgICAgLy8gZGVmaW5lIHNjcm9sbCBjb250ZXh0XG4gICAgICBpZiAoZWwgPT09IGQuYm9keSkge1xuICAgICAgICBzY3JvbGxhYmxlID0gdztcbiAgICAgICAgc3RhcnRYID0gdy5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQ7XG4gICAgICAgIHN0YXJ0WSA9IHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0O1xuICAgICAgICBtZXRob2QgPSBvcmlnaW5hbC5zY3JvbGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxhYmxlID0gZWw7XG4gICAgICAgIHN0YXJ0WCA9IGVsLnNjcm9sbExlZnQ7XG4gICAgICAgIHN0YXJ0WSA9IGVsLnNjcm9sbFRvcDtcbiAgICAgICAgbWV0aG9kID0gc2Nyb2xsRWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgLy8gc2Nyb2xsIGxvb3Bpbmcgb3ZlciBhIGZyYW1lXG4gICAgICBzdGVwKHtcbiAgICAgICAgc2Nyb2xsYWJsZTogc2Nyb2xsYWJsZSxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lLFxuICAgICAgICBzdGFydFg6IHN0YXJ0WCxcbiAgICAgICAgc3RhcnRZOiBzdGFydFksXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE9SSUdJTkFMIE1FVEhPRFMgT1ZFUlJJREVTXG4gICAgLy8gdy5zY3JvbGwgYW5kIHcuc2Nyb2xsVG9cbiAgICB3LnNjcm9sbCA9IHcuc2Nyb2xsVG8gPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbC5jYWxsKFxuICAgICAgICAgIHcsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBhcmd1bWVudHNbMF0ubGVmdFxuICAgICAgICAgICAgOiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICA/IGFyZ3VtZW50c1swXVxuICAgICAgICAgICAgICA6IHcuc2Nyb2xsWCB8fCB3LnBhZ2VYT2Zmc2V0LFxuICAgICAgICAgIC8vIHVzZSB0b3AgcHJvcCwgc2Vjb25kIGFyZ3VtZW50IGlmIHByZXNlbnQgb3IgZmFsbGJhY2sgdG8gc2Nyb2xsWVxuICAgICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBhcmd1bWVudHNbMF0udG9wXG4gICAgICAgICAgICA6IGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgID8gYXJndW1lbnRzWzFdXG4gICAgICAgICAgICAgIDogdy5zY3JvbGxZIHx8IHcucGFnZVlPZmZzZXRcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIExFVCBUSEUgU01PT1RITkVTUyBCRUdJTiFcbiAgICAgIHNtb290aFNjcm9sbC5jYWxsKFxuICAgICAgICB3LFxuICAgICAgICBkLmJvZHksXG4gICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLmxlZnRcbiAgICAgICAgICA6IHcuc2Nyb2xsWCB8fCB3LnBhZ2VYT2Zmc2V0LFxuICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLnRvcFxuICAgICAgICAgIDogdy5zY3JvbGxZIHx8IHcucGFnZVlPZmZzZXRcbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8vIHcuc2Nyb2xsQnlcbiAgICB3LnNjcm9sbEJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBhY3Rpb24gd2hlbiBubyBhcmd1bWVudHMgYXJlIHBhc3NlZFxuICAgICAgaWYgKGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSkge1xuICAgICAgICBvcmlnaW5hbC5zY3JvbGxCeS5jYWxsKFxuICAgICAgICAgIHcsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBhcmd1bWVudHNbMF0ubGVmdFxuICAgICAgICAgICAgOiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0JyA/IGFyZ3VtZW50c1swXSA6IDAsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS50b3BcbiAgICAgICAgICAgIDogYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXG4gICAgICBzbW9vdGhTY3JvbGwuY2FsbChcbiAgICAgICAgdyxcbiAgICAgICAgZC5ib2R5LFxuICAgICAgICB+fmFyZ3VtZW50c1swXS5sZWZ0ICsgKHcuc2Nyb2xsWCB8fCB3LnBhZ2VYT2Zmc2V0KSxcbiAgICAgICAgfn5hcmd1bWVudHNbMF0udG9wICsgKHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0KVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsIGFuZCBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxUb1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbCA9IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbFRvID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBhY3Rpb24gd2hlbiBubyBhcmd1bWVudHMgYXJlIHBhc3NlZFxuICAgICAgaWYgKGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBpZiBvbmUgbnVtYmVyIGlzIHBhc3NlZCwgdGhyb3cgZXJyb3IgdG8gbWF0Y2ggRmlyZWZveCBpbXBsZW1lbnRhdGlvblxuICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ251bWJlcicgJiYgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1ZhbHVlIGNvdWxkIG5vdCBiZSBjb252ZXJ0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9yaWdpbmFsLmVsZW1lbnRTY3JvbGwuY2FsbChcbiAgICAgICAgICB0aGlzLFxuICAgICAgICAgIC8vIHVzZSBsZWZ0IHByb3AsIGZpcnN0IG51bWJlciBhcmd1bWVudCBvciBmYWxsYmFjayB0byBzY3JvbGxMZWZ0XG4gICAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS5sZWZ0XG4gICAgICAgICAgICA6IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnID8gfn5hcmd1bWVudHNbMF0gOiB0aGlzLnNjcm9sbExlZnQsXG4gICAgICAgICAgLy8gdXNlIHRvcCBwcm9wLCBzZWNvbmQgYXJndW1lbnQgb3IgZmFsbGJhY2sgdG8gc2Nyb2xsVG9wXG4gICAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLnRvcFxuICAgICAgICAgICAgOiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IH5+YXJndW1lbnRzWzFdIDogdGhpcy5zY3JvbGxUb3BcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBsZWZ0ID0gYXJndW1lbnRzWzBdLmxlZnQ7XG4gICAgICB2YXIgdG9wID0gYXJndW1lbnRzWzBdLnRvcDtcblxuICAgICAgLy8gTEVUIFRIRSBTTU9PVEhORVNTIEJFR0lOIVxuICAgICAgc21vb3RoU2Nyb2xsLmNhbGwoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJyA/IHRoaXMuc2Nyb2xsTGVmdCA6IH5+bGVmdCxcbiAgICAgICAgdHlwZW9mIHRvcCA9PT0gJ3VuZGVmaW5lZCcgPyB0aGlzLnNjcm9sbFRvcCA6IH5+dG9wXG4gICAgICApO1xuICAgIH07XG5cbiAgICAvLyBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxCeVxuICAgIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBhY3Rpb24gd2hlbiBubyBhcmd1bWVudHMgYXJlIHBhc3NlZFxuICAgICAgaWYgKGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICBvcmlnaW5hbC5lbGVtZW50U2Nyb2xsLmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLmxlZnQgKyB0aGlzLnNjcm9sbExlZnRcbiAgICAgICAgICAgIDogfn5hcmd1bWVudHNbMF0gKyB0aGlzLnNjcm9sbExlZnQsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLnRvcCArIHRoaXMuc2Nyb2xsVG9wXG4gICAgICAgICAgICA6IH5+YXJndW1lbnRzWzFdICsgdGhpcy5zY3JvbGxUb3BcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2Nyb2xsKHtcbiAgICAgICAgbGVmdDogfn5hcmd1bWVudHNbMF0ubGVmdCArIHRoaXMuc2Nyb2xsTGVmdCxcbiAgICAgICAgdG9wOiB+fmFyZ3VtZW50c1swXS50b3AgKyB0aGlzLnNjcm9sbFRvcCxcbiAgICAgICAgYmVoYXZpb3I6IGFyZ3VtZW50c1swXS5iZWhhdmlvclxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEludG9WaWV3XG4gICAgRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsSW50b1ZpZXcgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIHNtb290aCBiZWhhdmlvciBpZiBub3QgcmVxdWlyZWRcbiAgICAgIGlmIChzaG91bGRCYWlsT3V0KGFyZ3VtZW50c1swXSkgPT09IHRydWUpIHtcbiAgICAgICAgb3JpZ2luYWwuc2Nyb2xsSW50b1ZpZXcuY2FsbChcbiAgICAgICAgICB0aGlzLFxuICAgICAgICAgIGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3VtZW50c1swXVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTEVUIFRIRSBTTU9PVEhORVNTIEJFR0lOIVxuICAgICAgdmFyIHNjcm9sbGFibGVQYXJlbnQgPSBmaW5kU2Nyb2xsYWJsZVBhcmVudCh0aGlzKTtcbiAgICAgIHZhciBwYXJlbnRSZWN0cyA9IHNjcm9sbGFibGVQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgY2xpZW50UmVjdHMgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICBpZiAoc2Nyb2xsYWJsZVBhcmVudCAhPT0gZC5ib2R5KSB7XG4gICAgICAgIC8vIHJldmVhbCBlbGVtZW50IGluc2lkZSBwYXJlbnRcbiAgICAgICAgc21vb3RoU2Nyb2xsLmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBzY3JvbGxhYmxlUGFyZW50LFxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQuc2Nyb2xsTGVmdCArIGNsaWVudFJlY3RzLmxlZnQgLSBwYXJlbnRSZWN0cy5sZWZ0LFxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQuc2Nyb2xsVG9wICsgY2xpZW50UmVjdHMudG9wIC0gcGFyZW50UmVjdHMudG9wXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gcmV2ZWFsIHBhcmVudCBpbiB2aWV3cG9ydCB1bmxlc3MgaXMgZml4ZWRcbiAgICAgICAgaWYgKHcuZ2V0Q29tcHV0ZWRTdHlsZShzY3JvbGxhYmxlUGFyZW50KS5wb3NpdGlvbiAhPT0gJ2ZpeGVkJykge1xuICAgICAgICAgIHcuc2Nyb2xsQnkoe1xuICAgICAgICAgICAgbGVmdDogcGFyZW50UmVjdHMubGVmdCxcbiAgICAgICAgICAgIHRvcDogcGFyZW50UmVjdHMudG9wLFxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJldmVhbCBlbGVtZW50IGluIHZpZXdwb3J0XG4gICAgICAgIHcuc2Nyb2xsQnkoe1xuICAgICAgICAgIGxlZnQ6IGNsaWVudFJlY3RzLmxlZnQsXG4gICAgICAgICAgdG9wOiBjbGllbnRSZWN0cy50b3AsXG4gICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB7XG4gICAgLy8gY29tbW9uanNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHsgcG9seWZpbGw6IHBvbHlmaWxsIH07XG4gIH1cblxufSgpKTtcbn0pO1xudmFyIHNtb290aHNjcm9sbF8xID0gc21vb3Roc2Nyb2xsLnBvbHlmaWxsO1xuXG52YXIgX2RlZmF1bHQkMSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NvcmUpIHtcbiAgX2luaGVyaXRzKF9kZWZhdWx0LCBfQ29yZSk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihfZGVmYXVsdCk7XG5cbiAgZnVuY3Rpb24gX2RlZmF1bHQoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIF9kZWZhdWx0KTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICBpZiAoX3RoaXMucmVzZXROYXRpdmVTY3JvbGwpIHtcbiAgICAgIGlmIChoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uKSB7XG4gICAgICAgIGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSAnbWFudWFsJztcbiAgICAgIH1cblxuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBfdGhpcy5jaGVja1Njcm9sbCwgZmFsc2UpO1xuXG4gICAgaWYgKHdpbmRvdy5zbW9vdGhzY3JvbGxQb2x5ZmlsbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB3aW5kb3cuc21vb3Roc2Nyb2xsUG9seWZpbGwgPSBzbW9vdGhzY3JvbGw7XG4gICAgICB3aW5kb3cuc21vb3Roc2Nyb2xsUG9seWZpbGwucG9seWZpbGwoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoX2RlZmF1bHQsIFt7XG4gICAga2V5OiBcImluaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2Uuc2Nyb2xsLnkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICB0aGlzLmFkZEVsZW1lbnRzKCk7XG4gICAgICB0aGlzLmRldGVjdEVsZW1lbnRzKCk7XG5cbiAgICAgIF9nZXQoX2dldFByb3RvdHlwZU9mKF9kZWZhdWx0LnByb3RvdHlwZSksIFwiaW5pdFwiLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjaGVja1Njcm9sbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGVja1Njcm9sbCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBfZ2V0KF9nZXRQcm90b3R5cGVPZihfZGVmYXVsdC5wcm90b3R5cGUpLCBcImNoZWNrU2Nyb2xsXCIsIHRoaXMpLmNhbGwodGhpcyk7XG5cbiAgICAgIGlmICh0aGlzLmdldERpcmVjdGlvbikge1xuICAgICAgICB0aGlzLmFkZERpcmVjdGlvbigpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5nZXRTcGVlZCkge1xuICAgICAgICB0aGlzLmFkZFNwZWVkKCk7XG4gICAgICAgIHRoaXMuc3BlZWRUcyA9IERhdGUubm93KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5zdGFuY2Uuc2Nyb2xsLnkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgICAgIGlmIChPYmplY3QuZW50cmllcyh0aGlzLmVscykubGVuZ3RoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNTY3JvbGxUaWNraW5nKSB7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzMi5kZXRlY3RFbGVtZW50cygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuaGFzU2Nyb2xsVGlja2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkRGlyZWN0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZERpcmVjdGlvbigpIHtcbiAgICAgIGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPiB0aGlzLmluc3RhbmNlLnNjcm9sbC55KSB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlLmRpcmVjdGlvbiAhPT0gJ2Rvd24nKSB7XG4gICAgICAgICAgdGhpcy5pbnN0YW5jZS5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAod2luZG93LnBhZ2VZT2Zmc2V0IDwgdGhpcy5pbnN0YW5jZS5zY3JvbGwueSkge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZS5kaXJlY3Rpb24gIT09ICd1cCcpIHtcbiAgICAgICAgICB0aGlzLmluc3RhbmNlLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkU3BlZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkU3BlZWQoKSB7XG4gICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ICE9IHRoaXMuaW5zdGFuY2Uuc2Nyb2xsLnkpIHtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5zcGVlZCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgLSB0aGlzLmluc3RhbmNlLnNjcm9sbC55KSAvIE1hdGgubWF4KDEsIERhdGUubm93KCkgLSB0aGlzLnNwZWVkVHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5zcGVlZCA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlc2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICBpZiAoT2JqZWN0LmVudHJpZXModGhpcy5lbHMpLmxlbmd0aCkge1xuICAgICAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50cygpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRFbGVtZW50c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRFbGVtZW50cygpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB0aGlzLmVscyA9IHt9O1xuICAgICAgdmFyIGVscyA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtJyArIHRoaXMubmFtZSArICddJyk7XG4gICAgICBlbHMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XG4gICAgICAgIHZhciBCQ1IgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIGNsID0gZWwuZGF0YXNldFtfdGhpczMubmFtZSArICdDbGFzcyddIHx8IF90aGlzM1tcImNsYXNzXCJdO1xuICAgICAgICB2YXIgaWQgPSB0eXBlb2YgZWwuZGF0YXNldFtfdGhpczMubmFtZSArICdJZCddID09PSAnc3RyaW5nJyA/IGVsLmRhdGFzZXRbX3RoaXMzLm5hbWUgKyAnSWQnXSA6IGluZGV4O1xuICAgICAgICB2YXIgdG9wO1xuICAgICAgICB2YXIgbGVmdDtcbiAgICAgICAgdmFyIG9mZnNldCA9IHR5cGVvZiBlbC5kYXRhc2V0W190aGlzMy5uYW1lICsgJ09mZnNldCddID09PSAnc3RyaW5nJyA/IGVsLmRhdGFzZXRbX3RoaXMzLm5hbWUgKyAnT2Zmc2V0J10uc3BsaXQoJywnKSA6IF90aGlzMy5vZmZzZXQ7XG4gICAgICAgIHZhciByZXBlYXQgPSBlbC5kYXRhc2V0W190aGlzMy5uYW1lICsgJ1JlcGVhdCddO1xuICAgICAgICB2YXIgY2FsbCA9IGVsLmRhdGFzZXRbX3RoaXMzLm5hbWUgKyAnQ2FsbCddO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZWwuZGF0YXNldFtfdGhpczMubmFtZSArICdUYXJnZXQnXTtcbiAgICAgICAgdmFyIHRhcmdldEVsO1xuXG4gICAgICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRhcmdldEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIlwiLmNvbmNhdCh0YXJnZXQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRFbCA9IGVsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRhcmdldEVsQkNSID0gdGFyZ2V0RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRvcCA9IHRhcmdldEVsQkNSLnRvcCArIF90aGlzMy5pbnN0YW5jZS5zY3JvbGwueTtcbiAgICAgICAgbGVmdCA9IHRhcmdldEVsQkNSLmxlZnQgKyBfdGhpczMuaW5zdGFuY2Uuc2Nyb2xsLng7XG4gICAgICAgIHZhciBib3R0b20gPSB0b3AgKyB0YXJnZXRFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHZhciByaWdodCA9IGxlZnQgKyB0YXJnZXRFbC5vZmZzZXRXaWR0aDtcblxuICAgICAgICBpZiAocmVwZWF0ID09ICdmYWxzZScpIHtcbiAgICAgICAgICByZXBlYXQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXBlYXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVwZWF0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBlYXQgPSBfdGhpczMucmVwZWF0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlbGF0aXZlT2Zmc2V0ID0gX3RoaXMzLmdldFJlbGF0aXZlT2Zmc2V0KG9mZnNldCk7XG5cbiAgICAgICAgdG9wID0gdG9wICsgcmVsYXRpdmVPZmZzZXRbMF07XG4gICAgICAgIGJvdHRvbSA9IGJvdHRvbSAtIHJlbGF0aXZlT2Zmc2V0WzFdO1xuICAgICAgICB2YXIgbWFwcGVkRWwgPSB7XG4gICAgICAgICAgZWw6IGVsLFxuICAgICAgICAgIHRhcmdldEVsOiB0YXJnZXRFbCxcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgXCJjbGFzc1wiOiBjbCxcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICBib3R0b206IGJvdHRvbSxcbiAgICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICAgIHJpZ2h0OiByaWdodCxcbiAgICAgICAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICByZXBlYXQ6IHJlcGVhdCxcbiAgICAgICAgICBpblZpZXc6IGZhbHNlLFxuICAgICAgICAgIGNhbGw6IGNhbGxcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMzLmVsc1tpZF0gPSBtYXBwZWRFbDtcblxuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsKSkge1xuICAgICAgICAgIF90aGlzMy5zZXRJblZpZXcoX3RoaXMzLmVsc1tpZF0sIGlkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVwZGF0ZUVsZW1lbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnRzKCkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMuZWxzKS5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgIHZhciBfcmVmMiA9IF9zbGljZWRUb0FycmF5KF9yZWYsIDIpLFxuICAgICAgICAgICAgaSA9IF9yZWYyWzBdLFxuICAgICAgICAgICAgZWwgPSBfcmVmMlsxXTtcblxuICAgICAgICB2YXIgdG9wID0gZWwudGFyZ2V0RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgX3RoaXM0Lmluc3RhbmNlLnNjcm9sbC55O1xuXG4gICAgICAgIHZhciBib3R0b20gPSB0b3AgKyBlbC50YXJnZXRFbC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgdmFyIHJlbGF0aXZlT2Zmc2V0ID0gX3RoaXM0LmdldFJlbGF0aXZlT2Zmc2V0KGVsLm9mZnNldCk7XG5cbiAgICAgICAgX3RoaXM0LmVsc1tpXS50b3AgPSB0b3AgKyByZWxhdGl2ZU9mZnNldFswXTtcbiAgICAgICAgX3RoaXM0LmVsc1tpXS5ib3R0b20gPSBib3R0b20gLSByZWxhdGl2ZU9mZnNldFsxXTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5oYXNTY3JvbGxUaWNraW5nID0gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFJlbGF0aXZlT2Zmc2V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFJlbGF0aXZlT2Zmc2V0KG9mZnNldCkge1xuICAgICAgdmFyIHJlbGF0aXZlT2Zmc2V0ID0gWzAsIDBdO1xuXG4gICAgICBpZiAob2Zmc2V0KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2Zmc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXRbaV0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChvZmZzZXRbaV0uaW5jbHVkZXMoJyUnKSkge1xuICAgICAgICAgICAgICByZWxhdGl2ZU9mZnNldFtpXSA9IHBhcnNlSW50KG9mZnNldFtpXS5yZXBsYWNlKCclJywgJycpICogdGhpcy53aW5kb3dIZWlnaHQgLyAxMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVsYXRpdmVPZmZzZXRbaV0gPSBwYXJzZUludChvZmZzZXRbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWxhdGl2ZU9mZnNldFtpXSA9IG9mZnNldFtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlbGF0aXZlT2Zmc2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY3JvbGwgdG8gYSBkZXNpcmVkIHRhcmdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgQXZhaWxhYmxlIG9wdGlvbnMgOlxuICAgICAqICAgICAgICAgIHRhcmdldCB7bm9kZSwgc3RyaW5nLCBcInRvcFwiLCBcImJvdHRvbVwiLCBpbnR9IC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gc2Nyb2xsIHRvXG4gICAgICogICAgICAgICAgb3B0aW9ucyB7b2JqZWN0fSAtIE9wdGlvbnMgb2JqZWN0IGZvciBhZGRpdGlvbm5hbCBzZXR0aW5ncy5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwic2Nyb2xsVG9cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2Nyb2xsVG8odGFyZ2V0KSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICAvLyBQYXJzZSBvcHRpb25zXG4gICAgICB2YXIgb2Zmc2V0ID0gcGFyc2VJbnQob3B0aW9ucy5vZmZzZXQpIHx8IDA7IC8vIEFuIG9mZnNldCB0byBhcHBseSBvbiB0b3Agb2YgZ2l2ZW4gYHRhcmdldGAgb3IgYHNvdXJjZUVsZW1gJ3MgdGFyZ2V0XG5cbiAgICAgIHZhciBjYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2sgPyBvcHRpb25zLmNhbGxiYWNrIDogZmFsc2U7IC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIHNjcm9sbFRvIGNvbXBsZXRlcyAobm90ZSB0aGF0IGl0IHdvbid0IHdhaXQgZm9yIGxlcnAgdG8gc3RhYmlsaXplKVxuXG4gICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gU2VsZWN0b3Igb3IgYm91bmRhcmllc1xuICAgICAgICBpZiAodGFyZ2V0ID09PSAndG9wJykge1xuICAgICAgICAgIHRhcmdldCA9IHRoaXMuaHRtbDtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gdGhpcy5odG1sLm9mZnNldEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIElmIHRoZSBxdWVyeSBmYWlscywgYWJvcnRcblxuICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIC8vIEFic29sdXRlIGNvb3JkaW5hdGVcbiAgICAgICAgdGFyZ2V0ID0gcGFyc2VJbnQodGFyZ2V0KTtcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ICYmIHRhcmdldC50YWdOYW1lKSA7IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2B0YXJnZXRgIHBhcmFtZXRlciBpcyBub3QgdmFsaWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBXZSBoYXZlIGEgdGFyZ2V0IHRoYXQgaXMgbm90IGEgY29vcmRpbmF0ZSB5ZXQsIGdldCBpdFxuXG5cbiAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnbnVtYmVyJykge1xuICAgICAgICBvZmZzZXQgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgb2Zmc2V0ICsgdGhpcy5pbnN0YW5jZS5zY3JvbGwueTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9mZnNldCA9IHRhcmdldCArIG9mZnNldDtcbiAgICAgIH1cblxuICAgICAgdmFyIGlzVGFyZ2V0UmVhY2hlZCA9IGZ1bmN0aW9uIGlzVGFyZ2V0UmVhY2hlZCgpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHdpbmRvdy5wYWdlWU9mZnNldCkgPT09IHBhcnNlSW50KG9mZnNldCk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKGlzVGFyZ2V0UmVhY2hlZCgpKSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG9uU2Nyb2xsID0gZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgICAgICAgICBpZiAoaXNUYXJnZXRSZWFjaGVkKCkpIHtcbiAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsKTtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICB0b3A6IG9mZnNldCxcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHRoaXMuYWRkRWxlbWVudHMoKTtcbiAgICAgIHRoaXMuZGV0ZWN0RWxlbWVudHMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVzdHJveVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgX2dldChfZ2V0UHJvdG90eXBlT2YoX2RlZmF1bHQucHJvdG90eXBlKSwgXCJkZXN0cm95XCIsIHRoaXMpLmNhbGwodGhpcyk7XG5cbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmNoZWNrU2Nyb2xsLCBmYWxzZSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIF9kZWZhdWx0O1xufShfZGVmYXVsdCk7XG5cbi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxudmFyIG9iamVjdEFzc2lnbiA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cbmZ1bmN0aW9uIEUgKCkge1xuICAvLyBLZWVwIHRoaXMgZW1wdHkgc28gaXQncyBlYXNpZXIgdG8gaW5oZXJpdCBmcm9tXG4gIC8vICh2aWEgaHR0cHM6Ly9naXRodWIuY29tL2xpcHNtYWNrIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0Y29yZ2FuL3RpbnktZW1pdHRlci9pc3N1ZXMvMylcbn1cblxuRS5wcm90b3R5cGUgPSB7XG4gIG9uOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGN0eCkge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG5cbiAgICAoZVtuYW1lXSB8fCAoZVtuYW1lXSA9IFtdKSkucHVzaCh7XG4gICAgICBmbjogY2FsbGJhY2ssXG4gICAgICBjdHg6IGN0eFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb25jZTogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gbGlzdGVuZXIgKCkge1xuICAgICAgc2VsZi5vZmYobmFtZSwgbGlzdGVuZXIpO1xuICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBsaXN0ZW5lci5fID0gY2FsbGJhY2s7XG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbnZhciB0aW55RW1pdHRlciA9IEU7XG5cbnZhciBsZXRoYXJneSA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcbi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS45LjJcbihmdW5jdGlvbigpIHtcbiAgdmFyIHJvb3Q7XG5cbiAgcm9vdCA9ICBleHBvcnRzICE9PSBudWxsID8gZXhwb3J0cyA6IHRoaXM7XG5cbiAgcm9vdC5MZXRoYXJneSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBMZXRoYXJneShzdGFiaWxpdHksIHNlbnNpdGl2aXR5LCB0b2xlcmFuY2UsIGRlbGF5KSB7XG4gICAgICB0aGlzLnN0YWJpbGl0eSA9IHN0YWJpbGl0eSAhPSBudWxsID8gTWF0aC5hYnMoc3RhYmlsaXR5KSA6IDg7XG4gICAgICB0aGlzLnNlbnNpdGl2aXR5ID0gc2Vuc2l0aXZpdHkgIT0gbnVsbCA/IDEgKyBNYXRoLmFicyhzZW5zaXRpdml0eSkgOiAxMDA7XG4gICAgICB0aGlzLnRvbGVyYW5jZSA9IHRvbGVyYW5jZSAhPSBudWxsID8gMSArIE1hdGguYWJzKHRvbGVyYW5jZSkgOiAxLjE7XG4gICAgICB0aGlzLmRlbGF5ID0gZGVsYXkgIT0gbnVsbCA/IGRlbGF5IDogMTUwO1xuICAgICAgdGhpcy5sYXN0VXBEZWx0YXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpLCByZWYsIHJlc3VsdHM7XG4gICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMSwgcmVmID0gdGhpcy5zdGFiaWxpdHkgKiAyOyAxIDw9IHJlZiA/IGkgPD0gcmVmIDogaSA+PSByZWY7IDEgPD0gcmVmID8gaSsrIDogaS0tKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfSkuY2FsbCh0aGlzKTtcbiAgICAgIHRoaXMubGFzdERvd25EZWx0YXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpLCByZWYsIHJlc3VsdHM7XG4gICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMSwgcmVmID0gdGhpcy5zdGFiaWxpdHkgKiAyOyAxIDw9IHJlZiA/IGkgPD0gcmVmIDogaSA+PSByZWY7IDEgPD0gcmVmID8gaSsrIDogaS0tKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfSkuY2FsbCh0aGlzKTtcbiAgICAgIHRoaXMuZGVsdGFzVGltZXN0YW1wID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSwgcmVmLCByZXN1bHRzO1xuICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoaSA9IDEsIHJlZiA9IHRoaXMuc3RhYmlsaXR5ICogMjsgMSA8PSByZWYgPyBpIDw9IHJlZiA6IGkgPj0gcmVmOyAxIDw9IHJlZiA/IGkrKyA6IGktLSkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgTGV0aGFyZ3kucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIGxhc3REZWx0YTtcbiAgICAgIGUgPSBlLm9yaWdpbmFsRXZlbnQgfHwgZTtcbiAgICAgIGlmIChlLndoZWVsRGVsdGEgIT0gbnVsbCkge1xuICAgICAgICBsYXN0RGVsdGEgPSBlLndoZWVsRGVsdGE7XG4gICAgICB9IGVsc2UgaWYgKGUuZGVsdGFZICE9IG51bGwpIHtcbiAgICAgICAgbGFzdERlbHRhID0gZS5kZWx0YVkgKiAtNDA7XG4gICAgICB9IGVsc2UgaWYgKChlLmRldGFpbCAhPSBudWxsKSB8fCBlLmRldGFpbCA9PT0gMCkge1xuICAgICAgICBsYXN0RGVsdGEgPSBlLmRldGFpbCAqIC00MDtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVsdGFzVGltZXN0YW1wLnB1c2goRGF0ZS5ub3coKSk7XG4gICAgICB0aGlzLmRlbHRhc1RpbWVzdGFtcC5zaGlmdCgpO1xuICAgICAgaWYgKGxhc3REZWx0YSA+IDApIHtcbiAgICAgICAgdGhpcy5sYXN0VXBEZWx0YXMucHVzaChsYXN0RGVsdGEpO1xuICAgICAgICB0aGlzLmxhc3RVcERlbHRhcy5zaGlmdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5pc0luZXJ0aWEoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxhc3REb3duRGVsdGFzLnB1c2gobGFzdERlbHRhKTtcbiAgICAgICAgdGhpcy5sYXN0RG93bkRlbHRhcy5zaGlmdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5pc0luZXJ0aWEoLTEpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBMZXRoYXJneS5wcm90b3R5cGUuaXNJbmVydGlhID0gZnVuY3Rpb24oZGlyZWN0aW9uKSB7XG4gICAgICB2YXIgbGFzdERlbHRhcywgbGFzdERlbHRhc05ldywgbGFzdERlbHRhc09sZCwgbmV3QXZlcmFnZSwgbmV3U3VtLCBvbGRBdmVyYWdlLCBvbGRTdW07XG4gICAgICBsYXN0RGVsdGFzID0gZGlyZWN0aW9uID09PSAtMSA/IHRoaXMubGFzdERvd25EZWx0YXMgOiB0aGlzLmxhc3RVcERlbHRhcztcbiAgICAgIGlmIChsYXN0RGVsdGFzWzBdID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBkaXJlY3Rpb247XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZWx0YXNUaW1lc3RhbXBbKHRoaXMuc3RhYmlsaXR5ICogMikgLSAyXSArIHRoaXMuZGVsYXkgPiBEYXRlLm5vdygpICYmIGxhc3REZWx0YXNbMF0gPT09IGxhc3REZWx0YXNbKHRoaXMuc3RhYmlsaXR5ICogMikgLSAxXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBsYXN0RGVsdGFzT2xkID0gbGFzdERlbHRhcy5zbGljZSgwLCB0aGlzLnN0YWJpbGl0eSk7XG4gICAgICBsYXN0RGVsdGFzTmV3ID0gbGFzdERlbHRhcy5zbGljZSh0aGlzLnN0YWJpbGl0eSwgdGhpcy5zdGFiaWxpdHkgKiAyKTtcbiAgICAgIG9sZFN1bSA9IGxhc3REZWx0YXNPbGQucmVkdWNlKGZ1bmN0aW9uKHQsIHMpIHtcbiAgICAgICAgcmV0dXJuIHQgKyBzO1xuICAgICAgfSk7XG4gICAgICBuZXdTdW0gPSBsYXN0RGVsdGFzTmV3LnJlZHVjZShmdW5jdGlvbih0LCBzKSB7XG4gICAgICAgIHJldHVybiB0ICsgcztcbiAgICAgIH0pO1xuICAgICAgb2xkQXZlcmFnZSA9IG9sZFN1bSAvIGxhc3REZWx0YXNPbGQubGVuZ3RoO1xuICAgICAgbmV3QXZlcmFnZSA9IG5ld1N1bSAvIGxhc3REZWx0YXNOZXcubGVuZ3RoO1xuICAgICAgaWYgKE1hdGguYWJzKG9sZEF2ZXJhZ2UpIDwgTWF0aC5hYnMobmV3QXZlcmFnZSAqIHRoaXMudG9sZXJhbmNlKSAmJiAodGhpcy5zZW5zaXRpdml0eSA8IE1hdGguYWJzKG5ld0F2ZXJhZ2UpKSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBMZXRoYXJneS5wcm90b3R5cGUuc2hvd0xhc3RVcERlbHRhcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubGFzdFVwRGVsdGFzO1xuICAgIH07XG5cbiAgICBMZXRoYXJneS5wcm90b3R5cGUuc2hvd0xhc3REb3duRGVsdGFzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYXN0RG93bkRlbHRhcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIExldGhhcmd5O1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwoY29tbW9uanNHbG9iYWwpO1xufSk7XG5cbnZhciBzdXBwb3J0ID0gKGZ1bmN0aW9uIGdldFN1cHBvcnQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGFzV2hlZWxFdmVudDogJ29ud2hlZWwnIGluIGRvY3VtZW50LFxuICAgICAgICBoYXNNb3VzZVdoZWVsRXZlbnQ6ICdvbm1vdXNld2hlZWwnIGluIGRvY3VtZW50LFxuICAgICAgICBoYXNUb3VjaDogKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgd2luZG93LlRvdWNoRXZlbnQgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoLFxuICAgICAgICBoYXNUb3VjaFdpbjogbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgJiYgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAxLFxuICAgICAgICBoYXNQb2ludGVyOiAhIXdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCxcbiAgICAgICAgaGFzS2V5RG93bjogJ29ua2V5ZG93bicgaW4gZG9jdW1lbnQsXG4gICAgICAgIGlzRmlyZWZveDogbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgPiAtMVxuICAgIH07XG59KSgpO1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLFxuICAgIGhhc093blByb3BlcnR5JDEgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgYmluZGFsbFN0YW5kYWxvbmUgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICBpZighb2JqZWN0KSByZXR1cm4gY29uc29sZS53YXJuKCdiaW5kQWxsIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBhcmd1bWVudC4nKTtcblxuICAgIHZhciBmdW5jdGlvbnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgaWYgKGZ1bmN0aW9ucy5sZW5ndGggPT09IDApIHtcblxuICAgICAgICBmb3IgKHZhciBtZXRob2QgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBpZihoYXNPd25Qcm9wZXJ0eSQxLmNhbGwob2JqZWN0LCBtZXRob2QpKSB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIG9iamVjdFttZXRob2RdID09ICdmdW5jdGlvbicgJiYgdG9TdHJpbmcuY2FsbChvYmplY3RbbWV0aG9kXSkgPT0gXCJbb2JqZWN0IEZ1bmN0aW9uXVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9ucy5wdXNoKG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bmN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZiA9IGZ1bmN0aW9uc1tpXTtcbiAgICAgICAgb2JqZWN0W2ZdID0gYmluZChvYmplY3RbZl0sIG9iamVjdCk7XG4gICAgfVxufTtcblxuLypcbiAgICBGYXN0ZXIgYmluZCB3aXRob3V0IHNwZWNpZmljLWNhc2UgY2hlY2tpbmcuIChzZWUgaHR0cHM6Ly9jb2RlcndhbGwuY29tL3Avb2kzajN3KS5cbiAgICBiaW5kQWxsIGlzIG9ubHkgbmVlZGVkIGZvciBldmVudHMgYmluZGluZyBzbyBubyBuZWVkIHRvIG1ha2Ugc2xvdyBmaXhlcyBmb3IgY29uc3RydWN0b3JcbiAgICBvciBwYXJ0aWFsIGFwcGxpY2F0aW9uLlxuKi9cbmZ1bmN0aW9uIGJpbmQoZnVuYywgY29udGV4dCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxudmFyIExldGhhcmd5ID0gbGV0aGFyZ3kuTGV0aGFyZ3k7XG5cblxuXG52YXIgRVZUX0lEID0gJ3ZpcnR1YWxzY3JvbGwnO1xuXG52YXIgc3JjID0gVmlydHVhbFNjcm9sbDtcblxudmFyIGtleUNvZGVzID0ge1xuICAgIExFRlQ6IDM3LFxuICAgIFVQOiAzOCxcbiAgICBSSUdIVDogMzksXG4gICAgRE9XTjogNDAsXG4gICAgU1BBQ0U6IDMyXG59O1xuXG5mdW5jdGlvbiBWaXJ0dWFsU2Nyb2xsKG9wdGlvbnMpIHtcbiAgICBiaW5kYWxsU3RhbmRhbG9uZSh0aGlzLCAnX29uV2hlZWwnLCAnX29uTW91c2VXaGVlbCcsICdfb25Ub3VjaFN0YXJ0JywgJ19vblRvdWNoTW92ZScsICdfb25LZXlEb3duJyk7XG5cbiAgICB0aGlzLmVsID0gd2luZG93O1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZWwpIHtcbiAgICAgICAgdGhpcy5lbCA9IG9wdGlvbnMuZWw7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLmVsO1xuICAgIH1cbiAgICB0aGlzLm9wdGlvbnMgPSBvYmplY3RBc3NpZ24oe1xuICAgICAgICBtb3VzZU11bHRpcGxpZXI6IDEsXG4gICAgICAgIHRvdWNoTXVsdGlwbGllcjogMixcbiAgICAgICAgZmlyZWZveE11bHRpcGxpZXI6IDE1LFxuICAgICAgICBrZXlTdGVwOiAxMjAsXG4gICAgICAgIHByZXZlbnRUb3VjaDogZmFsc2UsXG4gICAgICAgIHVucHJldmVudFRvdWNoQ2xhc3M6ICd2cy10b3VjaG1vdmUtYWxsb3dlZCcsXG4gICAgICAgIGxpbWl0SW5lcnRpYTogZmFsc2UsXG4gICAgICAgIHVzZUtleWJvYXJkOiB0cnVlLFxuICAgICAgICB1c2VUb3VjaDogdHJ1ZVxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5saW1pdEluZXJ0aWEpIHRoaXMuX2xldGhhcmd5ID0gbmV3IExldGhhcmd5KCk7XG5cbiAgICB0aGlzLl9lbWl0dGVyID0gbmV3IHRpbnlFbWl0dGVyKCk7XG4gICAgdGhpcy5fZXZlbnQgPSB7XG4gICAgICAgIHk6IDAsXG4gICAgICAgIHg6IDAsXG4gICAgICAgIGRlbHRhWDogMCxcbiAgICAgICAgZGVsdGFZOiAwXG4gICAgfTtcbiAgICB0aGlzLnRvdWNoU3RhcnRYID0gbnVsbDtcbiAgICB0aGlzLnRvdWNoU3RhcnRZID0gbnVsbDtcbiAgICB0aGlzLmJvZHlUb3VjaEFjdGlvbiA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBhc3NpdmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVyT3B0aW9ucyA9IHtwYXNzaXZlOiB0aGlzLm9wdGlvbnMucGFzc2l2ZX07XG4gICAgfVxufVxuXG5WaXJ0dWFsU2Nyb2xsLnByb3RvdHlwZS5fbm90aWZ5ID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciBldnQgPSB0aGlzLl9ldmVudDtcbiAgICBldnQueCArPSBldnQuZGVsdGFYO1xuICAgIGV2dC55ICs9IGV2dC5kZWx0YVk7XG5cbiAgIHRoaXMuX2VtaXR0ZXIuZW1pdChFVlRfSUQsIHtcbiAgICAgICAgeDogZXZ0LngsXG4gICAgICAgIHk6IGV2dC55LFxuICAgICAgICBkZWx0YVg6IGV2dC5kZWx0YVgsXG4gICAgICAgIGRlbHRhWTogZXZ0LmRlbHRhWSxcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZVxuICAgfSk7XG59O1xuXG5WaXJ0dWFsU2Nyb2xsLnByb3RvdHlwZS5fb25XaGVlbCA9IGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBpZiAodGhpcy5fbGV0aGFyZ3kgJiYgdGhpcy5fbGV0aGFyZ3kuY2hlY2soZSkgPT09IGZhbHNlKSByZXR1cm47XG4gICAgdmFyIGV2dCA9IHRoaXMuX2V2ZW50O1xuXG4gICAgLy8gSW4gQ2hyb21lIGFuZCBpbiBGaXJlZm94IChhdCBsZWFzdCB0aGUgbmV3IG9uZSlcbiAgICBldnQuZGVsdGFYID0gZS53aGVlbERlbHRhWCB8fCBlLmRlbHRhWCAqIC0xO1xuICAgIGV2dC5kZWx0YVkgPSBlLndoZWVsRGVsdGFZIHx8IGUuZGVsdGFZICogLTE7XG5cbiAgICAvLyBmb3Igb3VyIHB1cnBvc2UgZGVsdGFtb2RlID0gMSBtZWFucyB1c2VyIGlzIG9uIGEgd2hlZWwgbW91c2UsIG5vdCB0b3VjaCBwYWRcbiAgICAvLyByZWFsIG1lYW5pbmc6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaGVlbEV2ZW50I0RlbHRhX21vZGVzXG4gICAgaWYoc3VwcG9ydC5pc0ZpcmVmb3ggJiYgZS5kZWx0YU1vZGUgPT0gMSkge1xuICAgICAgICBldnQuZGVsdGFYICo9IG9wdGlvbnMuZmlyZWZveE11bHRpcGxpZXI7XG4gICAgICAgIGV2dC5kZWx0YVkgKj0gb3B0aW9ucy5maXJlZm94TXVsdGlwbGllcjtcbiAgICB9XG5cbiAgICBldnQuZGVsdGFYICo9IG9wdGlvbnMubW91c2VNdWx0aXBsaWVyO1xuICAgIGV2dC5kZWx0YVkgKj0gb3B0aW9ucy5tb3VzZU11bHRpcGxpZXI7XG5cbiAgICB0aGlzLl9ub3RpZnkoZSk7XG59O1xuXG5WaXJ0dWFsU2Nyb2xsLnByb3RvdHlwZS5fb25Nb3VzZVdoZWVsID0gZnVuY3Rpb24oZSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMubGltaXRJbmVydGlhICYmIHRoaXMuX2xldGhhcmd5LmNoZWNrKGUpID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgdmFyIGV2dCA9IHRoaXMuX2V2ZW50O1xuXG4gICAgLy8gSW4gU2FmYXJpLCBJRSBhbmQgaW4gQ2hyb21lIGlmICd3aGVlbCcgaXNuJ3QgZGVmaW5lZFxuICAgIGV2dC5kZWx0YVggPSAoZS53aGVlbERlbHRhWCkgPyBlLndoZWVsRGVsdGFYIDogMDtcbiAgICBldnQuZGVsdGFZID0gKGUud2hlZWxEZWx0YVkpID8gZS53aGVlbERlbHRhWSA6IGUud2hlZWxEZWx0YTtcblxuICAgIHRoaXMuX25vdGlmeShlKTtcbn07XG5cblZpcnR1YWxTY3JvbGwucHJvdG90eXBlLl9vblRvdWNoU3RhcnQgPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHQgPSAoZS50YXJnZXRUb3VjaGVzKSA/IGUudGFyZ2V0VG91Y2hlc1swXSA6IGU7XG4gICAgdGhpcy50b3VjaFN0YXJ0WCA9IHQucGFnZVg7XG4gICAgdGhpcy50b3VjaFN0YXJ0WSA9IHQucGFnZVk7XG59O1xuXG5WaXJ0dWFsU2Nyb2xsLnByb3RvdHlwZS5fb25Ub3VjaE1vdmUgPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgaWYob3B0aW9ucy5wcmV2ZW50VG91Y2hcbiAgICAgICAgJiYgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhvcHRpb25zLnVucHJldmVudFRvdWNoQ2xhc3MpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB2YXIgZXZ0ID0gdGhpcy5fZXZlbnQ7XG5cbiAgICB2YXIgdCA9IChlLnRhcmdldFRvdWNoZXMpID8gZS50YXJnZXRUb3VjaGVzWzBdIDogZTtcblxuICAgIGV2dC5kZWx0YVggPSAodC5wYWdlWCAtIHRoaXMudG91Y2hTdGFydFgpICogb3B0aW9ucy50b3VjaE11bHRpcGxpZXI7XG4gICAgZXZ0LmRlbHRhWSA9ICh0LnBhZ2VZIC0gdGhpcy50b3VjaFN0YXJ0WSkgKiBvcHRpb25zLnRvdWNoTXVsdGlwbGllcjtcblxuICAgIHRoaXMudG91Y2hTdGFydFggPSB0LnBhZ2VYO1xuICAgIHRoaXMudG91Y2hTdGFydFkgPSB0LnBhZ2VZO1xuXG4gICAgdGhpcy5fbm90aWZ5KGUpO1xufTtcblxuVmlydHVhbFNjcm9sbC5wcm90b3R5cGUuX29uS2V5RG93biA9IGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZXZ0ID0gdGhpcy5fZXZlbnQ7XG4gICAgZXZ0LmRlbHRhWCA9IGV2dC5kZWx0YVkgPSAwO1xuICAgIHZhciB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA0MDtcblxuICAgIHN3aXRjaChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBrZXlDb2Rlcy5MRUZUOlxuICAgICAgICBjYXNlIGtleUNvZGVzLlVQOlxuICAgICAgICAgICAgZXZ0LmRlbHRhWSA9IHRoaXMub3B0aW9ucy5rZXlTdGVwO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBrZXlDb2Rlcy5SSUdIVDpcbiAgICAgICAgY2FzZSBrZXlDb2Rlcy5ET1dOOlxuICAgICAgICAgICAgZXZ0LmRlbHRhWSA9IC0gdGhpcy5vcHRpb25zLmtleVN0ZXA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAgZS5zaGlmdEtleTpcbiAgICAgICAgICAgIGV2dC5kZWx0YVkgPSB3aW5kb3dIZWlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlDb2Rlcy5TUEFDRTpcbiAgICAgICAgICAgIGV2dC5kZWx0YVkgPSAtIHdpbmRvd0hlaWdodDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX25vdGlmeShlKTtcbn07XG5cblZpcnR1YWxTY3JvbGwucHJvdG90eXBlLl9iaW5kID0gZnVuY3Rpb24oKSB7XG4gICAgaWYoc3VwcG9ydC5oYXNXaGVlbEV2ZW50KSB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5fb25XaGVlbCwgdGhpcy5saXN0ZW5lck9wdGlvbnMpO1xuICAgIGlmKHN1cHBvcnQuaGFzTW91c2VXaGVlbEV2ZW50KSB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCB0aGlzLl9vbk1vdXNlV2hlZWwsIHRoaXMubGlzdGVuZXJPcHRpb25zKTtcblxuICAgIGlmKHN1cHBvcnQuaGFzVG91Y2ggJiYgdGhpcy5vcHRpb25zLnVzZVRvdWNoKSB7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uVG91Y2hTdGFydCwgdGhpcy5saXN0ZW5lck9wdGlvbnMpO1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzLmxpc3RlbmVyT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYoc3VwcG9ydC5oYXNQb2ludGVyICYmIHN1cHBvcnQuaGFzVG91Y2hXaW4pIHtcbiAgICAgICAgdGhpcy5ib2R5VG91Y2hBY3Rpb24gPSBkb2N1bWVudC5ib2R5LnN0eWxlLm1zVG91Y2hBY3Rpb247XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUubXNUb3VjaEFjdGlvbiA9ICdub25lJztcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJywgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0cnVlKTtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJNb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUsIHRydWUpO1xuICAgIH1cblxuICAgIGlmKHN1cHBvcnQuaGFzS2V5RG93biAmJiB0aGlzLm9wdGlvbnMudXNlS2V5Ym9hcmQpIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xufTtcblxuVmlydHVhbFNjcm9sbC5wcm90b3R5cGUuX3VuYmluZCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmKHN1cHBvcnQuaGFzV2hlZWxFdmVudCkgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuX29uV2hlZWwpO1xuICAgIGlmKHN1cHBvcnQuaGFzTW91c2VXaGVlbEV2ZW50KSB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCB0aGlzLl9vbk1vdXNlV2hlZWwpO1xuXG4gICAgaWYoc3VwcG9ydC5oYXNUb3VjaCkge1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRvdWNoU3RhcnQpO1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcbiAgICB9XG5cbiAgICBpZihzdXBwb3J0Lmhhc1BvaW50ZXIgJiYgc3VwcG9ydC5oYXNUb3VjaFdpbikge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1zVG91Y2hBY3Rpb24gPSB0aGlzLmJvZHlUb3VjaEFjdGlvbjtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJywgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0cnVlKTtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJNb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUsIHRydWUpO1xuICAgIH1cblxuICAgIGlmKHN1cHBvcnQuaGFzS2V5RG93biAmJiB0aGlzLm9wdGlvbnMudXNlS2V5Ym9hcmQpIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xufTtcblxuVmlydHVhbFNjcm9sbC5wcm90b3R5cGUub24gPSBmdW5jdGlvbihjYiwgY3R4KSB7XG4gIHRoaXMuX2VtaXR0ZXIub24oRVZUX0lELCBjYiwgY3R4KTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZW1pdHRlci5lO1xuICBpZiAoZXZlbnRzICYmIGV2ZW50c1tFVlRfSURdICYmIGV2ZW50c1tFVlRfSURdLmxlbmd0aCA9PT0gMSkgdGhpcy5fYmluZCgpO1xufTtcblxuVmlydHVhbFNjcm9sbC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oY2IsIGN0eCkge1xuICB0aGlzLl9lbWl0dGVyLm9mZihFVlRfSUQsIGNiLCBjdHgpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9lbWl0dGVyLmU7XG4gIGlmICghZXZlbnRzW0VWVF9JRF0gfHwgZXZlbnRzW0VWVF9JRF0ubGVuZ3RoIDw9IDApIHRoaXMuX3VuYmluZCgpO1xufTtcblxuVmlydHVhbFNjcm9sbC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZXZ0ID0gdGhpcy5fZXZlbnQ7XG4gICAgZXZ0LnggPSAwO1xuICAgIGV2dC55ID0gMDtcbn07XG5cblZpcnR1YWxTY3JvbGwucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9lbWl0dGVyLm9mZigpO1xuICAgIHRoaXMuX3VuYmluZCgpO1xufTtcblxuZnVuY3Rpb24gbGVycChzdGFydCwgZW5kLCBhbXQpIHtcbiAgcmV0dXJuICgxIC0gYW10KSAqIHN0YXJ0ICsgYW10ICogZW5kO1xufVxuXG5mdW5jdGlvbiBnZXRUcmFuc2xhdGUoZWwpIHtcbiAgdmFyIHRyYW5zbGF0ZSA9IHt9O1xuICBpZiAoIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSByZXR1cm47XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuICB2YXIgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtIHx8IHN0eWxlLndlYmtpdFRyYW5zZm9ybSB8fCBzdHlsZS5tb3pUcmFuc2Zvcm07XG4gIHZhciBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXgzZFxcKCguKylcXCkkLyk7XG5cbiAgaWYgKG1hdCkge1xuICAgIHRyYW5zbGF0ZS54ID0gbWF0ID8gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbMTJdKSA6IDA7XG4gICAgdHJhbnNsYXRlLnkgPSBtYXQgPyBwYXJzZUZsb2F0KG1hdFsxXS5zcGxpdCgnLCAnKVsxM10pIDogMDtcbiAgfSBlbHNlIHtcbiAgICBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXhcXCgoLispXFwpJC8pO1xuICAgIHRyYW5zbGF0ZS54ID0gbWF0ID8gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbNF0pIDogMDtcbiAgICB0cmFuc2xhdGUueSA9IG1hdCA/IHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzVdKSA6IDA7XG4gIH1cblxuICByZXR1cm4gdHJhbnNsYXRlO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIHBhcmVudCBub2RlcyBvZiB0aGUgZ2l2ZW4gbm9kZVxuICogQHBhcmFtICB7b2JqZWN0fSBub2RlXG4gKiBAcmV0dXJuIHthcnJheX0gcGFyZW50IG5vZGVzXG4gKi9cbmZ1bmN0aW9uIGdldFBhcmVudHMoZWxlbSkge1xuICAvLyBTZXQgdXAgYSBwYXJlbnQgYXJyYXlcbiAgdmFyIHBhcmVudHMgPSBbXTsgLy8gUHVzaCBlYWNoIHBhcmVudCBlbGVtZW50IHRvIHRoZSBhcnJheVxuXG4gIGZvciAoOyBlbGVtICYmIGVsZW0gIT09IGRvY3VtZW50OyBlbGVtID0gZWxlbS5wYXJlbnROb2RlKSB7XG4gICAgcGFyZW50cy5wdXNoKGVsZW0pO1xuICB9IC8vIFJldHVybiBvdXIgcGFyZW50IGFycmF5XG5cblxuICByZXR1cm4gcGFyZW50cztcbn0gLy8gaHR0cHM6Ly9nb21ha2V0aGluZ3MuY29tL2hvdy10by1nZXQtdGhlLWNsb3Nlc3QtcGFyZW50LWVsZW1lbnQtd2l0aC1hLW1hdGNoaW5nLXNlbGVjdG9yLXVzaW5nLXZhbmlsbGEtamF2YXNjcmlwdC9cblxuLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ3JlL2Jlemllci1lYXNpbmdcbiAqIEJlemllckVhc2luZyAtIHVzZSBiZXppZXIgY3VydmUgZm9yIHRyYW5zaXRpb24gZWFzaW5nIGZ1bmN0aW9uXG4gKiBieSBHYcOrdGFuIFJlbmF1ZGVhdSAyMDE0IC0gMjAxNSDigJMgTUlUIExpY2Vuc2VcbiAqL1xuXG4vLyBUaGVzZSB2YWx1ZXMgYXJlIGVzdGFibGlzaGVkIGJ5IGVtcGlyaWNpc20gd2l0aCB0ZXN0cyAodHJhZGVvZmY6IHBlcmZvcm1hbmNlIFZTIHByZWNpc2lvbilcbnZhciBORVdUT05fSVRFUkFUSU9OUyA9IDQ7XG52YXIgTkVXVE9OX01JTl9TTE9QRSA9IDAuMDAxO1xudmFyIFNVQkRJVklTSU9OX1BSRUNJU0lPTiA9IDAuMDAwMDAwMTtcbnZhciBTVUJESVZJU0lPTl9NQVhfSVRFUkFUSU9OUyA9IDEwO1xuXG52YXIga1NwbGluZVRhYmxlU2l6ZSA9IDExO1xudmFyIGtTYW1wbGVTdGVwU2l6ZSA9IDEuMCAvIChrU3BsaW5lVGFibGVTaXplIC0gMS4wKTtcblxudmFyIGZsb2F0MzJBcnJheVN1cHBvcnRlZCA9IHR5cGVvZiBGbG9hdDMyQXJyYXkgPT09ICdmdW5jdGlvbic7XG5cbmZ1bmN0aW9uIEEgKGFBMSwgYUEyKSB7IHJldHVybiAxLjAgLSAzLjAgKiBhQTIgKyAzLjAgKiBhQTE7IH1cbmZ1bmN0aW9uIEIgKGFBMSwgYUEyKSB7IHJldHVybiAzLjAgKiBhQTIgLSA2LjAgKiBhQTE7IH1cbmZ1bmN0aW9uIEMgKGFBMSkgICAgICB7IHJldHVybiAzLjAgKiBhQTE7IH1cblxuLy8gUmV0dXJucyB4KHQpIGdpdmVuIHQsIHgxLCBhbmQgeDIsIG9yIHkodCkgZ2l2ZW4gdCwgeTEsIGFuZCB5Mi5cbmZ1bmN0aW9uIGNhbGNCZXppZXIgKGFULCBhQTEsIGFBMikgeyByZXR1cm4gKChBKGFBMSwgYUEyKSAqIGFUICsgQihhQTEsIGFBMikpICogYVQgKyBDKGFBMSkpICogYVQ7IH1cblxuLy8gUmV0dXJucyBkeC9kdCBnaXZlbiB0LCB4MSwgYW5kIHgyLCBvciBkeS9kdCBnaXZlbiB0LCB5MSwgYW5kIHkyLlxuZnVuY3Rpb24gZ2V0U2xvcGUgKGFULCBhQTEsIGFBMikgeyByZXR1cm4gMy4wICogQShhQTEsIGFBMikgKiBhVCAqIGFUICsgMi4wICogQihhQTEsIGFBMikgKiBhVCArIEMoYUExKTsgfVxuXG5mdW5jdGlvbiBiaW5hcnlTdWJkaXZpZGUgKGFYLCBhQSwgYUIsIG1YMSwgbVgyKSB7XG4gIHZhciBjdXJyZW50WCwgY3VycmVudFQsIGkgPSAwO1xuICBkbyB7XG4gICAgY3VycmVudFQgPSBhQSArIChhQiAtIGFBKSAvIDIuMDtcbiAgICBjdXJyZW50WCA9IGNhbGNCZXppZXIoY3VycmVudFQsIG1YMSwgbVgyKSAtIGFYO1xuICAgIGlmIChjdXJyZW50WCA+IDAuMCkge1xuICAgICAgYUIgPSBjdXJyZW50VDtcbiAgICB9IGVsc2Uge1xuICAgICAgYUEgPSBjdXJyZW50VDtcbiAgICB9XG4gIH0gd2hpbGUgKE1hdGguYWJzKGN1cnJlbnRYKSA+IFNVQkRJVklTSU9OX1BSRUNJU0lPTiAmJiArK2kgPCBTVUJESVZJU0lPTl9NQVhfSVRFUkFUSU9OUyk7XG4gIHJldHVybiBjdXJyZW50VDtcbn1cblxuZnVuY3Rpb24gbmV3dG9uUmFwaHNvbkl0ZXJhdGUgKGFYLCBhR3Vlc3NULCBtWDEsIG1YMikge1xuIGZvciAodmFyIGkgPSAwOyBpIDwgTkVXVE9OX0lURVJBVElPTlM7ICsraSkge1xuICAgdmFyIGN1cnJlbnRTbG9wZSA9IGdldFNsb3BlKGFHdWVzc1QsIG1YMSwgbVgyKTtcbiAgIGlmIChjdXJyZW50U2xvcGUgPT09IDAuMCkge1xuICAgICByZXR1cm4gYUd1ZXNzVDtcbiAgIH1cbiAgIHZhciBjdXJyZW50WCA9IGNhbGNCZXppZXIoYUd1ZXNzVCwgbVgxLCBtWDIpIC0gYVg7XG4gICBhR3Vlc3NUIC09IGN1cnJlbnRYIC8gY3VycmVudFNsb3BlO1xuIH1cbiByZXR1cm4gYUd1ZXNzVDtcbn1cblxuZnVuY3Rpb24gTGluZWFyRWFzaW5nICh4KSB7XG4gIHJldHVybiB4O1xufVxuXG52YXIgc3JjJDEgPSBmdW5jdGlvbiBiZXppZXIgKG1YMSwgbVkxLCBtWDIsIG1ZMikge1xuICBpZiAoISgwIDw9IG1YMSAmJiBtWDEgPD0gMSAmJiAwIDw9IG1YMiAmJiBtWDIgPD0gMSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2JlemllciB4IHZhbHVlcyBtdXN0IGJlIGluIFswLCAxXSByYW5nZScpO1xuICB9XG5cbiAgaWYgKG1YMSA9PT0gbVkxICYmIG1YMiA9PT0gbVkyKSB7XG4gICAgcmV0dXJuIExpbmVhckVhc2luZztcbiAgfVxuXG4gIC8vIFByZWNvbXB1dGUgc2FtcGxlcyB0YWJsZVxuICB2YXIgc2FtcGxlVmFsdWVzID0gZmxvYXQzMkFycmF5U3VwcG9ydGVkID8gbmV3IEZsb2F0MzJBcnJheShrU3BsaW5lVGFibGVTaXplKSA6IG5ldyBBcnJheShrU3BsaW5lVGFibGVTaXplKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrU3BsaW5lVGFibGVTaXplOyArK2kpIHtcbiAgICBzYW1wbGVWYWx1ZXNbaV0gPSBjYWxjQmV6aWVyKGkgKiBrU2FtcGxlU3RlcFNpemUsIG1YMSwgbVgyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRGb3JYIChhWCkge1xuICAgIHZhciBpbnRlcnZhbFN0YXJ0ID0gMC4wO1xuICAgIHZhciBjdXJyZW50U2FtcGxlID0gMTtcbiAgICB2YXIgbGFzdFNhbXBsZSA9IGtTcGxpbmVUYWJsZVNpemUgLSAxO1xuXG4gICAgZm9yICg7IGN1cnJlbnRTYW1wbGUgIT09IGxhc3RTYW1wbGUgJiYgc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdIDw9IGFYOyArK2N1cnJlbnRTYW1wbGUpIHtcbiAgICAgIGludGVydmFsU3RhcnQgKz0ga1NhbXBsZVN0ZXBTaXplO1xuICAgIH1cbiAgICAtLWN1cnJlbnRTYW1wbGU7XG5cbiAgICAvLyBJbnRlcnBvbGF0ZSB0byBwcm92aWRlIGFuIGluaXRpYWwgZ3Vlc3MgZm9yIHRcbiAgICB2YXIgZGlzdCA9IChhWCAtIHNhbXBsZVZhbHVlc1tjdXJyZW50U2FtcGxlXSkgLyAoc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGUgKyAxXSAtIHNhbXBsZVZhbHVlc1tjdXJyZW50U2FtcGxlXSk7XG4gICAgdmFyIGd1ZXNzRm9yVCA9IGludGVydmFsU3RhcnQgKyBkaXN0ICoga1NhbXBsZVN0ZXBTaXplO1xuXG4gICAgdmFyIGluaXRpYWxTbG9wZSA9IGdldFNsb3BlKGd1ZXNzRm9yVCwgbVgxLCBtWDIpO1xuICAgIGlmIChpbml0aWFsU2xvcGUgPj0gTkVXVE9OX01JTl9TTE9QRSkge1xuICAgICAgcmV0dXJuIG5ld3RvblJhcGhzb25JdGVyYXRlKGFYLCBndWVzc0ZvclQsIG1YMSwgbVgyKTtcbiAgICB9IGVsc2UgaWYgKGluaXRpYWxTbG9wZSA9PT0gMC4wKSB7XG4gICAgICByZXR1cm4gZ3Vlc3NGb3JUO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYmluYXJ5U3ViZGl2aWRlKGFYLCBpbnRlcnZhbFN0YXJ0LCBpbnRlcnZhbFN0YXJ0ICsga1NhbXBsZVN0ZXBTaXplLCBtWDEsIG1YMik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIEJlemllckVhc2luZyAoeCkge1xuICAgIC8vIEJlY2F1c2UgSmF2YVNjcmlwdCBudW1iZXIgYXJlIGltcHJlY2lzZSwgd2Ugc2hvdWxkIGd1YXJhbnRlZSB0aGUgZXh0cmVtZXMgYXJlIHJpZ2h0LlxuICAgIGlmICh4ID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKHggPT09IDEpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gY2FsY0JlemllcihnZXRURm9yWCh4KSwgbVkxLCBtWTIpO1xuICB9O1xufTtcblxudmFyIGtleUNvZGVzJDEgPSB7XG4gIExFRlQ6IDM3LFxuICBVUDogMzgsXG4gIFJJR0hUOiAzOSxcbiAgRE9XTjogNDAsXG4gIFNQQUNFOiAzMixcbiAgVEFCOiA5LFxuICBQQUdFVVA6IDMzLFxuICBQQUdFRE9XTjogMzQsXG4gIEhPTUU6IDM2LFxuICBFTkQ6IDM1XG59O1xuXG52YXIgX2RlZmF1bHQkMiA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NvcmUpIHtcbiAgX2luaGVyaXRzKF9kZWZhdWx0LCBfQ29yZSk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihfZGVmYXVsdCk7XG5cbiAgZnVuY3Rpb24gX2RlZmF1bHQoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIF9kZWZhdWx0KTtcblxuICAgIGlmIChoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uKSB7XG4gICAgICBoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gJ21hbnVhbCc7XG4gICAgfVxuXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgaWYgKF90aGlzLmluZXJ0aWEpIF90aGlzLmxlcnAgPSBfdGhpcy5pbmVydGlhICogMC4xO1xuICAgIF90aGlzLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgX3RoaXMuaXNEcmFnZ2luZ1Njcm9sbGJhciA9IGZhbHNlO1xuICAgIF90aGlzLmlzVGlja2luZyA9IGZhbHNlO1xuICAgIF90aGlzLmhhc1Njcm9sbFRpY2tpbmcgPSBmYWxzZTtcbiAgICBfdGhpcy5wYXJhbGxheEVsZW1lbnRzID0ge307XG4gICAgX3RoaXMuc3RvcCA9IGZhbHNlO1xuICAgIF90aGlzLnNjcm9sbGJhckNvbnRhaW5lciA9IG9wdGlvbnMuc2Nyb2xsYmFyQ29udGFpbmVyO1xuICAgIF90aGlzLmNoZWNrS2V5ID0gX3RoaXMuY2hlY2tLZXkuYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBfdGhpcy5jaGVja0tleSwgZmFsc2UpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhfZGVmYXVsdCwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuaHRtbC5jbGFzc0xpc3QuYWRkKHRoaXMuc21vb3RoQ2xhc3MpO1xuICAgICAgdGhpcy5odG1sLnNldEF0dHJpYnV0ZShcImRhdGEtXCIuY29uY2F0KHRoaXMubmFtZSwgXCItZGlyZWN0aW9uXCIpLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgICB0aGlzLmluc3RhbmNlID0gX29iamVjdFNwcmVhZDIoe1xuICAgICAgICBkZWx0YToge1xuICAgICAgICAgIHg6IHRoaXMuaW5pdFBvc2l0aW9uLngsXG4gICAgICAgICAgeTogdGhpcy5pbml0UG9zaXRpb24ueVxuICAgICAgICB9LFxuICAgICAgICBzY3JvbGw6IHtcbiAgICAgICAgICB4OiB0aGlzLmluaXRQb3NpdGlvbi54LFxuICAgICAgICAgIHk6IHRoaXMuaW5pdFBvc2l0aW9uLnlcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5pbnN0YW5jZSk7XG4gICAgICB0aGlzLnZzID0gbmV3IHNyYyh7XG4gICAgICAgIGVsOiB0aGlzLnNjcm9sbEZyb21Bbnl3aGVyZSA/IGRvY3VtZW50IDogdGhpcy5lbCxcbiAgICAgICAgbW91c2VNdWx0aXBsaWVyOiBuYXZpZ2F0b3IucGxhdGZvcm0uaW5kZXhPZignV2luJykgPiAtMSA/IDEgOiAwLjQsXG4gICAgICAgIGZpcmVmb3hNdWx0aXBsaWVyOiB0aGlzLmZpcmVmb3hNdWx0aXBsaWVyLFxuICAgICAgICB0b3VjaE11bHRpcGxpZXI6IHRoaXMudG91Y2hNdWx0aXBsaWVyLFxuICAgICAgICB1c2VLZXlib2FyZDogZmFsc2UsXG4gICAgICAgIHBhc3NpdmU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgdGhpcy52cy5vbihmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoX3RoaXMyLnN0b3ApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV90aGlzMi5pc0RyYWdnaW5nU2Nyb2xsYmFyKSB7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzMi51cGRhdGVEZWx0YShlKTtcblxuICAgICAgICAgICAgaWYgKCFfdGhpczIuaXNTY3JvbGxpbmcpIF90aGlzMi5zdGFydFNjcm9sbGluZygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2V0U2Nyb2xsTGltaXQoKTtcbiAgICAgIHRoaXMuaW5pdFNjcm9sbEJhcigpO1xuICAgICAgdGhpcy5hZGRTZWN0aW9ucygpO1xuICAgICAgdGhpcy5hZGRFbGVtZW50cygpO1xuICAgICAgdGhpcy5jaGVja1Njcm9sbCh0cnVlKTtcbiAgICAgIHRoaXMudHJhbnNmb3JtRWxlbWVudHModHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgIF9nZXQoX2dldFByb3RvdHlwZU9mKF9kZWZhdWx0LnByb3RvdHlwZSksIFwiaW5pdFwiLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZXRTY3JvbGxMaW1pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTY3JvbGxMaW1pdCgpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2UubGltaXQueSA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy53aW5kb3dIZWlnaHQ7XG5cbiAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIHZhciB0b3RhbFdpZHRoID0gMDtcbiAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5lbC5jaGlsZHJlbjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdG90YWxXaWR0aCArPSBub2Rlc1tpXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UubGltaXQueCA9IHRvdGFsV2lkdGggLSB0aGlzLndpbmRvd1dpZHRoO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdGFydFNjcm9sbGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydFNjcm9sbGluZygpIHtcbiAgICAgIHRoaXMuc3RhcnRTY3JvbGxUcyA9IERhdGUubm93KCk7IC8vIFJlY29yZCB0aW1lc3RhbXBcblxuICAgICAgdGhpcy5pc1Njcm9sbGluZyA9IHRydWU7XG4gICAgICB0aGlzLmNoZWNrU2Nyb2xsKCk7XG4gICAgICB0aGlzLmh0bWwuY2xhc3NMaXN0LmFkZCh0aGlzLnNjcm9sbGluZ0NsYXNzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3RvcFNjcm9sbGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wU2Nyb2xsaW5nKCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5jaGVja1Njcm9sbFJhZik7IC8vIFByZXZlbnQgY2hlY2tTY3JvbGwgdG8gY29udGludWUgbG9vcGluZ1xuXG4gICAgICBpZiAodGhpcy5zY3JvbGxUb1JhZikge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnNjcm9sbFRvUmFmKTtcbiAgICAgICAgdGhpcy5zY3JvbGxUb1JhZiA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW5zdGFuY2Uuc2Nyb2xsLnkgPSBNYXRoLnJvdW5kKHRoaXMuaW5zdGFuY2Uuc2Nyb2xsLnkpO1xuICAgICAgdGhpcy5odG1sLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zY3JvbGxpbmdDbGFzcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNoZWNrS2V5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrS2V5KGUpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5zdG9wKSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSBzdG9wcGVkLCB3ZSBkb24ndCB3YW50IGFueSBzY3JvbGwgdG8gb2NjdXIgYmVjYXVzZSBvZiBhIGtleXByZXNzXG4gICAgICAgIC8vIFByZXZlbnQgdGFiIHRvIHNjcm9sbCB0byBhY3RpdmVFbGVtZW50XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT0ga2V5Q29kZXMkMS5UQUIpIHtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIG5hdGl2ZSBzY3JvbGwgaXMgYWx3YXlzIGF0IHRvcCBvZiBwYWdlXG4gICAgICAgICAgICBfdGhpczMuaHRtbC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgICAgICAgICAgX3RoaXMzLmh0bWwuc2Nyb2xsTGVmdCA9IDA7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgPSAwO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIGtleUNvZGVzJDEuVEFCOlxuICAgICAgICAgIC8vIERvIG5vdCByZW1vdmUgdGhlIFJBRlxuICAgICAgICAgIC8vIEl0IGFsbG93cyB0byBvdmVycmlkZSB0aGUgYnJvd3NlcidzIG5hdGl2ZSBzY3JvbGxUbywgd2hpY2ggaXMgZXNzZW50aWFsXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSBuYXRpdmUgc2Nyb2xsIGlzIGFsd2F5cyBhdCB0b3Agb2YgcGFnZVxuICAgICAgICAgICAgX3RoaXMzLmh0bWwuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICAgIF90aGlzMy5odG1sLnNjcm9sbExlZnQgPSAwO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ID0gMDsgLy8gUmVxdWVzdCBzY3JvbGxUbyBvbiB0aGUgZm9jdXNlZEVsZW1lbnQsIHB1dHRpbmcgaXQgYXQgdGhlIGNlbnRlciBvZiB0aGUgc2NyZWVuXG5cbiAgICAgICAgICAgIF90aGlzMy5zY3JvbGxUbyhkb2N1bWVudC5hY3RpdmVFbGVtZW50LCB7XG4gICAgICAgICAgICAgIG9mZnNldDogLXdpbmRvdy5pbm5lckhlaWdodCAvIDJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2Uga2V5Q29kZXMkMS5VUDpcbiAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10gLT0gMjQwO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2Uga2V5Q29kZXMkMS5ET1dOOlxuICAgICAgICAgIHRoaXMuaW5zdGFuY2UuZGVsdGFbdGhpcy5kaXJlY3Rpb25BeGlzXSArPSAyNDA7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBrZXlDb2RlcyQxLlBBR0VVUDpcbiAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10gLT0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2Uga2V5Q29kZXMkMS5QQUdFRE9XTjpcbiAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10gKz0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2Uga2V5Q29kZXMkMS5IT01FOlxuICAgICAgICAgIHRoaXMuaW5zdGFuY2UuZGVsdGFbdGhpcy5kaXJlY3Rpb25BeGlzXSAtPSB0aGlzLmluc3RhbmNlLmxpbWl0W3RoaXMuZGlyZWN0aW9uQXhpc107XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBrZXlDb2RlcyQxLkVORDpcbiAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10gKz0gdGhpcy5pbnN0YW5jZS5saW1pdFt0aGlzLmRpcmVjdGlvbkF4aXNdO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2Uga2V5Q29kZXMkMS5TUEFDRTpcbiAgICAgICAgICBpZiAoIShkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkgJiYgIShkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkpIHtcbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuZGVsdGFbdGhpcy5kaXJlY3Rpb25BeGlzXSAtPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10gKz0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pbnN0YW5jZS5kZWx0YVt0aGlzLmRpcmVjdGlvbkF4aXNdIDwgMCkgdGhpcy5pbnN0YW5jZS5kZWx0YVt0aGlzLmRpcmVjdGlvbkF4aXNdID0gMDtcbiAgICAgIGlmICh0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10gPiB0aGlzLmluc3RhbmNlLmxpbWl0W3RoaXMuZGlyZWN0aW9uQXhpc10pIHRoaXMuaW5zdGFuY2UuZGVsdGFbdGhpcy5kaXJlY3Rpb25BeGlzXSA9IHRoaXMuaW5zdGFuY2UubGltaXRbdGhpcy5kaXJlY3Rpb25BeGlzXTtcbiAgICAgIHRoaXMuc3RvcFNjcm9sbGluZygpOyAvLyBTdG9wIGFueSBtb3ZlbWVudCwgYWxsb3dzIHRvIGtpbGwgYW55IG90aGVyIGBzY3JvbGxUb2Agc3RpbGwgaGFwcGVuaW5nXG5cbiAgICAgIHRoaXMuaXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5jaGVja1Njcm9sbCgpO1xuICAgICAgdGhpcy5odG1sLmNsYXNzTGlzdC5hZGQodGhpcy5zY3JvbGxpbmdDbGFzcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNoZWNrU2Nyb2xsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrU2Nyb2xsKCkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHZhciBmb3JjZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xuXG4gICAgICBpZiAoZm9yY2VkIHx8IHRoaXMuaXNTY3JvbGxpbmcgfHwgdGhpcy5pc0RyYWdnaW5nU2Nyb2xsYmFyKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNTY3JvbGxUaWNraW5nKSB7XG4gICAgICAgICAgdGhpcy5jaGVja1Njcm9sbFJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM0LmNoZWNrU2Nyb2xsKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5oYXNTY3JvbGxUaWNraW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsKCk7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IE1hdGguYWJzKHRoaXMuaW5zdGFuY2UuZGVsdGFbdGhpcy5kaXJlY3Rpb25BeGlzXSAtIHRoaXMuaW5zdGFuY2Uuc2Nyb2xsW3RoaXMuZGlyZWN0aW9uQXhpc10pO1xuICAgICAgICB2YXIgdGltZVNpbmNlU3RhcnQgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydFNjcm9sbFRzOyAvLyBHZXQgdGhlIHRpbWUgc2luY2UgdGhlIHNjcm9sbCB3YXMgc3RhcnRlZDogdGhlIHNjcm9sbCBjYW4gYmUgc3RvcHBlZCBhZ2FpbiBvbmx5IHBhc3QgMTAwbXNcblxuICAgICAgICBpZiAoIXRoaXMuYW5pbWF0aW5nU2Nyb2xsICYmIHRpbWVTaW5jZVN0YXJ0ID4gMTAwICYmIChkaXN0YW5jZSA8IDAuNSAmJiB0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10gIT0gMCB8fCBkaXN0YW5jZSA8IDAuNSAmJiB0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10gPT0gMCkpIHtcbiAgICAgICAgICB0aGlzLnN0b3BTY3JvbGxpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHRoaXMuc2VjdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgICB2YXIgX3JlZjIgPSBfc2xpY2VkVG9BcnJheShfcmVmLCAyKSxcbiAgICAgICAgICAgICAgaSA9IF9yZWYyWzBdLFxuICAgICAgICAgICAgICBzZWN0aW9uID0gX3JlZjJbMV07XG5cbiAgICAgICAgICBpZiAoc2VjdGlvbi5wZXJzaXN0ZW50IHx8IF90aGlzNC5pbnN0YW5jZS5zY3JvbGxbX3RoaXM0LmRpcmVjdGlvbkF4aXNdID4gc2VjdGlvbi5vZmZzZXRbX3RoaXM0LmRpcmVjdGlvbkF4aXNdICYmIF90aGlzNC5pbnN0YW5jZS5zY3JvbGxbX3RoaXM0LmRpcmVjdGlvbkF4aXNdIDwgc2VjdGlvbi5saW1pdFtfdGhpczQuZGlyZWN0aW9uQXhpc10pIHtcbiAgICAgICAgICAgIGlmIChfdGhpczQuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgICAgX3RoaXM0LnRyYW5zZm9ybShzZWN0aW9uLmVsLCAtX3RoaXM0Lmluc3RhbmNlLnNjcm9sbFtfdGhpczQuZGlyZWN0aW9uQXhpc10sIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3RoaXM0LnRyYW5zZm9ybShzZWN0aW9uLmVsLCAwLCAtX3RoaXM0Lmluc3RhbmNlLnNjcm9sbFtfdGhpczQuZGlyZWN0aW9uQXhpc10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXNlY3Rpb24uaW5WaWV3KSB7XG4gICAgICAgICAgICAgIHNlY3Rpb24uaW5WaWV3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VjdGlvbi5lbC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgICAgc2VjdGlvbi5lbC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2FsbCc7XG4gICAgICAgICAgICAgIHNlY3Rpb24uZWwuc2V0QXR0cmlidXRlKFwiZGF0YS1cIi5jb25jYXQoX3RoaXM0Lm5hbWUsIFwiLXNlY3Rpb24taW52aWV3XCIpLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmluVmlldyB8fCBmb3JjZWQpIHtcbiAgICAgICAgICAgICAgc2VjdGlvbi5pblZpZXcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgc2VjdGlvbi5lbC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgICAgc2VjdGlvbi5lbC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgICAgICAgICBzZWN0aW9uLmVsLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtXCIuY29uY2F0KF90aGlzNC5uYW1lLCBcIi1zZWN0aW9uLWludmlld1wiKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzNC50cmFuc2Zvcm0oc2VjdGlvbi5lbCwgMCwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5nZXREaXJlY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLmFkZERpcmVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0U3BlZWQpIHtcbiAgICAgICAgICB0aGlzLmFkZFNwZWVkKCk7XG4gICAgICAgICAgdGhpcy5zcGVlZFRzID0gRGF0ZS5ub3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGV0ZWN0RWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50cygpO1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1Njcm9sbGJhcikge1xuICAgICAgICAgIHZhciBzY3JvbGxCYXJUcmFuc2xhdGlvbiA9IHRoaXMuaW5zdGFuY2Uuc2Nyb2xsW3RoaXMuZGlyZWN0aW9uQXhpc10gLyB0aGlzLmluc3RhbmNlLmxpbWl0W3RoaXMuZGlyZWN0aW9uQXhpc10gKiB0aGlzLnNjcm9sbEJhckxpbWl0W3RoaXMuZGlyZWN0aW9uQXhpc107XG5cbiAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0odGhpcy5zY3JvbGxiYXJUaHVtYiwgc2Nyb2xsQmFyVHJhbnNsYXRpb24sIDApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybSh0aGlzLnNjcm9sbGJhclRodW1iLCAwLCBzY3JvbGxCYXJUcmFuc2xhdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX2dldChfZ2V0UHJvdG90eXBlT2YoX2RlZmF1bHQucHJvdG90eXBlKSwgXCJjaGVja1Njcm9sbFwiLCB0aGlzKS5jYWxsKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaGFzU2Nyb2xsVGlja2luZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXNpemVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgdGhpcy53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICB0aGlzLmNoZWNrQ29udGV4dCgpO1xuICAgICAgdGhpcy53aW5kb3dNaWRkbGUgPSB7XG4gICAgICAgIHg6IHRoaXMud2luZG93V2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLndpbmRvd0hlaWdodCAvIDJcbiAgICAgIH07XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVEZWx0YVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVEZWx0YShlKSB7XG4gICAgICB2YXIgZGVsdGE7XG4gICAgICB2YXIgZ2VzdHVyZURpcmVjdGlvbiA9IHRoaXNbdGhpcy5jb250ZXh0XSAmJiB0aGlzW3RoaXMuY29udGV4dF0uZ2VzdHVyZURpcmVjdGlvbiA/IHRoaXNbdGhpcy5jb250ZXh0XS5nZXN0dXJlRGlyZWN0aW9uIDogdGhpcy5nZXN0dXJlRGlyZWN0aW9uO1xuXG4gICAgICBpZiAoZ2VzdHVyZURpcmVjdGlvbiA9PT0gJ2JvdGgnKSB7XG4gICAgICAgIGRlbHRhID0gZS5kZWx0YVggKyBlLmRlbHRhWTtcbiAgICAgIH0gZWxzZSBpZiAoZ2VzdHVyZURpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICBkZWx0YSA9IGUuZGVsdGFZO1xuICAgICAgfSBlbHNlIGlmIChnZXN0dXJlRGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgZGVsdGEgPSBlLmRlbHRhWDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbHRhID0gZS5kZWx0YVk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5zdGFuY2UuZGVsdGFbdGhpcy5kaXJlY3Rpb25BeGlzXSAtPSBkZWx0YSAqIHRoaXMubXVsdGlwbGllcjtcbiAgICAgIGlmICh0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10gPCAwKSB0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10gPSAwO1xuICAgICAgaWYgKHRoaXMuaW5zdGFuY2UuZGVsdGFbdGhpcy5kaXJlY3Rpb25BeGlzXSA+IHRoaXMuaW5zdGFuY2UubGltaXRbdGhpcy5kaXJlY3Rpb25BeGlzXSkgdGhpcy5pbnN0YW5jZS5kZWx0YVt0aGlzLmRpcmVjdGlvbkF4aXNdID0gdGhpcy5pbnN0YW5jZS5saW1pdFt0aGlzLmRpcmVjdGlvbkF4aXNdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVTY3JvbGxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlU2Nyb2xsKGUpIHtcbiAgICAgIGlmICh0aGlzLmlzU2Nyb2xsaW5nIHx8IHRoaXMuaXNEcmFnZ2luZ1Njcm9sbGJhcikge1xuICAgICAgICB0aGlzLmluc3RhbmNlLnNjcm9sbFt0aGlzLmRpcmVjdGlvbkF4aXNdID0gbGVycCh0aGlzLmluc3RhbmNlLnNjcm9sbFt0aGlzLmRpcmVjdGlvbkF4aXNdLCB0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10sIHRoaXMubGVycCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZS5zY3JvbGxbdGhpcy5kaXJlY3Rpb25BeGlzXSA+IHRoaXMuaW5zdGFuY2UubGltaXRbdGhpcy5kaXJlY3Rpb25BeGlzXSkge1xuICAgICAgICAgIHRoaXMuc2V0U2Nyb2xsKHRoaXMuaW5zdGFuY2Uuc2Nyb2xsW3RoaXMuZGlyZWN0aW9uQXhpc10sIHRoaXMuaW5zdGFuY2UubGltaXRbdGhpcy5kaXJlY3Rpb25BeGlzXSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pbnN0YW5jZS5zY3JvbGwueSA8IDApIHtcbiAgICAgICAgICB0aGlzLnNldFNjcm9sbCh0aGlzLmluc3RhbmNlLnNjcm9sbFt0aGlzLmRpcmVjdGlvbkF4aXNdLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFNjcm9sbCh0aGlzLmluc3RhbmNlLnNjcm9sbFt0aGlzLmRpcmVjdGlvbkF4aXNdLCB0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZERpcmVjdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGREaXJlY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pbnN0YW5jZS5kZWx0YS55ID4gdGhpcy5pbnN0YW5jZS5zY3JvbGwueSkge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZS5kaXJlY3Rpb24gIT09ICdkb3duJykge1xuICAgICAgICAgIHRoaXMuaW5zdGFuY2UuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaW5zdGFuY2UuZGVsdGEueSA8IHRoaXMuaW5zdGFuY2Uuc2Nyb2xsLnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UuZGlyZWN0aW9uICE9PSAndXAnKSB7XG4gICAgICAgICAgdGhpcy5pbnN0YW5jZS5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmluc3RhbmNlLmRlbHRhLnggPiB0aGlzLmluc3RhbmNlLnNjcm9sbC54KSB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlLmRpcmVjdGlvbiAhPT0gJ3JpZ2h0Jykge1xuICAgICAgICAgIHRoaXMuaW5zdGFuY2UuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmluc3RhbmNlLmRlbHRhLnggPCB0aGlzLmluc3RhbmNlLnNjcm9sbC54KSB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlLmRpcmVjdGlvbiAhPT0gJ2xlZnQnKSB7XG4gICAgICAgICAgdGhpcy5pbnN0YW5jZS5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkU3BlZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkU3BlZWQoKSB7XG4gICAgICBpZiAodGhpcy5pbnN0YW5jZS5kZWx0YVt0aGlzLmRpcmVjdGlvbkF4aXNdICE9IHRoaXMuaW5zdGFuY2Uuc2Nyb2xsW3RoaXMuZGlyZWN0aW9uQXhpc10pIHtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5zcGVlZCA9ICh0aGlzLmluc3RhbmNlLmRlbHRhW3RoaXMuZGlyZWN0aW9uQXhpc10gLSB0aGlzLmluc3RhbmNlLnNjcm9sbFt0aGlzLmRpcmVjdGlvbkF4aXNdKSAvIE1hdGgubWF4KDEsIERhdGUubm93KCkgLSB0aGlzLnNwZWVkVHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5zcGVlZCA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluaXRTY3JvbGxCYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdFNjcm9sbEJhcigpIHtcbiAgICAgIHRoaXMuc2Nyb2xsYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdGhpcy5zY3JvbGxiYXJUaHVtYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHRoaXMuc2Nyb2xsYmFyLmNsYXNzTGlzdC5hZGQoXCJcIi5jb25jYXQodGhpcy5zY3JvbGxiYXJDbGFzcykpO1xuICAgICAgdGhpcy5zY3JvbGxiYXJUaHVtYi5jbGFzc0xpc3QuYWRkKFwiXCIuY29uY2F0KHRoaXMuc2Nyb2xsYmFyQ2xhc3MsIFwiX3RodW1iXCIpKTtcbiAgICAgIHRoaXMuc2Nyb2xsYmFyLmFwcGVuZCh0aGlzLnNjcm9sbGJhclRodW1iKTtcblxuICAgICAgaWYgKHRoaXMuc2Nyb2xsYmFyQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsYmFyQ29udGFpbmVyLmFwcGVuZCh0aGlzLnNjcm9sbGJhcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLnNjcm9sbGJhcik7XG4gICAgICB9IC8vIFNjcm9sbGJhciBFdmVudHNcblxuXG4gICAgICB0aGlzLmdldFNjcm9sbEJhciA9IHRoaXMuZ2V0U2Nyb2xsQmFyLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnJlbGVhc2VTY3JvbGxCYXIgPSB0aGlzLnJlbGVhc2VTY3JvbGxCYXIuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMubW92ZVNjcm9sbEJhciA9IHRoaXMubW92ZVNjcm9sbEJhci5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy5zY3JvbGxiYXJUaHVtYi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmdldFNjcm9sbEJhcik7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMucmVsZWFzZVNjcm9sbEJhcik7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZlU2Nyb2xsQmFyKTsgLy8gU2V0IHNjcm9sbGJhciB2YWx1ZXNcblxuICAgICAgdGhpcy5oYXNTY3JvbGxiYXIgPSBmYWxzZTtcblxuICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09ICdob3Jpem9udGFsJykge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZS5saW1pdC54ICsgdGhpcy53aW5kb3dXaWR0aCA8PSB0aGlzLndpbmRvd1dpZHRoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZS5saW1pdC55ICsgdGhpcy53aW5kb3dIZWlnaHQgPD0gdGhpcy53aW5kb3dIZWlnaHQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5oYXNTY3JvbGxiYXIgPSB0cnVlO1xuICAgICAgdGhpcy5zY3JvbGxiYXJCQ1IgPSB0aGlzLnNjcm9sbGJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMuc2Nyb2xsYmFySGVpZ2h0ID0gdGhpcy5zY3JvbGxiYXJCQ1IuaGVpZ2h0O1xuICAgICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IHRoaXMuc2Nyb2xsYmFyQkNSLndpZHRoO1xuXG4gICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICB0aGlzLnNjcm9sbGJhclRodW1iLnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQodGhpcy5zY3JvbGxiYXJXaWR0aCAqIHRoaXMuc2Nyb2xsYmFyV2lkdGggLyAodGhpcy5pbnN0YW5jZS5saW1pdC54ICsgdGhpcy5zY3JvbGxiYXJXaWR0aCksIFwicHhcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNjcm9sbGJhclRodW1iLnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KHRoaXMuc2Nyb2xsYmFySGVpZ2h0ICogdGhpcy5zY3JvbGxiYXJIZWlnaHQgLyAodGhpcy5pbnN0YW5jZS5saW1pdC55ICsgdGhpcy5zY3JvbGxiYXJIZWlnaHQpLCBcInB4XCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNjcm9sbGJhclRodW1iQkNSID0gdGhpcy5zY3JvbGxiYXJUaHVtYi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMuc2Nyb2xsQmFyTGltaXQgPSB7XG4gICAgICAgIHg6IHRoaXMuc2Nyb2xsYmFyV2lkdGggLSB0aGlzLnNjcm9sbGJhclRodW1iQkNSLndpZHRoLFxuICAgICAgICB5OiB0aGlzLnNjcm9sbGJhckhlaWdodCAtIHRoaXMuc2Nyb2xsYmFyVGh1bWJCQ1IuaGVpZ2h0XG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZWluaXRTY3JvbGxCYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVpbml0U2Nyb2xsQmFyKCkge1xuICAgICAgdGhpcy5oYXNTY3JvbGxiYXIgPSBmYWxzZTtcblxuICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09ICdob3Jpem9udGFsJykge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZS5saW1pdC54ICsgdGhpcy53aW5kb3dXaWR0aCA8PSB0aGlzLndpbmRvd1dpZHRoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZS5saW1pdC55ICsgdGhpcy53aW5kb3dIZWlnaHQgPD0gdGhpcy53aW5kb3dIZWlnaHQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5oYXNTY3JvbGxiYXIgPSB0cnVlO1xuICAgICAgdGhpcy5zY3JvbGxiYXJCQ1IgPSB0aGlzLnNjcm9sbGJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMuc2Nyb2xsYmFySGVpZ2h0ID0gdGhpcy5zY3JvbGxiYXJCQ1IuaGVpZ2h0O1xuICAgICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IHRoaXMuc2Nyb2xsYmFyQkNSLndpZHRoO1xuXG4gICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICB0aGlzLnNjcm9sbGJhclRodW1iLnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQodGhpcy5zY3JvbGxiYXJXaWR0aCAqIHRoaXMuc2Nyb2xsYmFyV2lkdGggLyAodGhpcy5pbnN0YW5jZS5saW1pdC54ICsgdGhpcy5zY3JvbGxiYXJXaWR0aCksIFwicHhcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNjcm9sbGJhclRodW1iLnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KHRoaXMuc2Nyb2xsYmFySGVpZ2h0ICogdGhpcy5zY3JvbGxiYXJIZWlnaHQgLyAodGhpcy5pbnN0YW5jZS5saW1pdC55ICsgdGhpcy5zY3JvbGxiYXJIZWlnaHQpLCBcInB4XCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNjcm9sbGJhclRodW1iQkNSID0gdGhpcy5zY3JvbGxiYXJUaHVtYi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMuc2Nyb2xsQmFyTGltaXQgPSB7XG4gICAgICAgIHg6IHRoaXMuc2Nyb2xsYmFyV2lkdGggLSB0aGlzLnNjcm9sbGJhclRodW1iQkNSLndpZHRoLFxuICAgICAgICB5OiB0aGlzLnNjcm9sbGJhckhlaWdodCAtIHRoaXMuc2Nyb2xsYmFyVGh1bWJCQ1IuaGVpZ2h0XG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZXN0cm95U2Nyb2xsQmFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3lTY3JvbGxCYXIoKSB7XG4gICAgICB0aGlzLnNjcm9sbGJhclRodW1iLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuZ2V0U2Nyb2xsQmFyKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5yZWxlYXNlU2Nyb2xsQmFyKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdmVTY3JvbGxCYXIpO1xuICAgICAgdGhpcy5zY3JvbGxiYXIucmVtb3ZlKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFNjcm9sbEJhclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTY3JvbGxCYXIoZSkge1xuICAgICAgdGhpcy5pc0RyYWdnaW5nU2Nyb2xsYmFyID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2hlY2tTY3JvbGwoKTtcbiAgICAgIHRoaXMuaHRtbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2Nyb2xsaW5nQ2xhc3MpO1xuICAgICAgdGhpcy5odG1sLmNsYXNzTGlzdC5hZGQodGhpcy5kcmFnZ2luZ0NsYXNzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVsZWFzZVNjcm9sbEJhclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWxlYXNlU2Nyb2xsQmFyKGUpIHtcbiAgICAgIHRoaXMuaXNEcmFnZ2luZ1Njcm9sbGJhciA9IGZhbHNlO1xuICAgICAgdGhpcy5odG1sLmNsYXNzTGlzdC5hZGQodGhpcy5zY3JvbGxpbmdDbGFzcyk7XG4gICAgICB0aGlzLmh0bWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRyYWdnaW5nQ2xhc3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJtb3ZlU2Nyb2xsQmFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmVTY3JvbGxCYXIoZSkge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmdTY3JvbGxiYXIpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgeCA9IChlLmNsaWVudFggLSBfdGhpczUuc2Nyb2xsYmFyQkNSLmxlZnQpICogMTAwIC8gX3RoaXM1LnNjcm9sbGJhcldpZHRoICogX3RoaXM1Lmluc3RhbmNlLmxpbWl0LnggLyAxMDA7XG4gICAgICAgICAgdmFyIHkgPSAoZS5jbGllbnRZIC0gX3RoaXM1LnNjcm9sbGJhckJDUi50b3ApICogMTAwIC8gX3RoaXM1LnNjcm9sbGJhckhlaWdodCAqIF90aGlzNS5pbnN0YW5jZS5saW1pdC55IC8gMTAwO1xuXG4gICAgICAgICAgaWYgKHkgPiAwICYmIHkgPCBfdGhpczUuaW5zdGFuY2UubGltaXQueSkge1xuICAgICAgICAgICAgX3RoaXM1Lmluc3RhbmNlLmRlbHRhLnkgPSB5O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh4ID4gMCAmJiB4IDwgX3RoaXM1Lmluc3RhbmNlLmxpbWl0LngpIHtcbiAgICAgICAgICAgIF90aGlzNS5pbnN0YW5jZS5kZWx0YS54ID0geDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRFbGVtZW50c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRFbGVtZW50cygpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICB0aGlzLmVscyA9IHt9O1xuICAgICAgdGhpcy5wYXJhbGxheEVsZW1lbnRzID0ge307IC8vIHRoaXMuc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbiwgeSkgPT4ge1xuXG4gICAgICB2YXIgZWxzID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtXCIuY29uY2F0KHRoaXMubmFtZSwgXCJdXCIpKTtcbiAgICAgIGVscy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcbiAgICAgICAgLy8gVHJ5IGFuZCBmaW5kIHRoZSB0YXJnZXQncyBwYXJlbnQgc2VjdGlvblxuICAgICAgICB2YXIgdGFyZ2V0UGFyZW50cyA9IGdldFBhcmVudHMoZWwpO1xuICAgICAgICB2YXIgc2VjdGlvbiA9IE9iamVjdC5lbnRyaWVzKF90aGlzNi5zZWN0aW9ucykubWFwKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgICAgIHZhciBfcmVmNCA9IF9zbGljZWRUb0FycmF5KF9yZWYzLCAyKSxcbiAgICAgICAgICAgICAga2V5ID0gX3JlZjRbMF0sXG4gICAgICAgICAgICAgIHNlY3Rpb24gPSBfcmVmNFsxXTtcblxuICAgICAgICAgIHJldHVybiBzZWN0aW9uO1xuICAgICAgICB9KS5maW5kKGZ1bmN0aW9uIChzZWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHRhcmdldFBhcmVudHMuaW5jbHVkZXMoc2VjdGlvbi5lbCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgY2wgPSBlbC5kYXRhc2V0W190aGlzNi5uYW1lICsgJ0NsYXNzJ10gfHwgX3RoaXM2W1wiY2xhc3NcIl07XG4gICAgICAgIHZhciBpZCA9IHR5cGVvZiBlbC5kYXRhc2V0W190aGlzNi5uYW1lICsgJ0lkJ10gPT09ICdzdHJpbmcnID8gZWwuZGF0YXNldFtfdGhpczYubmFtZSArICdJZCddIDogJ2VsJyArIGluZGV4O1xuICAgICAgICB2YXIgdG9wO1xuICAgICAgICB2YXIgbGVmdDtcbiAgICAgICAgdmFyIHJlcGVhdCA9IGVsLmRhdGFzZXRbX3RoaXM2Lm5hbWUgKyAnUmVwZWF0J107XG4gICAgICAgIHZhciBjYWxsID0gZWwuZGF0YXNldFtfdGhpczYubmFtZSArICdDYWxsJ107XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IGVsLmRhdGFzZXRbX3RoaXM2Lm5hbWUgKyAnUG9zaXRpb24nXTtcbiAgICAgICAgdmFyIGRlbGF5ID0gZWwuZGF0YXNldFtfdGhpczYubmFtZSArICdEZWxheSddO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gZWwuZGF0YXNldFtfdGhpczYubmFtZSArICdEaXJlY3Rpb24nXTtcbiAgICAgICAgdmFyIHN0aWNreSA9IHR5cGVvZiBlbC5kYXRhc2V0W190aGlzNi5uYW1lICsgJ1N0aWNreSddID09PSAnc3RyaW5nJztcbiAgICAgICAgdmFyIHNwZWVkID0gZWwuZGF0YXNldFtfdGhpczYubmFtZSArICdTcGVlZCddID8gcGFyc2VGbG9hdChlbC5kYXRhc2V0W190aGlzNi5uYW1lICsgJ1NwZWVkJ10pIC8gMTAgOiBmYWxzZTtcbiAgICAgICAgdmFyIG9mZnNldCA9IHR5cGVvZiBlbC5kYXRhc2V0W190aGlzNi5uYW1lICsgJ09mZnNldCddID09PSAnc3RyaW5nJyA/IGVsLmRhdGFzZXRbX3RoaXM2Lm5hbWUgKyAnT2Zmc2V0J10uc3BsaXQoJywnKSA6IF90aGlzNi5vZmZzZXQ7XG4gICAgICAgIHZhciB0YXJnZXQgPSBlbC5kYXRhc2V0W190aGlzNi5uYW1lICsgJ1RhcmdldCddO1xuICAgICAgICB2YXIgdGFyZ2V0RWw7XG5cbiAgICAgICAgaWYgKHRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiXCIuY29uY2F0KHRhcmdldCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldEVsID0gZWw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGFyZ2V0RWxCQ1IgPSB0YXJnZXRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBpZiAoc2VjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAgIHRvcCA9IHRhcmdldEVsQkNSLnRvcCArIF90aGlzNi5pbnN0YW5jZS5zY3JvbGwueSAtIGdldFRyYW5zbGF0ZSh0YXJnZXRFbCkueTtcbiAgICAgICAgICBsZWZ0ID0gdGFyZ2V0RWxCQ1IubGVmdCArIF90aGlzNi5pbnN0YW5jZS5zY3JvbGwueCAtIGdldFRyYW5zbGF0ZSh0YXJnZXRFbCkueDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXNlY3Rpb24uaW5WaWV3KSB7XG4gICAgICAgICAgICB0b3AgPSB0YXJnZXRFbEJDUi50b3AgLSBnZXRUcmFuc2xhdGUoc2VjdGlvbi5lbCkueSAtIGdldFRyYW5zbGF0ZSh0YXJnZXRFbCkueTtcbiAgICAgICAgICAgIGxlZnQgPSB0YXJnZXRFbEJDUi5sZWZ0IC0gZ2V0VHJhbnNsYXRlKHNlY3Rpb24uZWwpLnggLSBnZXRUcmFuc2xhdGUodGFyZ2V0RWwpLng7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvcCA9IHRhcmdldEVsQkNSLnRvcCArIF90aGlzNi5pbnN0YW5jZS5zY3JvbGwueSAtIGdldFRyYW5zbGF0ZSh0YXJnZXRFbCkueTtcbiAgICAgICAgICAgIGxlZnQgPSB0YXJnZXRFbEJDUi5sZWZ0ICsgX3RoaXM2Lmluc3RhbmNlLnNjcm9sbC54IC0gZ2V0VHJhbnNsYXRlKHRhcmdldEVsKS54O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBib3R0b20gPSB0b3AgKyB0YXJnZXRFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHZhciByaWdodCA9IGxlZnQgKyB0YXJnZXRFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgdmFyIG1pZGRsZSA9IHtcbiAgICAgICAgICB4OiAocmlnaHQgLSBsZWZ0KSAvIDIgKyBsZWZ0LFxuICAgICAgICAgIHk6IChib3R0b20gLSB0b3ApIC8gMiArIHRvcFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzdGlja3kpIHtcbiAgICAgICAgICB2YXIgZWxCQ1IgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICB2YXIgZWxUb3AgPSBlbEJDUi50b3A7XG4gICAgICAgICAgdmFyIGVsTGVmdCA9IGVsQkNSLmxlZnQ7XG4gICAgICAgICAgdmFyIGVsRGlzdGFuY2UgPSB7XG4gICAgICAgICAgICB4OiBlbExlZnQgLSBsZWZ0LFxuICAgICAgICAgICAgeTogZWxUb3AgLSB0b3BcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRvcCArPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgbGVmdCArPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICBib3R0b20gPSBlbFRvcCArIHRhcmdldEVsLm9mZnNldEhlaWdodCAtIGVsLm9mZnNldEhlaWdodCAtIGVsRGlzdGFuY2VbX3RoaXM2LmRpcmVjdGlvbkF4aXNdO1xuICAgICAgICAgIHJpZ2h0ID0gZWxMZWZ0ICsgdGFyZ2V0RWwub2Zmc2V0V2lkdGggLSBlbC5vZmZzZXRXaWR0aCAtIGVsRGlzdGFuY2VbX3RoaXM2LmRpcmVjdGlvbkF4aXNdO1xuICAgICAgICAgIG1pZGRsZSA9IHtcbiAgICAgICAgICAgIHg6IChyaWdodCAtIGxlZnQpIC8gMiArIGxlZnQsXG4gICAgICAgICAgICB5OiAoYm90dG9tIC0gdG9wKSAvIDIgKyB0b3BcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcGVhdCA9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgcmVwZWF0ID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAocmVwZWF0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlcGVhdCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwZWF0ID0gX3RoaXM2LnJlcGVhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWxhdGl2ZU9mZnNldCA9IFswLCAwXTtcblxuICAgICAgICBpZiAob2Zmc2V0KSB7XG4gICAgICAgICAgaWYgKF90aGlzNi5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvZmZzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvZmZzZXRbaV0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0W2ldLmluY2x1ZGVzKCclJykpIHtcbiAgICAgICAgICAgICAgICAgIHJlbGF0aXZlT2Zmc2V0W2ldID0gcGFyc2VJbnQob2Zmc2V0W2ldLnJlcGxhY2UoJyUnLCAnJykgKiBfdGhpczYud2luZG93V2lkdGggLyAxMDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZU9mZnNldFtpXSA9IHBhcnNlSW50KG9mZnNldFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbGF0aXZlT2Zmc2V0W2ldID0gb2Zmc2V0W2ldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxlZnQgPSBsZWZ0ICsgcmVsYXRpdmVPZmZzZXRbMF07XG4gICAgICAgICAgICByaWdodCA9IHJpZ2h0IC0gcmVsYXRpdmVPZmZzZXRbMV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2Zmc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0W2ldID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldFtpXS5pbmNsdWRlcygnJScpKSB7XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZU9mZnNldFtpXSA9IHBhcnNlSW50KG9mZnNldFtpXS5yZXBsYWNlKCclJywgJycpICogX3RoaXM2LndpbmRvd0hlaWdodCAvIDEwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJlbGF0aXZlT2Zmc2V0W2ldID0gcGFyc2VJbnQob2Zmc2V0W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVsYXRpdmVPZmZzZXRbaV0gPSBvZmZzZXRbaV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9wID0gdG9wICsgcmVsYXRpdmVPZmZzZXRbMF07XG4gICAgICAgICAgICBib3R0b20gPSBib3R0b20gLSByZWxhdGl2ZU9mZnNldFsxXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWFwcGVkRWwgPSB7XG4gICAgICAgICAgZWw6IGVsLFxuICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICBcImNsYXNzXCI6IGNsLFxuICAgICAgICAgIHNlY3Rpb246IHNlY3Rpb24sXG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgbWlkZGxlOiBtaWRkbGUsXG4gICAgICAgICAgYm90dG9tOiBib3R0b20sXG4gICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICByaWdodDogcmlnaHQsXG4gICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgcmVwZWF0OiByZXBlYXQsXG4gICAgICAgICAgaW5WaWV3OiBmYWxzZSxcbiAgICAgICAgICBjYWxsOiBjYWxsLFxuICAgICAgICAgIHNwZWVkOiBzcGVlZCxcbiAgICAgICAgICBkZWxheTogZGVsYXksXG4gICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgIHRhcmdldDogdGFyZ2V0RWwsXG4gICAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICAgICAgc3RpY2t5OiBzdGlja3lcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXM2LmVsc1tpZF0gPSBtYXBwZWRFbDtcblxuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsKSkge1xuICAgICAgICAgIF90aGlzNi5zZXRJblZpZXcoX3RoaXM2LmVsc1tpZF0sIGlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcGVlZCAhPT0gZmFsc2UgfHwgc3RpY2t5KSB7XG4gICAgICAgICAgX3RoaXM2LnBhcmFsbGF4RWxlbWVudHNbaWRdID0gbWFwcGVkRWw7XG4gICAgICAgIH1cbiAgICAgIH0pOyAvLyB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkU2VjdGlvbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkU2VjdGlvbnMoKSB7XG4gICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgdGhpcy5zZWN0aW9ucyA9IHt9O1xuICAgICAgdmFyIHNlY3Rpb25zID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtXCIuY29uY2F0KHRoaXMubmFtZSwgXCItc2VjdGlvbl1cIikpO1xuXG4gICAgICBpZiAoc2VjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNlY3Rpb25zID0gW3RoaXMuZWxdO1xuICAgICAgfVxuXG4gICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzZWN0aW9uLCBpbmRleCkge1xuICAgICAgICB2YXIgaWQgPSB0eXBlb2Ygc2VjdGlvbi5kYXRhc2V0W190aGlzNy5uYW1lICsgJ0lkJ10gPT09ICdzdHJpbmcnID8gc2VjdGlvbi5kYXRhc2V0W190aGlzNy5uYW1lICsgJ0lkJ10gOiAnc2VjdGlvbicgKyBpbmRleDtcbiAgICAgICAgdmFyIHNlY3Rpb25CQ1IgPSBzZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgb2Zmc2V0ID0ge1xuICAgICAgICAgIHg6IHNlY3Rpb25CQ1IubGVmdCAtIHdpbmRvdy5pbm5lcldpZHRoICogMS41IC0gZ2V0VHJhbnNsYXRlKHNlY3Rpb24pLngsXG4gICAgICAgICAgeTogc2VjdGlvbkJDUi50b3AgLSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAxLjUgLSBnZXRUcmFuc2xhdGUoc2VjdGlvbikueVxuICAgICAgICB9O1xuICAgICAgICB2YXIgbGltaXQgPSB7XG4gICAgICAgICAgeDogb2Zmc2V0LnggKyBzZWN0aW9uQkNSLndpZHRoICsgd2luZG93LmlubmVyV2lkdGggKiAyLFxuICAgICAgICAgIHk6IG9mZnNldC55ICsgc2VjdGlvbkJDUi5oZWlnaHQgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKiAyXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwZXJzaXN0ZW50ID0gdHlwZW9mIHNlY3Rpb24uZGF0YXNldFtfdGhpczcubmFtZSArICdQZXJzaXN0ZW50J10gPT09ICdzdHJpbmcnO1xuICAgICAgICBzZWN0aW9uLnNldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtc2VjdGlvbi1pZCcsIGlkKTtcbiAgICAgICAgdmFyIG1hcHBlZFNlY3Rpb24gPSB7XG4gICAgICAgICAgZWw6IHNlY3Rpb24sXG4gICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgbGltaXQ6IGxpbWl0LFxuICAgICAgICAgIGluVmlldzogZmFsc2UsXG4gICAgICAgICAgcGVyc2lzdGVudDogcGVyc2lzdGVudCxcbiAgICAgICAgICBpZDogaWRcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXM3LnNlY3Rpb25zW2lkXSA9IG1hcHBlZFNlY3Rpb247XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidHJhbnNmb3JtXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYW5zZm9ybShlbGVtZW50LCB4LCB5LCBkZWxheSkge1xuICAgICAgdmFyIHRyYW5zZm9ybTtcblxuICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICB0cmFuc2Zvcm0gPSBcIm1hdHJpeDNkKDEsMCwwLjAwLDAsMC4wMCwxLDAuMDAsMCwwLDAsMSwwLFwiLmNvbmNhdCh4LCBcIixcIikuY29uY2F0KHksIFwiLDAsMSlcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc3RhcnQgPSBnZXRUcmFuc2xhdGUoZWxlbWVudCk7XG4gICAgICAgIHZhciBsZXJwWCA9IGxlcnAoc3RhcnQueCwgeCwgZGVsYXkpO1xuICAgICAgICB2YXIgbGVycFkgPSBsZXJwKHN0YXJ0LnksIHksIGRlbGF5KTtcbiAgICAgICAgdHJhbnNmb3JtID0gXCJtYXRyaXgzZCgxLDAsMC4wMCwwLDAuMDAsMSwwLjAwLDAsMCwwLDEsMCxcIi5jb25jYXQobGVycFgsIFwiLFwiKS5jb25jYXQobGVycFksIFwiLDAsMSlcIik7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgZWxlbWVudC5zdHlsZS5tc1RyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0cmFuc2Zvcm1FbGVtZW50c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmFuc2Zvcm1FbGVtZW50cyhpc0ZvcmNlZCkge1xuICAgICAgdmFyIF90aGlzOCA9IHRoaXM7XG5cbiAgICAgIHZhciBzZXRBbGxFbGVtZW50cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG4gICAgICB2YXIgc2Nyb2xsUmlnaHQgPSB0aGlzLmluc3RhbmNlLnNjcm9sbC54ICsgdGhpcy53aW5kb3dXaWR0aDtcbiAgICAgIHZhciBzY3JvbGxCb3R0b20gPSB0aGlzLmluc3RhbmNlLnNjcm9sbC55ICsgdGhpcy53aW5kb3dIZWlnaHQ7XG4gICAgICB2YXIgc2Nyb2xsTWlkZGxlID0ge1xuICAgICAgICB4OiB0aGlzLmluc3RhbmNlLnNjcm9sbC54ICsgdGhpcy53aW5kb3dNaWRkbGUueCxcbiAgICAgICAgeTogdGhpcy5pbnN0YW5jZS5zY3JvbGwueSArIHRoaXMud2luZG93TWlkZGxlLnlcbiAgICAgIH07XG4gICAgICBPYmplY3QuZW50cmllcyh0aGlzLnBhcmFsbGF4RWxlbWVudHMpLmZvckVhY2goZnVuY3Rpb24gKF9yZWY1KSB7XG4gICAgICAgIHZhciBfcmVmNiA9IF9zbGljZWRUb0FycmF5KF9yZWY1LCAyKSxcbiAgICAgICAgICAgIGkgPSBfcmVmNlswXSxcbiAgICAgICAgICAgIGN1cnJlbnQgPSBfcmVmNlsxXTtcblxuICAgICAgICB2YXIgdHJhbnNmb3JtRGlzdGFuY2UgPSBmYWxzZTtcblxuICAgICAgICBpZiAoaXNGb3JjZWQpIHtcbiAgICAgICAgICB0cmFuc2Zvcm1EaXN0YW5jZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudC5pblZpZXcgfHwgc2V0QWxsRWxlbWVudHMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnQucG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgIHRyYW5zZm9ybURpc3RhbmNlID0gX3RoaXM4Lmluc3RhbmNlLnNjcm9sbFtfdGhpczguZGlyZWN0aW9uQXhpc10gKiAtY3VycmVudC5zcGVlZDtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRUb3AnOlxuICAgICAgICAgICAgICB0cmFuc2Zvcm1EaXN0YW5jZSA9IChzY3JvbGxCb3R0b20gLSBjdXJyZW50LnRvcCkgKiAtY3VycmVudC5zcGVlZDtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgIHRyYW5zZm9ybURpc3RhbmNlID0gKF90aGlzOC5pbnN0YW5jZS5saW1pdFtfdGhpczguZGlyZWN0aW9uQXhpc10gLSBzY3JvbGxCb3R0b20gKyBfdGhpczgud2luZG93SGVpZ2h0KSAqIGN1cnJlbnQuc3BlZWQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgdHJhbnNmb3JtRGlzdGFuY2UgPSBfdGhpczguaW5zdGFuY2Uuc2Nyb2xsW190aGlzOC5kaXJlY3Rpb25BeGlzXSAqIC1jdXJyZW50LnNwZWVkO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnZWxlbWVudExlZnQnOlxuICAgICAgICAgICAgICB0cmFuc2Zvcm1EaXN0YW5jZSA9IChzY3JvbGxSaWdodCAtIGN1cnJlbnQubGVmdCkgKiAtY3VycmVudC5zcGVlZDtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgdHJhbnNmb3JtRGlzdGFuY2UgPSAoX3RoaXM4Lmluc3RhbmNlLmxpbWl0W190aGlzOC5kaXJlY3Rpb25BeGlzXSAtIHNjcm9sbFJpZ2h0ICsgX3RoaXM4LndpbmRvd0hlaWdodCkgKiBjdXJyZW50LnNwZWVkO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgdHJhbnNmb3JtRGlzdGFuY2UgPSAoc2Nyb2xsTWlkZGxlW190aGlzOC5kaXJlY3Rpb25BeGlzXSAtIGN1cnJlbnQubWlkZGxlW190aGlzOC5kaXJlY3Rpb25BeGlzXSkgKiAtY3VycmVudC5zcGVlZDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnQuc3RpY2t5KSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQuaW5WaWV3KSB7XG4gICAgICAgICAgICBpZiAoX3RoaXM4LmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybURpc3RhbmNlID0gX3RoaXM4Lmluc3RhbmNlLnNjcm9sbC54IC0gY3VycmVudC5sZWZ0ICsgd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0cmFuc2Zvcm1EaXN0YW5jZSA9IF90aGlzOC5pbnN0YW5jZS5zY3JvbGwueSAtIGN1cnJlbnQudG9wICsgd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoX3RoaXM4LmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpczguaW5zdGFuY2Uuc2Nyb2xsLnggPCBjdXJyZW50LmxlZnQgLSB3aW5kb3cuaW5uZXJXaWR0aCAmJiBfdGhpczguaW5zdGFuY2Uuc2Nyb2xsLnggPCBjdXJyZW50LmxlZnQgLSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1EaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoX3RoaXM4Lmluc3RhbmNlLnNjcm9sbC54ID4gY3VycmVudC5yaWdodCAmJiBfdGhpczguaW5zdGFuY2Uuc2Nyb2xsLnggPiBjdXJyZW50LnJpZ2h0ICsgMTAwKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtRGlzdGFuY2UgPSBjdXJyZW50LnJpZ2h0IC0gY3VycmVudC5sZWZ0ICsgd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtRGlzdGFuY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzOC5pbnN0YW5jZS5zY3JvbGwueSA8IGN1cnJlbnQudG9wIC0gd2luZG93LmlubmVySGVpZ2h0ICYmIF90aGlzOC5pbnN0YW5jZS5zY3JvbGwueSA8IGN1cnJlbnQudG9wIC0gd2luZG93LmlubmVySGVpZ2h0IC8gMikge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybURpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChfdGhpczguaW5zdGFuY2Uuc2Nyb2xsLnkgPiBjdXJyZW50LmJvdHRvbSAmJiBfdGhpczguaW5zdGFuY2Uuc2Nyb2xsLnkgPiBjdXJyZW50LmJvdHRvbSArIDEwMCkge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybURpc3RhbmNlID0gY3VycmVudC5ib3R0b20gLSBjdXJyZW50LnRvcCArIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1EaXN0YW5jZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyYW5zZm9ybURpc3RhbmNlICE9PSBmYWxzZSkge1xuICAgICAgICAgIGlmIChjdXJyZW50LmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnIHx8IF90aGlzOC5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiBjdXJyZW50LmRpcmVjdGlvbiAhPT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgX3RoaXM4LnRyYW5zZm9ybShjdXJyZW50LmVsLCB0cmFuc2Zvcm1EaXN0YW5jZSwgMCwgaXNGb3JjZWQgPyBmYWxzZSA6IGN1cnJlbnQuZGVsYXkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpczgudHJhbnNmb3JtKGN1cnJlbnQuZWwsIDAsIHRyYW5zZm9ybURpc3RhbmNlLCBpc0ZvcmNlZCA/IGZhbHNlIDogY3VycmVudC5kZWxheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2Nyb2xsIHRvIGEgZGVzaXJlZCB0YXJnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIEF2YWlsYWJsZSBvcHRpb25zIDpcbiAgICAgKiAgICAgICAgICB0YXJnZXQge25vZGUsIHN0cmluZywgXCJ0b3BcIiwgXCJib3R0b21cIiwgaW50fSAtIFRoZSBET00gZWxlbWVudCB3ZSB3YW50IHRvIHNjcm9sbCB0b1xuICAgICAqICAgICAgICAgIG9wdGlvbnMge29iamVjdH0gLSBPcHRpb25zIG9iamVjdCBmb3IgYWRkaXRpb25uYWwgc2V0dGluZ3MuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNjcm9sbFRvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNjcm9sbFRvKHRhcmdldCkge1xuICAgICAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAgIC8vIFBhcnNlIG9wdGlvbnNcbiAgICAgIHZhciBvZmZzZXQgPSBwYXJzZUludChvcHRpb25zLm9mZnNldCkgfHwgMDsgLy8gQW4gb2Zmc2V0IHRvIGFwcGx5IG9uIHRvcCBvZiBnaXZlbiBgdGFyZ2V0YCBvciBgc291cmNlRWxlbWAncyB0YXJnZXRcblxuICAgICAgdmFyIGR1cmF0aW9uID0gIWlzTmFOKHBhcnNlSW50KG9wdGlvbnMuZHVyYXRpb24pKSA/IHBhcnNlSW50KG9wdGlvbnMuZHVyYXRpb24pIDogMTAwMDsgLy8gRHVyYXRpb24gb2YgdGhlIHNjcm9sbCBhbmltYXRpb24gaW4gbWlsbGlzZWNvbmRzXG5cbiAgICAgIHZhciBlYXNpbmcgPSBvcHRpb25zLmVhc2luZyB8fCBbMC4yNSwgMC4wLCAwLjM1LCAxLjBdOyAvLyBBbiBhcnJheSBvZiA0IGZsb2F0cyBiZXR3ZWVuIDAgYW5kIDEgZGVmaW5pbmcgdGhlIGJlemllciBjdXJ2ZSBmb3IgdGhlIGFuaW1hdGlvbidzIGVhc2luZy4gU2VlIGh0dHA6Ly9ncmV3ZWIubWUvYmV6aWVyLWVhc2luZy1lZGl0b3IvZXhhbXBsZS9cblxuICAgICAgdmFyIGRpc2FibGVMZXJwID0gb3B0aW9ucy5kaXNhYmxlTGVycCA/IHRydWUgOiBmYWxzZTsgLy8gTGVycCBlZmZlY3Qgd29uJ3QgYmUgYXBwbGllZCBpZiBzZXQgdG8gdHJ1ZVxuXG4gICAgICB2YXIgY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrID8gb3B0aW9ucy5jYWxsYmFjayA6IGZhbHNlOyAvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiBzY3JvbGxUbyBjb21wbGV0ZXMgKG5vdGUgdGhhdCBpdCB3b24ndCB3YWl0IGZvciBsZXJwIHRvIHN0YWJpbGl6ZSlcblxuICAgICAgZWFzaW5nID0gc3JjJDEuYXBwbHkodm9pZCAwLCBfdG9Db25zdW1hYmxlQXJyYXkoZWFzaW5nKSk7XG5cbiAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBTZWxlY3RvciBvciBib3VuZGFyaWVzXG4gICAgICAgIGlmICh0YXJnZXQgPT09ICd0b3AnKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gdGhpcy5pbnN0YW5jZS5saW1pdC55O1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICB0YXJnZXQgPSB0aGlzLmluc3RhbmNlLmxpbWl0Lng7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBJZiB0aGUgcXVlcnkgZmFpbHMsIGFib3J0XG5cbiAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAvLyBBYnNvbHV0ZSBjb29yZGluYXRlXG4gICAgICAgIHRhcmdldCA9IHBhcnNlSW50KHRhcmdldCk7XG4gICAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0YXJnZXQudGFnTmFtZSkgOyBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdgdGFyZ2V0YCBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gV2UgaGF2ZSBhIHRhcmdldCB0aGF0IGlzIG5vdCBhIGNvb3JkaW5hdGUgeWV0LCBnZXQgaXRcblxuXG4gICAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgLy8gVmVyaWZ5IHRoZSBnaXZlbiB0YXJnZXQgYmVsb25ncyB0byB0aGlzIHNjcm9sbCBzY29wZVxuICAgICAgICB2YXIgdGFyZ2V0SW5TY29wZSA9IGdldFBhcmVudHModGFyZ2V0KS5pbmNsdWRlcyh0aGlzLmVsKTtcblxuICAgICAgICBpZiAoIXRhcmdldEluU2NvcGUpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgdGFyZ2V0IGlzbid0IGluc2lkZSBvdXIgbWFpbiBlbGVtZW50LCBhYm9ydCBhbnkgYWN0aW9uXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIEdldCB0YXJnZXQgb2Zmc2V0IGZyb20gdG9wXG5cblxuICAgICAgICB2YXIgdGFyZ2V0QkNSID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgb2Zmc2V0VG9wID0gdGFyZ2V0QkNSLnRvcDtcbiAgICAgICAgdmFyIG9mZnNldExlZnQgPSB0YXJnZXRCQ1IubGVmdDsgLy8gVHJ5IGFuZCBmaW5kIHRoZSB0YXJnZXQncyBwYXJlbnQgc2VjdGlvblxuXG4gICAgICAgIHZhciB0YXJnZXRQYXJlbnRzID0gZ2V0UGFyZW50cyh0YXJnZXQpO1xuICAgICAgICB2YXIgcGFyZW50U2VjdGlvbiA9IHRhcmdldFBhcmVudHMuZmluZChmdW5jdGlvbiAoY2FuZGlkYXRlKSB7XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKF90aGlzOS5zZWN0aW9ucykgLy8gR2V0IHNlY3Rpb25zIGFzc29jaWF0aXZlIGFycmF5IGFzIGEgcmVndWxhciBhcnJheVxuICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKF9yZWY3KSB7XG4gICAgICAgICAgICB2YXIgX3JlZjggPSBfc2xpY2VkVG9BcnJheShfcmVmNywgMiksXG4gICAgICAgICAgICAgICAga2V5ID0gX3JlZjhbMF0sXG4gICAgICAgICAgICAgICAgc2VjdGlvbiA9IF9yZWY4WzFdO1xuXG4gICAgICAgICAgICByZXR1cm4gc2VjdGlvbjtcbiAgICAgICAgICB9KSAvLyBtYXAgdG8gc2VjdGlvbiBvbmx5ICh3ZSBkb250IG5lZWQgdGhlIGtleSBoZXJlKVxuICAgICAgICAgIC5maW5kKGZ1bmN0aW9uIChzZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VjdGlvbi5lbCA9PSBjYW5kaWRhdGU7XG4gICAgICAgICAgfSk7IC8vIGZpbmFsbHkgZmluZCB0aGUgc2VjdGlvbiB0aGF0IG1hdGNoZXMgdGhlIGNhbmRpZGF0ZVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHBhcmVudFNlY3Rpb25PZmZzZXQgPSAwO1xuXG4gICAgICAgIGlmIChwYXJlbnRTZWN0aW9uKSB7XG4gICAgICAgICAgcGFyZW50U2VjdGlvbk9mZnNldCA9IGdldFRyYW5zbGF0ZShwYXJlbnRTZWN0aW9uKVt0aGlzLmRpcmVjdGlvbkF4aXNdOyAvLyBXZSBnb3QgYSBwYXJlbnQgc2VjdGlvbiwgc3RvcmUgaXQncyBjdXJyZW50IG9mZnNldCB0byByZW1vdmUgaXQgbGF0ZXJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZiBubyBwYXJlbnQgc2VjdGlvbiBpcyBmb3VuZCB3ZSBuZWVkIHRvIHVzZSBpbnN0YW5jZSBzY3JvbGwgZGlyZWN0bHlcbiAgICAgICAgICBwYXJlbnRTZWN0aW9uT2Zmc2V0ID0gLXRoaXMuaW5zdGFuY2Uuc2Nyb2xsW3RoaXMuZGlyZWN0aW9uQXhpc107XG4gICAgICAgIH0gLy8gRmluYWwgdmFsdWUgb2Ygc2Nyb2xsIGRlc3RpbmF0aW9uIDogb2Zmc2V0VG9wICsgKG9wdGlvbmFsIG9mZnNldCBnaXZlbiBpbiBvcHRpb25zKSAtIChwYXJlbnQncyBzZWN0aW9uIHRyYW5zbGF0ZSlcblxuXG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0TGVmdCArIG9mZnNldCAtIHBhcmVudFNlY3Rpb25PZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0VG9wICsgb2Zmc2V0IC0gcGFyZW50U2VjdGlvbk9mZnNldDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2Zmc2V0ID0gdGFyZ2V0ICsgb2Zmc2V0O1xuICAgICAgfSAvLyBBY3R1YWwgc2Nyb2xsdG9cbiAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAvLyBTZXR1cFxuXG5cbiAgICAgIHZhciBzY3JvbGxTdGFydCA9IHBhcnNlRmxvYXQodGhpcy5pbnN0YW5jZS5kZWx0YVt0aGlzLmRpcmVjdGlvbkF4aXNdKTtcbiAgICAgIHZhciBzY3JvbGxUYXJnZXQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihvZmZzZXQsIHRoaXMuaW5zdGFuY2UubGltaXRbdGhpcy5kaXJlY3Rpb25BeGlzXSkpOyAvLyBNYWtlIHN1cmUgb3VyIHRhcmdldCBpcyBpbiB0aGUgc2Nyb2xsIGJvdW5kYXJpZXNcblxuICAgICAgdmFyIHNjcm9sbERpZmYgPSBzY3JvbGxUYXJnZXQgLSBzY3JvbGxTdGFydDtcblxuICAgICAgdmFyIHJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcihwKSB7XG4gICAgICAgIGlmIChkaXNhYmxlTGVycCkge1xuICAgICAgICAgIGlmIChfdGhpczkuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIF90aGlzOS5zZXRTY3JvbGwoc2Nyb2xsU3RhcnQgKyBzY3JvbGxEaWZmICogcCwgX3RoaXM5Lmluc3RhbmNlLmRlbHRhLnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpczkuc2V0U2Nyb2xsKF90aGlzOS5pbnN0YW5jZS5kZWx0YS54LCBzY3JvbGxTdGFydCArIHNjcm9sbERpZmYgKiBwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXM5Lmluc3RhbmNlLmRlbHRhW190aGlzOS5kaXJlY3Rpb25BeGlzXSA9IHNjcm9sbFN0YXJ0ICsgc2Nyb2xsRGlmZiAqIHA7XG4gICAgICAgIH1cbiAgICAgIH07IC8vIFByZXBhcmUgdGhlIHNjcm9sbFxuXG5cbiAgICAgIHRoaXMuYW5pbWF0aW5nU2Nyb2xsID0gdHJ1ZTsgLy8gVGhpcyBib29sZWFuIGFsbG93cyB0byBwcmV2ZW50IGBjaGVja1Njcm9sbCgpYCBmcm9tIGNhbGxpbmcgYHN0b3BTY3JvbGxpbmdgIHdoZW4gdGhlIGFuaW1hdGlvbiBpcyBzbG93IChpLmUuIGF0IHRoZSBiZWdpbm5pbmcgb2YgYW4gRWFzZUluKVxuXG4gICAgICB0aGlzLnN0b3BTY3JvbGxpbmcoKTsgLy8gU3RvcCBhbnkgbW92ZW1lbnQsIGFsbG93cyB0byBraWxsIGFueSBvdGhlciBgc2Nyb2xsVG9gIHN0aWxsIGhhcHBlbmluZ1xuXG4gICAgICB0aGlzLnN0YXJ0U2Nyb2xsaW5nKCk7IC8vIFJlc3RhcnQgdGhlIHNjcm9sbFxuICAgICAgLy8gU3RhcnQgdGhlIGFuaW1hdGlvbiBsb29wXG5cbiAgICAgIHZhciBzdGFydCA9IERhdGUubm93KCk7XG5cbiAgICAgIHZhciBsb29wID0gZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgdmFyIHAgPSAoRGF0ZS5ub3coKSAtIHN0YXJ0KSAvIGR1cmF0aW9uOyAvLyBBbmltYXRpb24gcHJvZ3Jlc3NcblxuICAgICAgICBpZiAocCA+IDEpIHtcbiAgICAgICAgICAvLyBBbmltYXRpb24gZW5kc1xuICAgICAgICAgIHJlbmRlcigxKTtcbiAgICAgICAgICBfdGhpczkuYW5pbWF0aW5nU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgaWYgKGR1cmF0aW9uID09IDApIF90aGlzOS51cGRhdGUoKTtcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXM5LnNjcm9sbFRvUmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICAgIHJlbmRlcihlYXNpbmcocCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBsb29wKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB0aGlzLnNldFNjcm9sbExpbWl0KCk7XG4gICAgICB0aGlzLmFkZFNlY3Rpb25zKCk7XG4gICAgICB0aGlzLmFkZEVsZW1lbnRzKCk7XG4gICAgICB0aGlzLmRldGVjdEVsZW1lbnRzKCk7XG4gICAgICB0aGlzLnVwZGF0ZVNjcm9sbCgpO1xuICAgICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50cyh0cnVlKTtcbiAgICAgIHRoaXMucmVpbml0U2Nyb2xsQmFyKCk7XG4gICAgICB0aGlzLmNoZWNrU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdGFydFNjcm9sbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydFNjcm9sbCgpIHtcbiAgICAgIHRoaXMuc3RvcCA9IGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdG9wU2Nyb2xsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3BTY3JvbGwoKSB7XG4gICAgICB0aGlzLnN0b3AgPSB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZXRTY3JvbGxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0U2Nyb2xsKHgsIHkpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7fSwgdGhpcy5pbnN0YW5jZSksIHt9LCB7XG4gICAgICAgIHNjcm9sbDoge1xuICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgeTogeVxuICAgICAgICB9LFxuICAgICAgICBkZWx0YToge1xuICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgeTogeVxuICAgICAgICB9LFxuICAgICAgICBzcGVlZDogMFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlc3Ryb3lcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIF9nZXQoX2dldFByb3RvdHlwZU9mKF9kZWZhdWx0LnByb3RvdHlwZSksIFwiZGVzdHJveVwiLCB0aGlzKS5jYWxsKHRoaXMpO1xuXG4gICAgICB0aGlzLnN0b3BTY3JvbGxpbmcoKTtcbiAgICAgIHRoaXMuaHRtbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc21vb3RoQ2xhc3MpO1xuICAgICAgdGhpcy52cy5kZXN0cm95KCk7XG4gICAgICB0aGlzLmRlc3Ryb3lTY3JvbGxCYXIoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5jaGVja0tleSwgZmFsc2UpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBfZGVmYXVsdDtcbn0oX2RlZmF1bHQpO1xuXG52YXIgU21vb3RoID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU21vb3RoKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTbW9vdGgpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uczsgLy8gT3ZlcnJpZGUgZGVmYXVsdCBvcHRpb25zIHdpdGggZ2l2ZW4gb25lc1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5zbWFydHBob25lID0gZGVmYXVsdHMuc21hcnRwaG9uZTtcbiAgICBpZiAob3B0aW9ucy5zbWFydHBob25lKSBPYmplY3QuYXNzaWduKHRoaXMuc21hcnRwaG9uZSwgb3B0aW9ucy5zbWFydHBob25lKTtcbiAgICB0aGlzLnRhYmxldCA9IGRlZmF1bHRzLnRhYmxldDtcbiAgICBpZiAob3B0aW9ucy50YWJsZXQpIE9iamVjdC5hc3NpZ24odGhpcy50YWJsZXQsIG9wdGlvbnMudGFibGV0KTtcbiAgICBpZiAoIXRoaXMuc21vb3RoICYmIHRoaXMuZGlyZWN0aW9uID09ICdob3Jpem9udGFsJykgY29uc29sZS53YXJuKCfwn5qoIGBzbW9vdGg6ZmFsc2VgICYgYGhvcml6b250YWxgIGRpcmVjdGlvbiBhcmUgbm90IHlldCBjb21wYXRpYmxlJyk7XG4gICAgaWYgKCF0aGlzLnRhYmxldC5zbW9vdGggJiYgdGhpcy50YWJsZXQuZGlyZWN0aW9uID09ICdob3Jpem9udGFsJykgY29uc29sZS53YXJuKCfwn5qoIGBzbW9vdGg6ZmFsc2VgICYgYGhvcml6b250YWxgIGRpcmVjdGlvbiBhcmUgbm90IHlldCBjb21wYXRpYmxlICh0YWJsZXQpJyk7XG4gICAgaWYgKCF0aGlzLnNtYXJ0cGhvbmUuc21vb3RoICYmIHRoaXMuc21hcnRwaG9uZS5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnKSBjb25zb2xlLndhcm4oJ/CfmqggYHNtb290aDpmYWxzZWAgJiBgaG9yaXpvbnRhbGAgZGlyZWN0aW9uIGFyZSBub3QgeWV0IGNvbXBhdGlibGUgKHNtYXJ0cGhvbmUpJyk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU21vb3RoLCBbe1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuaXNNb2JpbGUgPSAvQW5kcm9pZHxpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgbmF2aWdhdG9yLnBsYXRmb3JtID09PSAnTWFjSW50ZWwnICYmIG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDEgfHwgd2luZG93LmlubmVyV2lkdGggPCB0aGlzLnRhYmxldC5icmVha3BvaW50O1xuICAgICAgdGhpcy5vcHRpb25zLmlzVGFibGV0ID0gdGhpcy5vcHRpb25zLmlzTW9iaWxlICYmIHdpbmRvdy5pbm5lcldpZHRoID49IHRoaXMudGFibGV0LmJyZWFrcG9pbnQ7XG5cbiAgICAgIGlmICh0aGlzLnNtb290aCAmJiAhdGhpcy5vcHRpb25zLmlzTW9iaWxlIHx8IHRoaXMudGFibGV0LnNtb290aCAmJiB0aGlzLm9wdGlvbnMuaXNUYWJsZXQgfHwgdGhpcy5zbWFydHBob25lLnNtb290aCAmJiB0aGlzLm9wdGlvbnMuaXNNb2JpbGUgJiYgIXRoaXMub3B0aW9ucy5pc1RhYmxldCkge1xuICAgICAgICB0aGlzLnNjcm9sbCA9IG5ldyBfZGVmYXVsdCQyKHRoaXMub3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNjcm9sbCA9IG5ldyBfZGVmYXVsdCQxKHRoaXMub3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2Nyb2xsLmluaXQoKTtcblxuICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgaGFzaCB3aXRob3V0IHRoZSAnIycgYW5kIGZpbmQgdGhlIG1hdGNoaW5nIGVsZW1lbnRcbiAgICAgICAgdmFyIGlkID0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSwgd2luZG93LmxvY2F0aW9uLmhhc2gubGVuZ3RoKTtcbiAgICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTsgLy8gSWYgZm91bmQsIHNjcm9sbCB0byB0aGUgZWxlbWVudFxuXG4gICAgICAgIGlmICh0YXJnZXQpIHRoaXMuc2Nyb2xsLnNjcm9sbFRvKHRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB0aGlzLnNjcm9sbC51cGRhdGUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3RhcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICB0aGlzLnNjcm9sbC5zdGFydFNjcm9sbCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdG9wXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLnNjcm9sbC5zdG9wU2Nyb2xsKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNjcm9sbFRvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNjcm9sbFRvKHRhcmdldCwgb3B0aW9ucykge1xuICAgICAgdGhpcy5zY3JvbGwuc2Nyb2xsVG8odGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0U2Nyb2xsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFNjcm9sbCh4LCB5KSB7XG4gICAgICB0aGlzLnNjcm9sbC5zZXRTY3JvbGwoeCwgeSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50LCBmdW5jKSB7XG4gICAgICB0aGlzLnNjcm9sbC5zZXRFdmVudHMoZXZlbnQsIGZ1bmMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvZmZcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKGV2ZW50LCBmdW5jKSB7XG4gICAgICB0aGlzLnNjcm9sbC51bnNldEV2ZW50cyhldmVudCwgZnVuYyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlc3Ryb3lcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuc2Nyb2xsLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU21vb3RoO1xufSgpO1xuXG52YXIgTmF0aXZlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTmF0aXZlKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOYXRpdmUpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uczsgLy8gT3ZlcnJpZGUgZGVmYXVsdCBvcHRpb25zIHdpdGggZ2l2ZW4gb25lc1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5zbWFydHBob25lID0gZGVmYXVsdHMuc21hcnRwaG9uZTtcbiAgICBpZiAob3B0aW9ucy5zbWFydHBob25lKSBPYmplY3QuYXNzaWduKHRoaXMuc21hcnRwaG9uZSwgb3B0aW9ucy5zbWFydHBob25lKTtcbiAgICB0aGlzLnRhYmxldCA9IGRlZmF1bHRzLnRhYmxldDtcbiAgICBpZiAob3B0aW9ucy50YWJsZXQpIE9iamVjdC5hc3NpZ24odGhpcy50YWJsZXQsIG9wdGlvbnMudGFibGV0KTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhOYXRpdmUsIFt7XG4gICAga2V5OiBcImluaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIHRoaXMuc2Nyb2xsID0gbmV3IF9kZWZhdWx0JDEodGhpcy5vcHRpb25zKTtcbiAgICAgIHRoaXMuc2Nyb2xsLmluaXQoKTtcblxuICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgaGFzaCB3aXRob3V0IHRoZSAnIycgYW5kIGZpbmQgdGhlIG1hdGNoaW5nIGVsZW1lbnRcbiAgICAgICAgdmFyIGlkID0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSwgd2luZG93LmxvY2F0aW9uLmhhc2gubGVuZ3RoKTtcbiAgICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTsgLy8gSWYgZm91bmQsIHNjcm9sbCB0byB0aGUgZWxlbWVudFxuXG4gICAgICAgIGlmICh0YXJnZXQpIHRoaXMuc2Nyb2xsLnNjcm9sbFRvKHRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB0aGlzLnNjcm9sbC51cGRhdGUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3RhcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICB0aGlzLnNjcm9sbC5zdGFydFNjcm9sbCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdG9wXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLnNjcm9sbC5zdG9wU2Nyb2xsKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNjcm9sbFRvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNjcm9sbFRvKHRhcmdldCwgb3B0aW9ucykge1xuICAgICAgdGhpcy5zY3JvbGwuc2Nyb2xsVG8odGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0U2Nyb2xsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFNjcm9sbCh4LCB5KSB7XG4gICAgICB0aGlzLnNjcm9sbC5zZXRTY3JvbGwoeCwgeSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50LCBmdW5jKSB7XG4gICAgICB0aGlzLnNjcm9sbC5zZXRFdmVudHMoZXZlbnQsIGZ1bmMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvZmZcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKGV2ZW50LCBmdW5jKSB7XG4gICAgICB0aGlzLnNjcm9sbC51bnNldEV2ZW50cyhldmVudCwgZnVuYyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlc3Ryb3lcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuc2Nyb2xsLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTmF0aXZlO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBTbW9vdGg7XG5leHBvcnQgeyBOYXRpdmUsIFNtb290aCB9O1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJ1xyXG5pbXBvcnQgeyBtYXAsIHJhbmRvbU51bWJlciwgcmFuZEl0ZW0gfSBmcm9tICcuL3V0aWxzJ1xyXG5pbXBvcnQgeyBmbG9hdGluZyB9IGZyb20gJy4vYW5pbXMnXHJcbmltcG9ydCB7IERyYWdnYWJsZUJveCB9IGZyb20gJy4vZHJhZ2dhYmxlQm94J1xyXG5pbXBvcnQgeyBBdWRpb1BsYXllciB9IGZyb20gJy4vYXVkaW9QbGF5ZXInXHJcbi8vIGltcG9ydCB7IGdzYXAgfSBmcm9tICdnc2FwJ1xyXG4vLyBpbXBvcnQgeyBTY3JvbGxUcmlnZ2VyIH0gZnJvbSAnZ3NhcC9TY3JvbGxUcmlnZ2VyJ1xyXG5pbXBvcnQgTG9jb21vdGl2ZVNjcm9sbCBmcm9tICdsb2NvbW90aXZlLXNjcm9sbCdcclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG5jb25zdCBwbGF5ZXIgPSBuZXcgQXVkaW9QbGF5ZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcicpKVxyXG5cclxuY29uc3QgbHNjcm9sbCA9IG5ldyBMb2NvbW90aXZlU2Nyb2xsKHtcclxuICBlbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc2Nyb2xsLWNvbnRhaW5lcl0nKSxcclxuICBzbW9vdGg6IHRydWUsXHJcbiAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXHJcbiAgbXVsdGlwbGllcjogMSxcclxuICByZXBlYXQ6IHRydWUsXHJcbn0pXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZHJhZ2dhYmxlLWJveCcsIERyYWdnYWJsZUJveCwgeyBleHRlbmRzOiAnZGl2JyB9KVxyXG5cclxuY29uc3QgZWxlbXMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZsb2F0aW5nJyldXHJcbmNvbnN0IHJvdGF0aW9uc0FyciA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGVsZW1zLmxlbmd0aCB9LCAoKSA9PlxyXG4gIHJhbmRvbU51bWJlcigtMzAsIDMwKVxyXG4pXHJcbmNvbnN0IHRyYW5zbGF0aW9uQXJyID0gQXJyYXkuZnJvbShcclxuICB7IGxlbmd0aDogZWxlbXMubGVuZ3RoIH0sXHJcbiAgKCkgPT4gcmFuZG9tTnVtYmVyKDI1LCA1MCkgKiByYW5kSXRlbShbLTEsIDFdKVxyXG4pXHJcblxyXG5lbGVtcy5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gIGVsLnN0eWxlLnNldFByb3BlcnR5KFxyXG4gICAgJ3RyYW5zZm9ybScsXHJcbiAgICBgdHJhbnNsYXRlWSgkey10cmFuc2xhdGlvbkFycltpXX0lKSByb3RhdGUoJHstcm90YXRpb25zQXJyW2ldfWRlZylgXHJcbiAgKVxyXG59KVxyXG5cclxuY29uc3Qgc2Nyb2xsID0geyBjYWNoZTogMCwgY3VycmVudDogMCB9XHJcbmxzY3JvbGwub24oJ3Njcm9sbCcsIChvYmopID0+IHtcclxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmouY3VycmVudEVsZW1lbnRzKSkge1xyXG4gICAgY29uc3QgZWwgPSBvYmouY3VycmVudEVsZW1lbnRzW2tleV0uZWxcclxuICAgIGNvbnN0IGlkeCA9IGVsZW1zLmluZGV4T2YoZWwpXHJcbiAgICBpZiAob2JqLmN1cnJlbnRFbGVtZW50c1trZXldLmVsLmNsYXNzTGlzdC5jb250YWlucygnZmxvYXRpbmcnKSkge1xyXG4gICAgICBmbG9hdGluZyhcclxuICAgICAgICBvYmouY3VycmVudEVsZW1lbnRzW2tleV0sXHJcbiAgICAgICAgcm90YXRpb25zQXJyW2lkeF0sXHJcbiAgICAgICAgdHJhbnNsYXRpb25BcnJbaWR4XSxcclxuICAgICAgICBsc2Nyb2xsLmRpcmVjdGlvblxyXG4gICAgICApXHJcbiAgICB9IGVsc2UgaWYgKG9iai5jdXJyZW50RWxlbWVudHNba2V5XS5lbC5jbGFzc0xpc3QuY29udGFpbnMoJ3RhcGlzX19jYXJkJykpIHtcclxuICAgICAgc2Nyb2xsLmN1cnJlbnQgPSBvYmouc2Nyb2xsLnggPiAwID8gb2JqLnNjcm9sbC54IDogb2JqLnNjcm9sbC55XHJcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gc2Nyb2xsLmN1cnJlbnQgLSBzY3JvbGwuY2FjaGVcclxuICAgICAgc2Nyb2xsLmNhY2hlID0gc2Nyb2xsLmN1cnJlbnRcclxuICAgICAgY29uc3QgdHVyYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub2lzZSBmZURpc3BsYWNlbWVudE1hcCcpXHJcbiAgICAgIGNvbnN0IFNjID0gbWFwKGRpc3RhbmNlLCAtNTAsIDUwLCAtMTAwLCAxMDApXHJcbiAgICAgIHR1cmIuc2V0QXR0cmlidXRlKCdzY2FsZScsIFNjKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbmxzY3JvbGwudXBkYXRlKClcclxuXHJcbmNvbnN0IHZpZ25ldHRlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY3VlaWxfX2xpbmsnKSlcclxuXHJcbnZpZ25ldHRlcy5mb3JFYWNoKCh2aWduKSA9PiB7XHJcbiAgdmlnbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQpXHJcbiAgICBjb25zdCBsaW5rID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rJylcclxuICAgIGxzY3JvbGwuc2Nyb2xsVG8obGluaylcclxuICB9KVxyXG59KVxyXG4iXSwibmFtZXMiOlsibWFwIiwiZmxvYXRpbmciLCJzY3JvbGxFbCIsInJvdCIsInRyYW5zIiwiZGlyZWN0aW9uIiwicHJvZ3Jlc3MiLCJyb3RJbml0IiwicGFyc2VJbnQiLCJlbCIsImdldEF0dHJpYnV0ZSIsInJvdGF0aW9uVmFsIiwidHJhbnNsYXRpb25WYWwiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiQXVkaW9QbGF5ZXIiLCJlbGVtZW50IiwicGxheUJ0biIsInF1ZXJ5U2VsZWN0b3IiLCJwbGF5SWNvbiIsInBhdXNlSWNvbiIsIm5leHRCdG4iLCJwcmV2QnRuIiwidGl0bGUiLCJkdXJlZSIsInByb2dyZXNzQmFyIiwicHJvZ3Jlc3NCYXJDb250YWluZXIiLCJhdWRpb3MiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGFuZGxlUGxheWVyIiwiaWR4IiwiY3VycmVudEF1ZGlvIiwidGV4dENvbnRlbnQiLCJwbGF5IiwiYmluZCIsInBhdXNlIiwibmV4dCIsInByZXYiLCJzaG93UGxheWVyIiwiaGlkZVBsYXllciIsInRpbWVVcGRhdGUiLCJzZXRUaW1lIiwicmVzZXRUaW1lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjdXJyZW50VGltZSIsImxlbmd0aCIsImRpc3BsYXkiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidCIsImNhbGN1bGF0ZVRpbWUiLCJ0dCIsImR1cmF0aW9uIiwid2lkdGgiLCJzZWNzIiwibWludXRlcyIsIk1hdGgiLCJmbG9vciIsInNlY29uZHMiLCJyZXR1cm5lZFNlY29uZHMiLCJlIiwieCIsImNsaWVudFgiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3IiwicHJldmVudERlZmF1bHQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkb2N1bWVudCIsInRhcmdldEVsZW1lbnQiLCJ0YXJnZXQiLCJwYXJlbnROb2RlIiwicmVtb3ZlIiwiY2xlYXJUaW1lb3V0Iiwid2luZG93Iiwic2V0VGltZW91dCIsIkRyYWdnYWJsZUJveCIsImNvbnRhaW5lciIsImJvZHkiLCJoYW5kbGUiLCJjbG9zZUJ0biIsInVzZXJTZWxlY3QiLCJ5IiwiZHgiLCJkeSIsInRyYW5zbGF0ZVgiLCJ0cmFuc2xhdGVZIiwiZ2V0Q3VycmVudFJvdGF0aW9uIiwiY3Vyc29yIiwic2hhZG93IiwiYXR0YWNoU2hhZG93IiwibW9kZSIsImlubmVySFRNTCIsInN0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInRtIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInZhbHVlcyIsInNwbGl0IiwiYW5nbGUiLCJyb3VuZCIsImF0YW4yIiwiUEkiLCJvbkRyYWdTdGFydCIsInBhc3NpdmUiLCJmb3JFYWNoIiwiYnRuIiwiekluZGV4IiwiZmluZE1heFppbmRleCIsImNvbnNvbGUiLCJsb2ciLCJvbkRyYWciLCJvbkRyYWdFbmQiLCJzY3JlZW5YIiwidG91Y2hlcyIsInBhZ2VYIiwic2NyZWVuWSIsImNsaWVudFkiLCJwYWdlWSIsIm1heCIsImJveCIsImIiLCJjb2xsaWRlIiwidHJhbnNmb3JtIiwicmlnaHQiLCJ0b3AiLCJsZWZ0IiwiYm90dG9tIiwiSFRNTERpdkVsZW1lbnQiLCJhIiwiYyIsImQiLCJjbGFtcCIsIm51bSIsIm1pbiIsInJhbmRvbU51bWJlciIsInJhbmRvbSIsInJhbmRJdGVtIiwiYXJyIiwiTG9jb21vdGl2ZVNjcm9sbCIsInBsYXllciIsImxzY3JvbGwiLCJzbW9vdGgiLCJtdWx0aXBsaWVyIiwicmVwZWF0IiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJleHRlbmRzIiwiZWxlbXMiLCJyb3RhdGlvbnNBcnIiLCJ0cmFuc2xhdGlvbkFyciIsImkiLCJzY3JvbGwiLCJjYWNoZSIsImN1cnJlbnQiLCJvbiIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJjdXJyZW50RWxlbWVudHMiLCJrZXkiLCJpbmRleE9mIiwiY29udGFpbnMiLCJkaXN0YW5jZSIsInR1cmIiLCJTYyIsInNldEF0dHJpYnV0ZSIsInVwZGF0ZSIsInZpZ25ldHRlcyIsInZpZ24iLCJjdXJyZW50VGFyZ2V0IiwibGluayIsInNjcm9sbFRvIl0sInNvdXJjZVJvb3QiOiIifQ==