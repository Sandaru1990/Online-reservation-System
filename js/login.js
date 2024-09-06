const email = document.getElementById("email");
const password = document.getElementById("password").value;

function togglePassword() {
  const passwordField = document.getElementById("password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}

document.getElementById("btnLogin").addEventListener("click", () => {
  fetch(
    `http://localhost:8080/api/user-login?email=${encodeURIComponent(
      document.getElementById("email").value
    )}&password=${encodeURIComponent(
      document.getElementById("password").value
    )}`
  )
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      try {
        const data = JSON.parse(text);
        if (data) {
          sessionStorage.setItem('uid',data.userId)
          console.log(data.userId)
          alert("login success");
          window.location.href = 'index.html'
        }
      } catch (error) {
        alert("login unsuccess");
      }
    })
    .catch((error) => console.error("Fetch error:", error));
});
