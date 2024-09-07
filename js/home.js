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