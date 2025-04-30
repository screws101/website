function uncheckCheckbox() {
    document.getElementById("check").checked = false;
  }
  
  function createAddButton() {
    const btn = document.createElement('button');
    btn.className = 'btn_add_step';
  
    const img = document.createElement('img');
    img.src = 'images/black_icon_plus copy.png';
    img.alt = 'Add';
  
    btn.appendChild(img);
    btn.addEventListener('click', () => {
      window.location.href = 'choose_a_meal.html';
    });
  
    return btn;
  }
  


  // Utility: Detect mobile layout (you can also check window width if needed)
  function isMobileLayout() {
    return window.getComputedStyle(document.querySelector('.mobile-days'))?.display !== 'none';
  }
  
  function renderMealPlan() {
    const mealPlan = JSON.parse(localStorage.getItem("mealPlan")) || {};
  
    if (isMobileLayout()) {
      const meals = document.querySelectorAll('.mobile-meal');

      meals.forEach(mealDiv => {
      mealDiv.innerHTML = '';

      const day = mealDiv.dataset.day;
      const meal = mealDiv.dataset.meal;
      const key = `${day}-${meal}`;
      const recipeName = mealPlan[key];

      if (recipeName) {
        const recipeLink = document.createElement('a');
        recipeLink.textContent = recipeName;
        recipeLink.href = `inspect.html?name=${encodeURIComponent(recipeName)}`;
        recipeLink.className = 'recipe-link';

        mealDiv.appendChild(recipeLink);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';

        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'images/minus.png';
        deleteIcon.alt = 'Delete';
        deleteIcon.className = 'delete-icon';

        deleteBtn.appendChild(deleteIcon);

        deleteBtn.addEventListener('click', () => {
          mealDiv.innerHTML = '';
          mealDiv.appendChild(createAddButton());

          delete mealPlan[key];
          localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
        });

    mealDiv.appendChild(deleteBtn);
  } else {
    mealDiv.appendChild(createAddButton());
  }
});

  
    } else {
      const tableCells = document.querySelectorAll("tbody td");
  
      tableCells.forEach((cell, index) => {
        cell.innerHTML = ''; // Clear
  
        const recipeName = mealPlan[index];
        if (recipeName) {
          const recipeLink = document.createElement('a');
          recipeLink.textContent = recipeName;
          recipeLink.href = `inspect.html?name=${encodeURIComponent(recipeName)}`;
          recipeLink.className = 'recipe-link';
  
          cell.appendChild(recipeLink);
  
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'delete-btn';
  
          const deleteIcon = document.createElement('img');
          deleteIcon.src = 'images/minus.png';
          deleteIcon.alt = 'Delete';
          deleteIcon.className = 'delete-icon';
  
          deleteBtn.appendChild(deleteIcon);
  
          deleteBtn.addEventListener('click', () => {
            cell.innerHTML = '';
            cell.appendChild(createAddButton());
  
            mealPlan[index] = '';
            localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
          });
  
          cell.appendChild(deleteBtn);
        } else {
          cell.appendChild(createAddButton());
        }
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderMealPlan();
  
    // Confirm clear functionality
    const clearButton = document.getElementById('clear-meal-plan');
    const confirmPopup = document.getElementById('confirmPopup');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');
  
    clearButton.addEventListener('click', () => {
      confirmPopup.style.display = 'flex';
    });
  
    confirmYes.addEventListener('click', () => {
      localStorage.removeItem('mealPlan');
      renderMealPlan(); // re-render
      confirmPopup.style.display = 'none';
    });
  
    confirmNo.addEventListener('click', () => {
      confirmPopup.style.display = 'none';
    });
  });
  
  // Optional: re-render on resize if switching layout
  window.addEventListener('resize', () => {
    renderMealPlan();
  });
  