# bootstrap-carousel-modal
---
A Bootstrap modal dialog with a single carousel image and
scrolling list of clickable thumbnail images.
 
![bootstrap-carousel-modal](https://terrymorse.com/public/bootstrap-carousel-modal.png "Sample
 carousel modal")
 ### Install ###
 ```text
npm install bootstrap-acrousel-modal
```
or
```text
git clone https://github.com/terrymorse58/bootstrap-carousel-modal
```
 ### Usage ###
 ```javascript
import OverlayCarousel from '<path_to>/carousel.js';

// create a carousel instance
const carousel = new OverlayCarousel(styleOptions);

// populate the carousel modal with a name and images
//   name - text shown at the top of the modal
//   imageURLs - array of url strings 
carousel.populate(name, imageURLs);

// show the modal
carousel.show();
```
### Style Options ###

```javascript
// default style options
const defaultStyleOptions = {
  modalMaxWidth: '400px',
  headerPadding: '0.25rem 1rem',
  headerParagraphMargin: '0',
  footerPadding: '0 1rem',
  thumbnailBtnPadding: '4px',
  thumbnailBtnMargin: '0 6px',
  thumbnailImgHeight: '60px',
  thumbnailImgHoverFilter: 'brightness(90%)',
  thumbnailBorder: 'none',
  thumbnailImgSelectedBorder: '1px solid #888',
  thumbnailSelectedOpacity: '60%',
  thumbnailSelectedFilter: 'grayscale(100%) blur(1px)'
};
```
