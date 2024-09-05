document.querySelectorAll('.add-to-cart').forEach(button => {
    alert("sandaru")
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
  
    // Show the cart modal
    $('#cartModal').modal('show');
  }
  