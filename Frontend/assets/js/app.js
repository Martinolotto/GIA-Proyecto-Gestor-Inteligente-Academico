document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario) {
    const authDiv = document.querySelector(".gia-auth");
    if (authDiv) {
      if (usuario.role === "administrador") {
        authDiv.innerHTML = `
          <a href="panel-control.html" class="gia-login">Panel Admin</a>
          <button class="gia-register" onclick="cerrarSesion()">Cerrar sesión</button>
        `;
      } else if (usuario.role === "representante") {
        authDiv.innerHTML = `
          <a href="perfil-instituciones.html" class="gia-login">Mi Institución</a>
          <button class="gia-register" onclick="cerrarSesion()">Cerrar sesión</button>
        `;
      }
    }
  }
});

function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}