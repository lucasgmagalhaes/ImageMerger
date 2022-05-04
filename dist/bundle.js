/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileList": () => (/* binding */ fileList)
/* harmony export */ });
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable @typescript-eslint/no-namespace */
var fileList;

(function (_fileList) {
  function filter(files, fn) {
    var filesToReturn = [];

    for (var i = 0; i < files.length; i++) {
      var _file = files[i];

      if (fn(_file)) {
        filesToReturn.push(_file);
      }
    }

    return filesToReturn;
  }

  _fileList.filter = filter;

  function map(files, fn) {
    var filesToReturn = [];

    for (var i = 0; i < files.length; i++) {
      var _file2 = files[i];
      filesToReturn.push(fn(_file2));
    }

    return filesToReturn;
  }

  _fileList.map = map;
})(fileList || (fileList = {}));

/***/ }),

/***/ "./node_modules/merge-images/dist/index.es2015.js":
/*!********************************************************!*\
  !*** ./node_modules/merge-images/dist/index.es2015.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Defaults
var defaultOptions = {
	format: 'image/png',
	quality: 0.92,
	width: undefined,
	height: undefined,
	Canvas: undefined,
	crossOrigin: undefined
};

// Return Promise
var mergeImages = function (sources, options) {
	if ( sources === void 0 ) sources = [];
	if ( options === void 0 ) options = {};

	return new Promise(function (resolve) {
	options = Object.assign({}, defaultOptions, options);

	// Setup browser/Node.js specific variables
	var canvas = options.Canvas ? new options.Canvas() : window.document.createElement('canvas');
	var Image = options.Image || window.Image;

	// Load sources
	var images = sources.map(function (source) { return new Promise(function (resolve, reject) {
		// Convert sources to objects
		if (source.constructor.name !== 'Object') {
			source = { src: source };
		}

		// Resolve source and img when loaded
		var img = new Image();
		img.crossOrigin = options.crossOrigin;
		img.onerror = function () { return reject(new Error('Couldn\'t load image')); };
		img.onload = function () { return resolve(Object.assign({}, source, { img: img })); };
		img.src = source.src;
	}); });

	// Get canvas context
	var ctx = canvas.getContext('2d');

	// When sources have loaded
	resolve(Promise.all(images)
		.then(function (images) {
			// Set canvas dimensions
			var getSize = function (dim) { return options[dim] || Math.max.apply(Math, images.map(function (image) { return image.img[dim]; })); };
			canvas.width = getSize('width');
			canvas.height = getSize('height');

			// Draw images to canvas
			images.forEach(function (image) {
				ctx.globalAlpha = image.opacity ? image.opacity : 1;
				return ctx.drawImage(image.img, image.x || 0, image.y || 0);
			});

			if (options.Canvas && options.format === 'image/jpeg') {
				// Resolve data URI for node-canvas jpeg async
				return new Promise(function (resolve, reject) {
					canvas.toDataURL(options.format, {
						quality: options.quality,
						progressive: false
					}, function (err, jpeg) {
						if (err) {
							reject(err);
							return;
						}
						resolve(jpeg);
					});
				});
			}

			// Resolve all other data URIs sync
			return canvas.toDataURL(options.format, options.quality);
		}));
});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeImages);
//# sourceMappingURL=index.es2015.js.map


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
/******/ 			// no module.id needed
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
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_generate": () => (/* binding */ _generate)
/* harmony export */ });
/* harmony import */ var merge_images__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! merge-images */ "./node_modules/merge-images/dist/index.es2015.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable prefer-spread */


var imgs = new Array();
var folders = new Array();

function init() {
  var filePicker = document.getElementById("filepicker");
  filePicker === null || filePicker === void 0 ? void 0 : filePicker.addEventListener("change", function (event) {
    var _event$target;

    var output = document.getElementById("listing");
    var files = (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.files;

    if (!files) {
      return;
    }

    console.log(files);
    /**
     * First I get all folders
     * As path will be like "img/folder/img.png" and "img/folder2/img.png"
     * I only need the second element of the array.
     */

    var foldersName = _utils__WEBPACK_IMPORTED_MODULE_1__.fileList.map(files, function (file) {
      return getFolderName(file);
    });
    foldersName.forEach(function (f) {
      return folders.push({
        folderName: f,
        files: []
      });
    });
    var urls = [];

    var _loop = function _loop(i) {
      var file = files[i];
      var folderName = getFolderName(file);
      var folder = folders.find(function (f) {
        return f.folderName == folderName;
      });

      if (!folder) {
        throw new Error("Folder not found for " + folderName);
      }

      var url = URL.createObjectURL(file);
      urls.push(url);
      folder.files.push(url);
    };

    for (var i = 0; i < files.length; i++) {
      _loop(i);
    }

    addLoadedFiles(urls);
  }, false);
}

function getFolderName(file) {
  return file.webkitRelativePath.split("/")[1];
}

function addLoadedFiles(urls) {
  var div = getLoadFilesContainer();
  div.append.apply(div, _toConsumableArray(urls.map(function (u) {
    return createImg(u);
  })));
}

function createImg(src) {
  var img = document.createElement("img");
  img.classList.add("loaded-img");
  img.src = src;
  return img;
}

function getLoadFilesContainer() {
  return document.querySelector(".loaded-img-container");
}

function getGeneratedFilesContainer() {
  return document.querySelector(".generated-img-container");
}

function getFile(folderIndex, fileIndex) {
  return folders[folderIndex].files[fileIndex];
}

window.generate = function () {
  _generate(0); // const div = getGeneratedFilesContainer();
  // const b64 = await mergeImages(imgs);
  // const img = createImg(b64);
  // div.append(img);

};

function _generate(folderIndex) {
  for (var _len = arguments.length, gotFiles = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    gotFiles[_key - 1] = arguments[_key];
  }

  if (folderIndex > folders.length - 1 && gotFiles.length == folders.length) {
    (0,merge_images__WEBPACK_IMPORTED_MODULE_0__["default"])(gotFiles).then(console.log);
    return;
  }

  for (var index = 0; index < folders[folderIndex].files.length; index++) {
    _generate(folderIndex + 1, folders[folderIndex].files[index]);
  }
}

function getAmountOfIterations() {
  return folders.map(function (f) {
    return f.files.length;
  }).reduce(function (a, b) {
    return a * b;
  });
}

init();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map