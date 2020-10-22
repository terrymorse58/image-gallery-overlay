// image gallery carousel overlay with thumbnails

import CSSTemplate from './CSSTemplate.js';
import CSSEditableProps from './CSSEditableProps.js';
import HTMLTemplate from './HTMLTemplate.js';

function OverlayCarousel (userEditsToCSSProps) {

  // work on duplicates of the templates
  const editableCSSProps = { ...CSSEditableProps };
  let cssContent = CSSTemplate.slice(0);

  // handy reference to our created HTML elements
  // set with _htmlElementReferences()
  const htmlRefs = {};

  let _modalIsShowing = false;

  // state of the div + image that overlays the hero image
  // to perform cross-fading
  function _initOverlayState () {
    return {
      inTransition: false,
      imgSrc: "",
      imgAlt: "",
      imgTitle: "",
      imgIndex: null,
      timeoutID: null
    };
  }
  const _overlayState = _initOverlayState();

  // state of the thumbnails
  function _initThumbnailsState () {
    return {
      imgs: [],
      firstThumbnailImg: null,
      firstThumbnailBtn: null,
      lastThumbnailImg: null,
      lastTumbnailBtn: null,
      selectedThumbnailImg: null
    };
  }
  const _thumbnailsState = _initThumbnailsState();

  // true if element (and browser) support smooth scrolling
  const _hasSmoothScrolling = (el) => {
    return getComputedStyle(el).scrollBehavior === 'smooth';
  }

  // apply user edits to editable css props
  function _applyUserEditsToCSSProps (edits) {
    if (typeof edits === 'undefined') { return; }
    for (const [propName, value] of Object.entries(edits)) {
      if (typeof editableCSSProps[propName] === 'undefined') { continue; }
      editableCSSProps[propName] = value;
    }
  }

  // apply all css props to cssContent
  function _applyCSSPropsToCSSContent (props) {
    for (const [propName, value] of Object.entries(props)) {
      const searchStr = `{{${propName}}}`;
      const subStr = `${value}`;
      cssContent = cssContent.replace(searchStr, subStr);
    }
  }

  // create style sheet HTML element with `textContent`
  function _createStyleSheetElement (textContent) {
    const style = document.createElement('style');
    style.textContent = textContent;
    return style;
  }

  // create carousel-modal-container div
  function _createCarouselModalContainer (innerHTML) {
    const div = document.createElement('div');
    div.id = "carousel-modal-container";
    div.innerHTML = innerHTML;
    return div;
  }

  // references to our significant HTML elements
  function _htmlElementReferences (galleryOverlay) {
    const
      shadowRoot = galleryOverlay.shadowRoot,
      cModalContainer =  shadowRoot.getElementById(
      'carousel-modal-container'),
      cModal = cModalContainer.querySelector('.cmodal'),
      cmBackdrop = cModalContainer.querySelector('.cmodal-backdrop'),
      cmDialog = cModal.querySelector('.cmodal-dialog'),
      cmContent = cmDialog.querySelector('.cmodal-content'),
      cmHeader = cmDialog.querySelector('.cmodal-header'),
      cmHeaderP = cmHeader.querySelector('p'),
      closeBtn = cmHeader.querySelector('button.close'),
      cmBody = cmDialog.querySelector('.cmodal-body'),
      carouselContainer = cmBody.querySelector('.carousel-container'),
      heroImg = carouselContainer.querySelector('.carousel-hero'),
      overlayDiv = carouselContainer.querySelector('.carousel-overlay-div'),
      overlayImg = overlayDiv.querySelector('.carousel-overlay'),
      cmFooter = cmDialog.querySelector('.cmodal-footer'),
      thumbnailsDiv = cmFooter.querySelector('.div-thumbnails');

    return{
      shadowRoot, cModalContainer, cModal, cmBackdrop, cmDialog, cmContent,
      cmHeader, cmHeaderP, closeBtn, cmBody, carouselContainer, heroImg,
      overlayDiv, overlayImg, cmFooter, thumbnailsDiv
    };
  }

  // <gallery-overlay> custom element
  class GalleryOverlay extends HTMLElement {
    constructor() {
      super();

      // append shadow root
      this.attachShadow({mode: 'open'});

      // append style element to the shadow DOM
      this.shadowRoot.append(_createStyleSheetElement(cssContent));

      // append carousel modal container and its contents to shadow DOM
      this.shadowRoot.append(_createCarouselModalContainer(HTMLTemplate));
    }
  }
  
  function _createGalleryOverlay () {
    // console.log('_createGalleryOverlay()');
    customElements.define('gallery-overlay', GalleryOverlay);
    return document.createElement('gallery-overlay');
  }

  function _appendGalleryOverlayToBody (galleryOverlay) {
    document.body.appendChild(galleryOverlay);
  }

  /**
   * select thumbnail and display as hero image
   * @param {HTMLImageElement} thumbnailImg
   * @param {boolean} animate - animate the hero image transition
   */
  function _selectAndDisplayImage (
    thumbnailImg,
    animate = true)
  {
    // console.log(`_selectAndDisplayImage()`);

    // deselect current thumbnail and select new one
    if(_thumbnailsState.selectedThumbnailImg) {
      _thumbnailsState.selectedThumbnailImg.classList
        .remove('selected');
    }
    _thumbnailsState.selectedThumbnailImg = thumbnailImg;
    thumbnailImg.classList.add('selected');

    // scroll to the selected thumbnail
    _scrollThumbnailsViewport();

    // clear existing overlay timeout, if one exists
    if (_overlayState.timeoutID !== null) {
      // console.log('    clearing prior timeout');
      clearTimeout(_overlayState.timeoutID);
      _overlayState.timeoutID = null;
    }

    // set overlay state for the selected image
    Object.assign(_overlayState, {
      imgSrc: thumbnailImg.src,
      imgAlt: thumbnailImg.alt,
      imgTitle: thumbnailImg.title,
      imgIndex: Number(thumbnailImg.dataset.index)
    });

    // change the fade-in overlay image
    htmlRefs.overlayImg.src = _overlayState.imgSrc;

    if (animate === false) {
      // clean up without animation
      _completeImageFade();
      return;
    }

    // with animation: fade in overlay image
    // console.log('_selectAndDisplayImage fading in overlay');
    _overlayState.inTransition = true;
    htmlRefs.overlayDiv.classList.add('carousel-fade-in');

    // add timeout in case 'transitionend' event is never received
    const thisIndex = _overlayState.imgIndex;
    _overlayState.timeoutID = setTimeout(() => {
      if (_overlayState.inTransition === false) { return; }
      if (_overlayState.imgIndex !== thisIndex) { return; }
      // console.log(`transitionend timeout for index ${thisIndex}, call _completeImageFade()`);
      _completeImageFade();
    }, 1500);
  }

  // clean up display elements after image fade transition completes
  function _completeImageFade () {
    // console.log('_completeImageFade() _overlayState.inTransition:', _overlayState.inTransition);

    _overlayState.inTransition = false;

    // update hero image
    if (_overlayState.imgSrc && _overlayState.imgSrc.length > 0) {
      Object.assign(htmlRefs.heroImg, {
        src: _overlayState.imgSrc,
        alt: _overlayState.imgAlt,
        title: _overlayState.imgTitle
      });
    }

    // reset overlay state
    Object.assign(_overlayState, _initOverlayState());

    // clean up overlay
    if (_overlayState.inTransition) { return; }
    htmlRefs.overlayDiv.classList.remove('carousel-fade-in');
  }

  // upon enter keydown over thumbnail button, dispatch click on thumbnail image
  function _listenForEnterKeyOverButton () {
    const  handleEnterKey = (e) => {
      if (e.key !== 'Enter') { return; }
      const elem = e.target;
      if (elem.tagName !== 'BUTTON') { return; }
      const btnImg = elem.firstChild;
      if (!btnImg || btnImg.tagName !== 'IMG') { return; }
      btnImg.click();
    };
    htmlRefs.thumbnailsDiv.addEventListener('keydown', handleEnterKey);
  }

  // respond to clicks on thumbnail images
  function _listenForThumbnailImageClicks () {
    const handleClick = (evt) => {
      const elClicked = evt.target;
      const isThumbnailImg = (el) => el.tagName === 'IMG'
        && typeof el.dataset.index !== 'undefined';
      if (isThumbnailImg(elClicked) === false) { return; }
      _selectAndDisplayImage(elClicked);
    };
    htmlRefs.thumbnailsDiv.addEventListener('click', handleClick);
  }

  // listen for overlay fade completion
  function _listenForImageOverlayFade () {
    htmlRefs.overlayDiv.addEventListener('transitionend',
      _completeImageFade);
  }

  // listen for tab key to keep focus on gallery overlay elements
  function _handleTab (evt) {
    if (evt.key !== 'Tab') { return; }
    const isShiftTab = evt.shiftKey === true;
    const elWithFocus = htmlRefs.shadowRoot.activeElement;
    const lastThumbnailHasFocus =
      elWithFocus === _thumbnailsState.lastThumbnailBtn;
    const tabbingFromLastThumbnail = lastThumbnailHasFocus && !isShiftTab;
    const closeBtnHasFocus = elWithFocus === htmlRefs.closeBtn;
    const shiftTabbingFromCloseBtn = closeBtnHasFocus && isShiftTab;

    // handle tab and shift-tab from any non-gallery element
    if (elWithFocus === null) {
      evt.preventDefault();
      if (isShiftTab) {
        _thumbnailsState.lastThumbnailBtn.focus();
      } else {
        htmlRefs.closeBtn.focus();
      }
      return;
    }

    // blur when tabbing off the ends of tabbable element list
    if (tabbingFromLastThumbnail || shiftTabbingFromCloseBtn) {
      evt.preventDefault();
      elWithFocus.blur();
    }
  }
  function _listenForTabKey () {
    document.addEventListener('keydown', _handleTab);
  }
  function _removeTabKeyListener () {
    document.removeEventListener('keydown', _handleTab);
  }

  // hide everything
  function _hideModal () {
    // console.log('_hideModal()');

    if (_modalIsShowing === false) { return; }
    _modalIsShowing = false;

    _removeTabKeyListener();

    htmlRefs.cmBackdrop.addEventListener('transitionend', () => {
        htmlRefs.cmBackdrop.style.display = 'none';
      }, { once: true }
    );
    htmlRefs.cModal.addEventListener('transitionend', () => {
        htmlRefs.cModal.style.display = 'none';
      }, { once: true }
    );

    htmlRefs.cmBackdrop.classList.remove('show');
    htmlRefs.cModal.classList.remove('show');
    document.body.classList.remove('cmodal-open');
  }

  // respond to events intended to hide modal
  function _listenForHideModalEvents () {

    // a click on modal close button
    htmlRefs.closeBtn.addEventListener('click', _hideModal);

    // a click on modal backdrop
    htmlRefs.cmBackdrop.addEventListener('click', _hideModal);

    // ESC key pressed anywhere
    document.addEventListener('keyup', evt => {
      if (evt.key === 'Escape') {
        // console.log('ESC key pressed');
        _hideModal();
      }
    });
  }

  // scroll viewport using vanilla JavaScript
  // (for browsers like Safari that don't natively support smooth scrolling)
  function _vpScrollJavaScript (scrollDest) {
    // simulate scroll feature with vanilla JavaScript
    const timeStep = 20;
    const timeTotal = 400;
    const stepsTotal = Math.round(timeTotal/timeStep);
    const scrollStart = htmlRefs.thumbnailsDiv.scrollLeft;
    const scrollTotal = scrollDest - scrollStart;
    const scrollStep = Math.round(scrollTotal/stepsTotal);
    let time = timeStep,
      scroll = scrollStart + scrollStep;

    const _scrollRecursive = () => {
      if (time >= timeTotal) {
        htmlRefs.thumbnailsDiv.scrollLeft = scrollDest;
        return;
      }
      htmlRefs.thumbnailsDiv.scrollLeft = scroll;
      time += timeStep;
      scroll += scrollStep;
      setTimeout(_scrollRecursive, timeStep);
    }

    if (scrollTotal === 0) { return; }

    _scrollRecursive();
  }

  /**
   * scroll thumbnails viewport to show currently selected thumbnail
   * in center
   */
  function _scrollThumbnailsViewport () {
    const thumbnailImg = _thumbnailsState.selectedThumbnailImg;
    if (!thumbnailImg) { return; }
    const vpScrollWidth = htmlRefs.thumbnailsDiv.scrollWidth;
    const vpStyle = getComputedStyle(htmlRefs.thumbnailsDiv);
    const vpPaddingLeft = parseFloat(vpStyle.paddingLeft);
    const vpWindowWidth = htmlRefs.thumbnailsDiv.clientWidth;
    const vpScrollMax = vpScrollWidth - vpWindowWidth;
    const tnButton = thumbnailImg.parentElement;
    const tnButtonStyle = getComputedStyle(tnButton);
    const tnButtonWidth = tnButton.offsetWidth
      + parseFloat(tnButtonStyle.marginLeft)
      + parseFloat(tnButtonStyle.marginRight);
    const tnOffsetCenter = tnButton.offsetLeft
      + (tnButton.offsetWidth / 2);

    // scroll to position thumbnail in center of viewport window
    let newScrollLeft = tnOffsetCenter
      - Math.round((vpWindowWidth + tnButtonWidth) / 2)
      + vpPaddingLeft;
    if (newScrollLeft < 0) { newScrollLeft = 0; }
    if (newScrollLeft > vpScrollMax) { newScrollLeft = vpScrollMax; }

    if (_hasSmoothScrolling(htmlRefs.thumbnailsDiv)) {
      // console.log('scrolling with Element.scrollLeft = newScrollLeft');
      htmlRefs.thumbnailsDiv.scrollLeft = newScrollLeft;
    } else {
      _vpScrollJavaScript(newScrollLeft);
    }

    // give focus to the thumbnail button
    tnButton.focus();
  }

  function _populateThumbnails (hrefs, titles, imgOnLoadHandler) {
    htmlRefs.thumbnailsDiv.innerHTML = '';
    Object.assign(_thumbnailsState, _initThumbnailsState());
    _thumbnailsState.imgs = hrefs.map((href, index) => {
      const btnThumb = document.createElement('button');
      htmlRefs.thumbnailsDiv.appendChild(btnThumb);

      const imgThumb = document.createElement('img');
      imgThumb.onload = imgOnLoadHandler;
      imgThumb.dataset.index = String(index);
      imgThumb.src = href;
      if (titles !== null) {
        imgThumb.alt = imgThumb.title = titles[index];
      }
      btnThumb.appendChild(imgThumb);

      return imgThumb;
    });
    _thumbnailsState.firstThumbnailImg = _thumbnailsState.imgs[0];
    _thumbnailsState.firstThumbnailBtn =
      _thumbnailsState.firstThumbnailImg.parentElement;
    _thumbnailsState.lastThumbnailImg =
      _thumbnailsState.imgs[_thumbnailsState.imgs.length - 1];
    _thumbnailsState.lastThumbnailBtn =
      _thumbnailsState.lastThumbnailImg.parentElement;

    // display thumbnails only when there are multiple images
    const hasMultipleImages = hrefs.length > 1;
    htmlRefs.cmFooter.style.display = hasMultipleImages ? '' : 'none';
  }

  /**
   * populate overlay with name, hero and thumbnail images
   * @param name
   * @param hrefs
   * @param titles
   * @return {Promise<unknown>}
   */
  function populate (name, hrefs, titles = null) {
    // console.log(`populate()`);
    const hrefsCount = hrefs.length;
    let completed = false;

    return new Promise(function (resolve, reject) {

      // display the modal (invisibly) to obtain its dimensions
      const displaySave = htmlRefs.cModal.style.display;
      htmlRefs.cModal.style.display = 'block';

      htmlRefs.cmHeaderP.innerHTML = name;

      let imagesLoaded = 0;
      let aspectRatioMin = Infinity;

      // detect image aspect ratio when it receives a 'load' event
      function _evalLoadedImage () {
        const img = this;
        const imgAspectRatio = (img.height > 0) ? img.width / img.height : null;

        imagesLoaded++;
        if (imgAspectRatio === null) { return; }

        img.dataset.aspectRatio = String(imgAspectRatio);
        aspectRatioMin = (imgAspectRatio < aspectRatioMin) ?
          imgAspectRatio : aspectRatioMin;

        if (imagesLoaded < hrefsCount) { return; }
        if (aspectRatioMin === Infinity) { return; }

        // all images loaded:

        // set padding-bottom of container to accommodate tallest image
        htmlRefs.carouselContainer.style.paddingBottom =
          Math.round(1.0 / aspectRatioMin * 100) + '%';
        htmlRefs.carouselContainer.dataset.aspectRatio = String(aspectRatioMin);

        // set the modal's max width to maintain its aspect ratio
        // while keeping the entire modal within the browser's viewport
        const modalAspectRatio =
          htmlRefs.cmContent.offsetWidth / htmlRefs.cmContent.offsetHeight;
        htmlRefs.cmDialog.style.maxWidth =
          `calc(-30px + ${
            Math.round(modalAspectRatio * 100)
          }vh)`;

        // restore the modal's display state
        htmlRefs.cModal.style.display = displaySave;

        // all images loaded, mark as completed and resolve the promise
        completed = true;
        resolve();
      }

      // populate the thumbnails
      _populateThumbnails(hrefs, titles, _evalLoadedImage);

      // set a timeout in case some images don't load
      setTimeout(() => {
        if (completed) { return; }
        // reject with an error message
        const errmsg = `unable to load some images, expected ${hrefsCount}` +
          `, loaded ${imagesLoaded}`;
        reject(errmsg);
      }, 2000);

    });
  }

  // show the image gallery
  function show () {

    // console.log('show()');

    if (_modalIsShowing) { return; }

    // make the display changes *before* showing the modal
    if (_thumbnailsState.firstThumbnailImg === null) {
      console.error('no thumbnail images found');
      return;
    }
    _selectAndDisplayImage(_thumbnailsState.firstThumbnailImg, false);

    htmlRefs.cmBackdrop.style.display = 'block';
    htmlRefs.cModal.style.display = 'block';

    // listen for tab keys
    _listenForTabKey();

    // delay showing slightly to avoid any UI flash
    setTimeout(() => {
      htmlRefs.cModal.classList.add('show');
      htmlRefs.cmBackdrop.classList.add('show');
      document.body.classList.add('cmodal-open');
      _modalIsShowing = true;
    }, 200);
  }


  function _init () {
    _applyUserEditsToCSSProps(userEditsToCSSProps);
    _applyCSSPropsToCSSContent(editableCSSProps);
    const galleryOverlay = _createGalleryOverlay();
    _appendGalleryOverlayToBody(galleryOverlay);
    Object.assign(htmlRefs, _htmlElementReferences(galleryOverlay));

    _listenForImageOverlayFade();
    _listenForThumbnailImageClicks();
    _listenForEnterKeyOverButton();
    _listenForHideModalEvents();
  }

  // initialize
  _init();

  return {
    populate,
    show
  };

}

export default OverlayCarousel;
