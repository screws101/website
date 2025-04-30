function uncheckCheckbox() {
    document.getElementById("check").checked = false;
  }
  if (!localStorage.getItem("pantryItems")) {
    localStorage.setItem("pantryItems", JSON.stringify(pantryItems));
}

const cardsContainer = document.getElementById("cards-container"); //holds all the cards?

function createCard(item) { //function createCard takes 1 parameter: item object (I DONT THINK I DEFINED WHAT ITEM IS)
    const cardDiv = document.createElement("div"); //a new <div> called cardDiv is made
    cardDiv.classList.add("card");  //adds the class of "card" to cardDiv

    const img = document.createElement("img");
    img.src = "images/ingredient.png"; // use a consistent icon for all pantry items
    img.alt = "Pantry Item"; // general alt text, or you can still use item.name if you want
    img.classList.add("card-image"); // optional: if you want the same class styling as recipes
    cardDiv.appendChild(img);


    const textDiv = document.createElement("div"); //new div element called textDiv is made to hold text shit
    textDiv.classList.add("text"); //adds the class of "text" to texDiv 

    const title = document.createElement("h2"); //creates an <h2> element called "title"
    title.textContent = item.name;  //the text content of title is now set to the item.name
    textDiv.appendChild(title);  //adds the <h2> element title to textDiv container

    const quantityDiv = document.createElement("div");  //a new <div> named "quantityDiv" is made (quantity of ingr)
    quantityDiv.classList.add("calories");  //adds the class of "calories" (this is just going to hold a number, either calories or ammount)
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
    return cardDiv; //returns the finished card
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

    // Cancelled prompt
    if (amount === null) return;

    // Trim and validate the input
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
            image: item.image || "images/ingredient.png" // fallback if item doesn't already include an image
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