function uncheckCheckbox() {
    document.getElementById("check").checked = false;
  }
  if (!localStorage.getItem("pantryItems")) {
    localStorage.setItem("pantryItems", JSON.stringify(pantryItems));
}

const cardsContainer = document.getElementById("cards-container");

function createCard(item) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const img = document.createElement("img");
    img.src = "images/ingredient.png";
    img.alt = "Pantry Item";
    img.classList.add("card-image");
    cardDiv.appendChild(img);


    const textDiv = document.createElement("div");
    textDiv.classList.add("text");

    const title = document.createElement("h2");
    title.textContent = item.name;
    textDiv.appendChild(title);

    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("calories");
    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Qty:";
    quantityLabel.setAttribute("for", `qty-${item.name}`);

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = "0";
    quantityInput.value = item.quantity;
    quantityInput.id = `qty-${item.name}`;
    quantityInput.classList.add("quantity-input");

    // update localStorage when changed
    quantityInput.addEventListener("change", () => {
        const updatedPantry = JSON.parse(localStorage.getItem("pantryItems")) || [];
        const foundItem = updatedPantry.find(p => p.name === item.name);
        if (foundItem) {
            foundItem.quantity = quantityInput.value;
            localStorage.setItem("pantryItems", JSON.stringify(updatedPantry));
        }
    });

quantityDiv.appendChild(quantityLabel);
quantityDiv.appendChild(quantityInput);
textDiv.appendChild(quantityDiv);


    const addButton = document.createElement("button");
    addButton.classList.add("add-ingredient-btn");

    const addIcon = document.createElement("img");
    addIcon.src = "images/icons8-plus-50-no-pad copy.png";
    addIcon.classList.add("add_icon");

    const addText = document.createTextNode("add to grocery list");

    addButton.appendChild(addIcon);
    addButton.appendChild(addText);
    addButton.addEventListener("click", () => addToGroceryList(item));

    textDiv.appendChild(addButton);

    cardDiv.appendChild(textDiv);
    return cardDiv;
}

const savedPantryItems = JSON.parse(localStorage.getItem("pantryItems")) || pantryItems;

savedPantryItems.forEach(item => {
    if (parseInt(item.quantity) > 0) {
        const card = createCard(item);
        cardsContainer.appendChild(card);
    }
});


function addToGroceryList(item) {
    let amount = prompt(`How much of "${item.name}" would you like to add?`);

    if (amount === null) return;

    amount = amount.trim();

    if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
        alert("Please enter a valid number greater than 0.");
        return;
    }

    const quantity = Number(amount);
    const groceryList = JSON.parse(localStorage.getItem("groceryList")) || [];

    const exists = groceryList.some(groceryItem => groceryItem.name === item.name);

    if (!exists) {
        groceryList.push({
            name: item.name,
            quantity: quantity,
            image: item.image || "images/ingredient.png"
        });
        localStorage.setItem("groceryList", JSON.stringify(groceryList));
        alert(`${item.name} (${quantity}) added to grocery list!`);
    } else {
        alert(`${item.name} is already in your grocery list.`);
    }
}


document.getElementById("add-pantry-item-btn").addEventListener("click", () => {
    window.location.href = "add_an_ingredient.html";
});