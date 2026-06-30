const API = "http://localhost:3000";

document.getElementById("form-login").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const btn = document.getElementById("btn-login");
  const alerta = document.getElementById("alerta-error");

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Ingresando...';
  alerta.classList.add("d-none");

  try {
    const res = await fetch(`${API}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, contrasenia: password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    if (data.usuario.role === "administrador") {
      window.location.href = "panel-control.html";
    } else if (data.usuario.role === "representante") {
      window.location.href = "perfil-instituciones.html";
    }

  } catch (error) {
    alerta.textContent = error.message;
    alerta.classList.remove("d-none");
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-box-arrow-in-right me-2"></i>Iniciar sesión';
  }
});
