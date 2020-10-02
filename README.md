# bootstrap-carousel-modal
---
A Bootstrap modal dialog with a single carousel image and
scrolling list ofclickable thumbnail images.
 
![bootstrap-carousel-modal](https://terrymorse.com/public/bootstrap-carousel-modal.png "Sample
 carousel modal")
 ### Usage ###
 
 ```javascript
import OverlayCarousel from './carousel.js';

const carousel = new OverlayCarousel(styleOptions);
carousel.populate(name, imageURLs);
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
