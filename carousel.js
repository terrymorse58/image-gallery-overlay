// carousel overlay modal

import CSSTemplate from './CSSTemplate.js';
import CSSEditableProps from './CSSEditableProps.js';
import HTMLTemplate from './htmltemplate.js';

function OverlayCarousel (userEditsToCSSProps) {

  // console.log('OverlayCarousel userEditsToCSSProps:', userEditsToCSSProps);

  let css = CSSTemplate.slice(0);
  let cssEdProps = JSON.parse(JSON.stringify(CSSEditableProps));

  // apply passed in user edits to css props
  function applyUserEditsToCSSProps () {
    console.log('applyUserEditsToCSSProps()');
    if (typeof userEditsToCSSProps === 'undefined') { return; }
    for (const [propName, value] of Object.entries(userEditsToCSSProps)) {
      if (typeof cssEdProps[propName] === 'undefined') { continue; }
      cssEdProps[propName].value = value;
    }
  }

  // apply all css props to css
  function applyCSSPropsToCSS () {
    for (const [propName, prop] of Object.entries(cssEdProps)) {
      const searchStr = `{{${propName}}}`;
      const subStr = `${prop.property}: ${prop.value};`;
      css = css.replace(searchStr, subStr);
    }
  }

  // append HTML template to end of <body>
  function appendTemplateToBody () {
    const div = document.createElement('div');
    div.id = "carousel-modal-container";
    div.innerHTML = HTMLTemplate;
    document.body.appendChild(div);

    // listen for carousel changes then update the DOM
    $('.carousel').on('slide.bs.carousel', (evt) => {
      const carouselIndex = Number(
        evt.relatedTarget.getAttribute('data-index')
      );

      // get all the thumbnail images
      const thumbImgs = getAllThumbnails();

      // set (unset) the selected class for each thumbnail image
      const thumbSelected = updateThumbnailsSelectedClass(
        thumbImgs, carouselIndex);

      // scroll the thumbnails container
      scrollThumbnailsContainer(thumbSelected);
    });
  }

  // append style sheet to <head>
  function appendCSSToHead () {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
  }

  // populate overlay with name, carousel and thumbnail images
  function populate (name, hrefs) {
    const pHeader = document.querySelector(
      '.wsi-overlay .modal-header p');
    const carouselInner = document.querySelector(
      '.wsi-overlay .carousel-inner');
    const thumbnails = document.querySelector(
      '.wsi-overlay .div-thumbnails');

    pHeader.innerHTML = name;

    // populate the carousel and the thumbnails
    carouselInner.innerHTML = '';
    thumbnails.innerHTML = '';
    hrefs.forEach((href, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      if (index === 0) { carouselItem.classList.add('active'); }
      carouselItem.dataset.index = index;
      carouselInner.appendChild(carouselItem);

      const img = document.createElement('img');
      img.src = href;
      img.alt = name;
      img.className = 'img-fluid';
      carouselItem.appendChild(img);

      const imgThumb = document.createElement('img');
      imgThumb.role = 'button';
      imgThumb.dataset.index = index;
      imgThumb.src = href;
      thumbnails.appendChild(imgThumb);
    });

    // show thumbnails if there are multiple images
    const footer = document.querySelector('.wsi-overlay .modal-footer');
    const hasMultipleImages = hrefs.length > 1;
    footer.style.display = hasMultipleImages ? '' : 'none';
  }

  // show the carousel modal
  function show () {
    $('#carouselModal').modal('show');
    // mark the first thumbnail image as selected
    const firstThumb = document.querySelector('.div-thumbnails img');
    if (firstThumb === null) {
      console.error('no thumbnail images found');
      return;
    }
    firstThumb.classList.add('selected');
    //display the first image
    displaySelectedImage(firstThumb);

    // listen for thumbnail clicks
    listenForThumbnailClicks();
  }

  // display in carousel the selected thumbnail image
  function displaySelectedImage (thumbnailImg) {
    const imgIndex = Number(thumbnailImg.getAttribute('data-index'));
    $('.carousel').carousel(imgIndex);
  }

  // respond to clicks on thumbnail images inside 'div-thumbnails'
  function listenForThumbnailClicks () {
    const divThumbnails = document.querySelector('.div-thumbnails');
    divThumbnails.addEventListener('click', (evt) => {
      const elClicked = evt.target;
      const isThumbnailImg = (el) => el.tagName === 'IMG'
        && typeof el.dataset.index !== 'undefined';
      if (isThumbnailImg(elClicked) === false) { return; }
      displaySelectedImage(elClicked);
    });
  }

  // get all thumbnail images
  function getAllThumbnails () {
    return Array.from(
      document.querySelectorAll('.div-thumbnails img')
    );
  }

  // update the "selected" class of all thumbnails
  function updateThumbnailsSelectedClass (thumbnails, carouselIndex) {
    let thumbSelected = null;
    thumbnails.forEach(img => {
      const thumbIndex = Number(img.getAttribute('data-index'));
      img.classList.remove('selected');
      if (thumbIndex === carouselIndex) {
        thumbSelected = img;
      }
    });
    if (thumbSelected) {
      thumbSelected.classList.add('selected');
    }
    return thumbSelected;
  }

  /**
   * scroll the thumbnails container left or right, based on the selected
   * thumbnail's position
   * @param {Element} thumb
   */
  function scrollThumbnailsContainer (thumb) {
    if (!thumb) { return; }
    const divThumb = document.querySelector('.div-thumbnails');
    const divMidpoint = Math.round(divThumb.clientWidth / 2);
    const divScroll = divThumb.scrollLeft;
    const tStyle = window.getComputedStyle(thumb);
    const tTotalWidth = thumb.offsetWidth
      + parseFloat(tStyle.marginLeft) + parseFloat(tStyle.marginRight);
    const thumbCenter = thumb.offsetLeft + (thumb.offsetWidth / 2);
    const centerOffset = thumbCenter - divScroll;

    // if thumbnail is centered, do not scroll
    const thumbnailIsCentered = () => {
      return centerOffset >= divMidpoint - (tTotalWidth / 2)
        && centerOffset <= divMidpoint + (tTotalWidth / 2);
    };
    if (thumbnailIsCentered()) {
      return;
    }

    const scrollAmount = Math.sign(centerOffset - divMidpoint)
      * tTotalWidth;

    // console.log(`  divScroll: ${divScroll}, thumbCenter: ${thumbCenter}, ` +
    // ` centerOffset: ${centerOffset}, scrollAmount: ${scrollAmount}`);

    const divThumbnails = $('.div-thumbnails');
    if (divThumbnails.animate) {
      // console.log('scrollThumbnailsContainer using animate()');
      divThumbnails.animate({
        scrollLeft: divThumb.scrollLeft + scrollAmount
      }, 500);
    } else if (divThumbnails.scrollLeft) {
      // console.log('scrollThumbnailsContainer using scrollLeft()');
      divThumbnails.scrollLeft(divThumb.scrollLeft + scrollAmount);
    } else {
      console.log('scrollThumbnailsContainer using fallback scroll()');
      divThumbnails.scroll(divThumb.scrollLeft + scrollAmount, 0);
    }
  }

  function init () {
    // console.log('carousel.js init()');
    applyUserEditsToCSSProps();
    applyCSSPropsToCSS();
    appendTemplateToBody();
    appendCSSToHead();
  }

  // initialize
  init();

  return {
    populate,
    show
  };

}

export default OverlayCarousel;
