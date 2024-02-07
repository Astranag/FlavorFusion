console.log('js is loded');

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve saved recipes from local storage
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    // Get the container element to display saved recipes
    const savedRecipesContainer = document.getElementById('savedRecipes');

    // Check if there are any saved recipes
    if (savedRecipes.length > 0) {
        // Loop through saved recipes and fetch details for each meal
        savedRecipes.forEach(function(mealId) {
            // Make a fetch request to get details of the saved meal
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(response => response.json())
                .then(data => {
                    const meal = data.meals[0];
                    // Create HTML elements to display meal details
                    const card = document.createElement('div');
                    card.classList.add('col-md-4', 'mb-3');
                    card.innerHTML = `
                        <div class="card">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <p class="card-text">${meal.strInstructions}</p>
                                <a href="${meal.strYoutube}" class="btn btn-primary" target="_blank">Watch on YouTube</a>
                            </div>
                        </div>
                    `;
                    savedRecipesContainer.appendChild(card);
                })
                .catch(error => console.error('Error fetching meal details:', error));
        });
    } else {
        // If no recipes are saved, display a message
        savedRecipesContainer.innerHTML = '<p>No recipes saved yet.</p>';
    }
});
