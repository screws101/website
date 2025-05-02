function uncheckCheckbox() {
  document.getElementById("check").checked = false;
}


const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const meals = ["Breakfast", "Lunch", "Dinner", "Snack"];
const container = document.getElementById("cards-container");

days.forEach(day => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h2");
    title.textContent = day;
    card.appendChild(title);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "meal-buttons";

    meals.forEach(meal => {
        const key = `${day}_${meal}`;
        const savedRecipe = localStorage.getItem(key);

        if (savedRecipe) {
          const recipeContainer = document.createElement("div");
          recipeContainer.className = "recipe-entry";
      
          const recipeLink = document.createElement("a");
recipeLink.textContent = savedRecipe;
recipeLink.href = `inspect.html?name=${encodeURIComponent(savedRecipe)}`;
recipeLink.className = "recipe-label recipe-link";
recipeLink.style.textDecoration = "none";
recipeLink.style.color = "inherit";


      
          const deleteBtn = document.createElement("button");
          deleteBtn.className = "delete-btn";
          deleteBtn.innerHTML = "&times;";
          deleteBtn.title = "Remove this meal";
      
          deleteBtn.addEventListener("click", () => {
              localStorage.removeItem(key);
              location.reload();
          });
      
          recipeContainer.appendChild(recipeLink);
          recipeContainer.appendChild(deleteBtn);
          buttonsDiv.appendChild(recipeContainer);
        } else {
            const btn = document.createElement("button");
            btn.textContent = meal;

            btn.addEventListener("click", () => {
                const query = `?day=${encodeURIComponent(day)}&meal=${encodeURIComponent(meal)}`;
                window.location.href = `choose_a_meal.html${query}`;
            });

            buttonsDiv.appendChild(btn);
        }
    });

    card.appendChild(buttonsDiv);
    container.appendChild(card);
});



const clearButton = document.getElementById("clear-meal-plan");
const confirmPopup = document.getElementById("confirmPopup");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

clearButton.addEventListener("click", () => {
    confirmPopup.style.display = "flex";
});

confirmYes.addEventListener("click", () => {
    days.forEach(day => {
        meals.forEach(meal => {
            const key = `${day}_${meal}`;
            localStorage.removeItem(key);
        });
    });
    confirmPopup.style.display = "none";
    location.reload();
});

confirmNo.addEventListener("click", () => {
    confirmPopup.style.display = "none";
});

