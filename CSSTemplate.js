// css template for carousel modal

const CSSTemplate = `
    .wsi-overlay {
      max-width: {{modalMaxWidth}};
    }

    .wsi-overlay .modal-header {
      padding: {{headerPadding}};
    }

    .wsi-overlay .modal-header p {
      margin: {{headerParagraphMargin}};
    }

    .wsi-overlay .modal-footer {
      padding: {{footerPadding}};
    }

    .wsi-overlay .div-thumbnails {
      overflow-x: auto;
      white-space: nowrap;
      padding: 0.5rem 0 1rem 0;
      background-color: transparent;
    }
    
    .wsi-overlay .div-thumbnails button {
      padding: {{thumbnailBtnPadding}};
      margin: {{thumbnailBtnMargin}};
      background-color: transparent;
      border: none;
    }
    
    .wsi-overlay .div-thumbnails button:focus {
      outline: 2px solid dodgerblue;
      filter: brightness(80%);
    }
    
    .wsi-overlay .div-thumbnails img {
      height: {{thumbnailImgHeight}};
      width: auto;
      margin: 0;
      border: {{thumbnailBorder}};
    }
    
    .wsi-overlay .div-thumbnails img:hover {
      filter: {{thumbnailImgHoverFilter}};
    }

    .wsi-overlay .div-thumbnails img.selected {
      cursor: default;
      border: {{thumbnailImgSelectedBorder}};
      opacity: {{thumbnailSelectedOpacity}};
      filter: {{thumbnailSelectedFilter}};
    }
`;

export default CSSTemplate;
