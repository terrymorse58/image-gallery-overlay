// test suite for carousel.js

import * as fs from 'fs';
const path = require('path');
import * as Mock from './carousel.mock.js';
import { it, test } from '@jest/globals';

document.head.innerHTML = Mock.mockHead;
document.body.innerHTML = Mock.mockBody;

// add bootstrap style sheet into head
const cssPath = path.join(__dirname, 'bootstrap.min.css');
const bootstrapCSS = fs.readFileSync(
  cssPath,
  'utf8'
);
const bsStyle = document.createElement('style');
bsStyle.innerHTML = bootstrapCSS;
bsStyle.id = "bootstrap-css";
document.head.appendChild(bsStyle);

// import jquery
const $ = require('jquery');
window.jquery = window.$ = $;

// import Popper
import Popper from 'popper.js';
window.Popper = Popper;

// import bootstrap.js
// (bootstrap appends all of its methods to jquery)
require('bootstrap');

// import carousel
import Carousel from '../carousel.js';
let carousel = new Carousel({
  headerPadding: '0.5rem 1rem'
});

// populate carousel with name and images
carousel.populate(Mock.productName, Mock.imageHrefs);

// show the modal
carousel.show();

// start testing

test('bootstrap css added to head', () => {
  const style = document.getElementById('bootstrap-css');
  expect(style).not.toBeNull();
  expect(style.innerHTML.length).toBeGreaterThan(0);
});

test('jquery loaded', () => {
  const jq = window.$;
  expect(typeof jq).toEqual('function');
});

test('Popper loaded', () => {
  const popper = window.Popper;
  expect(typeof popper).toEqual('function');
});

test('bootstrap js loaded', () => {
  const bsFunction = $().modal;
  expect(typeof bsFunction).toEqual('function');
});

test('carousel.js loaded', () => {
  expect(typeof Carousel).toEqual('function');
});

test('carousel methods populate() and show() exist', () => {
  expect(typeof (carousel.populate)).toEqual('function');
  expect(typeof (carousel.show)).toEqual('function');
});



test('carousel css added to head', () => {
  const style = document.getElementById('carousel-style');
  expect(style).not.toBeNull();
  expect(style.innerHTML.length).toBeGreaterThan(0);
});

test('modal template added to body', () => {
  const template = document.getElementById('carousel-modal-container');
  expect(template).not.toBeNull();
  expect(template.innerHTML.length).toBeGreaterThan(0);
});

test(`"${Mock.productName}" added to modal header`, () => {
  const pName = document.querySelector(
    '#carousel-modal-container .modal-header p');
  expect(pName).not.toBeNull();
  expect(pName.innerHTML.length).not.toBe(0);
  expect(pName.innerHTML.valueOf()).toEqual(Mock.productName.valueOf());
});

test(`modal footer has ${Mock.imageHrefs.length} images`,
  (done) => {
    setTimeout(() => {
      const thumbnailsViewport = document.getElementById(
        'thumbnails-viewport'
      );
      expect(thumbnailsViewport).not.toBeNull();
      expect(thumbnailsViewport.childElementCount)
        .toEqual(Mock.imageHrefs.length);
      done();
    }, 1000);
  });

test('show method opens modal', (done) => {
  setTimeout(() => {
    const body = document.querySelector('.modal-open');
    expect(body.tagName).toEqual('BODY');
    const modal = document.getElementById('carouselModal');
    expect(modal.style.display).toEqual('block');
    done();
  }, 1000);
})
