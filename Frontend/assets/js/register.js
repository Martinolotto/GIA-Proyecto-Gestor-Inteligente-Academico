const API = "http://localhost:3000";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const datos = {
    nombre_institucion: document.getElementById("institucion").value,
    cue: document.getElementById("codigo").value,
    localidad: "Formosa",
    email: document.getElementById("email").value,
    nombre_rep: document.getElementById("nombre").value,
    apellido_rep: document.getElementById("apellido").value,
    dni_rep: parseInt(document.getElementById("dni").value),
    cargo_rep: "Representante",
    email_rep: document.getElementById("email").value,
    contrasenia_rep: password
  };

  try {
    const res = await fetch(`${API}/instituciones/solicitud`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Solicitud enviada correctamente. Te avisaremos cuando sea aprobada.");
      window.location.href = "index.html";
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    alert("Error al conectar con el servidor.");
  }
});