// Function to fetch and display saved recipes
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
                                <button type="button" class="btn btn-primary" onclick="showMealRecipe('${recipe.idMeal}', '${recipe.strMeal}')">View Recipe</button>

                            </div>
                        </div>
                    </div>
                `;
                savedRecipesList.insertAdjacentHTML('beforeend', card);
            })
            .catch(error => console.error('Error fetching saved recipe:', error));
    });
}


// Function to show meal recipe modal
function showMealRecipe(mealId, mealName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const modalBody = document.getElementById('recipeModalBody');
            const youtubeButton = document.getElementById('youtubeButton');

            // Populate modal with recipe details
            modalBody.innerHTML = `
                <img src="${meal.strMealThumb}" class="img-fluid mb-3" alt="${meal.strMeal}">
                <h5>${meal.strMeal}</h5>
                <p>${meal.strInstructions}</p>
            `;

            // Set YouTube button href to recipe video URL
            youtubeButton.href = meal.strYoutube;


            // Show modal
            const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
            recipeModal.show();
        })
        .catch(error => console.error('Error fetching meal recipe:', error));
}
// Call the function to display saved recipes when the page loads
displaySavedRecipes();