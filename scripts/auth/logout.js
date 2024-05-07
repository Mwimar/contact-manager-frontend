const logoutButtonElement = document.getElementById("logoutButton");

function logout() {
  localStorage.removeItem("token");
  window.location.href = "http://localhost:5500/index.html";
}

logoutButtonElement.addEventListener("click", logout);
