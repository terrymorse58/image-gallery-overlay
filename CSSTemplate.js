// css template for carousel modal

const CSSTemplate = `
    .wsi-overlay {
      {{maxWidth}}
    }

    .wsi-overlay .modal-header {
      {{headerPadding}}
    }

    .wsi-overlay .modal-header p {
      {{headerParagraphMargin}}
    }

    .wsi-overlay .modal-footer {
      {{footerPadding}}
    }

    .wsi-overlay .div-thumbnails {
      overflow-x: auto;
      white-space: nowrap;
      padding: 0.5rem 0 1rem 0;
      background-color: transparent;
    }
    
    .wsi-overlay .div-thumbnails img {
      {{thumbnailHeight}}
      width: auto;
      {{thumbnailMargin}}
      {{thumbnailBorder}}
    }

    .wsi-overlay .div-thumbnails img:hover {
      {{thumbnailHoverOutline}}
    }

    .wsi-overlay .div-thumbnails img.selected {
      cursor: default;
      outline: none;
      {{thumbnailSelectedOpacity}}
      {{thumbnailSelectedFilter}}
    }
`;

export default CSSTemplate;
