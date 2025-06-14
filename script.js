function logar() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  fetch("/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify({usuario, senha})
  }).then(res => res.json()).then(data => {
    if (data.ok) {
      document.getElementById("login").classList.add("hidden");
      document.getElementById("painel").classList.remove("hidden");
    } else {
      alert("Login inválido");
    }
  });
}

function mostrarAba(id) {
  document.querySelectorAll(".aba").forEach(a => a.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
