#!/usr/bin/env bash
#
# Build for Image Carousel Modal
#
#
echo " "
echo "Copying .js files to dist/js:"
cp -v src/js/image-gallery.js dist/js/image-gallery.js
cp -v src/js/CSSEditableProps.js dist/js/CSSEditableProps.js
cp -v src/js/CSSTemplate.js dist/js/CSSTemplate.js
cp -v src/js/HTMLTemplate.js dist/js/HTMLTemplate.js
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
