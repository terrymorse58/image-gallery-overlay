// HTML template for carousel modal - a Bootstrap modal with an image carousel

const HTMLTemplate = `
  <div
    id="carouselModal"
    tabindex="-1"
    class="cmodal"
    data-wrap="false"
    style="display: none"
  >
    <div
      class="cmodal-dialog cmodal-dialog-centered"
      style="max-width: calc(-2rem + 58vh)"
    >
      <div class="cmodal-content">
      
        <div class="cmodal-header">
          <p><!-- name of product --></p>
          <button type="button"
            aria-label="Close"
            class="close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div> <!-- /.cmodal-header -->
        
        <div class="cmodal-body">
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
        </div> <!-- /.cmodal-body -->

        <div class="cmodal-footer">
          <div id="thumbnails-viewport" class="div-thumbnails"></div>
        </div> <!-- /.cmodal-footer -->
        
      </div> <!-- /.cmodal-content -->
    </div> <!-- /.cmodal-dialog -->
  </div> <!-- /.cmodal -->
  <div class="cmodal-backdrop" style="display: none"></div>
`;

export default HTMLTemplate;
