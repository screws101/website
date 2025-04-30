function uncheckCheckbox() {
    document.getElementById("check").checked = false;
  }

  function addToGroceryList(item) {
    const card = document.createElement("div");
    card.classList.add("grocery-card");
  
    // Image
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.classList.add("grocery-img");
  
    // Info section
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("grocery-info");
  
    const name = document.createElement("h2");
    name.textContent = item.name;
  
    // Quantity
    const quantityPill = document.createElement("div");
    quantityPill.classList.add("quantity-pill");
  
    const quantityValue = document.createElement("span");
    quantityValue.classList.add("quantity-value");
    quantityValue.textContent = item.quantity;
  
    const editIcon = document.createElement("img");
    editIcon.src = "images/pen-solid.svg";
    editIcon.alt = "Edit";
    editIcon.classList.add("edit-icon");
  
    quantityPill.appendChild(quantityValue);
    quantityPill.appendChild(editIcon);
  

    editIcon.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "number";
      input.min = 0;
      input.value = quantityValue.textContent;
      input.className = "quantity-input";
  
      quantityPill.replaceChild(input, quantityValue);
      input.focus();
  
      function save() {
        const newQuantity = input.value;
        quantityValue.textContent = newQuantity;
        quantityPill.replaceChild(quantityValue, input);
  

        const storedList = JSON.parse(localStorage.getItem("groceryList")) || [];
        const index = storedList.findIndex(i => i.name === item.name);
  
        if (index !== -1) {
          storedList[index].quantity = newQuantity;
          localStorage.setItem("groceryList", JSON.stringify(storedList));
        }
      }
  
      input.addEventListener("blur", save);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") save();
      });
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("button"); // reuse the inspect-style class

    const icon = document.createElement("img");
    icon.src = "images/trash.png"; // make sure this file exists
    icon.alt = "Delete";
    icon.classList.add("button-icon");

    deleteBtn.appendChild(icon);
    deleteBtn.append("Delete");

    deleteBtn.addEventListener("click", () => {
      // Remove card from DOM
      card.remove();

      // Update localStorage
      const storedList = JSON.parse(localStorage.getItem("groceryList")) || [];
      const newList = storedList.filter(i => i.name !== item.name);
      localStorage.setItem("groceryList", JSON.stringify(newList));
    });

  
    infoDiv.appendChild(name);
    infoDiv.appendChild(quantityPill);
    infoDiv.appendChild(deleteBtn); // add delete button to info section
    card.appendChild(img);
    card.appendChild(infoDiv);
  
    return card;
  }  



const groceryListContainer = document.getElementById("grocery-list-container"); 

const storedList = JSON.parse(localStorage.getItem("groceryList")) || [];

storedList.forEach(item => {
  const card = addToGroceryList(item);
  groceryListContainer.appendChild(card);
});

document.getElementById("clear-list-btn").addEventListener("click", () => {
  const confirmClear = confirm("Are you sure you want to clear your grocery list?");
  if (confirmClear) {
    localStorage.removeItem("groceryList");
    const container = document.getElementById("grocery-list-container");
    container.innerHTML = "";
  }
});


document.getElementById("add-item-btn").addEventListener("click", () => {
  const name = prompt("Enter item name:");
  if (!name) return;

  const quantity = prompt("Enter quantity:");
  if (!quantity) return;

  const newItem = {
    name: name.trim(),
    quantity: quantity.trim(),
    image: "images/ingredient.png", // Or any default image you prefer
  };

  // Save to localStorage
  const storedList = JSON.parse(localStorage.getItem("groceryList")) || [];
  storedList.push(newItem);
  localStorage.setItem("groceryList", JSON.stringify(storedList));

  // Create card and append to container
  const card = addToGroceryList(newItem);
  groceryListContainer.appendChild(card);
});
