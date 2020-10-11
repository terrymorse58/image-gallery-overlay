var OLCarousel =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./carousel.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./CSSEditableProps.js":
/*!*****************************!*\
  !*** ./CSSEditableProps.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// editable css props for carousel modal
var CSSEditableProps = {
  headerPadding: '0.25rem 1rem',
  headerParagraphMargin: '0',
  footerPadding: '0 1rem',
  thumbnailBtnPadding: '0',
  thumbnailBtnMargin: '0 4px',

  /* must be in 'px' units */
  thumbnailImgHeight: '60px',
  thumbnailImgHoverFilter: 'brightness(90%)',
  thumbnailBorder: 'none',
  thumbnailImgSelectedBorder: '1px solid #888',
  thumbnailSelectedOpacity: '60%',
  thumbnailSelectedFilter: 'grayscale(100%) blur(1px)'
};
/* harmony default export */ __webpack_exports__["default"] = (CSSEditableProps);

/***/ }),

/***/ "./CSSTemplate.js":
/*!************************!*\
  !*** ./CSSTemplate.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// css template for carousel modal
var CSSTemplate = "\n    .wsi-overlay {\n    }\n    \n    .wsi-overlay.modal-dialog {\n      margin: 0 auto;\n    }\n\n    .wsi-overlay .modal-header {\n      padding: {{headerPadding}};\n    }\n\n    .wsi-overlay .modal-header p {\n      margin: {{headerParagraphMargin}};\n    }\n\n    .wsi-overlay .modal-footer {\n      padding: {{footerPadding}};\n    }\n\n    .wsi-overlay .div-thumbnails {\n      overflow-x: auto;\n      white-space: nowrap;\n      margin: 0;\n      padding: 8px 16px 12px 16px; /* padding must be 'px' */\n      background-color: transparent;\n      scroll-behavior: smooth;\n    }\n    \n    .wsi-overlay .div-thumbnails button {\n      padding: {{thumbnailBtnPadding}};\n      margin: {{thumbnailBtnMargin}};\n      background-color: transparent;\n      border: none;\n    }\n    \n    .wsi-overlay .div-thumbnails button:focus {\n      outline: 2px solid dodgerblue;\n      filter: brightness(80%);\n    }\n    \n    .wsi-overlay .div-thumbnails img {\n      height: {{thumbnailImgHeight}};\n      width: auto;\n      margin: 0;\n      border: {{thumbnailBorder}};\n    }\n    \n    .wsi-overlay .div-thumbnails img:hover {\n      filter: {{thumbnailImgHoverFilter}};\n    }\n\n    .wsi-overlay .div-thumbnails img.selected {\n      cursor: default;\n      border: {{thumbnailImgSelectedBorder}};\n      opacity: {{thumbnailSelectedOpacity}};\n      filter: {{thumbnailSelectedFilter}};\n    }\n    \n    .carousel-container {\n      margin: 0;\n      position: relative;\n      width: 100%;\n     }\n     .carousel-overlay-div {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-color: white;\n      opacity: 0;\n     }\n     .carousel-hero {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: auto;\n     }\n     .carousel-overlay {\n       position: absolute;\n       top: 0;\n       left: 0;\n       /* opacity: 0; */\n       width: 100%;\n       height: auto;\n     }\n     .carousel-fade-in {\n       opacity: 1;\n       transition: opacity 1s;\n     }\n";
/* harmony default export */ __webpack_exports__["default"] = (CSSTemplate);

/***/ }),

/***/ "./HTMLTemplate.js":
/*!*************************!*\
  !*** ./HTMLTemplate.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// HTML template for carousel modal - a Bootstrap modal with an image carousel
var HTMLTemplate = "\n  <div\n    id=\"carouselModal\"\n    tabindex=\"-1\"\n    class=\"modal fade\"\n    aria-modal=\"true\"\n    role=\"dialog\"\n    data-wrap=\"false\"\n  >\n    <div\n      class=\"modal-dialog modal-dialog-centered wsi-overlay\"\n      style=\"max-width: calc(-2rem + 58vh)\"\n    >\n      <div class=\"modal-content\">\n      \n        <div class=\"modal-header\">\n          <p><!-- name of product --></p>\n          <button type=\"button\"\n            data-dismiss=\"modal\"\n            aria-label=\"Close\"\n            class=\"close\"\n          >\n            <span aria-hidden=\"true\">\xD7</span>\n          </button>\n        </div> <!-- /.modal-header -->\n        \n        <div class=\"modal-body\">\n          <div\n            id=\"carousel-container\"\n            class=\"carousel-container\"\n            data-aspect-ratio=\"0.6666667\"\n            style=\"padding-bottom: 150%\"\n          >\n            <img\n              id=\"carousel-hero\"\n              class=\"carousel-hero\"\n              src=\"\"\n              alt=\"carousel hero\">\n            <!-- .carousel-overlay-div -->\n            <div\n              class=\"carousel-overlay-div\"\n              data-in-transition=\"false\"\n            >\n              <img\n                id=\"carousel-overlay\"\n                class=\"carousel-overlay\"\n                alt=\"carousel overlay\"\n                src=\"\"\n              >\n            </div> <!-- /.carousel-overlay-div -->\n          </div> <!-- /.carousel-container -->\n        </div> <!-- /.modal-body -->\n\n        <div class=\"modal-footer\">\n          <div id=\"thumbnails-viewport\" class=\"div-thumbnails\"></div>\n        </div> <!-- /.modal-footer -->\n        \n      </div> <!-- /.modal-content -->\n    </div> <!-- /.modal-dialog -->\n  </div> <!-- /.modal -->\n";
/* harmony default export */ __webpack_exports__["default"] = (HTMLTemplate);

/***/ }),

/***/ "./carousel.js":
/*!*********************!*\
  !*** ./carousel.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CSSTemplate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CSSTemplate.js */ "./CSSTemplate.js");
/* harmony import */ var _CSSEditableProps_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CSSEditableProps.js */ "./CSSEditableProps.js");
/* harmony import */ var _HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HTMLTemplate.js */ "./HTMLTemplate.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// carousel overlay modal with thumbnails




function OverlayCarousel(userEditsToCSSProps) {
  // make copies of templates
  var editableCSSProps = JSON.parse(JSON.stringify(_CSSEditableProps_js__WEBPACK_IMPORTED_MODULE_1__["default"]));
  var styleSheet = _CSSTemplate_js__WEBPACK_IMPORTED_MODULE_0__["default"].slice(0);
  var carouselModal,
      jqCarouselModal,
      modalDialog,
      modalContent,
      modalHeader,
      pHeader,
      modalBody,
      carouselContainer,
      imgHero,
      imgOverlay,
      overlayDiv,
      thumbnailsViewport,
      thumbnailImages = [],
      modalFooter; // returns true if element supports smooth scrolling

  var _hasSmoothScrolling = function _hasSmoothScrolling(el) {
    return getComputedStyle(el).scrollBehavior === 'smooth';
  }; // apply user edits to editable css props


  function _applyUserEditsToCSSProps() {
    if (typeof userEditsToCSSProps === 'undefined') {
      return;
    }

    for (var _i = 0, _Object$entries = Object.entries(userEditsToCSSProps); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          propName = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (typeof editableCSSProps[propName] === 'undefined') {
        continue;
      }

      editableCSSProps[propName] = value;
    }
  } // apply all css props to styleSheet


  function _applyCSSPropsToStyleSheet() {
    for (var _i2 = 0, _Object$entries2 = Object.entries(editableCSSProps); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          propName = _Object$entries2$_i[0],
          value = _Object$entries2$_i[1];

      var searchStr = "{{".concat(propName, "}}");
      var subStr = "".concat(value);
      styleSheet = styleSheet.replace(searchStr, subStr);
    }
  } // append HTML template to <body>


  function _appendHTMLTemplateToBody() {
    var div = document.createElement('div');
    div.id = "carousel-modal-container";
    div.innerHTML = _HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    document.body.appendChild(div);
    carouselModal = document.getElementById('carouselModal');
    jqCarouselModal = $('#carouselModal');
    modalDialog = document.querySelector('.modal-dialog');
    modalContent = document.querySelector('.modal-content');
    modalHeader = document.querySelector('.modal-header');
    pHeader = carouselModal.querySelector('.modal-header p');
    modalBody = carouselModal.querySelector('.wsi-overlay .modal-body');
    carouselContainer = document.getElementById('carousel-container');
    imgHero = document.getElementById('carousel-hero');
    imgOverlay = document.getElementById('carousel-overlay');
    overlayDiv = document.querySelector('.carousel-overlay-div');
    thumbnailsViewport = document.getElementById('thumbnails-viewport');
    modalFooter = carouselModal.querySelector('.modal-footer'); // set up the overlay fader

    overlayDiv.addEventListener('transitionend', _completeImageFade); // react to hero image changes

    imgHero.addEventListener('change', function () {
      var heroIndex = Number(imgHero.dataset.index); // set (unset) the selected class for each thumbnail image

      var thumbSelected = _updateThumbnailsSelectedClass(thumbnailImages, heroIndex); // scroll the thumbnails container


      _scrollThumbnailsViewport(thumbSelected);
    });
  } // append style sheet to <head>


  function _appendStyleSheetToHead() {
    var style = document.createElement('style');
    style.innerHTML = styleSheet;
    style.id = 'carousel-style';
    document.head.appendChild(style);
  }
  /**
   * display in hero image the selected thumbnail image
   * @param {HTMLImageElement} thumbnailImg
   * @param {boolean} animate - animate the hero image transition
   */


  function _displaySelectedImage(thumbnailImg) {
    var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    // console.log(`_displaySelectedImage(imgIndex=${thumbnailImg.dataset.index},` +
    // ` animate=${animate})`);
    // don't animate if overlay is still in transition from an
    // earlier change
    if (overlayDiv.dataset.inTransition === "true") {
      // console.log('overlay in transition, disabling fade');
      overlayDiv.dataset.inTransition = "false";
      overlayDiv.classList.remove('carousel-fade-in');
      animate = false;
    } // dispatch 'change' event to hero image, which will update thumbnails


    imgHero.dataset.index = thumbnailImg.dataset.index;
    var changeEvt = new Event('change');
    imgHero.dispatchEvent(changeEvt);
    imgOverlay.src = thumbnailImg.src;
    imgOverlay.dataset.index = thumbnailImg.dataset.index;

    if (animate) {
      // fade in overlay
      overlayDiv.dataset.inTransition = "true";
      overlayDiv.classList.add('carousel-fade-in');
    } else {
      // just clean up without animation
      _completeImageFade();
    }
  } // clean up display elements when image fade transition completes


  function _completeImageFade() {
    // console.log('_completeImageFade()');
    overlayDiv.dataset.inTransition = "false"; // copy overlay image to hero image

    imgHero.src = imgOverlay.src;
    imgHero.dataset.index = imgOverlay.dataset.index; // clean up overlay (delayed to prevent UI flash)

    setTimeout(function () {
      imgOverlay.src = "";
      imgOverlay.dataset.index = null;
      overlayDiv.classList.remove('carousel-fade-in');
    }, 200);
  } // enter key press over thumbnail button emit thumbnail image click


  function _listenForEnterKeyOverButton() {
    thumbnailsViewport.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') {
        return;
      }

      var elem = e.target;

      if (elem.tagName !== 'BUTTON') {
        return;
      }

      var btnImg = elem.firstChild;

      if (!btnImg || btnImg.tagName !== 'IMG') {
        return;
      }

      btnImg.click();
    });
  } // respond to clicks on thumbnail images


  function _listenForThumbnailImageClicks() {
    thumbnailsViewport.addEventListener('click', function (evt) {
      var elClicked = evt.target;

      var isThumbnailImg = function isThumbnailImg(el) {
        return el.tagName === 'IMG' && typeof el.dataset.index !== 'undefined';
      };

      if (isThumbnailImg(elClicked) === false) {
        return;
      }

      _displaySelectedImage(elClicked);
    });
  } // update the "selected" class of each thumbnail image


  function _updateThumbnailsSelectedClass(thumbnails, carouselIndex) {
    var cIndex = Number(carouselIndex);
    var thumbSelected = null;
    thumbnails.forEach(function (img) {
      var thumbIndex = +img.dataset.index;

      if (thumbIndex === cIndex) {
        thumbSelected = img;
        thumbSelected.classList.add('selected');
        return;
      }

      img.classList.remove('selected');
    });
    return thumbSelected;
  } // scroll viewport using vanilla JavaScript


  function _vpScrollJavaScript(scrollDest) {
    // simulate scroll feature with vanilla JavaScript
    var timeStep = 20;
    var timeTotal = 400;
    var stepsTotal = Math.round(timeTotal / timeStep);
    var scrollStart = thumbnailsViewport.scrollLeft;
    var scrollTotal = scrollDest - scrollStart;
    var scrollStep = Math.round(scrollTotal / stepsTotal);
    var time = timeStep,
        scroll = scrollStart + scrollStep;

    var _scrollRecursive = function _scrollRecursive() {
      if (time >= timeTotal) {
        thumbnailsViewport.scrollLeft = scrollDest;
        return;
      }

      thumbnailsViewport.scrollLeft = scroll;
      time += timeStep;
      scroll += scrollStep;
      setTimeout(_scrollRecursive, timeStep);
    };

    if (scrollTotal !== 0) {
      _scrollRecursive();
    }
  }
  /**
   * scroll thumbnails viewport to show `thumbnailImg` in center of window
   * @param {HTMLImageElement} thumbnailImg - thumbnail's img element
   */


  function _scrollThumbnailsViewport(thumbnailImg) {
    if (!thumbnailImg) {
      return;
    }

    var viewportWidth = thumbnailsViewport.scrollWidth;
    var vpStyle = getComputedStyle(thumbnailsViewport);
    var vpPaddingLeft = parseFloat(vpStyle.paddingLeft);
    var windowWidth = thumbnailsViewport.clientWidth;
    var scrollMax = viewportWidth - windowWidth;
    var tnParent = thumbnailImg.parentElement; // thumbnailImg parent is button

    var tnStyle = getComputedStyle(tnParent);
    var tnWidth = tnParent.offsetWidth + parseFloat(tnStyle.marginLeft) + parseFloat(tnStyle.marginRight);
    var thumbnailCenterOffset = tnParent.offsetLeft + tnParent.offsetWidth / 2; // console.log(`    viewportWidth: ${thumbnailsViewport.scrollWidth}
    // vpPaddingLeft: ${vpPaddingLeft}
    // windowWidth: ${windowWidth}
    // scrollMax: ${scrollMax}
    // tnParent.offsetLeft: ${tnParent.offsetLeft}
    // tnParent.offsetWidth: ${tnParent.offsetWidth}
    // tnWidth: ${tnWidth}
    // thumbnailCenterOffset: ${thumbnailCenterOffset}`);
    // scroll viewport to position thumbnail in center of viewport window

    var newScrollLeft = thumbnailCenterOffset - Math.round((windowWidth + tnWidth) / 2) + vpPaddingLeft;

    if (newScrollLeft < 0) {
      newScrollLeft = 0;
    }

    if (newScrollLeft > scrollMax) {
      newScrollLeft = scrollMax;
    } // console.log(`  newScrollLeft: ${newScrollLeft}`);


    if (_hasSmoothScrolling(thumbnailsViewport)) {
      // console.log('scrolling with Element.scrollLeft = newScrollLeft');
      thumbnailsViewport.scrollLeft = newScrollLeft;
    } else {
      _vpScrollJavaScript(newScrollLeft);
    } // console.log(`after scrollLeft: ${thumbnailsViewport.scrollLeft}`);

  } // populate overlay with name, carousel and thumbnail images


  function populate(name, hrefs) {
    // console.log('populate()')
    // display the modal (invisibly) to obtain its dimensions
    carouselModal.style.display = 'block';
    pHeader.innerHTML = name; // detect aspect ratio of image when it receives a 'load' event

    var imagesLoaded = 0;
    var aspectRatioMin = Infinity;

    function _evalLoadedImage() {
      var img = this;
      var aspectRatio;
      imagesLoaded++;

      if (img.width === 0 || img.height === 0) {
        return;
      }

      aspectRatio = img.width / img.height;
      img.dataset.aspectRatio = aspectRatio;
      aspectRatioMin = aspectRatio < aspectRatioMin ? aspectRatio : aspectRatioMin; // console.log(`_evalLoadedImage index: ${img.dataset.index}, aspectRatio: ${aspectRatio}, min: ${aspectRatioMin}`);

      if (imagesLoaded < hrefs.length) {
        return;
      }

      if (aspectRatioMin === Infinity) {
        return;
      } // all images loaded: set the padding-bottom of container to match aspect
      // ratio


      carouselContainer.style.paddingBottom = Math.round(1.0 / aspectRatioMin * 100) + '%';
      carouselContainer.dataset.aspectRatio = String(aspectRatioMin);
      var contentAspectRatio = modalContent.offsetWidth / modalContent.offsetHeight;
      modalDialog.style.maxWidth = "calc(-2rem + ".concat(Math.round(contentAspectRatio * 100), "vh)"); // console.log(`  modalContent.offsetWidth: ${modalContent.offsetWidth}
      //   modalContent.offsetHeight: ${modalContent.offsetHeight}
      //   aspectRatioMin: ${aspectRatioMin}
      //   contentAspectRatio: ${contentAspectRatio}
      //   modalDialog.style.maxWidth: ${modalDialog.style.maxWidth}`);
      // un-display the modal

      carouselModal.style.display = "none";
    } // populate the thumbnails


    thumbnailsViewport.innerHTML = '';
    thumbnailImages = hrefs.map(function (href, index) {
      var btnThumb = document.createElement('button');
      thumbnailsViewport.appendChild(btnThumb);
      var imgThumb = document.createElement('img');
      imgThumb.onload = _evalLoadedImage;
      imgThumb.dataset.index = index;
      imgThumb.src = href;
      btnThumb.appendChild(imgThumb);
      return imgThumb;
    }); // show thumbnails when there are multiple images

    var hasMultipleImages = hrefs.length > 1;
    modalFooter.style.display = hasMultipleImages ? '' : 'none';
  } // show the carousel modal


  function show() {
    overlayDiv.dataset.inTransition = "false"; // make the display changes *before* showing the modal

    var firstThumb = thumbnailsViewport.querySelector('img');

    if (firstThumb === null) {
      console.error('no thumbnail images found');
      return;
    }

    _displaySelectedImage(firstThumb, false);

    jqCarouselModal.modal('show');
  }

  function _init() {
    _applyUserEditsToCSSProps();

    _applyCSSPropsToStyleSheet();

    _appendStyleSheetToHead();

    _appendHTMLTemplateToBody();

    _listenForThumbnailImageClicks();

    _listenForEnterKeyOverButton();
  } // initialize


  _init();

  return {
    populate: populate,
    show: show
  };
}

/* harmony default export */ __webpack_exports__["default"] = (OverlayCarousel);

/***/ })

/******/ });
//# sourceMappingURL=carousel.bundle.js.map