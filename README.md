# image-gallery-overlay
---
A responsive overlay Web Component with a single gallery image and
scrolling list of clickable thumbnail images.
 
![image-gallery-overlay](docs/image-gallery-animated-400x300.gif 
"image-gallery-overlay")
 
### Features ###
 
 + self-contained Web Component
 + displays largest images possible without scrolling
 + responsive to window width and height changes
 + dimensions match aspect ratio of supplied images
 + changes images via cross fading
 + scrolls thumbnail images smoothly
 + enables accessibility from keyboard (tab, enter, esc)
 + vanilla JavaScript with no dependencies
 + exposed styles for easy styling changes
 
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
 
As a bundled JavaScript classic script:
```html
<script src="<path_to>/image-gallery.bundle.js"></script>
<!-- or to CDN -->
<script
  src="https://cdn.jsdelivr.net/npm/image-gallery-overlay@1.4.0/dist/js/image-gallery.bundle.js"></script>

<script>
  const Gallery = IGOverlay.default;
</script>
```

### Usage ###
```javascript
// create a new gallery instance
const gallery = new Gallery(styleOptions);

// populate the gallery  with a name and images
//   name - text shown at the top of the modal
//   imageURLs - array of url strings 
//   imageTitles - array of strings that describe each image (optional)
gallery.populate(name, imageURLs, imageTitles)
  .then(() => {
    // show the overlay after all images have loaded
    carousel.show();
  })
  .catch(err => { 
    // handle errors (typically image(s) did not load)
  });
```
### Style Options ###

The default styling of the overlay may be modified with `styleOptions`, passed
 into `Gallery()`. Here are the default options:

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
