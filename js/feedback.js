document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8080/api/view-all-user-feedback")
      .then((response) => response.json())
      .then((data) => {
        data.map((e) => {
          let testimonialCard = document.createElement("div");
          testimonialCard.className = "testimonial-card";
  
          // Adding Image (You can replace the src with dynamic image URLs if available)
          let image = document.createElement("img");
          image.src = "assets/default-avatar.png"; // Placeholder image
          image.alt = e.userName;
  
          let name = document.createElement("h4");
          name.textContent = e.userName;
  
          let role = document.createElement("p");
          role.textContent = e.role || "Business Owner"; // Add default role if not provided
  
          let message = document.createElement("p");
          message.textContent = e.message;
  
          // Adding Rating
          let ratingDiv = document.createElement("div");
          ratingDiv.className = "rating";
          let stars = document.createElement("div");
          stars.innerHTML = "★★★★★"; // Static stars (you can update this to be dynamic if required)
          let ratingValue = document.createElement("div");
          ratingValue.textContent = e.rating || "4.9"; // Default rating
  
          ratingDiv.appendChild(stars);
          ratingDiv.appendChild(ratingValue);
  
        //   testimonialCard.appendChild(image);
          testimonialCard.appendChild(name);
          testimonialCard.appendChild(role);
          testimonialCard.appendChild(message);
          testimonialCard.appendChild(ratingDiv);
  
          document.getElementById("testimonials").appendChild(testimonialCard);
        });
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
      });
  });
  


document.addEventListener("DOMContentLoaded", fetchFeedback);

function fetchFeedback() {
    fetch("http://localhost:8080/api/view-all-user-feedback")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("userFeedbackBody");

            if (tableBody) {
                tableBody.innerHTML = ""; // Clear the table before appending new data

                data.forEach(t => {
                    let tr = document.createElement("tr");

                    let feedbackId = document.createElement("td");
                    feedbackId.textContent = t.feedbackId;

                    let userName = document.createElement("td");
                    userName.textContent = t.userName;

                    let email = document.createElement("td");
                    email.textContent = t.email;

                    let message = document.createElement("td");
                    message.textContent = t.message;

                    // Status column
                    let status = document.createElement("td");
                    let statusSpan = document.createElement("span");
                    statusSpan.className = t.status === "Verified" ? "verified-status" : "pending-status";
                    statusSpan.textContent = t.status;
                    status.appendChild(statusSpan);

                    // Action column with dropdown
                    let action = document.createElement("td");
                    let dropdownDiv = document.createElement("div");
                    dropdownDiv.className = "dropdown";

                    let dropdownButton = document.createElement("button");
                    dropdownButton.className = "btn btn-secondary dropdown-toggle";
                    dropdownButton.setAttribute("type", "button");
                    dropdownButton.setAttribute("data-bs-toggle", "dropdown");
                    dropdownButton.textContent = "Action";

                    let dropdownMenu = document.createElement("ul");
                    dropdownMenu.className = "dropdown-menu";

                    // Verify action in dropdown
                    let verifyOption = document.createElement("li");
                    let verifyLink = document.createElement("a");
                    verifyLink.className = "dropdown-item";
                    verifyLink.textContent = "VERIFY";
                    verifyLink.onclick = function () {
                        updateFeedbackStatus(t.feedbackId, "Verified");
                    };
                    verifyOption.appendChild(verifyLink);

                    // Delete action in dropdown
                    let deleteOption = document.createElement("li");
                    let deleteLink = document.createElement("a");
                    deleteLink.className = "dropdown-item";
                    deleteLink.textContent = "DELETE";
                    deleteLink.onclick = function () {
                        deleteFeedbackById(t.feedbackId, tr);
                    };
                    deleteOption.appendChild(deleteLink);

                    // Append actions to the dropdown menu
                    dropdownMenu.appendChild(verifyOption);
                    dropdownMenu.appendChild(deleteOption);

                    // Append dropdown button and menu to the action column
                    dropdownDiv.appendChild(dropdownButton);
                    dropdownDiv.appendChild(dropdownMenu);
                    action.appendChild(dropdownDiv);

                    // Append all columns to the row
                    tr.appendChild(feedbackId);
                    tr.appendChild(userName);
                    tr.appendChild(email);
                    tr.appendChild(message);
                    // tr.appendChild(status);
                    tr.appendChild(action);

                    // Append the row to the table body
                    tableBody.appendChild(tr);
                });
            }
        })
        .catch(error => {
            console.error("Error fetching feedback:", error);
        });
}


function deleteFeedbackById(feedbackId, rowElement) {
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:8080/api/delete-user-feedback/${feedbackId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    rowElement.remove();
                    Swal.fire(
                        'Deleted!',
                        'Feedback has been deleted.',
                        'success'
                    );
                } else {
                    Swal.fire(
                        'Error!',
                        'Failed to delete feedback.',
                        'error'
                    );
                }
            })
            .catch(error => {
                console.error("Error deleting feedback:", error);
                Swal.fire(
                    'Error!',
                    'There was an issue deleting the feedback.',
                    'error'
                );
            });
        }
    });
}





document.addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("sendFeednackButton")
      .addEventListener("click", (e) => {
        e.preventDefault(); // Prevent form submission for validation

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Simple email pattern for validation
        const emailPattern = /^[^\s@]+@gmail\.com$/;

        // Validate form fields for null values
        if (!name) {
          Swal.fire({
            icon: "error",
            title: "Invalid Name",
            text: "Please enter your name.",
          });
          return;
        }

        if (!email) {
          Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter your email.",
          });
          return;
        }

        if (!emailPattern.test(email)) {
          Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid Gmail address (e.g., user@gmail.com).",
          });
          return;
        }

        if (!message) {
          Swal.fire({
            icon: "error",
            title: "Invalid Message",
            text: "Please enter your message.",
          });
          return;
        }

        // If validation is successful, send feedback
        fetch("http://localhost:8080/api/set-user-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: name,
            email: email,
            message: message,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              Swal.fire({
                icon: "success",
                title: "Feedback Sent",
                text: "Thank you for your feedback!",
              }).then(() => {
                location.reload();
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Something went wrong, please try again!",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: "Something went wrong, please try again!",
            });
          });
      });
  });