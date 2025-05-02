function uncheckCheckbox() {
    document.getElementById("check").checked = false;
  }

const recipe_cardsContainer = document.getElementById("cards-container");

function createCard(item) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    // Image/Icon Section
    const imageSection = document.createElement("div");
    imageSection.classList.add("card-image");

    const img = document.createElement("img");
    img.src = "images/recipe_icon.png";
    imageSection.appendChild(img);

    // Text Section
    const textSection = document.createElement("div");
    textSection.classList.add("card-text");

    //name
    const title = document.createElement("h2");
    title.textContent = item.name;
    textSection.appendChild(title);

    //calories
    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("calories");
    const quantity = document.createElement("h3");
    quantity.textContent = item.quantity;
    quantityDiv.appendChild(quantity);
    textSection.appendChild(quantityDiv);

    //protein
    if (item.protein) {
        const protein = document.createElement("p");
        protein.textContent = `Protein: ${item.protein}`;
        textSection.appendChild(protein);
    }

    //prep
    const prep = document.createElement("h3");
    prep.textContent = item.prep;
    prep.classList.add("prep-text");
    textSection.appendChild(prep);

    // Combine sections into card
    cardDiv.appendChild(imageSection);
    cardDiv.appendChild(textSection);
    
    const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-column");


    //inspect icon btn
    const inspectButton = document.createElement("button");
    inspectButton.classList.add("button");

    const icon = document.createElement("img");
    icon.src = "images/magnifying-glass-solid.svg";
    icon.alt = "Inspect";
    icon.classList.add("button-icon");

    inspectButton.appendChild(icon);
    inspectButton.appendChild(document.createTextNode("Inspect"));


    inspectButton.addEventListener("click", () => {
        localStorage.setItem("selectedRecipe", JSON.stringify(item));
        window.location.href = "inspect.html";
    });



    // Add to Meal Plan button
    const addToMealPlanButton = document.createElement("button");
    addToMealPlanButton.classList.add("button");

    const mealIcon = document.createElement("img");
    mealIcon.src = "images/icons8-plus-50-no-pad copy.png";
    mealIcon.alt = "Add to Meal Plan";
    mealIcon.classList.add("button-icon");

    addToMealPlanButton.appendChild(mealIcon);
    addToMealPlanButton.appendChild(document.createTextNode("Add to Meal Plan"));


    addToMealPlanButton.addEventListener("click", () => {
        const urlParams = new URLSearchParams(window.location.search);
        const day = urlParams.get("day");
        const meal = urlParams.get("meal");
    
        if (!day || !meal) {
            alert("Missing meal plan context (day/meal).");
            return;
        }
    
        const key = `${day}_${meal}`;
        localStorage.setItem(key, item.name);
    
        alert(`Added "${item.name}" to ${day} ${meal}!`);
        window.location.href = "meal_plan.html";
    });    




// Delete button
const deleteButton = document.createElement("button");
deleteButton.classList.add("button");

const deleteIcon = document.createElement("img");
deleteIcon.src = "images/trash.png";
deleteIcon.alt = "Delete";
deleteIcon.classList.add("button-icon");

deleteButton.appendChild(deleteIcon);
deleteButton.appendChild(document.createTextNode("Delete"));


deleteButton.addEventListener("click", () => {
    const confirmDelete = confirm(`Are you sure you want to delete "${item.name}"?`);
    if (confirmDelete) {
        // Remove from localStorage
        let currentRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        currentRecipes = currentRecipes.filter(recipe => recipe.name !== item.name);
        localStorage.setItem("recipes", JSON.stringify(currentRecipes));

        // Remove card from DOM
        cardDiv.remove();
    }
});





buttonContainer.appendChild(inspectButton);
buttonContainer.appendChild(addToMealPlanButton);
buttonContainer.appendChild(deleteButton);

textSection.appendChild(buttonContainer);


    return cardDiv;
}




recipeItems.forEach(item => {
    const card = createCard(item);
    recipe_cardsContainer.appendChild(card);
});


const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

savedRecipes.forEach(item => {

    if (!item.image) {
        item.image = "images/placeholder_recipe.png";
    }


    if (!item.quantity) {
        item.quantity = `Calories: ${item.calories || "?"}`;
    }

    if (!item.prep) {
        item.prep = "Prep: unknown";
    } else if (!item.prep.toLowerCase().startsWith("prep:")) {
        item.prep = `Prep: ${item.prep}`;
    }
    

    const card = createCard(item);
    recipe_cardsContainer.appendChild(card);
});


document.querySelector(".new").addEventListener("click", function () {
    window.location.href = "make_a_new_recipe.html";
  });
  