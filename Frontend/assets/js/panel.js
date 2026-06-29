const API = "http://localhost:3000";
let token = null;

window.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("token");
  const usuarioStr = localStorage.getItem("usuario");
  if (!token || !usuarioStr) { window.location.href = "login.html"; return; }
  const usuario = JSON.parse(usuarioStr);
  if (usuario.role !== "administrador") { window.location.href = "index.html"; return; }
  document.getElementById("usuario-email").textContent = usuario.email;
  document.getElementById("welcome-nombre").textContent = usuario.email.split("@")[0];
  document.getElementById("usuario-nombre").textContent = usuario.email.split("@")[0];
  cargarDashboard();
  cargarPendientes();
  cargarInstituciones();
  cargarUsuarios();
});

async function cargarDashboard() {
  try {
    const res = await fetch(`${API}/instituciones`);
    const aprobadas = await res.json();
    const resPend = await fetch(`${API}/instituciones/admin/pendientes`, { headers: { "Authorization": `Bearer ${token}` } });
    const pendientes = await resPend.json();
    document.getElementById("stat-total").textContent = aprobadas.length + pendientes.length;
    document.getElementById("stat-aprobadas").textContent = aprobadas.length;
    document.getElementById("stat-pendientes").textContent = pendientes.length;
    document.getElementById("badge-pendientes").textContent = pendientes.length;
    const todas = [...pendientes, ...aprobadas].slice(0, 5);
    renderTablaRecientes(todas);
  } catch (error) { console.error(error); }
}

async function cargarPendientes() {
  try {
    const res = await fetch(`${API}/instituciones/admin/pendientes`, { headers: { "Authorization": `Bearer ${token}` } });
    const datos = await res.json();
    renderTablaPendientes(datos);
  } catch (error) { console.error(error); }
}

async function cargarInstituciones() {
  try {
    const res = await fetch(`${API}/instituciones`);
    const datos = await res.json();
    renderTablaInstituciones(datos);
  } catch (error) { console.error(error); }
}

async function cargarUsuarios() {
  try {
    const res = await fetch(`${API}/usuarios`, { headers: { "Authorization": `Bearer ${token}` } });
    const datos = await res.json();
    const tbody = document.getElementById("tabla-usuarios");
    if (!datos.length) { tbody.innerHTML = `<tr><td colspan="2" class="text-center text-muted py-4">No hay usuarios</td></tr>`; return; }
    tbody.innerHTML = datos.map(u => `<tr><td>${u.email}</td><td><span class="badge ${u.role === 'administrador' ? 'bg-primary' : 'bg-secondary'}">${u.role}</span></td></tr>`).join("");
  } catch (error) { console.error(error); }
}

function badgeEstado(estado) {
  if (estado === "pendiente") return `<span class="badge-pendiente">⏳ Pendiente</span>`;
  if (estado === "aprobado") return `<span class="badge-aprobado">✅ Aprobado</span>`;
  if (estado === "rechazado") return `<span class="badge-rechazado">❌ Rechazado</span>`;
  return estado;
}

function renderTablaRecientes(datos) {
  const tbody = document.getElementById("tabla-recientes");
  if (!datos.length) { tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">Sin solicitudes</td></tr>`; return; }
  tbody.innerHTML = datos.map(i => `
    <tr>
      <td class="fw-semibold">${i.nombre_institucion}</td>
      <td>${i.localidad}</td>
      <td><code>${i.cue}</code></td>
      <td>${badgeEstado(i.estado)}</td>
      <td>${i.estado === "pendiente" ? `<button class="btn btn-sm btn-success me-1" onclick="cambiarEstado(${i.id},'aprobado')">Aprobar</button><button class="btn btn-sm btn-danger" onclick="cambiarEstado(${i.id},'rechazado')">Rechazar</button>` : `<a href="perfil-instituciones.html?id=${i.id}" class="btn btn-sm btn-outline-primary">Ver</a>`}</td>
    </tr>`).join("");
}

function renderTablaPendientes(datos) {
  const tbody = document.getElementById("tabla-pendientes");
  if (!datos.length) { tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">No hay solicitudes pendientes 🎉</td></tr>`; return; }
  tbody.innerHTML = datos.map(i => `
    <tr>
      <td class="fw-semibold">${i.nombre_institucion}</td>
      <td>${i.localidad}</td>
      <td><code>${i.cue}</code></td>
      <td>${i.email}</td>
      <td>
        <button class="btn btn-sm btn-success me-1" onclick="cambiarEstado(${i.id},'aprobado')"><i class="bi bi-check-lg"></i> Aprobar</button>
        <button class="btn btn-sm btn-danger" onclick="cambiarEstado(${i.id},'rechazado')"><i class="bi bi-x-lg"></i> Rechazar</button>
      </td>
    </tr>`).join("");
}

function renderTablaInstituciones(datos) {
  const tbody = document.getElementById("tabla-instituciones");
  if (!datos.length) { tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">Sin instituciones aprobadas</td></tr>`; return; }
  tbody.innerHTML = datos.map(i => `
    <tr>
      <td class="fw-semibold">${i.nombre_institucion}</td>
      <td>${i.localidad}</td>
      <td><code>${i.cue}</code></td>
      <td>${i.email}</td>
      <td>${badgeEstado(i.estado)}</td>
      <td><a href="perfil-instituciones.html?id=${i.id}" class="btn btn-sm btn-outline-primary"><i class="bi bi-eye"></i> Ver</a></td>
    </tr>`).join("");
}

async function cambiarEstado(id, estado) {
  const alerta = document.getElementById("alerta-accion");
  try {
    const res = await fetch(`${API}/instituciones/${id}/estado`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ estado })
    });
    const data = await res.json();
    if (alerta) {
      alerta.className = `alert ${res.ok ? "alert-success" : "alert-danger"}`;
      alerta.textContent = data.message;
      alerta.classList.remove("d-none");
    }
    await cargarDashboard();
    await cargarPendientes();
    await cargarInstituciones();
  } catch (error) { console.error(error); }
}

function cambiarSeccion(nombre, link) {
  document.querySelectorAll(".seccion").forEach(s => s.classList.remove("activa"));
  document.getElementById(`seccion-${nombre}`).classList.add("activa");
  document.querySelectorAll(".sidebar-nav .nav-link").forEach(l => l.classList.remove("active"));
  if (link) link.classList.add("active");
}

function toggleSidebar() { document.getElementById("sidebar").classList.toggle("abierto"); }

function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}

window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "index.html";
  }
});