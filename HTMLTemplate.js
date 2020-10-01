// HTML template for carousel modal

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
          <button type="button" data-dismiss="modal" aria-label="Close"
                  class="close"><span aria-hidden="true">×</span></button>
        </div>
        <div class="modal-body">
          <div
            id="wsiCarousel"
            data-ride="carousel"
            class="carousel slide carousel-fade"
            data-interval="false"
          >
            <div class="carousel-inner">
            <!--
              <div class="carousel-item active" data-index="0">
                <img src="..." alt="..." class="img-fluid">
              </div>
            -->
            </div>
          </div> <!-- /.carousel -->
        </div> <!-- /.modal-body -->

        <div class="modal-footer">
          <div class="div-thumbnails">
          <!--
            <img role="button"
              data-index="0"
              onclick="displaySelectedImage(this)"
              src="...">
          -->
          </div>
        </div> <!-- /.modal-footer -->
      </div> <!-- /.modal-content -->
    </div> <!-- /.modal-dialog -->
  </div> <!-- /.modal -->
`;

export default HTMLTemplate;
