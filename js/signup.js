function togglePassword() {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  }
  
  document.getElementById("signUpBuuton").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value;
    const image = document.getElementById("image").files[0];
  
    const formData = new FormData();
    formData.append("userName", name);
    formData.append("userProfile", image);
    formData.append("contactNo", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userAddress", address);
    formData.append("roleType", "USER");
  
    fetch("http://localhost:8080/api/set-user", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          alert("register success");
        } else {
          alert("regsiter unsuccess");
        }
      })
      .catch(() => {
        alert("register unsuccess");
      });
  });
  
  