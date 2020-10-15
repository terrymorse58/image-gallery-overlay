// carousel overlay modal with thumbnails
import CSSTemplate from './CSSTemplate.js';
import CSSEditableProps from './CSSEditableProps.js';
import HTMLTemplate from './HTMLTemplate.js';

function OverlayCarousel (userEditsToCSSProps) {

  // make copies of templates
  const editableCSSProps = JSON.parse(JSON.stringify(CSSEditableProps));
  let styleSheet = CSSTemplate.slice(0);

  let cModalContainer,
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
    modalIsShowing = false;

  // state of the image that fades in over the hero image
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

  // true if element (and browser) support smooth scrolling
  const _hasSmoothScrolling = (el) => {
    return getComputedStyle(el).scrollBehavior === 'smooth';
  }

  // apply user edits to editable css props
  function _applyUserEditsToCSSProps () {
    if (typeof userEditsToCSSProps === 'undefined') { return; }
    for (const [propName, value] of Object.entries(userEditsToCSSProps)) {
      if (typeof editableCSSProps[propName] === 'undefined') { continue; }
      editableCSSProps[propName] = value;
    }
  }

  // apply all css props to styleSheet
  function _applyCSSPropsToStyleSheet () {
    for (const [propName, value] of Object.entries(editableCSSProps)) {
      const searchStr = `{{${propName}}}`;
      const subStr = `${value}`;
      styleSheet = styleSheet.replace(searchStr, subStr);
    }
  }

  // append HTML template to <body>
  function _appendHTMLTemplateToBody () {
    const div = document.createElement('div');
    div.id = "carousel-modal-container";
    div.innerHTML = HTMLTemplate;
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
    thumbnailsViewport = modalFooter.querySelector('.div-thumbnails');


    // set up the overlay fader
    overlayDiv.addEventListener('transitionend', _completeImageFade);

    // react to hero image changes
    imgHero.addEventListener('change', () => {
      const heroIndex = Number(imgHero.dataset.index);

      // set (unset) the `selected` class for each thumbnail image
      const thumbSelected = _updateThumbnailsSelectedClass(
        thumbnailImages, heroIndex);

      // scroll the thumbnails container horizontally
      _scrollThumbnailsViewport(thumbSelected);
    });
  }

  // append style sheet to <head>
  function _appendStyleSheetToHead () {
    const style = document.createElement('style');
    style.innerHTML = styleSheet;
    style.id = 'carousel-style';
    document.head.appendChild(style);
  }

  /**
   * display in hero image the selected thumbnail image
   * @param {HTMLImageElement} thumbnailImg
   * @param {boolean} animate - animate the hero image transition
   */
  function _displaySelectedImage (
    thumbnailImg,
    animate = true)
  {
    // console.log(`_displaySelectedImage()
    // thumbnailImg: ${JSON.stringify(thumbnailImg)}
    // animate=${animate})
    // _overlayState: ${JSON.stringify(_overlayState,null,2)}`);

    // clear prior overlay timeout, if one exists
    if (_overlayState.timeoutID !== null) {
      // console.log('    clearing prior timeout');
      clearTimeout(_overlayState.timeoutID);
      _overlayState.timeoutID = null;
    }

    // set overlay state for the selected thumbnail
    Object.assign(_overlayState, {
      imgSrc: thumbnailImg.src,
      imgAlt: thumbnailImg.alt,
      imgTitle: thumbnailImg.title,
      imgIndex: Number(thumbnailImg.dataset.index)
    });

    // dispatch 'change' event to hero image, which will update thumbnails
    imgHero.dataset.index = thumbnailImg.dataset.index;
    const changeEvt = new Event('change');
    imgHero.dispatchEvent(changeEvt);

    // change the fade-in overlay image
    imgOverlay.src = _overlayState.imgSrc;

    if (animate === false) {
      // clean up without animation
      _completeImageFade();
      return;
    }

    // fade in overlay
    // console.log('_displaySelectedImage fading in overlay');
    _overlayState.inTransition = true;
    overlayDiv.classList.add('carousel-fade-in');

    // add timeout in case 'transitionend' event is never received
    const thisIndex = _overlayState.imgIndex;
    _overlayState.timeoutID = setTimeout(() => {
      if (_overlayState.inTransition === false) { return; }
      if (_overlayState.imgIndex !== thisIndex) { return; }
      // console.log(`transitionend timeout for index ${thisIndex}, call _completeImageFade()`);
      _completeImageFade();
    }, 1500);
  }

  // clean up display elements when image fade transition completes
  function _completeImageFade () {
    // console.log('_completeImageFade() _overlayState.inTransition:', _overlayState.inTransition);
    // console.log(`    imgOverlay.src: "${imgOverlay.src}"`);

    _overlayState.inTransition = false;

    // update hero image
    if (_overlayState.imgSrc.length > 0) {
      Object.assign(imgHero, {
        src: _overlayState.imgSrc,
        alt: _overlayState.imgAlt,
        title: _overlayState.imgTitle
      });
      imgHero.dataset.index = String(_overlayState.imgIndex);
    }

    // clear overlay state
    Object.assign(_overlayState, _initOverlayState());

    // // skip the overlay clean up when not necessary
    // const hasFadeInClass = (el) => el.classList.contains('carousel-fade-in');
    // if (hasFadeInClass(overlayDiv) === false) {
    //   return;
    // }

    // clean up overlay
    if (_overlayState.inTransition) { return; }
    overlayDiv.classList.remove('carousel-fade-in');
  }

  // upon enter key press over thumbnail button, emit click on thumbnail image
  function _listenForEnterKeyOverButton () {
    thumbnailsViewport.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') { return; }
      const elem = e.target;
      if (elem.tagName !== 'BUTTON') { return; }
      const btnImg = elem.firstChild;
      if (!btnImg || btnImg.tagName !== 'IMG') { return; }
      btnImg.click();
    });
  }

  // respond to clicks on thumbnail images
  function _listenForThumbnailImageClicks () {
    thumbnailsViewport.addEventListener('click', (evt) => {
      const elClicked = evt.target;
      const isThumbnailImg = (el) => el.tagName === 'IMG'
        && typeof el.dataset.index !== 'undefined';
      if (isThumbnailImg(elClicked) === false) { return; }
      _displaySelectedImage(elClicked);
    });
  }

  function _hideModal () {
    // console.log('_hideModal()');

    if (modalIsShowing === false) { return; }
    modalIsShowing = false;

    modalBackdrop.addEventListener('transitionend', () => {
        modalBackdrop.style.display = 'none';
      }, { once: true }
    );
    carouselModal.addEventListener('transitionend', () => {
        carouselModal.style.display = 'none';
      }, { once: true }
    );

    modalBackdrop.classList.remove('show');
    carouselModal.classList.remove('show');
    document.body.classList.remove('cmodal-open');
  }

  // respond to events intended to hide modal
  function _listenForHideModalEvents () {

    // click on modal close button
    closeButton.addEventListener('click', (evt) => {
      // console.log('close button click');
      _hideModal();
    });

    // click on modal backdrop
    modalBackdrop.addEventListener('click', () => {
      // console.log('modalBackdrop click');
      _hideModal();
    });

    // ESC key pressed anywhere
    document.addEventListener('keyup', evt => {
      if (evt.key === 'Escape') {
        // console.log('ESC key pressed');
        _hideModal();
      }
    });
  }

  // update the "selected" class of each thumbnail image
  function _updateThumbnailsSelectedClass (thumbnails, carouselIndex) {
    const cIndex = Number(carouselIndex);
    let thumbSelected = null;
    thumbnails.forEach(img => {
      const thumbIndex = +(img.dataset.index);
      if (thumbIndex === cIndex) {
        thumbSelected = img;
        thumbSelected.classList.add('selected');
        return;
      }
      img.classList.remove('selected');
    });
    return thumbSelected;
  }

  // scroll viewport using vanilla JavaScript
  // (use on browsers like Safari that don't support smooth scrolling)
  function _vpScrollJavaScript (scrollDest) {
    // simulate scroll feature with vanilla JavaScript
    const timeStep = 20;
    const timeTotal = 400;
    const stepsTotal = Math.round(timeTotal/timeStep);
    const scrollStart = thumbnailsViewport.scrollLeft;
    const scrollTotal = scrollDest - scrollStart;
    const scrollStep = Math.round(scrollTotal/stepsTotal);
    let time = timeStep, scroll = scrollStart + scrollStep;

    const _scrollRecursive = () => {
      if (time >= timeTotal) {
        thumbnailsViewport.scrollLeft = scrollDest;
        return;
      }
      thumbnailsViewport.scrollLeft = scroll;
      time += timeStep;
      scroll += scrollStep;
      setTimeout(_scrollRecursive, timeStep);
    }

    if (scrollTotal !== 0) { _scrollRecursive(); }
  }

  /**
   * scroll thumbnails viewport to show `thumbnailImg` in center of window
   * @param {HTMLImageElement} thumbnailImg - thumbnail's img element
   */
  function _scrollThumbnailsViewport (thumbnailImg) {
    if (!thumbnailImg) { return; }
    const viewportWidth = thumbnailsViewport.scrollWidth;
    const vpStyle = getComputedStyle(thumbnailsViewport);
    const vpPaddingLeft = parseFloat(vpStyle.paddingLeft);
    const windowWidth = thumbnailsViewport.clientWidth;
    const scrollMax = viewportWidth - windowWidth;
    const tnParent = thumbnailImg.parentElement; // thumbnailImg parent is button
    const tnStyle = getComputedStyle(tnParent);
    const tnWidth = tnParent.offsetWidth
      + parseFloat(tnStyle.marginLeft) + parseFloat(tnStyle.marginRight);
    const thumbnailCenterOffset = tnParent.offsetLeft
      + (tnParent.offsetWidth / 2);

    // console.log(`    viewportWidth: ${thumbnailsViewport.scrollWidth}
    // vpPaddingLeft: ${vpPaddingLeft}
    // windowWidth: ${windowWidth}
    // scrollMax: ${scrollMax}
    // tnParent.offsetLeft: ${tnParent.offsetLeft}
    // tnParent.offsetWidth: ${tnParent.offsetWidth}
    // tnWidth: ${tnWidth}
    // thumbnailCenterOffset: ${thumbnailCenterOffset}`);

    // scroll viewport to position thumbnail in center of viewport window
    let newScrollLeft = thumbnailCenterOffset
      - Math.round((windowWidth+tnWidth) / 2) + vpPaddingLeft;
    if (newScrollLeft < 0) { newScrollLeft = 0; }
    if (newScrollLeft > scrollMax) { newScrollLeft = scrollMax; }

    // console.log(`  newScrollLeft: ${newScrollLeft}`);

    if (_hasSmoothScrolling(thumbnailsViewport)) {
      // console.log('scrolling with Element.scrollLeft = newScrollLeft');
      thumbnailsViewport.scrollLeft = newScrollLeft;
    } else {
      _vpScrollJavaScript(newScrollLeft);
    }

    // console.log(`after scrollLeft: ${thumbnailsViewport.scrollLeft}`);
  }

  /**
   * populate overlay with name, carousel and thumbnail images
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
      const displaySave = carouselModal.style.display;
      carouselModal.style.display = 'block';

      pHeader.innerHTML = name;

      // detect aspect ratio of image when it receives a 'load' event
      let imagesLoaded = 0;
      let aspectRatioMin = Infinity;

      // evaluate each image onload
      function _evalLoadedImage () {
        const img = this;
        const imgAspectRatio = (img.height > 0) ? img.width / img.height : null;

        imagesLoaded++;
        if (imgAspectRatio === null) { return; }

        img.dataset.aspectRatio = String(imgAspectRatio);
        aspectRatioMin = (imgAspectRatio < aspectRatioMin) ?
          imgAspectRatio : aspectRatioMin;

        // console.log(`_evalLoadedImage index: ${img.dataset.index}, imgAspectRatio: ${imgAspectRatio}, min: ${aspectRatioMin}`);

        if (imagesLoaded < hrefsCount) { return; }
        if (aspectRatioMin === Infinity) { return; }

        // all images loaded: set the padding-bottom of container to match aspect
        // ratio
        carouselContainer.style.paddingBottom = Math.round(
          1.0 / aspectRatioMin * 100
        ) + '%';
        carouselContainer.dataset.aspectRatio = String(aspectRatioMin);

        const contentAspectRatio =
          modalContent.offsetWidth / modalContent.offsetHeight;
        modalDialog.style.maxWidth = `calc(-30px + ${
          Math.round(contentAspectRatio * 100)
        }vh)`;

        // restore the modal's display state
        carouselModal.style.display = displaySave;

        // all images loaded, mark as completed and resolve the promise
        completed = true;
        resolve();
      }

      // populate the thumbnails
      thumbnailsViewport.innerHTML = '';
      thumbnailImages = hrefs.map((href, index) => {
        const btnThumb = document.createElement('button');
        thumbnailsViewport.appendChild(btnThumb);

        const imgThumb = document.createElement('img');
        imgThumb.onload = _evalLoadedImage;
        imgThumb.dataset.index = String(index);
        imgThumb.src = href;
        if (titles !== null) {
          imgThumb.alt = imgThumb.title = titles[index];
        }
        btnThumb.appendChild(imgThumb);

        return imgThumb;
      });
      firstThumbnail = thumbnailsViewport.querySelector('img');

      // show thumbnails when there are multiple images
      const hasMultipleImages = hrefsCount > 1;
      modalFooter.style.display = hasMultipleImages ? '' : 'none';

      // set a timeout in case images don't load
      setTimeout(() => {
        if (completed) { return; }
        // reject with an error message
        const errmsg = `unable to load some images, expected ${hrefsCount}` +
          `, loaded ${imagesLoaded}`;
        reject(errmsg);
      }, 2000);

    });
  }

  // show the carousel modal
  function show () {

    // console.log('show()');

    if (modalIsShowing) { return; }

    // make the display changes *before* showing the modal
    if (firstThumbnail === null) {
      console.error('no thumbnail images found');
      return;
    }
    _displaySelectedImage(firstThumbnail, false);


    // wait for backdrop to complete before showing modal
    // modalBackdrop.addEventListener('transitionend', () => {
    //     carouselModal.classList.add('show');
    //     document.body.classList.add('cmodal-open');
    //     modalIsShowing = true;
    //   }, { once: true }
    // );

    modalBackdrop.style.display = 'block';
    carouselModal.style.display = 'block';

    setTimeout(() => {
      carouselModal.classList.add('show');
      modalBackdrop.classList.add('show');
      document.body.classList.add('cmodal-open');
      modalIsShowing = true;
    }, 200);
  }


  function _init () {
    _applyUserEditsToCSSProps();
    _applyCSSPropsToStyleSheet();
    _appendStyleSheetToHead();
    _appendHTMLTemplateToBody();
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
