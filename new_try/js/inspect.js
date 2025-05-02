function uncheckCheckbox() {
  document.getElementById("check").checked = false;
}

const recipe = JSON.parse(localStorage.getItem("selectedRecipe"));
console.log("Loaded recipe:", recipe);

if (recipe) {
  document.getElementById("name").innerHTML = `<h2>${recipe.name || "Not Given"}</h2>`;

  let prepDisplay = recipe.prep || "Not Given";
if (prepDisplay.toLowerCase().startsWith("prep:")) {
  prepDisplay = prepDisplay.slice(5).trim();
}
document.getElementById("prep").innerHTML = `<p><strong>Prep Time:</strong> ${prepDisplay}</p>`;


  // URL handling
  document.getElementById("url").innerHTML = recipe.url
    ? `<p><strong>Link:</strong> <a href="${recipe.url}" target="_blank">${recipe.url}</a></p>`
    : `<p><strong>Link:</strong> Not Given</p>`;

  // Ingredients (bullet points)
  const ingredientsDiv = document.getElementById("ingredients");
  ingredientsDiv.innerHTML = `<h2>Ingredients</h2><hr class="solid">`;
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    const ingredientsList = document.createElement("ul");
    recipe.ingredients.forEach(ingredient => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
    ingredientsDiv.appendChild(ingredientsList);
  } else {
    ingredientsDiv.innerHTML += `<p>Not Given</p>`;
  }

  // Steps (numbered list)
  const stepsDiv = document.getElementById("steps");
  stepsDiv.innerHTML = `<h2>Steps</h2><hr class="solid">`;
  if (recipe.steps && recipe.steps.length > 0) {
    const stepsList = document.createElement("ol");
    recipe.steps.forEach(step => {
      const li = document.createElement("li");
      li.textContent = step;
      stepsList.appendChild(li);
    });
    stepsDiv.appendChild(stepsList);
  } else {
    stepsDiv.innerHTML += `<p>Not Given</p>`;
  }

  document.getElementById("calories").innerHTML = `<p><strong>Calories:</strong> ${recipe.calories || "Not Given"}</p>`;
  document.getElementById("protein").innerHTML = `<p><strong>Protein:</strong> ${recipe.protein || "Not Given"}</p>`;
} else {
  document.querySelector(".bottom_container").innerHTML = "<p>No recipe selected.</p>";
}
