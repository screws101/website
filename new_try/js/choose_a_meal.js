function uncheckCheckbox() {
    document.getElementById("check").checked = false;
  }


window.addEventListener('DOMContentLoaded', () => {
    const existingButton = document.querySelector('.existing');
    const newRecipeButton = document.querySelector('.new');

    if (existingButton) {
        existingButton.addEventListener('click', () => {
            window.location.href = 'recipes.html';
        });
    }

    if (newRecipeButton) {
        newRecipeButton.addEventListener('click', () => {
            window.location.href = 'make_a_new_recipe.html';
        });
    }
});