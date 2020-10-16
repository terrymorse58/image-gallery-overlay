// css template for carousel modal

const CSSTemplate = `
    /* general */
    #carousel-modal-container {
      font-family: {{fontFamily}};
    }

    /* .cmodal */
    #carousel-modal-container .cmodal {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1050;
      width: 100%;
      height: 100%;
      overflow: hidden;
      outline: 0;
      pointer-events: none;
    }
    .cmodal-open #carousel-modal-container .cmodal {
      overflow-x: hidden;
      overflow-y: auto;
    }
    
    /* .cmodal-dialog */
    #carousel-modal-container .cmodal .cmodal-dialog {
      position: relative;
      width: auto;
      margin: 0 auto;
      pointer-events: none;
      display: flex;
      align-items: center;
      min-height: calc(100% - 1rem);
      opacity: 0;
      transform: scale(0.95);
      transition: all .75s ease;
    }
    #carousel-modal-container .cmodal.show .cmodal-dialog {
     opacity: 1;
     transform: scale(1.0);
    }
    @media (max-width: 475px) {
      #carousel-modal-container .cmodal.show .cmodal-dialog {
        max-width: 92vw !important;
      }
    }
    
    /* .cmodal-content */
    #carousel-modal-container .cmodal-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      pointer-events: auto;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid rgba(0,0,0,.2);
      border-radius: 0.3rem;
      outline: 0;
    }
    
    /* .cmodal-header */
    #carousel-modal-container .cmodal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: {{headerPadding}};
      border-bottom: 1px solid #dee2e6;
      border-top-left-radius: calc(.3rem - 1px);
      border-top-right-radius: calc(.3rem - 1px);
    }
    #carousel-modal-container .cmodal-header p {
      margin: {{headerParagraphMargin}};
    }
    
    /* .cmodal-body */
    #carousel-modal-container .cmodal-body {
      position: relative;
      flex: 1 1 auto;
      padding: 1rem;
    }
    
    /* carousel */
    #carousel-modal-container .carousel-container {
      margin: 0;
      position: relative;
      width: 100%;
     }
     #carousel-modal-container .carousel-overlay-div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: white;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.1s;
     }
     #carousel-modal-container .carousel-hero {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
     }
     #carousel-modal-container .carousel-overlay {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: auto;
     }
     #carousel-modal-container .carousel-fade-in {
       opacity: 1;
       transition: opacity .75s ease;
     }
    
    /* cmodal-footer */
    #carousel-modal-container .cmodal-footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      padding: {{footerPadding}};
      border-top: 1px solid #dee2e6;
      border-bottom-right-radius: calc(.3rem - 1px);
      border-bottom-left-radius: calc(.3rem - 1px);
    }
    #carousel-modal-container .div-thumbnails {
      overflow-x: auto;
      white-space: nowrap;
      margin: 0;
      padding: 8px 16px 12px 16px; /* padding must be 'px' */
      background-color: transparent;
      scroll-behavior: smooth;
    }
    #carousel-modal-container .div-thumbnails button {
      padding: {{thumbnailBtnPadding}};
      margin: {{thumbnailBtnMargin}};
      background-color: transparent;
      border: none;
    }
    #carousel-modal-container .div-thumbnails button:focus {
      outline: 2px solid #aaa;
      outline-offset: 2px;
    }
    #carousel-modal-container .div-thumbnails img {
      height: {{thumbnailImgHeight}};
      width: auto;
      margin: 0;
      border: {{thumbnailBorder}};
    }
    #carousel-modal-container .div-thumbnails img:hover {
      filter: {{thumbnailImgHoverFilter}};
    }
    #carousel-modal-container .div-thumbnails img.selected {
      cursor: default;
      opacity: {{thumbnailSelectedOpacity}};
      filter: {{thumbnailSelectedFilter}};
    }
    
    /* close button */
    #carousel-modal-container button.close {
      float: right;
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1;
      color: #000;
      text-shadow: 0 1px 0 #fff;
      padding: 1rem;
      margin: -1rem -1rem -1rem auto;;
      background-color: transparent;
      border: 0;
      opacity: .5;
    }
    #carousel-modal-container button.close:hover {
      opacity: .8;
    }
    
    /* cmodal-backdrop */
    .cmodal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1040;
      width: 100vw;
      height: 100vh;
      background-color: #000;
      transition: opacity .3s linear;
      opacity: 0;
    }
    .cmodal-backdrop.show {
      opacity: 0.5;
    }
    
    /* .cmodal-open */
    .cmodal-open {
      overflow: hidden;
    }
    
    cmodal-open cmodal {
      overflow-x: hidden;
      overflow-y: auto;
    }
`;

export default CSSTemplate;
