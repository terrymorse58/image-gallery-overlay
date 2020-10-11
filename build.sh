#!/usr/bin/env bash
#
# Build for Image Carousel Modal
#
echo "Creating image carousel modal build folder..."
#
#
echo " "
echo "Copying .js files to build/js:"
cp -v carousel.js build/js/carousel.js
cp -v CSSEditableProps.js build/js/CSSEditableProps.js
cp -v CSSTemplate.js build/js/CSSTemplate.js
cp -v HTMLTemplate.js build/js/HTMLTemplate.js
echo "Done."
#
#  bundle js modules
#
echo " "
echo "Bundling JavaScript modules..."
webpack
echo "Done."
#
#
#
echo " "
echo "Build complete."
