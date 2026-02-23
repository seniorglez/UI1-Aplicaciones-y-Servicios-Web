/* Cursos: carga por JSON (fetch) + búsqueda y filtro + render Bootstrap cards */
(function () {
  const state = {
    cursos: [],
    texto: "",
    categoria: "Todas"
  };

  function normaliza(s) {
    return (s || "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  }

  function renderCategorias(cursos) {
    const $sel = $("#filtroCategoria");
    const cats = Array.from(new Set(cursos.map(c => c.categoria))).sort((a, b) => a.localeCompare(b, "es"));
    $sel.empty();
    $sel.append(`<option value="Todas">Todas</option>`);
    cats.forEach(c => $sel.append(`<option value="${c}">${c}</option>`));
  }

  function cumpleFiltro(c) {
    const okTexto = normaliza(c.titulo).includes(normaliza(state.texto));
    const okCat = state.categoria === "Todas" || c.categoria === state.categoria;
    return okTexto && okCat;
  }

  function cardHTML(c) {
    return `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="${c.imagen}" class="card-img-top fgo-card-img" alt="Imagen del curso ${c.titulo}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${c.titulo}</h5>
            <p class="card-text mb-1"><span class="badge text-bg-primary">${c.categoria}</span></p>
            <p class="card-text"><small class="text-body-secondary">Nivel: ${c.nivel}</small></p>
            <p class="card-text">${c.resumen}</p>
            <div class="mt-auto">
              <a class="btn btn-outline-primary w-100" href="${c.detalle}">Ver detalles</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderListado() {
    const $grid = $("#gridCursos");
    const filtrados = state.cursos.filter(cumpleFiltro);

    $("#contadorCursos").text(`${filtrados.length} curso(s)`);

    if (filtrados.length === 0) {
      $grid.html(`
        <div class="col-12">
          <div class="alert alert-warning mb-0" role="alert">
            No hay cursos que coincidan con los filtros.
          </div>
        </div>
      `);
      return;
    }

    $grid.html(filtrados.map(cardHTML).join(""));
  }

  async function cargarCursos() {
    try {
      const res = await fetch("data/cursos.json", { cache: "no-store" });
      if (!res.ok) throw new Error("No se pudo cargar cursos.json");
      const data = await res.json();
      state.cursos = Array.isArray(data) ? data : [];
      renderCategorias(state.cursos);
      renderListado();
    } catch (e) {
      console.error(e);
      $("#gridCursos").html(`
        <div class="col-12">
          <div class="alert alert-danger" role="alert">
            Error cargando el catálogo de cursos. Revisa la ruta <code>data/cursos.json</code>.
          </div>
        </div>
      `);
    }
  }

  $(function () {
    cargarCursos();

    $("#buscarCurso").on("keyup", function () {
      state.texto = $(this).val();
      renderListado();
    });

    $("#filtroCategoria").on("change", function () {
      state.categoria = $(this).val();
      renderListado();
    });

    $("#btnLimpiar").on("click", function () {
      state.texto = "";
      state.categoria = "Todas";
      $("#buscarCurso").val("");
      $("#filtroCategoria").val("Todas");
      renderListado();
    });
  });
})();
