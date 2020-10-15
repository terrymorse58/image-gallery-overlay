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
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  headerPadding: '0.25rem 1rem',
  headerParagraphMargin: '0',
  footerPadding: '0 1rem',
  thumbnailBtnPadding: '0',
  thumbnailBtnMargin: '0 4px',

  /* must be in 'px' units */
  thumbnailImgHeight: '60px',
  thumbnailImgHoverFilter: 'brightness(70%) contrast(150%)',
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
var CSSTemplate = "\n    /* general */\n    #carousel-modal-container {\n      font-family: {{fontFamily}};\n    }\n\n    /* .cmodal */\n    #carousel-modal-container .cmodal {\n      position: fixed;\n      top: 0;\n      left: 0;\n      z-index: 1050;\n      width: 100%;\n      height: 100%;\n      overflow: hidden;\n      outline: 0;\n      pointer-events: none;\n    }\n    .cmodal-open #carousel-modal-container .cmodal {\n      overflow-x: hidden;\n      overflow-y: auto;\n    }\n    \n    /* .cmodal-dialog */\n    #carousel-modal-container .cmodal .cmodal-dialog {\n      position: relative;\n      width: auto;\n      margin: 0 auto;\n      pointer-events: none;\n      display: flex;\n      align-items: center;\n      min-height: calc(100% - 1rem);\n      opacity: 0;\n      transform: scale(0.95);\n      transition: all .75s ease;\n    }\n    #carousel-modal-container .cmodal.show .cmodal-dialog {\n     opacity: 1;\n     transform: scale(1.0);\n    }\n    @media (max-width: 475px) {\n      #carousel-modal-container .cmodal.show .cmodal-dialog {\n        max-width: 92vw !important;\n      }\n    }\n    \n    /* .cmodal-content */\n    #carousel-modal-container .cmodal-content {\n      position: relative;\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n      pointer-events: auto;\n      background-color: #fff;\n      background-clip: padding-box;\n      border: 1px solid rgba(0,0,0,.2);\n      border-radius: 0.3rem;\n      outline: 0;\n    }\n    \n    /* .cmodal-header */\n    #carousel-modal-container .cmodal-header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      padding: {{headerPadding}};\n      border-bottom: 1px solid #dee2e6;\n      border-top-left-radius: calc(.3rem - 1px);\n      border-top-right-radius: calc(.3rem - 1px);\n    }\n    #carousel-modal-container .cmodal-header p {\n      margin: {{headerParagraphMargin}};\n    }\n    \n    /* .cmodal-body */\n    #carousel-modal-container .cmodal-body {\n      position: relative;\n      flex: 1 1 auto;\n      padding: 1rem;\n    }\n    \n    /* carousel */\n    #carousel-modal-container .carousel-container {\n      margin: 0;\n      position: relative;\n      width: 100%;\n     }\n     #carousel-modal-container .carousel-overlay-div {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-color: white;\n      opacity: 0;\n      pointer-events: none;\n      transition: opacity 0.1s;\n     }\n     #carousel-modal-container .carousel-hero {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: auto;\n     }\n     #carousel-modal-container .carousel-overlay {\n       position: absolute;\n       top: 0;\n       left: 0;\n       width: 100%;\n       height: auto;\n     }\n     #carousel-modal-container .carousel-fade-in {\n       opacity: 1;\n       transition: opacity .75s ease;\n     }\n    \n    /* cmodal-footer */\n    #carousel-modal-container .cmodal-footer {\n      display: flex;\n      flex-wrap: wrap;\n      align-items: center;\n      justify-content: flex-end;\n      padding: {{footerPadding}};\n      border-top: 1px solid #dee2e6;\n      border-bottom-right-radius: calc(.3rem - 1px);\n      border-bottom-left-radius: calc(.3rem - 1px);\n    }\n    #carousel-modal-container .div-thumbnails {\n      overflow-x: auto;\n      white-space: nowrap;\n      margin: 0;\n      padding: 8px 16px 12px 16px; /* padding must be 'px' */\n      background-color: transparent;\n      scroll-behavior: smooth;\n    }\n    #carousel-modal-container .div-thumbnails button {\n      padding: {{thumbnailBtnPadding}};\n      margin: {{thumbnailBtnMargin}};\n      background-color: transparent;\n      border: none;\n    }\n    #carousel-modal-container .div-thumbnails img {\n      height: {{thumbnailImgHeight}};\n      width: auto;\n      margin: 0;\n      border: {{thumbnailBorder}};\n    }\n    #carousel-modal-container .div-thumbnails img:hover {\n      filter: {{thumbnailImgHoverFilter}};\n    }\n    #carousel-modal-container .div-thumbnails img.selected {\n      cursor: default;\n      border: {{thumbnailImgSelectedBorder}};\n      opacity: {{thumbnailSelectedOpacity}};\n      filter: {{thumbnailSelectedFilter}};\n    }\n    \n    /* close button */\n    #carousel-modal-container button.close {\n      float: right;\n      font-size: 1.5rem;\n      font-weight: 700;\n      line-height: 1;\n      color: #000;\n      text-shadow: 0 1px 0 #fff;\n      padding: 1rem;\n      margin: -1rem -1rem -1rem auto;;\n      background-color: transparent;\n      border: 0;\n      opacity: .5;\n    }\n    #carousel-modal-container button.close:hover {\n      opacity: .8;\n    }\n    \n    /* cmodal-backdrop */\n    .cmodal-backdrop {\n      position: fixed;\n      top: 0;\n      left: 0;\n      z-index: 1040;\n      width: 100vw;\n      height: 100vh;\n      background-color: #000;\n      transition: opacity .3s linear;\n      opacity: 0;\n    }\n    .cmodal-backdrop.show {\n      opacity: 0.5;\n    }\n    \n    /* .cmodal-open */\n    .cmodal-open {\n      overflow: hidden;\n    }\n    \n    cmodal-open cmodal {\n      overflow-x: hidden;\n      overflow-y: auto;\n    }\n";
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
var HTMLTemplate = "\n  <div\n    tabindex=\"-1\"\n    class=\"cmodal\"\n    data-wrap=\"false\"\n    style=\"display: none\"\n  >\n    <div\n      class=\"cmodal-dialog cmodal-dialog-centered\"\n      style=\"max-width: calc(-2rem + 58vh)\"\n    >\n      <div class=\"cmodal-content\">\n      \n        <div class=\"cmodal-header\">\n          <p><!-- name of product --></p>\n          <button type=\"button\"\n            aria-label=\"Close\"\n            class=\"close\"\n          >\n            <span aria-hidden=\"true\">\xD7</span>\n          </button>\n        </div> <!-- /.cmodal-header -->\n        \n        <div class=\"cmodal-body\">\n          <div\n            class=\"carousel-container\"\n            data-aspect-ratio=\"0.6666667\"\n            style=\"padding-bottom: 150%\"\n          >\n            <img\n              class=\"carousel-hero\"\n              src=\"\"\n              alt=\"carousel hero\">\n            <!-- .carousel-overlay-div -->\n            <div\n              class=\"carousel-overlay-div\"\n            >\n              <img\n                class=\"carousel-overlay\"\n                alt=\"carousel overlay\"\n                src=\"\"\n              >\n            </div> <!-- /.carousel-overlay-div -->\n          </div> <!-- /.carousel-container -->\n        </div> <!-- /.cmodal-body -->\n\n        <div class=\"cmodal-footer\">\n          <div class=\"div-thumbnails\"></div>\n        </div> <!-- /.cmodal-footer -->\n        \n      </div> <!-- /.cmodal-content -->\n    </div> <!-- /.cmodal-dialog -->\n  </div> <!-- /.cmodal -->\n  <div class=\"cmodal-backdrop\" style=\"display: none\"></div>\n";
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
  var cModalContainer,
      carouselModal,
      modalBackdrop,
      modalDialog,
      modalContent,
      modalHeader,
      pHeader,
      closeButton,
      modalBody,
      carouselContainer,
      imgHero,
      imgOverlay,
      overlayDiv,
      thumbnailsViewport,
      firstThumbnail,
      thumbnailImages = [],
      modalFooter,
      modalIsShowing = false; // state of the image that fades in over the hero image

  function _initOverlayState() {
    return {
      inTransition: false,
      imgSrc: "",
      imgAlt: "",
      imgTitle: "",
      imgIndex: null,
      timeoutID: null
    };
  }

  var _overlayState = _initOverlayState(); // true if element (and browser) support smooth scrolling


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
    cModalContainer = document.getElementById('carousel-modal-container');
    carouselModal = cModalContainer.querySelector('.cmodal');
    modalBackdrop = cModalContainer.querySelector('.cmodal-backdrop');
    modalDialog = carouselModal.querySelector('.cmodal-dialog');
    modalContent = modalDialog.querySelector('.cmodal-content');
    modalHeader = modalDialog.querySelector('.cmodal-header');
    pHeader = modalHeader.querySelector('p');
    closeButton = modalHeader.querySelector('button.close');
    modalBody = modalDialog.querySelector('.cmodal-body');
    carouselContainer = modalBody.querySelector('.carousel-container');
    imgHero = carouselContainer.querySelector('.carousel-hero');
    overlayDiv = carouselContainer.querySelector('.carousel-overlay-div');
    imgOverlay = overlayDiv.querySelector('.carousel-overlay');
    modalFooter = modalDialog.querySelector('.cmodal-footer');
    thumbnailsViewport = modalFooter.querySelector('.div-thumbnails'); // set up the overlay fader

    overlayDiv.addEventListener('transitionend', _completeImageFade); // react to hero image changes

    imgHero.addEventListener('change', function () {
      var heroIndex = Number(imgHero.dataset.index); // set (unset) the `selected` class for each thumbnail image

      var thumbSelected = _updateThumbnailsSelectedClass(thumbnailImages, heroIndex); // scroll the thumbnails container horizontally


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

    // console.log(`_displaySelectedImage()
    // thumbnailImg: ${JSON.stringify(thumbnailImg)}
    // animate=${animate})
    // _overlayState: ${JSON.stringify(_overlayState,null,2)}`);
    // clear prior overlay timeout, if one exists
    if (_overlayState.timeoutID !== null) {
      // console.log('    clearing prior timeout');
      clearTimeout(_overlayState.timeoutID);
      _overlayState.timeoutID = null;
    } // set overlay state for the selected thumbnail


    Object.assign(_overlayState, {
      imgSrc: thumbnailImg.src,
      imgAlt: thumbnailImg.alt,
      imgTitle: thumbnailImg.title,
      imgIndex: Number(thumbnailImg.dataset.index)
    }); // dispatch 'change' event to hero image, which will update thumbnails

    imgHero.dataset.index = thumbnailImg.dataset.index;
    var changeEvt = new Event('change');
    imgHero.dispatchEvent(changeEvt); // change the fade-in overlay image

    imgOverlay.src = _overlayState.imgSrc;

    if (animate === false) {
      // clean up without animation
      _completeImageFade();

      return;
    } // fade in overlay
    // console.log('_displaySelectedImage fading in overlay');


    _overlayState.inTransition = true;
    overlayDiv.classList.add('carousel-fade-in'); // add timeout in case 'transitionend' event is never received

    var thisIndex = _overlayState.imgIndex;
    _overlayState.timeoutID = setTimeout(function () {
      if (_overlayState.inTransition === false) {
        return;
      }

      if (_overlayState.imgIndex !== thisIndex) {
        return;
      } // console.log(`transitionend timeout for index ${thisIndex}, call _completeImageFade()`);


      _completeImageFade();
    }, 1500);
  } // clean up display elements when image fade transition completes


  function _completeImageFade() {
    // console.log('_completeImageFade() _overlayState.inTransition:', _overlayState.inTransition);
    // console.log(`    imgOverlay.src: "${imgOverlay.src}"`);
    _overlayState.inTransition = false; // update hero image

    if (_overlayState.imgSrc.length > 0) {
      Object.assign(imgHero, {
        src: _overlayState.imgSrc,
        alt: _overlayState.imgAlt,
        title: _overlayState.imgTitle
      });
      imgHero.dataset.index = String(_overlayState.imgIndex);
    } // clear overlay state


    Object.assign(_overlayState, _initOverlayState()); // // skip the overlay clean up when not necessary
    // const hasFadeInClass = (el) => el.classList.contains('carousel-fade-in');
    // if (hasFadeInClass(overlayDiv) === false) {
    //   return;
    // }
    // clean up overlay

    if (_overlayState.inTransition) {
      return;
    }

    overlayDiv.classList.remove('carousel-fade-in');
  } // upon enter key press over thumbnail button, emit click on thumbnail image


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
  }

  function _hideModal() {
    // console.log('_hideModal()');
    if (modalIsShowing === false) {
      return;
    }

    modalIsShowing = false;
    modalBackdrop.addEventListener('transitionend', function () {
      modalBackdrop.style.display = 'none';
    }, {
      once: true
    });
    carouselModal.addEventListener('transitionend', function () {
      carouselModal.style.display = 'none';
    }, {
      once: true
    });
    modalBackdrop.classList.remove('show');
    carouselModal.classList.remove('show');
    document.body.classList.remove('cmodal-open');
  } // respond to events intended to hide modal


  function _listenForHideModalEvents() {
    // click on modal close button
    closeButton.addEventListener('click', function (evt) {
      // console.log('close button click');
      _hideModal();
    }); // click on modal backdrop

    modalBackdrop.addEventListener('click', function () {
      // console.log('modalBackdrop click');
      _hideModal();
    }); // ESC key pressed anywhere

    document.addEventListener('keyup', function (evt) {
      if (evt.key === 'Escape') {
        // console.log('ESC key pressed');
        _hideModal();
      }
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
  // (use on browsers like Safari that don't support smooth scrolling)


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

  }
  /**
   * populate overlay with name, carousel and thumbnail images
   * @param name
   * @param hrefs
   * @param titles
   * @return {Promise<unknown>}
   */


  function populate(name, hrefs) {
    var titles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    // console.log(`populate()`);
    var hrefsCount = hrefs.length;
    var completed = false;
    return new Promise(function (resolve, reject) {
      // display the modal (invisibly) to obtain its dimensions
      var displaySave = carouselModal.style.display;
      carouselModal.style.display = 'block';
      pHeader.innerHTML = name; // detect aspect ratio of image when it receives a 'load' event

      var imagesLoaded = 0;
      var aspectRatioMin = Infinity; // evaluate each image onload

      function _evalLoadedImage() {
        var img = this;
        var imgAspectRatio = img.height > 0 ? img.width / img.height : null;
        imagesLoaded++;

        if (imgAspectRatio === null) {
          return;
        }

        img.dataset.aspectRatio = String(imgAspectRatio);
        aspectRatioMin = imgAspectRatio < aspectRatioMin ? imgAspectRatio : aspectRatioMin; // console.log(`_evalLoadedImage index: ${img.dataset.index}, imgAspectRatio: ${imgAspectRatio}, min: ${aspectRatioMin}`);

        if (imagesLoaded < hrefsCount) {
          return;
        }

        if (aspectRatioMin === Infinity) {
          return;
        } // all images loaded: set the padding-bottom of container to match aspect
        // ratio


        carouselContainer.style.paddingBottom = Math.round(1.0 / aspectRatioMin * 100) + '%';
        carouselContainer.dataset.aspectRatio = String(aspectRatioMin);
        var contentAspectRatio = modalContent.offsetWidth / modalContent.offsetHeight;
        modalDialog.style.maxWidth = "calc(-30px + ".concat(Math.round(contentAspectRatio * 100), "vh)"); // restore the modal's display state

        carouselModal.style.display = displaySave; // all images loaded, mark as completed and resolve the promise

        completed = true;
        resolve();
      } // populate the thumbnails


      thumbnailsViewport.innerHTML = '';
      thumbnailImages = hrefs.map(function (href, index) {
        var btnThumb = document.createElement('button');
        thumbnailsViewport.appendChild(btnThumb);
        var imgThumb = document.createElement('img');
        imgThumb.onload = _evalLoadedImage;
        imgThumb.dataset.index = String(index);
        imgThumb.src = href;

        if (titles !== null) {
          imgThumb.alt = imgThumb.title = titles[index];
        }

        btnThumb.appendChild(imgThumb);
        return imgThumb;
      });
      firstThumbnail = thumbnailsViewport.querySelector('img'); // show thumbnails when there are multiple images

      var hasMultipleImages = hrefsCount > 1;
      modalFooter.style.display = hasMultipleImages ? '' : 'none'; // set a timeout in case images don't load

      setTimeout(function () {
        if (completed) {
          return;
        } // reject with an error message


        var errmsg = "unable to load some images, expected ".concat(hrefsCount) + ", loaded ".concat(imagesLoaded);
        reject(errmsg);
      }, 2000);
    });
  } // show the carousel modal


  function show() {
    // console.log('show()');
    if (modalIsShowing) {
      return;
    } // make the display changes *before* showing the modal


    if (firstThumbnail === null) {
      console.error('no thumbnail images found');
      return;
    }

    _displaySelectedImage(firstThumbnail, false); // wait for backdrop to complete before showing modal
    // modalBackdrop.addEventListener('transitionend', () => {
    //     carouselModal.classList.add('show');
    //     document.body.classList.add('cmodal-open');
    //     modalIsShowing = true;
    //   }, { once: true }
    // );


    modalBackdrop.style.display = 'block';
    carouselModal.style.display = 'block';
    setTimeout(function () {
      carouselModal.classList.add('show');
      modalBackdrop.classList.add('show');
      document.body.classList.add('cmodal-open');
      modalIsShowing = true;
    }, 200);
  }

  function _init() {
    _applyUserEditsToCSSProps();

    _applyCSSPropsToStyleSheet();

    _appendStyleSheetToHead();

    _appendHTMLTemplateToBody();

    _listenForThumbnailImageClicks();

    _listenForEnterKeyOverButton();

    _listenForHideModalEvents();
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