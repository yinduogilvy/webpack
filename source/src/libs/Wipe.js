(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Wipe"] = factory();
	else
		root["Wipe"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var loop = function loop() {};
var inBrowser = typeof window !== 'undefined';
var inSupportTouch = inBrowser ? !!("ontouchend" in document) : false;
var events = {
    "start": inSupportTouch ? "touchstart" : "mousedown",
    "move": inSupportTouch ? "touchmove" : "mousemove",
    "end": inSupportTouch ? "touchend" : "mouseup"
};

var _ref = inBrowser ? window : { innerWidth: 640, innerHeight: 1136 },
    STAGE_WIDTH = _ref.innerWidth,
    STAGE_HEIGHT = _ref.innerHeight;

var Wipe = function () {
    function Wipe() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$canvas = _ref2.canvas,
            canvas = _ref2$canvas === undefined ? null : _ref2$canvas,
            _ref2$ratio = _ref2.ratio,
            ratio = _ref2$ratio === undefined ? .5 : _ref2$ratio,
            _ref2$radius = _ref2.radius,
            radius = _ref2$radius === undefined ? 10 : _ref2$radius,
            _ref2$width = _ref2.width,
            width = _ref2$width === undefined ? 0 : _ref2$width,
            _ref2$height = _ref2.height,
            height = _ref2$height === undefined ? 0 : _ref2$height,
            _ref2$cb = _ref2.cb,
            cb = _ref2$cb === undefined ? loop : _ref2$cb;

        _classCallCheck(this, Wipe);

        if (!inBrowser) {
            console.error("this must be in brower");
        }
        this.$canvas = canvas || document.createElement("canvas");
        this.$context = this.$canvas.getContext("2d");
        this.$width = width || STAGE_WIDTH;
        this.$height = height || STAGE_HEIGHT;
        this.$canvas.width = this.$width;
        this.$canvas.height = this.$height;
        this.$ratio = 100 * ratio;
        this.$radius = radius;
        this.$cb = cb;
        this.$onTouchStart = this.$onTouchStart.bind(this);
        this.$onTouchMove = this.$onTouchMove.bind(this);
        this.$onTouchEnd = this.$onTouchEnd.bind(this);
        this.$canvas.addEventListener(events['start'], this.$onTouchStart, !1);
        this.$prevPos = null;
    }

    _createClass(Wipe, [{
        key: "addImage",
        value: function addImage(img) {
            if (!img || !img instanceof HTMLImageElement) {
                console.error("img must be needed");
            }
            this.$context.drawImage(img, 0, 0, this.$width, this.$height);
        }
    }, {
        key: "$onTouchStart",
        value: function $onTouchStart(ev) {
            this.$prevPos = null;
            this.$canvas.addEventListener(events['move'], this.$onTouchMove, !1);
            this.$canvas.addEventListener(events['end'], this.$onTouchEnd, !1);
            this.$ondraw(ev);
        }
    }, {
        key: "$onTouchMove",
        value: function $onTouchMove(ev) {
            this.$ondraw(ev);
        }
    }, {
        key: "$onTouchEnd",
        value: function $onTouchEnd(ev) {
            this.$canvas.removeEventListener(events['move'], this.$onTouchMove, !1);
            this.$canvas.removeEventListener(events['end'], this.$onTouchEnd, !1);
        }
    }, {
        key: "$ondraw",
        value: function $ondraw(ev) {
            var _ref3 = inSupportTouch ? ev.touches[0] : ev,
                pageX = _ref3.pageX,
                pageY = _ref3.pageY,
                c = this.$context,
                $prevPos = this.$prevPos,
                $radius = this.$radius;

            c.save();
            c.globalCompositeOperation = "destination-out";
            c.beginPath();
            c.arc(pageX, pageY, $radius, 0, 2 * Math.PI, true);
            c.fill();
            c.closePath();
            if ($prevPos) {
                c.lineWidth = 2 * $radius;
                c.beginPath();
                c.moveTo($prevPos.pageX, $prevPos.pageY);
                c.lineTo(pageX, pageY);
                c.closePath();
                c.stroke();
            }
            this.$prevPos = { pageX: pageX, pageY: pageY };
            c.restore();
            this.$checkRatio();
        }
    }, {
        key: "$checkRatio",
        value: function $checkRatio() {
            var $width = this.$width,
                $height = this.$height,
                $context = this.$context,
                $ratio = this.$ratio,
                $canvas = this.$canvas,
                $cb = this.$cb,
                _$context$getImageDat = $context.getImageData(0, 0, $width, $height),
                imageData = _$context$getImageDat.data,
                $canvasImageData = $width * $height;

            for (var i = 0, len = imageData.length, num = 0; i < len; i += 4) {
                !imageData[i + 3] && num++;
            }
            var percent = ~~(num * 100 / $canvasImageData);
            if (percent >= $ratio) {
                $context.clearRect(0, 0, $width, $height);
                this.$remove();
                $cb();
            }
        }
    }, {
        key: "$remove",
        value: function $remove() {
            var $canvas = this.$canvas;

            $canvas.removeEventListener(events['start'], this.$onTouchStart, !1);
            $canvas.removeEventListener(events['move'], this.$onTouchMove, !1);
            $canvas.removeEventListener(events['end'], this.$onTouchEnd, !1);
            var parent = $canvas.parentNode;
            parent && parent.removeChild($canvas);
        }
    }, {
        key: "el",
        get: function get() {
            return this.$canvas;
        }
    }]);

    return Wipe;
}();

module.exports = Wipe;

/***/ })
/******/ ]);
});