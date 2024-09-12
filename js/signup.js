function togglePassword() {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

document.getElementById("signUpBuuton").addEventListener("click", (e) => {
    e.preventDefault(); 

    const form = document.getElementById("signupForm");
   
    if (form.checkValidity()) {

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const address = document.getElementById("address").value.trim();
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
                Swal.fire({
                    icon: 'success',
                    title: 'Register Success',
                    text: 'Your account has been created!',
                }).then(() => {
                    // Redirect to login.html when the user clicks "OK"
                    window.location.href = "login.html";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Register Failed',
                    text: 'Something went wrong, please try again!',
                });
            }
        })
        .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Register Failed',
                text: 'Unable to register, please try again later!',
            });
        });
    } else {
        form.reportValidity();
    }
});
