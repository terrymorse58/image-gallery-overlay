// HTML template for carousel modal - a Bootstrap modal with an image carousel

const HTMLTemplate = `
  <div
    id="carouselModal"
    tabindex="-1"
    class="modal"
    aria-modal="true"
    role="dialog"
    data-wrap="false"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      style="max-width: calc(-2rem + 58vh)"
    >
      <div class="modal-content">
      
        <div class="modal-header">
          <p><!-- name of product --></p>
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
            data-aspect-ratio="0.6666667"
            style="padding-bottom: 150%"
          >
            <img
              id="carousel-hero"
              class="carousel-hero"
              src=""
              alt="carousel hero">
            <!-- .carousel-overlay-div -->
            <div
              class="carousel-overlay-div"
              data-in-transition="false"
            >
              <img
                id="carousel-overlay"
                class="carousel-overlay"
                alt="carousel overlay"
                src=""
              >
            </div> <!-- /.carousel-overlay-div -->
          </div> <!-- /.carousel-container -->
        </div> <!-- /.modal-body -->

        <div class="modal-footer">
          <div id="thumbnails-viewport" class="div-thumbnails"></div>
        </div> <!-- /.modal-footer -->
        
      </div> <!-- /.modal-content -->
    </div> <!-- /.modal-dialog -->
  </div> <!-- /.modal -->
  <div class="modal-backdrop" style="display: none"></div>
`;

export default HTMLTemplate;
