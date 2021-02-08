// test suite for image-gallery.js

import * as fs from 'fs';
const path = require('path');
import * as Mock from './carousel.mock.js';
import { it, test } from '@jest/globals';

document.head.innerHTML = Mock.mockHead;
document.body.innerHTML = Mock.mockBody;

// add bootstrap style sheet into head
// const cssPath = path.join(__dirname, 'bootstrap.min.css');
// const bootstrapCSS = fs.readFileSync(
//   cssPath,
//   'utf8'
// );
// const bsStyle = document.createElement('style');
// bsStyle.innerHTML = bootstrapCSS;
// bsStyle.id = "bootstrap-css";
// document.head.appendChild(bsStyle);

// import jquery
// const $ = require('jquery');
// window.jquery = window.$ = $;

// import Popper
// import Popper from 'popper.js';
// window.Popper = Popper;

// import bootstrap.js
// (bootstrap appends all of its methods to jquery)
// require('bootstrap');

// import carousel
import Carousel from '../src/js/image-gallery.js';
let carousel = new Carousel({
  headerPadding: '0.5rem 1rem'
});

// populate carousel with name and images
// Note: populate promise will not resolve, because
// img.onload does nothing when running jest
carousel.populate(Mock.productName, Mock.imageHrefs)
  .then(() => {
    carousel.show();
  })
  .catch(err => {
    // catch will always happen, as img.onload does not work in jest
    // console.error('carousel.populate err:', err);
    carousel.show();
  });

// start testing

test('image-gallery.js loaded', () => {
  expect(typeof Carousel).toEqual('function');
});

test('carousel methods populate() and show() exist', () => {
  expect(typeof (carousel.populate)).toEqual('function');
  expect(typeof (carousel.show)).toEqual('function');
});



test('<gallery-overlay> exists', () => {
  const gOverlay = document.querySelector('gallery-overlay');
  expect(gOverlay).not.toBeNull();
});

test('gallery overlay has shadowRoot', () => {
  const gOverlay = document.querySelector('gallery-overlay');
  expect(gOverlay.shadowRoot).not.toBeNull();
});


test(`"${Mock.productName}" added to modal header`, () => {
  const gOverlay = document.querySelector('gallery-overlay');
  const shadowRoot = gOverlay.shadowRoot;
  const pName = shadowRoot.querySelector(
    '#carousel-modal-container .cmodal-header p');
  expect(pName).not.toBeNull();
  expect(pName.innerHTML.length).not.toBe(0);
  expect(pName.innerHTML.valueOf()).toEqual(Mock.productName.valueOf());
});

test(`modal footer has ${Mock.imageHrefs.length} images`,
  (done) => {
    setTimeout(() => {
      const gOverlay = document.querySelector('gallery-overlay');
      const shadowRoot = gOverlay.shadowRoot;
      const thumbnailsViewport = shadowRoot.querySelector(
        '.div-thumbnails'
      );
      expect(thumbnailsViewport).not.toBeNull();
      expect(thumbnailsViewport.childElementCount)
        .toEqual(Mock.imageHrefs.length);
      done();
    }, 3000);
  });

test('show method opens modal', (done) => {
  setTimeout(() => {
    const body = document.querySelector('.cmodal-open');
    const gOverlay = document.querySelector('gallery-overlay');
    const shadowRoot = gOverlay.shadowRoot;
    const modal = shadowRoot.querySelector('.cmodal');

    expect(body.tagName).toEqual('BODY');
    expect(modal.style.display).toEqual('block');
    done();
  }, 3000);
})
