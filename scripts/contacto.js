/* Contacto: validación (blur) + mensajes de error + contador (jQuery) */
$(function () {
  const MIN_MSG = 30;

  function setError($field, msg) {
    const id = $field.attr("id");
    const $err = $(`#err_${id}`);
    $field.addClass("is-invalid").removeClass("is-valid");
    $err.text(msg);
  }

  function setOk($field) {
    const id = $field.attr("id");
    const $err = $(`#err_${id}`);
    $field.addClass("is-valid").removeClass("is-invalid");
    $err.text("");
  }

  function isEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
  }

  function validarNombre() {
    const $f = $("#nombre");
    const v = $f.val().trim();
    if (v.length < 2) { setError($f, "Introduce tu nombre (mínimo 2 caracteres)."); return false; }
    setOk($f); return true;
  }

  function validarEmail() {
    const $f = $("#email");
    const v = $f.val().trim();
    if (!isEmail(v)) { setError($f, "Introduce un correo válido (por ejemplo: nombre@dominio.com)."); return false; }
    setOk($f); return true;
  }

  function validarTematica() {
    const $f = $("#tematica");
    const v = $f.val();
    if (!v) { setError($f, "Selecciona una temática."); return false; }
    setOk($f); return true;
  }

  function validarMensaje() {
    const $f = $("#mensaje");
    const v = $f.val().trim();
    if (v.length < MIN_MSG) { setError($f, `El mensaje debe tener al menos ${MIN_MSG} caracteres.`); return false; }
    setOk($f); return true;
  }

  function actualizarContador() {
    const n = $("#mensaje").val().length;
    $("#contadorMensaje").text(`${n} carácter(es)`);
    $("#contadorMensaje").toggleClass("text-danger", n < MIN_MSG);
  }

  $("#nombre").on("blur", validarNombre);
  $("#email").on("blur", validarEmail);
  $("#tematica").on("blur change", validarTematica);
  $("#mensaje").on("blur", validarMensaje);
  $("#mensaje").on("keyup", actualizarContador);

  actualizarContador();

  $("#formContacto").on("submit", function (e) {
    const ok = validarNombre() & validarEmail() & validarTematica() & validarMensaje();
    if (!ok) {
      e.preventDefault();
      $("#alertaContacto").removeClass("d-none").addClass("alert-danger").removeClass("alert-success")
        .text("Revisa los campos marcados en rojo antes de enviar.");
      return;
    }

    e.preventDefault(); // demo: no enviamos realmente
    $("#alertaContacto").removeClass("d-none").addClass("alert-success").removeClass("alert-danger")
      .text("¡Perfecto! El formulario se ha enviado correctamente.");
    this.reset();
    $(".is-valid, .is-invalid").removeClass("is-valid is-invalid");
    actualizarContador();
  });
});
