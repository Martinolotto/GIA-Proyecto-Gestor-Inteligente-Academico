document.addEventListener("DOMContentLoaded", async () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");
  if (!usuario) return;

  const authDiv = document.querySelector(".gia-auth");
  if (!authDiv) return;

  if (usuario.role === "administrador") {
    authDiv.innerHTML = `
      <a href="panel-control.html" class="gia-login">
        <i class="bi bi-grid-fill me-1"></i> Panel Admin
      </a>
      <button class="gia-register" onclick="cerrarSesion()">Cerrar sesión</button>
    `;
  } else if (usuario.role === "representante") {
    try {
      const res = await fetch("http://localhost:3000/instituciones/mi-institucion", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const inst = await res.json();

      // Usar abreviatura si existe, sino el nombre completo
      const nombre = inst.abreviatura || inst.nombre_institucion;

      authDiv.innerHTML = `
        <div class="d-flex align-items-center gap-2 me-2">
          <img src="${inst.imagen_url}" alt="${nombre}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid #fff" />
          <span class="text-white small fw-semibold">${nombre}</span>
        </div>
        <a href="perfil-instituciones.html" class="gia-login">
          <i class="bi bi-grid-fill me-1"></i> Mi Panel
        </a>
        <button class="gia-register" onclick="cerrarSesion()">Cerrar sesión</button>
      `;
    } catch (error) {
      authDiv.innerHTML = `
        <a href="perfil-instituciones.html" class="gia-login">Mi Panel</a>
        <button class="gia-register" onclick="cerrarSesion()">Cerrar sesión</button>
      `;
    }
  }
});

function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}