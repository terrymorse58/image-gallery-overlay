// carousel overlay modal with thumbnails
import CSSTemplate from './CSSTemplate.js';
import CSSEditableProps from './CSSEditableProps.js';
import HTMLTemplate from './HTMLTemplate.js';

function OverlayCarousel (userEditsToCSSProps) {

  // make copies of templates
  const editableCSSProps = JSON.parse(JSON.stringify(CSSEditableProps));
  let styleSheet = CSSTemplate.slice(0);

  let carouselModal,
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
    thumbnailImages = [],
    modalFooter,
    modalIsShowing = false;


  // returns true if element supports smooth scrolling
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

    carouselModal = document.getElementById('carouselModal');
    modalBackdrop = document.querySelector('.cmodal-backdrop');
    modalDialog = document.querySelector('.cmodal-dialog');
    modalContent = document.querySelector('.cmodal-content');
    modalHeader = document.querySelector('.cmodal-header');
    pHeader = carouselModal.querySelector('.cmodal-header p');
    closeButton = modalHeader.querySelector('button.close');
    modalBody = carouselModal.querySelector('.cmodal-body');
    carouselContainer = document.getElementById('carousel-container');
    imgHero = document.getElementById('carousel-hero');
    imgOverlay = document.getElementById('carousel-overlay');
    overlayDiv = document.querySelector('.carousel-overlay-div');
    thumbnailsViewport = document.getElementById('thumbnails-viewport');
    modalFooter = carouselModal.querySelector('.cmodal-footer');

    // set up the overlay fader
    overlayDiv.addEventListener('transitionend', _completeImageFade);

    // react to hero image changes
    imgHero.addEventListener('change', () => {
      const heroIndex = Number(imgHero.dataset.index);

      // set (unset) the selected class for each thumbnail image
      const thumbSelected = _updateThumbnailsSelectedClass(
        thumbnailImages, heroIndex);

      // scroll the thumbnails container
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
    // console.log(`_displaySelectedImage(imgIndex=${thumbnailImg.dataset.index},` +
    // ` animate=${animate})`);

    // don't animate if overlay is still in transition from an
    // earlier change
    if (overlayDiv.dataset.inTransition === "true") {
      // console.log('overlay in transition, disabling fade');
      overlayDiv.dataset.inTransition = "false";
      overlayDiv.classList.remove('carousel-fade-in');
      animate = false;
    }

    // dispatch 'change' event to hero image, which will update thumbnails
    imgHero.dataset.index = thumbnailImg.dataset.index;
    const changeEvt = new Event('change');
    imgHero.dispatchEvent(changeEvt);

    Object.assign(imgOverlay, {
      src: thumbnailImg.src,
      alt: thumbnailImg.alt,
      title: thumbnailImg.title
    });
    imgOverlay.dataset.index = thumbnailImg.dataset.index;

    if (animate === false) {
      // just clean up without animation
      _completeImageFade();
      return;
    }

    // fade in overlay
    // console.log('_displaySelectedImage fading in overlay');
    _imageInTransition = true;
    overlayDiv.dataset.inTransition = 'true';
    overlayDiv.classList.add('carousel-fade-in');

    // add timeout in case 'transitionend' event is never received
    setTimeout(() => {
      if (_imageInTransition === false) { return; }
      // console.log('_displaySelectedImage transitionend timeout, calling' +
      //   ' _completeImageFade()');
      _completeImageFade();
    }, 1100);
  }

  // clean up display elements when image fade transition completes
  let _imageInTransition = false;
  function _completeImageFade () {
    // console.log('_completeImageFade() _imageInTranstion:', _imageInTransition);

    _imageInTransition = false;
    overlayDiv.dataset.inTransition = "false";

    // copy overlay image to hero image
    if (imgOverlay.src) {
      Object.assign(imgHero, {
        src: imgOverlay.src,
        alt: imgOverlay.alt,
        title: imgOverlay.title
      })
      imgHero.dataset.index = imgOverlay.dataset.index;
    }

    // clean up overlay (delayed to prevent UI flash)
    setTimeout(() => {
      Object.assign(imgOverlay, {
        src: "",
        alt: "",
        title: ""
      });
      imgOverlay.removeAttribute('data-index');
      overlayDiv.classList.remove('carousel-fade-in');
    }, 250);
  }

  // enter key press over thumbnail button emit thumbnail image click
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

    if (modalIsShowing === false) { return; }
    modalIsShowing = false;

    modalBackdrop.addEventListener('transitionend', () => {
      // console.log('modalBackdrop hide transitionend');
        modalBackdrop.style.display = 'none';
      }, { once: true }
    );
    carouselModal.addEventListener('transitionend', () => {
      // console.log('carouselModal hide transitionend');
        carouselModal.style.display = 'none';
      }, { once: true }
    );

    modalBackdrop.classList.remove('show');
    carouselModal.classList.remove('show');
    document.body.classList.remove('cmodal-open');
  }

  // respond to clicks on close button
  function _listenForCloseModalEvents () {

    closeButton.addEventListener('click', (evt) => {
      // console.log('close button click');
      _hideModal();
    });

    modalBackdrop.addEventListener('click', () => {
      // console.log('modalBackdrop click');
      _hideModal();
    });

    // ESC key
    document.addEventListener('keyup', evt => {
      if (evt.key === 'Escape') {
        // console.log('ESC key pressed');
        _hideModal();
      }
    })
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

  // populate overlay with name, carousel and thumbnail images
  function populate (name, hrefs, titles = null) {
    // console.log('populate()')

    // display the modal (invisibly) to obtain its dimensions
    carouselModal.style.display = 'block';

    pHeader.innerHTML = name;

    // detect aspect ratio of image when it receives a 'load' event
    let imagesLoaded = 0;
    let aspectRatioMin = Infinity;
    function _evalLoadedImage () {
      const img = this;
      let aspectRatio;

      imagesLoaded++;
      if (img.width === 0 || img.height === 0) { return; }

      aspectRatio = img.width / img.height;
      img.dataset.aspectRatio = aspectRatio;
      aspectRatioMin = (aspectRatio < aspectRatioMin)
        ? aspectRatio : aspectRatioMin;

      // console.log(`_evalLoadedImage index: ${img.dataset.index}, aspectRatio: ${aspectRatio}, min: ${aspectRatioMin}`);

      if (imagesLoaded < hrefs.length) { return; }
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

      // console.log(`  modalContent.offsetWidth: ${modalContent.offsetWidth}
      //   modalContent.offsetHeight: ${modalContent.offsetHeight}
      //   aspectRatioMin: ${aspectRatioMin}
      //   contentAspectRatio: ${contentAspectRatio}
      //   modalDialog.style.maxWidth: ${modalDialog.style.maxWidth}`);

      // un-display the modal
      carouselModal.style.display = "none";
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

    // show thumbnails when there are multiple images
    const hasMultipleImages = hrefs.length > 1;
    modalFooter.style.display = hasMultipleImages ? '' : 'none';

  }

  // show the carousel modal
  function show () {

    // console.log('show()');

    if (modalIsShowing) { return; }

    overlayDiv.dataset.inTransition = "false";

    // make the display changes *before* showing the modal
    const firstThumb = thumbnailsViewport.querySelector('img');
    if (firstThumb === null) {
      console.error('no thumbnail images found');
      return;
    }
    _displaySelectedImage(firstThumb, false);


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
    _listenForCloseModalEvents();
  }

  // initialize
  _init();

  return {
    populate,
    show
  };

}

export default OverlayCarousel;
