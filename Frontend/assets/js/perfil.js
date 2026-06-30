const API = "http://localhost:3000";
let institucionId = null;
let usuarioLogueado = null;

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const usuarioStr = localStorage.getItem("usuario");

  if (token && usuarioStr) {
    usuarioLogueado = JSON.parse(usuarioStr);
    document.getElementById("btn-login-nav").classList.add("d-none");
    document.getElementById("btn-logout").classList.remove("d-none");

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
  } else if (usuarioLogueado?.role === "representante") {
    await cargarMiInstitucion();
  }
});

async function cargarMiInstitucion() {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/instituciones/mi-institucion`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const inst = await res.json();
    if (!res.ok) throw new Error(inst.message);
    institucionId = inst.id;
    mostrarDatos(inst);
  } catch (error) {
    console.error(error);
  }
}

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
  document.getElementById("inst-direccion").textContent = inst.direccion || "—";
  document.getElementById("inst-telefono").textContent = inst.telefono || "—";
  document.getElementById("inst-email-2").textContent = inst.email;
  document.getElementById("inst-estado").textContent = inst.estado;

  document.getElementById("inst-descripcion").textContent = inst.descripcion || "Esta institución aún no cargó una descripción.";

  setLink("inst-web", inst.sitio_web, "Sitio web");
  setLink("inst-facebook", inst.facebook, "Facebook");
  setLink("inst-instagram", inst.instagram, "Instagram");

  document.getElementById("inst-requisitos").textContent = inst.requisitos || "Sin información cargada todavía.";
  document.getElementById("inst-documentacion").textContent = inst.documentacion || "Sin información cargada todavía.";
  document.getElementById("inst-becas").textContent = inst.becas || "Sin información cargada todavía.";

  document.getElementById("edit-nombre").value = inst.nombre_institucion || "";
  document.getElementById("edit-abreviatura").value = inst.abreviatura || "";
  document.getElementById("edit-localidad").value = inst.localidad || "";
  document.getElementById("edit-direccion").value = inst.direccion || "";
  document.getElementById("edit-telefono").value = inst.telefono || "";
  document.getElementById("edit-email").value = inst.email || "";
  document.getElementById("edit-imagen").value = inst.imagen_url || "";
  document.getElementById("edit-sitio-web").value = inst.sitio_web || "";
  document.getElementById("edit-facebook").value = inst.facebook || "";
  document.getElementById("edit-instagram").value = inst.instagram || "";
  document.getElementById("edit-descripcion").value = inst.descripcion || "";
  document.getElementById("edit-requisitos").value = inst.requisitos || "";
  document.getElementById("edit-documentacion").value = inst.documentacion || "";
  document.getElementById("edit-becas").value = inst.becas || "";
}

function setLink(id, url, label) {
  const a = document.getElementById(id);
  if (url) {
    a.textContent = label;
    a.href = url;
  } else {
    a.textContent = "—";
    a.removeAttribute("href");
  }
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
    abreviatura: document.getElementById("edit-abreviatura").value,
    localidad: document.getElementById("edit-localidad").value,
    direccion: document.getElementById("edit-direccion").value,
    telefono: document.getElementById("edit-telefono").value,
    email: document.getElementById("edit-email").value,
    imagen_url: document.getElementById("edit-imagen").value,
    sitio_web: document.getElementById("edit-sitio-web").value,
    facebook: document.getElementById("edit-facebook").value,
    instagram: document.getElementById("edit-instagram").value,
    descripcion: document.getElementById("edit-descripcion").value,
    requisitos: document.getElementById("edit-requisitos").value,
    documentacion: document.getElementById("edit-documentacion").value,
    becas: document.getElementById("edit-becas").value,
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

    if (res.ok) {
      alerta.className = "alert alert-success";
      alerta.textContent = "✅ Actualización exitosa";
      alerta.classList.remove("d-none");

      if (usuarioLogueado?.role === "representante" && !new URLSearchParams(window.location.search).get("id")) {
        await cargarMiInstitucion();
      } else {
        await cargarInstitucion(institucionId);
      }

      setTimeout(() => {
        mostrarSeccion("ver-perfil");
        alerta.classList.add("d-none");
      }, 1000);
    } else {
      alerta.className = "alert alert-danger";
      alerta.textContent = data.message;
      alerta.classList.remove("d-none");
    }

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