# image-gallery-overlay
---
A responsive overlay component with a single gallery image and
scrolling list of clickable thumbnail images.
 
![image-gallery-overlay](https://terrymorse.com/public/bootstrap-carousel-modal.gif "Sample image gallery")
 
### Features ###
 
 + produces largest images possible without scrolling
 + responds to window width and height changes
 + matches aspect ratio of supplied images
 + cross fades image changes
 + scrolls thumbnail images smoothly
 + enables accessibility from keyboard
 
### Demo ###
 
 A live demo is available at
 [terrymorse.com](https://terrymorse.com/private/modalcarousel/index.html).
 
### Install ###

 ```text
npm install image-gallery-overlay
```
or
```text
git clone https://github.com/terrymorse58/image-gallery-overlay
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
<script src="<path_to>/carousel.bundle.js"></script>
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
//   imageTitles - array of strings that describe each image (optional)
carousel.populate(name, imageURLs, imageTitles)
  .then(() => {
    // show the overlay after all images have loaded
    carousel.show();
});

```
### Style Options ###

The default styling of the overlay may be modified with `styleOptions`, passed
 into `OverlayCarousel()`. Here are the default options:

```javascript
// default style options
const defaultStyleOptions = {
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
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
