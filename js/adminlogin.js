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
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data) { 
        sessionStorage.setItem("uid", data.userId);

        if (data.roleType === "ADMIN") {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome, Admin!",
          }).then(() => {
            window.location.href = "admin/DashBoard.html";
          });
        } else if (data.roleType === "EMPLOYEE") {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome, Employee!",
          }).then(() => {
            window.location.href = "employee/DashBoard.html";
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid credentials",
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Login Unsuccessful",
        text: "Network error occurred. Please try again later.",
      });
    });
});