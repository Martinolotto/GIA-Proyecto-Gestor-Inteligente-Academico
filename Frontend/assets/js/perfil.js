const API = "http://localhost:3000";
let institucionId = null;
let usuarioLogueado = null;

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const usuarioStr = localStorage.getItem("usuario");

  if (token && usuarioStr) {
    usuarioLogueado = JSON.parse(usuarioStr);
    // Si hay sesión activa, ocultar el botón de iniciar sesión y mostrar el de salir
    document.getElementById("btn-login-nav").classList.add("d-none");
    document.getElementById("btn-logout").classList.remove("d-none");

    // Solo el representante ve el botón "Mi Panel" y el aviso
    if (usuarioLogueado.role === "representante") {
      document.getElementById("btn-panel").classList.remove("d-none");
      document.getElementById("panel-representante-aviso").classList.remove("d-none");
    }
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    institucionId = id;
    await cargarInstitucion(id);
  }
});

async function cargarInstitucion(id) {
  try {
    const res = await fetch(`${API}/instituciones/${id}`);
    const inst = await res.json();
    mostrarDatos(inst);
    institucionId = inst.id;
  } catch (error) {
    console.error(error);
  }
}

function mostrarDatos(inst) {
  document.getElementById("inst-nombre").textContent = inst.nombre_institucion;
  document.getElementById("inst-localidad").textContent = inst.localidad;
  document.getElementById("inst-email").textContent = inst.email;
  document.getElementById("inst-logo").src = inst.imagen_url;
  document.getElementById("inst-cue").textContent = inst.cue;
  document.getElementById("inst-localidad-2").textContent = inst.localidad;
  document.getElementById("inst-email-2").textContent = inst.email;
  document.getElementById("inst-estado").textContent = inst.estado;
  document.getElementById("edit-nombre").value = inst.nombre_institucion;
  document.getElementById("edit-localidad").value = inst.localidad;
  document.getElementById("edit-email").value = inst.email;
  document.getElementById("edit-imagen").value = inst.imagen_url;
}

function mostrarSeccion(seccion) {
  document.getElementById("seccion-ver-perfil").classList.add("d-none");
  document.getElementById("seccion-editar-perfil").classList.add("d-none");

  if (seccion === "ver-perfil") {
    document.getElementById("seccion-ver-perfil").classList.remove("d-none");
  } else if (seccion === "editar-perfil") {
    document.getElementById("seccion-editar-perfil").classList.remove("d-none");
  }

  const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("panelRepresentante"));
  if (offcanvas) offcanvas.hide();
}

document.getElementById("form-editar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const alerta = document.getElementById("alerta-editar");

  const datos = {
    nombre_institucion: document.getElementById("edit-nombre").value,
    localidad: document.getElementById("edit-localidad").value,
    email: document.getElementById("edit-email").value,
    imagen_url: document.getElementById("edit-imagen").value,
  };

  try {
    const res = await fetch(`${API}/instituciones/${institucionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(datos)
    });

    const data = await res.json();
    alerta.className = res.ok ? "alert alert-success" : "alert alert-danger";
    alerta.textContent = data.message;
    alerta.classList.remove("d-none");

    if (res.ok) await cargarInstitucion(institucionId);

  } catch (error) {
    alerta.className = "alert alert-danger";
    alerta.textContent = "Error al guardar cambios.";
    alerta.classList.remove("d-none");
  }
});

function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}