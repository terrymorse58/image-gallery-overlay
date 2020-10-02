// HTML template for carousel modal - a Bootstrap modal with an image carousel

const HTMLTemplate = `
  <div
    id="carouselModal"
    tabindex="-1"
    class="modal fade"
    aria-modal="true"
    role="dialog"
    data-wrap="false"
  >
    <div class="modal-dialog modal-dialog-centered wsi-overlay">
      <div class="modal-content">
      
        <div class="modal-header"><p><!-- name of product --></p>
          <button type="button"
            data-dismiss="modal"
            aria-label="Close"
            class="close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div> <!-- /.modal-header -->
        
        <div class="modal-body">
          <div
            id="carousel-container"
            class="carousel-container"
          >
            <img
              id="carousel-hero"
              class="img-fluid"
              src=""
              alt="carousel hero">
            <img
              id="carousel-overlay"
              class="carousel-overlay"
              alt="carousel overlay"
              data-in-transition="false"
              style="z-index: -1000"
              src=""
            >
          </div> <!-- /.carousel-container -->
        </div> <!-- /.modal-body -->

        <div class="modal-footer">
          <div id="thumbnails-viewport" class="div-thumbnails"></div>
        </div> <!-- /.modal-footer -->
        
      </div> <!-- /.modal-content -->
    </div> <!-- /.modal-dialog -->
  </div> <!-- /.modal -->
`;

export default HTMLTemplate;
