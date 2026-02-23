/* Profesorado: ordenación asc/desc (arrays + eventos click) */
(function () {
  const state = {
    data: [
      { nombre: "Laura Martínez", area: "Desarrollo Web y Arquitectura", experiencia: 8, cursos: 1 },
      { nombre: "Sara Gómez", area: "UX/UI y Diseño de Producto", experiencia: 6, cursos: 1 },
      { nombre: "Daniel Ortega", area: "Marketing Digital", experiencia: 10, cursos: 1 },
      { nombre: "Emily Carter", area: "Inglés Profesional", experiencia: 7, cursos: 1 },
      { nombre: "Javier Ruiz", area: "Análisis de Datos", experiencia: 5, cursos: 1 }
    ],
    sortKey: "nombre",
    sortDir: "asc" // asc | desc
  };

  function compare(a, b, key) {
    const va = a[key];
    const vb = b[key];
    if (typeof va === "number" && typeof vb === "number") return va - vb;
    return String(va).localeCompare(String(vb), "es", { sensitivity: "base" });
  }

  function render() {
    const tbody = document.querySelector("#tablaProfesorado tbody");
    if (!tbody) return;

    const sorted = [...state.data].sort((a, b) => {
      const cmp = compare(a, b, state.sortKey);
      return state.sortDir === "asc" ? cmp : -cmp;
    });

    tbody.innerHTML = sorted.map(p => `
      <tr>
        <td>${p.nombre}</td>
        <td>${p.area}</td>
        <td class="text-center">${p.experiencia}</td>
        <td class="text-center">${p.cursos}</td>
      </tr>
    `).join("");

    // Indicador en cabeceras
    document.querySelectorAll("[data-sort]").forEach(th => {
      const key = th.getAttribute("data-sort");
      const base = th.getAttribute("data-label");
      if (key === state.sortKey) {
        th.innerHTML = `${base} <span class="ms-1">${state.sortDir === "asc" ? "▲" : "▼"}</span>`;
      } else {
        th.textContent = base;
      }
    });
  }

  function toggleSort(key) {
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    } else {
      state.sortKey = key;
      state.sortDir = "asc";
    }
    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-sort]").forEach(th => {
      th.classList.add("fgo-sortable");
      th.addEventListener("click", () => toggleSort(th.getAttribute("data-sort")));
    });
    render();
  });
})();
