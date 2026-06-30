const API = "http://localhost:3000";

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") || "";
  document.getElementById("input-busqueda").value = q;
  buscar(q);
});

async function buscar(termino = null) {
  const query = termino !== null ? termino : document.getElementById("input-busqueda").value.trim();
  const contenedor = document.getElementById("contenedor-resultados");
  const contador = document.getElementById("contador-resultados");

  contenedor.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-3 text-muted">Buscando instituciones...</p>
    </div>`;

  try {
    const url = query
      ? `${API}/instituciones?nombre=${encodeURIComponent(query)}`
      : `${API}/instituciones`;

    const res = await fetch(url);
    const instituciones = await res.json();

    if (!instituciones.length) {
      contenedor.innerHTML = `
        <div class="col-12 sin-resultados">
          <i class="bi bi-search" style="font-size:3rem;opacity:0.3"></i>
          <h5 class="mt-3">No encontramos resultados para "${query}"</h5>
          <p>Intentá con otro término o buscá por localidad.</p>
        </div>`;
      contador.textContent = "";
      return;
    }

    contador.textContent = `${instituciones.length} institución${instituciones.length > 1 ? "es" : ""} encontrada${instituciones.length > 1 ? "s" : ""}`;

    contenedor.innerHTML = instituciones.map(inst => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="resultado-card card h-100 p-3" onclick="window.location.href='perfil-instituciones.html?id=${inst.id}'">
          <div class="d-flex align-items-center gap-3 mb-3">
            <img src="${inst.imagen_url}" alt="${inst.nombre_institucion}" class="resultado-img" onerror="this.src='assets/img/logo-gia-circular.png'" />
            <div>
              <h6 class="fw-bold mb-1">${inst.nombre_institucion}</h6>
              <span class="badge-aprobado"><i class="bi bi-check-circle-fill me-1"></i>Verificada</span>
            </div>
          </div>
          <div class="text-muted small">
            <p class="mb-1"><i class="bi bi-geo-alt me-1"></i>${inst.localidad}</p>
            <p class="mb-1"><i class="bi bi-patch-check me-1"></i>CUE: ${inst.cue}</p>
            <p class="mb-0"><i class="bi bi-envelope me-1"></i>${inst.email}</p>
          </div>
          <div class="mt-3">
            <span class="btn btn-sm btn-outline-primary w-100">Ver perfil <i class="bi bi-arrow-right ms-1"></i></span>
          </div>
        </div>
      </div>
    `).join("");

  } catch (error) {
    contenedor.innerHTML = `
      <div class="col-12 text-center py-5 text-danger">
        <i class="bi bi-exclamation-triangle" style="font-size:2rem"></i>
        <p class="mt-2">Error al cargar instituciones. Verificá que el servidor esté corriendo.</p>
      </div>`;
  }
}

document.getElementById("input-busqueda")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") buscar();
});
