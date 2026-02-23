/* Index: read less/more with jQuery) */
$(function () {
  $(".btn-toggle-more").on("click", function () {
    const $btn = $(this);
    const target = $btn.data("target");
    const $extra = $(target);

    $extra.toggleClass("d-none");

    const isVisible = !$extra.hasClass("d-none");
    $btn.text(isVisible ? "Leer menos" : "Leer más");
    $btn.attr("aria-expanded", String(isVisible));
  });
});