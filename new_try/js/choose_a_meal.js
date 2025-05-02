function uncheckCheckbox() {
    document.getElementById("check").checked = false;
  }


window.addEventListener('DOMContentLoaded', () => {
    const existingButton = document.querySelector('.existing');
    const newRecipeButton = document.querySelector('.new');

    if (existingButton) {
        existingButton.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const day = urlParams.get("day");
            const meal = urlParams.get("meal");

            if (day && meal) {
                window.location.href = `recipes.html?day=${encodeURIComponent(day)}&meal=${encodeURIComponent(meal)}`;
            } else {
                window.location.href = 'recipes.html';
            }
        });
    }

    if (newRecipeButton) {
        newRecipeButton.addEventListener('click', () => {
            window.location.href = 'make_a_new_recipe.html';
        });
    }
});