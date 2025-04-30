function uncheckCheckbox() {
    document.getElementById("check").checked = false;
  }

  document.getElementById("ingredient-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const quantity = document.getElementById("quantity").value.trim();

    if (name && quantity) {
        const newItem = {
            name: name,
            quantity: quantity,
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
