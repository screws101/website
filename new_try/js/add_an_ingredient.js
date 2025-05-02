// Function to uncheck a checkbox with the ID "check" (logo)
function uncheckCheckbox() {
    document.getElementById("check").checked = false;
  }

  // event listener for ingredient-form
  document.getElementById("ingredient-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById("name");
    const quantityInput = document.getElementById("quantity");
  
    if (nameInput.checkValidity() && quantityInput.checkValidity()) {
      const newItem = {
        name: nameInput.value.trim(),
        quantity: quantityInput.value.trim(),
        image: "images/ingredient.png"
      };
  
      const pantryItems = JSON.parse(localStorage.getItem("pantryItems")) || [];
  
      pantryItems.push(newItem);
      localStorage.setItem("pantryItems", JSON.stringify(pantryItems));
  
      window.location.href = "your_pantry.html";
    } else {
      alert("Please fill out both fields!");
    }
  });
  
