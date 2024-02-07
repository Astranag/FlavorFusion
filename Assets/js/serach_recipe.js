// Function to fetch and display meals based on search input
function searchMeals(searchInput) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const mealList = document.getElementById('mealList');
            mealList.innerHTML = '';
            data.meals.forEach(meal => {
                // Create a card for each meal
                const card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-3');
                card.innerHTML = `
                    <div class="card">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <button type="button" class="explore btn btn-lg btn-outline-dark shadow shadow-info shadow-intensity-lg shadow-offset-down-lg" onclick="showMealRecipe('${meal.idMeal}', '${meal.strMeal}')">View Recipe</button>
                        </div>
                    </div>
                `;
                mealList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching meals:', error));
}

// Function to handle form submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() !== '') {
        searchMeals(searchInput);
    } else {
        alert('Please enter a search query.');
    }
});

// Function to show meal recipe modal
function showMealRecipe(mealId, mealName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const modalBody = document.getElementById('recipeModalBody');
            const youtubeButton = document.getElementById('youtubeButton');
            const saveRecipeButton = document.getElementById('saveRecipeButton');

            // Populate modal with recipe details
            modalBody.innerHTML = `
                <img src="${meal.strMealThumb}" class="img-fluid mb-3" alt="${meal.strMeal}">
                <h5>${meal.strMeal}</h5>
                <p>${meal.strInstructions}</p>
            `;

            // Set YouTube button href to recipe video URL
            youtubeButton.href = meal.strYoutube;

            // Add event listener to save recipe button
            saveRecipeButton.addEventListener('click', () => {
                // Save mealId in local storage
                saveRecipe(mealId);
            });

            // Show modal
            const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
            recipeModal.show();
        })
        .catch(error => console.error('Error fetching meal recipe:', error));
}

// Function to save recipe to local storage
function saveRecipe(mealId) {
    // Check if local storage is supported
    if (typeof(Storage) !== "undefined") {
        // Retrieve existing saved recipes or initialize empty array
        let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        
        // Check if mealId is already saved
        if (!savedRecipes.includes(mealId)) {
            // Add mealId to saved recipes
            savedRecipes.push(mealId);
            
            // Save updated list to local storage
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
            
            // Provide feedback to the user
            alert('Recipe saved successfully!');
        } else {
            // Provide feedback to the user if the recipe is already saved
            alert('Recipe already saved!');
        }
    } else {
        // Provide feedback if local storage is not supported
        alert('Local storage is not supported. Unable to save recipe.');
    }
}

function displaySavedRecipes() {
    // Retrieve saved recipe IDs from local storage
    const savedRecipeIds = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    // Get the element where saved recipes will be displayed
    const savedRecipesList = document.getElementById('savedRecipesList');

    // Check if there are any saved recipes
    if (savedRecipeIds.length === 0) {
        savedRecipesList.innerHTML = '<p class="text-center">No saved recipes yet.</p>';
        return;
    }

    // Loop through each saved recipe ID
    savedRecipeIds.forEach(recipeId => {
        // Fetch recipe details from the API using the ID
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
            .then(response => response.json())
            .then(data => {
                const recipe = data.meals[0];
                // Create card for the recipe and add it to the list
                const card = `
                    <div class="col-md-4">
                        <div class="card meal-card">
                            <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.strMeal}</h5>
                                <p class="card-text">${recipe.strInstructions.slice(0, 100)}...</p>
                                <a href="${recipe.strYoutube}" class="btn btn-primary" target="_blank">Watch Recipe</a>
                            </div>
                        </div>
                    </div>
                `;
                savedRecipesList.insertAdjacentHTML('beforeend', card);
            })
            .catch(error => console.error('Error fetching saved recipe:', error));
    });
}

// Call the function to display saved recipes when the page loads
displaySavedRecipes();