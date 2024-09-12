document.querySelectorAll('.add-to-cart').forEach(button => {
    // alert("sandaru")
    button.addEventListener('click', function () {
      const card = this.closest('.recipe-card');
      const itemName = card.getAttribute('data-name');
      const itemPrice = parseFloat(card.getAttribute('data-price'));
  
      addToCart(itemName, itemPrice);
    });
  });
  
  function addToCart(name, price) {
    const cartItems = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
  
    // Create a new list item for the cart
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = `${name} - $${price}`;
    
    // Add the list item to the cart
    cartItems.appendChild(li);
  
    // Update the total price
    const currentTotal = parseFloat(cartTotalPrice.textContent);
    cartTotalPrice.textContent = (currentTotal + price).toFixed(2);
  
    $('#cartModal').modal('show');
}

  
//  table booking js  
document.getElementById("tableBookButton").addEventListener("click", (event) => {
  event.preventDefault(); 

  const userName = document.getElementById("booking-user").value;
  const email = document.getElementById("booking-email").value;
  const dateTime = document.getElementById("booking-dateTime").value;
  const bookingCount = document.getElementById("booking-no-of-person").value;
  const specialRequest = document.getElementById("booking-special-request").value;

  let valid = true;

  if (!userName) {
    document.getElementById("name-error").innerText = "Please enter your name.";
    valid = false;
  }
  if (!email || !email.endsWith("gmail.com")) {
    document.getElementById("email-error").innerText = "Please enter a valid Gmail address (e.g., example@gmail.com).";
    valid = false;
  }
  if (!dateTime) {
    document.getElementById("datetime-error").innerText = "Please select date and time.";
    valid = false;
  }
  if (!bookingCount || bookingCount <= 0) {
    document.getElementById("person-error").innerText = "Please enter the number of persons.";
    valid = false;
  }

  if (!specialRequest) {
    document.getElementById("request-error").innerText = "Please enter your Special Request.";
    valid = false;
  }

  if (!valid) {
    return; 
  }

  const previousBooking = localStorage.getItem("lastBooking");
  const currentBooking = JSON.stringify({ userName, email, dateTime, bookingCount, specialRequest });

  if (previousBooking && previousBooking === currentBooking) {
    document.getElementById("datetime-error").innerText = "Duplicate booking detected.";
    return;
  }

  localStorage.setItem("lastBooking", currentBooking);

  fetch("http://localhost:8080/api/add-booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
      email,
      dateTime,
      bookingCount,
      specialRequest,
      status: "PENDING",
    }),
  })
  .then((response) => response.json())
  .then((data) => {
      if (data) {
          Swal.fire({
              icon: 'success',
              title: 'Booking Successful',
              text: 'Your table has been booked successfully!',
          }).then(() => {
              location.reload();
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Booking Failed',
              text: 'There was an issue with your booking. Please try again.',
          });
      }
  })
  .catch(() => {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred. Please try again later.',
      });
  });
});

// Automatically remove error messages when valid input is entered
document.getElementById("booking-user").addEventListener("input", function () {
  if (this.value) {
    document.getElementById("name-error").innerText = "";
  }
});

document.getElementById("booking-email").addEventListener("input", function () {
  if (this.value) {
    document.getElementById("email-error").innerText = "";
  }
});

document.getElementById("booking-dateTime").addEventListener("input", function () {
  if (this.value) {
    document.getElementById("datetime-error").innerText = "";
  }
});

document.getElementById("booking-no-of-person").addEventListener("input", function () {
  if (this.value > 0) {
    document.getElementById("person-error").innerText = "";
  }
});

document.getElementById("booking-special-request").addEventListener("input", function () {
  if (this.value) {
    document.getElementById("request-error").innerText = "";
  }
});



// document.getElementById("sendFeednackButton").addEventListener("click", (e) => {
//   e.preventDefault(); // Prevent form submission for validation

//   // Get form values
//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const message = document.getElementById("message").value.trim();

//   // Simple email pattern for validation
//   const emailPattern = /^[^\s@]+@gmail\.com$/;

//   // Validate form fields for null values
//   if (!name) {
//     Swal.fire({
//       icon: "error",
//       title: "Invalid Name",
//       text: "Please enter your name.",
//     });
//     return;
//   }

//   if (!email) {
//     Swal.fire({
//       icon: "error",
//       title: "Invalid Email",
//       text: "Please enter your email.",
//     });
//     return;
//   }

//   if (!emailPattern.test(email)) {
//     Swal.fire({
//       icon: "error",
//       title: "Invalid Email",
//       text: "Please enter a valid Gmail address (e.g., user@gmail.com).",
//     });
//     return;
//   }

//   if (!message) {
//     Swal.fire({
//       icon: "error",
//       title: "Invalid Message",
//       text: "Please enter your message.",
//     });
//     return;
//   }

//   // If validation is successful, send feedback
//   fetch("http://localhost:8080/api/set-user-feedback", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userName: name,
//       email: email,
//       message: message,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data) {
//         Swal.fire({
//           icon: "success",
//           title: "Feedback Sent",
//           text: "Thank you for your feedback!",
//         }).then(() => {
//           location.reload();
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed",
//           text: "Something went wrong, please try again!",
//         });
//       }
//     })
//     .catch(() => {
//       Swal.fire({
//         icon: "error",
//         title: "Failed",
//         text: "Something went wrong, please try again!",
//       });
//     });
// });




// document.addEventListener("DOMContentLoaded", () => {
//   fetch("http://localhost:8080/api/view-all-user-feedback")
//     .then((response) => response.json())
//     .then((data) => {
//       data.map((e) => {
//         // console.log("text"+e);
//         let testimonialCard = document.createElement("div");
//         testimonialCard.className = "testimonial-card";

//         let name = document.createElement("h4");
//         name.textContent = e.userName;

//         let email = document.createElement("p");
//         email.textContent = e.email;

//         let message = document.createElement("p");
//         message.textContent = e.message;

//         testimonialCard.appendChild(name);
//         testimonialCard.appendChild(email);
//         testimonialCard.appendChild(message);
//         document.getElementById("testimonials").appendChild(testimonialCard);
       
//       });

//     });

//   })

    fetch("http://localhost:8080/api/view-all-menu")
    .then((response) => response.json())
    .then((data) => {
      data.map((e) => {
        let recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        recipeCard.id = "recipe-card";

        let recipeImg = document.createElement("img");
        recipeImg.src = `data:image/png;base64,${e.mealImage}`;

        let recipeCardContent = document.createElement("div");
        recipeCardContent.className = "recipe-card-content";
        recipeCardContent.id = "recipe-card-content";

        let mealName = document.createElement("h4");
        mealName.textContent = e.mealName;

        let mealDicription = document.createElement("p");
        mealDicription.textContent = e.mealDicription;

        let rating = document.createElement("div");
        rating.textContent = "★★★★★";
        rating.className = "rating";
        rating.id = "rating";

        let price = document.createElement("div");
        price.textContent = `LKR ${e.mealPrice}`;
        price.className = "price";
        price.id = "price";

        let btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";
        btnGroup.id = "btn-group";

        let addCart = document.createElement("button");
        addCart.textContent = "add cart";
        addCart.className = "btn";
        addCart.id = "addCartButton";
        addCart.setAttribute("data-name", e.mealName);
        addCart.setAttribute("data-price", e.mealPrice);

        let orderNow = document.createElement("button");
        orderNow.textContent = "order now";
        orderNow.className = "btn";
        orderNow.id = "orderNowButton";

        btnGroup.appendChild(addCart);
        btnGroup.appendChild(orderNow);

        recipeCardContent.appendChild(mealName);
        recipeCardContent.appendChild(mealDicription);
        recipeCardContent.appendChild(rating);
        recipeCardContent.appendChild(price);
        recipeCardContent.appendChild(btnGroup);

        recipeCard.appendChild(recipeImg);
        recipeCard.appendChild(recipeCardContent);

        document.getElementById("recipe-cards").appendChild(recipeCard);
      });
    });









