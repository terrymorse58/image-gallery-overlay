# bootstrap-carousel-modal
---
A Bootstrap modal dialog with a single carousel image and
scrolling list of clickable thumbnail images.
 
![bootstrap-carousel-modal](https://terrymorse.com/public/bootstrap-carousel-modal.gif "Sample
 carousel modal")
 
 ### Features ###
 
 + produces largest images possible without scrolling
 + responds to window width and height changes
 + matches aspect ratio of supplied images
 + cross fades image changes
 + scrolls thumbnail images smoothly
 + enables accessibility from keyboard
 
 ### Demo ###
 
 A [live working demo](https://terrymorse.com/private/modalcarousel/index.html) is available.
 
 ### Install ###
 ```text
npm install bootstrap-carousel-modal
```
or
```text
git clone https://github.com/terrymorse58/bootstrap-carousel-modal
```

### Bootstrap Requirement ###
For proper operation, the default Bootstrap CSS and scripts must be loaded:
```html
<!-- Bootstrap CSS -->
<link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

<!-- JavaScript for Bootstrap -->
<script src="//code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="//stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

```

 ### Loading ###
As an ES6 module:
 ```html
<script type="module">
  import OverlayCarousel from '<path_to>/carousel.js';
</script>
```

As a bundled JavaScript classic script:
```html
<script src="<path_to>/carousel.build.js"></script>
<script>
  const OverlayCarousel = OLCarousel.default;
</script>
```

### Usage ###
```javascript
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

The styling may be modified with `styleOptions`, passed into `OverlayCarousel
()`. Here are the default options:

```javascript
// default style options
const defaultStyleOptions = {
  headerPadding: '0.25rem 1rem',
  headerParagraphMargin: '0',
  footerPadding: '0 1rem',
  thumbnailBtnPadding: '4px',
  thumbnailBtnMargin: '0 6px', /* must be 'px' units */
  thumbnailImgHeight: '60px',
  thumbnailImgHoverFilter: 'brightness(90%)',
  thumbnailBorder: 'none',
  thumbnailImgSelectedBorder: '1px solid #888',
  thumbnailSelectedOpacity: '60%',
  thumbnailSelectedFilter: 'grayscale(100%) blur(1px)'
};
```
