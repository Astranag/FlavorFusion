const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}


// This JavaScript code allows users to search for recipes based on ingredients. Here's an explanation of the code:

// First, the code selects several elements from the HTML document using the document.getElementById() and document.querySelector() methods. 
//These elements include a search button, a list of meals, details content for the selected meal, and a close button for the meal details.
// Next, the code adds event listeners to these elements. When the search button is clicked, the getMealList() function is called. When a meal is clicked in the list, the getMealRecipe() function is called. 
//When the close button is clicked, the meal details are hidden.
// The getMealList() function retrieves a list of meals that match the user's search input from the API at https://www.themealdb.com/api/json/v1/1/filter.php. 
//It then generates HTML code to display the list of meals and inserts it into the mealList element. If no meals are found, it displays a message indicating that no meals were found.
// The getMealRecipe() function retrieves the recipe for the selected meal from the API at https://www.themealdb.com/api/json/v1/1/lookup.php. 
//It then calls the mealRecipeModal() function to display the recipe details in a modal.
// The mealRecipeModal() function generates HTML code to display the recipe details and inserts it into the mealDetailsContent element. 
// It also displays the modal by adding the showRecipe class to the modal's parent element.
// Overall, this code provides a simple interface for users to search for recipes based on ingredients and view recipe details in a modal.