// carousel overlay modal with thumbnails
import CSSTemplate from './CSSTemplate.js';
import CSSEditableProps from './CSSEditableProps.js';
import HTMLTemplate from './HTMLTemplate.js';

function OverlayCarousel (userEditsToCSSProps) {

  const editableCSSProps = JSON.parse(JSON.stringify(CSSEditableProps));
  let styleSheet = CSSTemplate.slice(0);

  let carouselModal,
    pHeader,
    imgHero,
    imgOverlay,
    carouselFooter,
    thumbnailsViewport,
    thumbnailImages = [];

  // apply user edits to editable css props
  function applyUserEditsToCSSProps () {
    if (typeof userEditsToCSSProps === 'undefined') { return; }
    for (const [propName, value] of Object.entries(userEditsToCSSProps)) {
      if (typeof editableCSSProps[propName] === 'undefined') { continue; }
      editableCSSProps[propName] = value;
    }
  }

  // apply all css props to styleSheet
  function applyCSSPropsToStyleSheet () {
    for (const [propName, value] of Object.entries(editableCSSProps)) {
      const searchStr = `{{${propName}}}`;
      const subStr = `${value}`;
      styleSheet = styleSheet.replace(searchStr, subStr);
    }
  }

  // append HTML template to <body>
  function appendHTMLTemplateToBody () {
    const div = document.createElement('div');
    div.id = "carousel-modal-container";
    div.innerHTML = HTMLTemplate;
    document.body.appendChild(div);

    carouselModal = document.getElementById('carouselModal');
    pHeader = carouselModal.querySelector('.modal-header p');
    imgHero = document.getElementById('carousel-hero');
    imgOverlay = document.getElementById('carousel-overlay');
    thumbnailsViewport = document.getElementById('thumbnails-viewport');
    carouselFooter = carouselModal.querySelector('.modal-footer');

    // set up the image fade
    imgOverlay.addEventListener('transitionend', completeImageFade);

    // react to hero image changes
    imgHero.addEventListener('change', () => {
      const heroIndex = Number(imgHero.dataset.index);

      // get all the thumbnail images
      // const thumbImgs = getAllThumbnails();

      // set (unset) the selected class for each thumbnail image
      const thumbSelected = updateThumbnailsSelectedClass(
        thumbnailImages, heroIndex);

      // scroll the thumbnails container
      scrollThumbnailsViewport(thumbSelected);
    });
  }

  // append style sheet to <head>
  function appendStyleSheetToHead () {
    const style = document.createElement('style');
    style.innerHTML = styleSheet;
    document.head.appendChild(style);
  }

  // populate overlay with name, carousel and thumbnail images
  function populate (name, hrefs) {
    pHeader.innerHTML = name;

    // populate the carousel and the thumbnails
    thumbnailsViewport.innerHTML = '';
    thumbnailImages = hrefs.map((href, index) => {
      const btnThumb = document.createElement('button');
      thumbnailsViewport.appendChild(btnThumb);

      const imgThumb = document.createElement('img');
      imgThumb.dataset.index = index;
      imgThumb.src = href;
      btnThumb.appendChild(imgThumb);

      return imgThumb;
    });

    // show thumbnails when there are multiple images
    const hasMultipleImages = hrefs.length > 1;
    carouselFooter.style.display = hasMultipleImages ? '' : 'none';
  }

  // show the carousel modal
  function show () {

    imgOverlay.dataset.inTransition = "false";

    // make the display changes *before* showing the modal
    const firstThumb = thumbnailsViewport.querySelector('img');
    if (firstThumb === null) {
      console.error('no thumbnail images found');
      return;
    }
    displaySelectedImage(firstThumb, false);

    $('#carouselModal').modal('show');
  }

  /**
   * display in hero image the selected thumbnail image
   * @param {Element} thumbnailImg
   * @param {boolean} animate - animate the hero image transition
   */
  function displaySelectedImage (thumbnailImg, animate = true) {

    // don't change hero image if it is still in transition from an
    // earlier change
    if (imgOverlay.dataset.inTransition === "true") {
      console.error('hero image in transition, cannot change now');
      return;
    }

    // dispatch 'change' event to hero image, which will update thumbnails
    imgHero.dataset.index = thumbnailImg.dataset.index;
    const changeEvt = new Event('change');
    imgHero.dispatchEvent(changeEvt);

    imgOverlay.src = thumbnailImg.src;
    imgOverlay.dataset.index = thumbnailImg.dataset.index;

    if (animate) {
      // bring overlay to front and fade it in
      imgOverlay.dataset.inTransition = "true";
      imgOverlay.style.zIndex = "100";
      imgOverlay.classList.add('carousel-fade-in');
    } else {
      // just clean up without animation
      completeImageFade();
    }
  }

  // clean up display elements when image fade transition completes
  function completeImageFade () {

    // copy overlay image to hero image
    imgHero.src = imgOverlay.src;

    // send overlay to back and clean up
    imgOverlay.style.zIndex = "-1000";
    imgOverlay.src = "";
    imgOverlay.dataset.index = null;
    imgOverlay.dataset.inTransition = "false";
    if (imgOverlay.classList.contains('carousel-fade-in')) {
      imgOverlay.classList.remove('carousel-fade-in');
    }
  }

  // enter key press over thumbnail button emit thumbnail image click
  function listenForEnterKeyOverButton () {
    thumbnailsViewport.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') { return; }
      const elem = e.target;
      if (elem.tagName !== 'BUTTON') { return; }
      const btnImg = elem.firstChild;
      if (!btnImg || btnImg.tagName !== 'IMG') { return; }
      btnImg.click();
    });
  }

  // respond to clicks on thumbnail images inside 'div-thumbnails'
  function listenForThumbnailImageClicks () {
    thumbnailsViewport.addEventListener('click', (evt) => {
      const elClicked = evt.target;
      const isThumbnailImg = (el) => el.tagName === 'IMG'
        && typeof el.dataset.index !== 'undefined';
      if (isThumbnailImg(elClicked) === false) { return; }
      displaySelectedImage(elClicked);
    });
  }

  // update the "selected" class of each thumbnail image
  function updateThumbnailsSelectedClass (thumbnails, carouselIndex) {
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

  /**
   * scroll thumbnails viewport to show `thumbnail` in center of window
   * @param {Element} thumbnail
   */
  function scrollThumbnailsViewport (thumbnail) {
    if (!thumbnail) { return; }
    const windowHalfWidth = Math.round(thumbnailsViewport.clientWidth / 2);
    const tStyle = window.getComputedStyle(thumbnail);
    const thumbnailWidth = thumbnail.offsetWidth
      + parseFloat(tStyle.marginLeft) + parseFloat(tStyle.marginRight);
    const thumbnailCenterPosInViewport = thumbnail.offsetLeft
      + (thumbnail.offsetWidth / 2);

    // scroll to place thumbnail in center of viewport window
    const scrollAmount = thumbnailCenterPosInViewport
      - windowHalfWidth - (thumbnailWidth / 2);

    const divThumbnails = $('#thumbnails-viewport');
    if (divThumbnails.animate) {
      // console.log('scrollThumbnailsViewport using jQuery.animate()');
      divThumbnails.animate({
        scrollLeft: scrollAmount
      }, 500);
    } else if (divThumbnails.scrollLeft) {
      console.log('scrollThumbnailsViewport using fallback scrollLeft()');
      divThumbnails.scrollLeft(scrollAmount);
    } else {
      console.log('scrollThumbnailsViewport using fallback scroll()');
      divThumbnails.scroll(scrollAmount, 0);
    }
  }

  function init () {
    applyUserEditsToCSSProps();
    applyCSSPropsToStyleSheet();
    appendHTMLTemplateToBody();
    appendStyleSheetToHead();
    listenForThumbnailImageClicks();
    listenForEnterKeyOverButton();
  }

  // initialize
  init();

  return {
    populate,
    show
  };

}

export default OverlayCarousel;
