function uncheckCheckbox() {
    document.getElementById("check").checked = false;
  }

  const urlInput = document.querySelector('input[type="url"]');
  urlInput.addEventListener('blur', () => {
    if (urlInput.value && !urlInput.value.startsWith('http')) {
      urlInput.value = 'https://' + urlInput.value;
    }
  });
  

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


document.querySelector(".btn_create").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form from submitting immediately

    const url = document.querySelector(".insert-url input").value.trim();
    const name = document.querySelector(".name input").value.trim();
    const calories = document.querySelector(".calories input").value.trim();
    const protein = document.querySelector(".protein input").value.trim();

    const stepElements = document.querySelectorAll("#steps-container input");
    const steps = Array.from(stepElements).map(input => input.value.trim());

    // Validate required fields (everything except URL)
    const missingFields = [];

    if (!name) missingFields.push("Recipe Name");
    if (!calories) missingFields.push("Calories");
    if (!protein) missingFields.push("Protein");
    if (ingredients.length === 0) missingFields.push("Ingredients");
    if (steps.length === 0 || steps.some(step => step === "")) missingFields.push("Steps");

    if (missingFields.length > 0) {
        alert("Please fill out the following required field(s):\n" + missingFields.join(", "));
        return;
    }

    const hours = parseInt(document.getElementById("prep-time-hours").value) || 0;
const minutes = parseInt(document.getElementById("prep-time-minutes").value) || 0;

let prep = "";
if (hours > 0) prep += `${hours} hr `;
if (minutes > 0 || hours === 0) prep += `${minutes} min`;
prep = prep.trim();


    const newRecipe = {
        url, // optional
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

    