function uncheckCheckbox() {
    document.getElementById("check").checked = false;
  }

  let stepCount = 1;

    document.getElementById("add-step-button").addEventListener("click", function (e) {
        e.preventDefault();

        stepCount++;
        const stepsContainer = document.getElementById("steps-container");

        const newStep = document.createElement("div");
        newStep.className = "step";
        newStep.id = `step-${stepCount}`;

        const label = document.createElement("label");
        label.textContent = `${stepCount}.`;

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter step";

        newStep.appendChild(label);
        newStep.appendChild(input);
        stepsContainer.appendChild(newStep);
    });

    const ingredientInput = document.getElementById("ingredient-input");
const ingredientsDisplay = document.getElementById("ingredients-display");

let ingredients = [];

ingredientInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const value = ingredientInput.value.trim();
        if (value !== "") {
            ingredients.push(value);

            const li = document.createElement("li");
            li.textContent = value;
            ingredientsDisplay.appendChild(li);

            ingredientInput.value = ""; // Clear input for next ingredient
        }
    }
});


    document.querySelector(".btn_create").addEventListener("click", function () {
        const url = document.querySelector(".insert-url input").value;
        const name = document.querySelector(".name input").value;
        const calories = document.querySelector(".calories input").value;
        const protein = document.querySelector(".protein input").value;
        
        // Prep time
        // const hours = parseInt(document.getElementById("prep-time-hours").value) || 0;
        // const minutes = parseInt(document.getElementById("prep-time-minutes").value) || 0;
        // const totalMinutes = hours * 60 + minutes;


        // let prep = "";
        // if (hours > 0) prep += `${hours}h `;
        // if (minutes > 0 || hours === 0) prep += `${minutes}m`;
        // prep = prep.trim();

        let prep = ""; // Or use "Not Given" if desired


        // Steps
        const stepElements = document.querySelectorAll("#steps-container input");
        const steps = Array.from(stepElements).map(input => input.value);
    

        
        const newRecipe = {
            url,
            name,
            ingredients,
            calories,
            protein,
            steps,
            prep
        };
        
    

        const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    
  
        existingRecipes.push(newRecipe);
    
  
        localStorage.setItem("recipes", JSON.stringify(existingRecipes));
    

        window.location.href = "recipes.html";
    });
    